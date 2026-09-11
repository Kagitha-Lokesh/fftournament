// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER TOURNAMENTS MANAGEMENT PAGE
//
// Filter tabs: All · Active · Registration · Draft · Completed
// Responsive 2-column card grid with configuration modal inspector.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoAddCircleOutline,
  IoSearchOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'
import { formatCurrency } from '../../utils/formatters'

export default function OrganizerTournamentsPage({ onNavigate, demoMode }) {
  const [activeTab, setActiveTab] = useState('all') // all | active | registration | draft | completed
  const [searchQuery, setSearchQuery] = useState('')
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTournament, setSelectedTournament] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getOrganizerTournaments(activeTab, demoMode)
      setTournaments(list)
      setLoading(false)
    }
    load()
  }, [activeTab, demoMode])

  const filtered = tournaments.filter((t) => {
    if (!searchQuery) return true
    return (
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.mode.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="player-subpage">
      {/* Header with Title and Create CTA */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Tournaments</h1>
          <p className="player-subpage-desc">Manage your published, live, and draft competitions.</p>
        </div>
        <button
          onClick={() => onNavigate('/organizer/tournaments/new')}
          className="btn btn--primary"
          style={{ height: '38px', padding: '0 16px', fontSize: '13px', gap: '6px' }}
        >
          <IoAddCircleOutline size={17} />
          <span>Create Tournament</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <IoSearchOutline
            size={16}
            color="#6B7078"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search tournaments by name or mode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="player-search-input"
            style={{ paddingLeft: '34px', width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #E4E7EB', fontSize: '13px' }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="player-tabs-bar" style={{ margin: 0 }}>
          {['all', 'active', 'registration', 'draft', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`player-tab-btn ${activeTab === tab ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Responsive Tournament Cards Grid */}
      {filtered.length > 0 ? (
        <div className="player-tournaments-2col-grid">
          {filtered.map((t) => {
            const fillPct = Math.min(100, Math.round(((t.registeredCount || 0) / (t.capacity || 1)) * 100))
            return (
              <article
                key={t.id}
                className="player-grid-t-card"
                onClick={() => setSelectedTournament(t)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedTournament(t)
                }}
              >
                <div className="player-grid-t-card__thumb">
                  <img src={t.image} alt={t.name} loading="lazy" />
                  <span className="player-grid-t-card__mode">{t.mode}</span>
                </div>

                <div className="player-grid-t-card__body">
                  <h3 className="player-grid-t-card__name">{t.name}</h3>

                  <div className="player-grid-t-card__econ-row">
                    <div className="player-grid-t-card__econ-item">
                      <span className="player-grid-t-card__econ-lbl">ENTRY</span>
                      <span className="player-grid-t-card__econ-val">
                        {t.entryFee === 0 ? 'Free' : `₹${t.entryFee}`}
                      </span>
                    </div>
                    <div className="player-grid-t-card__econ-item">
                      <span className="player-grid-t-card__econ-lbl">PRIZE POOL</span>
                      <span className="player-grid-t-card__econ-val player-grid-t-card__econ-val--prize">
                        {formatCurrency(t.prizePool)}
                      </span>
                    </div>
                  </div>

                  <div className="player-grid-t-card__schedule">
                    <span>{t.date} · {t.time}</span>
                  </div>

                  {/* Slot progress */}
                  <div className="player-grid-t-card__capacity">
                    <div className="player-grid-t-card__cap-bar">
                      <div className="player-grid-t-card__cap-fill" style={{ width: `${fillPct}%` }} />
                    </div>
                    <span className="player-grid-t-card__cap-text">
                      {t.registeredCount}/{t.capacity} slots
                    </span>
                  </div>

                  <div className="player-grid-t-card__footer">
                    <OrganizerStatusBadge status={t.status} size="sm" />
                    <span className="player-grid-t-card__link">
                      Manage <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="No tournaments found"
          description={
            activeTab === 'all'
              ? 'You have not created any tournaments yet.'
              : `No tournaments matching the '${activeTab}' filter.`
          }
          actionLabel="Create Tournament"
          onAction={() => onNavigate('/organizer/tournaments/new')}
        />
      )}

      {/* Tournament Management Modal */}
      <Modal
        isOpen={Boolean(selectedTournament)}
        onClose={() => setSelectedTournament(null)}
        title={selectedTournament?.name || 'Tournament Operations'}
      >
        {selectedTournament && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <OrganizerStatusBadge status={selectedTournament.status} />
              <span style={{ fontSize: '12px', color: '#6B7078' }}>
                Mode: <strong>{selectedTournament.mode}</strong>
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '14px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E4E7EB',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>ENTRY FEE</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#111318' }}>
                  {selectedTournament.entryFee === 0 ? 'Free' : `₹${selectedTournament.entryFee}`}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>PRIZE POOL</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706' }}>
                  {formatCurrency(selectedTournament.prizePool)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>SCHEDULE</span>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#111318' }}>
                  {selectedTournament.date} · {selectedTournament.time}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>REGISTRATIONS</span>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#111318' }}>
                  {selectedTournament.registeredCount} / {selectedTournament.capacity}
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                SCORING MODEL
              </span>
              <p style={{ fontSize: '12.5px', color: '#4B5563', margin: '3px 0 0 0' }}>
                {selectedTournament.scoringType || 'Placement + Kills (1 pt/kill)'}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                RULES & REQUIREMENTS
              </span>
              <p style={{ fontSize: '12.5px', color: '#6B7078', margin: '3px 0 0 0', lineHeight: 1.4 }}>
                {selectedTournament.rulesSummary || 'Verified UID required. Emulators prohibited.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={() => {
                  setSelectedTournament(null)
                  onNavigate('/organizer/participants')
                }}
                className="btn btn--secondary"
                style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
              >
                View Participants
              </button>
              <button
                onClick={() => {
                  setSelectedTournament(null)
                  onNavigate('/organizer/matches')
                }}
                className="btn btn--primary"
                style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
              >
                Match Operations
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER PARTICIPANTS PAGE
//
// Tournament selector · Search & Filters · Desktop table & Mobile cards
// Roster and check-in status inspector.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoSearchOutline,
  IoFilterOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoEyeOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'

export default function OrganizerParticipantsPage({ demoMode }) {
  const [tournamentId, setTournamentId] = useState('all')
  const [tournaments, setTournaments] = useState([])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedParticipant, setSelectedParticipant] = useState(null)

  useEffect(() => {
    async function loadTournaments() {
      const list = await organizerService.getOrganizerTournaments('all', demoMode)
      setTournaments(list)
    }
    loadTournaments()
  }, [demoMode])

  useEffect(() => {
    async function loadParticipants() {
      setLoading(true)
      const list = await organizerService.getParticipants(tournamentId, query, statusFilter, demoMode)
      setParticipants(list)
      setLoading(false)
    }
    loadParticipants()
  }, [tournamentId, query, statusFilter, demoMode])

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Participants</h1>
          <p className="player-subpage-desc">Track registrations, team rosters, and match check-in states.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
        {/* Tournament Selector */}
        <select
          value={tournamentId}
          onChange={(e) => setTournamentId(e.target.value)}
          className="org-form-select"
          style={{ width: 'auto', minWidth: '220px', height: '38px', fontSize: '13px' }}
        >
          <option value="all">All Tournaments</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.mode})
            </option>
          ))}
        </select>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
          <IoSearchOutline
            size={16}
            color="#6B7078"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search team or captain IGN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="player-search-input"
            style={{ paddingLeft: '34px', width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #E4E7EB', fontSize: '13px' }}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="player-tabs-bar" style={{ margin: 0 }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'CHECKED_IN', label: 'Checked In' },
            { key: 'PENDING', label: 'Pending Check-in' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`player-tab-btn ${statusFilter === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Participants List */}
      {participants.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="org-table-wrapper player-desktop-only">
            <table className="org-table">
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Team / Player</th>
                  <th>Captain & UID</th>
                  <th>Tournament</th>
                  <th>Check-In</th>
                  <th>Roster Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span style={{ fontWeight: 800, color: '#111318' }}>{p.slotNumber}</span>
                    </td>
                    <td>
                      <div>
                        <span style={{ fontWeight: 700, color: '#111318' }}>[{p.teamTag}] {p.teamName}</span>
                        <div style={{ fontSize: '11px', color: '#6B7078' }}>{p.membersCount} players</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{p.captainIgn}</div>
                      <div style={{ fontSize: '11px', color: '#6B7078' }}>UID: {p.captainUid}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#4B5563' }}>{p.tournamentName}</span>
                    </td>
                    <td>
                      {p.checkInStatus === 'CHECKED_IN' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#166534', fontSize: '12px', fontWeight: 600 }}>
                          <IoCheckmarkCircleOutline size={15} /> Checked In
                        </span>
                      ) : p.checkInStatus === 'PENDING' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#B45309', fontSize: '12px', fontWeight: 600 }}>
                          <IoTimeOutline size={15} /> Awaiting Check-In
                        </span>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#6B7078' }}>Not Open</span>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: p.rosterStatus === 'COMPLETE' ? '#166534' : '#B45309',
                        }}
                      >
                        {p.rosterStatus === 'COMPLETE' ? '✓ Complete' : 'Review Needed'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedParticipant(p)}
                        className="btn btn--secondary"
                        style={{ height: '30px', padding: '0 10px', fontSize: '12px' }}
                      >
                        View Roster
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Card Stack */}
          <div className="org-mobile-card-stack player-mobile-only">
            {participants.map((p) => (
              <div key={p.id} className="org-item-card">
                <div className="org-item-card__header">
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706' }}>{p.slotNumber}</span>
                    <h3 className="org-item-card__title">[{p.teamTag}] {p.teamName}</h3>
                    <div className="org-item-card__subtitle">
                      Captain: <strong>{p.captainIgn}</strong> (UID: {p.captainUid})
                    </div>
                  </div>
                  {p.checkInStatus === 'CHECKED_IN' ? (
                    <span style={{ color: '#166534', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <IoCheckmarkCircleOutline size={13} /> Checked In
                    </span>
                  ) : (
                    <span style={{ color: '#B45309', fontSize: '11px', fontWeight: 700 }}>
                      Pending
                    </span>
                  )}
                </div>

                <div className="org-item-card__row">
                  <span style={{ fontSize: '11.5px', color: '#6B7078' }}>
                    {p.membersCount} players · {p.tournamentName}
                  </span>
                  <button
                    onClick={() => setSelectedParticipant(p)}
                    className="btn btn--secondary"
                    style={{ height: '30px', padding: '0 12px', fontSize: '11.5px' }}
                  >
                    View Roster
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="No participants found"
          description="No registered teams or players match your current filter."
        />
      )}

      {/* Roster Details Modal */}
      <Modal
        isOpen={Boolean(selectedParticipant)}
        onClose={() => setSelectedParticipant(null)}
        title={`Roster — ${selectedParticipant?.teamName || 'Team'}`}
      >
        {selectedParticipant && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706' }}>
                  {selectedParticipant.slotNumber}
                </span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#111318' }}>
                  [{selectedParticipant.teamTag}] {selectedParticipant.teamName}
                </div>
              </div>
              <OrganizerStatusBadge status={selectedParticipant.verificationStatus} size="sm" />
            </div>

            <div style={{ border: '1px solid #E4E7EB', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '8px 12px', background: '#F9FAFB', borderBottom: '1px solid #E4E7EB', fontSize: '11px', fontWeight: 700, color: '#6B7078' }}>
                REGISTERED SQUAD MEMBERS
              </div>
              {selectedParticipant.members?.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderBottom: i < selectedParticipant.members.length - 1 ? '1px solid #F3F4F6' : 'none',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111318' }}>{m.ign}</span>
                    <span style={{ fontSize: '11.5px', color: '#6B7078', marginLeft: '6px' }}>({m.role})</span>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>UID: {m.uid}</div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: m.ready ? '#166534' : '#B45309',
                    }}
                  >
                    {m.ready ? '● Ready' : '○ Unconfirmed'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="btn btn--primary"
                style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

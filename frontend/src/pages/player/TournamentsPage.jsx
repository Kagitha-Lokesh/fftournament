import React, { useState, useEffect, useMemo } from 'react'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import SmartTournamentHero from '../../components/player/ui/SmartTournamentHero'
import { playerService, selectSmartTournamentHero } from '../../services/playerService'
import { formatCurrency } from '../../utils/formatters'

export default function TournamentsPage({
  onNavigate,
  demoMode,
  nextMatch: propNextMatch,
  onOpenCheckIn,
}) {
  const [activeTab, setActiveTab] = useState('open') // open | registered | completed
  const [tournamentsData, setTournamentsData] = useState({ discover: [], registered: [], completed: [] })
  const [nextMatchData, setNextMatchData] = useState(propNextMatch || null)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [regSuccess, setRegSuccess] = useState(false)

  // Load authoritative tournament & match data
  useEffect(() => {
    async function load() {
      const [tData, mData] = await Promise.all([
        playerService.getPlayerTournaments(activeTab, demoMode),
        playerService.getMatches(demoMode),
      ])
      setTournamentsData(tData || { discover: [], registered: [], completed: [] })
      if (!propNextMatch) {
        setNextMatchData(mData?.upcoming?.[0] || null)
      }
    }
    load()
  }, [activeTab, demoMode, propNextMatch])

  // Shared Smart Hero Selector:
  // State A: Upcoming registered tournament/match -> State B: Discover recommendation
  const heroState = useMemo(() => {
    return selectSmartTournamentHero({
      nextMatch: nextMatchData,
      myTournaments: tournamentsData.registered,
      discoverTournaments: tournamentsData.discover,
      demoMode,
    })
  }, [nextMatchData, tournamentsData.registered, tournamentsData.discover, demoMode])

  const list =
    activeTab === 'open'
      ? tournamentsData.discover || []
      : activeTab === 'registered'
      ? tournamentsData.registered || []
      : tournamentsData.completed || []

  return (
    <div className="player-subpage">
      {/* ── 1. COMPACT PAGE INTRO ── */}
      <div className="player-tournaments-page-intro">
        <h1 className="player-tournaments-page-title">Tournaments</h1>
        <p className="player-tournaments-page-subtitle">Find your next tournament.</p>
      </div>

      {/* ── 2. SMART CONTEXTUAL TOP BANNER (SHARED HERO) ── */}
      <SmartTournamentHero
        hero={heroState}
        onNavigate={onNavigate}
        onOpenCheckIn={onOpenCheckIn}
        onOpenDetails={(t) => setSelectedTournament(t)}
      />

      {/* ── 3. FILTER TABS: Open · Registered · Completed ── */}
      <div className="player-tabs-bar" role="tablist" aria-label="Tournament filters">
        <button
          role="tab"
          aria-selected={activeTab === 'open'}
          className={`player-tab-btn ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'registered'}
          className={`player-tab-btn ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          Registered ({tournamentsData.registered?.length || 0})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'completed'}
          className={`player-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({tournamentsData.completed?.length || 0})
        </button>
      </div>

      {/* ── 4. 2-COLUMN TOURNAMENT GRID (LANDING PAGE VISUAL LANGUAGE) ── */}
      {list.length > 0 ? (
        <div className="player-tournaments-2col-grid">
          {list.map((t) => {
            const entryVal = t.entry ?? t.entryFee ?? 0
            const prizeVal = t.prize ?? t.prizePool ?? 0
            const regCount = t.registered ?? t.registeredCount ?? 0
            const capCount = t.capacity ?? 48
            const pct = Math.min(100, Math.round((regCount / (capCount || 1)) * 100))

            return (
              <article
                key={t.id}
                className="player-grid-t-card"
                onClick={() => setSelectedTournament(t)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedTournament(t)
                  }
                }}
              >
                {/* Image Header with Mode Badge */}
                <div className="player-grid-t-card__thumb">
                  <img
                    src={t.image || '/assets/tournaments/tournament-squad-01.webp'}
                    alt={`${t.name} artwork`}
                    loading="lazy"
                    className="player-grid-t-card__img"
                  />
                  <div className="player-grid-t-card__img-overlay" />
                  <span className="player-grid-t-card__mode">{t.mode || 'SQUAD'}</span>
                </div>

                {/* Card Body */}
                <div className="player-grid-t-card__body">
                  {t.verified && (
                    <span className="player-grid-t-card__verified" aria-label="Verified organizer">
                      ✓ Verified
                    </span>
                  )}

                  <h3 className="player-grid-t-card__title" title={t.name}>
                    {t.name}
                  </h3>

                  {/* Economics: Entry & Prize Pool */}
                  <div className="player-grid-t-card__economics">
                    <div className="player-grid-t-card__econ-item">
                      <span className="player-grid-t-card__econ-lbl">ENTRY</span>
                      <span className="player-grid-t-card__econ-val">
                        {entryVal === 0 ? 'Free' : formatCurrency(entryVal)}
                      </span>
                    </div>

                    <div className="player-grid-t-card__econ-item">
                      <span className="player-grid-t-card__econ-lbl">PRIZE POOL</span>
                      <span className="player-grid-t-card__econ-val player-grid-t-card__econ-val--prize">
                        {formatCurrency(prizeVal)}
                      </span>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="player-grid-t-card__schedule">
                    <span>{t.date} · {t.time}</span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="player-grid-t-card__capacity" title={`${regCount} of ${capCount} slots filled`}>
                    <div className="player-grid-t-card__cap-bar">
                      <div
                        className={`player-grid-t-card__cap-fill ${pct >= 100 ? 'full' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="player-grid-t-card__cap-text">{regCount}/{capCount}</span>
                  </div>

                  {/* Footer with Status and CTA Link */}
                  <div className="player-grid-t-card__footer">
                    <span
                      className={`player-grid-t-card__status ${
                        activeTab === 'registered'
                          ? 'player-grid-t-card__status--registered'
                          : activeTab === 'completed'
                          ? 'player-grid-t-card__status--completed'
                          : pct >= 100
                          ? 'player-grid-t-card__status--full'
                          : 'player-grid-t-card__status--open'
                      }`}
                    >
                      {activeTab === 'registered'
                        ? 'Registered'
                        : activeTab === 'completed'
                        ? t.result || 'Completed'
                        : pct >= 100
                        ? 'Full'
                        : 'Registration Open'}
                    </span>

                    <span className="player-grid-t-card__link">
                      <span>View</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title={
            activeTab === 'open'
              ? 'No tournaments available'
              : activeTab === 'registered'
              ? 'No registered tournaments'
              : 'No completed tournaments yet'
          }
          description={
            activeTab === 'open'
              ? 'Check back later for upcoming competitions.'
              : activeTab === 'registered'
              ? 'Explore available tournaments and find your next match.'
              : 'Keep competing to build your record.'
          }
          actionLabel={activeTab !== 'open' ? 'Explore Tournaments' : null}
          onAction={() => setActiveTab('open')}
        />
      )}

      {/* ── 5. TOURNAMENT DETAIL MODAL (Progressive Disclosure) ── */}
      <Modal
        isOpen={!!selectedTournament}
        onClose={() => {
          setSelectedTournament(null)
          setRegSuccess(false)
        }}
        title={selectedTournament?.name || 'Tournament Details'}
        maxWidth="520px"
      >
        {selectedTournament && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative', height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={selectedTournament.image || '/assets/tournaments/tournament-squad-01.webp'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="t-card__mode-badge">{selectedTournament.mode}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {selectedTournament.verified && (
                <span className="t-card__verified">✓ Verified Organizer</span>
              )}
              <span style={{ fontSize: '12.5px', color: '#6B7078' }}>
                By <strong>{selectedTournament.organizer || 'FF War Official'}</strong>
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '14px',
                background: '#F6F7F9',
                borderRadius: '8px',
                border: '1px solid #E4E7EB',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>ENTRY FEE</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111318' }}>
                  {selectedTournament.entry === 0 ? 'Free' : formatCurrency(selectedTournament.entry)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>PRIZE POOL</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4C400' }}>
                  {formatCurrency(selectedTournament.prize || 0)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>SCHEDULE</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>
                  {selectedTournament.date} · {selectedTournament.time}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>CAPACITY</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>
                  {selectedTournament.registered || 0} / {selectedTournament.capacity || 48} slots
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>
                Tournament Rules
              </h4>
              <ul style={{ fontSize: '12.5px', color: '#6B7078', paddingLeft: '18px', lineHeight: 1.5 }}>
                <li>Players must participate using verified Free Fire in-game UID.</li>
                <li>No emulators. Fair play integrity strictly enforced.</li>
                <li>Room code releases 15 minutes before start upon check-in.</li>
                <li>Top 3 placements submit endscreen proof for verified payout.</li>
              </ul>
            </div>

            {regSuccess ? (
              <div
                style={{
                  padding: '12px',
                  background: 'rgba(34, 197, 94, 0.10)',
                  borderRadius: '8px',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  color: '#166534',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <IoCheckmarkCircleOutline size={18} />
                <span>Registration confirmed! Match added to your competition schedule.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="btn btn--secondary"
                  style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}
                >
                  Close
                </button>
                <button
                  onClick={() => setRegSuccess(true)}
                  className="btn btn--primary"
                  style={{ height: '38px', padding: '0 20px', fontSize: '13px' }}
                >
                  Join Tournament
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

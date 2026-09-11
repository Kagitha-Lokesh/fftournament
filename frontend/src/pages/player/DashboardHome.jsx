import React, { useMemo } from 'react'
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
  IoChevronForwardOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoNotificationsOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import LoadingSkeleton from '../../components/player/ui/LoadingSkeleton'
import SmartTournamentHero from '../../components/player/ui/SmartTournamentHero'
import { selectSmartTournamentHero } from '../../services/playerService'
import { getGreeting, formatCurrency } from '../../utils/formatters'

export default function DashboardHome({
  data,
  loading,
  error,
  onNavigate,
  onOpenCheckIn,
}) {
  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="player-card-module" style={{ textAlign: 'center', padding: '32px 20px' }}>
        <p style={{ fontSize: '14px', color: '#6B7078', marginBottom: '16px' }}>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn--secondary">
          Try Again
        </button>
      </div>
    )
  }

  const player = data?.player
  const nextMatch = data?.nextMatch
  const myTournaments = data?.myTournaments || []
  const recentResults = data?.recentResults || []
  const career = data?.careerMetrics || {}
  const wallet = data?.wallet || {}
  const team = data?.team

  // Most recent verified result
  const latestResult = recentResults[0]

  // Shared Smart Tournament Hero Selector:
  // Priority: 1. Upcoming registered tournament/match -> 2. Discovery recommendation
  const heroState = useMemo(() => {
    return selectSmartTournamentHero({
      nextMatch,
      myTournaments,
      discoverTournaments: [],
      demoMode: 'ACTIVE',
    })
  }, [nextMatch, myTournaments])

  return (
    <div className="player-home-clean">
      {/* ── 1. COMPACT GREETING HEADER ── */}
      <div className="player-home-header">
        <span className="player-home-greeting">
          {getGreeting('').split(',')[0]}
        </span>
        <h1 className="player-home-ign">{player?.ign || 'SHADOW_K'}</h1>
      </div>

      {/* ── 2. SMART TOURNAMENT HERO (PRIMARY COMPETITION FOCUS & ACTIONS) ── */}
      <SmartTournamentHero
        hero={heroState}
        onNavigate={onNavigate}
        onOpenCheckIn={onOpenCheckIn}
        onOpenDetails={() => onNavigate('/player/tournaments')}
      />

      {/* ── 3. MY TOURNAMENTS (Current Registered Competitions + Contextual Actions) ── */}
      <section className="player-home-section" aria-label="My tournaments">
        <div className="player-section-head">
          <h2 className="player-section-title">My Tournaments</h2>
          <button
            onClick={() => onNavigate('/player/tournaments')}
            className="player-section-link"
          >
            <span>View All</span>
            <IoChevronForwardOutline size={14} />
          </button>
        </div>

        {myTournaments.length > 0 ? (
          <div className="player-my-tourneys-stack">
            {myTournaments.slice(0, 2).map((t, idx) => {
              // Contextual action embedded inside the relevant tournament
              const needsRosterReview = idx === 1 || t.rosterStatus === 'ACTION_REQUIRED'
              return (
                <div key={t.id} className="player-tourney-compact-card">
                  <div className="player-tourney-compact-card__body">
                    <h3 className="player-tourney-compact-card__name">{t.name}</h3>
                    <div className="player-tourney-compact-card__meta">
                      <span>{t.mode} · {t.date} · {t.time}</span>
                    </div>
                    {needsRosterReview ? (
                      <div className="player-tourney-inline-action">
                        <span className="player-tourney-inline-action__text">
                          Roster confirmation required
                        </span>
                        <button
                          onClick={() => onNavigate('/player/teams')}
                          className="player-tourney-inline-action__btn"
                        >
                          Review →
                        </button>
                      </div>
                    ) : (
                      <div className="player-tourney-compact-card__status">
                        <StatusBadge status={t.registration_status || 'CONFIRMED'} size="sm" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onNavigate('/player/tournaments')}
                    className="btn btn--secondary"
                    style={{ height: '36px', padding: '0 14px', fontSize: '12.5px', flexShrink: 0 }}
                  >
                    View
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="player-card-module" style={{ padding: '20px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#6B7078', marginBottom: '10px' }}>
              No active tournament registrations.
            </p>
            <button
              onClick={() => onNavigate('/player/tournaments')}
              className="btn btn--secondary"
              style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
            >
              Explore Tournaments
            </button>
          </div>
        )}
      </section>

      {/* ── DESKTOP 2-COLUMN GRID WRAPPER FOR SECONDARY SECTIONS ── */}
      <div className="player-home-split-grid">
        {/* ── 5. RECENT RESULTS ── */}
        {latestResult && (
          <section className="player-home-section" aria-label="Recent result">
            <div className="player-section-head">
              <h2 className="player-section-title">Recent Result</h2>
              <button
                onClick={() => onNavigate('/player/results')}
                className="player-section-link"
              >
                <span>Full History</span>
                <IoChevronForwardOutline size={14} />
              </button>
            </div>

            <div className="player-recent-result-card">
              <div className="player-recent-result-card__rank">
                <span className={`player-rank-badge ${latestResult.placement === '#1' ? 'player-rank-badge--champion' : ''}`}>
                  {latestResult.placement}
                </span>
              </div>

              <div className="player-recent-result-card__content">
                <h3 className="player-recent-result-card__name">
                  {latestResult.tournamentName}
                </h3>
                <div className="player-recent-result-card__meta">
                  <span className="player-result-clean-card__verified">✓ Verified</span>
                  <span className="player-bullet">•</span>
                  <span>Kills: {latestResult.kills}</span>
                  <span className="player-bullet">•</span>
                  <span>Points: {latestResult.totalPoints}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/player/results')}
                className="btn btn--secondary"
                style={{ height: '34px', padding: '0 12px', fontSize: '12px', flexShrink: 0 }}
              >
                Details
              </button>
            </div>
          </section>
        )}

        {/* ── 6. CAREER PREVIEW ── */}
        <section className="player-home-section" aria-label="Career overview">
          <div className="player-section-head">
            <h2 className="player-section-title">Career</h2>
            <button
              onClick={() => onNavigate('/player/career')}
              className="player-section-link"
            >
              <span>Full Career</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          <div className="player-career-summary-box">
            <div className="player-career-stats-row">
              <div className="player-career-stat-item">
                <span className="player-career-stat-val">{career.tournaments ?? '—'}</span>
                <span className="player-career-stat-lbl">Tourneys</span>
              </div>
              <div className="player-career-stat-item">
                <span className="player-career-stat-val player-career-stat-val--gold">{career.wins ?? '—'}</span>
                <span className="player-career-stat-lbl">Wins</span>
              </div>
              <div className="player-career-stat-item">
                <span className="player-career-stat-val">{career.top3 ?? '14'}</span>
                <span className="player-career-stat-lbl">Top 3</span>
              </div>
              <div className="player-career-stat-item">
                <span className="player-career-stat-val">{career.kills ?? '—'}</span>
                <span className="player-career-stat-lbl">Kills</span>
              </div>
            </div>

            {career.recentForm && career.recentForm.length > 0 && (
              <div className="player-career-form-row">
                <span className="player-career-form-lbl">Recent Form</span>
                <div className="player-career-form-pills">
                  {career.recentForm.slice(0, 5).map((form, i) => (
                    <span
                      key={i}
                      className={`player-career-form-pill ${form === '#1' ? 'gold' : ''}`}
                    >
                      {form === '#1' ? 'W' : form}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── 7. WALLET & PRIZES (Financial Overview) ── */}
        <section className="player-home-section" aria-label="Wallet summary">
          <div className="player-section-head">
            <h2 className="player-section-title">Wallet & Prizes</h2>
            <button
              onClick={() => onNavigate('/player/wallet')}
              className="player-section-link"
            >
              <span>View Wallet</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          <div className="player-card-module" style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
                  AVAILABLE
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111318', marginTop: '2px' }}>
                  {formatCurrency(wallet.available_balance || 0)}
                </div>
                <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Ready to withdraw</span>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
                  PENDING SETTLEMENT
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#854D0E', marginTop: '2px' }}>
                  {formatCurrency(wallet.pending_balance || 0)}
                </div>
                <span style={{ fontSize: '11px', color: '#854D0E', fontWeight: 500 }}>In verification batch</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. TEAM & NOTIFICATIONS ── */}
        <section className="player-home-section" aria-label="Team and notifications">
          <div className="player-section-head">
            <h2 className="player-section-title">Team</h2>
            <button
              onClick={() => onNavigate('/player/teams')}
              className="player-section-link"
            >
              <span>View Team</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          <div className="player-card-module" style={{ padding: '16px' }}>
            {team ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="player-team-tag-pill">[{team.tag}]</span>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#111318' }}>{team.name}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7078', marginTop: '4px' }}>
                    Squad · {team.roster?.length || 4} players · Captain: {team.captain}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('/player/teams')}
                  className="btn btn--secondary"
                  style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
                >
                  Roster
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <p style={{ fontSize: '12.5px', color: '#6B7078', marginBottom: '8px' }}>Not currently in a squad roster.</p>
                <button
                  onClick={() => onNavigate('/player/teams')}
                  className="btn btn--secondary"
                  style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}
                >
                  Create or Join Squad
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

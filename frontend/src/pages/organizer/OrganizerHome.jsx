// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER DASHBOARD HOME
//
// Operational overview answering: "What am I running, and what needs my attention?"
// Hierarchy: Header -> Dynamic Hero -> 4-Stat Summary -> Tournaments -> Matches/Results -> Earnings -> Attention
// ──────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react'
import {
  IoChevronForwardOutline,
  IoAddCircleOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import OrganizerTournamentHero from '../../components/organizer/ui/OrganizerTournamentHero'
import OperationalSummaryGrid from '../../components/organizer/ui/OperationalSummaryGrid'
import NeedsAttentionCard from '../../components/organizer/ui/NeedsAttentionCard'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import LoadingSkeleton from '../../components/player/ui/LoadingSkeleton'
import { selectOrganizerHero } from '../../services/organizerService'
import { formatCurrency, getGreeting } from '../../utils/formatters'

export default function OrganizerHome({ data, loading, error, onNavigate, demoMode }) {
  if (loading) return <LoadingSkeleton />

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

  const organizer = data?.organizer
  const tournaments = data?.tournaments || []
  const summary = data?.operationalSummary
  const needsAttention = data?.needsAttention || []
  const upcomingMatches = data?.upcomingMatches || []
  const pendingResults = data?.pendingResults || []
  const earnings = data?.earnings

  const heroState = useMemo(() => {
    return selectOrganizerHero(tournaments, demoMode)
  }, [tournaments, demoMode])

  return (
    <div className="player-home-clean">
      {/* ── 1. GREETING & OPERATOR IDENTITY ── */}
      <div className="player-home-header">
        <span className="player-home-greeting">
          {getGreeting('').split(',')[0]} · Operations Desk
        </span>
        <h1 className="player-home-ign">{organizer?.name || 'BattleZone Esports'}</h1>
      </div>

      {/* ── 2. DYNAMIC TOURNAMENT HERO (CONTEXT-AWARE HIGHEST PRIORITY) ── */}
      <OrganizerTournamentHero hero={heroState} onNavigate={onNavigate} />

      {/* ── 3. OPERATIONAL SUMMARY (4 CORE METRICS) ── */}
      <OperationalSummaryGrid summary={summary} onNavigate={onNavigate} />

      {/* ── 4. MY TOURNAMENTS (OPERATIONAL LISTING) ── */}
      <section className="org-section" aria-label="My tournaments">
        <div className="player-section-head">
          <h2 className="player-section-title">My Tournaments</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onNavigate('/organizer/tournaments/new')}
              className="btn btn--secondary"
              style={{ height: '32px', padding: '0 10px', fontSize: '12px', gap: '4px' }}
            >
              <IoAddCircleOutline size={14} color="#F4C400" />
              <span>Create</span>
            </button>
            <button
              onClick={() => onNavigate('/organizer/tournaments')}
              className="player-section-link"
            >
              <span>View All</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>
        </div>

        {tournaments.length > 0 ? (
          <div className="player-tournaments-2col-grid">
            {tournaments.slice(0, 2).map((t) => (
              <article
                key={t.id}
                className="player-grid-t-card"
                onClick={() => onNavigate('/organizer/tournaments')}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onNavigate('/organizer/tournaments')
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
                  <div className="player-grid-t-card__footer">
                    <OrganizerStatusBadge status={t.status} size="sm" />
                    <span className="player-grid-t-card__link">
                      Manage <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="player-card-module" style={{ padding: '24px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#6B7078', marginBottom: '12px' }}>
              No tournaments configured yet.
            </p>
            <button
              onClick={() => onNavigate('/organizer/tournaments/new')}
              className="btn btn--primary"
              style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
            >
              Create Your First Tournament
            </button>
          </div>
        )}
      </section>

      {/* ── DESKTOP 2-COLUMN SPLIT GRID FOR OPERATIONAL MODULES ── */}
      <div className="player-home-split-grid">
        {/* ── 5. UPCOMING MATCHES ── */}
        <section className="org-section" aria-label="Upcoming tournament matches">
          <div className="player-section-head">
            <h2 className="player-section-title">Upcoming Matches</h2>
            <button onClick={() => onNavigate('/organizer/matches')} className="player-section-link">
              <span>View All</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          {upcomingMatches.length > 0 ? (
            <div className="org-mobile-card-stack">
              {upcomingMatches.map((m) => (
                <div key={m.id} className="org-item-card">
                  <div className="org-item-card__header">
                    <div>
                      <h3 className="org-item-card__title">{m.tournamentName}</h3>
                      <div className="org-item-card__subtitle">{m.matchNumber} · Map: {m.map}</div>
                    </div>
                    <OrganizerStatusBadge status={m.status} size="sm" />
                  </div>
                  <div className="org-item-card__row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                      <IoTimeOutline size={14} color="#6B7078" />
                      <span>{m.scheduledTime} · {m.date}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>
                      {m.checkedInTeams}/{m.teamsCount} Checked-in
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="player-card-module" style={{ padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '12.5px', color: '#6B7078' }}>No scheduled matches pending.</p>
            </div>
          )}
        </section>

        {/* ── 6. PENDING RESULTS REVIEW ── */}
        <section className="org-section" aria-label="Results awaiting review">
          <div className="player-section-head">
            <h2 className="player-section-title">Results Review</h2>
            <button onClick={() => onNavigate('/organizer/results')} className="player-section-link">
              <span>All Results</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          {pendingResults.length > 0 ? (
            <div className="org-mobile-card-stack">
              {pendingResults.map((r) => (
                <div key={r.id} className="org-item-card">
                  <div className="org-item-card__header">
                    <div>
                      <h3 className="org-item-card__title">{r.tournamentName}</h3>
                      <div className="org-item-card__subtitle">{r.matchNumber} · {r.mode}</div>
                    </div>
                    <OrganizerStatusBadge status={r.status} size="sm" />
                  </div>
                  <div className="org-item-card__row">
                    <span style={{ fontSize: '12px', color: '#6B7078' }}>{r.scoreboard?.length || 0} scores submitted</span>
                    <button
                      onClick={() => onNavigate('/organizer/results')}
                      className="btn btn--secondary"
                      style={{ height: '30px', padding: '0 12px', fontSize: '11.5px' }}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="player-card-module" style={{ padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '12.5px', color: '#6B7078' }}>All tournament results confirmed.</p>
            </div>
          )}
        </section>

        {/* ── 7. FINANCIAL SUMMARY ── */}
        <section className="org-section" aria-label="Earnings overview">
          <div className="player-section-head">
            <h2 className="player-section-title">Earnings</h2>
            <button onClick={() => onNavigate('/organizer/earnings')} className="player-section-link">
              <span>View Ledger</span>
              <IoChevronForwardOutline size={14} />
            </button>
          </div>

          <div className="player-card-module" style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
                  AVAILABLE BALANCE
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111318', marginTop: '2px' }}>
                  {formatCurrency(earnings?.available || 0)}
                </div>
                <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Eligible for payout</span>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
                  PENDING SETTLEMENT
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#854D0E', marginTop: '2px' }}>
                  {formatCurrency(earnings?.pendingSettlement || 0)}
                </div>
                <span style={{ fontSize: '11px', color: '#854D0E', fontWeight: 500 }}>In verification batch</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. NEEDS ATTENTION ── */}
        <NeedsAttentionCard items={needsAttention} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — OPERATIONAL SUMMARY GRID
//
// 4 key metrics for the tournament operator:
// Active Tournaments, Participants, Upcoming Matches, Pending Results.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'

export default function OperationalSummaryGrid({ summary, onNavigate }) {
  if (!summary) return null

  const items = [
    {
      label: 'Tournaments',
      value: summary.activeTournaments ?? 0,
      sub: 'Active competitions',
      route: '/organizer/tournaments',
      highlight: false,
    },
    {
      label: 'Participants',
      value: summary.totalParticipants ?? 0,
      sub: 'Registered players',
      route: '/organizer/participants',
      highlight: false,
    },
    {
      label: 'Matches',
      value: summary.upcomingMatches ?? 0,
      sub: 'Scheduled & live',
      route: '/organizer/matches',
      highlight: false,
    },
    {
      label: 'Results',
      value: summary.pendingResults ?? 0,
      sub: 'Pending review',
      route: '/organizer/results',
      highlight: summary.pendingResults > 0,
    },
  ]

  return (
    <div className="org-summary-grid" role="region" aria-label="Operational summary">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavigate && onNavigate(item.route)}
          className={`org-summary-card ${item.highlight ? 'org-summary-card--alert' : ''}`}
          aria-label={`${item.value} ${item.label} - ${item.sub}`}
        >
          <div className="org-summary-card__top">
            <span className="org-summary-card__value">{item.value}</span>
            <span className="org-summary-card__label">{item.label}</span>
          </div>
          <span className="org-summary-card__sub">{item.sub}</span>
        </button>
      ))}
    </div>
  )
}

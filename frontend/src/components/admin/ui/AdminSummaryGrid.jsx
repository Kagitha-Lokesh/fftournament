// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN OPERATIONAL SUMMARY GRID
//
// 4 primary operational KPI metrics:
// 1. Active Tournaments
// 2. Registered Players
// 3. Pending Reviews
// 4. Pending Payouts
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'

export default function AdminSummaryGrid({ summary, onNavigate }) {
  if (!summary) return null

  const kpis = [
    {
      label: 'Active Tournaments',
      val: summary.activeTournaments || 0,
      sub: 'Platform & verified organizer events',
      route: '/admin/tournaments'
    },
    {
      label: 'Registered Players',
      val: (summary.registeredPlayers || 0).toLocaleString(),
      sub: 'Active competitive profiles',
      route: '/admin/users'
    },
    {
      label: 'Pending Reviews',
      val: summary.pendingReviews || 0,
      sub: 'Results, disputes & KYC queues',
      route: '/admin/results',
      isAttention: (summary.pendingReviews || 0) > 0
    },
    {
      label: 'Pending Payouts',
      val: summary.pendingPayouts || 0,
      sub: 'Awaiting platform disbursement',
      route: '/admin/payouts',
      isAttention: (summary.pendingPayouts || 0) > 0
    }
  ]

  return (
    <div className="admin-summary-grid" role="region" aria-label="Platform Summary Metrics">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="admin-kpi-card"
          onClick={() => onNavigate(kpi.route)}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate(kpi.route) }}
        >
          <div className="admin-kpi-card__label">{kpi.label}</div>
          <div
            className="admin-kpi-card__val"
            style={{ color: kpi.isAttention ? 'var(--admin-ink)' : 'var(--admin-ink)' }}
          >
            {kpi.val}
          </div>
          <div className="admin-kpi-card__sub">{kpi.sub}</div>
        </div>
      ))}
    </div>
  )
}

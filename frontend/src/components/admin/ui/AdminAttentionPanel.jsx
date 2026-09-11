// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN COMPACT ATTENTION PANEL
//
// Replaces the large intervention wall with a clean overview card + quick counts.
// Answers: "What needs platform attention?" without cluttering the screen.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoArrowForward, IoCheckmarkCircleOutline } from 'react-icons/io5'

export default function AdminAttentionPanel({ items = [], onNavigate }) {
  if (!items || items.length === 0) {
    return (
      <div className="admin-attention-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065F46' }}>
          <IoCheckmarkCircleOutline size={18} />
          <span style={{ fontSize: '13.5px', fontWeight: 700 }}>Platform Systems Operating Normally</span>
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--admin-grey)' }}>
          No pending disputes, unverified scorecards, or disbursement holds require attention.
        </p>
      </div>
    )
  }

  // Count items by category
  const categories = [
    { label: 'Results awaiting review', route: '/admin/results', filter: 'RESULTS_REVIEW' },
    { label: 'Organizer applications', route: '/admin/organizers', filter: 'ORGANIZER_VERIFICATION' },
    { label: 'Dispute escalations', route: '/admin/disputes', filter: 'DISPUTE_ESCALATION' },
    { label: 'Pending prize payouts', route: '/admin/payouts', filter: 'PAYOUT_AUTHORIZATION' },
    { label: 'Integrity review signals', route: '/admin/integrity', filter: 'INTEGRITY_FLAG' }
  ]

  return (
    <div className="admin-attention-card" aria-label="Items Requiring Attention">
      <div
        onClick={() => onNavigate(items[0]?.route || '/admin/results')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--admin-border)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--admin-ink)' }}>
            Requires Attention
          </span>
          <span className="admin-attention-count">{items.length}</span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--admin-grey)', display: 'flex', alignItems: 'center', gap: '2px' }}>
          Triage <IoArrowForward size={13} />
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((cat) => {
          const count = items.filter(i => i.category === cat.filter).length
          if (count === 0) return null

          return (
            <div
              key={cat.label}
              className="admin-attention-row"
              onClick={() => onNavigate(cat.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onNavigate(cat.route) }}
            >
              <span>{cat.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--admin-ink)' }}>{count}</span>
                <IoArrowForward size={12} style={{ color: 'var(--admin-grey)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

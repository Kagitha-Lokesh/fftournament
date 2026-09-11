// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER STATUS BADGE
//
// Truthful status representations for tournament lifecycle, match stages,
// results verification, payouts, and dispute resolution.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'

const BADGE_CONFIGS = {
  // Tournaments
  'Registration Open': { label: 'Registration Open', bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  'Check-in': { label: 'Check-in Open', bg: '#FEF3C7', text: '#B45309', border: '#FDE68A', pulse: true },
  'Live': { label: 'Live Now', bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA', pulse: true },
  'Results Pending': { label: 'Results Pending', bg: '#FEF9C3', text: '#A16207', border: '#FEF08A' },
  'Draft': { label: 'Draft', bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' },
  'Completed': { label: 'Completed', bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' },
  'Settled': { label: 'Settled & Paid', bg: '#E0E7FF', text: '#4338CA', border: '#C7D2FE' },
  'Cancelled': { label: 'Cancelled', bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },

  // Match Statuses
  'CHECK_IN_OPEN': { label: 'Check-in Open', bg: '#FEF3C7', text: '#B45309', border: '#FDE68A', pulse: true },
  'SCHEDULED': { label: 'Scheduled', bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' },
  'IN_PROGRESS': { label: 'In Progress', bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA', pulse: true },

  // Results Lifecycle
  'Submitted': { label: 'Submitted', bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
  'Under Review': { label: 'Under Review', bg: '#FEF9C3', text: '#A16207', border: '#FEF08A' },
  'Confirmed': { label: 'Confirmed', bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  'Finalized': { label: 'Finalized', bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' },

  // Dispute Statuses
  'OPEN': { label: 'Open Case', bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
  'UNDER_REVIEW': { label: 'Under Review', bg: '#FEF9C3', text: '#A16207', border: '#FEF08A' },
  'NEEDS_INFORMATION': { label: 'Needs Info', bg: '#FFEDD5', text: '#C2410C', border: '#FED7AA' },
  'RESOLVED': { label: 'Resolved', bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },

  // Payout Statuses
  'Paid': { label: 'Paid Out', bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  'Processing': { label: 'Processing', bg: '#FEF9C3', text: '#A16207', border: '#FEF08A' },
  'Requested': { label: 'Requested', bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
  'Failed': { label: 'Failed', bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA' },

  // Verification
  'VERIFIED': { label: 'Verified', bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  'PENDING_REVIEW': { label: 'Review Pending', bg: '#FEF9C3', text: '#A16207', border: '#FEF08A' },
  'NOT_SUBMITTED': { label: 'Unverified', bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' },
}

export default function OrganizerStatusBadge({ status, size = 'md' }) {
  const cfg = BADGE_CONFIGS[status] || {
    label: status || 'Unknown',
    bg: '#F3F4F6',
    text: '#4B5563',
    border: '#E5E7EB',
  }

  const isSmall = size === 'sm'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: isSmall ? '2px 7px' : '3.5px 9px',
        borderRadius: '12px',
        fontSize: isSmall ? '10.5px' : '11.5px',
        fontWeight: 600,
        backgroundColor: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {cfg.pulse && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: cfg.text,
            display: 'inline-block',
          }}
        />
      )}
      {cfg.label}
    </span>
  )
}

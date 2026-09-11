import React from 'react'

// Map server status enums strictly to restrained visual styles
const BADGE_CONFIG = {
  // Verification
  VERIFIED: { label: 'Verified', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  UNVERIFIED: { label: 'Unverified', bg: 'rgba(107, 112, 120, 0.08)', text: '#4b5563', border: 'rgba(107, 112, 120, 0.20)', dot: '#9ca3af' },

  // Match & Registration
  OPEN: { label: 'Check-in Open', bg: 'rgba(244, 196, 0, 0.14)', text: '#854d0e', border: 'rgba(244, 196, 0, 0.35)', dot: '#d97706' },
  CONFIRMED: { label: 'Confirmed', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  LIVE_SOON: { label: 'Starts Soon', bg: 'rgba(244, 196, 0, 0.16)', text: '#78350f', border: 'rgba(244, 196, 0, 0.40)', dot: '#f59e0b' },
  LIVE: { label: 'Live Now', bg: 'rgba(239, 68, 68, 0.12)', text: '#991b1b', border: 'rgba(239, 68, 68, 0.30)', dot: '#ef4444' },
  UPCOMING: { label: 'Upcoming', bg: 'rgba(59, 130, 246, 0.08)', text: '#1e40af', border: 'rgba(59, 130, 246, 0.22)', dot: '#3b82f6' },
  COMPLETED: { label: 'Completed', bg: 'rgba(107, 112, 120, 0.10)', text: '#374151', border: 'rgba(107, 112, 120, 0.20)', dot: '#6b7280' },

  // Financial / Settlement
  PAID: { label: 'Paid', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  PROCESSING: { label: 'Processing', bg: 'rgba(244, 196, 0, 0.12)', text: '#854d0e', border: 'rgba(244, 196, 0, 0.35)', dot: '#d97706' },
  PENDING_SETTLEMENT: { label: 'Pending Settlement', bg: 'rgba(244, 196, 0, 0.12)', text: '#854d0e', border: 'rgba(244, 196, 0, 0.30)', dot: '#d97706' },
  PENDING_VERIFICATION: { label: 'Pending Verification', bg: 'rgba(59, 130, 246, 0.08)', text: '#1e40af', border: 'rgba(59, 130, 246, 0.20)', dot: '#3b82f6' },

  // Disputes
  UNDER_REVIEW: { label: 'Under Review', bg: 'rgba(244, 196, 0, 0.14)', text: '#78350f', border: 'rgba(244, 196, 0, 0.35)', dot: '#d97706' },
  NEEDS_INFORMATION: { label: 'Needs Info', bg: 'rgba(249, 115, 22, 0.10)', text: '#9a3412', border: 'rgba(249, 115, 22, 0.25)', dot: '#f97316' },
  RESOLVED: { label: 'Resolved', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },

  // Team & General
  ACTIVE: { label: 'Active', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  READY: { label: 'Ready', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  CAPTAIN: { label: 'Captain', bg: 'rgba(244, 196, 0, 0.14)', text: '#854d0e', border: 'rgba(244, 196, 0, 0.35)', dot: '#d97706' },
  SUCCESS: { label: 'Success', bg: 'rgba(34, 197, 94, 0.10)', text: '#166534', border: 'rgba(34, 197, 94, 0.25)', dot: '#22c55e' },
  FAILED: { label: 'Failed', bg: 'rgba(239, 68, 68, 0.10)', text: '#991b1b', border: 'rgba(239, 68, 68, 0.25)', dot: '#ef4444' },
}

export default function StatusBadge({ status, customLabel, size = 'md' }) {
  if (!status) return null

  const config = BADGE_CONFIG[status] || {
    label: customLabel || status,
    bg: 'rgba(107, 112, 120, 0.08)',
    text: '#4b5563',
    border: 'rgba(107, 112, 120, 0.20)',
    dot: '#6b7280',
  }

  const isSmall = size === 'sm'

  return (
    <span
      className={`status-badge ${isSmall ? 'status-badge--sm' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '5px' : '6px',
        padding: isSmall ? '2px 7px' : '3px 9px',
        borderRadius: '5px',
        fontSize: isSmall ? '11px' : '11.5px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        lineHeight: 1.2,
      }}
    >
      <span
        style={{
          width: isSmall ? '5px' : '6px',
          height: isSmall ? '5px' : '6px',
          borderRadius: '50%',
          background: config.dot,
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      {customLabel || config.label}
    </span>
  )
}

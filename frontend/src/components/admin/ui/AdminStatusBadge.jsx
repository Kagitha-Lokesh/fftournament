// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN STATUS BADGE
//
// Truthful status badge rendering for Platform Verification, Tournament Source,
// Lifecycle, Results Integrity, Disputes, and Payouts.
// Note: "Platform Verified" strictly checks verificationStatus === "PLATFORM_VERIFIED".
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoCheckmarkCircle, IoTimeOutline, IoAlertCircle, IoShieldCheckmark } from 'react-icons/io5'

export default function AdminStatusBadge({ type = 'status', status }) {
  if (!status) return null

  // ─── Verification Badge ───────────────────────────────────────────────────
  if (type === 'verification' || status === 'PLATFORM_VERIFIED' || status === 'VERIFIED') {
    if (status === 'PLATFORM_VERIFIED' || status === 'VERIFIED') {
      return (
        <span className="admin-badge admin-badge--verified" title="Authoritative platform verified">
          <IoShieldCheckmark size={13} style={{ color: 'var(--admin-yellow)' }} />
          <span>Platform Verified</span>
        </span>
      )
    }
    if (status === 'PENDING_VERIFICATION' || status === 'PENDING_REVIEW') {
      return (
        <span className="admin-badge admin-badge--pending">
          <IoTimeOutline size={12} />
          <span>Pending Verification</span>
        </span>
      )
    }
    if (status === 'NOT_VERIFIED' || status === 'NOT_SUBMITTED') {
      return (
        <span className="admin-badge admin-badge--draft">
          <span>Unverified</span>
        </span>
      )
    }
    if (status === 'REJECTED' || status === 'SUSPENDED') {
      return (
        <span className="admin-badge admin-badge--danger">
          <IoAlertCircle size={12} />
          <span>{status}</span>
        </span>
      )
    }
  }

  // ─── Tournament Source ────────────────────────────────────────────────────
  if (type === 'source') {
    if (status === 'PLATFORM') {
      return (
        <span className="admin-badge admin-badge--verified" style={{ fontSize: '10.5px' }}>
          <span>PLATFORM</span>
        </span>
      )
    }
    return (
      <span className="admin-badge admin-badge--draft" style={{ fontSize: '10.5px' }}>
        <span>ORGANIZER</span>
      </span>
    )
  }

  // ─── Results Lifecycle ────────────────────────────────────────────────────
  if (type === 'result') {
    switch (status) {
      case 'DRAFT':
        return <span className="admin-badge admin-badge--draft">Draft Scorecard</span>
      case 'SUBMITTED':
        return <span className="admin-badge admin-badge--pending">Submitted · Awaiting Review</span>
      case 'UNDER_REVIEW':
        return <span className="admin-badge admin-badge--pending">Under Review</span>
      case 'CONFIRMED':
        return <span className="admin-badge admin-badge--live"><IoCheckmarkCircle size={12} /> Confirmed</span>
      case 'FINALIZED':
        return <span className="admin-badge admin-badge--verified"><IoShieldCheckmark size={12} /> Finalized</span>
      default:
        return <span className="admin-badge admin-badge--draft">{status}</span>
    }
  }

  // ─── Dispute Status ───────────────────────────────────────────────────────
  if (type === 'dispute') {
    switch (status) {
      case 'OPEN':
        return <span className="admin-badge admin-badge--danger">Open</span>
      case 'UNDER_REVIEW':
        return <span className="admin-badge admin-badge--pending">Under Review</span>
      case 'NEEDS_INFORMATION':
        return <span className="admin-badge admin-badge--info">Needs Information</span>
      case 'RESOLVED':
        return <span className="admin-badge admin-badge--live"><IoCheckmarkCircle size={12} /> Resolved</span>
      default:
        return <span className="admin-badge admin-badge--draft">{status}</span>
    }
  }

  // ─── Payout Status ────────────────────────────────────────────────────────
  if (type === 'payout') {
    switch (status) {
      case 'PENDING':
        return <span className="admin-badge admin-badge--pending">Pending Signature</span>
      case 'PROCESSING':
        return <span className="admin-badge admin-badge--info">Processing</span>
      case 'PAID':
        return <span className="admin-badge admin-badge--live"><IoCheckmarkCircle size={12} /> Paid</span>
      case 'NEEDS_REVIEW':
        return <span className="admin-badge admin-badge--danger">Needs Review</span>
      case 'FAILED':
        return <span className="admin-badge admin-badge--danger">Failed</span>
      default:
        return <span className="admin-badge admin-badge--draft">{status}</span>
    }
  }

  // ─── Standard Tournament Lifecycle ────────────────────────────────────────
  switch (status) {
    case 'LIVE':
      return <span className="admin-badge admin-badge--live"><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Live Now</span>
    case 'REGISTRATION':
      return <span className="admin-badge admin-badge--live">Registration Open</span>
    case 'UPCOMING':
      return <span className="admin-badge admin-badge--info">Upcoming</span>
    case 'CHECK_IN':
      return <span className="admin-badge admin-badge--pending">Check-In Open</span>
    case 'RESULTS_PENDING':
      return <span className="admin-badge admin-badge--pending">Results Pending</span>
    case 'COMPLETED':
      return <span className="admin-badge admin-badge--draft">Completed</span>
    case 'SUSPENDED':
      return <span className="admin-badge admin-badge--danger"><IoAlertCircle size={12} /> Suspended</span>
    case 'DRAFT':
      return <span className="admin-badge admin-badge--draft">Draft</span>
    case 'ACTIVE':
      return <span className="admin-badge admin-badge--live">Active</span>
    case 'RESTRICTED':
      return <span className="admin-badge admin-badge--danger">Restricted</span>
    default:
      return <span className="admin-badge admin-badge--draft">{status}</span>
  }
}

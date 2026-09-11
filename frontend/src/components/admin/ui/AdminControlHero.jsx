// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN COMPACT CONTROL HERO
//
// Matches Player contextual hero:
// One situation. One message. One primary action.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoAlertCircle,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoCashOutline,
  IoArrowForward
} from 'react-icons/io5'

export default function AdminControlHero({ attentionItems = [], tournaments = [], onNavigate }) {
  const criticalItem = attentionItems.find(i => i.severity === 'HIGH')
  const resultsItem = attentionItems.find(i => i.category === 'RESULTS_REVIEW')
  const organizerItem = attentionItems.find(i => i.category === 'ORGANIZER_VERIFICATION')
  const payoutItem = attentionItems.find(i => i.category === 'PAYOUT_AUTHORIZATION')
  const platformTournament = tournaments.find(t => t.tournamentSource === 'PLATFORM')

  // Case 1: Urgent Critical Issue or Attention Required
  if (resultsItem || criticalItem) {
    const item = resultsItem || criticalItem
    return (
      <section className="admin-hero admin-hero--attention" aria-label="Attention Required">
        <div className="admin-hero__badge">
          <IoAlertCircle size={13} />
          <span>ATTENTION REQUIRED</span>
        </div>
        <h2 className="admin-hero__title">Results awaiting platform review</h2>
        <p className="admin-hero__subtitle">
          {item.subtitle || 'Weekend Squad Clash · Match 04'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate(item.route || '/admin/results')}
          className="admin-hero__action-btn"
        >
          <span>Review Results</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
    )
  }

  // Case 2: Organizer Verification
  if (organizerItem) {
    return (
      <section className="admin-hero" aria-label="Organizer Verification Queue">
        <div className="admin-hero__badge">
          <IoShieldCheckmarkOutline size={13} />
          <span>ORGANIZER GOVERNANCE</span>
        </div>
        <h2 className="admin-hero__title">Organizer application awaiting review</h2>
        <p className="admin-hero__subtitle">
          {organizerItem.subtitle || 'Nexus Esports · Commercial License'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/admin/organizers')}
          className="admin-hero__action-btn"
        >
          <span>Review Application</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
    )
  }

  // Case 3: Payout Authorization
  if (payoutItem) {
    return (
      <section className="admin-hero" aria-label="Prize Disbursement Queue">
        <div className="admin-hero__badge">
          <IoCashOutline size={13} />
          <span>ESCROW DISBURSEMENT</span>
        </div>
        <h2 className="admin-hero__title">Prize payouts awaiting platform release</h2>
        <p className="admin-hero__subtitle">
          {payoutItem.subtitle || '₹12,000 · Verified Podium Finishers'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/admin/payouts')}
          className="admin-hero__action-btn"
        >
          <span>Review Payouts</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
    )
  }

  // Case 4: Platform Normal State
  return (
    <section className="admin-hero" aria-label="Platform Control Status">
      <div className="admin-hero__badge">
        <IoShieldCheckmarkOutline size={13} />
        <span>PLATFORM HEALTH</span>
      </div>
      <h2 className="admin-hero__title">All platform operations running normally</h2>
      <p className="admin-hero__subtitle">
        {platformTournament ? `${platformTournament.title} · Active` : '0 pending disputes or unverified scorecards'}
      </p>
      <button
        type="button"
        onClick={() => onNavigate('/admin/tournaments')}
        className="admin-hero__action-btn"
      >
        <span>Manage Tournaments</span>
        <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER PAYOUTS PAGE
//
// Payout records with truthful states:
// Requested -> Processing -> Paid | Failed | Rejected
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoAlertCircleOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'
import { formatCurrency } from '../../utils/formatters'

export default function OrganizerPayoutsPage({ demoMode, onPayoutRequest }) {
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [amount, setAmount] = useState('5000')
  const [upiId, setUpiId] = useState('battlezone@okhdfcbank.demo')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getPayouts(demoMode)
      setPayouts(list)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const handleRequestSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (onPayoutRequest) {
        await onPayoutRequest(amount, upiId)
      } else {
        await organizerService.requestPayout(amount, upiId)
      }
      setSuccessMsg('Payout request queued for batch transfer!')
      const updated = await organizerService.getPayouts(demoMode)
      setPayouts(updated)
      setTimeout(() => {
        setModalOpen(false)
        setSuccessMsg('')
      }, 1200)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Payouts & Settlements</h1>
          <p className="player-subpage-desc">
            Transfer available tournament earnings to your verified disbursement account.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn--primary"
          style={{ height: '38px', padding: '0 16px', fontSize: '13px', gap: '6px' }}
        >
          <IoCashOutline size={16} />
          <span>Request Payout</span>
        </button>
      </div>

      {/* Payout Records */}
      {payouts.length > 0 ? (
        <div className="org-mobile-card-stack">
          {payouts.map((p) => (
            <div key={p.id} className="org-item-card">
              <div className="org-item-card__header">
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#111318' }}>
                    {formatCurrency(p.amount)}
                  </div>
                  <div className="org-item-card__subtitle">{p.destination}</div>
                </div>
                <OrganizerStatusBadge status={p.status} />
              </div>

              <div className="org-item-card__row">
                <span style={{ fontSize: '12px', color: '#6B7078' }}>
                  Requested: {p.date} · Ref: <code>{p.reference}</code>
                </span>
                <span style={{ fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
                  {p.completionDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No payout history"
          description="Your payout withdrawal requests will be logged here."
          actionLabel="Request Payout"
          onAction={() => setModalOpen(true)}
        />
      )}

      {/* Payout Request Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Request Payout Withdrawal">
        <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '12.5px', color: '#6B7078', margin: 0 }}>
            Withdraw funds from your available balance. Transfers settle via automated banking batches within 24 hours.
          </p>

          <div className="org-form-group">
            <label className="org-form-label">WITHDRAWAL AMOUNT (₹)</label>
            <input
              type="number"
              className="org-form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={500}
              required
            />
            <span className="org-form-hint">Minimum payout request is ₹500.</span>
          </div>

          <div className="org-form-group">
            <label className="org-form-label">DISBURSEMENT UPI ID</label>
            <input
              type="text"
              className="org-form-input"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
            <span className="org-form-hint">Must match your verified organizer disbursement account.</span>
          </div>

          {successMsg && (
            <div style={{ color: '#166534', fontSize: '12.5px', fontWeight: 600 }}>
              ✓ {successMsg}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn--secondary"
              style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn--primary"
              style={{ height: '36px', padding: '0 18px', fontSize: '12.5px' }}
            >
              {submitting ? 'Submitting...' : 'Confirm Withdrawal'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

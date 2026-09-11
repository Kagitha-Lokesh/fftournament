// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN PAYOUTS PAGE (PLAYER-STYLE REBUILD)
//
// Payout authorization queue with compact financial cards on mobile and clean table on desktop.
// Card structure:
//   Pending Prize Payout
//   Tournament Name
//   Amount (₹12,000) · Status (Pending Review)
//   Review Payout →
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoCashOutline,
  IoCheckmarkCircle,
  IoClose,
  IoArrowForward
} from 'react-icons/io5'
import { formatCurrency } from '../../utils/formatters'

export default function AdminPayoutsPage({ onRequestConfirmation, onToast }) {
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedPayout, setSelectedPayout] = useState(null)

  const fetchPayouts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getPayouts('', { status: statusFilter })
      setPayouts(data)
    } catch (err) {
      console.error('Failed to load payouts:', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchPayouts()
  }, [fetchPayouts])

  const handlePayoutAction = (payout, decision) => {
    onRequestConfirmation({
      title: `${decision} Payout #${payout.id}`,
      message: `Authorize disbursement of ₹${payout.amount.toLocaleString()} to ${payout.recipientName}.`,
      actionLabel: `Confirm ${decision}`,
      actionType: decision === 'REJECT' ? 'DANGER' : 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.reviewPayout(payout.id, decision, reason)
        setPayouts(prev => prev.map(p => p.id === updated.id ? updated : p))
        if (selectedPayout?.id === updated.id) {
          setSelectedPayout({ ...updated })
        }
        onToast(`Payout #${updated.id} status updated to ${updated.status}`, 'success')
      }
    })
  }

  const tabs = [
    { id: 'ALL', label: 'All Payouts' },
    { id: 'PENDING', label: 'Pending Review' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'PAID', label: 'Paid' }
  ]

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Payouts</h2>
          <p className="admin-page-header__subtitle">
            Review verified podium winners and host commissions before authorizing electronic disbursement.
          </p>
        </div>
      </div>

      {/* ── 2. Filter Tabs ── */}
      <div className="player-tabs-bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.id}
            className={`player-tab-btn ${statusFilter === tab.id ? 'active' : ''}`}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. Content: Mobile Payout Cards & Desktop Table ── */}
      {loading ? (
        <div className="admin-loading-state">Loading payouts...</div>
      ) : payouts.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Payouts in this Category</h3>
          <p className="admin-empty-state__desc">There are no disbursements matching your current status filter.</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Compact Financial Cards */}
          <div className="admin-mobile-list">
            {payouts.map((p) => (
              <article
                key={p.id}
                className="admin-payout-card"
                onClick={() => setSelectedPayout(p)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPayout(p) }}
              >
                <div className="admin-payout-card__body">
                  <div className="admin-payout-card__type">Pending Prize Payout</div>
                  <h3 className="admin-payout-card__title">{p.tournamentTitle}</h3>

                  <div className="admin-payout-card__amount-row">
                    <span className="admin-payout-card__amount">{formatCurrency(p.amount)}</span>
                    <AdminStatusBadge type="status" status={p.status} />
                  </div>

                  <div className="admin-payout-card__recipient">
                    To: {p.recipientName} ({p.recipientRole})
                  </div>

                  <div className="admin-payout-card__footer">
                    <span className="admin-payout-card__action">
                      <span>Review Payout</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP: Clean Table */}
          <div className="admin-desktop-table admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Payout ID & Tournament</th>
                  <th>Recipient</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: '13px' }}>#{p.id}</div>
                      <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>{p.tournamentTitle}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '12.5px' }}>{p.recipientName}</div>
                      <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>{p.recipientRole}</span>
                    </td>
                    <td style={{ fontWeight: 800, fontSize: '13.5px', color: '#065F46' }}>
                      {formatCurrency(p.amount)}
                    </td>
                    <td style={{ fontSize: '12.5px' }}>{p.type}</td>
                    <td>
                      <AdminStatusBadge type="status" status={p.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedPayout(p)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        Authorize
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── 4. Disbursement Authorization Modal ── */}
      {selectedPayout && (
        <div className="admin-modal-overlay" onClick={() => setSelectedPayout(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoCashOutline size={18} style={{ color: 'var(--admin-yellow)' }} />
                <h3 className="admin-modal__title">Payout Disbursement Authorization</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="admin-modal__close-btn"
                aria-label="Close payout modal"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="admin-modal__body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{selectedPayout.tournamentTitle}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--admin-grey)', marginTop: '2px' }}>
                    Payout #{selectedPayout.id}
                  </div>
                </div>
                <AdminStatusBadge type="status" status={selectedPayout.status} />
              </div>

              <div className="admin-info-box" style={{ marginBottom: '16px' }}>
                <div className="admin-info-row">
                  <span>Payee:</span>
                  <strong>{selectedPayout.recipientName} ({selectedPayout.recipientRole})</strong>
                </div>
                <div className="admin-info-row">
                  <span>Disbursement Amount:</span>
                  <strong style={{ color: '#065F46', fontSize: '15px' }}>{formatCurrency(selectedPayout.amount)}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Disbursement Route:</span>
                  <strong>{selectedPayout.payoutMethod || 'Direct Escrow Release'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedPayout.status === 'PENDING' && (
                  <button
                    type="button"
                    onClick={() => handlePayoutAction(selectedPayout, 'APPROVE')}
                    className="admin-btn admin-btn--yellow admin-btn--sm"
                  >
                    Authorize Release
                  </button>
                )}
                {selectedPayout.status === 'PROCESSING' && (
                  <button
                    type="button"
                    onClick={() => handlePayoutAction(selectedPayout, 'FINALIZE')}
                    className="admin-btn admin-btn--primary admin-btn--sm"
                  >
                    Confirm Settlement
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handlePayoutAction(selectedPayout, 'REJECT')}
                  className="admin-btn admin-btn--danger admin-btn--sm"
                >
                  Hold Disbursement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

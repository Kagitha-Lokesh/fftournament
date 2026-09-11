// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN DISPUTES ARBITRATION CENTER (PLAYER-STYLE REBUILD)
//
// Clean dispute arbitration with Player card language on mobile and table on desktop.
// Workflow: OPEN → UNDER_REVIEW → NEEDS_INFORMATION → RESOLVED.
// Card structure:
//   Dispute #ID
//   Tournament Name
//   Reason / Issue · Lifecycle status
//   Submitted by Player/Host
//   Open Dispute →
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoAlertCircleOutline,
  IoCheckmarkCircle,
  IoClose,
  IoArrowForward
} from 'react-icons/io5'

export default function AdminDisputesPage({ onRequestConfirmation, onToast }) {
  const [disputes, setDisputes] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedDispute, setSelectedDispute] = useState(null)

  const fetchDisputes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getDisputes('', { status: statusFilter })
      setDisputes(data)
    } catch (err) {
      console.error('Failed to load disputes:', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchDisputes()
  }, [fetchDisputes])

  const handleResolve = (dispute, newState) => {
    onRequestConfirmation({
      title: `Update Dispute: ${dispute.id}`,
      message: `Set status of Case #${dispute.id} (${dispute.reason}) to ${newState}.`,
      actionLabel: `Transition to ${newState}`,
      actionType: newState === 'RESOLVED' ? 'PRIMARY' : 'SECONDARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.updateDispute(dispute.id, newState, reason, reason)
        setDisputes(prev => prev.map(d => d.id === updated.id ? updated : d))
        if (selectedDispute?.id === updated.id) {
          setSelectedDispute({ ...updated })
        }
        onToast(`Dispute #${updated.id} updated to ${newState}`, 'success')
      }
    })
  }

  const tabs = [
    { id: 'ALL', label: 'All Disputes' },
    { id: 'OPEN', label: 'Open' },
    { id: 'UNDER_REVIEW', label: 'Under Review' },
    { id: 'RESOLVED', label: 'Resolved' }
  ]

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Disputes</h2>
          <p className="admin-page-header__subtitle">
            Platform arbitration for scoring discrepancies, roster violations, and competitive appeals.
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

      {/* ── 3. Content: Mobile Dispute Cards & Desktop Table ── */}
      {loading ? (
        <div className="admin-loading-state">Loading disputes...</div>
      ) : disputes.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Disputes in this Category</h3>
          <p className="admin-empty-state__desc">There are no active or historical dispute cases matching this filter.</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Compact Dispute Cards */}
          <div className="admin-mobile-list">
            {disputes.map((d) => (
              <article
                key={d.id}
                className="admin-dispute-card"
                onClick={() => setSelectedDispute(d)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedDispute(d) }}
              >
                <div className="admin-dispute-card__body">
                  <div className="admin-dispute-card__case-id">Dispute #{d.id}</div>
                  <h3 className="admin-dispute-card__title">{d.tournamentTitle}</h3>

                  <div className="admin-dispute-card__issue-row">
                    <span className="admin-dispute-card__reason">{d.reason}</span>
                    <AdminStatusBadge type="status" status={d.status} />
                  </div>

                  <div className="admin-dispute-card__author">
                    Submitted by {d.raisedByRole === 'PLAYER' ? 'Player' : d.raisedBy}
                  </div>

                  <div className="admin-dispute-card__footer">
                    <span className="admin-dispute-card__action">
                      <span>Open Dispute</span>
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
                  <th>Case ID & Tournament</th>
                  <th>Reason</th>
                  <th>Complainant</th>
                  <th>Status</th>
                  <th>Filed At</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: '13px' }}>#{d.id}</div>
                      <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>{d.tournamentTitle}</span>
                    </td>
                    <td style={{ fontSize: '12.5px', fontWeight: 600 }}>{d.reason}</td>
                    <td style={{ fontSize: '12.5px' }}>{d.raisedBy} ({d.raisedByRole})</td>
                    <td>
                      <AdminStatusBadge type="status" status={d.status} />
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>{d.createdAt}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedDispute(d)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        Arbitrate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── 4. Arbitration Modal ── */}
      {selectedDispute && (
        <div className="admin-modal-overlay" onClick={() => setSelectedDispute(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoAlertCircleOutline size={18} style={{ color: 'var(--admin-yellow)' }} />
                <h3 className="admin-modal__title">Dispute Case #{selectedDispute.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="admin-modal__close-btn"
                aria-label="Close arbitration modal"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="admin-modal__body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{selectedDispute.tournamentTitle}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--admin-grey)', marginTop: '2px' }}>
                    Filed by {selectedDispute.raisedBy} ({selectedDispute.raisedByRole})
                  </div>
                </div>
                <AdminStatusBadge type="status" status={selectedDispute.status} />
              </div>

              <div className="admin-info-box" style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-grey)', marginBottom: '4px' }}>
                  Complaint Statement
                </div>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.45 }}>
                  "{selectedDispute.details}"
                </p>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--admin-grey)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Arbitration Decisions
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedDispute.status === 'OPEN' && (
                  <button
                    type="button"
                    onClick={() => handleResolve(selectedDispute, 'UNDER_REVIEW')}
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                  >
                    Take Under Review
                  </button>
                )}
                {selectedDispute.status !== 'RESOLVED' && (
                  <button
                    type="button"
                    onClick={() => handleResolve(selectedDispute, 'RESOLVED')}
                    className="admin-btn admin-btn--yellow admin-btn--sm"
                  >
                    Resolve & Close Case
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

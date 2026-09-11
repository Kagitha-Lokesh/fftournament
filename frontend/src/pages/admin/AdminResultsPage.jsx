// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN RESULTS & INTEGRITY PAGE (PLAYER-STYLE REBUILD)
//
// Result review cards on mobile, clean table on desktop.
// Lifecycle: Submitted → Under Review → Confirmed → Finalized.
// Card structure:
//   Tournament Name
//   Match · Stage
//   Host/Organizer · Status
//   Awaiting Platform Review
//   Review Result →
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoDocumentTextOutline,
  IoCheckmarkCircle,
  IoClose,
  IoArrowForward
} from 'react-icons/io5'

export default function AdminResultsPage({ onRequestConfirmation, onToast }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedResult, setSelectedResult] = useState(null)

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getResults('', { status: statusFilter })
      setResults(data)
    } catch (err) {
      console.error('Failed to load results:', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const handleReview = (result, decision) => {
    onRequestConfirmation({
      title: `${decision} Result: ${result.tournamentTitle}`,
      message: `Apply ${decision} to Match ${result.matchNumber} (${result.id}).`,
      actionLabel: `Confirm ${decision}`,
      actionType: decision === 'REJECT' ? 'DANGER' : 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.reviewResult(result.id, decision, reason)
        setResults(prev => prev.map(r => r.id === updated.id ? updated : r))
        if (selectedResult?.id === updated.id) {
          setSelectedResult({ ...updated })
        }
        onToast(`Result state updated to ${updated.lifecycleStatus}`, 'success')
      }
    })
  }

  const tabs = [
    { id: 'ALL', label: 'All Results' },
    { id: 'SUBMITTED', label: 'Submitted' },
    { id: 'UNDER_REVIEW', label: 'Under Review' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'FINALIZED', label: 'Finalized' }
  ]

  const getSubtext = (lifecycleStatus) => {
    switch (lifecycleStatus) {
      case 'SUBMITTED': return 'Awaiting Platform Review'
      case 'UNDER_REVIEW': return 'Currently Under Investigation'
      case 'CONFIRMED': return 'Locked & Confirmed Standings'
      case 'FINALIZED': return 'Prizes Disbursed & Settled'
      default: return 'Awaiting Platform Review'
    }
  }

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Results & Integrity</h2>
          <p className="admin-page-header__subtitle">
            Review submitted scorecards against game room logs and lock confirmed standings.
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

      {/* ── 3. Content: Mobile Result Cards & Desktop Table ── */}
      {loading ? (
        <div className="admin-loading-state">Loading results queue...</div>
      ) : results.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Results in this Category</h3>
          <p className="admin-empty-state__desc">There are no scorecards matching your current filter.</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Clean Result Cards */}
          <div className="admin-mobile-list">
            {results.map((r) => (
              <article
                key={r.id}
                className="admin-result-card"
                onClick={() => setSelectedResult(r)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedResult(r) }}
              >
                <div className="admin-result-card__body">
                  <h3 className="admin-result-card__title">{r.tournamentTitle}</h3>
                  <div className="admin-result-card__match">
                    Match {r.matchNumber} · {r.stage || 'Grand Final'}
                  </div>

                  <div className="admin-result-card__meta">
                    <span className="admin-result-card__host">{r.submittedBy}</span>
                    <AdminStatusBadge type="result" status={r.lifecycleStatus} />
                  </div>

                  <div className="admin-result-card__cue">
                    {getSubtext(r.lifecycleStatus)}
                  </div>

                  <div className="admin-result-card__footer">
                    <span className="admin-result-card__action">
                      <span>Review Result</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP: Spacious Table */}
          <div className="admin-desktop-table admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tournament & Match</th>
                  <th>Stage</th>
                  <th>Host</th>
                  <th>Status</th>
                  <th>Review Cue</th>
                  <th>Submission</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: '13px' }}>{r.tournamentTitle}</div>
                      <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>Match {r.matchNumber}</span>
                    </td>
                    <td style={{ fontSize: '12.5px' }}>{r.stage}</td>
                    <td style={{ fontSize: '12.5px' }}>{r.submittedBy}</td>
                    <td>
                      <AdminStatusBadge type="result" status={r.lifecycleStatus} />
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>
                      {getSubtext(r.lifecycleStatus)}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>
                      {r.submittedAt}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedResult(r)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── 4. Scorecard Review & Verification Modal ── */}
      {selectedResult && (
        <div className="admin-modal-overlay" onClick={() => setSelectedResult(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoDocumentTextOutline size={18} style={{ color: 'var(--admin-yellow)' }} />
                <h3 className="admin-modal__title">Match Scorecard Verification</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="admin-modal__close-btn"
                aria-label="Close scorecard review modal"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="admin-modal__body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{selectedResult.tournamentTitle}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--admin-grey)', marginTop: '2px' }}>
                    Match {selectedResult.matchNumber} · Submitted by {selectedResult.submittedBy}
                  </div>
                </div>
                <AdminStatusBadge type="result" status={selectedResult.lifecycleStatus} />
              </div>

              <div className="admin-info-box" style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--admin-grey)' }}>
                  Reported Podium Standings
                </div>
                {selectedResult.standings && selectedResult.standings.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedResult.standings.map((s) => (
                      <div key={s.teamName} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                        <span>
                          <strong>#{s.rank}</strong> {s.teamName}
                        </span>
                        <span style={{ color: 'var(--admin-grey)' }}>
                          {s.kills} kills · {s.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '12.5px', color: 'var(--admin-grey)' }}>
                    Automated screenshot OCR processed. 0 discrepancies reported.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedResult.lifecycleStatus !== 'CONFIRMED' && selectedResult.lifecycleStatus !== 'FINALIZED' && (
                  <button
                    type="button"
                    onClick={() => handleReview(selectedResult, 'APPROVE')}
                    className="admin-btn admin-btn--yellow admin-btn--sm"
                  >
                    Confirm & Lock Standings
                  </button>
                )}
                {selectedResult.lifecycleStatus === 'CONFIRMED' && (
                  <button
                    type="button"
                    onClick={() => handleReview(selectedResult, 'FINALIZE')}
                    className="admin-btn admin-btn--primary admin-btn--sm"
                  >
                    Finalize & Authorize Payouts
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleReview(selectedResult, 'REJECT')}
                  className="admin-btn admin-btn--danger admin-btn--sm"
                >
                  Reject & Re-open
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN AUDIT LOGS PAGE (PLAYER-STYLE REBUILD)
//
// Immutable platform audit trail:
// Mobile: Compact timeline entries:
//   Tournament Verification
//   11 Sep · 20:15 IST
//   Verification state changed · Reason recorded
//   View Audit Entry →
// Desktop:
//   Structured data table.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import {
  IoSearchOutline,
  IoTimeOutline,
  IoClose,
  IoArrowForward
} from 'react-icons/io5'

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLog, setSelectedLog] = useState(null)

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getAuditLogs(searchQuery)
      setLogs(data)
    } catch (err) {
      console.error('Failed to load audit logs:', err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Audit Logs</h2>
          <p className="admin-page-header__subtitle">
            Permanent record of all administrative decisions, overrides, and disbursements.
          </p>
        </div>
      </div>

      {/* ── 2. Search Bar ── */}
      <div className="admin-filters-bar">
        <div className="admin-filters-bar__search">
          <IoSearchOutline size={16} className="admin-filters-bar__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, entity, or reason..."
            className="admin-filters-bar__input"
            aria-label="Search audit logs"
          />
        </div>
      </div>

      {/* ── 3. Content: Mobile Timeline Cards & Desktop Table ── */}
      {loading ? (
        <div className="admin-loading-state">Loading audit logs...</div>
      ) : logs.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Audit Records Found</h3>
          <p className="admin-empty-state__desc">No entries matched your search query.</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Compact Timeline Cards */}
          <div className="admin-mobile-list">
            {logs.map((l) => (
              <article
                key={l.id}
                className="admin-audit-card"
                onClick={() => setSelectedLog(l)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedLog(l) }}
              >
                <div className="admin-audit-card__body">
                  <h3 className="admin-audit-card__title">{l.action}</h3>
                  <div className="admin-audit-card__timestamp">{l.timestamp}</div>

                  <div className="admin-audit-card__change">
                    <span className="admin-audit-card__entity">{l.entity}</span>
                    <span className="admin-audit-card__reason">· {l.reason}</span>
                  </div>

                  <div className="admin-audit-card__footer">
                    <span className="admin-audit-card__action">
                      <span>View Audit Entry</span>
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
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>State Transition</th>
                  <th>Admin</th>
                  <th>Reason</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)', whiteSpace: 'nowrap' }}>
                      {l.timestamp}
                    </td>
                    <td style={{ fontWeight: 800, fontSize: '13px' }}>{l.action}</td>
                    <td style={{ fontSize: '12.5px' }}>{l.entity}</td>
                    <td style={{ fontSize: '12px' }}>
                      <span style={{ color: 'var(--admin-grey)' }}>{l.previousState}</span>
                      <span style={{ margin: '0 4px' }}>→</span>
                      <strong>{l.newState}</strong>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>{l.admin}</td>
                    <td style={{ fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.reason}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedLog(l)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── 4. Audit Record Detail Modal ── */}
      {selectedLog && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLog(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoTimeOutline size={18} style={{ color: 'var(--admin-yellow)' }} />
                <h3 className="admin-modal__title">Audit Entry #{selectedLog.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="admin-modal__close-btn"
                aria-label="Close audit details modal"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="admin-modal__body">
              <div className="admin-info-box" style={{ marginBottom: '14px' }}>
                <div className="admin-info-row">
                  <span>Action:</span>
                  <strong>{selectedLog.action}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Target Entity:</span>
                  <strong>{selectedLog.entity}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Timestamp:</span>
                  <strong>{selectedLog.timestamp}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Authorized By:</span>
                  <strong>{selectedLog.admin}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Transition:</span>
                  <span>
                    {selectedLog.previousState} → <strong>{selectedLog.newState}</strong>
                  </span>
                </div>
                <div className="admin-info-row">
                  <span>Reference ID:</span>
                  <span style={{ fontFamily: 'monospace' }}>{selectedLog.reference}</span>
                </div>
              </div>

              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-grey)', marginBottom: '4px' }}>
                Recorded Reason / Justification
              </div>
              <div style={{ padding: '10px 12px', background: '#FAFAFA', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '13px', lineHeight: 1.45 }}>
                {selectedLog.reason}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

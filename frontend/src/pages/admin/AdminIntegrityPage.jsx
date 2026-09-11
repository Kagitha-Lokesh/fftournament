// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN INTEGRITY & REVIEW FLAGS QUEUE
//
// Platform risk signal queue: Statistical kill/damage anomalies, duplicate
// account signals, and roster inconsistencies.
// Neutral terminology: "FLAGGED FOR REVIEW" instead of presumptive accusations.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import { IoFlagOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoShieldOutline } from 'react-icons/io5'

export default function AdminIntegrityPage({ onRequestConfirmation, onToast }) {
  const [flags, setFlags] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFlags = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getIntegrityFlags()
      setFlags(data)
    } catch (err) {
      console.error('Failed to load integrity flags:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFlags()
  }, [fetchFlags])

  const handleResolveFlag = (flag, decision) => {
    onRequestConfirmation({
      title: `${decision === 'RESOLVE' ? 'Resolve' : 'Dismiss'} Flag #${flag.id}`,
      message: `Complete the platform integrity assessment for ${flag.entityName} (${flag.type}).`,
      actionLabel: `${decision} Flag`,
      actionType: 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.resolveIntegrityFlag(flag.id, decision, reason, reason)
        setFlags(prev => prev.map(f => f.id === updated.id ? updated : f))
        onToast(`Integrity Flag #${flag.id} ${decision === 'RESOLVE' ? 'resolved' : 'dismissed'}`, 'success')
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--admin-ink)' }}>
          Integrity & Risk Signal Queue
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-grey)' }}>
          Review algorithmic signals for anomalous kill patterns, subnet collisions, and unverified roster substitutions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {flags.map((flag) => (
          <div key={flag.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoFlagOutline size={18} style={{ color: flag.status === 'FLAGGED_FOR_REVIEW' ? 'var(--admin-red)' : 'var(--admin-grey)' }} />
                <h3 className="admin-card__title">
                  FLAG #{flag.id} · {flag.type.replace(/_/g, ' ')}
                </h3>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: flag.status === 'FLAGGED_FOR_REVIEW' ? 'var(--admin-red-bg)' : 'var(--admin-light-grey)',
                    color: flag.status === 'FLAGGED_FOR_REVIEW' ? 'var(--admin-red)' : 'var(--admin-grey)'
                  }}
                >
                  {flag.status.replace(/_/g, ' ')}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>{flag.timestamp}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '13.5px', color: 'var(--admin-ink)' }}>
                Target Entity: <strong>{flag.entityName}</strong> ({flag.entityType}) · Tournament: {flag.tournamentTitle}
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#FAFAFA',
                  borderRadius: '6px',
                  border: '1px solid var(--admin-border)',
                  fontSize: '13px',
                  color: 'var(--admin-grey)',
                  lineHeight: 1.5
                }}
              >
                {flag.details}
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--admin-ink)' }}>
                <strong>Recommended Action:</strong> {flag.actionRequired}
              </div>
            </div>

            {flag.status === 'FLAGGED_FOR_REVIEW' && (
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleResolveFlag(flag, 'RESOLVE')}
                  className="admin-btn admin-btn--primary admin-btn--sm"
                >
                  <IoCheckmarkCircleOutline size={16} />
                  <span>Verify & Resolve</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleResolveFlag(flag, 'DISMISS')}
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                >
                  <IoCloseCircleOutline size={16} />
                  <span>Dismiss as False Positive</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

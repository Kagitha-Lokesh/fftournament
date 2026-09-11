// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN CONFIRMATION & AUDIT REASON MODAL
//
// Enforces platform governance rules: Every elevated administrative mutation
// requires explicit confirmation and a documented audit justification.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { IoClose, IoAlertCircle, IoShieldOutline } from 'react-icons/io5'

export default function AdminConfirmationModal({
  isOpen,
  title,
  message,
  actionLabel = 'Confirm Action',
  actionType = 'PRIMARY',
  requiresReason = true,
  onConfirm,
  onClose
}) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] = useState('')

  if (!isOpen) return null

  const handleConfirm = async () => {
    if (requiresReason && !reason.trim()) {
      setValidationError('An administrative reason is mandatory for platform audit records.')
      return
    }

    try {
      setSubmitting(true)
      setValidationError('')
      await onConfirm(reason.trim())
      setReason('')
    } catch (err) {
      setValidationError(err.message || 'Action execution failed')
    } finally {
      setSubmitting(false)
    }
  }

  const isDanger = actionType === 'DANGER'

  return (
    <div className="admin-modal-overlay" style={{ zIndex: 1100 }}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
        <div className="admin-modal__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDanger ? (
              <IoAlertCircle size={20} style={{ color: 'var(--admin-red)' }} />
            ) : (
              <IoShieldOutline size={20} style={{ color: 'var(--admin-yellow)' }} />
            )}
            <h2 id="confirm-modal-title" className="admin-modal__title">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-grey)' }}
            aria-label="Close dialog"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="admin-modal__body">
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--admin-grey)', lineHeight: 1.5 }}>
            {message}
          </p>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--admin-light-grey)',
              borderRadius: '6px',
              border: '1px solid var(--admin-border)',
              fontSize: '12px',
              color: 'var(--admin-grey)'
            }}
          >
            <strong>Platform Audit Notice:</strong> This action will be permanently recorded in the immutable platform audit ledger with your administrator signature and timestamp.
          </div>

          {requiresReason && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="admin-reason-input"
                style={{ fontSize: '13px', fontWeight: 600, color: 'var(--admin-ink)' }}
              >
                Administrative Reason / Justification <span style={{ color: 'var(--admin-red)' }}>*</span>
              </label>
              <textarea
                id="admin-reason-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Detail the evidence, rule clause, or justification for this decision..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: validationError ? '1px solid var(--admin-red)' : '1px solid var(--admin-border)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
                disabled={submitting}
              />
              {validationError && (
                <span style={{ fontSize: '12px', color: 'var(--admin-red)', fontWeight: 500 }}>
                  {validationError}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="admin-modal__footer">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="admin-btn admin-btn--secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className={`admin-btn ${isDanger ? 'admin-btn--danger' : 'admin-btn--primary'}`}
          >
            {submitting ? 'Executing & Logging...' : actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

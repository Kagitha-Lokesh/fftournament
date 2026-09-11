// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN TOAST CONTAINER
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoCheckmarkCircle, IoInformationCircle, IoAlertCircle, IoClose } from 'react-icons/io5'

export default function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success'
        const isError = toast.type === 'error'
        const icon = isSuccess ? (
          <IoCheckmarkCircle size={18} color="#10B981" />
        ) : isError ? (
          <IoAlertCircle size={18} color="#EF4444" />
        ) : (
          <IoInformationCircle size={18} color="#F4C400" />
        )

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              background: '#111318',
              color: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.4,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => onClose(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                display: 'flex',
                padding: '2px'
              }}
              aria-label="Dismiss toast"
            >
              <IoClose size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

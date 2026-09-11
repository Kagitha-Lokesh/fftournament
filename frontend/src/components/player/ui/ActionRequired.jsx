import React from 'react'
import { IoAlertCircleOutline, IoArrowForwardOutline, IoTimeOutline } from 'react-icons/io5'

export default function ActionRequired({ action, onAction }) {
  if (!action) return null

  const isWarning = action.severity === 'warning'

  return (
    <div
      className="action-required-card"
      style={{
        background: isWarning ? 'rgba(244, 196, 0, 0.08)' : 'rgba(59, 130, 246, 0.05)',
        border: `1.5px solid ${isWarning ? 'rgba(244, 196, 0, 0.35)' : 'rgba(59, 130, 246, 0.25)'}`,
        borderRadius: '10px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: '1 1 260px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: isWarning ? 'rgba(244, 196, 0, 0.18)' : 'rgba(59, 130, 246, 0.12)',
            color: isWarning ? '#854d0e' : '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <IoAlertCircleOutline size={19} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isWarning ? '#854d0e' : '#1d4ed8',
              }}
            >
              Action Required
            </span>
            {action.expiresAt && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: '#6B7078',
                  fontWeight: 500,
                }}
              >
                <IoTimeOutline size={12} />
                Closes {action.expiresAt}
              </span>
            )}
          </div>
          <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#111318', marginTop: '2px' }}>
            {action.title}
          </div>
          <div style={{ fontSize: '12.5px', color: '#6B7078', marginTop: '1px' }}>
            {action.description}
          </div>
        </div>
      </div>

      <button
        onClick={() => onAction && onAction(action)}
        className="btn btn--primary"
        style={{
          height: '36px',
          padding: '0 16px',
          fontSize: '12.5px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <span>{action.actionLabel}</span>
        <IoArrowForwardOutline size={14} />
      </button>
    </div>
  )
}

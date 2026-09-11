import React from 'react'

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div
      className="empty-state-box"
      style={{
        padding: '44px 24px',
        textAlign: 'center',
        background: '#FFFFFF',
        border: '1px dashed #E4E7EB',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: 'rgba(244, 196, 0, 0.12)',
            color: '#854d0e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
          }}
        >
          {icon}
        </div>
      )}
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '13px', color: '#6B7078', maxWidth: '380px', lineHeight: 1.5, marginBottom: actionLabel ? '18px' : 0 }}>
        {description}
      </p>
      {actionLabel && (
        <button onClick={onAction} className="btn btn--primary" style={{ height: '38px', padding: '0 18px', fontSize: '13px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

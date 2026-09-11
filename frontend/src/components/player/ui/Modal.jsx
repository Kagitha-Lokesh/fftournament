import React, { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

export default function Modal({ isOpen, onClose, title, children, maxWidth = '540px' }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(17, 19, 24, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="modal-surface"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth,
          background: '#FFFFFF',
          borderRadius: '14px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.16)',
          border: '1px solid #E4E7EB',
          overflow: 'hidden',
          animation: 'modalSlideUp 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E4E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318' }}>{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7078',
              transition: 'background 150ms, color 150ms',
            }}
            className="modal-close-btn"
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </div>
  )
}

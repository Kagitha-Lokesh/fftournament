// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN MENU DRAWER
//
// Mobile slide-over drawer for secondary administrative destinations.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoClose,
  IoAddCircleOutline,
  IoPeopleOutline,
  IoGameControllerOutline,
  IoShieldCheckmarkOutline,
  IoBarChartOutline,
  IoWalletOutline,
  IoCashOutline,
  IoAlertCircleOutline,
  IoFlagOutline,
  IoDocumentTextOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoLogOutOutline
} from 'react-icons/io5'

export default function AdminMenuDrawer({ isOpen, onClose, onNavigate, onSignOut }) {
  if (!isOpen) return null

  const menuSections = [
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Create Tournament', path: '/admin/tournaments/new', icon: IoAddCircleOutline },
        { label: 'Participants', path: '/admin/participants', icon: IoPeopleOutline },
        { label: 'Matches', path: '/admin/matches', icon: IoGameControllerOutline }
      ]
    },
    {
      title: 'PEOPLE & CAREER',
      items: [
        { label: 'Organizers', path: '/admin/organizers', icon: IoShieldCheckmarkOutline },
        { label: 'Player Career History', path: '/admin/player-history', icon: IoBarChartOutline }
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { label: 'Financial Ledger', path: '/admin/ledger', icon: IoWalletOutline },
        { label: 'Payouts', path: '/admin/payouts', icon: IoCashOutline }
      ]
    },
    {
      title: 'INTEGRITY & OVERSIGHT',
      items: [
        { label: 'Disputes', path: '/admin/disputes', icon: IoAlertCircleOutline },
        { label: 'Review Flags', path: '/admin/integrity', icon: IoFlagOutline },
        { label: 'Audit Logs', path: '/admin/audit-logs', icon: IoDocumentTextOutline }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Notifications', path: '/admin/notifications', icon: IoNotificationsOutline },
        { label: 'Profile & Security', path: '/admin/profile', icon: IoSettingsOutline }
      ]
    }
  ]

  return (
    <>
      <div
        className="admin-modal-overlay"
        onClick={onClose}
        style={{ zIndex: 1000 }}
      />
      <aside className="admin-drawer" aria-label="Secondary Navigation Drawer">
        <div className="admin-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '15px' }}>PLATFORM MENU</span>
            <span className="admin-sidebar__role-tag">ADMIN</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              color: 'var(--admin-ink)'
            }}
            aria-label="Close menu"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="admin-drawer__body">
          {menuSections.map((section) => (
            <div key={section.title} style={{ marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--admin-grey)',
                  padding: '6px 8px'
                }}
              >
                {section.title}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      onNavigate(item.path)
                      onClose()
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--admin-ink)',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: '44px'
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--admin-grey)', flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--admin-border)' }}>
            <button
              type="button"
              onClick={() => {
                onClose()
                onSignOut()
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                background: 'none',
                border: 'none',
                color: 'var(--admin-red)',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                minHeight: '44px'
              }}
            >
              <IoLogOutOutline size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

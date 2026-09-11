// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN TOP BAR
//
// Clean semantic header: Shows current page title without breadcrumb clutter,
// DEMO mode badge, notification trigger, and admin identity.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoNotificationsOutline, IoMenuOutline } from 'react-icons/io5'

export default function AdminTopBar({
  currentPath,
  onNavigate,
  onOpenDrawer,
  demoMode,
  setDemoMode
}) {
  const getPageTitle = (path) => {
    if (path === '/admin') return 'Dashboard'
    if (path === '/admin/tournaments/new') return 'Create Tournament'
    if (path.startsWith('/admin/tournaments')) return 'Tournaments'
    if (path.startsWith('/admin/participants')) return 'Participants'
    if (path.startsWith('/admin/matches')) return 'Matches'
    if (path.startsWith('/admin/results')) return 'Results & Integrity'
    if (path.startsWith('/admin/users')) return 'Users'
    if (path.startsWith('/admin/organizers')) return 'Organizers'
    if (path.startsWith('/admin/player-history')) return 'Player Career History'
    if (path.startsWith('/admin/ledger')) return 'Financial Ledger'
    if (path.startsWith('/admin/payouts')) return 'Payouts'
    if (path.startsWith('/admin/disputes')) return 'Disputes'
    if (path.startsWith('/admin/integrity')) return 'Integrity Review Flags'
    if (path.startsWith('/admin/audit-logs')) return 'Audit Logs'
    if (path.startsWith('/admin/notifications')) return 'Notifications'
    if (path.startsWith('/admin/profile')) return 'Admin Profile'
    return 'Governance'
  }

  const title = getPageTitle(currentPath)

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__left">
        <button
          type="button"
          onClick={onOpenDrawer}
          className="admin-topbar__btn"
          style={{ display: 'flex' }}
          aria-label="Open secondary navigation menu"
        >
          <IoMenuOutline size={22} />
        </button>
        <h1 className="admin-topbar__title">{title}</h1>
      </div>

      <div className="admin-topbar__right">
        {/* Synthetic Demo Mode Switcher */}
        <button
          type="button"
          onClick={() => setDemoMode(prev => prev === 'ACTIVE' ? 'EMPTY' : 'ACTIVE')}
          className="admin-topbar__demo-badge"
          title="Click to toggle between populated and empty demo states"
        >
          <span>DEMO</span>
          <span style={{ opacity: 0.7 }}>({demoMode})</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => onNavigate('/admin/notifications')}
          className="admin-topbar__btn"
          aria-label="Notifications"
        >
          <IoNotificationsOutline size={20} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--admin-yellow)',
              borderRadius: '50%',
              border: '2px solid #FFFFFF'
            }}
          />
        </button>

        {/* Admin Avatar */}
        <button
          type="button"
          onClick={() => onNavigate('/admin/profile')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="View Admin Profile"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Admin"
            className="admin-topbar__avatar"
          />
        </button>
      </div>
    </header>
  )
}

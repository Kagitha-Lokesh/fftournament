// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN SIDEBAR
//
// Desktop navigation organized into 6 platform operational domains:
// OVERVIEW, OPERATIONS, PEOPLE, FINANCE, INTEGRITY, SYSTEM.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoGridOutline,
  IoTrophyOutline,
  IoAddCircleOutline,
  IoPeopleOutline,
  IoGameControllerOutline,
  IoCheckmarkDoneCircleOutline,
  IoPersonCircleOutline,
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

export default function AdminSidebar({ currentPath, onNavigate, onSignOut }) {
  const groups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin', icon: IoGridOutline }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Tournaments', path: '/admin/tournaments', icon: IoTrophyOutline },
        { label: 'Create Tournament', path: '/admin/tournaments/new', icon: IoAddCircleOutline },
        { label: 'Participants', path: '/admin/participants', icon: IoPeopleOutline },
        { label: 'Matches', path: '/admin/matches', icon: IoGameControllerOutline },
        { label: 'Results', path: '/admin/results', icon: IoCheckmarkDoneCircleOutline }
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        { label: 'Users', path: '/admin/users', icon: IoPersonCircleOutline },
        { label: 'Organizers', path: '/admin/organizers', icon: IoShieldCheckmarkOutline },
        { label: 'Player History', path: '/admin/player-history', icon: IoBarChartOutline }
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
      title: 'INTEGRITY',
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
        { label: 'Profile', path: '/admin/profile', icon: IoSettingsOutline }
      ]
    }
  ]

  return (
    <aside className="admin-sidebar" aria-label="Admin Navigation">
      <div className="admin-sidebar__header">
        <a
          href="/admin"
          onClick={(e) => { e.preventDefault(); onNavigate('/admin') }}
          className="admin-sidebar__brand"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polygon points="10,2 18,17 2,17" stroke="#F4C400" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(244,196,0,0.15)"/>
            <line x1="10" y1="8" x2="10" y2="13" stroke="#F4C400" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="10" cy="15.5" r="1" fill="#F4C400"/>
          </svg>
          <span>FF WAR</span>
        </a>
        <span className="admin-sidebar__role-tag">ADMIN</span>
      </div>

      <nav className="admin-sidebar__nav">
        {groups.map((group) => (
          <div key={group.title} className="admin-sidebar__group">
            <div className="admin-sidebar__group-title">{group.title}</div>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path || (item.path !== '/admin' && currentPath.startsWith(item.path))

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate(item.path)
                  }}
                  className={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                >
                  <Icon className="admin-sidebar__link-icon" />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--admin-border)' }}>
          <button
            type="button"
            onClick={onSignOut}
            className="admin-sidebar__link"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <IoLogOutOutline className="admin-sidebar__link-icon" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

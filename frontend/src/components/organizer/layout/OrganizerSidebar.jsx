// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER DESKTOP SIDEBAR
//
// Structured navigation grouped logically by operational domain:
// OVERVIEW · TOURNAMENTS · FINANCE · SUPPORT · ACCOUNT
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoHomeOutline,
  IoTrophyOutline,
  IoAddCircleOutline,
  IoPeopleOutline,
  IoGameControllerOutline,
  IoStatsChartOutline,
  IoWalletOutline,
  IoCashOutline,
  IoShieldCheckmarkOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'

const NAV_GROUPS = [
  {
    group: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/organizer', icon: <IoHomeOutline size={18} /> },
    ],
  },
  {
    group: 'TOURNAMENTS',
    items: [
      { label: 'Tournaments', path: '/organizer/tournaments', icon: <IoTrophyOutline size={18} /> },
      { label: 'Create Tournament', path: '/organizer/tournaments/new', icon: <IoAddCircleOutline size={18} />, highlight: true },
      { label: 'Participants', path: '/organizer/participants', icon: <IoPeopleOutline size={18} /> },
      { label: 'Matches', path: '/organizer/matches', icon: <IoGameControllerOutline size={18} /> },
      { label: 'Results', path: '/organizer/results', icon: <IoStatsChartOutline size={18} /> },
    ],
  },
  {
    group: 'FINANCE',
    items: [
      { label: 'Earnings', path: '/organizer/earnings', icon: <IoWalletOutline size={18} /> },
      { label: 'Payouts', path: '/organizer/payouts', icon: <IoCashOutline size={18} /> },
    ],
  },
  {
    group: 'SUPPORT',
    items: [
      { label: 'Disputes', path: '/organizer/disputes', icon: <IoShieldCheckmarkOutline size={18} /> },
      { label: 'Notifications', path: '/organizer/notifications', icon: <IoNotificationsOutline size={18} /> },
    ],
  },
  {
    group: 'ACCOUNT',
    items: [
      { label: 'Profile', path: '/organizer/profile', icon: <IoPersonOutline size={18} /> },
    ],
  },
]

export default function OrganizerSidebar({ currentPath, onNavigate, organizer, onSignOut }) {
  return (
    <aside className="player-sidebar" aria-label="Organizer navigation">
      {/* Brand Header */}
      <div className="player-sidebar__header">
        <a
          href="/"
          className="player-sidebar__logo"
          onClick={(e) => {
            e.preventDefault()
            onSignOut()
          }}
          title="Exit to public website"
        >
          <span className="player-sidebar__logo-mark">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <polygon
                points="10,2 18,17 2,17"
                stroke="#F4C400"
                strokeWidth="1.6"
                strokeLinejoin="round"
                fill="rgba(244,196,0,0.12)"
              />
              <line x1="10" y1="8" x2="10" y2="13" stroke="#F4C400" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="10" cy="15.5" r="0.9" fill="#F4C400" />
            </svg>
          </span>
          <span className="player-sidebar__logo-text">
            <span style={{ fontWeight: 800 }}>FF</span>
            <span style={{ color: '#F4C400', fontWeight: 800 }}>WAR</span>
            <span className="org-role-tag">ORGANIZER</span>
          </span>
        </a>
      </div>

      {/* Navigation Sections */}
      <nav className="player-sidebar__nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="player-sidebar__group">
            <div className="player-sidebar__group-title">{group.group}</div>
            <ul className="player-sidebar__list" role="list">
              {group.items.map((item) => {
                const isActive = currentPath === item.path
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => onNavigate(item.path)}
                      className={`player-sidebar__link ${isActive ? 'active' : ''} ${
                        item.highlight ? 'player-sidebar__link--highlight' : ''
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="player-sidebar__link-icon">{item.icon}</span>
                      <span className="player-sidebar__link-label">{item.label}</span>
                      {isActive && <span className="player-sidebar__active-indicator" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Organizer User Footer */}
      <div className="player-sidebar__footer">
        <div className="org-sidebar__user">
          <div className="org-sidebar__avatar-box">
            <span>{organizer?.tag || 'ORG'}</span>
          </div>
          <div className="org-sidebar__info">
            <div className="org-sidebar__name">{organizer?.name || 'BattleZone Esports'}</div>
            <div className="org-sidebar__status">
              <span className="org-sidebar__status-dot" />
              <span>{organizer?.verificationStatus === 'VERIFIED' ? 'Verified Partner' : 'Operator'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="player-sidebar__signout-btn"
          title="Sign out to website"
          aria-label="Exit to website"
        >
          <IoLogOutOutline size={16} />
          <span>Exit to Website</span>
        </button>
      </div>
    </aside>
  )
}

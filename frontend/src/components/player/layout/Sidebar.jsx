import React from 'react'
import {
  IoGridOutline,
  IoTrophyOutline,
  IoGameControllerOutline,
  IoStatsChartOutline,
  IoReceiptOutline,
  IoWalletOutline,
  IoCashOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5'
import PlayerAvatar from '../ui/PlayerAvatar'

export const SIDEBAR_SECTIONS = [
  {
    title: null, // Single top level
    items: [
      { label: 'Home', path: '/player', icon: <IoGridOutline size={18} /> },
    ],
  },
  {
    title: 'COMPETE',
    items: [
      { label: 'Tournaments', path: '/player/tournaments', icon: <IoTrophyOutline size={18} /> },
      { label: 'Matches', path: '/player/matches', icon: <IoGameControllerOutline size={18} />, badge: '1' },
    ],
  },
  {
    title: 'RECORD',
    items: [
      { label: 'Career', path: '/player/career', icon: <IoStatsChartOutline size={18} /> },
      { label: 'Results', path: '/player/results', icon: <IoReceiptOutline size={18} /> },
    ],
  },
  {
    title: 'MORE',
    items: [
      { label: 'Wallet', path: '/player/wallet', icon: <IoWalletOutline size={18} /> },
      { label: 'Prizes', path: '/player/prizes', icon: <IoCashOutline size={18} /> },
      { label: 'Teams', path: '/player/teams', icon: <IoPeopleOutline size={18} /> },
      { label: 'Disputes', path: '/player/disputes', icon: <IoShieldCheckmarkOutline size={18} /> },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Profile', path: '/player/profile', icon: <IoPersonOutline size={18} /> },
      { label: 'Settings', path: '/player/settings', icon: <IoSettingsOutline size={18} /> },
    ],
  },
]

export default function Sidebar({ currentPath, onNavigate, player, onSignOut }) {
  return (
    <aside className="player-sidebar" aria-label="Player navigation">
      {/* Brand Header */}
      <div className="player-sidebar__brand">
        <button
          onClick={() => onNavigate('/player')}
          className="player-sidebar__logo-btn"
          aria-label="FF War Dashboard"
        >
          <span className="player-sidebar__logo-mark">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20">
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
            <span className="player-sidebar__logo-ff">FF</span>
            <span className="player-sidebar__logo-sep" aria-hidden="true" />
            <span className="player-sidebar__logo-war">WAR</span>
          </span>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="player-sidebar__nav">
        {SIDEBAR_SECTIONS.map((section, sIdx) => (
          <div key={section.title || `sec_${sIdx}`} className="player-sidebar__section">
            {section.title && (
              <div className="player-sidebar__section-title">{section.title}</div>
            )}
            <ul className="player-sidebar__menu">
              {section.items.map((item) => {
                const isActive = currentPath === item.path
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => onNavigate(item.path)}
                      className={`player-sidebar__link ${isActive ? 'player-sidebar__link--active' : ''}`}
                    >
                      <span className="player-sidebar__link-icon">{item.icon}</span>
                      <span className="player-sidebar__link-label">{item.label}</span>
                      {item.badge && (
                        <span className="player-sidebar__link-badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Player Identity */}
      <div className="player-sidebar__footer">
        <button
          onClick={() => onNavigate('/player/profile')}
          className="player-sidebar__user-card"
          title="View profile"
        >
          <PlayerAvatar name={player?.ign || 'Player'} size={34} showIndicator status="online" />
          <div className="player-sidebar__user-info">
            <div className="player-sidebar__user-name">{player?.ign || 'SHADOW_K'}</div>
            <div className="player-sidebar__user-status">
              <span className="player-sidebar__status-dot" />
              <span>{player?.verification_status === 'VERIFIED' ? 'Verified Competitor' : 'Player'}</span>
            </div>
          </div>
        </button>

        <button
          onClick={onSignOut}
          className="player-sidebar__signout-btn"
          title="Sign out & return to public website"
          aria-label="Sign out"
        >
          <IoLogOutOutline size={18} />
        </button>
      </div>
    </aside>
  )
}

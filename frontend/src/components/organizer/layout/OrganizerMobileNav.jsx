// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER MOBILE BOTTOM NAVIGATION
//
// 5 core operational destinations:
// Home · Tournaments · Participants · Results · Menu
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoHomeOutline,
  IoHome,
  IoTrophyOutline,
  IoTrophy,
  IoPeopleOutline,
  IoPeople,
  IoStatsChartOutline,
  IoStatsChart,
  IoMenuOutline,
} from 'react-icons/io5'

export const ORGANIZER_MOBILE_TABS = [
  {
    label: 'Home',
    path: '/organizer',
    icon: <IoHomeOutline size={20} />,
    activeIcon: <IoHome size={20} />,
  },
  {
    label: 'Tournaments',
    path: '/organizer/tournaments',
    icon: <IoTrophyOutline size={20} />,
    activeIcon: <IoTrophy size={20} />,
  },
  {
    label: 'Participants',
    path: '/organizer/participants',
    icon: <IoPeopleOutline size={20} />,
    activeIcon: <IoPeople size={20} />,
  },
  {
    label: 'Results',
    path: '/organizer/results',
    icon: <IoStatsChartOutline size={20} />,
    activeIcon: <IoStatsChart size={20} />,
  },
  {
    label: 'Menu',
    isMenu: true,
    icon: <IoMenuOutline size={22} />,
  },
]

export default function OrganizerMobileNav({
  currentPath,
  onNavigate,
  drawerOpen,
  onCloseDrawer,
  onToggleDrawer,
}) {
  return (
    <nav className="player-mobile-bottom-nav" aria-label="Organizer mobile navigation">
      {ORGANIZER_MOBILE_TABS.map((tab) => {
        if (tab.isMenu) {
          return (
            <button
              key="menu"
              onClick={onToggleDrawer}
              className={`player-mobile-bottom-nav__item ${
                drawerOpen ? 'player-mobile-bottom-nav__item--active' : ''
              }`}
              aria-label="Open secondary organizer menu"
            >
              <span className="player-mobile-bottom-nav__icon">{tab.icon}</span>
              <span className="player-mobile-bottom-nav__label">{tab.label}</span>
            </button>
          )
        }

        const isActive = currentPath === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => {
              if (drawerOpen) onCloseDrawer()
              onNavigate(tab.path)
            }}
            className={`player-mobile-bottom-nav__item ${
              isActive && !drawerOpen ? 'player-mobile-bottom-nav__item--active' : ''
            }`}
          >
            <span className="player-mobile-bottom-nav__icon">
              {isActive && !drawerOpen && tab.activeIcon ? tab.activeIcon : tab.icon}
            </span>
            <span className="player-mobile-bottom-nav__label">{tab.label}</span>
            {isActive && !drawerOpen && <span className="player-mobile-bottom-nav__active-bar" />}
          </button>
        )
      })}
    </nav>
  )
}

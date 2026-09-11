import React from 'react'
import {
  IoHomeOutline,
  IoHome,
  IoTrophyOutline,
  IoTrophy,
  IoGameControllerOutline,
  IoGameController,
  IoStatsChartOutline,
  IoStatsChart,
  IoMenuOutline,
  IoCloseOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoWalletOutline,
  IoCashOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoNotificationsOutline,
  IoLogOutOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'
import PlayerAvatar from '../ui/PlayerAvatar'

export const MOBILE_TABS = [
  {
    label: 'Home',
    path: '/player',
    icon: <IoHomeOutline size={20} />,
    activeIcon: <IoHome size={20} />,
  },
  {
    label: 'Tournaments',
    path: '/player/tournaments',
    icon: <IoTrophyOutline size={20} />,
    activeIcon: <IoTrophy size={20} />,
  },
  {
    label: 'Matches',
    path: '/player/matches',
    icon: <IoGameControllerOutline size={20} />,
    activeIcon: <IoGameController size={20} />,
    badge: '1',
  },
  {
    label: 'Career',
    path: '/player/career',
    icon: <IoStatsChartOutline size={20} />,
    activeIcon: <IoStatsChart size={20} />,
  },
  {
    label: 'Menu',
    isMenu: true,
    icon: <IoMenuOutline size={22} />,
  },
]

export default function MobileNav({
  currentPath,
  onNavigate,
  player,
  drawerOpen,
  onCloseDrawer,
  onToggleDrawer,
  onSignOut,
}) {
  return (
    <>
      {/* Mobile Bottom Navigation Bar: Home · Tournaments · Matches · Career · Menu */}
      <nav className="player-mobile-bottom-nav" aria-label="Mobile navigation">
        {MOBILE_TABS.map((tab) => {
          if (tab.isMenu) {
            return (
              <button
                key="menu"
                onClick={onToggleDrawer}
                className={`player-mobile-bottom-nav__item ${drawerOpen ? 'player-mobile-bottom-nav__item--active' : ''}`}
                aria-label="Open secondary menu"
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
                {tab.badge && !isActive && (
                  <span className="player-mobile-bottom-nav__dot" />
                )}
              </span>
              <span className="player-mobile-bottom-nav__label">{tab.label}</span>
              {isActive && !drawerOpen && <span className="player-mobile-bottom-nav__active-bar" />}
            </button>
          )
        })}
      </nav>

      {/* Mobile Menu Drawer (Cleanly grouped secondary destinations) */}
      {drawerOpen && (
        <div className="player-mobile-drawer-backdrop" onClick={onCloseDrawer}>
          <div
            className="player-mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Secondary navigation menu"
          >
            {/* Header */}
            <div className="player-mobile-drawer__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PlayerAvatar name={player?.ign || 'Player'} size={38} showIndicator status="online" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#111318' }}>
                    {player?.ign || 'SHADOW_K'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7078' }}>
                    {player?.playerId || '#FFW-88219'} · {player?.verification_status === 'VERIFIED' ? 'Verified' : 'Player'}
                  </div>
                </div>
              </div>
              <button
                onClick={onCloseDrawer}
                className="player-mobile-drawer__close"
                aria-label="Close menu"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            {/* Menu Body */}
            <div className="player-mobile-drawer__body">
              {/* Account */}
              <div className="player-mobile-drawer__section-title">ACCOUNT</div>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/profile' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/profile')
                  onCloseDrawer()
                }}
              >
                <IoPersonOutline size={18} />
                <span>Profile & Identity</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/settings' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/settings')
                  onCloseDrawer()
                }}
              >
                <IoSettingsOutline size={18} />
                <span>Settings</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>

              {/* Money */}
              <div className="player-mobile-drawer__section-title">MONEY</div>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/wallet' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/wallet')
                  onCloseDrawer()
                }}
              >
                <IoWalletOutline size={18} />
                <span>Wallet</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/prizes' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/prizes')
                  onCloseDrawer()
                }}
              >
                <IoCashOutline size={18} />
                <span>Prizes & Settlements</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>

              {/* Team */}
              <div className="player-mobile-drawer__section-title">TEAM</div>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/teams' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/teams')
                  onCloseDrawer()
                }}
              >
                <IoPeopleOutline size={18} />
                <span>Teams</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>

              {/* Support */}
              <div className="player-mobile-drawer__section-title">SUPPORT</div>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/disputes' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/disputes')
                  onCloseDrawer()
                }}
              >
                <IoShieldCheckmarkOutline size={18} />
                <span>Disputes</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>
              <button
                className={`player-mobile-drawer__item ${currentPath === '/player/notifications' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('/player/notifications')
                  onCloseDrawer()
                }}
              >
                <IoNotificationsOutline size={18} />
                <span>Notifications</span>
                <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
              </button>
            </div>

            {/* Footer */}
            <div className="player-mobile-drawer__footer">
              <button
                onClick={() => {
                  onCloseDrawer()
                  onSignOut()
                }}
                className="player-mobile-drawer__signout-btn"
              >
                <IoLogOutOutline size={18} />
                <span>Exit to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import React, { useState, useRef, useEffect } from 'react'
import {
  IoNotificationsOutline,
  IoWalletOutline,
  IoChevronDown,
  IoMenuOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoFlaskOutline,
  IoArrowBackOutline,
} from 'react-icons/io5'
import PlayerAvatar from '../ui/PlayerAvatar'
import { formatCurrency } from '../../../utils/formatters'

const ROUTE_TITLES = {
  '/player': 'Dashboard',
  '/player/tournaments': 'Tournaments',
  '/player/matches': 'My Matches',
  '/player/teams': 'Teams',
  '/player/results': 'Results',
  '/player/career': 'Career',
  '/player/prizes': 'Prizes',
  '/player/wallet': 'Wallet',
  '/player/disputes': 'Disputes',
  '/player/notifications': 'Notifications',
  '/player/profile': 'Profile & Identity',
  '/player/settings': 'Settings',
}

export default function TopBar({
  currentPath,
  onNavigate,
  player,
  wallet,
  demoMode,
  setDemoMode,
  onOpenMobileMenu,
  onSignOut,
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const title = ROUTE_TITLES[currentPath] || 'Dashboard'

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false)
        setDemoDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <header className="player-topbar" ref={dropdownRef}>
      <div className="player-topbar__left">
        {/* Mobile menu trigger */}
        <button
          className="player-topbar__hamburger"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
        >
          <IoMenuOutline size={22} />
        </button>

        {/* Page Title (No 'Player /' breadcrumb on mobile or desktop) */}
        <div className="player-topbar__title-wrap">
          <h1 className="player-topbar__title">{title}</h1>
        </div>
      </div>

      <div className="player-topbar__right">
        {/* DEV / DEMO MODE Selector */}
        <div className="player-topbar__demo-wrap">
          <button
            onClick={() => setDemoDropdownOpen((prev) => !prev)}
            className="player-topbar__demo-pill"
            title="Switch prototype demonstration states"
            aria-label="Prototype state selector"
          >
            <span className="player-topbar__demo-dot" />
            <span className="player-topbar__demo-tag">DEMO</span>
            <span className="player-topbar__demo-state">
              {demoMode === 'ACTIVE'
                ? 'Active Player'
                : demoMode === 'EMPTY'
                ? 'New / Empty'
                : 'Loading State'}
            </span>
            <IoChevronDown size={12} className="player-topbar__demo-chevron" />
          </button>

          {demoDropdownOpen && (
            <div className="player-topbar__demo-menu">
              <div className="player-topbar__demo-menu-header">PROTOTYPE STATE TESTER</div>
              <button
                className={`player-topbar__demo-item ${demoMode === 'ACTIVE' ? 'active' : ''}`}
                onClick={() => {
                  setDemoMode('ACTIVE')
                  setDemoDropdownOpen(false)
                }}
              >
                <span className="player-topbar__demo-item-title">Active Competitor</span>
                <span className="player-topbar__demo-item-desc">
                  Upcoming match, open check-in, active squad, career stats
                </span>
              </button>
              <button
                className={`player-topbar__demo-item ${demoMode === 'EMPTY' ? 'active' : ''}`}
                onClick={() => {
                  setDemoMode('EMPTY')
                  setDemoDropdownOpen(false)
                }}
              >
                <span className="player-topbar__demo-item-title">New Player / Empty</span>
                <span className="player-topbar__demo-item-desc">
                  No upcoming matches, 0 tournaments, clean onboarding state
                </span>
              </button>
              <button
                className={`player-topbar__demo-item ${demoMode === 'LOADING' ? 'active' : ''}`}
                onClick={() => {
                  setDemoMode('LOADING')
                  setDemoDropdownOpen(false)
                }}
              >
                <span className="player-topbar__demo-item-title">Loading Skeletons</span>
                <span className="player-topbar__demo-item-desc">
                  Simulated content-aware shimmer placeholders
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Wallet Balance Pill (Always fully visible, never clipped) */}
        <button
          onClick={() => onNavigate('/player/wallet')}
          className="player-topbar__wallet-pill"
          title="Available wallet balance"
        >
          <IoWalletOutline size={15} className="player-topbar__wallet-icon" />
          <span className="player-topbar__wallet-label">Available:</span>
          <span className="player-topbar__wallet-amount">
            {formatCurrency(wallet?.available_balance || 0)}
          </span>
        </button>

        {/* Desktop-only Notifications Icon (On mobile accessible via Menu) */}
        <button
          onClick={() => onNavigate('/player/notifications')}
          className="player-topbar__icon-btn player-topbar__desktop-only"
          aria-label="Notifications"
          title="Notifications"
        >
          <IoNotificationsOutline size={19} />
          <span className="player-topbar__unread-badge" />
        </button>

        {/* Desktop-only Player Avatar & Quick Menu (On mobile accessible via Menu) */}
        <div className="player-topbar__profile-wrap player-topbar__desktop-only">
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="player-topbar__profile-trigger"
            aria-label="User account menu"
            aria-expanded={profileDropdownOpen}
          >
            <PlayerAvatar name={player?.ign || 'Player'} size={32} />
            <span className="player-topbar__ign">{player?.ign || 'SHADOW_K'}</span>
            <IoChevronDown size={13} className="player-topbar__chevron" />
          </button>

          {profileDropdownOpen && (
            <div className="player-topbar__menu-dropdown">
              <div className="player-topbar__menu-user-summary">
                <div className="player-topbar__menu-user-ign">{player?.ign || 'SHADOW_K'}</div>
                <div className="player-topbar__menu-user-id">{player?.playerId || '#FFW-88219'}</div>
              </div>
              <div className="player-topbar__menu-divider" />
              <button
                onClick={() => {
                  onNavigate('/player/profile')
                  setProfileDropdownOpen(false)
                }}
                className="player-topbar__menu-item"
              >
                <IoPersonOutline size={16} />
                <span>Profile & Account</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('/player/wallet')
                  setProfileDropdownOpen(false)
                }}
                className="player-topbar__menu-item"
              >
                <IoWalletOutline size={16} />
                <span>Wallet & Payouts</span>
              </button>
              <div className="player-topbar__menu-divider" />
              <button
                onClick={() => {
                  setProfileDropdownOpen(false)
                  onSignOut()
                }}
                className="player-topbar__menu-item player-topbar__menu-item--danger"
              >
                <IoLogOutOutline size={16} />
                <span>Sign Out to Website</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

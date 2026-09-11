// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER TOP BAR
//
// Clean header with semantic page title, non-clipping flex layout,
// compact DEMO mode indicator, notifications, and organizer identity menu.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react'
import {
  IoMenuOutline,
  IoNotificationsOutline,
  IoChevronDown,
  IoPersonOutline,
  IoLogOutOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'

const ORGANIZER_ROUTE_TITLES = {
  '/organizer': 'Dashboard',
  '/organizer/tournaments': 'Tournaments',
  '/organizer/tournaments/new': 'Create Tournament',
  '/organizer/participants': 'Participants',
  '/organizer/matches': 'Matches',
  '/organizer/results': 'Results',
  '/organizer/earnings': 'Earnings',
  '/organizer/payouts': 'Payouts',
  '/organizer/disputes': 'Disputes',
  '/organizer/notifications': 'Notifications',
  '/organizer/profile': 'Organizer Profile',
}

export default function OrganizerTopBar({
  currentPath,
  onNavigate,
  organizer,
  demoMode,
  setDemoMode,
  onOpenMobileMenu,
  onSignOut,
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const title = ORGANIZER_ROUTE_TITLES[currentPath] || 'Dashboard'

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
      {/* Left: Mobile Hamburger & Page Title (NO 'Organizer /' breadcrumb) */}
      <div className="player-topbar__left">
        <button
          className="player-topbar__hamburger"
          onClick={onOpenMobileMenu}
          aria-label="Open organizer menu"
        >
          <IoMenuOutline size={22} />
        </button>

        <div className="player-topbar__title-wrap">
          <h1 className="player-topbar__title">{title}</h1>
        </div>
      </div>

      {/* Right: Demo indicator, Notifications & Profile */}
      <div className="player-topbar__right">
        {/* Prototype Demo Mode Selector */}
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
                ? 'Active Operator'
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
                <span className="player-topbar__demo-item-title">Active Operator</span>
                <span className="player-topbar__demo-item-desc">
                  Active tournaments, check-in window, scoring reviews, ledger
                </span>
              </button>
              <button
                className={`player-topbar__demo-item ${demoMode === 'EMPTY' ? 'active' : ''}`}
                onClick={() => {
                  setDemoMode('EMPTY')
                  setDemoDropdownOpen(false)
                }}
              >
                <span className="player-topbar__demo-item-title">New Organizer / Zero State</span>
                <span className="player-topbar__demo-item-desc">
                  Clean zero-data onboarding preview with create tournament prompt
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

        {/* Notifications Icon Button */}
        <button
          onClick={() => onNavigate('/organizer/notifications')}
          className="player-topbar__icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <IoNotificationsOutline size={19} />
          <span className="player-topbar__unread-badge" />
        </button>

        {/* Organizer Identity Avatar & Quick Menu */}
        <div className="player-topbar__profile-wrap player-topbar__desktop-only">
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="player-topbar__profile-trigger"
            aria-label="Organizer account menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="org-topbar__avatar-pill">
              <span>{organizer?.tag || 'BZE'}</span>
            </div>
            <span className="player-topbar__ign">{organizer?.name || 'BattleZone'}</span>
            <IoChevronDown size={13} className="player-topbar__chevron" />
          </button>

          {profileDropdownOpen && (
            <div className="player-topbar__menu-dropdown">
              <div className="player-topbar__menu-user-summary">
                <div className="player-topbar__menu-user-ign">{organizer?.name || 'BattleZone Esports'}</div>
                <div className="player-topbar__menu-user-id">{organizer?.id || '#ORG-88192'} · Certified</div>
              </div>
              <div className="player-topbar__menu-divider" />
              <button
                onClick={() => {
                  onNavigate('/organizer/profile')
                  setProfileDropdownOpen(false)
                }}
                className="player-topbar__menu-item"
              >
                <IoPersonOutline size={16} />
                <span>Organizer Profile</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('/organizer/earnings')
                  setProfileDropdownOpen(false)
                }}
                className="player-topbar__menu-item"
              >
                <IoShieldCheckmarkOutline size={16} />
                <span>Financial Ledger</span>
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
                <span>Exit to Website</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN MOBILE BOTTOM NAVIGATION
//
// Exactly 5 primary destinations:
// 1. Home (Real house icon)
// 2. Tournaments (Trophy)
// 3. Users (People)
// 4. Results (Check-circle)
// 5. Menu (Drawer trigger)
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoHomeOutline,
  IoTrophyOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoMenuOutline
} from 'react-icons/io5'

export default function AdminMobileNav({ currentPath, onNavigate, onToggleMenu }) {
  const isHome = currentPath === '/admin'
  const isTournaments = currentPath.startsWith('/admin/tournaments')
  const isUsers = currentPath.startsWith('/admin/users')
  const isResults = currentPath.startsWith('/admin/results')

  return (
    <nav className="admin-mobile-nav" aria-label="Mobile Navigation">
      <button
        type="button"
        onClick={() => onNavigate('/admin')}
        className={`admin-mobile-nav__item ${isHome ? 'admin-mobile-nav__item--active' : ''}`}
      >
        <IoHomeOutline className="admin-mobile-nav__icon" />
        <span>Home</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('/admin/tournaments')}
        className={`admin-mobile-nav__item ${isTournaments ? 'admin-mobile-nav__item--active' : ''}`}
      >
        <IoTrophyOutline className="admin-mobile-nav__icon" />
        <span>Tournaments</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('/admin/users')}
        className={`admin-mobile-nav__item ${isUsers ? 'admin-mobile-nav__item--active' : ''}`}
      >
        <IoPeopleOutline className="admin-mobile-nav__icon" />
        <span>Users</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('/admin/results')}
        className={`admin-mobile-nav__item ${isResults ? 'admin-mobile-nav__item--active' : ''}`}
      >
        <IoCheckmarkCircleOutline className="admin-mobile-nav__icon" />
        <span>Results</span>
      </button>

      <button
        type="button"
        onClick={onToggleMenu}
        className="admin-mobile-nav__item"
        aria-label="Open full menu"
      >
        <IoMenuOutline className="admin-mobile-nav__icon" />
        <span>Menu</span>
      </button>
    </nav>
  )
}

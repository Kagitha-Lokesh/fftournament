// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER MENU DRAWER (MOBILE SLIDE-OVER)
//
// Secondary navigation for operational workflows:
// Create Tournament, Matches, Earnings, Payouts, Disputes, Notifications, Profile.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  IoCloseOutline,
  IoAddCircleOutline,
  IoGameControllerOutline,
  IoWalletOutline,
  IoCashOutline,
  IoShieldCheckmarkOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'

export default function OrganizerMenuDrawer({
  currentPath,
  onNavigate,
  organizer,
  isOpen,
  onClose,
  onSignOut,
}) {
  if (!isOpen) return null

  return (
    <div className="player-mobile-drawer-backdrop" onClick={onClose}>
      <div
        className="player-mobile-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Secondary organizer navigation menu"
      >
        {/* Header */}
        <div className="player-mobile-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="org-sidebar__avatar-box">
              <span>{organizer?.tag || 'ORG'}</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#111318' }}>
                {organizer?.name || 'BattleZone Esports'}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7078' }}>
                {organizer?.id || '#ORG-88192'} · {organizer?.verificationStatus === 'VERIFIED' ? 'Verified' : 'Operator'}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="player-mobile-drawer__close" aria-label="Close menu">
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Menu Body */}
        <div className="player-mobile-drawer__body">
          {/* Operations */}
          <div className="player-mobile-drawer__section-title">OPERATIONS</div>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/tournaments/new' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/tournaments/new')
              onClose()
            }}
          >
            <IoAddCircleOutline size={18} color="#F4C400" />
            <span style={{ fontWeight: 700, color: '#111318' }}>Create Tournament</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/matches' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/matches')
              onClose()
            }}
          >
            <IoGameControllerOutline size={18} />
            <span>Matches & Rooms</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>

          {/* Finance */}
          <div className="player-mobile-drawer__section-title">FINANCE</div>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/earnings' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/earnings')
              onClose()
            }}
          >
            <IoWalletOutline size={18} />
            <span>Earnings Ledger</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/payouts' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/payouts')
              onClose()
            }}
          >
            <IoCashOutline size={18} />
            <span>Payout History</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>

          {/* Support */}
          <div className="player-mobile-drawer__section-title">SUPPORT & INTEGRITY</div>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/disputes' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/disputes')
              onClose()
            }}
          >
            <IoShieldCheckmarkOutline size={18} />
            <span>Disputes & Inquiries</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/notifications' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/notifications')
              onClose()
            }}
          >
            <IoNotificationsOutline size={18} />
            <span>Notifications</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>

          {/* Account */}
          <div className="player-mobile-drawer__section-title">ACCOUNT</div>
          <button
            className={`player-mobile-drawer__item ${currentPath === '/organizer/profile' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/organizer/profile')
              onClose()
            }}
          >
            <IoPersonOutline size={18} />
            <span>Organizer Profile</span>
            <IoChevronForwardOutline size={14} className="player-mobile-drawer__arrow" />
          </button>
        </div>

        {/* Footer */}
        <div className="player-mobile-drawer__footer">
          <button
            onClick={() => {
              onClose()
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
  )
}

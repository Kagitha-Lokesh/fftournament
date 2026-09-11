// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER NOTIFICATIONS PAGE
//
// Operational inbox with categories:
// Matches · Results · Disputes · Finance · System
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoNotificationsOutline,
  IoCheckmarkDoneOutline,
  IoChevronForwardOutline,
  IoRadioOutline,
  IoCashOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import EmptyState from '../../components/player/ui/EmptyState'
import { organizerService } from '../../services/organizerService'

export default function OrganizerNotificationsPage({ onNavigate, demoMode }) {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all') // all | unread
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getNotifications(demoMode)
      setNotifications(list)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const filtered = notifications.filter((n) => (filter === 'unread' ? n.unread : true))

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Notifications</h1>
          <p className="player-subpage-desc">Operational alerts, match transitions, and settlement updates.</p>
        </div>
        <button
          onClick={markAllRead}
          className="btn btn--secondary"
          style={{ height: '36px', padding: '0 14px', fontSize: '12.5px', gap: '6px' }}
        >
          <IoCheckmarkDoneOutline size={16} />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="player-tabs-bar">
        <button
          onClick={() => setFilter('all')}
          className={`player-tab-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`player-tab-btn ${filter === 'unread' ? 'active' : ''}`}
        >
          Unread ({notifications.filter((n) => n.unread).length})
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="org-mobile-card-stack">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => n.link && onNavigate(n.link)}
              className="org-item-card"
              style={{
                cursor: 'pointer',
                borderLeft: n.unread ? '3px solid #F4C400' : '1px solid #E4E7EB',
              }}
            >
              <div className="org-item-card__header">
                <div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#6B7078',
                      textTransform: 'uppercase',
                    }}
                  >
                    {n.category}
                  </span>
                  <h3 className="org-item-card__title" style={{ marginTop: '2px' }}>{n.title}</h3>
                  <div className="org-item-card__subtitle">{n.description}</div>
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{n.timestamp}</span>
              </div>

              {n.link && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#111318',
                    }}
                  >
                    <span>View</span>
                    <IoChevronForwardOutline size={13} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No notifications"
          description="You're all caught up with tournament operations."
        />
      )}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import {
  IoNotificationsOutline,
  IoCheckmarkDoneOutline,
  IoGameControllerOutline,
  IoCashOutline,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'
import EmptyState from '../../components/player/ui/EmptyState'
import { playerService } from '../../services/playerService'

export default function NotificationsPage({ onNavigate, demoMode }) {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    async function load() {
      const data = await playerService.getNotifications(demoMode)
      setNotifications(data || [])
    }
    load()
  }, [demoMode])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'ALL') return true
    if (filter === 'MATCH') return n.category === 'MATCH'
    if (filter === 'PRIZE') return n.category === 'PRIZE' || n.category === 'PAYOUT'
    if (filter === 'TEAM') return n.category === 'TEAM'
    return n.category === filter
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'MATCH':
        return <IoGameControllerOutline size={17} />
      case 'PRIZE':
      case 'PAYOUT':
        return <IoCashOutline size={17} />
      case 'RESULT':
        return <IoShieldCheckmarkOutline size={17} />
      case 'TEAM':
        return <IoPeopleOutline size={17} />
      default:
        return <IoNotificationsOutline size={17} />
    }
  }

  return (
    <div className="player-subpage">
      {/* ── 1. Page Header ── */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Notifications</h1>
          <p className="player-subpage-desc">
            Stay updated on matches, results, prizes and account activity.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="btn btn--secondary player-notif-mark-btn"
        >
          <IoCheckmarkDoneOutline size={15} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* ── 2. Category Filter Tabs ── */}
      <div className="player-notifs-filter-scroll">
        <div className="player-filter-pills">
          <button
            onClick={() => setFilter('ALL')}
            className={`player-filter-pill ${filter === 'ALL' ? 'active' : ''}`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilter('MATCH')}
            className={`player-filter-pill ${filter === 'MATCH' ? 'active' : ''}`}
          >
            Matches
          </button>
          <button
            onClick={() => setFilter('PRIZE')}
            className={`player-filter-pill ${filter === 'PRIZE' ? 'active' : ''}`}
          >
            Prizes & Payouts
          </button>
          <button
            onClick={() => setFilter('TEAM')}
            className={`player-filter-pill ${filter === 'TEAM' ? 'active' : ''}`}
          >
            Squad
          </button>
        </div>
      </div>

      {/* ── 3. Structured Notification Items ── */}
      {filteredNotifs.length > 0 ? (
        <div className="player-notifs-clean-stack">
          {filteredNotifs.map((item) => {
            const isClickable = Boolean(item.link)
            return (
              <div
                key={item.id}
                className={`player-notif-item-card ${
                  item.unread ? 'player-notif-item-card--unread' : ''
                } ${isClickable ? 'player-notif-item-card--clickable' : ''}`}
                onClick={() => isClickable && onNavigate(item.link)}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onNavigate(item.link)
                  }
                }}
              >
                {/* Left Category Icon */}
                <div
                  className={`player-notif-item-icon-box ${
                    item.unread ? 'player-notif-item-icon-box--unread' : ''
                  }`}
                  aria-hidden="true"
                >
                  {getCategoryIcon(item.category)}
                </div>

                {/* Main Content */}
                <div className="player-notif-item-body">
                  <div className="player-notif-item-top">
                    <div className="player-notif-item-title-wrap">
                      {item.unread && (
                        <span className="player-notif-unread-dot" aria-label="Unread" />
                      )}
                      <h2 className="player-notif-item-title">{item.title}</h2>
                    </div>
                    <span className="player-notif-item-time">{item.timestamp}</span>
                  </div>

                  <p className="player-notif-item-desc">{item.description}</p>
                </div>

                {/* Right Arrow if clickable */}
                {isClickable && (
                  <div className="player-notif-item-arrow" aria-hidden="true">
                    <IoChevronForwardOutline size={16} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<IoNotificationsOutline size={26} />}
          title="No notifications"
          description="You're completely up to date with your competition."
        />
      )}
    </div>
  )
}

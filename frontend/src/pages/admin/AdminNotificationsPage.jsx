// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN NOTIFICATIONS INBOX
//
// Platform alert center: Results review triggers, dispute notifications,
// organizer submissions, and security audits.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { IoNotificationsOutline, IoCheckmarkDoneOutline, IoArrowForward } from 'react-icons/io5'

export default function AdminNotificationsPage({ onNavigate, onToast }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await adminService.getNotifications()
        setNotifications(data)
      } catch (err) {
        console.error('Failed to load notifications:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleMarkAllRead = async () => {
    await adminService.markNotificationsRead()
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    onToast('All platform notifications marked as read', 'info')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--admin-ink)' }}>
            Platform Notifications
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-grey)' }}>
            Real-time alerts regarding result submissions, arbitration deadlines, and escrow signatures.
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="admin-btn admin-btn--secondary admin-btn--sm"
        >
          <IoCheckmarkDoneOutline size={16} />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            className="admin-card"
            style={{
              marginBottom: 0,
              padding: '16px 20px',
              backgroundColor: n.unread ? '#FFFDF5' : 'var(--admin-white)',
              borderLeft: n.unread ? '4px solid var(--admin-yellow)' : '1px solid var(--admin-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--admin-grey)', textTransform: 'uppercase' }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>· {n.timestamp}</span>
                </div>
                <h4 style={{ margin: '4px 0 2px 0', fontSize: '15px', fontWeight: 700, color: 'var(--admin-ink)' }}>
                  {n.title}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-grey)' }}>
                  {n.message}
                </p>
              </div>

              {n.link && (
                <button
                  type="button"
                  onClick={() => onNavigate(n.link)}
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  style={{ flexShrink: 0 }}
                >
                  <span>View</span>
                  <IoArrowForward size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

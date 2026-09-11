// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN PARTICIPANTS PAGE (MOBILE-FIRST REDESIGN)
//
// Participant oversight with mobile stacked cards and desktop table.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import { IoSearchOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'

export default function AdminParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const mockParticipants = [
    { id: 'P-01', teamName: 'Titan Squad', captain: 'SHADOW_K', uid: 'FF-IN-892401', tournament: 'Weekend Squad Clash', checkIn: 'CONFIRMED', membersCount: 4 },
    { id: 'P-02', teamName: 'Crimson Elite', captain: 'VIPER_99', uid: 'FF-IN-731994', tournament: 'Weekend Squad Clash', checkIn: 'CONFIRMED', membersCount: 4 },
    { id: 'P-03', teamName: 'Viper Strike', captain: 'KAVYA_SNIPES', uid: 'FF-IN-614002', tournament: 'Weekend Squad Clash', checkIn: 'PENDING', membersCount: 4 },
    { id: 'P-04', teamName: 'Phoenix Rising', captain: 'ARJUN_FF', uid: 'FF-IN-510029', tournament: 'FF WAR National Championship', checkIn: 'CONFIRMED', membersCount: 4 },
    { id: 'P-05', teamName: 'Dragon Slayers', captain: 'DEV_G', uid: 'FF-IN-908123', tournament: 'FF WAR National Championship', checkIn: 'CONFIRMED', membersCount: 4 }
  ]

  const filtered = mockParticipants.filter(p =>
    p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tournament.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--admin-ink)' }}>
          Participants
        </h2>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--admin-grey)' }}>
          Monitor squad registrations, roster compliance, and live check-in statuses.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          backgroundColor: '#FFFFFF',
          padding: '10px 12px',
          borderRadius: 'var(--admin-radius)',
          border: '1px solid var(--admin-border)'
        }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <IoSearchOutline size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-grey)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search squad, captain IGN, or tournament..."
            style={{ width: '100%', padding: '6px 10px 6px 32px', borderRadius: 'var(--admin-radius-sm)', border: '1px solid var(--admin-border)', fontSize: '12.5px', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* MOBILE: Clean Cards */}
      <div className="admin-mobile-list">
        {filtered.map(p => (
          <div key={p.id} className="admin-entity-card">
            <div className="admin-entity-card__header">
              <div>
                <h3 className="admin-entity-card__title">{p.teamName}</h3>
                <div className="admin-entity-card__sub">{p.tournament}</div>
              </div>
              {p.checkIn === 'CONFIRMED' ? (
                <span className="admin-badge admin-badge--live">
                  <IoCheckmarkCircleOutline size={12} /> Checked In
                </span>
              ) : (
                <span className="admin-badge admin-badge--pending">Pending Check-in</span>
              )}
            </div>

            <div className="admin-entity-card__details">
              <span>Captain: <strong>{p.captain}</strong></span>
              <span>UID: <strong style={{ fontFamily: 'monospace' }}>{p.uid}</strong></span>
              <span>Roster: <strong>{p.membersCount} Players</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Table */}
      <div className="admin-desktop-table admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Team / Participant</th>
              <th>Tournament</th>
              <th>Captain IGN & UID</th>
              <th>Roster Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{p.teamName}</div>
                  <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>ID: {p.id}</span>
                </td>
                <td style={{ fontSize: '12.5px' }}>{p.tournament}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{p.captain}</div>
                  <div style={{ fontSize: '11px', color: 'var(--admin-grey)', fontFamily: 'monospace' }}>{p.uid}</div>
                </td>
                <td style={{ fontSize: '12.5px' }}>{p.membersCount} Players</td>
                <td>
                  {p.checkIn === 'CONFIRMED' ? (
                    <span className="admin-badge admin-badge--live">
                      <IoCheckmarkCircleOutline size={12} /> Checked In
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge--pending">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

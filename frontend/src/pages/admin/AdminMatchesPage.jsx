// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN MATCHES PAGE (MOBILE-FIRST REDESIGN)
//
// Match schedules and room oversight with mobile stacked cards and desktop table.
// All match objects strictly contain canonical time and date fields.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import { IoLockClosedOutline } from 'react-icons/io5'

export default function AdminMatchesPage({ onToast }) {
  const [revealedRoom, setRevealedRoom] = useState(null)

  const matches = [
    {
      id: 'M-WSC-04',
      tournament: 'Weekend Squad Clash — Week 24',
      stage: 'Grand Final',
      time: '8:45 PM',
      startTime: '8:45 PM',
      scheduledTime: '20:45 IST',
      date: 'Today',
      scheduledDate: '2026-09-11',
      map: 'Purgatory',
      teams: 12,
      roomState: 'LOBBY_OPEN',
      hasResult: true,
      resultStatus: 'SUBMITTED'
    },
    {
      id: 'M-NAT-01',
      tournament: 'FF WAR National Championship — Stage 1',
      stage: 'Qualifier Match 1',
      time: '7:00 PM',
      startTime: '7:00 PM',
      scheduledTime: '19:00 IST',
      date: '14 Sep',
      scheduledDate: '2026-09-14',
      map: 'Bermuda',
      teams: 12,
      roomState: 'SCHEDULED',
      hasResult: false,
      resultStatus: 'DRAFT'
    },
    {
      id: 'M-SRC-02',
      tournament: 'Solo Ranked Cup — Season 4',
      stage: 'Semi-Final B',
      time: '6:30 PM',
      startTime: '6:30 PM',
      scheduledTime: '18:30 IST',
      date: 'Today',
      scheduledDate: '2026-09-11',
      map: 'Kalahari',
      teams: 12,
      roomState: 'MATCH_CONCLUDED',
      hasResult: true,
      resultStatus: 'UNDER_REVIEW'
    }
  ]

  const handleRevealCredentials = (matchId) => {
    setRevealedRoom(prev => prev === matchId ? null : matchId)
    onToast('Backend audit logged: Room credentials accessed by Administrator', 'info')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--admin-ink)' }}>
          Matches & Rooms
        </h2>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--admin-grey)' }}>
          Oversee match schedules, room statuses, and time-gated lobby credentials.
        </p>
      </div>

      {/* MOBILE: Clean Cards */}
      <div className="admin-mobile-list">
        {matches.map(m => (
          <div key={m.id} className="admin-entity-card">
            <div className="admin-entity-card__header">
              <div>
                <h3 className="admin-entity-card__title">{m.stage}</h3>
                <div className="admin-entity-card__sub">{m.tournament}</div>
              </div>
              <AdminStatusBadge type="result" status={m.resultStatus} />
            </div>

            <div className="admin-entity-card__details">
              <span>Time: <strong>{m.date} · {m.time}</strong></span>
              <span>Map: <strong>{m.map}</strong></span>
              <span>State: <strong>{m.roomState}</strong></span>
            </div>

            <div className="admin-entity-card__footer">
              {revealedRoom === m.id ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '12px', background: '#FEF3C7', padding: '6px 10px', borderRadius: '4px' }}>
                  <span>Room ID: <strong>982103</strong></span>
                  <button
                    type="button"
                    onClick={() => handleRevealCredentials(m.id)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRevealCredentials(m.id)}
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  style={{ width: '100%' }}
                >
                  <IoLockClosedOutline size={14} />
                  <span>Inspect Room ID</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Table */}
      <div className="admin-desktop-table admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Match & Stage</th>
              <th>Tournament</th>
              <th>Schedule</th>
              <th>Map</th>
              <th>Room State</th>
              <th>Result</th>
              <th style={{ textAlign: 'right' }}>Credentials</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{m.stage}</div>
                  <span style={{ fontSize: '11px', color: 'var(--admin-grey)', fontFamily: 'monospace' }}>{m.id}</span>
                </td>
                <td style={{ fontSize: '12.5px' }}>{m.tournament}</td>
                <td style={{ fontSize: '12px' }}>{m.date} · {m.time}</td>
                <td style={{ fontSize: '12px' }}>{m.map}</td>
                <td>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: m.roomState === 'LOBBY_OPEN' ? '#ECFDF5' : 'var(--admin-light-grey)' }}>
                    {m.roomState}
                  </span>
                </td>
                <td><AdminStatusBadge type="result" status={m.resultStatus} /></td>
                <td style={{ textAlign: 'right' }}>
                  {revealedRoom === m.id ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: '#FEF3C7', padding: '3px 7px', borderRadius: '4px' }}>
                      <span>Room: <strong>982103</strong></span>
                      <button
                        type="button"
                        onClick={() => handleRevealCredentials(m.id)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}
                      >
                        Hide
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRevealCredentials(m.id)}
                      className="admin-btn admin-btn--secondary admin-btn--sm"
                    >
                      <IoLockClosedOutline size={14} />
                      <span>Inspect</span>
                    </button>
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

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER MATCHES PAGE
//
// Matches & Room Operations:
// Scheduled matches, check-in tracking, room credential distribution, and result triggers.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoTimeOutline,
  IoKeyOutline,
  IoRadioOutline,
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'

export default function OrganizerMatchesPage({ onNavigate, demoMode }) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [roomConfigModal, setRoomConfigModal] = useState(null)
  const [roomCode, setRoomCode] = useState('DEMO_ROOM_8921')
  const [roomPass, setRoomPass] = useState('DEMO_PASS_77')
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getMatches(demoMode)
      setMatches(list)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const handleSaveRoom = (e) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setRoomConfigModal(null)
    }, 1200)
  }

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Match Operations</h1>
          <p className="player-subpage-desc">
            Coordinate lobby rooms, check-in lock windows, and score submission triggers.
          </p>
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="org-mobile-card-stack">
          {matches.map((m) => {
            const isLive = m.status === 'IN_PROGRESS'
            const isCheckInOpen = m.status === 'CHECK_IN_OPEN'
            const isCompleted = m.status === 'COMPLETED'

            return (
              <div key={m.id} className="org-item-card">
                <div className="org-item-card__header">
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706' }}>{m.matchNumber}</span>
                    <h2 className="org-item-card__title" style={{ fontSize: '16px', marginTop: '2px' }}>
                      {m.tournamentName}
                    </h2>
                    <div className="org-item-card__subtitle">
                      {m.stage} · Map: <strong>{m.map}</strong>
                    </div>
                  </div>
                  <OrganizerStatusBadge status={m.status} />
                </div>

                <div className="org-item-card__row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <IoCalendarOutline size={14} color="#6B7078" />
                    <span>{m.date} · {m.scheduledTime}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>
                    {m.checkedInTeams}/{m.teamsCount} Teams Checked In
                  </span>
                </div>

                {/* Operational Action Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid #F3F4F6',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <div style={{ fontSize: '11.5px', color: '#6B7078' }}>
                    {m.roomAccessStatus === 'READY_TO_RELEASE' ? (
                      <span style={{ color: '#166534', fontWeight: 600 }}>● Room credentials configured</span>
                    ) : m.roomAccessStatus === 'RELEASED' ? (
                      <span style={{ color: '#4338CA', fontWeight: 600 }}>● Credentials released to players</span>
                    ) : (
                      <span>○ Room setup pending</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setRoomConfigModal(m)}
                      className="btn btn--secondary"
                      style={{ height: '34px', padding: '0 12px', fontSize: '12px', gap: '5px' }}
                    >
                      <IoKeyOutline size={14} />
                      <span>Room Details</span>
                    </button>

                    {isCompleted ? (
                      <button
                        onClick={() => onNavigate('/organizer/results')}
                        className="btn btn--primary"
                        style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}
                      >
                        Enter Results
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedMatch(m)}
                        className="btn btn--secondary"
                        style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}
                      >
                        Match Status
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="No scheduled matches"
          description="Matches will appear automatically when tournaments enter operational stages."
        />
      )}

      {/* Room Configuration Modal */}
      <Modal
        isOpen={Boolean(roomConfigModal)}
        onClose={() => setRoomConfigModal(null)}
        title="Room Credentials Setup"
      >
        <form onSubmit={handleSaveRoom} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '12.5px', color: '#6B7078', margin: 0 }}>
            Configure lobby credentials for <strong>{roomConfigModal?.tournamentName}</strong> ({roomConfigModal?.matchNumber}).
            Credentials will only be distributed to verified, checked-in players.
          </p>

          <div className="org-form-group">
            <label className="org-form-label">CUSTOM ROOM ID</label>
            <input
              type="text"
              className="org-form-input"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              required
            />
          </div>

          <div className="org-form-group">
            <label className="org-form-label">ROOM PASSWORD</label>
            <input
              type="text"
              className="org-form-input"
              value={roomPass}
              onChange={(e) => setRoomPass(e.target.value)}
              required
            />
          </div>

          {saveSuccess && (
            <div style={{ color: '#166534', fontSize: '12px', fontWeight: 600 }}>
              ✓ Room credentials saved and queued for release!
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setRoomConfigModal(null)}
              className="btn btn--secondary"
              style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              style={{ height: '36px', padding: '0 18px', fontSize: '12.5px' }}
            >
              Save Credentials
            </button>
          </div>
        </form>
      </Modal>

      {/* Match Status Details Modal */}
      <Modal
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
        title={selectedMatch?.matchNumber || 'Match Status'}
      >
        {selectedMatch && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>{selectedMatch.tournamentName}</h3>
                <span style={{ fontSize: '12px', color: '#6B7078' }}>
                  {selectedMatch.stage} · Map: {selectedMatch.map}
                </span>
              </div>
              <OrganizerStatusBadge status={selectedMatch.status} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '12px',
                background: '#F9FAFB',
                borderRadius: '8px',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>SCHEDULED</span>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>
                  {selectedMatch.date} · {selectedMatch.scheduledTime}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>CHECKED-IN</span>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>
                  {selectedMatch.checkedInTeams} of {selectedMatch.teamsCount} Teams
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => setSelectedMatch(null)}
                className="btn btn--primary"
                style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

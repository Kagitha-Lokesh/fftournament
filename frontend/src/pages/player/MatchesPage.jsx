import React, { useState, useEffect } from 'react'
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoKeyOutline,
  IoCopyOutline,
  IoCheckmarkDoneOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import { playerService } from '../../services/playerService'

export default function MatchesPage({ onNavigate, demoMode, onOpenCheckIn }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [matches, setMatches] = useState({ upcoming: [], live: [], completed: [] })
  const [revealedCreds, setRevealedCreds] = useState({})
  const [copiedId, setCopiedId] = useState(false)
  const [copiedPass, setCopiedPass] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await playerService.getMatches(demoMode)
      setMatches(data)
    }
    load()
  }, [demoMode])

  const toggleReveal = (matchId) => {
    setRevealedCreds((prev) => ({ ...prev, [matchId]: !prev[matchId] }))
  }

  const copyCred = (text, type) => {
    navigator.clipboard?.writeText(text)
    if (type === 'id') {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    } else {
      setCopiedPass(true)
      setTimeout(() => setCopiedPass(false), 2000)
    }
  }

  const list = matches[activeTab] || []

  return (
    <div className="player-subpage">
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">My Matches</h1>
          <p className="player-subpage-desc">
            Your match schedule, check-in status, and authorized room access.
          </p>
        </div>
      </div>

      {/* Tabs: Upcoming · Live · Completed */}
      <div className="player-tabs-bar">
        <button
          className={`player-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({matches.upcoming?.length || 0})
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live ({matches.live?.length || 0})
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({matches.completed?.length || 0})
        </button>
      </div>

      {list.length > 0 ? (
        <div className="player-matches-clean-stack">
          {list.map((m) => {
            const isEligibleForRoom = m.check_in_status === 'CONFIRMED' || m.room_access_status === 'RELEASED'
            const isRevealed = !!revealedCreds[m.id]

            return (
              <div key={m.id} className="player-match-clean-card">
                <div className="player-match-clean-card__header">
                  <div>
                    <span className="player-pill player-pill--sm">{m.mode}</span>
                    <h2 className="player-match-clean-card__name">{m.tournamentName}</h2>
                    <span className="player-match-clean-card__sub">{m.matchNumber} · Map: {m.map || 'Bermuda'}</span>
                  </div>
                  <StatusBadge status={m.check_in_status || 'CONFIRMED'} />
                </div>

                <div className="player-match-clean-card__time-row">
                  <IoCalendarOutline size={14} />
                  <span>{m.date} · {m.time}</span>
                  {m.team && (
                    <>
                      <span className="player-bullet">•</span>
                      <span>Squad: <strong>{m.team.name}</strong> ({m.team.slot})</span>
                    </>
                  )}
                </div>

                {/* Secure Room Access Pattern */}
                <div className="player-room-access-module">
                  {isEligibleForRoom ? (
                    <div className="player-room-access-box">
                      <div className="player-room-access-box__top">
                        <span className="player-room-access-box__lbl">
                          <IoKeyOutline size={13} /> Room Details
                        </span>
                        <button
                          onClick={() => toggleReveal(m.id)}
                          className="player-room-reveal-btn"
                          aria-label={isRevealed ? 'Hide credentials' : 'Reveal credentials'}
                        >
                          {isRevealed ? (
                            <>
                              <IoEyeOffOutline size={14} />
                              <span>Hide Details</span>
                            </>
                          ) : (
                            <>
                              <IoEyeOutline size={14} />
                              <span>Reveal Room Details</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="player-room-access-credentials-row">
                        <div className="player-room-field">
                          <span className="player-room-field__lbl">ROOM ID</span>
                          <div className="player-room-field__val-row">
                            <span className="player-room-field__val">
                              {isRevealed ? (m.room_credentials?.roomId || '104592') : '••••••••'}
                            </span>
                            {isRevealed && (
                              <button
                                onClick={() => copyCred(m.room_credentials?.roomId || '104592', 'id')}
                                className="player-room-copy-btn"
                                title="Copy Room ID"
                              >
                                {copiedId ? <IoCheckmarkDoneOutline size={14} color="#166534" /> : <IoCopyOutline size={14} />}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="player-room-field">
                          <span className="player-room-field__lbl">PASSWORD</span>
                          <div className="player-room-field__val-row">
                            <span className="player-room-field__val">
                              {isRevealed ? (m.room_credentials?.roomPassword || 'ffwar') : '••••••••'}
                            </span>
                            {isRevealed && (
                              <button
                                onClick={() => copyCred(m.room_credentials?.roomPassword || 'ffwar', 'pass')}
                                className="player-room-copy-btn"
                                title="Copy Password"
                              >
                                {copiedPass ? <IoCheckmarkDoneOutline size={14} color="#166534" /> : <IoCopyOutline size={14} />}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="player-room-locked-box">
                      <IoLockClosedOutline size={16} />
                      <span>{m.check_in_deadline || 'Room credentials release upon verified check-in.'}</span>
                    </div>
                  )}
                </div>

                <div className="player-match-clean-card__footer">
                  {m.check_in_status === 'OPEN' && (
                    <button
                      onClick={() => onOpenCheckIn && onOpenCheckIn(m)}
                      className="btn btn--primary"
                      style={{ height: '38px', padding: '0 18px', fontSize: '13px' }}
                    >
                      Check In for Match
                    </button>
                  )}
                  {m.check_in_status === 'CONFIRMED' && (
                    <div className="player-checkin-tag">
                      <IoCheckmarkCircleOutline size={15} />
                      <span>Check-in confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab} matches`}
          description="Your scheduled tournament matches will appear here."
          actionLabel={activeTab === 'upcoming' ? 'Explore Tournaments' : null}
          onAction={() => onNavigate('/player/tournaments')}
        />
      )}
    </div>
  )
}

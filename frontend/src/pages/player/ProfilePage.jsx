import React, { useState } from 'react'
import {
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoKeyOutline,
  IoCheckmarkCircleOutline,
  IoLogOutOutline,
  IoCopyOutline,
  IoCheckmarkDoneOutline,
} from 'react-icons/io5'
import PlayerAvatar from '../../components/player/ui/PlayerAvatar'
import StatusBadge from '../../components/player/ui/StatusBadge'

export default function ProfilePage({ onNavigate, player, demoMode, onSignOut }) {
  const [copiedUid, setCopiedUid] = useState(false)
  const [savedNote, setSavedNote] = useState(false)

  const copyUid = () => {
    if (!player?.freeFireUid) return
    navigator.clipboard?.writeText(player.freeFireUid)
    setCopiedUid(true)
    setTimeout(() => setCopiedUid(false), 2000)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSavedNote(true)
    setTimeout(() => setSavedNote(false), 2500)
  }

  return (
    <div className="player-subpage">
      <div className="player-subpage-header">
        <div>
          <h2 className="player-subpage-title">Profile & Preferences</h2>
          <p className="player-subpage-desc">
            Your registered Free Fire identity, verified status, and competition settings.
          </p>
        </div>
      </div>

      <div className="player-profile-layout">
        {/* Left Column: Player Identity Card */}
        <div className="player-card-module">
          <div className="player-profile-identity-header">
            <PlayerAvatar name={player?.ign || 'Player'} size={72} showIndicator status="online" />
            <div>
              <h3 className="player-profile-ign">{player?.ign || 'SHADOW_K'}</h3>
              <div className="player-profile-id-row">
                <span>Player ID: <strong>{player?.playerId || '#FFW-88219'}</strong></span>
                <StatusBadge status={player?.verification_status || 'VERIFIED'} size="sm" />
              </div>
            </div>
          </div>

          <div className="player-profile-stats-list">
            <div className="player-profile-stat-item">
              <span className="label">Free Fire In-Game UID</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '15px', color: '#111318' }}>{player?.freeFireUid || '—'}</strong>
                {player?.freeFireUid && (
                  <button onClick={copyUid} className="player-room-box__copy-btn" title="Copy UID">
                    {copiedUid ? <IoCheckmarkDoneOutline size={14} color="#166534" /> : <IoCopyOutline size={14} />}
                  </button>
                )}
              </div>
            </div>

            <div className="player-profile-stat-item">
              <span className="label">Competition Region</span>
              <span>{player?.region || 'South Asia / India'}</span>
            </div>

            <div className="player-profile-stat-item">
              <span className="label">Primary Role</span>
              <span>{player?.role || 'Fragger / Assault'}</span>
            </div>

            <div className="player-profile-stat-item">
              <span className="label">Registered Email</span>
              <span>{player?.email || 'shadow_k@ffwar.gg'}</span>
            </div>

            <div className="player-profile-stat-item">
              <span className="label">Profile Completeness</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px', height: '6px', background: '#E4E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${player?.profileCompleteness || 85}%`, height: '100%', background: '#F4C400' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{player?.profileCompleteness || 85}%</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E4E7EB' }}>
            <button
              onClick={onSignOut}
              className="btn btn--secondary"
              style={{ width: '100%', height: '38px', color: '#b91c1c' }}
            >
              <IoLogOutOutline size={16} />
              <span>Sign Out to Public Website</span>
            </button>
          </div>
        </div>

        {/* Right Column: Settings & Verification */}
        <div className="player-dashboard-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Identity Verification (KYC) Card */}
          <div className="player-card-module">
            <div className="player-card-module__header">
              <div>
                <h3 className="player-card-module__title">Platform Verification & Trust</h3>
                <span className="player-card-module__subtitle">Required for prize payouts exceeding ₹1,000</span>
              </div>
              <StatusBadge status={player?.kyc_status || 'VERIFIED'} />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.25)',
              }}
            >
              <IoShieldCheckmarkOutline size={22} color="#166534" />
              <div style={{ fontSize: '12.5px', color: '#166534', lineHeight: 1.5 }}>
                <strong>KYC Verified:</strong> Free Fire in-game tag and bank UPI identity match platform records. Your account is eligible for instant automated prize payouts.
              </div>
            </div>
          </div>

          {/* Account Preferences Form */}
          <div className="player-card-module">
            <div className="player-card-module__header">
              <div>
                <h3 className="player-card-module__title">Account Preferences</h3>
                <span className="player-card-module__subtitle">Match notification alerts and display tags</span>
              </div>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                  In-Game Name (IGN)
                </label>
                <input type="text" defaultValue={player?.ign || 'SHADOW_K'} className="player-input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                  Free Fire UID (Authoritative)
                </label>
                <input
                  type="text"
                  defaultValue={player?.freeFireUid || '5849302194'}
                  className="player-input"
                  readOnly
                  title="UID is locked once verified. Contact integrity arbiters to request changes."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                  Tournament Notifications
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Send WhatsApp match reminder 30 minutes before custom room start</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Send instant notification upon prize credit settlement</span>
                  </label>
                </div>
              </div>

              {savedNote && (
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(34, 197, 94, 0.10)',
                    color: '#166534',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <IoCheckmarkCircleOutline size={16} />
                  <span>Preferences saved successfully.</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button type="submit" className="btn btn--primary" style={{ height: '38px', padding: '0 20px', fontSize: '13px' }}>
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

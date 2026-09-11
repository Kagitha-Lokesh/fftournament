import React, { useState } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

export default function SettingsPage({ onNavigate, onSignOut }) {
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="player-subpage">
      <div className="player-subpage-header">
        <div>
          <h2 className="player-subpage-title">Settings</h2>
          <p className="player-subpage-desc">Preferences, notifications, and security settings.</p>
        </div>
      </div>

      <div className="player-settings-layout">
        <form onSubmit={handleSave} className="player-card-module">
          <h3 className="player-card-module__title" style={{ marginBottom: '16px' }}>
            Match & Communication Alerts
          </h3>

          <div className="player-settings-group">
            <label className="player-settings-checkbox">
              <input type="checkbox" defaultChecked />
              <div>
                <strong>Match room reminders</strong>
                <p>Receive an alert 15 minutes before your scheduled tournament match begins.</p>
              </div>
            </label>

            <label className="player-settings-checkbox">
              <input type="checkbox" defaultChecked />
              <div>
                <strong>Prize settlements</strong>
                <p>Get notified when prize funds are verified and credited to your wallet.</p>
              </div>
            </label>

            <label className="player-settings-checkbox">
              <input type="checkbox" defaultChecked />
              <div>
                <strong>Dispute & integrity updates</strong>
                <p>Receive updates when platform arbiters post rulings or request information.</p>
              </div>
            </label>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E4E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {saved ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontSize: '13px', fontWeight: 600 }}>
                <IoCheckmarkCircleOutline size={18} />
                <span>Settings saved successfully.</span>
              </div>
            ) : <div />}
            <button type="submit" className="btn btn--primary" style={{ height: '38px', padding: '0 20px', fontSize: '13px' }}>
              Save Settings
            </button>
          </div>
        </form>

        <div className="player-card-module" style={{ marginTop: '16px' }}>
          <h3 className="player-card-module__title" style={{ marginBottom: '12px' }}>
            Account Security
          </h3>
          <p style={{ fontSize: '13px', color: '#6B7078', lineHeight: 1.5, marginBottom: '16px' }}>
            Your account is authenticated with verified Free Fire UID credentials.
          </p>
          <button
            onClick={onSignOut}
            className="btn btn--secondary"
            style={{ height: '38px', color: '#DC2626', borderColor: '#FECACA' }}
          >
            Sign Out of FF WAR
          </button>
        </div>
      </div>
    </div>
  )
}

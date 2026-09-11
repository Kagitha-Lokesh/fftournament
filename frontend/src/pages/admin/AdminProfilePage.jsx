// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN PROFILE & SECURITY SETTINGS
//
// Administrator governance identity, verified privileges, and session security.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoShieldCheckmark, IoKeyOutline, IoLockClosedOutline } from 'react-icons/io5'

export default function AdminProfilePage({ profile }) {
  const admin = profile || {
    name: 'Aravind Swaminathan',
    gamertag: 'ARAVIND_GOV',
    role: 'ADMIN',
    email: 'admin.governance@ffwar.internal',
    permissions: [
      'PLATFORM_GOVERNANCE',
      'TOURNAMENT_CREATE_OPERATE',
      'TOURNAMENT_VERIFY_OVERRIDE',
      'USER_MANAGEMENT',
      'ORGANIZER_VERIFICATION',
      'RESULT_INTEGRITY_AUDIT',
      'DISPUTE_ARBITRATION',
      'FINANCIAL_LEDGER_ACCESS',
      'PAYOUT_AUTHORIZATION',
      'SYSTEM_AUDIT_LOG_READ'
    ]
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--admin-ink)' }}>
          Administrator Governance Profile
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-grey)' }}>
          Super-role identity credentials, verified cryptographic privileges, and session audit logs.
        </p>
      </div>

      {/* Identity Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Admin Avatar"
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--admin-yellow)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{admin.name}</h3>
              <span className="admin-sidebar__role-tag">SUPER-ROLE</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--admin-grey)', marginTop: '2px' }}>
              IGN: <strong>{admin.gamertag}</strong> · {admin.email}
            </div>
          </div>
        </div>
      </div>

      {/* Active Privileges */}
      <div className="admin-card">
        <div className="admin-card__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IoShieldCheckmark size={18} style={{ color: 'var(--admin-yellow)' }} />
            <h3 className="admin-card__title">Granted Platform Governance Permissions</h3>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
          {admin.permissions?.map(perm => (
            <div
              key={perm}
              style={{
                padding: '10px 12px',
                backgroundColor: 'var(--admin-light-grey)',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'monospace',
                fontWeight: 600,
                color: 'var(--admin-ink)',
                border: '1px solid var(--admin-border)'
              }}
            >
              ✓ {perm}
            </div>
          ))}
        </div>
      </div>

      {/* Session Security */}
      <div className="admin-card">
        <div className="admin-card__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IoLockClosedOutline size={18} style={{ color: 'var(--admin-grey)' }} />
            <h3 className="admin-card__title">Authentication & Session Security</h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--admin-grey)' }}>Hardware Multi-Factor Authentication (MFA)</span>
            <span style={{ fontWeight: 700, color: '#065F46' }}>ENFORCED & ACTIVE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--admin-grey)' }}>Current Session Signature</span>
            <span style={{ fontFamily: 'monospace' }}>SEC-AUTH-90214-G7</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--admin-grey)' }}>Session Timeout</span>
            <span>Automatic lock after 45 minutes of inactivity</span>
          </div>
        </div>
      </div>
    </div>
  )
}

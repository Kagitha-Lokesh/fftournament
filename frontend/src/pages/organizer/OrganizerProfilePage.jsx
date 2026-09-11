// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER PROFILE & VERIFICATION PAGE
//
// Organization profile, truthful verification status, operational metrics,
// and disbursement settings.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoWalletOutline,
  IoLogOutOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import { formatCurrency } from '../../utils/formatters'

export default function OrganizerProfilePage({ organizer, onSignOut }) {
  const [copiedId, setCopiedId] = useState(false)

  const copyOrgId = () => {
    navigator.clipboard?.writeText(organizer?.id || '#ORG-88192')
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const isVerified = organizer?.verificationStatus === 'VERIFIED'

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Organizer Profile</h1>
          <p className="player-subpage-desc">Organization credentials, partner tier, and payout configuration.</p>
        </div>
      </div>

      {/* Main Profile Summary Card */}
      <div className="player-card-module" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#111318',
                color: '#F4C400',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
                border: '2px solid #272A30',
              }}
            >
              {organizer?.tag || 'BZE'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111318', margin: 0 }}>
                  {organizer?.name || 'BattleZone Esports'}
                </h2>
                <OrganizerStatusBadge status={organizer?.verificationStatus || 'VERIFIED'} size="sm" />
              </div>
              <div style={{ fontSize: '12px', color: '#6B7078', marginTop: '4px' }}>
                ID: <code>{organizer?.id || '#ORG-88192'}</code> · {organizer?.region || 'India'}
              </div>
            </div>
          </div>

          <button
            onClick={copyOrgId}
            className="btn btn--secondary"
            style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
          >
            {copiedId ? '✓ Copied ID' : 'Copy Org ID'}
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, margin: '16px 0 0 0' }}>
          {organizer?.bio || 'Premier Free Fire tournament organizer hosting verified scrims and championships.'}
        </p>
      </div>

      {/* Operational Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div className="player-card-module" style={{ padding: '14px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>TOURNAMENTS HOSTED</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#111318', marginTop: '2px' }}>
            {organizer?.metrics?.tournamentsHosted || 34}
          </div>
        </div>
        <div className="player-card-module" style={{ padding: '14px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>PLAYERS MANAGED</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#111318', marginTop: '2px' }}>
            {organizer?.metrics?.totalPlayersManaged || 1840}
          </div>
        </div>
        <div className="player-card-module" style={{ padding: '14px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>PRIZES DISBURSED</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
            {formatCurrency(organizer?.metrics?.totalPrizesDisbursed || 145000)}
          </div>
        </div>
        <div className="player-card-module" style={{ padding: '14px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>COMPLETION RATE</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#166534', marginTop: '2px' }}>
            {organizer?.metrics?.completionRate || '98.5%'}
          </div>
        </div>
      </div>

      {/* Verification & Compliance Card */}
      <div className="player-card-module" style={{ padding: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <IoShieldCheckmarkOutline size={18} color="#166534" />
          <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>Platform Verification Status</h3>
        </div>
        <p style={{ fontSize: '12.5px', color: '#6B7078', margin: 0, lineHeight: 1.5 }}>
          {isVerified ? (
            <>
              Your organizer identity was verified on <strong>{organizer?.verificationDate}</strong>.
              Automated check-in rooms and prize distribution pipelines are unlocked.
            </>
          ) : (
            <>Verification is currently pending review by the platform integrity team.</>
          )}
        </p>
      </div>

      {/* Payout Destination Info */}
      <div className="player-card-module" style={{ padding: '18px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: '0 0 8px 0' }}>Disbursement Destination</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>
              UPI: {organizer?.payoutAccount?.identifier || 'battlezone@okhdfcbank.demo'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
              ● Verified for automated settlement transfers
            </div>
          </div>
          <span style={{ fontSize: '11px', color: '#6B7078' }}>Changes require 48h security hold</span>
        </div>
      </div>

      {/* Sign Out Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onSignOut}
          className="btn btn--secondary"
          style={{ height: '40px', padding: '0 18px', fontSize: '13px', gap: '6px', color: '#991B1B' }}
        >
          <IoLogOutOutline size={17} />
          <span>Exit to Public Website</span>
        </button>
      </div>
    </div>
  )
}

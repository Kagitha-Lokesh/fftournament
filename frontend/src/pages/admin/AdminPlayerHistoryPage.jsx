// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN PLAYER CAREER HISTORY & RECORD INTEGRITY
//
// Ensures player persistent competitive records remain trustworthy and audited.
// Casual stat edits are strictly prohibited; changes require audited corrections.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { IoSearchOutline, IoShieldCheckmark, IoPersonCircleOutline, IoBarChartOutline } from 'react-icons/io5'

export default function AdminPlayerHistoryPage({ onRequestConfirmation, onToast }) {
  const [searchQuery, setSearchQuery] = useState('')

  const players = [
    {
      id: 'USR-PLY-101',
      ign: 'SHADOW_K',
      uid: 'FF-IN-892401',
      tournaments: 14,
      matches: 42,
      wins: 4,
      podiums: 9,
      kills: 128,
      kdRatio: '3.04',
      totalPrize: 8450,
      recordIntegrity: 'VERIFIED',
      lastCorrection: '04 Sep 2026 · +2 pts adjusted via Dispute #DISP-871'
    },
    {
      id: 'USR-PLY-103',
      ign: 'KAVYA_SNIPES',
      uid: 'FF-IN-614002',
      tournaments: 21,
      matches: 63,
      wins: 6,
      podiums: 14,
      kills: 214,
      kdRatio: '3.40',
      totalPrize: 14500,
      recordIntegrity: 'VERIFIED',
      lastCorrection: 'None (Unbroken verification record)'
    },
    {
      id: 'USR-PLY-104',
      ign: 'GHOST_DEVIL',
      uid: 'FF-IN-908123',
      tournaments: 2,
      matches: 6,
      wins: 1,
      podiums: 2,
      kills: 26,
      kdRatio: '4.33',
      totalPrize: 1200,
      recordIntegrity: 'AUDIT_PENDING',
      lastCorrection: 'Under investigation (Flag #INT-104)'
    }
  ]

  const handleCorrectRecord = (player) => {
    onRequestConfirmation({
      title: `Submit Audited Career Correction: ${player.ign}`,
      message: `Stat corrections directly affect player career rankings and prize eligibility. Provide the justification and official room score log reference.`,
      actionLabel: 'Apply Audited Correction',
      actionType: 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        onToast(`Audited correction logged for ${player.ign}. Audit entry generated.`, 'success')
      }
    })
  }

  const filtered = players.filter(p =>
    p.ign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.uid.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--admin-ink)' }}>
          Player Career History & Competitive Record Integrity
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-grey)' }}>
          Ensure that persistent player tournament records, kills, wins, and career prize totals remain immutable and audited.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: 'var(--admin-white)',
          padding: '14px',
          borderRadius: 'var(--admin-radius)',
          border: '1px solid var(--admin-border)'
        }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <IoSearchOutline size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-grey)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player IGN or Free Fire UID..."
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '13px', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Player Profile</th>
              <th>UID</th>
              <th>Tournaments & Matches</th>
              <th>Wins / Podiums</th>
              <th>Total Kills & K/D</th>
              <th>Prize Earnings</th>
              <th>Integrity Status</th>
              <th style={{ textAlign: 'right' }}>Correction Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: '13.5px' }}>{p.ign}</div>
                  <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>ID: {p.id}</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{p.uid}</td>
                <td style={{ fontSize: '12.5px' }}>
                  <strong>{p.tournaments}</strong> events ({p.matches} matches)
                </td>
                <td style={{ fontSize: '12.5px' }}>
                  <strong>{p.wins}</strong> wins ({p.podiums} top 3)
                </td>
                <td style={{ fontSize: '12.5px' }}>
                  <strong>{p.kills}</strong> kills (K/D: {p.kdRatio})
                </td>
                <td style={{ fontWeight: 700, fontSize: '13px' }}>
                  ₹{p.totalPrize.toLocaleString()}
                </td>
                <td>
                  <span
                    className={`admin-badge ${p.recordIntegrity === 'VERIFIED' ? 'admin-badge--live' : 'admin-badge--pending'}`}
                  >
                    {p.recordIntegrity === 'VERIFIED' ? '✓ Verified Record' : 'Audit Pending'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleCorrectRecord(p)}
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                  >
                    Audited Correction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

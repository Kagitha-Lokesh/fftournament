// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER EARNINGS PAGE
//
// Financial ledger: Available · Pending Settlement · Processing · Lifetime
// Transparent transaction audit history with payout request trigger.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoWalletOutline,
  IoCashOutline,
  IoTimeOutline,
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'
import { formatCurrency } from '../../utils/formatters'

export default function OrganizerEarningsPage({ onNavigate, demoMode, onOpenPayout }) {
  const [earnings, setEarnings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await organizerService.getEarnings(demoMode)
      setEarnings(data)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const ledger = earnings?.recentLedger || []

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Earnings Ledger</h1>
          <p className="player-subpage-desc">
            Transparent breakdown of tournament commission fees and settlement balances.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/organizer/payouts')}
          className="btn btn--primary"
          style={{ height: '38px', padding: '0 16px', fontSize: '13px', gap: '6px' }}
        >
          <IoCashOutline size={16} />
          <span>Manage Payouts</span>
        </button>
      </div>

      {/* 4-Stat Financial Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div className="player-card-module" style={{ padding: '16px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
            AVAILABLE BALANCE
          </span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#111318', marginTop: '2px' }}>
            {formatCurrency(earnings?.available || 0)}
          </div>
          <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Ready for payout withdrawal</span>
        </div>

        <div className="player-card-module" style={{ padding: '16px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
            PENDING SETTLEMENT
          </span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#B45309', marginTop: '2px' }}>
            {formatCurrency(earnings?.pendingSettlement || 0)}
          </div>
          <span style={{ fontSize: '11px', color: '#854D0E', fontWeight: 500 }}>In verification review batch</span>
        </div>

        <div className="player-card-module" style={{ padding: '16px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
            PROCESSING IN TRANSIT
          </span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#4B5563', marginTop: '2px' }}>
            {formatCurrency(earnings?.processing || 0)}
          </div>
          <span style={{ fontSize: '11px', color: '#6B7078', fontWeight: 500 }}>Automated banking transfer</span>
        </div>

        <div className="player-card-module" style={{ padding: '16px' }}>
          <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700, textTransform: 'uppercase' }}>
            LIFETIME EARNINGS
          </span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
            {formatCurrency(earnings?.lifetimeEarnings || 0)}
          </div>
          <span style={{ fontSize: '11px', color: '#6B7078' }}>Across {earnings?.lifetimeTournaments || 0} competitions</span>
        </div>
      </div>

      {/* Transaction Ledger */}
      <section className="org-section" aria-label="Transaction ledger">
        <div className="player-section-head">
          <h2 className="player-section-title">Transaction History</h2>
        </div>

        {ledger.length > 0 ? (
          <div className="org-table-wrapper">
            <div className="org-ledger-stack">
              {ledger.map((tx) => {
                const isCredit = tx.amount > 0
                return (
                  <div key={tx.id} className="org-ledger-row">
                    <div>
                      <div style={{ fontWeight: 700, color: '#111318', fontSize: '13.5px' }}>{tx.description}</div>
                      <div style={{ fontSize: '11.5px', color: '#6B7078', marginTop: '2px' }}>
                        {tx.date} · Ref: <code>{tx.reference}</code>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        className={`org-ledger-row__amount ${
                          isCredit ? 'org-ledger-row__amount--credit' : 'org-ledger-row__amount--debit'
                        }`}
                      >
                        {isCredit ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                      </div>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          color: tx.status === 'AVAILABLE' ? '#166534' : '#B45309',
                        }}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No transactions yet"
            description="Completed tournament settlement credits will appear here."
          />
        )}
      </section>
    </div>
  )
}

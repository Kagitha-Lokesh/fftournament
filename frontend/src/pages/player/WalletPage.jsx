import React, { useState } from 'react'
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoShieldCheckmarkOutline,
  IoCashOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import { formatCurrency } from '../../utils/formatters'

export default function WalletPage({ onNavigate, wallet, demoMode, onOpenWithdraw }) {
  const [filterType, setFilterType] = useState('ALL')

  if (!wallet) return null

  const transactions = wallet.transactions || []
  const filteredTx = transactions.filter((tx) => {
    if (filterType === 'ALL') return true
    if (filterType === 'PRIZE') return tx.type === 'PRIZE_CREDIT'
    if (filterType === 'ENTRY') return tx.type === 'ENTRY_FEE'
    if (filterType === 'WITHDRAWAL') return tx.type === 'WITHDRAWAL'
    return tx.type === filterType
  })

  const rawUpi = wallet.payout_account?.id || 'shadow_k@oksbi'
  // Mask UPI identifier: keep first 2 and domain, mask the middle
  const maskUpi = (upi) => {
    const parts = upi.split('@')
    if (parts.length === 2) {
      const handle = parts[0]
      const visible = handle.slice(0, 2)
      return `${visible}${'•'.repeat(Math.max(4, handle.length - 2))}@${parts[1]}`
    }
    return '••••••••@oksbi'
  }

  const maskedUpi = maskUpi(rawUpi)

  return (
    <div className="player-subpage">
      {/* ── 1. Page Header ── */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Wallet</h1>
          <p className="player-subpage-desc">
            Track your tournament earnings, pending settlements and withdrawals.
          </p>
        </div>
      </div>

      {/* ── 2. Structured Balance Cards ── */}
      <div className="player-wallet-cards-grid">
        {/* Available to Withdraw */}
        <div className="player-wallet-card player-wallet-card--available">
          <div className="player-wallet-card__header">
            <span className="player-wallet-card__label">Available</span>
            <span className="player-pill player-pill--sm">Ready</span>
          </div>
          <div className="player-wallet-card__amount">
            {formatCurrency(wallet.available_balance || 0)}
          </div>
          <p className="player-wallet-card__sub">Available to withdraw</p>
          <div className="player-wallet-card__actions">
            <button
              onClick={onOpenWithdraw}
              className="btn btn--primary player-wallet-btn"
              disabled={(wallet.available_balance || 0) <= 0}
            >
              <IoArrowDownOutline size={16} />
              <span>Request Withdrawal</span>
            </button>
          </div>
        </div>

        {/* Pending Settlement */}
        <div className="player-wallet-card player-wallet-card--pending">
          <div className="player-wallet-card__header">
            <span className="player-wallet-card__label">Pending settlement</span>
            <span className="player-pill player-pill--sm" style={{ background: 'rgba(244, 196, 0, 0.16)', color: '#854d0e', borderColor: 'rgba(244, 196, 0, 0.35)' }}>
              In Review
            </span>
          </div>
          <div className="player-wallet-card__amount player-wallet-card__amount--pending">
            {formatCurrency(wallet.pending_balance || 0)}
          </div>
          <p className="player-wallet-card__sub">Currently being settled</p>
          <div className="player-wallet-card__note-row">
            <span>Disbursed upon completion of dispute window</span>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="player-wallet-card player-wallet-card--lifetime">
          <div className="player-wallet-card__header">
            <span className="player-wallet-card__label">Lifetime prizes won</span>
          </div>
          <div className="player-wallet-card__amount player-wallet-card__amount--lifetime">
            {formatCurrency(wallet.lifetime_earnings || 0)}
          </div>
          <p className="player-wallet-card__sub">From verified tournament placements</p>
          <div className="player-wallet-card__actions">
            <button
              onClick={() => onNavigate('/player/prizes')}
              className="btn btn--secondary player-wallet-btn"
            >
              View Prizes Ledger
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Payout Method Card ── */}
      <section className="player-section" aria-label="Payout method">
        <h2 className="player-section-title">Payout method</h2>
        <div className="player-payout-account-card">
          <div className="player-payout-account-card__left">
            <div className="player-payout-account-card__icon">
              <IoShieldCheckmarkOutline size={20} />
            </div>
            <div>
              <div className="player-payout-account-card__type-row">
                <span className="player-payout-account-card__type">Primary payout method: UPI</span>
                <span className="player-verified-badge">✓ Active Payout Account</span>
              </div>
              <div className="player-payout-account-card__id">
                {maskedUpi}
              </div>
              <p className="player-payout-account-card__desc">
                Verified against government KYC. Payouts arrive directly via instant bank transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Transaction History Section ── */}
      <section className="player-section" aria-label="Transaction history">
        <div className="player-section-head">
          <h2 className="player-section-title">Transaction history</h2>
        </div>

        {/* Filter Tabs */}
        <div className="player-tabs-bar">
          <button
            onClick={() => setFilterType('ALL')}
            className={`player-tab-btn ${filterType === 'ALL' ? 'active' : ''}`}
          >
            All ({transactions.length})
          </button>
          <button
            onClick={() => setFilterType('PRIZE')}
            className={`player-tab-btn ${filterType === 'PRIZE' ? 'active' : ''}`}
          >
            Prizes
          </button>
          <button
            onClick={() => setFilterType('ENTRY')}
            className={`player-tab-btn ${filterType === 'ENTRY' ? 'active' : ''}`}
          >
            Entry Fees
          </button>
          <button
            onClick={() => setFilterType('WITHDRAWAL')}
            className={`player-tab-btn ${filterType === 'WITHDRAWAL' ? 'active' : ''}`}
          >
            Withdrawals
          </button>
        </div>

        {filteredTx.length > 0 ? (
          <div className="player-tx-clean-stack">
            {filteredTx.map((tx) => {
              const isPositive = tx.amount > 0
              return (
                <div key={tx.id} className="player-tx-clean-row">
                  <div className="player-tx-clean-row__left">
                    <div
                      className={`player-tx-direction-icon ${
                        isPositive ? 'player-tx-direction-icon--credit' : 'player-tx-direction-icon--debit'
                      }`}
                      aria-hidden="true"
                    >
                      {isPositive ? <IoArrowDownOutline size={16} /> : <IoArrowUpOutline size={16} />}
                    </div>
                    <div className="player-tx-clean-row__details">
                      <div className="player-tx-clean-row__title">
                        {tx.type === 'PRIZE_CREDIT'
                          ? '↓ Prize payout'
                          : tx.type === 'WITHDRAWAL'
                          ? '↑ Withdrawal to UPI'
                          : '↑ Registration entry'}
                      </div>
                      <div className="player-tx-clean-row__ref">
                        {tx.description}
                      </div>
                      <div className="player-tx-clean-row__meta">
                        <span>{tx.date}</span>
                        <span className="player-bullet">•</span>
                        <span>Ref: {tx.reference}</span>
                      </div>
                    </div>
                  </div>

                  <div className="player-tx-clean-row__right">
                    <div
                      className={`player-tx-clean-row__amount ${
                        isPositive ? 'player-tx-clean-row__amount--credit' : 'player-tx-clean-row__amount--debit'
                      }`}
                    >
                      {isPositive
                        ? `+${formatCurrency(tx.amount)}`
                        : `-${formatCurrency(Math.abs(tx.amount))}`}
                    </div>
                    <StatusBadge status={tx.status} size="sm" />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={<IoCashOutline size={26} />}
            title="No transactions found"
            description="You don't have any transactions matching the selected filter."
          />
        )}
      </section>
    </div>
  )
}

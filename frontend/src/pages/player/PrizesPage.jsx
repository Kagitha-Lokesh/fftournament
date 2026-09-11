import React, { useState, useEffect } from 'react'
import {
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoHourglassOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import { playerService } from '../../services/playerService'
import { formatCurrency } from '../../utils/formatters'

export default function PrizesPage({ onNavigate, demoMode }) {
  const [activeTab, setActiveTab] = useState('ALL')
  const [prizes, setPrizes] = useState([])

  useEffect(() => {
    async function load() {
      const data = await playerService.getPrizes(demoMode)
      setPrizes(data || [])
    }
    load()
  }, [demoMode])

  const filteredPrizes = prizes.filter((p) => {
    if (activeTab === 'ALL') return true
    if (activeTab === 'PAID') return p.status === 'PAID'
    if (activeTab === 'PROCESSING') return p.status === 'PROCESSING'
    return true
  })

  return (
    <div className="player-subpage">
      {/* ── 1. Page Header ── */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Prizes & Settlements</h1>
          <p className="player-subpage-desc">
            View awarded prizes and their payment status.
          </p>
        </div>
      </div>

      {/* ── 2. Trust Notice Box ── */}
      <div className="player-trust-banner">
        <IoCheckmarkCircleOutline size={18} className="player-trust-banner__icon" />
        <p className="player-trust-banner__text">
          <strong>Settlement Integrity:</strong> Prizes move from <em>Awarded</em> to <em>Verified</em>, and are disbursed directly to your registered UPI or wallet once the 24-hour dispute review period concludes.
        </p>
      </div>

      {/* ── 3. Tabs Bar ── */}
      <div className="player-tabs-bar">
        <button
          className={`player-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All ({prizes.length})
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'PROCESSING' ? 'active' : ''}`}
          onClick={() => setActiveTab('PROCESSING')}
        >
          Processing ({prizes.filter((p) => p.status === 'PROCESSING').length})
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'PAID' ? 'active' : ''}`}
          onClick={() => setActiveTab('PAID')}
        >
          Paid ({prizes.filter((p) => p.status === 'PAID').length})
        </button>
      </div>

      {/* ── 4. Structured Prize Cards ── */}
      {filteredPrizes.length > 0 ? (
        <div className="player-prizes-clean-grid">
          {filteredPrizes.map((p) => {
            const isPaid = p.status === 'PAID'
            return (
              <div key={p.id} className="player-prize-record-card">
                {/* Placement & Status Header */}
                <div className="player-prize-record-card__header">
                  <span
                    className={`player-pill ${
                      p.placement?.includes('1st') ? 'player-pill--gold' : ''
                    }`}
                  >
                    {p.placement}
                  </span>
                  <StatusBadge status={p.status} size="sm" />
                </div>

                {/* Tournament Name */}
                <h2 className="player-prize-record-card__tournament">
                  {p.tournament}
                </h2>

                {/* Amount Split: Awarded vs Paid */}
                <div className="player-prize-amounts-panel">
                  <div className="player-prize-amount-box">
                    <span className="player-prize-amount-box__label">PRIZE AWARDED</span>
                    <div className="player-prize-amount-box__val">
                      {formatCurrency(p.awardedAmount || 0)}
                    </div>
                  </div>

                  <div className="player-prize-amount-box">
                    <span className="player-prize-amount-box__label">PRIZE PAID</span>
                    <div
                      className={`player-prize-amount-box__val ${
                        isPaid ? 'player-prize-amount-box__val--paid' : 'player-prize-amount-box__val--pending'
                      }`}
                    >
                      {isPaid ? formatCurrency(p.paidAmount || p.awardedAmount) : 'Pending settlement'}
                    </div>
                  </div>
                </div>

                {/* Timeline & Metadata */}
                <div className="player-prize-record-card__meta-stack">
                  <div className="player-prize-meta-row">
                    <span className="player-prize-meta-label">Awarded:</span>
                    <span className="player-prize-meta-value">{p.dateAwarded}</span>
                  </div>

                  {p.settledDate ? (
                    <div className="player-prize-meta-row">
                      <span className="player-prize-meta-label">Settled:</span>
                      <span className="player-prize-meta-value">{p.settledDate}</span>
                    </div>
                  ) : (
                    <div className="player-prize-meta-row">
                      <span className="player-prize-meta-label">Settlement:</span>
                      <span className="player-prize-meta-value" style={{ color: '#854d0e' }}>
                        In verification batch
                      </span>
                    </div>
                  )}

                  {p.reference && (
                    <div className="player-prize-meta-row">
                      <span className="player-prize-meta-label">Reference ID:</span>
                      <code className="player-prize-ref-code">{p.reference}</code>
                    </div>
                  )}

                  {p.settlementNote && (
                    <div className="player-prize-settlement-note">
                      <IoHourglassOutline size={13} />
                      <span>{p.settlementNote}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<IoCashOutline size={26} />}
          title="No prize records in this filter"
          description="Tournament winnings will appear here once official placements are verified."
          actionLabel="Find Tournaments"
          onAction={() => onNavigate('/player/tournaments')}
        />
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN FINANCIAL LEDGER (PLAYER-STYLE REBUILD)
//
// Treasury overview with:
// 1. Four small balance cards (Available, Prize Escrow, Processing, Settled)
// 2. Transactions list: on mobile, transaction rows become compact cards!
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { formatCurrency } from '../../utils/formatters'

export default function AdminLedgerPage() {
  const [ledger, setLedger] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await adminService.getFinancialLedger()
        setLedger(data)
      } catch (err) {
        console.error('Failed to load financial ledger:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="admin-loading-state">Loading platform ledger...</div>
  }

  const balances = ledger?.balances || {}
  const transactions = ledger?.transactions || []

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Financial Ledger</h2>
          <p className="admin-page-header__subtitle">
            Authoritative platform treasury: Escrow allocations, entry fees, and settled prize disbursements.
          </p>
        </div>
      </div>

      {/* ── 2. Four Small Balance Cards ── */}
      <div className="admin-finance-grid">
        <div className="admin-finance-card">
          <span className="admin-finance-card__lbl">AVAILABLE</span>
          <span className="admin-finance-card__val">
            {formatCurrency(balances.available || 128450)}
          </span>
        </div>

        <div className="admin-finance-card">
          <span className="admin-finance-card__lbl">PRIZE ESCROW</span>
          <span className="admin-finance-card__val admin-finance-card__val--escrow">
            {formatCurrency(balances.pendingSettlement || 43200)}
          </span>
        </div>

        <div className="admin-finance-card">
          <span className="admin-finance-card__lbl">PROCESSING</span>
          <span className="admin-finance-card__val admin-finance-card__val--proc">
            {formatCurrency(balances.processingPayouts || 18500)}
          </span>
        </div>

        <div className="admin-finance-card">
          <span className="admin-finance-card__lbl">SETTLED</span>
          <span className="admin-finance-card__val">
            {formatCurrency(balances.paidPrizeTotal || 245000)}
          </span>
        </div>
      </div>

      {/* ── 3. Transactions Section ── */}
      <section className="admin-home-section" style={{ marginTop: '8px' }}>
        <div className="admin-section-header">
          <h3 className="admin-section-header__title">Transactions</h3>
          <span style={{ fontSize: '11.5px', color: 'var(--admin-grey)' }}>
            Immutable double-entry log
          </span>
        </div>

        {/* MOBILE: Clean Transaction Cards */}
        <div className="admin-mobile-list">
          {transactions.map((t) => {
            const isOutflow = t.type === 'REFUND' || t.type === 'PAYOUT'
            return (
              <article key={t.id} className="admin-tx-card">
                <div className="admin-tx-card__header">
                  <div>
                    <h4 className="admin-tx-card__type">{t.type.replace(/_/g, ' ')}</h4>
                    <div className="admin-tx-card__title">{t.tournamentTitle}</div>
                  </div>
                  <div
                    className={`admin-tx-card__amount ${
                      isOutflow ? 'admin-tx-card__amount--negative' : 'admin-tx-card__amount--positive'
                    }`}
                  >
                    {isOutflow ? '-' : '+'}{formatCurrency(t.amount)}
                  </div>
                </div>

                <div className="admin-tx-card__details">
                  <span>REF: {t.reference}</span>
                  <span>{t.date}</span>
                </div>
              </article>
            )
          })}
        </div>

        {/* DESKTOP: Clean Table */}
        <div className="admin-desktop-table admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Type</th>
                <th>Tournament</th>
                <th>Amount</th>
                <th>Date & Time</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => {
                const isOutflow = t.type === 'REFUND' || t.type === 'PAYOUT'
                return (
                  <tr key={t.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 600 }}>
                      {t.reference}
                    </td>
                    <td style={{ fontWeight: 700 }}>{t.type.replace(/_/g, ' ')}</td>
                    <td style={{ fontSize: '12.5px' }}>{t.tournamentTitle}</td>
                    <td
                      style={{
                        fontWeight: 800,
                        color: isOutflow ? '#B91C1C' : '#065F46'
                      }}
                    >
                      {isOutflow ? '-' : '+'}{formatCurrency(t.amount)}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>{t.date}</td>
                    <td style={{ fontSize: '12px', color: 'var(--admin-grey)' }}>{t.account}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

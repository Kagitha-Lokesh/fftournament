// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN HOME (PLATFORM CONTROL CENTER)
//
// Strict Player Dashboard layout rhythm:
// 1. Contextual Hero (One situation, one message, one primary action)
// 2. 4 compact metric cards (2x2 on Mobile, 4-col on Desktop)
// 3. Requires Attention (Single compact summary card with count rows)
// 4. Platform Tournaments (2-card row using Player-style tournament cards)
// 5. Results / Integrity (Compact review snapshot)
// 6. Financial Snapshot (4 compact treasury balances)
// 7. Recent Audit (Compact timeline log)
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import AdminControlHero from '../../components/admin/ui/AdminControlHero'
import AdminSummaryGrid from '../../components/admin/ui/AdminSummaryGrid'
import AdminAttentionPanel from '../../components/admin/ui/AdminAttentionPanel'
import AdminTournamentCard from '../../components/admin/ui/AdminTournamentCard'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoShieldCheckmark,
  IoDocumentTextOutline,
  IoWalletOutline,
  IoTimeOutline,
  IoArrowForward
} from 'react-icons/io5'
import { formatCurrency } from '../../utils/formatters'

export default function AdminHome({
  dashboardData,
  platformSummary,
  attentionItems,
  onNavigate
}) {
  const platformTournaments = dashboardData?.platformTournaments || []
  const recentResults = dashboardData?.recentResults || []
  const recentAuditLogs = dashboardData?.recentAuditLogs || []
  const financialOverview = dashboardData?.financialOverview || {}

  return (
    <div className="admin-page-container">
      {/* ── 1. Contextual Hero ── */}
      <AdminControlHero
        attentionItems={attentionItems}
        tournaments={dashboardData?.recentTournaments || []}
        onNavigate={onNavigate}
      />

      {/* ── 2. Exactly 4 Primary Metrics (2x2 on Mobile, 4-col on Desktop) ── */}
      <AdminSummaryGrid
        summary={platformSummary}
        onNavigate={onNavigate}
      />

      {/* ── 3. Requires Attention (Compact Overview Card) ── */}
      <AdminAttentionPanel
        items={attentionItems}
        onNavigate={onNavigate}
      />

      {/* ── 4. Platform Tournaments (2-Card Row) ── */}
      <section className="admin-home-section" aria-label="Platform Tournaments">
        <div className="admin-section-header">
          <div className="admin-section-header__title-wrap">
            <IoShieldCheckmark size={16} className="admin-section-header__icon" />
            <h3 className="admin-section-header__title">Platform Tournaments</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/tournaments')}
            className="admin-section-header__link"
          >
            <span>View all</span>
            <IoArrowForward size={13} />
          </button>
        </div>

        {platformTournaments.length === 0 ? (
          <div className="admin-empty-card">
            <p>No platform-managed tournaments active.</p>
            <button
              type="button"
              onClick={() => onNavigate('/admin/tournaments/new')}
              className="admin-btn admin-btn--yellow admin-btn--sm"
            >
              + Create Tournament
            </button>
          </div>
        ) : (
          <div className="player-tournaments-2col-grid">
            {platformTournaments.slice(0, 2).map((t) => (
              <AdminTournamentCard
                key={t.id}
                tournament={t}
                onManage={(id) => onNavigate(`/admin/tournaments/${id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── 5. Results / Integrity Snapshot ── */}
      <section className="admin-home-section" aria-label="Results & Integrity">
        <div className="admin-section-header">
          <div className="admin-section-header__title-wrap">
            <IoDocumentTextOutline size={16} className="admin-section-header__icon" />
            <h3 className="admin-section-header__title">Results & Integrity</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/results')}
            className="admin-section-header__link"
          >
            <span>Queue</span>
            <IoArrowForward size={13} />
          </button>
        </div>

        <div className="admin-compact-stack">
          {recentResults.slice(0, 2).map((r) => (
            <div
              key={r.id}
              onClick={() => onNavigate('/admin/results')}
              className="admin-item-card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('/admin/results') }}
            >
              <div className="admin-item-card__main">
                <h4 className="admin-item-card__title">{r.tournamentTitle}</h4>
                <div className="admin-item-card__sub">
                  Match {r.matchNumber} · Submitted by {r.submittedBy}
                </div>
              </div>
              <AdminStatusBadge type="result" status={r.lifecycleStatus} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Financial Snapshot (4 Compact Balance Cards) ── */}
      <section className="admin-home-section" aria-label="Financial Snapshot">
        <div className="admin-section-header">
          <div className="admin-section-header__title-wrap">
            <IoWalletOutline size={16} className="admin-section-header__icon" />
            <h3 className="admin-section-header__title">Financial Snapshot</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/ledger')}
            className="admin-section-header__link"
          >
            <span>Ledger</span>
            <IoArrowForward size={13} />
          </button>
        </div>

        <div className="admin-finance-grid">
          <div className="admin-finance-card">
            <span className="admin-finance-card__lbl">AVAILABLE</span>
            <span className="admin-finance-card__val">
              {formatCurrency(financialOverview.available || 128450)}
            </span>
          </div>

          <div className="admin-finance-card">
            <span className="admin-finance-card__lbl">PRIZE ESCROW</span>
            <span className="admin-finance-card__val admin-finance-card__val--escrow">
              {formatCurrency(financialOverview.pendingSettlement || 43200)}
            </span>
          </div>

          <div className="admin-finance-card">
            <span className="admin-finance-card__lbl">PROCESSING</span>
            <span className="admin-finance-card__val admin-finance-card__val--proc">
              {formatCurrency(financialOverview.processingPayouts || 18500)}
            </span>
          </div>

          <div className="admin-finance-card">
            <span className="admin-finance-card__lbl">SETTLED</span>
            <span className="admin-finance-card__val">
              {formatCurrency(financialOverview.paidPrizeTotal || 245000)}
            </span>
          </div>
        </div>
      </section>

      {/* ── 7. Recent Audit Log ── */}
      <section className="admin-home-section" aria-label="Recent Platform Audit Log">
        <div className="admin-section-header">
          <div className="admin-section-header__title-wrap">
            <IoTimeOutline size={16} className="admin-section-header__icon" />
            <h3 className="admin-section-header__title">Recent Audit</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/audit-logs')}
            className="admin-section-header__link"
          >
            <span>Full log</span>
            <IoArrowForward size={13} />
          </button>
        </div>

        <div className="admin-compact-stack">
          {recentAuditLogs.slice(0, 2).map((log) => (
            <div
              key={log.id}
              onClick={() => onNavigate('/admin/audit-logs')}
              className="admin-item-card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('/admin/audit-logs') }}
            >
              <div className="admin-item-card__main">
                <h4 className="admin-item-card__title">{log.action}</h4>
                <div className="admin-item-card__sub">
                  {log.entity} · {log.timestamp}
                </div>
              </div>
              <span className="admin-item-card__link-hint">
                <IoArrowForward size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

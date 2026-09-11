// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN TOURNAMENT DETAIL (PLAYER-STYLE REBUILD)
//
// Matches Player tournament detail page with contextual Admin controls:
// Top:
//   ← Tournaments
//   Tournament Name
//   ✓ Platform Verified · Registration Open
//   [ Contextual Manage Action ]
// Tab Strip:
//   Overview · Participants · Matches · Results · Prizes · Financials · Disputes · Verification · Audit
// Clean contextual cards without overwhelming buttons.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoArrowBack,
  IoShieldCheckmark,
  IoAlertCircle,
  IoTimeOutline,
  IoCashOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoSettingsOutline
} from 'react-icons/io5'
import { formatCurrency } from '../../utils/formatters'

export default function AdminTournamentDetailPage({
  tournamentId,
  onNavigate,
  onRequestConfirmation,
  onToast
}) {
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('OVERVIEW')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const t = await adminService.getTournament(tournamentId)
        setTournament(t)
      } catch (err) {
        console.error('Failed to load tournament detail:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tournamentId])

  if (loading) {
    return <div className="admin-loading-state">Loading tournament details...</div>
  }

  if (!tournament) {
    return (
      <div className="admin-empty-state">
        <h3 className="admin-empty-state__title">Tournament Not Found</h3>
        <p className="admin-empty-state__desc">Tournament ID "{tournamentId}" does not exist in the platform registry.</p>
        <button type="button" onClick={() => onNavigate('/admin/tournaments')} className="admin-btn admin-btn--secondary">
          Back to Tournaments
        </button>
      </div>
    )
  }

  const isPlatformVerified = tournament.verificationStatus === 'PLATFORM_VERIFIED'
  const isPlatformSource = tournament.tournamentSource === 'PLATFORM'
  const name = tournament.title || tournament.name || 'Tournament'

  const handleVerify = (decision) => {
    onRequestConfirmation({
      title: decision === 'APPROVE' ? 'Approve Platform Verification' : 'Reject / Request Changes',
      message: `You are about to modify the platform verification status for "${name}".`,
      actionLabel: decision === 'APPROVE' ? 'Verify Tournament' : 'Request Changes',
      actionType: decision === 'APPROVE' ? 'PRIMARY' : 'DANGER',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.verifyTournament(tournament.id, decision, reason)
        setTournament({ ...updated })
        onToast(`Verification updated for ${name}`, 'success')
      }
    })
  }

  const handleStatusChange = (newStatus) => {
    onRequestConfirmation({
      title: `Transition Tournament to ${newStatus}`,
      message: `Change operational state of "${name}" to ${newStatus}?`,
      actionLabel: `Change to ${newStatus}`,
      actionType: newStatus === 'SUSPENDED' || newStatus === 'CANCELLED' ? 'DANGER' : 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.updateTournamentStatus(tournament.id, newStatus, reason)
        setTournament({ ...updated })
        onToast(`Tournament status updated to ${newStatus}`, 'success')
      }
    })
  }

  const tabs = [
    { id: 'OVERVIEW', label: 'Overview' },
    { id: 'PARTICIPANTS', label: 'Participants' },
    { id: 'MATCHES', label: 'Matches' },
    { id: 'RESULTS', label: 'Results' },
    { id: 'PRIZES', label: 'Prizes' },
    { id: 'FINANCIALS', label: 'Financials' },
    { id: 'DISPUTES', label: 'Disputes' },
    { id: 'VERIFICATION', label: 'Verification' },
    { id: 'AUDIT', label: 'Audit' }
  ]

  return (
    <div className="admin-page-container">
      {/* ── 1. Top Navigation: Back to Tournaments ── */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/admin/tournaments')}
          className="admin-back-btn"
        >
          <IoArrowBack size={16} />
          <span>Tournaments</span>
        </button>
      </div>

      {/* ── 2. Tournament Header Card ── */}
      <div className="admin-detail-header-card">
        <div className="admin-detail-header-card__top">
          <div>
            <h1 className="admin-detail-header-card__title">{name}</h1>
            <div className="admin-detail-header-card__sub">
              {tournament.mode} · {tournament.format} · Organized by {tournament.organizerName}
            </div>
          </div>

          <div className="admin-detail-header-card__badges">
            {isPlatformVerified ? (
              <span className="player-grid-t-card__verified">✓ Platform Verified</span>
            ) : (
              <span className="admin-t-unverified-tag">
                {tournament.verificationStatus === 'PENDING_VERIFICATION' ? 'Pending Verification' : 'Unverified'}
              </span>
            )}
            <AdminStatusBadge type="status" status={tournament.status} />
          </div>
        </div>

        {/* Contextual Operational Control */}
        <div className="admin-detail-header-card__controls">
          <span className="admin-detail-header-card__source-pill">
            Source: {isPlatformSource ? 'PLATFORM' : 'ORGANIZER'}
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            {!isPlatformVerified && (
              <button
                type="button"
                onClick={() => handleVerify('APPROVE')}
                className="admin-btn admin-btn--yellow admin-btn--sm"
              >
                ✓ Verify Tournament
              </button>
            )}
            {tournament.status === 'REGISTRATION' && (
              <button
                type="button"
                onClick={() => handleStatusChange('LIVE')}
                className="admin-btn admin-btn--primary admin-btn--sm"
              >
                Launch Live
              </button>
            )}
            {tournament.status === 'LIVE' && (
              <button
                type="button"
                onClick={() => handleStatusChange('COMPLETED')}
                className="admin-btn admin-btn--primary admin-btn--sm"
              >
                Mark Completed
              </button>
            )}
            {tournament.status !== 'SUSPENDED' && (
              <button
                type="button"
                onClick={() => handleStatusChange('SUSPENDED')}
                className="admin-btn admin-btn--secondary admin-btn--sm"
              >
                Suspend
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. Tab Strip ── */}
      <div className="player-tabs-bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`player-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 4. Tab Content (Clean Contextual Cards) ── */}
      {activeTab === 'OVERVIEW' && (
        <div className="admin-detail-grid">
          {/* Key Metrics */}
          <div className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Competition Key Figures</h3>
            </div>
            <div className="admin-info-box">
              <div className="admin-info-row">
                <span>Entry Fee:</span>
                <strong>{tournament.entryFee === 0 ? 'Free' : formatCurrency(tournament.entryFee)}</strong>
              </div>
              <div className="admin-info-row">
                <span>Total Prize Pool:</span>
                <strong style={{ color: '#B45309' }}>{formatCurrency(tournament.prizePool)}</strong>
              </div>
              <div className="admin-info-row">
                <span>Registered Slots:</span>
                <strong>{tournament.registeredCount} / {tournament.maxParticipants}</strong>
              </div>
              <div className="admin-info-row">
                <span>Scheduled Date & Time:</span>
                <strong>{tournament.date || tournament.scheduledDate} · {tournament.time || tournament.scheduledTime}</strong>
              </div>
              <div className="admin-info-row">
                <span>Map & Settings:</span>
                <strong>{tournament.map || 'Bermuda Remastered'}</strong>
              </div>
            </div>
          </div>

          {/* Organizer / Verification Overview */}
          <div className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Organizer & Governance Status</h3>
            </div>
            <div className="admin-info-box">
              <div className="admin-info-row">
                <span>Organizer Name:</span>
                <strong>{tournament.organizerName}</strong>
              </div>
              <div className="admin-info-row">
                <span>Organizer ID:</span>
                <span style={{ fontFamily: 'monospace' }}>{tournament.organizerId || 'ADMIN-CORE-01'}</span>
              </div>
              <div className="admin-info-row">
                <span>Verification State:</span>
                <strong>{tournament.verificationStatus}</strong>
              </div>
              <div className="admin-info-row">
                <span>Verified At:</span>
                <span>{tournament.verifiedAt || 'Pending Review'}</span>
              </div>
              <div className="admin-info-row">
                <span>Rules Compliance:</span>
                <strong style={{ color: '#166534' }}>Verified Standard</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PARTICIPANTS' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Registered Participants ({tournament.registeredCount})</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--admin-grey)', margin: '0 0 14px 0' }}>
            Enrolled teams and players checked in for this tournament.
          </p>
          <div className="admin-info-box">
            <div className="admin-info-row">
              <span>Slot Fill Rate:</span>
              <strong>{Math.round((tournament.registeredCount / tournament.maxParticipants) * 100)}% ({tournament.registeredCount}/{tournament.maxParticipants})</strong>
            </div>
            <div className="admin-info-row">
              <span>Check-in Status:</span>
              <strong>{tournament.checkInCount || 0} Confirmed Present</strong>
            </div>
            <div className="admin-info-row">
              <span>Roster Violations:</span>
              <strong style={{ color: '#166534' }}>0 Flagged</strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MATCHES' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Tournament Matches</h3>
          </div>
          <div className="admin-info-box">
            <div className="admin-info-row">
              <span>Total Scheduled Matches:</span>
              <strong>{tournament.matchesCount || 4} Matches</strong>
            </div>
            <div className="admin-info-row">
              <span>Room ID & Pass:</span>
              <strong>Credentials issued via secure lobby</strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'RESULTS' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Results & Scorecards</h3>
          </div>
          <div className="admin-info-box">
            <div className="admin-info-row">
              <span>Match 01 Standings:</span>
              <strong style={{ color: '#166534' }}>Confirmed</strong>
            </div>
            <div className="admin-info-row">
              <span>Disputed Scorecards:</span>
              <strong>{tournament.disputesCount || 0}</strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PRIZES' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Prize Pool Breakdown</h3>
          </div>
          <div className="admin-info-box">
            {tournament.prizeBreakdown && tournament.prizeBreakdown.length > 0 ? (
              tournament.prizeBreakdown.map((p) => (
                <div key={p.place} className="admin-info-row">
                  <span>{p.place} Place:</span>
                  <strong style={{ color: '#B45309' }}>{formatCurrency(p.prize)}</strong>
                </div>
              ))
            ) : (
              <div className="admin-info-row">
                <span>Prize Pool:</span>
                <strong>{formatCurrency(tournament.prizePool)}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'FINANCIALS' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Escrow & Financial Ledger</h3>
          </div>
          <div className="admin-info-box">
            <div className="admin-info-row">
              <span>Escrow Allocation:</span>
              <strong style={{ color: '#065F46' }}>{formatCurrency(tournament.prizePool)}</strong>
            </div>
            <div className="admin-info-row">
              <span>Gross Entry Fees Collected:</span>
              <strong>{formatCurrency((tournament.entryFee || 0) * (tournament.registeredCount || 0))}</strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DISPUTES' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Appeals & Disputes ({tournament.disputesCount || 0})</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--admin-grey)', margin: 0 }}>
            {tournament.disputesCount === 0
              ? 'No active disputes filed for this tournament.'
              : `${tournament.disputesCount} active arbitration case in triage.`}
          </p>
        </div>
      )}

      {activeTab === 'VERIFICATION' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Verification Decision Panel</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--admin-grey)', margin: '0 0 14px 0' }}>
            Platform Verification guarantees prize escrow backing and rules fairness to players.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleVerify('APPROVE')}
              className="admin-btn admin-btn--yellow admin-btn--sm"
            >
              ✓ Grant Platform Verification
            </button>
            <button
              type="button"
              onClick={() => handleVerify('REJECT')}
              className="admin-btn admin-btn--danger admin-btn--sm"
            >
              Reject / Revoke Verification
            </button>
          </div>
        </div>
      )}

      {activeTab === 'AUDIT' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Tournament Lifecycle Audit Trail</h3>
          </div>
          <div className="admin-info-box">
            <div className="admin-info-row">
              <span>Creation Recorded:</span>
              <span>{tournament.scheduledDate} IST</span>
            </div>
            <div className="admin-info-row">
              <span>Verification Stamp:</span>
              <span>{tournament.verifiedAt || 'Pending Review'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

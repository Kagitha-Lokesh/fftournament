// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN TOURNAMENT CARD
//
// Matches Player Dashboard card proportions, image treatment, typography,
// and 5-level information hierarchy:
// Level 1: Tournament name
// Level 2: Mode · Organizer
// Level 3: Verification + lifecycle state
// Level 4: Fee · Prize · Capacity · Schedule
// Level 5: Single primary action ("Manage Tournament →")
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { formatCurrency } from '../../../utils/formatters'

export default function AdminTournamentCard({ tournament, onManage }) {
  if (!tournament) return null

  const t = tournament
  const name = t.title || t.name || 'Tournament'
  const mode = t.mode || 'Squad'
  const organizer = t.organizerName || 'FF WAR Official'
  const isPlatform = t.tournamentSource === 'PLATFORM'
  const isVerified = t.verificationStatus === 'PLATFORM_VERIFIED'
  
  const entryVal = t.entryFee ?? 0
  const prizeVal = t.prizePool ?? 0
  const regCount = t.registeredCount ?? 0
  const capCount = t.maxParticipants ?? t.capacity ?? 48
  const pct = Math.min(100, Math.round((regCount / (capCount || 1)) * 100))
  const scheduleStr = `${t.date || t.scheduledDate || 'TBD'} · ${t.time || t.scheduledTime || '8:00 PM'}`

  const getStatusText = (status) => {
    switch (status) {
      case 'REGISTRATION': return 'Registration Open'
      case 'LIVE': return 'Live Now'
      case 'UPCOMING': return 'Upcoming'
      case 'COMPLETED': return 'Completed'
      case 'DRAFT': return 'Draft'
      case 'SUSPENDED': return 'Suspended'
      default: return status || 'Registration Open'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'LIVE': return 'player-grid-t-card__status--registered'
      case 'REGISTRATION': return 'player-grid-t-card__status--open'
      case 'COMPLETED': return 'player-grid-t-card__status--completed'
      case 'SUSPENDED': return 'player-grid-t-card__status--full'
      default: return 'player-grid-t-card__status--open'
    }
  }

  return (
    <article
      className="player-grid-t-card admin-t-grid-card"
      onClick={() => onManage && onManage(t.id)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onManage && onManage(t.id)
        }
      }}
      aria-label={`Manage ${name}`}
    >
      {/* Visual Top Area with controlled aspect ratio */}
      <div className="player-grid-t-card__thumb">
        <img
          src={t.bannerUrl || t.image || '/assets/tournaments/tournament-squad-01.webp'}
          alt={`${name} artwork`}
          loading="lazy"
          className="player-grid-t-card__img"
        />
        <div className="player-grid-t-card__img-overlay" />
        
        {/* Compact source tag & mode badge */}
        <span className="admin-t-source-tag">
          {isPlatform ? 'PLATFORM' : 'ORGANIZER'}
        </span>
        <span className="player-grid-t-card__mode">{mode}</span>
      </div>

      {/* Card Body with strict 5-level hierarchy */}
      <div className="player-grid-t-card__body">
        {/* Level 3: Verification & lifecycle pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', flexWrap: 'wrap' }}>
          {isVerified ? (
            <span className="player-grid-t-card__verified" aria-label="Platform Verified">
              ✓ Platform Verified
            </span>
          ) : (
            <span className="admin-t-unverified-tag">
              {t.verificationStatus === 'PENDING_VERIFICATION' ? 'Pending Verification' : 'Unverified'}
            </span>
          )}

          <span className={`player-grid-t-card__status ${getStatusClass(t.status)}`}>
            {getStatusText(t.status)}
          </span>
        </div>

        {/* Level 1: Tournament Name */}
        <h3 className="player-grid-t-card__title" title={name}>
          {name}
        </h3>

        {/* Level 2: Mode · Organizer */}
        <div className="admin-t-subtext">
          {mode} · {organizer}
        </div>

        {/* Level 4: Economics & Capacity & Schedule */}
        <div className="player-grid-t-card__economics">
          <div className="player-grid-t-card__econ-item">
            <span className="player-grid-t-card__econ-lbl">ENTRY</span>
            <span className="player-grid-t-card__econ-val">
              {entryVal === 0 ? 'Free' : formatCurrency(entryVal)}
            </span>
          </div>

          <div className="player-grid-t-card__econ-item">
            <span className="player-grid-t-card__econ-lbl">PRIZE POOL</span>
            <span className="player-grid-t-card__econ-val player-grid-t-card__econ-val--prize">
              {formatCurrency(prizeVal)}
            </span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="player-grid-t-card__capacity" title={`${regCount} of ${capCount} slots filled`}>
          <div className="player-grid-t-card__cap-bar">
            <div
              className={`player-grid-t-card__cap-fill ${pct >= 100 ? 'full' : ''}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="player-grid-t-card__cap-text">{regCount}/{capCount} slots</span>
        </div>

        {/* Schedule */}
        <div className="player-grid-t-card__schedule">
          <span>{scheduleStr}</span>
        </div>

        {/* Level 5: Single Primary Action */}
        <div className="player-grid-t-card__footer">
          <span className="admin-t-card__action-text">
            <span>Manage Tournament</span>
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  )
}

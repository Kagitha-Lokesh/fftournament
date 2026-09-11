// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER TOURNAMENT HERO (DYNAMIC OPERATIONAL BANNER)
//
// Answers: "What tournament matters right now, and what needs my attention?"
// Follows strict priority order:
// LIVE_NOW -> RESULTS_PENDING -> UP_NEXT -> NEXT_TO_RUN -> READY_TO_RUN (EMPTY)
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react'
import {
  IoTimeOutline,
  IoArrowForwardOutline,
  IoRadioOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoAddCircleOutline,
} from 'react-icons/io5'
import { formatCurrency } from '../../../utils/formatters'

function useCountdown(startsInMinutes) {
  const [targetTime] = useState(() => {
    if (typeof startsInMinutes === 'number' && !isNaN(startsInMinutes) && startsInMinutes > 0) {
      return Date.now() + startsInMinutes * 60 * 1000
    }
    return null
  })

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!targetTime) return null
    return Math.max(0, Math.floor((targetTime - Date.now()) / 1000))
  })

  useEffect(() => {
    if (!targetTime) return
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  return useMemo(() => {
    if (!timeLeft) return null
    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
  }, [timeLeft])
}

export default function OrganizerTournamentHero({ hero, onNavigate }) {
  if (!hero) return null

  const { type, eyebrow, title, subtitle, meta, primaryAction, tournament, description } = hero
  const countdown = useCountdown(tournament?.startsInMinutes)

  const isLive = type === 'LIVE_NOW'
  const isResultsReview = type === 'RESULTS_NEED_REVIEW'
  const isUpNext = type === 'UP_NEXT'
  const isEmpty = type === 'NO_TOURNAMENTS'

  const image =
    tournament?.image ||
    (tournament?.mode === 'Solo'
      ? '/assets/tournaments/tournament-solo-01.webp'
      : tournament?.mode === 'Duo'
      ? '/assets/tournaments/tournament-duo-01.webp'
      : '/assets/tournaments/tournament-squad-01.webp')

  return (
    <section className="org-hero" aria-label="Current operational tournament">
      {/* Upper Cinematic Image with Overlay (When tournament exists) */}
      {!isEmpty ? (
        <div className="org-hero__img-wrap">
          <img src={image} alt={title} className="org-hero__img" loading="eager" />
          <div className="org-hero__overlay" />
          <span className="org-hero__mode-badge">{tournament?.mode || 'SQUAD'}</span>
        </div>
      ) : (
        <div className="org-hero__empty-banner">
          <IoAddCircleOutline size={28} color="#F4C400" />
        </div>
      )}

      {/* Information & Action Content */}
      <div className="org-hero__content">
        {/* Eyebrow and Status / Live Pill */}
        <div className="org-hero__tag-row">
          <span
            className={`org-hero__eyebrow ${
              isLive ? 'org-hero__eyebrow--live' : isResultsReview ? 'org-hero__eyebrow--review' : ''
            }`}
          >
            {eyebrow}
          </span>

          {isLive && (
            <span className="org-hero__live-pill">
              <IoRadioOutline size={13} />
              LIVE MATCH IN PROGRESS
            </span>
          )}

          {isUpNext && countdown && (
            <div className="org-hero__countdown-box" title="Countdown to scheduled start">
              <IoTimeOutline size={13} />
              <span>Starts in {countdown}</span>
            </div>
          )}

          {isResultsReview && (
            <span className="org-hero__alert-pill">
              <IoAlertCircleOutline size={13} />
              ACTION REQUIRED
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="org-hero__title">{title}</h2>

        {/* Subtitle / Details */}
        {subtitle && <div className="org-hero__subtitle">{subtitle}</div>}

        {/* Meta summary */}
        {meta && (
          <div className="org-hero__meta">
            <span>{meta}</span>
            {tournament?.entryFee !== undefined && (
              <>
                <span className="player-bullet">•</span>
                <span>
                  {tournament.entryFee === 0 ? 'Free Entry' : `₹${tournament.entryFee} entry`} ·{' '}
                  {formatCurrency(tournament.prizePool || 0)} prize pool
                </span>
              </>
            )}
          </div>
        )}

        {description && <p className="org-hero__desc">{description}</p>}

        {/* Footer Actions */}
        <div className="org-hero__footer">
          <div className="org-hero__status-text">
            {isLive ? (
              <span className="text-danger">● Room code distributed · Players in match</span>
            ) : isUpNext ? (
              <span className="text-warning">● Check-in preparation window active</span>
            ) : isResultsReview ? (
              <span className="text-warning">● Score verification pending submission</span>
            ) : (
              <span>Automated room setup & check-in management</span>
            )}
          </div>

          {primaryAction && (
            <button
              onClick={() => onNavigate(primaryAction.route)}
              className="btn btn--primary org-hero__btn"
            >
              <span>{primaryAction.label}</span>
              <IoArrowForwardOutline size={14} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

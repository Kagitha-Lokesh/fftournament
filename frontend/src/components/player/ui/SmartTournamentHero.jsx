import React, { useState, useEffect, useMemo } from 'react'
import {
  IoTimeOutline,
  IoArrowForwardOutline,
  IoRadioOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5'
import { formatCurrency } from '../../../utils/formatters'

// Dynamic countdown hook calculating time from actual startsInMinutes or schedule
function useMatchCountdown(startsInMinutes, status) {
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
    if (status === 'LIVE' || (timeLeft !== null && timeLeft <= 0)) {
      return { isLive: true, clock: '00h 00m 00s', text: 'Live Now' }
    }
    if (timeLeft === null) {
      return { isLive: false, clock: null, text: 'Starts Soon' }
    }

    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60

    const pad = (n) => String(n).padStart(2, '0')
    const clock = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`

    let text = ''
    if (hours >= 24) {
      text = 'Starts tomorrow'
    } else if (hours > 0) {
      text = `Starts in ${hours}h ${minutes}m`
    } else {
      text = `Starts in ${minutes}m ${seconds}s`
    }

    return { isLive: false, clock, text, hours, minutes, seconds }
  }, [timeLeft, status])
}

export default function SmartTournamentHero({
  hero,
  onNavigate,
  onOpenCheckIn,
  onOpenDetails,
}) {
  if (!hero || !hero.tournament) return null

  const { tournament, type, isRegistered, checkInStatus } = hero

  const countdown = useMatchCountdown(
    hero?.startsInMinutes ?? 42,
    tournament?.status || tournament?.tournamentStatus
  )

  const isStateA = type === 'REGISTERED_UPCOMING'
  const isCheckInOpen = checkInStatus === 'OPEN'
  const isCheckInConfirmed = checkInStatus === 'CONFIRMED'
  const isLive = countdown?.isLive || tournament?.status === 'LIVE'

  const title = tournament?.tournamentName || tournament?.name || 'Free Fire Tournament'
  const mode = tournament?.mode || 'SQUAD'
  const image = tournament?.image || '/assets/tournaments/tournament-squad-01.webp'

  const dateStr = tournament?.date || hero?.date || 'Today'
  const timeStr = tournament?.time || tournament?.startTime || hero?.time || hero?.startTime || '8:00 PM'

  return (
    <section
      className={`player-smart-hero ${
        isStateA ? 'player-smart-hero--registered' : 'player-smart-hero--discover'
      }`}
      aria-label={isStateA ? 'Your next tournament' : 'Featured tournament recommendation'}
    >
      {/* Upper Cinematic Image with Mode Badge */}
      <div className="player-smart-hero__img-wrap">
        <img
          src={image}
          alt={`${title} banner`}
          className="player-smart-hero__img"
          loading="eager"
        />
        <div className="player-smart-hero__overlay" />
        <span className="player-smart-hero__mode-badge">{mode}</span>
      </div>

      {/* Information Area */}
      <div className="player-smart-hero__content">
        {/* Tag Row: Eyebrow + Countdown/Live Pill */}
        <div className="player-smart-hero__tag-row">
          <span
            className={`player-smart-hero__eyebrow ${
              isStateA ? 'player-smart-hero__eyebrow--next' : 'player-smart-hero__eyebrow--featured'
            }`}
          >
            {isStateA ? 'NEXT UP' : 'FEATURED NEXT TO PLAY'}
          </span>

          {isStateA ? (
            isLive ? (
              <span className="player-smart-hero__live-pill">
                <IoRadioOutline size={13} className="pulse-icon" />
                LIVE NOW
              </span>
            ) : (
              <div className="player-smart-hero__countdown-box" title="Dynamic match countdown">
                <IoTimeOutline size={13} />
                <span className="player-smart-hero__clock">
                  {countdown.clock || countdown.text}
                </span>
              </div>
            )
          ) : (
            hero.verified && (
              <span className="t-card__verified" aria-label="Verified organizer">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5 L4.2 7.5 L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Verified Organizer
              </span>
            )
          )}
        </div>

        {/* Tournament Name */}
        <h2 className="player-smart-hero__title">{title}</h2>

        {/* Metadata */}
        <div className="player-smart-hero__meta">
          {isStateA ? (
            <>
              <span>{mode} · {tournament.matchNumber || 'Match 04'}</span>
              <span className="player-bullet">•</span>
              <span>{dateStr} · {timeStr}</span>
            </>
          ) : (
            <>
              <span>{formatCurrency(tournament.entry || 0)} entry · {formatCurrency(tournament.prize || 0)} prize pool</span>
              <span className="player-bullet">•</span>
              <span>{dateStr} · {timeStr}</span>
            </>
          )}
        </div>

        {/* Footer with Status and Primary CTA */}
        <div className="player-smart-hero__footer">
          <div className="player-smart-hero__status">
            {isStateA ? (
              isCheckInOpen ? (
                <span className="player-smart-hero__status-text player-smart-hero__status-text--open">
                  ● CHECK-IN OPEN
                </span>
              ) : isCheckInConfirmed ? (
                <span className="player-smart-hero__status-text player-smart-hero__status-text--confirmed">
                  <IoCheckmarkCircleOutline size={15} /> Check-in confirmed
                </span>
              ) : isLive ? (
                <span className="player-smart-hero__status-text player-smart-hero__status-text--live">
                  ● Match in progress
                </span>
              ) : (
                <span className="player-smart-hero__status-text">
                  Registered
                </span>
              )
            ) : (
              <span className="player-smart-hero__status-text player-smart-hero__status-text--open">
                REGISTRATION OPEN
              </span>
            )}
          </div>

          <div className="player-smart-hero__cta-wrap">
            {isStateA ? (
              isCheckInOpen ? (
                <button
                  onClick={() => {
                    if (onOpenCheckIn) {
                      onOpenCheckIn(tournament)
                    } else {
                      onNavigate('/player/matches')
                    }
                  }}
                  className="btn btn--primary player-smart-hero__btn"
                >
                  <span>Check In</span>
                  <IoArrowForwardOutline size={14} />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('/player/matches')}
                  className="btn btn--primary player-smart-hero__btn"
                >
                  <span>View Match</span>
                  <IoArrowForwardOutline size={14} />
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  if (onOpenDetails) {
                    onOpenDetails(tournament)
                  } else {
                    onNavigate('/player/tournaments')
                  }
                }}
                className="btn btn--primary player-smart-hero__btn"
              >
                <span>View Tournament</span>
                <IoArrowForwardOutline size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

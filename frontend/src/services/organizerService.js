// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER SERVICE (API ABSTRACTION LAYER)
//
// In production, each function makes authenticated requests to the backend.
// For prototyping and frontend UX testing, this service simulates network latency
// and serves typed operational data from organizerData.js.
// ──────────────────────────────────────────────────────────────────────────────

import {
  DEMO_BOUNDARY_NOTICE,
  DEMO_ORGANIZER,
  DEMO_ORGANIZER_TOURNAMENTS,
  DEMO_OPERATIONAL_SUMMARY,
  DEMO_NEEDS_ATTENTION,
  DEMO_PARTICIPANTS,
  DEMO_ORGANIZER_MATCHES,
  DEMO_ORGANIZER_RESULTS,
  DEMO_ORGANIZER_EARNINGS,
  DEMO_ORGANIZER_PAYOUTS,
  DEMO_ORGANIZER_DISPUTES,
  DEMO_ORGANIZER_NOTIFICATIONS,
  DEMO_NEW_ORGANIZER_STATE,
} from '../data/organizerData'

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory state for mutations during active demo session
let dynamicTournaments = [...DEMO_ORGANIZER_TOURNAMENTS]
let dynamicResults = [...DEMO_ORGANIZER_RESULTS]
let dynamicPayouts = [...DEMO_ORGANIZER_PAYOUTS]

export function normalizeOrganizerTournament(t) {
  if (!t) return null
  const mode = t.mode || 'Squad'
  const fallbackImg =
    mode === 'Solo'
      ? '/assets/tournaments/tournament-solo-01.webp'
      : mode === 'Duo'
      ? '/assets/tournaments/tournament-duo-01.webp'
      : '/assets/tournaments/tournament-squad-01.webp'

  const date = t.date || 'TBD'
  const time = t.time || t.startTime || '8:00 PM'
  const startTime = t.startTime || time

  return {
    ...t,
    id: t.id || `org_t_${Math.random().toString(36).substring(2, 9)}`,
    name: t.name || 'Free Fire Tournament',
    mode,
    image: t.image || fallbackImg,
    entryFee: t.entryFee ?? 0,
    prizePool: t.prizePool ?? 0,
    registeredCount: t.registeredCount ?? 0,
    capacity: t.capacity ?? 48,
    checkedInCount: t.checkedInCount ?? 0,
    date,
    time,
    startTime,
    schedule: {
      date,
      time,
      startTime,
      ...(t.schedule || {}),
    },
    status: t.status || 'Draft',
  }
}

export function selectOrganizerHero(tournaments = [], demoMode = 'ACTIVE') {
  if (demoMode === 'EMPTY' || tournaments.length === 0) {
    return {
      type: 'NO_TOURNAMENTS',
      eyebrow: 'READY TO RUN YOUR NEXT TOURNAMENT?',
      title: 'Create and publish your next competition',
      description: 'Configure tournament rules, registration fees, and prize structures with automated player check-in.',
      primaryAction: {
        label: 'Create Tournament',
        route: '/organizer/tournaments/new',
      },
      tournament: null,
    }
  }

  // Priority 1: LIVE NOW tournament match
  const liveTourney = tournaments.find((t) => t.status === 'Live' || t.operationalState === 'LIVE_NOW')
  if (liveTourney) {
    return {
      type: 'LIVE_NOW',
      eyebrow: 'LIVE NOW',
      title: liveTourney.name,
      subtitle: `${liveTourney.mode} · Match in progress`,
      meta: `${liveTourney.checkedInCount || liveTourney.registeredCount} players active in room`,
      status: 'Live',
      primaryAction: {
        label: 'Manage Live Match',
        route: '/organizer/matches',
      },
      tournament: liveTourney,
    }
  }

  // Priority 2: RESULTS NEED REVIEW
  const resultsPendingTourney = tournaments.find(
    (t) => t.status === 'Results Pending' || t.operationalState === 'RESULTS_PENDING'
  )
  if (resultsPendingTourney) {
    return {
      type: 'RESULTS_NEED_REVIEW',
      eyebrow: 'RESULTS NEED REVIEW',
      title: resultsPendingTourney.name,
      subtitle: `${resultsPendingTourney.mode} · Concluded ${resultsPendingTourney.date}`,
      meta: 'Scoreboard and placement proofs awaiting review and confirmation',
      status: 'Results Pending',
      primaryAction: {
        label: 'Review Results',
        route: '/organizer/results',
      },
      tournament: resultsPendingTourney,
    }
  }

  // Priority 3: UP NEXT (Check-in active or approaching start)
  const upNextTourney = tournaments.find(
    (t) => t.status === 'Check-in' || t.operationalState === 'UP_NEXT'
  )
  if (upNextTourney) {
    return {
      type: 'UP_NEXT',
      eyebrow: 'UP NEXT',
      title: upNextTourney.name,
      subtitle: `${upNextTourney.mode} · ${upNextTourney.date} · ${upNextTourney.time}`,
      meta: `${upNextTourney.checkedInCount || 0} of ${upNextTourney.capacity} players checked in`,
      startsInMinutes: upNextTourney.startsInMinutes || 41,
      status: 'Check-in',
      primaryAction: {
        label: 'Open Tournament Room',
        route: '/organizer/matches',
      },
      tournament: upNextTourney,
    }
  }

  // Priority 4: NEXT TO RUN (Active registration open)
  const regTourney = tournaments.find((t) => t.status === 'Registration Open')
  if (regTourney) {
    return {
      type: 'NEXT_TO_RUN',
      eyebrow: 'NEXT TO RUN',
      title: regTourney.name,
      subtitle: `${regTourney.mode} · ${regTourney.date} · ${regTourney.time}`,
      meta: `${regTourney.registeredCount} / ${regTourney.capacity} slots filled · Registration Open`,
      status: 'Registration Open',
      primaryAction: {
        label: 'Manage Tournament',
        route: '/organizer/tournaments',
      },
      tournament: regTourney,
    }
  }

  // Fallback: earliest tournament
  const first = tournaments[0]
  return {
    type: 'UPCOMING_TOURNAMENT',
    eyebrow: 'UPCOMING TOURNAMENT',
    title: first.name,
    subtitle: `${first.mode} · ${first.date} · ${first.time}`,
    meta: `${first.registeredCount} / ${first.capacity} participants registered`,
    status: first.status,
    primaryAction: {
      label: 'View Tournament',
      route: '/organizer/tournaments',
    },
    tournament: first,
  }
}

export const organizerService = {
  getEnvironmentNotice() {
    return DEMO_BOUNDARY_NOTICE
  },

  async getOrganizerDashboard(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') {
      return {
        organizer: DEMO_NEW_ORGANIZER_STATE.organizer,
        tournaments: [],
        operationalSummary: DEMO_NEW_ORGANIZER_STATE.operationalSummary,
        needsAttention: [],
        upcomingMatches: [],
        pendingResults: [],
        earnings: DEMO_NEW_ORGANIZER_STATE.earnings,
        notifications: DEMO_NEW_ORGANIZER_STATE.notifications,
      }
    }

    const tournaments = dynamicTournaments.map(normalizeOrganizerTournament)
    return {
      organizer: DEMO_ORGANIZER,
      tournaments,
      operationalSummary: {
        activeTournaments: tournaments.filter((t) => t.status !== 'Completed' && t.status !== 'Draft').length,
        totalParticipants: tournaments.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0),
        upcomingMatches: DEMO_ORGANIZER_MATCHES.filter((m) => m.status !== 'COMPLETED').length,
        pendingResults: dynamicResults.filter((r) => r.status !== 'Finalized').length,
      },
      needsAttention: DEMO_NEEDS_ATTENTION,
      upcomingMatches: DEMO_ORGANIZER_MATCHES.slice(0, 2),
      pendingResults: dynamicResults.slice(0, 2),
      earnings: DEMO_ORGANIZER_EARNINGS,
      notifications: DEMO_ORGANIZER_NOTIFICATIONS,
    }
  },

  async getOrganizerTournaments(filter = 'all', demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []

    const list = dynamicTournaments.map(normalizeOrganizerTournament)
    if (filter === 'active') {
      return list.filter((t) => t.status === 'Registration Open' || t.status === 'Check-in' || t.status === 'Live')
    }
    if (filter === 'registration') {
      return list.filter((t) => t.status === 'Registration Open')
    }
    if (filter === 'draft') {
      return list.filter((t) => t.status === 'Draft')
    }
    if (filter === 'completed') {
      return list.filter((t) => t.status === 'Completed' || t.status === 'Settled')
    }
    return list
  },

  async getTournament(id) {
    await delay(80)
    const found = dynamicTournaments.find((t) => t.id === id)
    return found ? normalizeOrganizerTournament(found) : null
  },

  async createTournament(formData) {
    await delay(400)
    const isDraft = formData.isDraft || formData.status === 'Draft'
    const newTourney = normalizeOrganizerTournament({
      id: `org_t_${Date.now()}`,
      name: formData.name || 'New Free Fire Tournament',
      mode: formData.mode || 'Squad',
      format: formData.format || 'Battle Royale · 12 Teams',
      status: isDraft ? 'Draft' : 'Registration Open',
      operationalState: isDraft ? 'DRAFT' : 'NEXT_TO_RUN',
      date: formData.date || 'TBD',
      time: formData.time || '8:00 PM',
      startTime: formData.time || '8:00 PM',
      entryFee: Number(formData.entryFee) || 0,
      prizePool: Number(formData.prizePool) || 0,
      registeredCount: 0,
      capacity: Number(formData.capacity) || 48,
      checkedInCount: 0,
      scoringType: formData.scoringType || 'Placement + Kills (1 pt/kill)',
      rulesSummary: formData.rules || 'Standard FF War fair play rules enforce verified UIDs.',
    })

    dynamicTournaments.unshift(newTourney)
    return {
      success: true,
      tournament: newTourney,
      message: isDraft ? 'Draft saved successfully.' : 'Tournament published and open for registrations!',
    }
  },

  async getParticipants(tournamentId = 'all', query = '', statusFilter = 'all', demoMode = 'ACTIVE') {
    await delay(120)
    if (demoMode === 'EMPTY') return []

    let list = [...DEMO_PARTICIPANTS]
    if (tournamentId && tournamentId !== 'all') {
      list = list.filter((p) => p.tournamentId === tournamentId)
    }
    if (statusFilter && statusFilter !== 'all') {
      list = list.filter((p) => p.checkInStatus === statusFilter || p.rosterStatus === statusFilter)
    }
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.teamName.toLowerCase().includes(q) ||
          p.captainIgn.toLowerCase().includes(q) ||
          p.slotNumber.toLowerCase().includes(q)
      )
    }
    return list
  },

  async getMatches(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return DEMO_ORGANIZER_MATCHES
  },

  async getResults(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return dynamicResults
  },

  async submitMatchResults(matchId, scoreboardData) {
    await delay(350)
    const updated = {
      id: `res_sub_${Date.now()}`,
      matchId,
      tournamentName: 'Solo Ranked Cup — Week 15',
      matchNumber: 'Match 01 (Solo Finals)',
      date: 'Today',
      mode: 'Solo',
      status: 'Submitted', // Submitted to Platform Review (Organizer cannot unilaterally declare Finalized)
      submittedAt: 'Just now',
      submittedBy: `${DEMO_ORGANIZER.name} (Organizer Submission)`,
      scoreboard: scoreboardData,
    }

    dynamicResults = [updated, ...dynamicResults]
    return {
      success: true,
      result: updated,
      message: 'Scores submitted for platform verification. Results now in Under Review state.',
    }
  },

  async getEarnings(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return DEMO_NEW_ORGANIZER_STATE.earnings
    return DEMO_ORGANIZER_EARNINGS
  },

  async getPayouts(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return dynamicPayouts
  },

  async requestPayout(amount, upiId) {
    await delay(400)
    const newPayout = {
      id: `payout_${Date.now()}`,
      date: 'Today',
      amount: Number(amount),
      status: 'Processing', // Requested -> Processing
      destination: `UPI: ${upiId}`,
      reference: `PAY_FFW_${Math.floor(10000 + Math.random() * 90000)}`,
      completionDate: 'Estimated within 24h bank settlement window',
    }
    dynamicPayouts = [newPayout, ...dynamicPayouts]
    return {
      success: true,
      payout: newPayout,
      message: 'Payout request received. Queued in automated settlement batch.',
    }
  },

  async getDisputes(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return DEMO_ORGANIZER_DISPUTES
  },

  async submitDisputeEvidence(disputeId, evidenceNote) {
    await delay(300)
    return {
      success: true,
      disputeId,
      message: 'Evidence and referee remarks forwarded to Platform Arbiter.',
    }
  },

  async getNotifications(demoMode = 'ACTIVE') {
    await delay(80)
    if (demoMode === 'EMPTY') return DEMO_NEW_ORGANIZER_STATE.notifications
    return DEMO_ORGANIZER_NOTIFICATIONS
  },

  async getOrganizerProfile(demoMode = 'ACTIVE') {
    await delay(80)
    if (demoMode === 'EMPTY') return DEMO_NEW_ORGANIZER_STATE.organizer
    return DEMO_ORGANIZER
  },
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — PLAYER SERVICE (API ABSTRACTION LAYER)
//
// In production, each function here makes authenticated HTTP/gRPC requests
// to the backend API. For prototyping and frontend verification, this service
// simulates network latency and serves structured data from playerData.js.
// ──────────────────────────────────────────────────────────────────────────────

import {
  DEMO_BOUNDARY_NOTICE,
  DEMO_PLAYER,
  DEMO_NEXT_MATCH,
  DEMO_ACTION_REQUIRED,
  DEMO_MY_TOURNAMENTS,
  DEMO_RECENT_RESULTS,
  DEMO_CAREER_METRICS,
  DEMO_WALLET,
  DEMO_PRIZES,
  DEMO_TEAM,
  DEMO_DISPUTES,
  DEMO_NOTIFICATIONS,
  DEMO_NEW_PLAYER_STATE,
} from '../data/playerData'

import { TOURNAMENTS } from '../data'

// Helper to simulate realistic network delay
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

// Safe tournament normalizer to prevent undefined errors (such as startTime)
export function normalizeTournament(t) {
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
    id: t.id || `t_${Math.random().toString(36).substring(2, 9)}`,
    name: t.name || t.tournamentName || 'Free Fire Tournament',
    tournamentName: t.tournamentName || t.name || 'Free Fire Tournament',
    mode,
    image: t.image || fallbackImg,
    entry: t.entry ?? t.entryFee ?? 0,
    entryFee: t.entryFee ?? t.entry ?? 0,
    prize: t.prize ?? t.prizePool ?? 0,
    prizePool: t.prizePool ?? t.prize ?? 0,
    registered: t.registered ?? t.registeredCount ?? 0,
    registeredCount: t.registeredCount ?? t.registered ?? 0,
    capacity: t.capacity ?? 48,
    verified: Boolean(t.verified ?? t.organizer_verified ?? false),
    organizer_verified: Boolean(t.organizer_verified ?? t.verified ?? false),
    organizer: t.organizer || 'FF War Official',
    date,
    time,
    startTime,
    schedule: {
      date,
      time,
      startTime,
      ...(t.schedule || {}),
    },
    status: t.status || t.tournament_status || 'Upcoming',
    tournament_status: t.tournament_status || t.status || 'Upcoming',
  }
}

// Safe match normalizer ensuring date, time, startTime and schedule are always defined
export function normalizeMatch(m) {
  if (!m) return null
  const date = m.date || 'TBD'
  const time = m.time || m.startTime || '8:00 PM'
  const startTime = m.startTime || time
  const name = m.name || m.tournamentName || 'Tournament Match'

  return {
    ...m,
    id: m.id || `m_${Math.random().toString(36).substring(2, 9)}`,
    name,
    tournamentName: name,
    mode: m.mode || 'Squad',
    matchNumber: m.matchNumber || 'Match 01',
    map: m.map || 'Bermuda',
    date,
    time,
    startTime,
    schedule: {
      date,
      time,
      startTime,
      ...(m.schedule || {}),
    },
    check_in_status: m.check_in_status || 'CONFIRMED',
    room_access_status: m.room_access_status || 'LOCKED',
  }
}

// Shared selector logic for Smart Tournament Hero between Home and Tournaments pages
export function selectSmartTournamentHero({
  nextMatch,
  myTournaments = [],
  discoverTournaments = [],
  demoMode = 'ACTIVE',
}) {
  if (demoMode === 'EMPTY') {
    const rawDiscover =
      (Array.isArray(discoverTournaments) && discoverTournaments[0]) ||
      (TOURNAMENTS && TOURNAMENTS[0]) ||
      null
    const discover = rawDiscover ? normalizeTournament(rawDiscover) : null
    return {
      type: 'FEATURED_DISCOVERY',
      eyebrow: 'FEATURED NEXT TO PLAY',
      tournament: discover,
      isRegistered: false,
      checkInStatus: null,
      startsInMinutes: null,
      startTime: discover?.startTime || discover?.time || '8:00 PM',
      date: discover?.date || 'Sat, 13 Sep',
      time: discover?.time || '8:00 PM',
      verified: Boolean(discover?.verified || discover?.organizer_verified),
    }
  }

  // 1. Registered upcoming match has highest priority
  if (
    nextMatch &&
    nextMatch.check_in_status !== 'COMPLETED' &&
    nextMatch.status !== 'COMPLETED'
  ) {
    const norm = normalizeMatch(nextMatch)
    if (norm) {
      return {
        type: 'REGISTERED_UPCOMING',
        eyebrow: 'NEXT UP',
        tournament: norm,
        isRegistered: true,
        checkInStatus: norm.check_in_status,
        startsInMinutes: norm.startsInMinutes ?? 42,
        startTime: norm.startTime || norm.time || '8:00 PM',
        date: norm.date || 'Today',
        time: norm.time || norm.startTime || '8:00 PM',
        verified: Boolean(norm.verified),
      }
    }
  }

  // 2. Active registered tournament from player's list
  const activeRegistered = Array.isArray(myTournaments)
    ? myTournaments.filter(
        (t) => t && t.status !== 'Completed' && t.registration_status !== 'COMPLETED'
      )
    : []

  if (activeRegistered.length > 0) {
    const earliest = normalizeTournament(activeRegistered[0])
    if (earliest) {
      return {
        type: 'REGISTERED_UPCOMING',
        eyebrow: 'NEXT UP',
        tournament: earliest,
        isRegistered: true,
        checkInStatus: earliest.check_in_status || 'CONFIRMED',
        startsInMinutes: earliest.startsInMinutes ?? 42,
        startTime: earliest.startTime || earliest.time || '8:00 PM',
        date: earliest.date || 'Today',
        time: earliest.time || earliest.startTime || '8:00 PM',
        verified: Boolean(earliest.verified),
      }
    }
  }

  // 3. Fallback: Discovery recommendation
  const rawDiscover =
    (Array.isArray(discoverTournaments) && discoverTournaments[0]) ||
    (TOURNAMENTS && TOURNAMENTS[0]) ||
    null
  const discover = rawDiscover ? normalizeTournament(rawDiscover) : null
  return {
    type: 'FEATURED_DISCOVERY',
    eyebrow: 'FEATURED NEXT TO PLAY',
    tournament: discover,
    isRegistered: false,
    checkInStatus: null,
    startsInMinutes: null,
    startTime: discover?.startTime || discover?.time || '8:00 PM',
    date: discover?.date || 'Sat, 13 Sep',
    time: discover?.time || '8:00 PM',
    verified: Boolean(discover?.verified || discover?.organizer_verified),
  }
}

export const playerService = {
  // Check if active session is in demo mode
  getEnvironmentNotice() {
    return DEMO_BOUNDARY_NOTICE
  },

  // Fetch consolidated dashboard home view
  async getPlayerDashboard(demoMode = 'ACTIVE') {
    await delay(100)

    if (demoMode === 'EMPTY') {
      return {
        player: DEMO_NEW_PLAYER_STATE.player,
        nextMatch: null,
        actionRequired: DEMO_NEW_PLAYER_STATE.actionRequired,
        myTournaments: [],
        recentResults: [],
        careerMetrics: DEMO_NEW_PLAYER_STATE.careerMetrics,
        wallet: DEMO_NEW_PLAYER_STATE.wallet,
        prizes: [],
        team: null,
        disputes: [],
        notifications: DEMO_NEW_PLAYER_STATE.notifications,
      }
    }

    return {
      player: DEMO_PLAYER,
      nextMatch: DEMO_NEXT_MATCH ? normalizeTournament(DEMO_NEXT_MATCH) : null,
      actionRequired: DEMO_ACTION_REQUIRED,
      myTournaments: DEMO_MY_TOURNAMENTS.map(normalizeTournament),
      recentResults: DEMO_RECENT_RESULTS,
      careerMetrics: DEMO_CAREER_METRICS,
      wallet: DEMO_WALLET,
      prizes: DEMO_PRIZES,
      team: DEMO_TEAM,
      disputes: DEMO_DISPUTES,
      notifications: DEMO_NOTIFICATIONS,
    }
  },

  // Tournaments list
  async getPlayerTournaments(tab = 'open', demoMode = 'ACTIVE') {
    await delay(120)
    if (demoMode === 'EMPTY') {
      return {
        discover: TOURNAMENTS.map(normalizeTournament),
        registered: [],
        completed: [],
      }
    }
    return {
      discover: TOURNAMENTS.map(normalizeTournament),
      registered: DEMO_MY_TOURNAMENTS.map(normalizeTournament),
      completed: [
        {
          id: 't_past_01',
          name: 'Weekend Squad Clash — S08',
          mode: 'Squad',
          image: '/assets/tournaments/tournament-squad-01.webp',
          organizer: 'BattleZone Esports',
          organizer_verified: true,
          date: '06 SEP 2026',
          time: '8:00 PM',
          result: '1st Place (Champion)',
          prize: 2500,
          status: 'Completed',
          team: 'Vortex Phantoms',
        },
        {
          id: 't_past_02',
          name: 'City Duos Showdown — Vol 4',
          mode: 'Duo',
          image: '/assets/tournaments/tournament-duo-01.webp',
          organizer: 'Apex Community India',
          organizer_verified: true,
          date: '31 AUG 2026',
          time: '6:00 PM',
          result: '3rd Place',
          prize: 600,
          status: 'Completed',
          team: 'Shadow & Ghost',
        },
      ].map(normalizeTournament),
    }
  },

  // Matches list
  async getMatches(demoMode = 'ACTIVE') {
    await delay(120)
    if (demoMode === 'EMPTY') {
      return { upcoming: [], live: [], completed: [] }
    }
    return {
      upcoming: [
        DEMO_NEXT_MATCH,
        {
          id: 'match_duo_02',
          tournamentId: 't2',
          tournamentName: 'City Duos Showdown',
          tournamentStatus: 'UPCOMING',
          mode: 'Duo',
          matchNumber: 'Qualifier B — Match 02',
          stage: 'Group Stage',
          map: 'Purgatory',
          date: 'SUN, 14 SEP',
          time: '6:00 PM',
          startsInMinutes: 1440,
          team: {
            id: 'team_shadow_ghost',
            name: 'Shadow & Ghost',
            slot: 'Slot #11',
            role: 'Fragger',
            captain: 'SHADOW_K',
          },
          check_in_status: 'NOT_OPEN',
          check_in_deadline: 'Opens SUN 5:30 PM',
          room_access_status: 'LOCKED',
          room_credentials: null,
        },
      ].map(normalizeMatch),
      live: [].map(normalizeMatch),
      completed: [
        {
          id: 'match_prev_01',
          tournamentName: 'Weekend Squad Clash — S08',
          matchNumber: 'Match 04 (Grand Finals)',
          date: '06 SEP 2026',
          mode: 'Squad',
          result: '#1 · 11 Kills',
          map: 'Bermuda',
          verified: true,
        },
      ].map(normalizeMatch),
    }
  },

  // Results list
  async getPlayerResults(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return DEMO_RECENT_RESULTS
  },

  // Career statistics
  async getCareerStats(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return DEMO_NEW_PLAYER_STATE.careerMetrics
    return DEMO_CAREER_METRICS
  },

  // Wallet
  async getWallet(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return DEMO_NEW_PLAYER_STATE.wallet
    return DEMO_WALLET
  },

  // Prizes
  async getPrizes(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return DEMO_PRIZES
  },

  // Teams
  async getTeamData(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return null
    return DEMO_TEAM
  },

  // Disputes
  async getDisputes(demoMode = 'ACTIVE') {
    await delay(100)
    if (demoMode === 'EMPTY') return []
    return DEMO_DISPUTES
  },

  // Notifications
  async getNotifications(demoMode = 'ACTIVE') {
    await delay(80)
    if (demoMode === 'EMPTY') return DEMO_NEW_PLAYER_STATE.notifications
    return DEMO_NOTIFICATIONS
  },

  // Profile
  async getPlayerProfile(demoMode = 'ACTIVE') {
    await delay(80)
    if (demoMode === 'EMPTY') return DEMO_NEW_PLAYER_STATE.player
    return DEMO_PLAYER
  },

  // Mutating Actions (Simulated)
  async performCheckIn(matchId) {
    await delay(300)
    return {
      success: true,
      matchId,
      check_in_status: 'CONFIRMED',
      message: 'Check-in confirmed. Your slot #03 is secured. Room credentials released.',
    }
  },

  async requestWithdrawal(amount, upiId) {
    await delay(400)
    return {
      success: true,
      amount,
      upiId,
      reference: `WD_${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'PROCESSING',
      message: 'Withdrawal request submitted. Transferred via automated settlement batch.',
    }
  },

  async submitDispute(disputeData) {
    await delay(400)
    return {
      success: true,
      caseId: `DSP-${Math.floor(3000 + Math.random() * 1000)}`,
      status: 'UNDER_REVIEW',
      message: 'Dispute submitted. FF War Arbiter team notified.',
    }
  },
}

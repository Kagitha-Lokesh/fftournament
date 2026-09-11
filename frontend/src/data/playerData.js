// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — CENTRALIZED DEMO DATA LAYER
//
// CRITICAL NOTICE:
// ALL RECORDS IN THIS FILE ARE DEMO DATA ONLY FOR PROTOTYPE DEVELOPMENT
// AND MUST NEVER BE PRESENTED AS REAL PRODUCTION RECORDS.
//
// In production:
// - All data MUST come directly from authenticated backend APIs.
// - Never infer, fabricate, or assume player, tournament, financial,
//   result, verification, payout, dispute, or credential information.
// - Room ID and password are sensitive match-access data and must ONLY be
//   provided by the server when check-in is confirmed and match time is reached.
// - Trust badges (Verified, Paid, Completed, etc.) must map to explicit backend states.
// ──────────────────────────────────────────────────────────────────────────────

export const DEMO_BOUNDARY_NOTICE = {
  isDemo: true,
  environment: 'DEMO / PROTOTYPE',
  disclaimer:
    'Demo data active. Real tournament, match, and financial data is loaded from authenticated backend APIs.',
}

export const DEMO_PLAYER = {
  id: 'usr_ffw_88219',
  ign: 'SHADOW_K',
  playerId: '#FFW-88219',
  freeFireUid: '5849302194',
  region: 'South Asia / India',
  email: 'shadow_k.compete@ffwar.gg',
  phoneMasked: '+91 ••••• ••894',
  avatarUrl: null, // Initials used if null
  profileCompleteness: 85,
  verification_status: 'VERIFIED', // VERIFIED | PENDING | UNVERIFIED
  account_status: 'ACTIVE',
  joinedDate: 'July 2025',
  role: 'Fragger',
  preferredMode: 'Squad',
  kyc_status: 'VERIFIED', // VERIFIED | IN_REVIEW | NOT_SUBMITTED
  reputation_score: 98,
}

export const DEMO_NEXT_MATCH = {
  id: 'match_sq_04',
  tournamentId: 't1',
  tournamentName: 'Weekend Squad Clash',
  tournamentStatus: 'LIVE_SOON', // UPCOMING | LIVE_SOON | LIVE | COMPLETED
  mode: 'Squad',
  matchNumber: 'Match 04',
  stage: 'Grand Finals — Round 1',
  map: 'Bermuda',
  date: 'SAT, 13 SEP',
  time: '8:00 PM',
  startsInMinutes: 42,
  team: {
    id: 'team_vortex_01',
    name: 'Vortex Phantoms',
    slot: 'Slot #03',
    role: 'Fragger',
    captain: 'APEX_ZERO',
  },
  // Server-authoritative check-in & room access fields
  check_in_status: 'OPEN', // NOT_OPEN | OPEN | CONFIRMED | CLOSED
  check_in_deadline: '7:45 PM (in 27m)',
  room_access_status: 'RELEASED', // LOCKED | RELEASING_SOON | RELEASED
  room_credentials: {
    // Sensitive match-access data: only populated when check_in_status === 'CONFIRMED' or during active demo
    roomId: '104592',
    roomPassword: 'ffwar',
    rulesNote: 'No emulator. Custom HUD allowed. Default gun attributes enabled.',
  },
}

export const DEMO_ACTION_REQUIRED = [
  {
    id: 'act_01',
    type: 'CHECK_IN_PENDING',
    title: 'Check-in Open for Weekend Squad Clash',
    description: 'Match starts at 8:00 PM. Check-in closes in 27 minutes.',
    actionLabel: 'Check In Now',
    actionRoute: '/player/matches',
    severity: 'warning',
    expiresAt: '7:45 PM',
  },
  {
    id: 'act_02',
    type: 'TEAM_CONFIRMATION',
    title: 'Roster Verification for City Duos Showdown',
    description: 'Confirm duo partner slot assignment before registration locks.',
    actionLabel: 'Review Roster',
    actionRoute: '/player/teams',
    severity: 'info',
    expiresAt: 'Tomorrow 2:00 PM',
  },
]

export const DEMO_MY_TOURNAMENTS = [
  {
    id: 't1',
    name: 'Weekend Squad Clash',
    mode: 'Squad',
    organizer: 'BattleZone Esports',
    organizer_verified: true,
    registration_status: 'CONFIRMED', // CONFIRMED | PENDING_PAYMENT | WAITLIST
    payment_status: 'PAID', // PAID | UNPAID | REFUNDED
    tournament_status: 'LIVE_SOON', // UPCOMING | REGISTRATION_OPEN | LIVE_SOON | IN_PROGRESS | COMPLETED
    date: 'SAT, 13 SEP',
    time: '8:00 PM',
    entryFee: 50,
    prizePool: 5000,
    registeredCount: 48,
    capacity: 48,
    team: 'Vortex Phantoms',
    nextMatchState: 'Check-in Open',
  },
  {
    id: 't2',
    name: 'City Duos Showdown',
    mode: 'Duo',
    organizer: 'Apex Community India',
    organizer_verified: true,
    registration_status: 'CONFIRMED',
    payment_status: 'PAID',
    tournament_status: 'REGISTRATION_OPEN',
    date: 'SUN, 14 SEP',
    time: '6:00 PM',
    entryFee: 30,
    prizePool: 2400,
    registeredCount: 36,
    capacity: 48,
    team: 'Shadow & Ghost',
    nextMatchState: 'Schedule Awaiting Lock',
  },
  {
    id: 't4',
    name: 'Community War — Season 3',
    mode: 'Squad',
    organizer: 'FF War Official',
    organizer_verified: true,
    registration_status: 'CONFIRMED',
    payment_status: 'PAID',
    tournament_status: 'UPCOMING',
    date: 'SAT, 20 SEP',
    time: '5:00 PM',
    entryFee: 100,
    prizePool: 12000,
    registeredCount: 40,
    capacity: 64,
    team: 'Vortex Phantoms',
    nextMatchState: 'Starts in 7 days',
  },
]

export const DEMO_RECENT_RESULTS = [
  {
    id: 'res_01',
    tournamentId: 't1_prev',
    tournamentName: 'Weekend Squad Clash — S08',
    date: '06 SEP 2026',
    placement: '#1',
    kills: 11,
    team: 'Vortex Phantoms',
    prizeAwarded: 2500,
    prizePaid: 2500,
    settlement_status: 'PAID', // PENDING_VERIFICATION | APPROVED | PROCESSING | PAID | DISPUTED
    verification_status: 'VERIFIED', // VERIFIED | PENDING_REVIEW | DISPUTED
    evidence_hash: 'sha256:4f8e9102c1ba627d3e...',
    totalPoints: 31,
  },
  {
    id: 'res_02',
    tournamentId: 't2_prev',
    tournamentName: 'City Duos Showdown — Vol 4',
    date: '31 AUG 2026',
    placement: '#3',
    kills: 7,
    team: 'Shadow & Ghost',
    prizeAwarded: 600,
    prizePaid: 600,
    settlement_status: 'PAID',
    verification_status: 'VERIFIED',
    evidence_hash: 'sha256:91a72cc33db4910e...',
    totalPoints: 19,
  },
  {
    id: 'res_03',
    tournamentId: 't3_prev',
    tournamentName: 'Community War — Season 2',
    date: '24 AUG 2026',
    placement: '#2',
    kills: 9,
    team: 'Vortex Phantoms',
    prizeAwarded: 1500,
    prizePaid: 0,
    settlement_status: 'PROCESSING', // Prize awarded but payout processing
    verification_status: 'VERIFIED',
    evidence_hash: 'sha256:7b21cc4150ef9182...',
    totalPoints: 24,
  },
  {
    id: 'res_04',
    tournamentId: 't4_prev',
    tournamentName: 'Solo Ranked Cup — Week 14',
    date: '17 AUG 2026',
    placement: '#6',
    kills: 4,
    team: 'Solo Entry',
    prizeAwarded: 0,
    prizePaid: 0,
    settlement_status: 'NONE',
    verification_status: 'VERIFIED',
    evidence_hash: 'sha256:1a82ee4189ac3401...',
    totalPoints: 10,
  },
]

export const DEMO_CAREER_METRICS = {
  tournaments: 27,
  matches: 42,
  wins: 8,
  top3: 14,
  kills: 187,
  earnings: 12500,
  kdRatio: 4.45,
  winRate: '29.6%',
  top3Rate: '51.8%',
  avgKillsPerMatch: 4.45,
  rank: '#04 Regional',
  placementDistribution: [
    { rank: '1st', count: 8, pct: 19 },
    { rank: '2nd', count: 4, pct: 10 },
    { rank: '3rd', count: 2, pct: 5 },
    { rank: 'Top 5', count: 12, pct: 28 },
    { rank: 'Below Top 5', count: 16, pct: 38 },
  ],
  recentForm: ['#1', '#3', '#2', '#6', '#1', '#4', '#2'],
}

export const DEMO_WALLET = {
  available_balance: 3450,
  pending_balance: 1500, // Pending settlement: Community War S2 prize
  lifetime_earnings: 12500,
  lifetime_entry_fees: 3100,
  status: 'ACTIVE',
  kyc_status: 'VERIFIED',
  payout_account: {
    type: 'UPI',
    id: 'shadow_k@oksbi',
    verified: true,
  },
  transactions: [
    {
      id: 'tx_9981',
      date: '06 SEP 2026',
      type: 'PRIZE_CREDIT',
      description: 'Prize payout — Weekend Squad Clash #1',
      amount: 2500,
      status: 'COMPLETED',
      reference: 'UPI/RR610934120',
    },
    {
      id: 'tx_9974',
      date: '05 SEP 2026',
      type: 'ENTRY_FEE',
      description: 'Registration entry — Weekend Squad Clash',
      amount: -50,
      status: 'COMPLETED',
      reference: 'ORD_FFW_8911',
    },
    {
      id: 'tx_9960',
      date: '31 AUG 2026',
      type: 'PRIZE_CREDIT',
      description: 'Prize payout — City Duos Showdown #3',
      amount: 600,
      status: 'COMPLETED',
      reference: 'UPI/RR501238910',
    },
    {
      id: 'tx_9941',
      date: '28 AUG 2026',
      type: 'WITHDRAWAL',
      description: 'Withdrawal to UPI (shadow_k@oksbi)',
      amount: -2000,
      status: 'COMPLETED',
      reference: 'WD_FFW_78912',
    },
    {
      id: 'tx_9920',
      date: '24 AUG 2026',
      type: 'PRIZE_CREDIT',
      description: 'Prize settlement — Community War S2 #2',
      amount: 1500,
      status: 'PENDING_SETTLEMENT', // In queue
      reference: 'SETTLE_Q_2481',
    },
  ],
}

export const DEMO_PRIZES = [
  {
    id: 'prz_01',
    tournament: 'Community War — Season 2',
    placement: '2nd Place',
    awardedAmount: 1500,
    paidAmount: 0,
    status: 'PROCESSING', // PENDING_VERIFICATION | APPROVED | PROCESSING | PAID | DISPUTED
    dateAwarded: '24 AUG 2026',
    estimatedSettlement: '14 SEP 2026',
    settlementNote: 'Organizer evidence verified. Platform payout batch in transit.',
  },
  {
    id: 'prz_02',
    tournament: 'Weekend Squad Clash — S08',
    placement: '1st Place (Champion)',
    awardedAmount: 2500,
    paidAmount: 2500,
    status: 'PAID',
    dateAwarded: '06 SEP 2026',
    settledDate: '06 SEP 2026',
    reference: 'UPI/RR610934120',
  },
  {
    id: 'prz_03',
    tournament: 'City Duos Showdown — Vol 4',
    placement: '3rd Place',
    awardedAmount: 600,
    paidAmount: 600,
    status: 'PAID',
    dateAwarded: '31 AUG 2026',
    settledDate: '31 AUG 2026',
    reference: 'UPI/RR501238910',
  },
  {
    id: 'prz_04',
    tournament: 'Summer Pro League Qualifier',
    placement: '1st Place',
    awardedAmount: 4000,
    paidAmount: 4000,
    status: 'PAID',
    dateAwarded: '12 JUL 2026',
    settledDate: '13 JUL 2026',
    reference: 'UPI/RR410091840',
  },
]

export const DEMO_TEAM = {
  id: 'team_vortex_01',
  name: 'Vortex Phantoms',
  tag: 'VTX',
  status: 'ACTIVE',
  captain: 'APEX_ZERO',
  createdDate: 'May 2026',
  membersCount: 4,
  maxMembers: 5,
  record: {
    matches: 34,
    wins: 11,
    winRate: '32.4%',
    tournamentsEntered: 18,
  },
  upcomingTournament: 'Weekend Squad Clash (Tonight, 8:00 PM)',
  roster: [
    {
      ign: 'APEX_ZERO',
      role: 'Captain & IGL',
      isCaptain: true,
      freeFireUid: '4910284719',
      status: 'READY',
      avatarUrl: null,
    },
    {
      ign: 'SHADOW_K',
      role: 'Fragger / Assault',
      isCaptain: false,
      isCurrentUser: true,
      freeFireUid: '5849302194',
      status: 'READY',
      avatarUrl: null,
    },
    {
      ign: 'RAZE_PRO',
      role: 'Rusher / Entry',
      isCaptain: false,
      freeFireUid: '3910482019',
      status: 'READY',
      avatarUrl: null,
    },
    {
      ign: 'VIPER_09',
      role: 'Sniper / Support',
      isCaptain: false,
      freeFireUid: '6810294821',
      status: 'CHECK_IN_PENDING',
      avatarUrl: null,
    },
  ],
  invitations: [
    {
      id: 'inv_01',
      teamName: 'Iron Syndicate',
      invitedBy: 'IRON_CLAD',
      roleOffered: 'Fragger',
      date: 'Yesterday',
      status: 'PENDING',
    },
  ],
}

export const DEMO_DISPUTES = [
  {
    id: 'dsp_3041',
    tournamentId: 't1_prev',
    tournamentName: 'Weekend Squad Clash — S08',
    matchNumber: 'Match 04 (Grand Finals)',
    issueType: 'KILL_COUNT_TALLY_MISMATCH',
    title: 'Squad Kill Points Discrepancy in Match 04',
    dateFiled: '07 SEP 2026, 11:20 AM',
    status: 'UNDER_REVIEW', // OPEN | UNDER_REVIEW | NEEDS_INFORMATION | RESOLVED
    lastUpdate: '2 hours ago by Platform Integrity Arbiter #04',
    evidenceUrl: 'Screenshot & Full Endscreen VOD Hash',
    timeline: [
      {
        time: '07 SEP 11:20 AM',
        author: 'SHADOW_K (You)',
        text: 'Submitted dispute: Endscreen scoreboard confirms 11 squad kills, sheet logged 9 kills.',
      },
      {
        time: '07 SEP 03:45 PM',
        author: 'Arbiter_Kiran (FF War Integrity)',
        text: 'Dispute assigned to senior referee. High-res endscreen evidence queued for verification.',
      },
      {
        time: 'Today 10:15 AM',
        author: 'Arbiter_Kiran (FF War Integrity)',
        text: 'Organizer contacted for raw match room log. Awaiting response within 12h window.',
      },
    ],
  },
  {
    id: 'dsp_2890',
    tournamentId: 't3_prev',
    tournamentName: 'Community War S2',
    matchNumber: 'Match 02',
    issueType: 'UNAUTHORIZED_SUBSTITUTION',
    title: 'Opponent Unregistered Player Inquiry',
    dateFiled: '25 AUG 2026',
    status: 'RESOLVED',
    lastUpdate: '26 AUG 2026',
    evidenceUrl: 'Lobby screenshot record',
    timeline: [
      {
        time: '25 AUG 09:30 PM',
        author: 'SHADOW_K (You)',
        text: 'Reported potential unverified player in Slot 08.',
      },
      {
        time: '26 AUG 01:10 PM',
        author: 'Integrity Desk',
        text: 'Player identity verified against emergency roster substitution form submitted prior to match start. Ruling: Substitution valid. Case resolved.',
      },
    ],
  },
]

export const DEMO_NOTIFICATIONS = [
  {
    id: 'notif_01',
    category: 'MATCH',
    title: 'Match check-in is now open',
    description: 'Weekend Squad Clash Match 04 check-in window is open. Closes in 27 minutes.',
    timestamp: '15m ago',
    unread: true,
    link: '/player/matches',
  },
  {
    id: 'notif_02',
    category: 'RESULT',
    title: 'Dispute status updated',
    description: 'Arbiter Kiran posted an update on Case #DSP-3041 (Weekend Squad Clash).',
    timestamp: '2h ago',
    unread: true,
    link: '/player/disputes',
  },
  {
    id: 'notif_03',
    category: 'PRIZE',
    title: 'Prize payout in transit',
    description: 'Settlement for Community War S2 (₹1,500) has moved to Processing state.',
    timestamp: 'Yesterday',
    unread: false,
    link: '/player/prizes',
  },
  {
    id: 'notif_04',
    category: 'TEAM',
    title: 'New squad invitation',
    description: 'Iron Syndicate invited you to join their roster as Fragger.',
    timestamp: '2 days ago',
    unread: false,
    link: '/player/teams',
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// EMPTY / NEW PLAYER STATE
// For testing realistic onboarding and zero-state UX
// ──────────────────────────────────────────────────────────────────────────────
export const DEMO_NEW_PLAYER_STATE = {
  player: {
    ...DEMO_PLAYER,
    ign: 'NEW_RECRUIT',
    playerId: '#FFW-99014',
    freeFireUid: '—',
    profileCompleteness: 35,
    verification_status: 'UNVERIFIED',
  },
  nextMatch: null,
  actionRequired: [
    {
      id: 'act_new_01',
      type: 'COMPLETE_PROFILE',
      title: 'Add your Free Fire UID',
      description: 'Your Free Fire in-game UID is required before joining verified tournaments.',
      actionLabel: 'Complete Profile',
      actionRoute: '/player/profile',
      severity: 'info',
    },
  ],
  myTournaments: [],
  recentResults: [],
  careerMetrics: {
    tournaments: 0,
    matches: 0,
    wins: 0,
    top3: 0,
    kills: 0,
    earnings: 0,
    kdRatio: 0,
    winRate: '0%',
    top3Rate: '0%',
    avgKillsPerMatch: 0,
    rank: 'Unranked',
    placementDistribution: [],
    recentForm: [],
  },
  wallet: {
    available_balance: 0,
    pending_balance: 0,
    lifetime_earnings: 0,
    lifetime_entry_fees: 0,
    status: 'ACTIVE',
    kyc_status: 'NOT_SUBMITTED',
    payout_account: null,
    transactions: [],
  },
  prizes: [],
  team: null,
  disputes: [],
  notifications: [
    {
      id: 'notif_welcome',
      category: 'SYSTEM',
      title: 'Welcome to FF WAR',
      description: 'Find a tournament, build your squad, and start recording your competitive history.',
      timestamp: 'Just now',
      unread: true,
      link: '/player/tournaments',
    },
  ],
}

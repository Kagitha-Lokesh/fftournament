// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN CENTRALIZED DEMO DATA FIXTURES
//
// Authoritative demonstration data for the Admin Dashboard (Platform Super-Role).
// In strict accordance with platform security rules:
// - All records are synthetic demo objects.
// - No real KYC, bank details, UPI IDs, private phone numbers, or room passwords.
// - Features unified tournament entities with source & verification tracking.
// ──────────────────────────────────────────────────────────────────────────────

export const INITIAL_ADMIN_PROFILE = {
  id: 'ADMIN-CORE-01',
  name: 'Aravind Swaminathan',
  gamertag: 'ARAVIND_GOV',
  role: 'ADMIN',
  superRole: true,
  email: 'admin.governance@ffwar.internal',
  phoneMasked: '+91 98XXX XXX12',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  verificationStatus: 'VERIFIED',
  isDemoAccount: true,
  permissions: [
    'PLATFORM_GOVERNANCE',
    'TOURNAMENT_CREATE_OPERATE',
    'TOURNAMENT_VERIFY_OVERRIDE',
    'USER_MANAGEMENT',
    'ORGANIZER_VERIFICATION',
    'RESULT_INTEGRITY_AUDIT',
    'DISPUTE_ARBITRATION',
    'FINANCIAL_LEDGER_ACCESS',
    'PAYOUT_AUTHORIZATION',
    'INTEGRITY_FLAG_RESOLUTION',
    'SYSTEM_AUDIT_LOG_READ'
  ],
  security: {
    twoFactorEnabled: true,
    lastLogin: 'Today, 20:45 IST',
    sessionExpiresIn: '5h 15m',
    activeSessionsCount: 1
  }
}

export const INITIAL_PLATFORM_SUMMARY = {
  activeTournaments: 6,
  registeredPlayers: 1420,
  pendingReviews: 5,
  pendingPayouts: 3,
  settledPrizePool: 245000,
  platformHealth: 'OPERATIONAL_NORMAL',
  activeDisputes: 2,
  flaggedAccounts: 1
}

export const INITIAL_ATTENTION_ITEMS = [
  {
    id: 'ATTN-01',
    category: 'RESULTS_REVIEW',
    title: 'Results Awaiting Platform Review',
    subtitle: 'Weekend Squad Clash — Match 04 (Grand Final)',
    submittedBy: 'Nexus Esports (Organizer)',
    timestamp: '18 minutes ago',
    severity: 'HIGH',
    actionText: 'Review Results',
    route: '/admin/results',
    entityId: 'RES-WSC-04'
  },
  {
    id: 'ATTN-02',
    category: 'ORGANIZER_VERIFICATION',
    title: 'New Organizer Application',
    subtitle: 'Delta Tourneys — Submitted institutional documents & past tournament proof',
    submittedBy: 'delta_tourneys',
    timestamp: '2 hours ago',
    severity: 'MEDIUM',
    actionText: 'Review Organizer',
    route: '/admin/organizers',
    entityId: 'ORG-DELTA-01'
  },
  {
    id: 'ATTN-03',
    category: 'DISPUTE_ESCALATION',
    title: 'Dispute Under Review: Scorecard Discrepancy',
    subtitle: 'Case #DISP-882 · Team Crimson vs Team Havoc · Placement Kill Mismatch',
    submittedBy: 'Kavya_R (Player)',
    timestamp: '3 hours ago',
    severity: 'HIGH',
    actionText: 'Open Dispute',
    route: '/admin/disputes',
    entityId: 'DISP-882'
  },
  {
    id: 'ATTN-04',
    category: 'PAYOUT_AUTHORIZATION',
    title: 'Pending Prize Disbursement',
    subtitle: 'Req #PAY-419 · ₹12,000 to Squad Titan (Weekend Battle Royale 1st Place)',
    submittedBy: 'Finance Queue',
    timestamp: '4 hours ago',
    severity: 'MEDIUM',
    actionText: 'Inspect Payout',
    route: '/admin/payouts',
    entityId: 'PAY-419'
  },
  {
    id: 'ATTN-05',
    category: 'INTEGRITY_FLAG',
    title: 'Potential Result Inconsistency',
    subtitle: 'Solo Ranked Cup — Flag #INT-104: 17 kills reported by unseeded contender',
    submittedBy: 'Integrity Sentinel',
    timestamp: '5 hours ago',
    severity: 'MEDIUM',
    actionText: 'Inspect Flag',
    route: '/admin/integrity',
    entityId: 'INT-104'
  }
]

export const INITIAL_ADMIN_TOURNAMENTS = [
  {
    id: 'T-PLAT-001',
    title: 'FF WAR National Championship — Stage 1',
    subtitle: 'Official platform-managed national qualifier',
    mode: 'Squad',
    format: 'Battle Royale',
    tournamentSource: 'PLATFORM',
    createdBy: 'ADMIN',
    organizerName: 'FF WAR Official',
    organizerId: 'ADMIN-CORE-01',
    verificationStatus: 'PLATFORM_VERIFIED',
    visibility: 'PUBLIC',
    status: 'REGISTRATION',
    entryFee: 100,
    prizePool: 25000,
    maxParticipants: 48,
    registeredCount: 36,
    checkInCount: 0,
    scheduledDate: '2026-09-14',
    scheduledTime: '19:00 IST',
    date: '14 Sep',
    time: '7:00 PM',
    startTime: '7:00 PM',
    map: 'Bermuda Remastered',
    matchesCount: 4,
    disputesCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    rules: 'Official Free Fire competitive settings. Emulators strictly prohibited. Room ID released 15m prior.',
    prizeBreakdown: [
      { place: '1st', prize: 12000 },
      { place: '2nd', prize: 7000 },
      { place: '3rd', prize: 4000 },
      { place: '4th', prize: 2000 }
    ],
    verifiedAt: '2026-09-10T10:00:00Z',
    verifiedBy: 'ADMIN-CORE-01'
  },
  {
    id: 'T-ORG-002',
    title: 'Weekend Squad Clash — Week 24',
    subtitle: 'High-octane regional squad cup',
    mode: 'Squad',
    format: 'Battle Royale',
    tournamentSource: 'ORGANIZER',
    createdBy: 'ORGANIZER',
    organizerName: 'Nexus Esports',
    organizerId: 'ORG-NEXUS-01',
    verificationStatus: 'PLATFORM_VERIFIED',
    visibility: 'PUBLIC',
    status: 'LIVE',
    entryFee: 50,
    prizePool: 5000,
    maxParticipants: 48,
    registeredCount: 48,
    checkInCount: 48,
    scheduledDate: '2026-09-11',
    scheduledTime: '20:00 IST',
    date: 'Today',
    time: '8:00 PM',
    startTime: '8:00 PM',
    map: 'Purgatory',
    matchesCount: 3,
    disputesCount: 1,
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    rules: 'No character skill restrictions. Gun attributes deactivated. Point system: 1 kill = 1 pt, Booyah = 12 pts.',
    prizeBreakdown: [
      { place: '1st', prize: 2500 },
      { place: '2nd', prize: 1500 },
      { place: '3rd', prize: 1000 }
    ],
    verifiedAt: '2026-09-08T14:30:00Z',
    verifiedBy: 'ADMIN-CORE-01'
  },
  {
    id: 'T-ORG-003',
    title: 'Solo Ranked Cup — Season 4',
    subtitle: 'Individual survivor clash for regional bragging rights',
    mode: 'Solo',
    format: 'Clash Squad',
    tournamentSource: 'ORGANIZER',
    createdBy: 'ORGANIZER',
    organizerName: 'Apex Tourneys',
    organizerId: 'ORG-APEX-02',
    verificationStatus: 'PENDING_VERIFICATION',
    visibility: 'PUBLIC',
    status: 'RESULTS_PENDING',
    entryFee: 30,
    prizePool: 3000,
    maxParticipants: 48,
    registeredCount: 48,
    checkInCount: 46,
    scheduledDate: '2026-09-11',
    scheduledTime: '18:30 IST',
    date: 'Today',
    time: '6:30 PM',
    startTime: '6:30 PM',
    map: 'Kalahari',
    matchesCount: 2,
    disputesCount: 1,
    bannerUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    rules: 'Standard clash squad weapon buy limits. No grenade spamming in round 1.',
    prizeBreakdown: [
      { place: '1st', prize: 1800 },
      { place: '2nd', prize: 800 },
      { place: '3rd', prize: 400 }
    ],
    verifiedAt: null,
    verifiedBy: null
  },
  {
    id: 'T-PLAT-004',
    title: 'Duo Masters Weekly — Sunday Rumble',
    subtitle: 'Platform sanctioned duo series with guaranteed prize payout',
    mode: 'Duo',
    format: 'Battle Royale',
    tournamentSource: 'PLATFORM',
    createdBy: 'ADMIN',
    organizerName: 'FF WAR Official',
    organizerId: 'ADMIN-CORE-01',
    verificationStatus: 'PLATFORM_VERIFIED',
    visibility: 'PUBLIC',
    status: 'UPCOMING',
    entryFee: 40,
    prizePool: 6000,
    maxParticipants: 48,
    registeredCount: 18,
    checkInCount: 0,
    scheduledDate: '2026-09-13',
    scheduledTime: '17:00 IST',
    date: '13 Sep',
    time: '5:00 PM',
    startTime: '5:00 PM',
    map: 'Alpine',
    matchesCount: 3,
    disputesCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80',
    rules: 'Fair play code enforced. Minimum account level 35.',
    prizeBreakdown: [
      { place: '1st', prize: 3200 },
      { place: '2nd', prize: 1800 },
      { place: '3rd', prize: 1000 }
    ],
    verifiedAt: '2026-09-09T11:00:00Z',
    verifiedBy: 'ADMIN-CORE-01'
  },
  {
    id: 'T-ORG-005',
    title: 'Midnight Blitz 4v4 Invitational',
    subtitle: 'Underground night matches operated by Phoenix Guild',
    mode: 'Squad',
    format: 'Clash Squad',
    tournamentSource: 'ORGANIZER',
    createdBy: 'ORGANIZER',
    organizerName: 'Phoenix Guild',
    organizerId: 'ORG-PHOENIX-03',
    verificationStatus: 'NOT_VERIFIED',
    visibility: 'UNLISTED',
    status: 'DRAFT',
    entryFee: 150,
    prizePool: 15000,
    maxParticipants: 16,
    registeredCount: 8,
    checkInCount: 0,
    scheduledDate: '2026-09-16',
    scheduledTime: '23:30 IST',
    date: '16 Sep',
    time: '11:30 PM',
    startTime: '11:30 PM',
    map: 'Bermuda',
    matchesCount: 4,
    disputesCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    rules: 'Invitational only. Awaiting platform verification for public listing.',
    prizeBreakdown: [
      { place: '1st', prize: 10000 },
      { place: '2nd', prize: 5000 }
    ],
    verifiedAt: null,
    verifiedBy: null
  },
  {
    id: 'T-ORG-006',
    title: 'Monsoon Clash Season Finale',
    subtitle: 'Completed flagship seasonal championship',
    mode: 'Squad',
    format: 'Battle Royale',
    tournamentSource: 'ORGANIZER',
    createdBy: 'ORGANIZER',
    organizerName: 'Nexus Esports',
    organizerId: 'ORG-NEXUS-01',
    verificationStatus: 'PLATFORM_VERIFIED',
    visibility: 'PUBLIC',
    status: 'COMPLETED',
    entryFee: 100,
    prizePool: 30000,
    maxParticipants: 48,
    registeredCount: 48,
    checkInCount: 48,
    scheduledDate: '2026-09-04',
    scheduledTime: '19:00 IST',
    date: '04 Sep',
    time: '7:00 PM',
    startTime: '7:00 PM',
    map: 'Bermuda Remastered',
    matchesCount: 5,
    disputesCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    rules: 'Concluded. Prizes disbursed to registered team captains.',
    prizeBreakdown: [
      { place: '1st', prize: 16000 },
      { place: '2nd', prize: 8000 },
      { place: '3rd', prize: 4000 },
      { place: '4th', prize: 2000 }
    ],
    verifiedAt: '2026-09-01T12:00:00Z',
    verifiedBy: 'ADMIN-CORE-01'
  }
]

export const INITIAL_USERS = [
  {
    id: 'USR-PLY-101',
    ign: 'SHADOW_K',
    playerUid: 'FF-IN-892401',
    email: 'karthik.s@demo.local',
    role: 'PLAYER',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    joinedDate: '2026-06-14',
    tournamentsPlayed: 14,
    careerWins: 4,
    totalEarnings: 8450,
    disputesReported: 1,
    reputationScore: 98,
    auditNotes: 'Clean competitive history. 1 resolved dispute (awarded 2 missing points).'
  },
  {
    id: 'USR-PLY-102',
    ign: 'VIPER_99',
    playerUid: 'FF-IN-731994',
    email: 'rohit.v@demo.local',
    role: 'PLAYER',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    joinedDate: '2026-07-02',
    tournamentsPlayed: 9,
    careerWins: 2,
    totalEarnings: 3200,
    disputesReported: 0,
    reputationScore: 96,
    auditNotes: 'No disciplinary records.'
  },
  {
    id: 'USR-PLY-103',
    ign: 'KAVYA_SNIPES',
    playerUid: 'FF-IN-614002',
    email: 'kavya.r@demo.local',
    role: 'PLAYER',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    joinedDate: '2026-05-20',
    tournamentsPlayed: 21,
    careerWins: 6,
    totalEarnings: 14500,
    disputesReported: 2,
    reputationScore: 99,
    auditNotes: 'Top regional sniper. Active in Weekend Squad Clash.'
  },
  {
    id: 'USR-PLY-104',
    ign: 'GHOST_DEVIL',
    playerUid: 'FF-IN-908123',
    email: 'dev.g@demo.local',
    role: 'PLAYER',
    status: 'RESTRICTED',
    verificationStatus: 'PENDING_VERIFICATION',
    joinedDate: '2026-08-30',
    tournamentsPlayed: 2,
    careerWins: 1,
    totalEarnings: 1200,
    disputesReported: 1,
    reputationScore: 72,
    auditNotes: 'Under review for potential duplicate account linkage (Flag #INT-104).'
  },
  {
    id: 'USR-ORG-201',
    ign: 'NexusAdmin',
    playerUid: 'FF-ORG-0001',
    email: 'contact@nexusesports.internal',
    role: 'ORGANIZER',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    joinedDate: '2026-04-10',
    tournamentsPlayed: 0,
    careerWins: 0,
    totalEarnings: 28000,
    disputesReported: 0,
    reputationScore: 99,
    auditNotes: 'Lead regional organizer. 18 successful tournaments executed.'
  },
  {
    id: 'USR-ORG-202',
    ign: 'ApexHost',
    playerUid: 'FF-ORG-0002',
    email: 'tourneys@apex.internal',
    role: 'ORGANIZER',
    status: 'ACTIVE',
    verificationStatus: 'PENDING_VERIFICATION',
    joinedDate: '2026-08-15',
    tournamentsPlayed: 0,
    careerWins: 0,
    totalEarnings: 4500,
    disputesReported: 1,
    reputationScore: 88,
    auditNotes: 'Organizer verification documents under platform review.'
  },
  {
    id: 'USR-ADM-001',
    ign: 'ARAVIND_GOV',
    playerUid: 'FF-ADM-0001',
    email: 'admin.governance@ffwar.internal',
    role: 'ADMIN',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    joinedDate: '2026-01-01',
    tournamentsPlayed: 0,
    careerWins: 0,
    totalEarnings: 0,
    disputesReported: 0,
    reputationScore: 100,
    auditNotes: 'Platform Founding Super-Administrator.'
  }
]

export const INITIAL_ORGANIZERS = [
  {
    id: 'ORG-NEXUS-01',
    name: 'Nexus Esports',
    handle: '@nexus_esports',
    primaryContact: 'Rohit K. (Demo Representative)',
    verificationStatus: 'VERIFIED',
    standing: 'EXCELLENT',
    tournamentsTotal: 18,
    tournamentsActive: 1,
    totalPrizePoolDisbursed: 145000,
    activeDisputes: 0,
    reputationScore: 99,
    verifiedAt: '2026-05-01T09:00:00Z',
    verifiedBy: 'ADMIN-CORE-01',
    submittedDocuments: ['Govt Registration (Synthetic)', 'Pan ID (Masked)', 'Tournament Escrow Agreement']
  },
  {
    id: 'ORG-APEX-02',
    name: 'Apex Tourneys',
    handle: '@apex_tourneys',
    primaryContact: 'Sumanth B. (Demo Representative)',
    verificationStatus: 'PENDING_VERIFICATION',
    standing: 'UNDER_REVIEW',
    tournamentsTotal: 3,
    tournamentsActive: 1,
    totalPrizePoolDisbursed: 12000,
    activeDisputes: 1,
    reputationScore: 88,
    verifiedAt: null,
    verifiedBy: null,
    submittedDocuments: ['College Club Authorization', 'Host ID (Masked)']
  },
  {
    id: 'ORG-DELTA-01',
    name: 'Delta Tourneys',
    handle: '@delta_tourneys',
    primaryContact: 'Vikas N. (Demo Representative)',
    verificationStatus: 'PENDING_VERIFICATION',
    standing: 'NEW_APPLICANT',
    tournamentsTotal: 0,
    tournamentsActive: 0,
    totalPrizePoolDisbursed: 0,
    activeDisputes: 0,
    reputationScore: 85,
    verifiedAt: null,
    verifiedBy: null,
    submittedDocuments: ['Esports Association Affiliation', 'Bank Authorization Verification']
  },
  {
    id: 'ORG-PHOENIX-03',
    name: 'Phoenix Guild',
    handle: '@phoenix_guild',
    primaryContact: 'Tarun M. (Demo Representative)',
    verificationStatus: 'NOT_SUBMITTED',
    standing: 'STANDARD',
    tournamentsTotal: 1,
    tournamentsActive: 1,
    totalPrizePoolDisbursed: 0,
    activeDisputes: 0,
    reputationScore: 80,
    verifiedAt: null,
    verifiedBy: null,
    submittedDocuments: []
  }
]

export const INITIAL_RESULTS_QUEUE = [
  {
    id: 'RES-WSC-04',
    tournamentId: 'T-ORG-002',
    tournamentTitle: 'Weekend Squad Clash — Week 24',
    matchNumber: 4,
    stage: 'Grand Final',
    lifecycleStatus: 'SUBMITTED',
    submittedAt: 'Today, 20:25 IST',
    submittedBy: 'Nexus Esports',
    totalTeams: 12,
    hasDispute: false,
    scoreboard: [
      { rank: 1, team: 'Titan Squad', kills: 14, placementPts: 12, killPts: 14, totalPts: 26 },
      { rank: 2, team: 'Crimson Elite', kills: 9, placementPts: 9, killPts: 9, totalPts: 18 },
      { rank: 3, team: 'Viper Strike', kills: 7, placementPts: 8, killPts: 7, totalPts: 15 },
      { rank: 4, team: 'Ghost Legion', kills: 5, placementPts: 7, killPts: 5, totalPts: 12 }
    ],
    evidenceMediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    organizerNotes: 'Complete scoreboard screenshot verified. No disconnects reported.'
  },
  {
    id: 'RES-SRC-02',
    tournamentId: 'T-ORG-003',
    tournamentTitle: 'Solo Ranked Cup — Season 4',
    matchNumber: 2,
    stage: 'Semi-Final B',
    lifecycleStatus: 'UNDER_REVIEW',
    submittedAt: 'Today, 19:15 IST',
    submittedBy: 'Apex Tourneys',
    totalTeams: 12,
    hasDispute: true,
    scoreboard: [
      { rank: 1, team: 'SHADOW_K', kills: 8, placementPts: 12, killPts: 8, totalPts: 20 },
      { rank: 2, team: 'GHOST_DEVIL', kills: 17, placementPts: 9, killPts: 17, totalPts: 26 },
      { rank: 3, team: 'VIPER_99', kills: 5, placementPts: 8, killPts: 5, totalPts: 13 }
    ],
    evidenceMediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    organizerNotes: 'Flagged for kill count discrepancy on Rank 2 player. Requires Arbiter inspection.'
  },
  {
    id: 'RES-NAT-01',
    tournamentId: 'T-PLAT-001',
    tournamentTitle: 'FF WAR National Championship — Stage 1',
    matchNumber: 1,
    stage: 'Opening Round',
    lifecycleStatus: 'CONFIRMED',
    submittedAt: 'Yesterday, 21:00 IST',
    submittedBy: 'FF WAR Platform Operations',
    totalTeams: 12,
    hasDispute: false,
    scoreboard: [
      { rank: 1, team: 'Phoenix Rising', kills: 11, placementPts: 12, killPts: 11, totalPts: 23 },
      { rank: 2, team: 'Dragon Slayers', kills: 8, placementPts: 9, killPts: 8, totalPts: 17 },
      { rank: 3, team: 'Blaze Force', kills: 6, placementPts: 8, killPts: 6, totalPts: 14 }
    ],
    evidenceMediaUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    organizerNotes: 'Platform automated OCR verified with game room log.'
  },
  {
    id: 'RES-MSC-05',
    tournamentId: 'T-ORG-006',
    tournamentTitle: 'Monsoon Clash Season Finale',
    matchNumber: 5,
    stage: 'Championship Decider',
    lifecycleStatus: 'FINALIZED',
    submittedAt: '2026-09-04T21:40:00Z',
    submittedBy: 'Nexus Esports',
    totalTeams: 12,
    hasDispute: false,
    scoreboard: [
      { rank: 1, team: 'Titan Squad', kills: 16, placementPts: 12, killPts: 16, totalPts: 28 },
      { rank: 2, team: 'Crimson Elite', kills: 10, placementPts: 9, killPts: 10, totalPts: 19 }
    ],
    evidenceMediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    organizerNotes: 'Prizes successfully disbursed. Competitive record locked.'
  }
]

export const INITIAL_DISPUTES = [
  {
    id: 'DISP-882',
    tournamentId: 'T-ORG-003',
    tournamentTitle: 'Solo Ranked Cup — Season 4',
    matchId: 'M-SRC-02',
    reporterName: 'SHADOW_K',
    reporterRole: 'PLAYER',
    targetPlayer: 'GHOST_DEVIL',
    reason: 'Kill count anomaly & room spectator report',
    details: 'Opponent recorded 17 kills in 9 minutes while spectating showed 8 eliminations in lobby kill feed.',
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    createdAt: 'Today, 18:45 IST',
    organizerResponse: 'Match screenshots match client submission, but internal lobby log shows spectator drop at min 6.',
    arbiterNotes: 'Reviewing video playback submitted by reporter.',
    evidenceUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'DISP-879',
    tournamentId: 'T-ORG-002',
    tournamentTitle: 'Weekend Squad Clash — Week 24',
    matchId: 'M-WSC-03',
    reporterName: 'Viper Strike (Captain)',
    reporterRole: 'PLAYER',
    targetPlayer: 'Crimson Elite',
    reason: 'Late roster substitution without declaration',
    details: 'Player 4 did not match registered in-game UID on tournament roster sheet.',
    status: 'NEEDS_INFORMATION',
    priority: 'MEDIUM',
    createdAt: 'Yesterday, 22:10 IST',
    organizerResponse: 'Organizer granted emergency sub due to network outage, pending medical proof.',
    arbiterNotes: 'Requested captain to submit registration change ticket before 22:00 IST.',
    evidenceUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'DISP-871',
    tournamentId: 'T-ORG-006',
    tournamentTitle: 'Monsoon Clash Season Finale',
    matchId: 'M-MSC-04',
    reporterName: 'Blaze Force',
    reporterRole: 'PLAYER',
    targetPlayer: 'Titan Squad',
    reason: 'Incorrect placement point allocation',
    details: 'Scorecard initially credited Blaze Force with 4th place instead of 3rd place tie-breaker.',
    status: 'RESOLVED',
    priority: 'LOW',
    createdAt: '2026-09-04T20:15:00Z',
    organizerResponse: 'Re-examined match log: Blaze Force held higher total damage dealt tiebreaker.',
    arbiterNotes: 'Dispute confirmed and resolved. +1 pt adjusted on verified scoreboard. Prize updated.',
    evidenceUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
  }
]

export const INITIAL_FINANCIAL_LEDGER = {
  balances: {
    available: 128450,
    pendingSettlement: 43200,
    processingPayouts: 18500,
    paidPrizeTotal: 245000,
    platformFeeTotal: 34800
  },
  transactions: [
    {
      id: 'TXN-9021',
      date: '2026-09-11 19:40',
      type: 'REGISTRATION_FEE',
      tournamentTitle: 'FF WAR National Championship — Stage 1',
      reference: 'REG-NAT-36',
      amount: 3600,
      state: 'CONFIRMED',
      notes: 'Entry fees collected from 36 confirmed squads'
    },
    {
      id: 'TXN-9020',
      date: '2026-09-11 18:00',
      type: 'PRIZE_ALLOCATION',
      tournamentTitle: 'FF WAR National Championship — Stage 1',
      reference: 'ESCROW-NAT-01',
      amount: 25000,
      state: 'HELD_IN_ESCROW',
      notes: 'Guaranteed platform prize pool secured in escrow'
    },
    {
      id: 'TXN-9019',
      date: '2026-09-11 14:15',
      type: 'PAYOUT',
      tournamentTitle: 'Monsoon Clash Season Finale',
      reference: 'PAY-412',
      amount: 16000,
      state: 'PAID',
      notes: 'Disbursed to Titan Squad (1st Place Winner)'
    },
    {
      id: 'TXN-9018',
      date: '2026-09-10 11:30',
      type: 'PLATFORM_FEE',
      tournamentTitle: 'Weekend Squad Clash — Week 24',
      reference: 'FEE-WSC-24',
      amount: 500,
      state: 'SETTLED',
      notes: 'Platform operation 10% platform fee on prize pool'
    },
    {
      id: 'TXN-9017',
      date: '2026-09-09 16:45',
      type: 'REFUND',
      tournamentTitle: 'Duo Masters Weekly — Sunday Rumble',
      reference: 'REF-DUO-03',
      amount: 40,
      state: 'CONFIRMED',
      notes: 'Registration withdrawal before bracket lock'
    }
  ]
}

export const INITIAL_PAYOUTS = [
  {
    id: 'PAY-419',
    recipientName: 'Squad Titan (Captain: Arjun_T)',
    recipientType: 'TEAM',
    amount: 12000,
    tournamentId: 'T-ORG-002',
    tournamentTitle: 'Weekend Squad Clash — Week 24',
    status: 'PENDING',
    source: 'TOURNAMENT_PRIZE',
    destinationMasked: 'UPI: arjun***@demo.upi',
    createdAt: 'Today, 16:30 IST',
    reviewedAt: null,
    reviewedBy: null,
    reasonsRequired: true
  },
  {
    id: 'PAY-418',
    recipientName: 'Nexus Esports (Host)',
    recipientType: 'ORGANIZER',
    amount: 6500,
    tournamentId: 'T-ORG-006',
    tournamentTitle: 'Monsoon Clash Season Finale',
    status: 'PROCESSING',
    source: 'ORGANIZER_COMMISSION',
    destinationMasked: 'Bank Account: ***4921',
    createdAt: 'Today, 12:00 IST',
    reviewedAt: 'Today, 13:30 IST',
    reviewedBy: 'ADMIN-CORE-01',
    reasonsRequired: false
  },
  {
    id: 'PAY-412',
    recipientName: 'Squad Titan',
    recipientType: 'TEAM',
    amount: 16000,
    tournamentId: 'T-ORG-006',
    tournamentTitle: 'Monsoon Clash Season Finale',
    status: 'PAID',
    source: 'TOURNAMENT_PRIZE',
    destinationMasked: 'UPI: titan***@demo.upi',
    createdAt: '2026-09-05T10:00:00Z',
    reviewedAt: '2026-09-05T12:00:00Z',
    reviewedBy: 'ADMIN-CORE-01',
    reasonsRequired: false
  }
]

export const INITIAL_INTEGRITY_FLAGS = [
  {
    id: 'INT-104',
    type: 'UNUSUAL_RESULT_PATTERN',
    entityType: 'PLAYER',
    entityId: 'USR-PLY-104',
    entityName: 'GHOST_DEVIL',
    tournamentTitle: 'Solo Ranked Cup — Season 4',
    severity: 'MEDIUM',
    status: 'FLAGGED_FOR_REVIEW',
    timestamp: 'Today, 18:50 IST',
    details: '17 kills recorded in 9 minutes by unseeded new account. Kill-to-damage ratio exceeds statistical threshold (99.8th percentile).',
    actionRequired: 'Review match playback and device identifier consistency.'
  },
  {
    id: 'INT-103',
    type: 'DUPLICATE_ACCOUNT_SIGNAL',
    entityType: 'USER',
    entityId: 'USR-PLY-099',
    entityName: 'SHADOW_K_ALT',
    tournamentTitle: 'Platform Identity System',
    severity: 'LOW',
    status: 'RESOLVED',
    timestamp: 'Yesterday, 14:00 IST',
    details: 'Subnet collision detected with primary account. Player verified as roommate with separate Free Fire UID.',
    actionRequired: 'Cleared by Admin governance review.'
  }
]

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUDIT-701',
    timestamp: '11 Sep 2026 · 20:15 IST',
    admin: 'ARAVIND_GOV (ADMIN-CORE-01)',
    action: 'TOURNAMENT_VERIFICATION',
    entity: 'Tournament #T-PLAT-001',
    previousState: 'PENDING_VERIFICATION',
    newState: 'PLATFORM_VERIFIED',
    reason: 'Met all platform integrity, prize escrow, and rules specifications.',
    reference: 'REQ-VERIFY-009'
  },
  {
    id: 'AUDIT-700',
    timestamp: '11 Sep 2026 · 17:40 IST',
    admin: 'ARAVIND_GOV (ADMIN-CORE-01)',
    action: 'PAYOUT_APPROVAL',
    entity: 'Payout #PAY-418',
    previousState: 'PENDING',
    newState: 'PROCESSING',
    reason: 'Organizer tournament completed with zero unresolved disputes.',
    reference: 'FIN-PAY-881'
  },
  {
    id: 'AUDIT-699',
    timestamp: '10 Sep 2026 · 15:20 IST',
    admin: 'ARAVIND_GOV (ADMIN-CORE-01)',
    action: 'DISPUTE_RESOLUTION',
    entity: 'Dispute #DISP-871',
    previousState: 'UNDER_REVIEW',
    newState: 'RESOLVED',
    reason: 'Damage dealt tie-breaker applied correctly in accordance with Section 4.2 Rules.',
    reference: 'DISP-871'
  },
  {
    id: 'AUDIT-698',
    timestamp: '09 Sep 2026 · 11:10 IST',
    admin: 'ARAVIND_GOV (ADMIN-CORE-01)',
    action: 'ORGANIZER_VERIFICATION',
    entity: 'Organizer #ORG-NEXUS-01',
    previousState: 'PENDING_VERIFICATION',
    newState: 'VERIFIED',
    reason: 'Approved institutional tournament hosting license and security bond.',
    reference: 'ORG-KYC-003'
  }
]

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    category: 'RESULTS',
    title: 'Result Verification Required',
    message: 'Weekend Squad Clash match results submitted by Nexus Esports.',
    timestamp: '18 min ago',
    unread: true,
    link: '/admin/results'
  },
  {
    id: 'NOTIF-02',
    category: 'INTEGRITY',
    title: 'High Severity Anomaly Detected',
    message: 'Integrity flag #INT-104 requires Arbiter review in Solo Cup.',
    timestamp: '2 hours ago',
    unread: true,
    link: '/admin/integrity'
  },
  {
    id: 'NOTIF-03',
    category: 'ORGANIZERS',
    title: 'New Organizer Application',
    message: 'Delta Tourneys submitted institutional credentials for review.',
    timestamp: '3 hours ago',
    unread: false,
    link: '/admin/organizers'
  },
  {
    id: 'NOTIF-04',
    category: 'FINANCE',
    title: 'Payout Request Awaiting Signature',
    message: 'Payout #PAY-419 requires two-factor authorization.',
    timestamp: '4 hours ago',
    unread: false,
    link: '/admin/payouts'
  }
]

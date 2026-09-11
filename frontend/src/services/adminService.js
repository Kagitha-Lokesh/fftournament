// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN SERVICE LAYER
//
// Backend-ready API abstraction for platform governance.
// Handles data access, authoritative status updates, confirmation auditing,
// and synthetic state mutations.
// ──────────────────────────────────────────────────────────────────────────────

import {
  INITIAL_ADMIN_PROFILE,
  INITIAL_PLATFORM_SUMMARY,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_ADMIN_TOURNAMENTS,
  INITIAL_USERS,
  INITIAL_ORGANIZERS,
  INITIAL_RESULTS_QUEUE,
  INITIAL_DISPUTES,
  INITIAL_FINANCIAL_LEDGER,
  INITIAL_PAYOUTS,
  INITIAL_INTEGRITY_FLAGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../data/adminData'

// In-memory state containers
let adminProfile = { ...INITIAL_ADMIN_PROFILE }
let platformSummary = { ...INITIAL_PLATFORM_SUMMARY }
let attentionItems = [...INITIAL_ATTENTION_ITEMS]
let tournaments = [...INITIAL_ADMIN_TOURNAMENTS]
let users = [...INITIAL_USERS]
let organizers = [...INITIAL_ORGANIZERS]
let resultsQueue = [...INITIAL_RESULTS_QUEUE]
let disputes = [...INITIAL_DISPUTES]
let financialLedger = { ...INITIAL_FINANCIAL_LEDGER }
let payouts = [...INITIAL_PAYOUTS]
let integrityFlags = [...INITIAL_INTEGRITY_FLAGS]
let auditLogs = [...INITIAL_AUDIT_LOGS]
let notifications = [...INITIAL_NOTIFICATIONS]

// Helper: safe tournament normalizer guaranteeing all required date, time, and image properties
export const normalizeAdminTournament = (t) => {
  if (!t) return null
  const date = t.scheduledDate || t.date || 'TBD'
  const time = t.scheduledTime || t.time || t.startTime || '8:00 PM'
  const startTime = t.startTime || time
  const bannerUrl = t.bannerUrl || t.image || '/assets/tournaments/tournament-squad-01.webp'
  return {
    ...t,
    scheduledDate: date,
    date,
    scheduledTime: time,
    time,
    startTime,
    bannerUrl,
    image: bannerUrl,
    title: t.title || t.name || 'Free Fire Tournament',
    name: t.title || t.name || 'Free Fire Tournament',
    tournamentName: t.title || t.name || 'Free Fire Tournament',
    registeredCount: t.registeredCount ?? 0,
    maxParticipants: t.maxParticipants ?? 48,
    capacity: t.maxParticipants ?? t.capacity ?? 48,
    entryFee: t.entryFee ?? 0,
    prizePool: t.prizePool ?? 0,
    organizerName: t.organizerName || t.organizer || 'FF WAR Official',
    mode: t.mode || 'Squad',
    format: t.format || 'Battle Royale',
    status: t.status || 'REGISTRATION',
    verificationStatus: t.verificationStatus || 'UNVERIFIED',
    tournamentSource: t.tournamentSource || 'PLATFORM'
  }
}

// Helper: record an audit log entry
export const appendAuditLog = ({ action, entity, previousState, newState, reason, reference }) => {
  const newLog = {
    id: `AUDIT-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST',
    admin: `${adminProfile.gamertag} (${adminProfile.id})`,
    action,
    entity,
    previousState: previousState || 'N/A',
    newState: newState || 'N/A',
    reason: reason || 'Authorized administrative review',
    reference: reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`
  }
  auditLogs = [newLog, ...auditLogs]
  return newLog
}

export const adminService = {
  // ─── Dashboard Overview ────────────────────────────────────────────────────
  getAdminDashboard: async () => {
    return {
      profile: { ...adminProfile },
      summary: { ...platformSummary },
      attentionItems: [...attentionItems],
      recentTournaments: tournaments.slice(0, 4).map(normalizeAdminTournament),
      platformTournaments: tournaments.filter(t => t.tournamentSource === 'PLATFORM').map(normalizeAdminTournament),
      recentResults: resultsQueue.slice(0, 3),
      recentAuditLogs: auditLogs.slice(0, 4),
      financialOverview: { ...financialLedger.balances }
    }
  },

  getPlatformSummary: async () => {
    return {
      ...platformSummary,
      activeTournaments: tournaments.filter(t => ['LIVE', 'REGISTRATION', 'CHECK_IN'].includes(t.status)).length,
      pendingReviews: attentionItems.length
    }
  },

  getAdminProfile: async () => {
    return { ...adminProfile }
  },

  // ─── Tournaments ───────────────────────────────────────────────────────────
  getTournaments: async (query = '', filters = {}) => {
    let list = [...tournaments]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.organizerName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      )
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(t => t.status === filters.status)
    }
    if (filters.source && filters.source !== 'ALL') {
      list = list.filter(t => t.tournamentSource === filters.source)
    }
    if (filters.verification && filters.verification !== 'ALL') {
      list = list.filter(t => t.verificationStatus === filters.verification)
    }
    return list.map(normalizeAdminTournament)
  },

  getTournament: async (id) => {
    const found = tournaments.find(t => t.id === id)
    return found ? normalizeAdminTournament(found) : null
  },

  createTournament: async (tournamentData) => {
    const newTournament = {
      id: `T-PLAT-${Date.now().toString().slice(-3)}`,
      title: tournamentData.title || 'Untitled Platform Tournament',
      subtitle: tournamentData.subtitle || 'Platform-managed competitive event',
      mode: tournamentData.mode || 'Squad',
      format: tournamentData.format || 'Battle Royale',
      tournamentSource: 'PLATFORM',
      createdBy: 'ADMIN',
      organizerName: 'FF WAR Official',
      organizerId: adminProfile.id,
      verificationStatus: tournamentData.publishImmediately ? 'PLATFORM_VERIFIED' : 'PENDING_VERIFICATION',
      visibility: tournamentData.visibility || 'PUBLIC',
      status: tournamentData.publishImmediately ? 'REGISTRATION' : 'DRAFT',
      entryFee: Number(tournamentData.entryFee) || 0,
      prizePool: Number(tournamentData.prizePool) || 1000,
      maxParticipants: Number(tournamentData.maxParticipants) || 48,
      registeredCount: 0,
      checkInCount: 0,
      scheduledDate: tournamentData.scheduledDate || '2026-09-18',
      scheduledTime: tournamentData.scheduledTime || '20:00 IST',
      map: tournamentData.map || 'Bermuda',
      matchesCount: Number(tournamentData.matchesCount) || 3,
      disputesCount: 0,
      bannerUrl: tournamentData.bannerUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      rules: tournamentData.rules || 'Official platform competitive rules apply.',
      prizeBreakdown: tournamentData.prizeBreakdown || [
        { place: '1st', prize: (Number(tournamentData.prizePool) || 1000) * 0.6 },
        { place: '2nd', prize: (Number(tournamentData.prizePool) || 1000) * 0.4 }
      ],
      verifiedAt: tournamentData.publishImmediately ? new Date().toISOString() : null,
      verifiedBy: tournamentData.publishImmediately ? adminProfile.id : null
    }

    tournaments = [newTournament, ...tournaments]

    appendAuditLog({
      action: 'PLATFORM_TOURNAMENT_CREATED',
      entity: `Tournament #${newTournament.id} (${newTournament.title})`,
      previousState: 'NONE',
      newState: newTournament.status,
      reason: 'Admin published platform competition with escrow allocation',
      reference: newTournament.id
    })

    return newTournament
  },

  verifyTournament: async (id, decision, reason) => {
    const tournament = tournaments.find(t => t.id === id)
    if (!tournament) throw new Error('Tournament not found')

    const prevState = tournament.verificationStatus
    const newState = decision === 'APPROVE' ? 'PLATFORM_VERIFIED' : 'NOT_VERIFIED'

    tournament.verificationStatus = newState
    tournament.verifiedAt = decision === 'APPROVE' ? new Date().toISOString() : null
    tournament.verifiedBy = decision === 'APPROVE' ? adminProfile.id : null

    appendAuditLog({
      action: 'TOURNAMENT_VERIFICATION_DECISION',
      entity: `Tournament #${id} (${tournament.title})`,
      previousState: prevState,
      newState,
      reason: reason || 'Administrative verification review conducted',
      reference: `VER-${id}`
    })

    return tournament
  },

  updateTournamentStatus: async (id, newStatus, reason) => {
    const tournament = tournaments.find(t => t.id === id)
    if (!tournament) throw new Error('Tournament not found')

    const prevState = tournament.status
    tournament.status = newStatus

    appendAuditLog({
      action: 'TOURNAMENT_STATUS_OVERRIDE',
      entity: `Tournament #${id} (${tournament.title})`,
      previousState: prevState,
      newState: newStatus,
      reason: reason || 'Administrative status transition applied',
      reference: `STAT-${id}`
    })

    return tournament
  },

  // ─── Users Management ──────────────────────────────────────────────────────
  getUsers: async (query = '', filters = {}) => {
    let list = [...users]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(u =>
        u.ign.toLowerCase().includes(q) ||
        u.playerUid.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      )
    }
    if (filters.role && filters.role !== 'ALL') {
      list = list.filter(u => u.role === filters.role)
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(u => u.status === filters.status)
    }
    return list
  },

  getUser: async (id) => {
    return users.find(u => u.id === id) || null
  },

  updateUserStatus: async (id, action, reason) => {
    const user = users.find(u => u.id === id)
    if (!user) throw new Error('User not found')

    const prevState = user.status
    let newState = prevState

    if (action === 'SUSPEND') newState = 'SUSPENDED'
    else if (action === 'RESTRICT') newState = 'RESTRICTED'
    else if (action === 'ACTIVATE') newState = 'ACTIVE'

    user.status = newState

    appendAuditLog({
      action: `USER_${action}`,
      entity: `User #${id} (${user.ign})`,
      previousState: prevState,
      newState,
      reason: reason || 'Administrative user moderation action',
      reference: `USR-MOD-${id}`
    })

    return user
  },

  // ─── Organizers ────────────────────────────────────────────────────────────
  getOrganizers: async (query = '', filters = {}) => {
    let list = [...organizers]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.handle.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      )
    }
    if (filters.verification && filters.verification !== 'ALL') {
      list = list.filter(o => o.verificationStatus === filters.verification)
    }
    return list
  },

  getOrganizer: async (id) => {
    return organizers.find(o => o.id === id) || null
  },

  verifyOrganizer: async (id, decision, reason) => {
    const organizer = organizers.find(o => o.id === id)
    if (!organizer) throw new Error('Organizer not found')

    const prevState = organizer.verificationStatus
    const newState = decision === 'APPROVE' ? 'VERIFIED' : decision === 'REJECT' ? 'REJECTED' : 'SUSPENDED'

    organizer.verificationStatus = newState
    organizer.standing = decision === 'APPROVE' ? 'EXCELLENT' : 'RESTRICTED'
    organizer.verifiedAt = decision === 'APPROVE' ? new Date().toISOString() : null
    organizer.verifiedBy = decision === 'APPROVE' ? adminProfile.id : null

    appendAuditLog({
      action: 'ORGANIZER_VERIFICATION_DECISION',
      entity: `Organizer #${id} (${organizer.name})`,
      previousState: prevState,
      newState,
      reason: reason || 'Institutional verification review complete',
      reference: `ORG-VER-${id}`
    })

    return organizer
  },

  // ─── Results & Integrity Queue ─────────────────────────────────────────────
  getResults: async (query = '', filters = {}) => {
    let list = [...resultsQueue]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(r =>
        r.tournamentTitle.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.submittedBy.toLowerCase().includes(q)
      )
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(r => r.lifecycleStatus === filters.status)
    }
    return list
  },

  getResult: async (id) => {
    return resultsQueue.find(r => r.id === id) || null
  },

  reviewResult: async (id, decision, reason) => {
    const res = resultsQueue.find(r => r.id === id)
    if (!res) throw new Error('Result not found')

    const prevState = res.lifecycleStatus
    let newState = prevState

    if (decision === 'APPROVE') newState = 'CONFIRMED'
    else if (decision === 'FINALIZE') newState = 'FINALIZED'
    else if (decision === 'REQUEST_INFO') newState = 'UNDER_REVIEW'
    else if (decision === 'REJECT') newState = 'DRAFT'

    res.lifecycleStatus = newState

    appendAuditLog({
      action: `RESULT_${decision}`,
      entity: `Result #${id} (${res.tournamentTitle} - Match ${res.matchNumber})`,
      previousState: prevState,
      newState,
      reason: reason || 'Result scoreboard verified against lobby log and OCR evidence',
      reference: `RES-REV-${id}`
    })

    return res
  },

  // ─── Disputes ──────────────────────────────────────────────────────────────
  getDisputes: async (query = '', filters = {}) => {
    let list = [...disputes]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(d =>
        d.id.toLowerCase().includes(q) ||
        d.tournamentTitle.toLowerCase().includes(q) ||
        d.reporterName.toLowerCase().includes(q) ||
        d.reason.toLowerCase().includes(q)
      )
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(d => d.status === filters.status)
    }
    return list
  },

  getDispute: async (id) => {
    return disputes.find(d => d.id === id) || null
  },

  updateDispute: async (id, state, resolutionNotes, reason) => {
    const dispute = disputes.find(d => d.id === id)
    if (!dispute) throw new Error('Dispute not found')

    const prevState = dispute.status
    dispute.status = state
    dispute.arbiterNotes = resolutionNotes

    appendAuditLog({
      action: 'DISPUTE_STATE_UPDATE',
      entity: `Dispute #${id} (${dispute.tournamentTitle})`,
      previousState: prevState,
      newState: state,
      reason: reason || resolutionNotes || 'Administrative arbitration determination',
      reference: `DISP-ARB-${id}`
    })

    return dispute
  },

  // ─── Integrity Flags ───────────────────────────────────────────────────────
  getIntegrityFlags: async (query = '', filters = {}) => {
    let list = [...integrityFlags]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(f =>
        f.entityName.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q) ||
        f.details.toLowerCase().includes(q)
      )
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(f => f.status === filters.status)
    }
    return list
  },

  resolveIntegrityFlag: async (id, decision, notes, reason) => {
    const flag = integrityFlags.find(f => f.id === id)
    if (!flag) throw new Error('Flag not found')

    const prevState = flag.status
    flag.status = decision === 'DISMISS' ? 'DISMISSED' : 'RESOLVED'
    flag.actionRequired = notes

    appendAuditLog({
      action: `INTEGRITY_FLAG_${decision}`,
      entity: `Flag #${id} (${flag.type} - ${flag.entityName})`,
      previousState: prevState,
      newState: flag.status,
      reason: reason || notes || 'Platform integrity review concluded',
      reference: `INT-RES-${id}`
    })

    return flag
  },

  // ─── Financial Ledger & Payouts ────────────────────────────────────────────
  getFinancialLedger: async () => {
    return { ...financialLedger }
  },

  getPayouts: async (query = '', filters = {}) => {
    let list = [...payouts]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.id.toLowerCase().includes(q) ||
        p.recipientName.toLowerCase().includes(q) ||
        p.tournamentTitle.toLowerCase().includes(q)
      )
    }
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(p => p.status === filters.status)
    }
    return list
  },

  reviewPayout: async (id, decision, reason) => {
    const payout = payouts.find(p => p.id === id)
    if (!payout) throw new Error('Payout not found')

    const prevState = payout.status
    let newState = prevState

    if (decision === 'APPROVE') newState = 'PROCESSING'
    else if (decision === 'RELEASE') newState = 'PAID'
    else if (decision === 'REJECT') newState = 'FAILED'
    else if (decision === 'HOLD') newState = 'NEEDS_REVIEW'

    payout.status = newState
    payout.reviewedAt = new Date().toISOString()
    payout.reviewedBy = adminProfile.id

    appendAuditLog({
      action: `PAYOUT_${decision}`,
      entity: `Payout #${id} (₹${payout.amount} to ${payout.recipientName})`,
      previousState: prevState,
      newState,
      reason: reason || 'Authorized two-factor disbursement approval',
      reference: `PAY-REL-${id}`
    })

    return payout
  },

  // ─── Audit Logs ────────────────────────────────────────────────────────────
  getAuditLogs: async (query = '', filters = {}) => {
    let list = [...auditLogs]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(l =>
        l.entity.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.reason.toLowerCase().includes(q) ||
        l.admin.toLowerCase().includes(q)
      )
    }
    if (filters.action && filters.action !== 'ALL') {
      list = list.filter(l => l.action.includes(filters.action))
    }
    return list
  },

  // ─── Notifications ─────────────────────────────────────────────────────────
  getNotifications: async () => {
    return [...notifications]
  },

  markNotificationsRead: async () => {
    notifications = notifications.map(n => ({ ...n, unread: false }))
    return [...notifications]
  }
}

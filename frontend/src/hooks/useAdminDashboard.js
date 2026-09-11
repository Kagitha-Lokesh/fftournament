// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — USE ADMIN DASHBOARD HOOK
//
// Centralized state management for the Admin platform control center.
// Handles dashboard data, operational filters, modal states, audit-backed
// actions, and non-intrusive toast notifications.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { adminService } from '../services/adminService'

export function useAdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [demoMode, setDemoMode] = useState('ACTIVE') // ACTIVE | EMPTY | LOADING

  // Dashboard Aggregates
  const [dashboardData, setDashboardData] = useState(null)
  const [platformSummary, setPlatformSummary] = useState(null)
  const [attentionItems, setAttentionItems] = useState([])

  // Modal & Confirmation Dialog State
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionLabel: 'Confirm',
    actionType: 'PRIMARY', // PRIMARY | DANGER
    requiresReason: true,
    onConfirm: null
  })

  // Toasts
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // Load Dashboard Overview Data
  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (demoMode === 'LOADING') {
        return // Leave in loading skeleton state
      }

      if (demoMode === 'EMPTY') {
        setDashboardData({
          profile: await adminService.getAdminProfile(),
          summary: {
            activeTournaments: 0,
            registeredPlayers: 0,
            pendingReviews: 0,
            pendingPayouts: 0,
            settledPrizePool: 0,
            platformHealth: 'OPERATIONAL_NORMAL'
          },
          attentionItems: [],
          recentTournaments: [],
          platformTournaments: [],
          recentResults: [],
          recentAuditLogs: [],
          financialOverview: {
            available: 0,
            pendingSettlement: 0,
            processingPayouts: 0,
            paidPrizeTotal: 0
          }
        })
        setAttentionItems([])
        setPlatformSummary({
          activeTournaments: 0,
          registeredPlayers: 0,
          pendingReviews: 0,
          pendingPayouts: 0
        })
        setLoading(false)
        return
      }

      const data = await adminService.getAdminDashboard()
      setDashboardData(data)
      setPlatformSummary(data.summary)
      setAttentionItems(data.attentionItems)
    } catch (err) {
      console.error('Failed to load admin dashboard:', err)
      setError(err.message || 'Failed to initialize platform governance center')
      addToast('Error loading admin dashboard', 'error')
    } finally {
      if (demoMode !== 'LOADING') {
        setLoading(false)
      }
    }
  }, [demoMode, addToast])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  // Helper to open a confirmation dialog requiring an administrative reason
  const requestConfirmation = ({
    title,
    message,
    actionLabel = 'Confirm Action',
    actionType = 'PRIMARY',
    requiresReason = true,
    onConfirm
  }) => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      actionLabel,
      actionType,
      requiresReason,
      onConfirm: async (reason) => {
        try {
          await onConfirm(reason)
          setConfirmationModal(prev => ({ ...prev, isOpen: false }))
          addToast('Administrative action executed and logged to audit trail', 'success')
          await loadDashboard()
        } catch (err) {
          console.error('Action failed:', err)
          addToast(err.message || 'Action failed', 'error')
        }
      }
    })
  }

  const closeConfirmation = () => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }))
  }

  return {
    loading,
    error,
    demoMode,
    setDemoMode,
    dashboardData,
    platformSummary,
    attentionItems,
    confirmationModal,
    requestConfirmation,
    closeConfirmation,
    toasts,
    addToast,
    removeToast,
    refreshDashboard: loadDashboard
  }
}

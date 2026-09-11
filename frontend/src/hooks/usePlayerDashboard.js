// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — usePlayerDashboard Hook
// Centralized state management for the player dashboard experience
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { playerService } from '../services/playerService'

export function usePlayerDashboard(initialPath = '/player') {
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [demoMode, setDemoMode] = useState('ACTIVE') // ACTIVE | EMPTY | LOADING
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [activeModal, setActiveModal] = useState(null) // null | { type: string, payload: any }
  const [toasts, setToasts] = useState([])

  // Toast notification helper
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Fetch data whenever demoMode changes
  const refreshData = useCallback(async () => {
    if (demoMode === 'LOADING') {
      setLoading(true)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const dashboardData = await playerService.getPlayerDashboard(demoMode)
      setData(dashboardData)
    } catch (err) {
      setError('Unable to load player dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [demoMode])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // Navigation helper
  const navigate = useCallback((path) => {
    setCurrentPath(path)
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path.startsWith('/player')) {
        setCurrentPath(path)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Check-in action
  const handleCheckIn = useCallback(
    async (matchId) => {
      try {
        const res = await playerService.performCheckIn(matchId)
        if (res.success) {
          addToast('Check-in confirmed! Your slot is locked and room credentials are ready.', 'success')
          // Optimistically update nextMatch
          setData((prev) => {
            if (!prev || !prev.nextMatch) return prev
            return {
              ...prev,
              nextMatch: {
                ...prev.nextMatch,
                check_in_status: 'CONFIRMED',
                room_access_status: 'RELEASED',
              },
              actionRequired: prev.actionRequired.filter((a) => a.type !== 'CHECK_IN_PENDING'),
            }
          })
          setActiveModal(null)
        }
      } catch (err) {
        addToast('Failed to check in. Please try again.', 'error')
      }
    },
    [addToast]
  )

  // Withdrawal action
  const handleWithdrawal = useCallback(
    async (amount, upiId) => {
      try {
        const res = await playerService.requestWithdrawal(amount, upiId)
        if (res.success) {
          addToast(`Withdrawal of ₹${amount} submitted (${res.reference}).`, 'success')
          setData((prev) => {
            if (!prev) return prev
            return {
              ...prev,
              wallet: {
                ...prev.wallet,
                available_balance: Math.max(0, prev.wallet.available_balance - amount),
                transactions: [
                  {
                    id: `tx_${Date.now()}`,
                    date: 'Today',
                    type: 'WITHDRAWAL',
                    description: `Withdrawal to UPI (${upiId})`,
                    amount: -amount,
                    status: 'PROCESSING',
                    reference: res.reference,
                  },
                  ...prev.wallet.transactions,
                ],
              },
            }
          })
          setActiveModal(null)
        }
      } catch (err) {
        addToast('Withdrawal failed to process.', 'error')
      }
    },
    [addToast]
  )

  // Dispute action
  const handleDisputeSubmit = useCallback(
    async (formData) => {
      try {
        const res = await playerService.submitDispute(formData)
        if (res.success) {
          addToast(`Dispute Case ${res.caseId} opened and assigned to an integrity arbiter.`, 'success')
          setActiveModal(null)
        }
      } catch (err) {
        addToast('Could not submit dispute.', 'error')
      }
    },
    [addToast]
  )

  return {
    currentPath,
    navigate,
    demoMode,
    setDemoMode,
    loading: loading || demoMode === 'LOADING',
    error,
    data,
    refreshData,
    activeModal,
    setActiveModal,
    toasts,
    addToast,
    removeToast,
    handleCheckIn,
    handleWithdrawal,
    handleDisputeSubmit,
  }
}

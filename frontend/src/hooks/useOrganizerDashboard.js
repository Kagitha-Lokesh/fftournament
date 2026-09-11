// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — USE ORGANIZER DASHBOARD HOOK
//
// Manages operational state, loading/error states, demo mode switcher,
// active modal dialogs, and ephemeral feedback toasts for Organizer operations.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { organizerService } from '../services/organizerService'

export function useOrganizerDashboard(initialDemoMode = 'ACTIVE') {
  const [demoMode, setDemoMode] = useState(initialDemoMode)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [activeModal, setActiveModal] = useState(null) // { type, payload }
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3800)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (demoMode === 'LOADING') {
        // Simulated loading state for testing skeletons
        await new Promise((resolve) => setTimeout(resolve, 8000))
      }
      const dashboardData = await organizerService.getOrganizerDashboard(demoMode)
      setData(dashboardData)
    } catch (err) {
      setError(err?.message || 'Failed to load organizer operations.')
    } finally {
      setLoading(false)
    }
  }, [demoMode])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleCreateTournament = async (formData) => {
    try {
      const res = await organizerService.createTournament(formData)
      if (res.success) {
        addToast(res.message, 'success')
        await loadData()
        return res
      }
    } catch (err) {
      addToast(err?.message || 'Could not save tournament.', 'error')
      throw err
    }
  }

  const handlePayoutRequest = async (amount, upiId) => {
    try {
      const res = await organizerService.requestPayout(amount, upiId)
      if (res.success) {
        addToast(res.message, 'success')
        await loadData()
        setActiveModal(null)
        return res
      }
    } catch (err) {
      addToast(err?.message || 'Payout request failed.', 'error')
    }
  }

  const handleDisputeEvidence = async (disputeId, evidenceNote) => {
    try {
      const res = await organizerService.submitDisputeEvidence(disputeId, evidenceNote)
      if (res.success) {
        addToast(res.message, 'success')
        await loadData()
        setActiveModal(null)
      }
    } catch (err) {
      addToast(err?.message || 'Failed to submit evidence.', 'error')
    }
  }

  return {
    demoMode,
    setDemoMode,
    loading,
    error,
    data,
    reload: loadData,
    activeModal,
    setActiveModal,
    toasts,
    addToast,
    removeToast,
    handleCreateTournament,
    handlePayoutRequest,
    handleDisputeEvidence,
  }
}

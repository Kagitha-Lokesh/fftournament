// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN SHELL
//
// Master layout shell coordinating desktop sidebar, top bar, mobile 5-item nav,
// drawer, confirmation dialogs, and route dispatch for all /admin/* destinations.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopBar from './AdminTopBar'
import AdminMobileNav from './AdminMobileNav'
import AdminMenuDrawer from './AdminMenuDrawer'
import AdminConfirmationModal from '../ui/AdminConfirmationModal'
import ToastContainer from '../ui/Toast'
import { useAdminDashboard } from '../../../hooks/useAdminDashboard'

// Admin Pages
import AdminHome from '../../../pages/admin/AdminHome'
import AdminTournamentsPage from '../../../pages/admin/AdminTournamentsPage'
import AdminCreateTournamentPage from '../../../pages/admin/AdminCreateTournamentPage'
import AdminTournamentDetailPage from '../../../pages/admin/AdminTournamentDetailPage'
import AdminParticipantsPage from '../../../pages/admin/AdminParticipantsPage'
import AdminMatchesPage from '../../../pages/admin/AdminMatchesPage'
import AdminResultsPage from '../../../pages/admin/AdminResultsPage'
import AdminUsersPage from '../../../pages/admin/AdminUsersPage'
import AdminOrganizersPage from '../../../pages/admin/AdminOrganizersPage'
import AdminPlayerHistoryPage from '../../../pages/admin/AdminPlayerHistoryPage'
import AdminLedgerPage from '../../../pages/admin/AdminLedgerPage'
import AdminPayoutsPage from '../../../pages/admin/AdminPayoutsPage'
import AdminDisputesPage from '../../../pages/admin/AdminDisputesPage'
import AdminIntegrityPage from '../../../pages/admin/AdminIntegrityPage'
import AdminAuditLogsPage from '../../../pages/admin/AdminAuditLogsPage'
import AdminNotificationsPage from '../../../pages/admin/AdminNotificationsPage'
import AdminProfilePage from '../../../pages/admin/AdminProfilePage'

export default function AdminShell({ currentPath: propPath = '/admin', onSignOut }) {
  const [currentPath, setCurrentPath] = useState(propPath)
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)

  const {
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
    refreshDashboard
  } = useAdminDashboard()

  useEffect(() => {
    setCurrentPath(propPath)
  }, [propPath])

  const navigateTo = (path) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Render active page based on currentPath
  const renderActivePage = () => {
    if (currentPath === '/admin') {
      return (
        <AdminHome
          dashboardData={dashboardData}
          platformSummary={platformSummary}
          attentionItems={attentionItems}
          onNavigate={navigateTo}
        />
      )
    }

    if (currentPath === '/admin/tournaments/new') {
      return (
        <AdminCreateTournamentPage
          onNavigate={navigateTo}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/tournaments/')) {
      const tournamentId = currentPath.split('/admin/tournaments/')[1]
      return (
        <AdminTournamentDetailPage
          tournamentId={tournamentId}
          onNavigate={navigateTo}
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/tournaments')) {
      return (
        <AdminTournamentsPage
          onNavigate={navigateTo}
          onRequestConfirmation={requestConfirmation}
        />
      )
    }

    if (currentPath.startsWith('/admin/participants')) {
      return <AdminParticipantsPage />
    }

    if (currentPath.startsWith('/admin/matches')) {
      return <AdminMatchesPage onToast={addToast} />
    }

    if (currentPath.startsWith('/admin/results')) {
      return (
        <AdminResultsPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/users')) {
      return (
        <AdminUsersPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/organizers')) {
      return (
        <AdminOrganizersPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/player-history')) {
      return (
        <AdminPlayerHistoryPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/ledger')) {
      return <AdminLedgerPage />
    }

    if (currentPath.startsWith('/admin/payouts')) {
      return (
        <AdminPayoutsPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/disputes')) {
      return (
        <AdminDisputesPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/integrity')) {
      return (
        <AdminIntegrityPage
          onRequestConfirmation={requestConfirmation}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/audit-logs')) {
      return <AdminAuditLogsPage />
    }

    if (currentPath.startsWith('/admin/notifications')) {
      return (
        <AdminNotificationsPage
          onNavigate={navigateTo}
          onToast={addToast}
        />
      )
    }

    if (currentPath.startsWith('/admin/profile')) {
      return <AdminProfilePage profile={dashboardData?.profile} />
    }

    // Default to AdminHome
    return (
      <AdminHome
        dashboardData={dashboardData}
        platformSummary={platformSummary}
        attentionItems={attentionItems}
        onNavigate={navigateTo}
      />
    )
  }

  return (
    <div className="admin-shell">
      <div className="admin-body">
        {/* Desktop Sidebar */}
        <AdminSidebar
          currentPath={currentPath}
          onNavigate={navigateTo}
          onSignOut={onSignOut}
        />

        <div className="admin-main-container">
          {/* Top Bar */}
          <AdminTopBar
            currentPath={currentPath}
            onNavigate={navigateTo}
            onOpenDrawer={() => setMenuDrawerOpen(true)}
            demoMode={demoMode}
            setDemoMode={setDemoMode}
          />

          {/* Main Content Area */}
          <main className="admin-content-area" id="admin-main-content">
            {loading && !dashboardData ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-grey)' }}>
                Initializing platform governance center...
              </div>
            ) : error ? (
              <div className="admin-card" style={{ textAlign: 'center', padding: '32px' }}>
                <h3 style={{ color: 'var(--admin-red)' }}>Platform Initialization Notice</h3>
                <p>{error}</p>
                <button
                  type="button"
                  onClick={refreshDashboard}
                  className="admin-btn admin-btn--primary"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              renderActivePage()
            )}
          </main>
        </div>
      </div>

      {/* Mobile 5-Item Bottom Navigation */}
      <AdminMobileNav
        currentPath={currentPath}
        onNavigate={navigateTo}
        onToggleMenu={() => setMenuDrawerOpen(prev => !prev)}
      />

      {/* Mobile Menu Drawer */}
      <AdminMenuDrawer
        isOpen={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        onNavigate={navigateTo}
        onSignOut={onSignOut}
      />

      {/* Mandatory Reason Confirmation Dialog */}
      <AdminConfirmationModal
        isOpen={confirmationModal.isOpen}
        title={confirmationModal.title}
        message={confirmationModal.message}
        actionLabel={confirmationModal.actionLabel}
        actionType={confirmationModal.actionType}
        requiresReason={confirmationModal.requiresReason}
        onConfirm={confirmationModal.onConfirm}
        onClose={closeConfirmation}
      />

      {/* Toast Feedback */}
      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER SHELL
//
// Master layout shell coordinating desktop sidebar, topbar, mobile 5-tab nav,
// slide-over drawer, and view router for all /organizer/* destinations.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import OrganizerSidebar from './OrganizerSidebar'
import OrganizerTopBar from './OrganizerTopBar'
import OrganizerMobileNav from './OrganizerMobileNav'
import OrganizerMenuDrawer from './OrganizerMenuDrawer'
import ToastContainer from '../ui/Toast'
import { useOrganizerDashboard } from '../../../hooks/useOrganizerDashboard'

// Organizer Pages
import OrganizerHome from '../../../pages/organizer/OrganizerHome'
import OrganizerTournamentsPage from '../../../pages/organizer/OrganizerTournamentsPage'
import CreateTournamentPage from '../../../pages/organizer/CreateTournamentPage'
import OrganizerParticipantsPage from '../../../pages/organizer/OrganizerParticipantsPage'
import OrganizerMatchesPage from '../../../pages/organizer/OrganizerMatchesPage'
import OrganizerResultsPage from '../../../pages/organizer/OrganizerResultsPage'
import OrganizerEarningsPage from '../../../pages/organizer/OrganizerEarningsPage'
import OrganizerPayoutsPage from '../../../pages/organizer/OrganizerPayoutsPage'
import OrganizerDisputesPage from '../../../pages/organizer/OrganizerDisputesPage'
import OrganizerNotificationsPage from '../../../pages/organizer/OrganizerNotificationsPage'
import OrganizerProfilePage from '../../../pages/organizer/OrganizerProfilePage'

export default function OrganizerShell({ currentPath: propPath = '/organizer', onSignOut }) {
  const [currentPath, setCurrentPath] = useState(propPath)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const {
    demoMode,
    setDemoMode,
    loading,
    error,
    data,
    toasts,
    removeToast,
    handleCreateTournament,
    handlePayoutRequest,
  } = useOrganizerDashboard('ACTIVE')

  const organizer = data?.organizer

  // Synchronize internal path with window history
  useEffect(() => {
    setCurrentPath(window.location.pathname)
    const onPopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/organizer/tournaments':
        return (
          <OrganizerTournamentsPage
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
      case '/organizer/tournaments/new':
        return (
          <CreateTournamentPage
            onNavigate={navigate}
            onCreateTournament={handleCreateTournament}
          />
        )
      case '/organizer/participants':
        return (
          <OrganizerParticipantsPage
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
      case '/organizer/matches':
        return (
          <OrganizerMatchesPage
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
      case '/organizer/results':
        return (
          <OrganizerResultsPage
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
      case '/organizer/earnings':
        return (
          <OrganizerEarningsPage
            onNavigate={navigate}
            demoMode={demoMode}
            onOpenPayout={() => navigate('/organizer/payouts')}
          />
        )
      case '/organizer/payouts':
        return (
          <OrganizerPayoutsPage
            demoMode={demoMode}
            onPayoutRequest={handlePayoutRequest}
          />
        )
      case '/organizer/disputes':
        return (
          <OrganizerDisputesPage
            demoMode={demoMode}
          />
        )
      case '/organizer/notifications':
        return (
          <OrganizerNotificationsPage
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
      case '/organizer/profile':
        return (
          <OrganizerProfilePage
            organizer={organizer}
            onSignOut={onSignOut}
          />
        )
      case '/organizer':
      default:
        return (
          <OrganizerHome
            data={data}
            loading={loading}
            error={error}
            onNavigate={navigate}
            demoMode={demoMode}
          />
        )
    }
  }

  return (
    <div className="player-app">
      {/* Desktop Sidebar */}
      <OrganizerSidebar
        currentPath={currentPath}
        onNavigate={navigate}
        organizer={organizer}
        onSignOut={onSignOut}
      />

      {/* Main Content Viewport */}
      <div className="player-main-area">
        <OrganizerTopBar
          currentPath={currentPath}
          onNavigate={navigate}
          organizer={organizer}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          onOpenMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
          onSignOut={onSignOut}
        />

        <main className="player-content-container">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile 5-Item Navigation */}
      <OrganizerMobileNav
        currentPath={currentPath}
        onNavigate={navigate}
        drawerOpen={mobileDrawerOpen}
        onCloseDrawer={() => setMobileDrawerOpen(false)}
        onToggleDrawer={() => setMobileDrawerOpen((prev) => !prev)}
      />

      {/* Mobile Secondary Menu Drawer */}
      <OrganizerMenuDrawer
        currentPath={currentPath}
        onNavigate={navigate}
        organizer={organizer}
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onSignOut={onSignOut}
      />

      {/* Ephemeral Notification Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

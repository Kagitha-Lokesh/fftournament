import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MobileNav from './MobileNav'
import ToastContainer from '../ui/Toast'
import Modal from '../ui/Modal'
import { usePlayerDashboard } from '../../../hooks/usePlayerDashboard'

// Import all 10 Player Pages
import DashboardHome from '../../../pages/player/DashboardHome'
import TournamentsPage from '../../../pages/player/TournamentsPage'
import MatchesPage from '../../../pages/player/MatchesPage'
import ResultsPage from '../../../pages/player/ResultsPage'
import CareerPage from '../../../pages/player/CareerPage'
import WalletPage from '../../../pages/player/WalletPage'
import PrizesPage from '../../../pages/player/PrizesPage'
import TeamsPage from '../../../pages/player/TeamsPage'
import DisputesPage from '../../../pages/player/DisputesPage'
import NotificationsPage from '../../../pages/player/NotificationsPage'
import ProfilePage from '../../../pages/player/ProfilePage'
import SettingsPage from '../../../pages/player/SettingsPage'

export default function PlayerShell({ currentPath: initialPath = '/player', onSignOut }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('1000')
  const [withdrawUpi, setWithdrawUpi] = useState('shadow_k@oksbi')

  const {
    currentPath,
    navigate,
    demoMode,
    setDemoMode,
    loading,
    error,
    data,
    activeModal,
    setActiveModal,
    toasts,
    removeToast,
    handleCheckIn,
    handleWithdrawal,
    handleDisputeSubmit,
  } = usePlayerDashboard(initialPath)

  const player = data?.player
  const wallet = data?.wallet

  // Render subpage based on route
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/player/tournaments':
        return (
          <TournamentsPage
            onNavigate={navigate}
            demoMode={demoMode}
            nextMatch={data?.nextMatch}
            onOpenCheckIn={(match) => setActiveModal({ type: 'CHECK_IN', payload: match })}
          />
        )
      case '/player/matches':
        return (
          <MatchesPage
            onNavigate={navigate}
            demoMode={demoMode}
            onOpenCheckIn={(match) => setActiveModal({ type: 'CHECK_IN', payload: match })}
          />
        )
      case '/player/results':
        return (
          <ResultsPage
            onNavigate={navigate}
            demoMode={demoMode}
            onOpenDispute={(res) => setActiveModal({ type: 'DISPUTE', payload: res })}
          />
        )
      case '/player/career':
        return <CareerPage onNavigate={navigate} demoMode={demoMode} />
      case '/player/wallet':
        return (
          <WalletPage
            onNavigate={navigate}
            wallet={wallet}
            demoMode={demoMode}
            onOpenWithdraw={() => setActiveModal({ type: 'WITHDRAW', payload: wallet })}
          />
        )
      case '/player/prizes':
        return <PrizesPage onNavigate={navigate} demoMode={demoMode} />
      case '/player/teams':
        return <TeamsPage onNavigate={navigate} demoMode={demoMode} />
      case '/player/disputes':
        return (
          <DisputesPage
            onNavigate={navigate}
            demoMode={demoMode}
            onOpenNewDispute={() => setActiveModal({ type: 'NEW_DISPUTE' })}
          />
        )
      case '/player/notifications':
        return <NotificationsPage onNavigate={navigate} demoMode={demoMode} />
      case '/player/profile':
        return <ProfilePage onNavigate={navigate} player={player} demoMode={demoMode} onSignOut={onSignOut} />
      case '/player/settings':
        return <SettingsPage onNavigate={navigate} onSignOut={onSignOut} />
      case '/player':
      default:
        return (
          <DashboardHome
            data={data}
            loading={loading}
            error={error}
            onNavigate={navigate}
            onOpenCheckIn={(match) => setActiveModal({ type: 'CHECK_IN', payload: match })}
          />
        )
    }
  }

  return (
    <div className="player-app">
      {/* Desktop Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={navigate}
        player={player}
        onSignOut={onSignOut}
      />

      {/* Main Content Viewport */}
      <div className="player-main-area">
        <TopBar
          currentPath={currentPath}
          onNavigate={navigate}
          player={player}
          wallet={wallet}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          onOpenMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
          onSignOut={onSignOut}
        />

        <main className="player-content-container">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Navigation Drawer and Bottom Bar */}
      <MobileNav
        currentPath={currentPath}
        onNavigate={navigate}
        player={player}
        drawerOpen={mobileDrawerOpen}
        onCloseDrawer={() => setMobileDrawerOpen(false)}
        onToggleDrawer={() => setMobileDrawerOpen((prev) => !prev)}
        onSignOut={onSignOut}
      />

      {/* Modals */}
      {/* Check-In Modal */}
      <Modal
        isOpen={activeModal?.type === 'CHECK_IN'}
        onClose={() => setActiveModal(null)}
        title="Confirm Match Check-In"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.5 }}>
            You are confirming check-in for{' '}
            <strong>{activeModal?.payload?.tournamentName || 'Weekend Squad Clash'}</strong> (
            {activeModal?.payload?.matchNumber || 'Match 04'}).
          </p>
          <div
            style={{
              padding: '12px 14px',
              background: '#F6F7F9',
              borderRadius: '8px',
              border: '1px solid #E4E7EB',
              fontSize: '12.5px',
              color: '#111318',
            }}
          >
            <div><strong>Squad:</strong> {activeModal?.payload?.team?.name || 'Vortex Phantoms'}</div>
            <div><strong>Your Slot:</strong> {activeModal?.payload?.team?.slot || 'Slot #03'} (Fragger)</div>
            <div><strong>Time:</strong> {activeModal?.payload?.time || '8:00 PM'}</div>
          </div>
          <p style={{ fontSize: '12px', color: '#6B7078' }}>
            By checking in, your slot is locked and room credentials will become immediately accessible to you and your teammates.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => setActiveModal(null)}
              className="btn btn--secondary"
              style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button
              onClick={() => handleCheckIn(activeModal?.payload?.id || 'match_sq_04')}
              className="btn btn--primary"
              style={{ height: '38px', padding: '0 20px', fontSize: '13px' }}
            >
              Confirm Check-In
            </button>
          </div>
        </div>
      </Modal>

      {/* Withdrawal Modal */}
      <Modal
        isOpen={activeModal?.type === 'WITHDRAW'}
        onClose={() => setActiveModal(null)}
        title="Request Payout / Withdrawal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: '#6B7078' }}>
            Available balance: <strong>₹{wallet?.available_balance || 0}</strong>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
              Withdrawal Amount (₹)
            </label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="player-input"
              min="100"
              max={wallet?.available_balance || 5000}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
              UPI ID / VPA
            </label>
            <input
              type="text"
              value={withdrawUpi}
              onChange={(e) => setWithdrawUpi(e.target.value)}
              className="player-input"
              placeholder="e.g. name@upi"
            />
          </div>
          <p style={{ fontSize: '11.5px', color: '#6B7078', lineHeight: 1.4 }}>
            Withdrawals are processed via verified bank UPI transfer. Subject to platform settlement guidelines and KYC verification.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => setActiveModal(null)}
              className="btn btn--secondary"
              style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button
              onClick={() => handleWithdrawal(Number(withdrawAmount) || 100, withdrawUpi)}
              className="btn btn--primary"
              style={{ height: '38px', padding: '0 20px', fontSize: '13px' }}
            >
              Submit Request
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}

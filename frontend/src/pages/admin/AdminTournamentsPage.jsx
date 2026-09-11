// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN TOURNAMENTS PAGE (PLAYER-DASHBOARD-STYLE REBUILD)
//
// Matches Player tournament discovery experience:
// - Title + subtext
// - Yellow "+ Create Tournament" button
// - Tab filters: All, Live, Registration, Upcoming, Draft
// - Compact search and source/verification filters
// - 2-column image-led tournament card grid (NO compressed tables!)
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminTournamentCard from '../../components/admin/ui/AdminTournamentCard'
import {
  IoSearchOutline,
  IoAddOutline,
  IoFilterOutline
} from 'react-icons/io5'

export default function AdminTournamentsPage({ onNavigate }) {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sourceFilter, setSourceFilter] = useState('ALL')
  const [verificationFilter, setVerificationFilter] = useState('ALL')

  const fetchTournaments = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getTournaments(searchQuery, {
        status: statusFilter,
        source: sourceFilter,
        verification: verificationFilter
      })
      setTournaments(data)
    } catch (err) {
      console.error('Failed to load tournaments:', err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, statusFilter, sourceFilter, verificationFilter])

  useEffect(() => {
    fetchTournaments()
  }, [fetchTournaments])

  const tabs = [
    { id: 'ALL', label: 'All' },
    { id: 'LIVE', label: 'Live' },
    { id: 'REGISTRATION', label: 'Registration' },
    { id: 'UPCOMING', label: 'Upcoming' },
    { id: 'DRAFT', label: 'Draft' }
  ]

  return (
    <div className="admin-page-container">
      {/* ── 1. Header with Compact "+ Create Tournament" CTA ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Tournaments</h2>
          <p className="admin-page-header__subtitle">
            Manage platform tournaments and verified organizer tournaments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/admin/tournaments/new')}
          className="admin-btn admin-btn--yellow admin-btn--sm"
          id="admin-create-tournament-btn"
        >
          <IoAddOutline size={18} />
          <span>+ Create Tournament</span>
        </button>
      </div>

      {/* ── 2. Filter Tabs (All, Live, Registration, Upcoming, Draft) ── */}
      <div className="player-tabs-bar" role="tablist" aria-label="Tournament status filters">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.id}
            className={`player-tab-btn ${statusFilter === tab.id ? 'active' : ''}`}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. Search & Compact Filters Row ── */}
      <div className="admin-filters-bar">
        <div className="admin-filters-bar__search">
          <IoSearchOutline
            size={16}
            className="admin-filters-bar__search-icon"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tournaments..."
            className="admin-filters-bar__input"
            aria-label="Search tournaments"
          />
        </div>

        <div className="admin-filters-bar__selects">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="admin-filters-bar__select"
            aria-label="Filter by source"
          >
            <option value="ALL">All Sources</option>
            <option value="PLATFORM">Platform</option>
            <option value="ORGANIZER">Organizer</option>
          </select>

          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="admin-filters-bar__select"
            aria-label="Filter by verification"
          >
            <option value="ALL">All Verifications</option>
            <option value="PLATFORM_VERIFIED">Platform Verified</option>
            <option value="UNVERIFIED">Unverified</option>
          </select>
        </div>
      </div>

      {/* ── 4. 2-Column Responsive Tournament Cards Grid (Player Style) ── */}
      {loading ? (
        <div className="admin-loading-state">
          Loading tournaments...
        </div>
      ) : tournaments.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Tournaments Match Your Filters</h3>
          <p className="admin-empty-state__desc">
            Try adjusting your search query or status filter to see other platform competitions.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('ALL')
              setSourceFilter('ALL')
              setVerificationFilter('ALL')
            }}
            className="admin-btn admin-btn--secondary admin-btn--sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="player-tournaments-2col-grid">
          {tournaments.map((t) => (
            <AdminTournamentCard
              key={t.id}
              tournament={t}
              onManage={(id) => onNavigate(`/admin/tournaments/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

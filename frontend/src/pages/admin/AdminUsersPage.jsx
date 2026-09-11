// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN USERS DIRECTORY PAGE (PLAYER-STYLE REBUILD)
//
// Clean user directory matching Player Dashboard compact list/card language:
// Mobile:
//   ○ SHADOW_K
//     PLAYER
//     UID ·••••••••
//     Active
//     View Profile →
// Desktop:
//   Clean, spacious list/table hybrid.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import {
  IoSearchOutline,
  IoPersonCircleOutline,
  IoShieldCheckmarkOutline,
  IoClose,
  IoArrowForward
} from 'react-icons/io5'

export default function AdminUsersPage({ onRequestConfirmation, onToast }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getUsers(searchQuery, {
        role: roleFilter,
        status: statusFilter
      })
      setUsers(data)
    } catch (err) {
      console.error('Failed to load users:', err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, roleFilter, statusFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleModeration = (user, action) => {
    onRequestConfirmation({
      title: `${action} User Account: ${user.ign}`,
      message: `Change account standing of ${user.ign} (${user.id}) to ${action}?`,
      actionLabel: `Execute ${action}`,
      actionType: action === 'SUSPEND' || action === 'RESTRICT' ? 'DANGER' : 'PRIMARY',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.updateUserStatus(user.id, action, reason)
        setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
        if (selectedUser?.id === updated.id) {
          setSelectedUser({ ...updated })
        }
        onToast(`User status updated to ${updated.status}`, 'success')
      }
    })
  }

  const maskUid = (uid) => {
    if (!uid) return '••••••••'
    return `${uid.slice(0, 3)}•••••`
  }

  return (
    <div className="admin-page-container">
      {/* ── 1. Page Header ── */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h2 className="admin-page-header__title">Users</h2>
          <p className="admin-page-header__subtitle">
            Manage players, organizers, and platform governance accounts.
          </p>
        </div>
      </div>

      {/* ── 2. Search and Compact Filters ── */}
      <div className="admin-filters-bar">
        <div className="admin-filters-bar__search">
          <IoSearchOutline size={16} className="admin-filters-bar__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IGN, UID or email..."
            className="admin-filters-bar__input"
            aria-label="Search users"
          />
        </div>

        <div className="admin-filters-bar__selects">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="admin-filters-bar__select"
            aria-label="Filter by role"
          >
            <option value="ALL">All Roles</option>
            <option value="PLAYER">Players</option>
            <option value="ORGANIZER">Organizers</option>
            <option value="ADMIN">Admins</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-filters-bar__select"
            aria-label="Filter by status"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="RESTRICTED">Restricted</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* ── 3. Content: Mobile Cards & Desktop Table ── */}
      {loading ? (
        <div className="admin-loading-state">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="admin-empty-state">
          <h3 className="admin-empty-state__title">No Users Found</h3>
          <p className="admin-empty-state__desc">No user accounts matched your search or filters.</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Compact Player-style User Cards */}
          <div className="admin-mobile-list">
            {users.map((u) => (
              <article
                key={u.id}
                className="admin-user-card"
                onClick={() => setSelectedUser(u)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedUser(u) }}
              >
                <div className="admin-user-card__top">
                  <div className="admin-user-card__avatar-dot">○</div>
                  <div className="admin-user-card__ident">
                    <h3 className="admin-user-card__ign">{u.ign}</h3>
                    <div className="admin-user-card__role">{u.role}</div>
                    <div className="admin-user-card__uid">UID ·{maskUid(u.playerUid)}</div>
                  </div>
                  <div className="admin-user-card__badge-wrap">
                    <AdminStatusBadge type="status" status={u.status} />
                  </div>
                </div>

                <div className="admin-user-card__footer">
                  <span className="admin-user-card__action">
                    <span>View Profile</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP: Clean Table */}
          <div className="admin-desktop-table admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User & IGN</th>
                  <th>Role</th>
                  <th>In-Game UID</th>
                  <th>Tournaments</th>
                  <th>Reputation</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IoPersonCircleOutline size={22} style={{ color: 'var(--admin-grey)' }} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '13px' }}>{u.ign}</div>
                          <span style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-role-pill">{u.role}</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--admin-grey)' }}>
                        {u.playerUid}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{u.tournamentsPlayed}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: u.reputationScore >= 90 ? '#166534' : '#B45309' }}>
                        {u.reputationScore}%
                      </span>
                    </td>
                    <td>
                      <AdminStatusBadge type="status" status={u.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(u)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── 4. User Profile & Governance Modal ── */}
      {selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoShieldCheckmarkOutline size={18} style={{ color: 'var(--admin-yellow)' }} />
                <h3 className="admin-modal__title">User Profile Governance</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="admin-modal__close-btn"
                aria-label="Close user profile modal"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="admin-modal__body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>{selectedUser.ign}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--admin-grey)', marginTop: '2px' }}>
                    {selectedUser.role} · ID: {selectedUser.id}
                  </div>
                </div>
                <AdminStatusBadge type="status" status={selectedUser.status} />
              </div>

              <div className="admin-info-box" style={{ marginBottom: '14px' }}>
                <div className="admin-info-row">
                  <span>Free Fire UID:</span>
                  <strong>{selectedUser.playerUid}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Email:</span>
                  <strong>{selectedUser.email}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Tournaments Competed:</span>
                  <strong>{selectedUser.tournamentsPlayed}</strong>
                </div>
                <div className="admin-info-row">
                  <span>Reputation Score:</span>
                  <strong>{selectedUser.reputationScore}%</strong>
                </div>
                <div className="admin-info-row">
                  <span>Registered Date:</span>
                  <strong>{selectedUser.createdAt}</strong>
                </div>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--admin-grey)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Governance Standing & Enforcement
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedUser.status !== 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => handleModeration(selectedUser, 'ACTIVE')}
                    className="admin-btn admin-btn--yellow admin-btn--sm"
                  >
                    Restore Active
                  </button>
                )}
                {selectedUser.status !== 'RESTRICTED' && (
                  <button
                    type="button"
                    onClick={() => handleModeration(selectedUser, 'RESTRICT')}
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                  >
                    Restrict Account
                  </button>
                )}
                {selectedUser.status !== 'SUSPENDED' && (
                  <button
                    type="button"
                    onClick={() => handleModeration(selectedUser, 'SUSPEND')}
                    className="admin-btn admin-btn--danger admin-btn--sm"
                  >
                    Suspend Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

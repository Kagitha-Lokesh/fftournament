// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN ORGANIZERS PAGE (MOBILE-FIRST REDESIGN)
//
// Organizer governance with mobile stacked cards and desktop table.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { adminService } from '../../services/adminService'
import AdminStatusBadge from '../../components/admin/ui/AdminStatusBadge'
import { IoSearchOutline, IoEyeOutline, IoShieldCheckmark, IoDocumentTextOutline } from 'react-icons/io5'

export default function AdminOrganizersPage({ onRequestConfirmation, onToast }) {
  const [organizers, setOrganizers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [verificationFilter, setVerificationFilter] = useState('ALL')
  const [selectedOrganizer, setSelectedOrganizer] = useState(null)

  const fetchOrganizers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminService.getOrganizers(searchQuery, {
        verification: verificationFilter
      })
      setOrganizers(data)
    } catch (err) {
      console.error('Failed to load organizers:', err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, verificationFilter])

  useEffect(() => {
    fetchOrganizers()
  }, [fetchOrganizers])

  const handleVerify = (organizer, decision) => {
    onRequestConfirmation({
      title: `${decision === 'APPROVE' ? 'Approve' : decision} Organizer: ${organizer.name}`,
      message: `Modify institutional verification standing for ${organizer.name}.`,
      actionLabel: `${decision} Organizer`,
      actionType: decision === 'APPROVE' ? 'PRIMARY' : 'DANGER',
      requiresReason: true,
      onConfirm: async (reason) => {
        const updated = await adminService.verifyOrganizer(organizer.id, decision, reason)
        setOrganizers(prev => prev.map(o => o.id === updated.id ? updated : o))
        if (selectedOrganizer?.id === updated.id) {
          setSelectedOrganizer({ ...updated })
        }
        onToast(`Organizer status updated to ${updated.verificationStatus}`, 'success')
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--admin-ink)' }}>
          Organizers
        </h2>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--admin-grey)' }}>
          Review host applications, inspect submitted credentials, and oversee tournament execution.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: '10px 12px',
          borderRadius: 'var(--admin-radius)',
          border: '1px solid var(--admin-border)'
        }}
      >
        <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
          <IoSearchOutline
            size={16}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-grey)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organizer name or handle..."
            style={{
              width: '100%',
              padding: '6px 10px 6px 32px',
              borderRadius: 'var(--admin-radius-sm)',
              border: '1px solid var(--admin-border)',
              fontSize: '12.5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={verificationFilter}
          onChange={(e) => setVerificationFilter(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--admin-radius-sm)',
            border: '1px solid var(--admin-border)',
            fontSize: '12px',
            backgroundColor: '#FFFFFF'
          }}
        >
          <option value="ALL">All States</option>
          <option value="VERIFIED">Verified Only</option>
          <option value="PENDING_VERIFICATION">Pending Review</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: '36px', textAlign: 'center', color: 'var(--admin-grey)' }}>Loading organizers...</div>
      ) : organizers.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '36px 16px' }}>
          <p style={{ fontWeight: 700, margin: 0 }}>No Organizers Found</p>
        </div>
      ) : (
        <>
          {/* MOBILE: Clean Cards */}
          <div className="admin-mobile-list">
            {organizers.map(o => (
              <div key={o.id} className="admin-entity-card">
                <div className="admin-entity-card__header">
                  <div>
                    <h3 className="admin-entity-card__title">{o.name}</h3>
                    <div className="admin-entity-card__sub">{o.handle} · {o.primaryContact}</div>
                  </div>
                  <AdminStatusBadge type="verification" status={o.verificationStatus} />
                </div>

                <div className="admin-entity-card__details">
                  <span>Tournaments: <strong>{o.tournamentsTotal}</strong></span>
                  <span>Disbursed: <strong>₹{o.totalPrizePoolDisbursed.toLocaleString()}</strong></span>
                  <span>Rep: <strong>{o.reputationScore}%</strong></span>
                </div>

                <div className="admin-entity-card__footer">
                  <button
                    type="button"
                    onClick={() => setSelectedOrganizer(o)}
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                    style={{ width: '100%' }}
                  >
                    <span>Review Dossier →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: Table */}
          <div className="admin-desktop-table admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Organizer</th>
                  <th>Verification</th>
                  <th>Standing</th>
                  <th>Hosted</th>
                  <th>Disbursed</th>
                  <th>Reputation</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map(o => (
                  <tr key={o.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>{o.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--admin-grey)' }}>{o.handle}</div>
                    </td>
                    <td><AdminStatusBadge type="verification" status={o.verificationStatus} /></td>
                    <td><span style={{ fontSize: '12px', fontWeight: 600 }}>{o.standing}</span></td>
                    <td style={{ fontSize: '12.5px' }}>{o.tournamentsTotal} ({o.tournamentsActive} active)</td>
                    <td style={{ fontWeight: 700 }}>₹{o.totalPrizePoolDisbursed.toLocaleString()}</td>
                    <td><strong>{o.reputationScore}%</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedOrganizer(o)}
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                      >
                        <IoEyeOutline size={14} />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Review Dossier Modal */}
      {selectedOrganizer && (
        <div className="admin-modal-overlay" style={{ zIndex: 1050 }}>
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Organizer Dossier</h3>
              <button
                type="button"
                onClick={() => setSelectedOrganizer(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--admin-grey)' }}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal__body">
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>{selectedOrganizer.name}</h4>
                <div style={{ fontSize: '12px', color: 'var(--admin-grey)', marginTop: '2px' }}>
                  {selectedOrganizer.handle} · Contact: {selectedOrganizer.primaryContact}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <strong style={{ fontSize: '12px' }}>Submitted Credentials (Synthetic Proof)</strong>
                {selectedOrganizer.submittedDocuments.map((doc, idx) => (
                  <div key={idx} style={{ padding: '8px 10px', backgroundColor: 'var(--admin-light-grey)', borderRadius: '6px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IoDocumentTextOutline size={15} />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-modal__footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {selectedOrganizer.verificationStatus !== 'VERIFIED' && (
                  <button
                    type="button"
                    onClick={() => handleVerify(selectedOrganizer, 'APPROVE')}
                    className="admin-btn admin-btn--yellow admin-btn--sm"
                  >
                    <IoShieldCheckmark size={14} />
                    <span>Approve</span>
                  </button>
                )}
                {selectedOrganizer.verificationStatus !== 'REJECTED' && (
                  <button
                    type="button"
                    onClick={() => handleVerify(selectedOrganizer, 'REJECT')}
                    className="admin-btn admin-btn--danger admin-btn--sm"
                  >
                    Reject
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrganizer(null)}
                className="admin-btn admin-btn--secondary admin-btn--sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

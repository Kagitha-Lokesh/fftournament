// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER DISPUTES PAGE
//
// Platform Dispute Lifecycle:
// OPEN -> UNDER_REVIEW -> NEEDS_INFORMATION -> RESOLVED
// Organizers provide evidence and match records; Platform Arbiters adjudicate.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoDocumentTextOutline,
  IoChatbubbleOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'

export default function OrganizerDisputesPage({ demoMode }) {
  const [disputes, setDisputes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replySuccess, setReplySuccess] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getDisputes(demoMode)
      setDisputes(list)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const handleSendEvidence = async (e) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedDispute) return

    await organizerService.submitDisputeEvidence(selectedDispute.id, replyText)
    setReplySuccess(true)
    setTimeout(() => {
      setReplySuccess(false)
      setReplyText('')
      setSelectedDispute(null)
    }, 1200)
  }

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Disputes & Inquiries</h1>
          <p className="player-subpage-desc">
            Provide match records, endscreen proofs, and referee statements to Platform Arbiters.
          </p>
        </div>
      </div>

      {disputes.length > 0 ? (
        <div className="org-mobile-card-stack">
          {disputes.map((d) => (
            <div key={d.id} className="org-item-card">
              <div className="org-item-card__header">
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706' }}>Case #{d.id}</span>
                  <h3 className="org-item-card__title" style={{ marginTop: '2px' }}>{d.title}</h3>
                  <div className="org-item-card__subtitle">
                    {d.tournamentName} · {d.matchNumber} · Filed by {d.filerName}
                  </div>
                </div>
                <OrganizerStatusBadge status={d.status} />
              </div>

              <div className="org-item-card__row">
                <span style={{ fontSize: '12px', color: '#6B7078' }}>
                  Latest update: <strong>{d.lastUpdate}</strong>
                </span>
                <button
                  onClick={() => setSelectedDispute(d)}
                  className="btn btn--secondary"
                  style={{ height: '32px', padding: '0 14px', fontSize: '12px' }}
                >
                  View Case Timeline
                </button>
              </div>

              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  background: '#F9FAFB',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  color: '#4B5563',
                }}
              >
                <strong>Operator Role:</strong> {d.organizerRole}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No active disputes"
          description="All tournament matches have verified and undisputed outcomes."
        />
      )}

      {/* Case Timeline & Response Modal */}
      <Modal
        isOpen={Boolean(selectedDispute)}
        onClose={() => setSelectedDispute(null)}
        title={`Dispute Case #${selectedDispute?.id || ''}`}
      >
        {selectedDispute && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>{selectedDispute.title}</h3>
                <span style={{ fontSize: '12px', color: '#6B7078' }}>
                  {selectedDispute.tournamentName} · {selectedDispute.matchNumber}
                </span>
              </div>
              <OrganizerStatusBadge status={selectedDispute.status} />
            </div>

            {/* Timeline */}
            <div style={{ border: '1px solid #E4E7EB', borderRadius: '8px', padding: '12px', background: '#F9FAFB' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6B7078', textTransform: 'uppercase' }}>
                AUDIT TIMELINE
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                {selectedDispute.timeline?.map((entry, idx) => (
                  <div key={idx} style={{ fontSize: '12.5px', borderLeft: '2px solid #D1D5DB', paddingLeft: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7078', fontSize: '11px' }}>
                      <strong>{entry.author}</strong>
                      <span>{entry.time}</span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', color: '#111318' }}>{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Response Form */}
            <form onSubmit={handleSendEvidence} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label className="org-form-label">SUBMIT REFEREE EVIDENCE / STATEMENT</label>
              <textarea
                className="org-form-textarea"
                placeholder="Provide endscreen image hash, match room screenshot link, or referee statement..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />

              {replySuccess && (
                <div style={{ color: '#166534', fontSize: '12px', fontWeight: 600 }}>
                  ✓ Statement forwarded to Platform Integrity Arbiter!
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="btn btn--secondary"
                  style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
                >
                  Submit Evidence
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  )
}

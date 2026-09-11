import React, { useState, useEffect } from 'react'
import {
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
  IoTimeOutline,
  IoChatbubblesOutline,
  IoAddOutline,
  IoArrowForwardOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { playerService } from '../../services/playerService'

export default function DisputesPage({ onNavigate, demoMode, onOpenNewDispute }) {
  const [disputes, setDisputes] = useState([])
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [newDisputeModal, setNewDisputeModal] = useState(false)
  const [disputeTitle, setDisputeTitle] = useState('')
  const [disputeDesc, setDisputeDesc] = useState('')

  useEffect(() => {
    async function load() {
      const data = await playerService.getDisputes(demoMode)
      setDisputes(data || [])
    }
    load()
  }, [demoMode])

  return (
    <div className="player-subpage">
      {/* ── 1. Page Header ── */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Competition Integrity</h1>
          <p className="player-subpage-desc">
            Manage result and tournament disputes.
          </p>
        </div>
        <button
          onClick={() => setNewDisputeModal(true)}
          className="btn btn--primary player-dispute-file-btn"
        >
          <IoAddOutline size={16} />
          <span>File a Dispute</span>
        </button>
      </div>

      {/* ── 2. Disputes List of Clean Case Cards ── */}
      {disputes.length > 0 ? (
        <div className="player-disputes-clean-stack">
          {disputes.map((dsp) => (
            <div
              key={dsp.id}
              className="player-dispute-case-card"
              onClick={() => setSelectedDispute(dsp)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedDispute(dsp)
                }
              }}
            >
              {/* Card Header */}
              <div className="player-dispute-case-card__header">
                <span className="player-pill player-pill--sm">
                  Case #{dsp.id.toUpperCase()}
                </span>
                <StatusBadge status={dsp.status} size="sm" />
              </div>

              {/* Title & Match */}
              <h2 className="player-dispute-case-card__title">{dsp.title}</h2>
              <div className="player-dispute-case-card__match-info">
                <span>{dsp.tournamentName}</span>
                <span className="player-bullet">•</span>
                <span>{dsp.matchNumber}</span>
                <span className="player-bullet">•</span>
                <span>Filed {dsp.dateFiled}</span>
              </div>

              {/* Footer */}
              <div className="player-dispute-case-card__footer">
                <div className="player-dispute-case-card__update">
                  <IoTimeOutline size={14} />
                  <span>{dsp.lastUpdate || 'Updated recently'}</span>
                </div>
                <span className="player-dispute-case-card__view-link">
                  View Case →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<IoShieldCheckmarkOutline size={26} />}
          title="No active disputes"
          description="All tournament results and matches are running smoothly with no contested cases."
          actionLabel="File a Dispute"
          onAction={() => setNewDisputeModal(true)}
        />
      )}

      {/* ── 3. Dedicated Dispute Detail Modal with Vertical Timeline ── */}
      <Modal
        isOpen={Boolean(selectedDispute)}
        onClose={() => setSelectedDispute(null)}
        title={selectedDispute ? `Case #${selectedDispute.id.toUpperCase()}` : 'Dispute Details'}
      >
        {selectedDispute && (
          <div className="player-dispute-detail-modal">
            <div className="player-dispute-detail-modal__header">
              <div>
                <h3 className="player-dispute-detail-modal__title">
                  {selectedDispute.title}
                </h3>
                <p className="player-dispute-detail-modal__subtitle">
                  {selectedDispute.tournamentName} · {selectedDispute.matchNumber}
                </p>
              </div>
              <StatusBadge status={selectedDispute.status} />
            </div>

            <div className="player-dispute-detail-modal__meta-bar">
              <span>Date Filed: <strong>{selectedDispute.dateFiled}</strong></span>
              <span className="player-bullet">•</span>
              <span>Status: <strong>{selectedDispute.status?.replace('_', ' ')}</strong></span>
            </div>

            {/* Vertical Timeline */}
            <div className="player-dispute-vertical-timeline">
              <h4 className="player-dispute-timeline-heading">Resolution History</h4>
              {selectedDispute.timeline && selectedDispute.timeline.length > 0 ? (
                <div className="player-dispute-timeline-tree">
                  {selectedDispute.timeline.map((step, idx) => (
                    <div key={idx} className="player-dispute-timeline-step">
                      <div className="player-dispute-timeline-marker">
                        <div className="player-dispute-timeline-node" />
                        {idx < selectedDispute.timeline.length - 1 && (
                          <div className="player-dispute-timeline-stem" />
                        )}
                      </div>
                      <div className="player-dispute-timeline-body">
                        <div className="player-dispute-timeline-meta">
                          <strong className="player-dispute-timeline-author">{step.author}</strong>
                          <span className="player-dispute-timeline-time">{step.time}</span>
                        </div>
                        <p className="player-dispute-timeline-desc">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: '#6B7078' }}>
                  No timeline entries recorded yet.
                </p>
              )}
            </div>

            <div className="player-dispute-detail-modal__footer">
              <button
                onClick={() => setSelectedDispute(null)}
                className="btn btn--secondary"
                style={{ height: '36px', padding: '0 18px', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── 4. File Dispute Modal ── */}
      <Modal
        isOpen={newDisputeModal}
        onClose={() => setNewDisputeModal(false)}
        title="File Competition Dispute"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
              Tournament / Match
            </label>
            <input
              type="text"
              defaultValue="Weekend Squad Clash — Match 04"
              className="player-input"
              readOnly
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
              Issue Category
            </label>
            <select className="player-input">
              <option>Score / Kill Count Tally Discrepancy</option>
              <option>Unregistered / Unverified Player Substitution</option>
              <option>Third-Party Modification / Fair Play Violation</option>
              <option>Match Room Disconnection / Host Premature Start</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
              Description & Evidence Link
            </label>
            <textarea
              rows={3}
              placeholder="Describe the discrepancy and attach screenshot or video link..."
              value={disputeDesc}
              onChange={(e) => setDisputeDesc(e.target.value)}
              className="player-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <p style={{ fontSize: '11.5px', color: '#6B7078', lineHeight: 1.4 }}>
            Frivolous or bad-faith dispute submissions may impact competitor reputation score. Attach verifiable endscreen proof.
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => setNewDisputeModal(false)}
              className="btn btn--secondary"
              style={{ height: '36px' }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setNewDisputeModal(false)
                alert('Dispute submitted for arbiter review.')
              }}
              className="btn btn--primary"
              style={{ height: '36px' }}
            >
              Submit to Arbiters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

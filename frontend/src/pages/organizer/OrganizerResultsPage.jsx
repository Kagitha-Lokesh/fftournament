// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ORGANIZER RESULTS PAGE
//
// Formal Results Lifecycle:
// Draft -> Submitted -> Under Review -> Confirmed -> Finalized
// Result entry scoring calculator, review & submit workflow.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5'
import OrganizerStatusBadge from '../../components/organizer/ui/OrganizerStatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { organizerService } from '../../services/organizerService'
import { formatCurrency } from '../../utils/formatters'

export default function OrganizerResultsPage({ demoMode }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResult, setSelectedResult] = useState(null)
  const [isEntryOpen, setIsEntryOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Interactive Score Entry Form
  const [scoreRows, setScoreRows] = useState([
    { placement: 1, participantName: 'GHOST_SNIPER', kills: 7, points: 19, prize: 800 },
    { placement: 2, participantName: 'CYBER_VIPER', kills: 5, points: 14, prize: 450 },
    { placement: 3, participantName: 'SHADOW_K', kills: 4, points: 11, prize: 250 },
    { placement: 4, participantName: 'DELTA_FORCE', kills: 3, points: 8, prize: 0 },
    { placement: 5, participantName: 'RAZE_SPEED', kills: 2, points: 6, prize: 0 },
  ])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const list = await organizerService.getResults(demoMode)
      setResults(list)
      setLoading(false)
    }
    load()
  }, [demoMode])

  const updateRow = (idx, field, val) => {
    setScoreRows((prev) => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
  }

  const handleSubmitScores = async () => {
    setSubmitting(true)
    try {
      const res = await organizerService.submitMatchResults('org_m_03', scoreRows)
      setSubmitMessage(res.message)
      const updated = await organizerService.getResults(demoMode)
      setResults(updated)
      setTimeout(() => {
        setIsEntryOpen(false)
        setSubmitMessage('')
      }, 1500)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="player-subpage">
      {/* Header */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Results Management</h1>
          <p className="player-subpage-desc">
            Submit match scorecards for platform review. Permanent competitive records finalize upon verification.
          </p>
        </div>
        <button
          onClick={() => setIsEntryOpen(true)}
          className="btn btn--primary"
          style={{ height: '38px', padding: '0 16px', fontSize: '13px', gap: '6px' }}
        >
          <IoAddCircleOutline size={17} />
          <span>Enter Match Scores</span>
        </button>
      </div>

      {/* Results Feed */}
      {results.length > 0 ? (
        <div className="org-mobile-card-stack">
          {results.map((res) => {
            const isFinalized = res.status === 'Finalized'
            return (
              <div key={res.id} className="org-item-card">
                <div className="org-item-card__header">
                  <div>
                    <h3 className="org-item-card__title" style={{ fontSize: '15.5px' }}>
                      {res.tournamentName}
                    </h3>
                    <div className="org-item-card__subtitle">
                      {res.matchNumber} · Mode: {res.mode} · {res.date}
                    </div>
                  </div>
                  <OrganizerStatusBadge status={res.status} />
                </div>

                <div className="org-item-card__row">
                  <span style={{ fontSize: '12px', color: '#6B7078' }}>
                    {res.scoreboard?.length || 0} Placements Logged · Submitted by{' '}
                    <strong>{res.submittedBy || 'Operator'}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedResult(res)}
                    className="btn btn--secondary"
                    style={{ height: '32px', padding: '0 14px', fontSize: '12px' }}
                  >
                    View Scorecard
                  </button>
                </div>

                {isFinalized && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '8px 12px',
                      background: '#F9FAFB',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      color: '#4B5563',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <IoShieldCheckmarkOutline size={15} color="#166534" />
                    <span>
                      Finalized record. Post-settlement changes require elevated Admin authorization and audit logging.
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="No results records"
          description="Completed matches awaiting score entry will appear here."
          actionLabel="Enter Match Scores"
          onAction={() => setIsEntryOpen(true)}
        />
      )}

      {/* Scorecard Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedResult)}
        onClose={() => setSelectedResult(null)}
        title={selectedResult?.matchNumber || 'Scorecard Record'}
      >
        {selectedResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>{selectedResult.tournamentName}</div>
                <div style={{ fontSize: '12px', color: '#6B7078' }}>
                  {selectedResult.mode} · Recorded {selectedResult.date}
                </div>
              </div>
              <OrganizerStatusBadge status={selectedResult.status} />
            </div>

            {/* Scorecard Table */}
            <div className="org-table-wrapper">
              <table className="org-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Participant / Team</th>
                    <th>Kills</th>
                    <th>Total Pts</th>
                    <th style={{ textAlign: 'right' }}>Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResult.scoreboard?.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <span style={{ fontWeight: 800, color: row.placement === 1 ? '#D97706' : '#111318' }}>
                          #{row.placement}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700 }}>{row.participantName || row.teamName}</span>
                      </td>
                      <td>{row.kills}</td>
                      <td>
                        <strong>{row.points}</strong>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: row.prize > 0 ? '#166534' : '#6B7078' }}>
                        {row.prize > 0 ? formatCurrency(row.prize) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => setSelectedResult(null)}
                className="btn btn--primary"
                style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Enter Scores Modal */}
      <Modal
        isOpen={isEntryOpen}
        onClose={() => setIsEntryOpen(false)}
        title="Enter Match Results & Scores"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '12.5px', color: '#6B7078', margin: 0 }}>
            Enter placement, kill tally, and verified points for <strong>Solo Ranked Cup (Week 15)</strong>.
            Submissions are queued in <em>Under Review</em> state for verification.
          </p>

          <div className="org-table-wrapper">
            <table className="org-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th>Player / Squad</th>
                  <th style={{ width: '80px' }}>Kills</th>
                  <th style={{ width: '80px' }}>Points</th>
                  <th style={{ width: '100px', textAlign: 'right' }}>Prize (₹)</th>
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <span style={{ fontWeight: 800 }}>#{row.placement}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.participantName}
                        onChange={(e) => updateRow(idx, 'participantName', e.target.value)}
                        className="org-form-input"
                        style={{ height: '32px', fontSize: '12px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.kills}
                        onChange={(e) => updateRow(idx, 'kills', Number(e.target.value))}
                        className="org-form-input"
                        style={{ height: '32px', fontSize: '12px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.points}
                        onChange={(e) => updateRow(idx, 'points', Number(e.target.value))}
                        className="org-form-input"
                        style={{ height: '32px', fontSize: '12px' }}
                      />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <input
                        type="number"
                        value={row.prize}
                        onChange={(e) => updateRow(idx, 'prize', Number(e.target.value))}
                        className="org-form-input"
                        style={{ height: '32px', fontSize: '12px', textAlign: 'right' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {submitMessage && (
            <div style={{ color: '#166534', fontSize: '12.5px', fontWeight: 600 }}>
              ✓ {submitMessage}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => setIsEntryOpen(false)}
              className="btn btn--secondary"
              style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitScores}
              disabled={submitting}
              className="btn btn--primary"
              style={{ height: '36px', padding: '0 18px', fontSize: '12.5px' }}
            >
              {submitting ? 'Submitting...' : 'Confirm & Submit for Review'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

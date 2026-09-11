import React, { useState, useEffect } from 'react'
import {
  IoReceiptOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { playerService } from '../../services/playerService'
import { formatCurrency } from '../../utils/formatters'

export default function ResultsPage({ onNavigate, demoMode }) {
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)

  useEffect(() => {
    async function load() {
      const data = await playerService.getPlayerResults(demoMode)
      setResults(data)
    }
    load()
  }, [demoMode])

  return (
    <div className="player-subpage">
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Results</h1>
          <p className="player-subpage-desc">
            Verified tournament standings, kill statistics, and evidence records.
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="player-results-clean-stack">
          {results.map((res) => (
            <div key={res.id} className="player-result-clean-card">
              <div className="player-result-clean-card__rank">
                <span className={`player-rank-badge ${res.placement === '#1' ? 'player-rank-badge--champion' : ''}`}>
                  {res.placement}
                </span>
              </div>

              <div className="player-result-clean-card__body">
                <h3 className="player-result-clean-card__name">{res.tournamentName}</h3>
                <div className="player-result-clean-card__meta">
                  <span className="player-result-clean-card__verified">
                    <IoCheckmarkCircle size={14} color="#166534" />
                    <span>Verified result</span>
                  </span>
                  <span className="player-bullet">•</span>
                  <span>Kills: {res.kills}</span>
                  <span className="player-bullet">•</span>
                  <span>Points: {res.totalPoints}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedResult(res)}
                className="btn btn--secondary"
                style={{ height: '36px', padding: '0 14px', fontSize: '12.5px', flexShrink: 0 }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<IoReceiptOutline size={24} />}
          title="No tournament results yet"
          description="Verified match standings will be recorded here after tournament conclusion."
          actionLabel="Explore Tournaments"
          onAction={() => onNavigate('/player/tournaments')}
        />
      )}

      {/* Result Detail Modal */}
      <Modal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        title="Result Details"
        maxWidth="500px"
      >
        {selectedResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                background: '#F6F7F9',
                borderRadius: '8px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: '#6B7078', fontWeight: 700 }}>PLACEMENT</span>
                <div style={{ fontSize: '22px', fontWeight: 900, color: selectedResult.placement === '#1' ? '#b45309' : '#111318' }}>
                  {selectedResult.placement}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#6B7078', fontWeight: 700 }}>TOTAL POINTS</span>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#111318' }}>
                  {selectedResult.totalPoints}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#6B7078', fontWeight: 700 }}>PRIZE</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534' }}>
                  {selectedResult.prizeAwarded > 0 ? formatCurrency(selectedResult.prizeAwarded) : '—'}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#4B5563' }}>
              <div>Tournament: <strong>{selectedResult.tournamentName}</strong></div>
              <div>Squad: <strong>{selectedResult.team}</strong></div>
              <div>Match Date: <strong>{selectedResult.date}</strong></div>
              <div>Verified Evidence: <code style={{ background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{selectedResult.evidence_hash}</code></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setSelectedResult(null)
                  onNavigate('/player/disputes')
                }}
                className="btn btn--secondary"
                style={{ height: '36px', fontSize: '12px', color: '#B91C1C' }}
              >
                Report Discrepancy
              </button>

              <button
                onClick={() => setSelectedResult(null)}
                className="btn btn--primary"
                style={{ height: '36px', padding: '0 18px', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

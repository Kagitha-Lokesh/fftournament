import React, { useState, useEffect } from 'react'
import { IoTrophyOutline, IoStatsChartOutline } from 'react-icons/io5'
import EmptyState from '../../components/player/ui/EmptyState'
import { playerService } from '../../services/playerService'
import { formatCurrency, formatNumber } from '../../utils/formatters'

export default function CareerPage({ onNavigate, demoMode }) {
  const [career, setCareer] = useState(null)
  const [results, setResults] = useState([])

  useEffect(() => {
    async function load() {
      const [cData, rData] = await Promise.all([
        playerService.getCareerStats(demoMode),
        playerService.getPlayerResults(demoMode),
      ])
      setCareer(cData)
      setResults(rData)
    }
    load()
  }, [demoMode])

  if (!career || career.matches === 0) {
    return (
      <div className="player-subpage">
        <div className="player-subpage-header">
          <div>
            <h1 className="player-subpage-title">Your Career</h1>
            <p className="player-subpage-desc">Your persistent competitive history across verified tournaments.</p>
          </div>
        </div>
        <EmptyState
          icon={<IoStatsChartOutline size={24} />}
          title="No career record yet"
          description="Every match you complete on FF WAR becomes part of your persistent competitive history."
          actionLabel="Find Tournaments"
          onAction={() => onNavigate('/player/tournaments')}
        />
      </div>
    )
  }

  return (
    <div className="player-subpage">
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">Your Career</h1>
          <p className="player-subpage-desc">
            Your persistent competitive record, verified tournament wins, and match history.
          </p>
        </div>
      </div>

      {/* 4 Core Summary Metrics */}
      <div className="player-career-clean-summary">
        <div className="player-career-metric-card">
          <span className="player-career-metric-val">{formatNumber(career.tournaments)}</span>
          <span className="player-career-metric-lbl">Tournaments</span>
        </div>
        <div className="player-career-metric-card">
          <span className="player-career-metric-val">{formatNumber(career.matches)}</span>
          <span className="player-career-metric-lbl">Matches</span>
        </div>
        <div className="player-career-metric-card">
          <span className="player-career-metric-val player-career-metric-val--gold">{formatNumber(career.wins)}</span>
          <span className="player-career-metric-lbl">Wins</span>
        </div>
        <div className="player-career-metric-card">
          <span className="player-career-metric-val">{formatNumber(career.kills)}</span>
          <span className="player-career-metric-lbl">Kills</span>
        </div>
      </div>

      {/* Recent Form Strip: W · #2 · #5 · W · #3 */}
      {career.recentForm && career.recentForm.length > 0 && (
        <div className="player-card-module">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>Recent Form</h3>
              <span style={{ fontSize: '12px', color: '#6B7078' }}>Last 5 tournament finishes</span>
            </div>
            <div className="player-form-pills-clean">
              {career.recentForm.slice(0, 5).map((form, i) => (
                <span
                  key={i}
                  className={`player-form-pill-clean ${form === '#1' ? 'gold' : ''}`}
                >
                  {form === '#1' ? 'W' : form}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clean Chronological Result History List */}
      <div className="player-card-module">
        <div className="player-card-module__header">
          <div>
            <h3 className="player-card-module__title">Match History</h3>
            <span className="player-card-module__subtitle">Chronological verified tournament matches</span>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="player-chronological-results-list">
            {results.map((res) => (
              <div key={res.id} className="player-chronological-row">
                <div className="player-chronological-row__rank">
                  <span className={`player-rank-badge ${res.placement === '#1' ? 'player-rank-badge--champion' : ''}`}>
                    {res.placement}
                  </span>
                </div>
                <div className="player-chronological-row__body">
                  <h4 className="player-chronological-row__name">{res.tournamentName}</h4>
                  <div className="player-chronological-row__meta">
                    <span>{res.date}</span>
                    <span className="player-bullet">•</span>
                    <span>{res.kills} Kills</span>
                    <span className="player-bullet">•</span>
                    <span>{res.team}</span>
                  </div>
                </div>
                <div className="player-chronological-row__prize">
                  {res.prizeAwarded > 0 ? (
                    <span className="player-chronological-prize-val">{formatCurrency(res.prizeAwarded)}</span>
                  ) : (
                    <span style={{ color: '#9CA3AB' }}>—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: '#6B7078', textAlign: 'center', padding: '20px 0' }}>
            No match history logged yet.
          </p>
        )}
      </div>
    </div>
  )
}

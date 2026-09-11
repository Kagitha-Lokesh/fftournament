// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — CREATE TOURNAMENT WIZARD
//
// Structured 5-step guided creation flow:
// 1. Basic Info & Format -> 2. Schedule & Capacity -> 3. Economics & Prizes ->
// 4. Rules & Settings -> 5. Review & Publish
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCheckmarkOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import { formatCurrency } from '../../utils/formatters'

const STEPS = [
  { num: 1, label: 'Basic Info' },
  { num: 2, label: 'Schedule' },
  { num: 3, label: 'Economics' },
  { num: 4, label: 'Rules' },
  { num: 5, label: 'Review & Publish' },
]

export default function CreateTournamentPage({ onNavigate, onCreateTournament }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: 'Weekend Squad Clash — S10',
    mode: 'Squad',
    format: 'Battle Royale · 12 Teams',
    date: 'SAT, 20 SEP',
    time: '8:00 PM',
    capacity: 48,
    map: 'Bermuda',
    entryFee: 50,
    prizePool: 5000,
    firstPrize: 2500,
    secondPrize: 1500,
    thirdPrize: 1000,
    scoringType: 'Placement + Kills (1 pt/kill)',
    checkInWindowMinutes: 30,
    rules: 'Mobile devices only. All participants must provide verified Free Fire UID. Top 3 placements must submit scoreboard endscreen screenshot for prize settlement.',
  })

  const updateField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  const handlePublish = async (isDraft = false) => {
    setSubmitting(true)
    try {
      if (onCreateTournament) {
        await onCreateTournament({ ...form, isDraft })
      }
      onNavigate('/organizer/tournaments')
    } catch (e) {
      // Error handled by hook toast
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="player-subpage">
      {/* Page Header */}
      <div className="player-subpage-header">
        <div>
          <button
            onClick={() => onNavigate('/organizer/tournaments')}
            className="player-back-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B7078', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '6px' }}
          >
            <IoArrowBackOutline size={14} />
            <span>Back to Tournaments</span>
          </button>
          <h1 className="player-subpage-title">Create Tournament</h1>
          <p className="player-subpage-desc">Configure your competitive competition parameters and economics.</p>
        </div>
      </div>

      {/* Step Wizard Container */}
      <div className="org-wizard">
        {/* Step Progress Bar */}
        <div className="org-wizard__steps-bar">
          {STEPS.map((step) => {
            const isActive = currentStep === step.num
            const isDone = currentStep > step.num
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`org-wizard__step-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              >
                <span className="org-wizard__step-num">
                  {isDone ? <IoCheckmarkOutline size={12} /> : step.num}
                </span>
                <span>{step.label}</span>
              </button>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="org-wizard__body">
          {/* STEP 1: Basic Info & Format */}
          {currentStep === 1 && (
            <div className="org-form-grid org-form-grid--2col">
              <div className="org-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="org-form-label">TOURNAMENT TITLE</label>
                <input
                  type="text"
                  className="org-form-input"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Weekend Squad Clash — Season 10"
                />
              </div>

              <div className="org-form-group">
                <label className="org-form-label">GAME MODE</label>
                <select
                  className="org-form-select"
                  value={form.mode}
                  onChange={(e) => updateField('mode', e.target.value)}
                >
                  <option value="Squad">Squad (4v4 Teams)</option>
                  <option value="Duo">Duo (2v2 Pairs)</option>
                  <option value="Solo">Solo (Individual Battle)</option>
                </select>
              </div>

              <div className="org-form-group">
                <label className="org-form-label">MATCH FORMAT</label>
                <select
                  className="org-form-select"
                  value={form.format}
                  onChange={(e) => updateField('format', e.target.value)}
                >
                  <option value="Battle Royale · 12 Teams">Battle Royale · Single Lobby</option>
                  <option value="2-Match Aggregate Series">2-Match Aggregate Series</option>
                  <option value="3-Match Championship Series">3-Match Championship Series</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Schedule & Capacity */}
          {currentStep === 2 && (
            <div className="org-form-grid org-form-grid--2col">
              <div className="org-form-group">
                <label className="org-form-label">MATCH DATE</label>
                <input
                  type="text"
                  className="org-form-input"
                  value={form.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  placeholder="e.g. SAT, 20 SEP"
                />
              </div>

              <div className="org-form-group">
                <label className="org-form-label">START TIME</label>
                <input
                  type="text"
                  className="org-form-input"
                  value={form.time}
                  onChange={(e) => updateField('time', e.target.value)}
                  placeholder="e.g. 8:00 PM"
                />
              </div>

              <div className="org-form-group">
                <label className="org-form-label">MAX CAPACITY (PLAYERS)</label>
                <input
                  type="number"
                  className="org-form-input"
                  value={form.capacity}
                  onChange={(e) => updateField('capacity', e.target.value)}
                />
                <span className="org-form-hint">Standard lobby size is 48 players (12 squads or 24 duos).</span>
              </div>

              <div className="org-form-group">
                <label className="org-form-label">PRIMARY MAP</label>
                <select
                  className="org-form-select"
                  value={form.map}
                  onChange={(e) => updateField('map', e.target.value)}
                >
                  <option value="Bermuda">Bermuda</option>
                  <option value="Purgatory">Purgatory</option>
                  <option value="Kalahari">Kalahari</option>
                  <option value="Alpine">Alpine</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Economics & Prizes */}
          {currentStep === 3 && (
            <div className="org-form-grid org-form-grid--2col">
              <div className="org-form-group">
                <label className="org-form-label">ENTRY FEE PER PLAYER (₹)</label>
                <input
                  type="number"
                  className="org-form-input"
                  value={form.entryFee}
                  onChange={(e) => updateField('entryFee', e.target.value)}
                />
                <span className="org-form-hint">Set to 0 for Free-to-Play community tournament.</span>
              </div>

              <div className="org-form-group">
                <label className="org-form-label">TOTAL GUARANTEED PRIZE POOL (₹)</label>
                <input
                  type="number"
                  className="org-form-input"
                  value={form.prizePool}
                  onChange={(e) => updateField('prizePool', e.target.value)}
                />
              </div>

              <div className="org-form-group" style={{ gridColumn: '1 / -1' }}>
                <span className="org-form-label">PRIZE DISTRIBUTION BREAKDOWN</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '6px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#6B7078' }}>1st Place (₹)</label>
                    <input
                      type="number"
                      className="org-form-input"
                      value={form.firstPrize}
                      onChange={(e) => updateField('firstPrize', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#6B7078' }}>2nd Place (₹)</label>
                    <input
                      type="number"
                      className="org-form-input"
                      value={form.secondPrize}
                      onChange={(e) => updateField('secondPrize', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#6B7078' }}>3rd Place (₹)</label>
                    <input
                      type="number"
                      className="org-form-input"
                      value={form.thirdPrize}
                      onChange={(e) => updateField('thirdPrize', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Rules & Settings */}
          {currentStep === 4 && (
            <div className="org-form-grid">
              <div className="org-form-group">
                <label className="org-form-label">SCORING CALCULATION MODEL</label>
                <select
                  className="org-form-select"
                  value={form.scoringType}
                  onChange={(e) => updateField('scoringType', e.target.value)}
                >
                  <option value="Placement + Kills (1 pt/kill)">Standard BR: Placement + 1 pt per kill</option>
                  <option value="Placement + Kills (2 pts/kill)">High-Action: Placement + 2 pts per kill</option>
                  <option value="Placement Only">Survival Only: Placement points only</option>
                </select>
              </div>

              <div className="org-form-group">
                <label className="org-form-label">CHECK-IN WINDOW DURATION</label>
                <select
                  className="org-form-select"
                  value={form.checkInWindowMinutes}
                  onChange={(e) => updateField('checkInWindowMinutes', Number(e.target.value))}
                >
                  <option value={30}>Opens 30 minutes before match</option>
                  <option value={45}>Opens 45 minutes before match</option>
                  <option value={60}>Opens 60 minutes before match</option>
                </select>
                <span className="org-form-hint">Room credentials release automatically to players who confirm check-in.</span>
              </div>

              <div className="org-form-group">
                <label className="org-form-label">SPECIAL RULES & INTEGRITY GUIDELINES</label>
                <textarea
                  className="org-form-textarea"
                  value={form.rules}
                  onChange={(e) => updateField('rules', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review & Publish */}
          {currentStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '14px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E4E7EB' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111318', margin: '0 0 6px 0' }}>
                  {form.name}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#6B7078', margin: 0 }}>
                  {form.mode} · {form.format} · Map: {form.map}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#FFFFFF', border: '1px solid #E4E7EB', borderRadius: '6px' }}>
                  <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>SCHEDULE</span>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{form.date}</div>
                  <div style={{ fontSize: '12px', color: '#6B7078' }}>{form.time}</div>
                </div>
                <div style={{ padding: '12px', background: '#FFFFFF', border: '1px solid #E4E7EB', borderRadius: '6px' }}>
                  <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>ENTRY & PRIZE</span>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                    {form.entryFee === 0 ? 'Free Entry' : `₹${form.entryFee} Entry`}
                  </div>
                  <div style={{ fontSize: '12px', color: '#D97706', fontWeight: 700 }}>
                    {formatCurrency(form.prizePool)} Pool
                  </div>
                </div>
                <div style={{ padding: '12px', background: '#FFFFFF', border: '1px solid #E4E7EB', borderRadius: '6px' }}>
                  <span style={{ fontSize: '10.5px', color: '#6B7078', fontWeight: 700 }}>SLOTS</span>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{form.capacity} Players</div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>Check-in: {form.checkInWindowMinutes}m window</div>
                </div>
              </div>

              <div style={{ fontSize: '12.5px', color: '#4B5563', padding: '12px', background: '#F8FAFC', borderRadius: '6px' }}>
                <strong>Rules Summary:</strong> {form.rules}
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="org-wizard__footer">
          <div>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="btn btn--secondary"
                style={{ height: '38px', padding: '0 16px', fontSize: '13px', gap: '6px' }}
              >
                <IoArrowBackOutline size={15} />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handlePublish(true)}
              disabled={submitting}
              className="btn btn--secondary"
              style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}
            >
              Save as Draft
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="btn btn--primary"
                style={{ height: '38px', padding: '0 18px', fontSize: '13px', gap: '6px' }}
              >
                <span>Continue</span>
                <IoArrowForwardOutline size={15} />
              </button>
            ) : (
              <button
                onClick={() => handlePublish(false)}
                disabled={submitting}
                className="btn btn--primary"
                style={{ height: '38px', padding: '0 20px', fontSize: '13px', gap: '6px' }}
              >
                <IoShieldCheckmarkOutline size={16} />
                <span>{submitting ? 'Publishing...' : 'Publish Tournament'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

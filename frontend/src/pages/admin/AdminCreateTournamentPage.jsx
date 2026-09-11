// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — ADMIN CREATE TOURNAMENT PAGE
//
// Guided 5-step wizard to configure, verify, and publish official
// Platform-Managed Tournaments with prize escrow security.
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { adminService } from '../../services/adminService'
import {
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
  IoShieldCheckmark,
  IoAlertCircleOutline
} from 'react-icons/io5'

export default function AdminCreateTournamentPage({ onNavigate, onToast }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    mode: 'Squad',
    format: 'Battle Royale',
    map: 'Bermuda',
    scheduledDate: '2026-09-18',
    scheduledTime: '20:00 IST',
    maxParticipants: 48,
    matchesCount: 3,
    entryFee: 50,
    prizePool: 5000,
    rules: 'Official Free Fire competitive settings. Emulators strictly prohibited. Room ID distributed 15m prior.',
    publishImmediately: true,
    visibility: 'PUBLIC'
  })

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Format & Mode' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Economics & Prizes' },
    { num: 5, label: 'Rules & Verification' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep === 1 && !formData.title.trim()) {
      onToast('Please provide a tournament title', 'error')
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 5))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handlePublish = async () => {
    try {
      setSubmitting(true)
      const created = await adminService.createTournament(formData)
      onToast(`Platform Tournament "${created.title}" successfully created and logged to audit trail!`, 'success')
      onNavigate(`/admin/tournaments/${created.id}`)
    } catch (err) {
      console.error('Failed to create tournament:', err)
      onToast(err.message || 'Failed to publish tournament', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/tournaments')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--admin-grey)',
              fontSize: '13px',
              padding: 0,
              marginBottom: '6px'
            }}
          >
            <IoArrowBack size={16} />
            <span>Back to Tournaments</span>
          </button>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--admin-ink)' }}>
            Create Platform Tournament
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--admin-grey)' }}>
            Configure an official platform-operated tournament backed by the FF WAR integrity framework.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--admin-white)',
          padding: '16px 20px',
          borderRadius: 'var(--admin-radius)',
          border: '1px solid var(--admin-border)',
          overflowX: 'auto'
        }}
      >
        {steps.map((step) => {
          const isDone = currentStep > step.num
          const isCurrent = currentStep === step.num

          return (
            <div
              key={step.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                opacity: isCurrent || isDone ? 1 : 0.5
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: isDone ? '#10B981' : isCurrent ? 'var(--admin-ink)' : 'var(--admin-light-grey)',
                  color: isDone || isCurrent ? '#FFFFFF' : 'var(--admin-grey)'
                }}
              >
                {isDone ? <IoCheckmarkCircle size={16} /> : step.num}
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: isCurrent ? 700 : 500, color: 'var(--admin-ink)' }}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Wizard Step Content */}
      <div className="admin-card">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="admin-card__title">Step 1: Tournament Identity</h3>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Tournament Title <span style={{ color: 'var(--admin-red)' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. FF WAR National Qualifier — Series 2"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--admin-border)',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="e.g. Official platform sanctioned squad clash"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--admin-border)',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Banner Image URL
              </label>
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => handleChange('bannerUrl', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--admin-border)',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Format & Mode */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="admin-card__title">Step 2: Competitive Format & Map</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Team Mode
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => handleChange('mode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Solo">Solo (1 Player)</option>
                  <option value="Duo">Duo (2 Players)</option>
                  <option value="Squad">Squad (4 Players)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Match Format
                </label>
                <select
                  value={formData.format}
                  onChange={(e) => handleChange('format', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Battle Royale">Battle Royale (Classic)</option>
                  <option value="Clash Squad">Clash Squad (Round-Based)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Competitive Map
                </label>
                <select
                  value={formData.map}
                  onChange={(e) => handleChange('map', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Bermuda">Bermuda Remastered</option>
                  <option value="Purgatory">Purgatory</option>
                  <option value="Kalahari">Kalahari</option>
                  <option value="Alpine">Alpine</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Schedule & Capacity */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="admin-card__title">Step 3: Schedule & Participant Capacity</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => handleChange('scheduledDate', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Scheduled Time
                </label>
                <input
                  type="text"
                  value={formData.scheduledTime}
                  onChange={(e) => handleChange('scheduledTime', e.target.value)}
                  placeholder="e.g. 20:00 IST"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Max Slots (Participants)
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleChange('maxParticipants', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Number of Matches
                </label>
                <input
                  type="number"
                  value={formData.matchesCount}
                  onChange={(e) => handleChange('matchesCount', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Economics & Prizes */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="admin-card__title">Step 4: Platform Economics & Prize Escrow</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Entry Fee per Team / Player (₹)
                </label>
                <input
                  type="number"
                  value={formData.entryFee}
                  onChange={(e) => handleChange('entryFee', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Guaranteed Prize Pool (₹)
                </label>
                <input
                  type="number"
                  value={formData.prizePool}
                  onChange={(e) => handleChange('prizePool', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--admin-border)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--admin-light-grey)',
                padding: '14px',
                borderRadius: '6px',
                border: '1px solid var(--admin-border)',
                fontSize: '12.5px',
                color: 'var(--admin-grey)',
                lineHeight: 1.5
              }}
            >
              <strong>Prize Escrow Guarantee:</strong> Upon publishing, the guaranteed prize amount (₹{Number(formData.prizePool || 0).toLocaleString()}) is locked into platform escrow. Platform Verified tournaments strictly honor automated disbursement to confirmed podium winners.
            </div>
          </div>
        )}

        {/* Step 5: Rules & Platform Verification */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="admin-card__title">Step 5: Rules & Platform Verification Review</h3>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Competitive Rules & Guidelines
              </label>
              <textarea
                value={formData.rules}
                onChange={(e) => handleChange('rules', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--admin-border)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoShieldCheckmark size={20} style={{ color: 'var(--admin-ink)' }} />
                <strong style={{ fontSize: '14px', color: 'var(--admin-ink)' }}>
                  Platform Verified Tournament Badge
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#78350F', lineHeight: 1.5 }}>
                This tournament will be tagged as <strong>PLATFORM_VERIFIED</strong>. It will display the official <strong>✓ Platform Verified</strong> seal across discovery cards, player registrations, and the public schedule.
              </p>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '6px' }}>
                <input
                  type="checkbox"
                  checked={formData.publishImmediately}
                  onChange={(e) => handleChange('publishImmediately', e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--admin-ink)' }}>
                  Publish immediately with Open Registration
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--admin-border)'
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="admin-btn admin-btn--secondary"
            >
              <IoArrowBack size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="admin-btn admin-btn--primary"
            >
              <span>Next Step</span>
              <IoArrowForward size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              disabled={submitting}
              className="admin-btn admin-btn--yellow"
            >
              <IoShieldCheckmark size={18} />
              <span>{submitting ? 'Publishing...' : 'Publish Platform Tournament'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

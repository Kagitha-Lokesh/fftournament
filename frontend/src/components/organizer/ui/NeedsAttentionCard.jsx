// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — NEEDS ATTENTION CARD (COMPACT ACTION CHECKLIST)
//
// Shows actionable operational exceptions without cluttering Home.
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { IoChevronForwardOutline, IoAlertCircleOutline } from 'react-icons/io5'

export default function NeedsAttentionCard({ items = [], onNavigate }) {
  if (!items || items.length === 0) return null

  return (
    <section className="org-section" aria-label="Operational tasks requiring attention">
      <div className="player-section-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="org-attention-dot" />
          <h2 className="player-section-title">Needs Attention</h2>
        </div>
      </div>

      <div className="org-attention-card">
        {items.map((item, idx) => (
          <div key={item.id} className="org-attention-item">
            <div className="org-attention-item__content">
              <div className="org-attention-item__title-row">
                <span className="org-attention-item__bullet">•</span>
                <span className="org-attention-item__title">{item.title}</span>
              </div>
              <p className="org-attention-item__sub">{item.subtitle}</p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate(item.route)}
              className="btn btn--secondary org-attention-item__btn"
            >
              <span>{item.actionLabel || 'Review'}</span>
              <IoChevronForwardOutline size={13} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

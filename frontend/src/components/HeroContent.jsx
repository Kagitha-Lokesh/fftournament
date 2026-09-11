import React from 'react'

// ── Smoothstep easing for cinematic scroll transitions ───────────────────────
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

export default function HeroContent({ progress = 0, content, isMobile = false, reducedMotion = false }) {
  if (!content) return null

  const { intro, competition, final } = content
  const p = Math.max(0, Math.min(1, progress))

  // If reduced motion is preferred, present a stable, high-contrast Hero state
  if (reducedMotion) {
    return (
      <div className="ch-content-layer">
        <div className="ch-stage-intro">
          <p className="ch-eyebrow">{intro.eyebrow}</p>
          <h1 className="ch-headline ch-headline--intro" id="ch-heading">
            {intro.headline.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>
          <p className="ch-body ch-body--intro">{intro.body}</p>
          <div className="ch-actions">
            <a href={intro.primaryCta.href} className="btn btn--primary btn--lg ch-btn-primary">
              {intro.primaryCta.label}
            </a>
            <a href={intro.secondaryCta.href} className="btn ch-btn-secondary btn--lg">
              {intro.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── Transition Calculations ───────────────────────────────────────────────
  let introOpacity = 0
  let introY = 0
  let compOpacity = 0
  let compY = 0
  let finalOpacity = 0
  let finalLeftX = 0
  let finalRightX = 0

  if (!isMobile) {
    // ── Desktop Logic (Preserved 100% untouched) ─────────────────────────────
    // State 1: Intro (Checkpoint 0: Frame 0)
    if (p <= 0.22) {
      introOpacity = 1
      introY = 0
    } else if (p < 0.32) {
      const t = smoothstep(0.22, 0.32, p)
      introOpacity = 1 - t
      introY = -18 * t
    }

    // State 2: Competition (Checkpoint 32: Frame 32)
    if (p >= 0.22 && p < 0.32) {
      const t = smoothstep(0.22, 0.32, p)
      compOpacity = t
      compY = 18 * (1 - t)
    } else if (p >= 0.32 && p <= 0.54) {
      compOpacity = 1
      compY = 0
    } else if (p > 0.54 && p < 0.68) {
      const t = smoothstep(0.54, 0.68, p)
      compOpacity = 1 - t
      compY = -18 * t
    }

    // Combined Final State (Checkpoints 70 through 100)
    if (p >= 0.58 && p < 0.70) {
      const t = smoothstep(0.58, 0.70, p)
      finalOpacity = t
      finalLeftX = -24 * (1 - t)
      finalRightX = 24 * (1 - t)
    } else if (p >= 0.70) {
      finalOpacity = 1
      finalLeftX = 0
      finalRightX = 0
    }
  } else {
    // ── Mobile Transition Logic ───────────────────────────────────────────────
    // Normalized cinematic progress across 120 frames (index 0..119):
    // Frame 0: p = 0.00
    // Frame 20: p ~ 0.16
    // Frame 38: p ~ 0.31 (Find Your Next Match composition)
    // Frame 55: p ~ 0.45
    // Frame 70: p ~ 0.58 (Begin transition toward Record/History)
    // Frame 85: p ~ 0.71 (Two-Sided Record + History composition fully active)

    // Stage 1: Intro (dominant frames 0..20, smooth fade out frames 20..32)
    if (p <= 0.17) {
      introOpacity = 1
      introY = 0
    } else if (p < 0.27) {
      const t = smoothstep(0.17, 0.27, p)
      introOpacity = 1 - t
      introY = -14 * t
    }

    // Stage 2: Competition (Frame 38 focus — dominant frames 32..54, smooth fade out frames 54..68)
    if (p >= 0.17 && p < 0.27) {
      const t = smoothstep(0.17, 0.27, p)
      compOpacity = t
      compY = 14 * (1 - t)
    } else if (p >= 0.27 && p <= 0.54) {
      compOpacity = 1
      compY = 0
    } else if (p > 0.54 && p < 0.68) {
      const t = smoothstep(0.54, 0.68, p)
      compOpacity = 1 - t
      compY = -14 * t
    }

    // Stage 3: Split State (Both on Left on Mobile — enters frames 68..82, 100% stable at Frame 85+)
    if (p >= 0.58 && p < 0.70) {
      const t = smoothstep(0.58, 0.70, p)
      finalOpacity = t
      finalLeftX = -14 * (1 - t)
      finalRightX = -14 * (1 - t)
    } else if (p >= 0.70) {
      finalOpacity = 1
      finalLeftX = 0
      finalRightX = 0
    }
  }

  // Mobile vs Desktop typography & content configuration for Frame 85
  const leftHeadline = isMobile
    ? ['Every match', 'counts.', 'Built over time.']
    : final.left.headline

  const rightHeadline = isMobile
    ? ['Competition,', 'properly', 'recorded.']
    : final.right.headline

  const rightBody = isMobile
    ? 'Clear results. A record you can trust.'
    : final.right.body

  const showRightItems = !isMobile && !!final.right.items

  return (
    <div className="ch-content-layer" role="region" aria-label="Cinematic Journey">
      {/* ── STAGE 1: INTRO (FRAME 0) ── */}
      <div
        className="ch-stage-intro"
        style={{
          opacity: introOpacity,
          transform: `translateY(calc(-50% + ${introY}px))`,
          pointerEvents: introOpacity > 0.15 ? 'auto' : 'none',
          visibility: introOpacity > 0 ? 'visible' : 'hidden',
        }}
        aria-hidden={introOpacity <= 0.15}
      >
        <p className="ch-eyebrow">{intro.eyebrow}</p>
        <h1 className="ch-headline ch-headline--intro" id="ch-heading">
          {intro.headline.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        <p className="ch-body ch-body--intro">{intro.body}</p>
        <div className="ch-actions">
          <a href={intro.primaryCta.href} className="btn btn--primary btn--lg ch-btn-primary">
            {intro.primaryCta.label}
          </a>
          <a href={intro.secondaryCta.href} className="btn ch-btn-secondary btn--lg">
            {intro.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* ── STAGE 2: COMPETITION (FRAME 32/38) ── */}
      <div
        className="ch-stage-comp"
        style={{
          opacity: compOpacity,
          transform: `translateY(calc(-50% + ${compY}px))`,
          pointerEvents: compOpacity > 0.15 ? 'auto' : 'none',
          visibility: compOpacity > 0 ? 'visible' : 'hidden',
        }}
        aria-hidden={compOpacity <= 0.15}
      >
        <p className="ch-eyebrow">{competition.eyebrow}</p>
        <h2 className="ch-headline ch-headline--comp">
          {competition.headline.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        <p className="ch-body ch-body--comp">{competition.body}</p>
        <div className="ch-actions">
          <a href={competition.primaryCta.href} className="btn btn--primary btn--lg ch-btn-primary">
            {competition.primaryCta.label}
          </a>
          <a href={competition.secondaryCta.href} className="btn ch-btn-secondary btn--lg">
            {competition.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* ── COMBINED FINAL STATE (FRAME 70 → FRAME 100 / FRAME 85 FOCUS) ── */}
      <div
        className="ch-stage-split"
        style={{
          opacity: finalOpacity,
          visibility: finalOpacity > 0 ? 'visible' : 'hidden',
          pointerEvents: finalOpacity > 0.15 ? 'auto' : 'none',
        }}
        aria-hidden={finalOpacity <= 0.15}
      >
        {/* LEFT SIDE: YOUR RECORD */}
        <div
          className="ch-split-column ch-split-column--left"
          style={{
            transform: `translateY(-50%) translateX(${finalLeftX}px)`,
          }}
        >
          <div className="ch-split-block">
            <p className="ch-split-eyebrow">{final.left.eyebrow}</p>
            <h3 className="ch-split-headline">
              {leftHeadline.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h3>
            <p className="ch-split-body">{final.left.body}</p>
          </div>
        </div>

        {/* RIGHT SIDE: YOUR HISTORY */}
        <div
          className="ch-split-column ch-split-column--right"
          style={{
            transform: `translateY(-50%) translateX(${finalRightX}px)`,
          }}
        >
          <div className="ch-split-block">
            <p className="ch-split-eyebrow">{final.right.eyebrow}</p>
            <h3 className="ch-split-headline">
              {rightHeadline.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h3>
            <div className="ch-split-body">
              {showRightItems && (
                <p className="ch-split-body-highlight">{final.right.items}</p>
              )}
              <p>{rightBody}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

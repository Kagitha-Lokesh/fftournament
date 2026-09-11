// ─────────────────────────────────────────────────────────────────────────────
// ScrollHero — Cinematic canvas scroll Hero
//
// Architecture:
//   Native page scroll → scroll progress (0–1) → frame index → Canvas render
//
// No scroll hijacking. No video.currentTime. No setInterval.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useCallback, useState } from 'react'
import HeroContent from './HeroContent'

// ── Constants ─────────────────────────────────────────────────────────────────
const MOBILE_BREAKPOINT = 768        // px — switch asset directory
const MAX_CACHE = 40                 // max decoded images kept in memory
const PRELOAD_AHEAD = 12             // frames to preload in scroll direction
const PRELOAD_BEHIND = 6             // frames to preload opposite direction
const DEBUG_SCROLL_HERO = false      // verbose per-frame console logging flag

// Pad frame index to 5 digits: 1 → "00001"
function padFrame(n) {
  return String(n).padStart(5, '0')
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ScrollHero({ content }) {


  // ── Refs ───────────────────────────────────────────────────────────────────
  const sectionRef = useRef(null)   // tall scroll parent
  const canvasRef = useRef(null)   // the canvas element
  const manifestRef = useRef(null)   // { frameCount, width, height, fps }
  const cacheRef = useRef(new Map()) // frame index → HTMLImageElement
  const lastFrameRef = useRef(null)   // last successfully rendered HTMLImageElement
  const frameIndexRef = useRef(0)      // current frame index (integer)
  const progressRef = useRef(0)      // scroll progress 0–1
  const directionRef = useRef(1)      // +1 = down, -1 = up
  const lastScrollY = useRef(0)
  const rafRef = useRef(null)
  const assetBaseRef = useRef('')     // e.g. '/assets/hero/desktop'
  const pendingRender = useRef(false)

  // ── State ──────────────────────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches)
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [heroProgress, setHeroProgress] = useState(0) // for CSS text animation

  // ── Asset path helper ─────────────────────────────────────────────────────
  function assetBase(mobile) {
    return mobile ? '/assets/hero/mobile' : '/assets/hero/desktop'
  }

  function frameUrl(base, idx) {
    return `${base}/frame-${padFrame(idx + 1)}.webp`
  }

  // ── Canvas draw ───────────────────────────────────────────────────────────
  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height

    // Object-fit: cover math — preserve aspect ratio, fill canvas
    // Align to top (dy = 0) so character's head/face is never cropped off
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = -77

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)

    lastFrameRef.current = img
  }, [])

  // ── Canvas resize ─────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    // Re-draw last frame after resize so we never go blank
    if (lastFrameRef.current) drawFrame(lastFrameRef.current)
  }, [drawFrame])

  // ── Frame preload engine ──────────────────────────────────────────────────
  const schedulePreload = useCallback((currentIdx, direction, manifest) => {
    if (!manifest) return
    const { frameCount } = manifest
    const base = assetBaseRef.current
    const cache = cacheRef.current

    // Build priority list: ahead in direction first, then behind
    const targets = []
    for (let i = 1; i <= PRELOAD_AHEAD; i++) {
      const idx = currentIdx + i * direction
      if (idx >= 0 && idx < frameCount) targets.push(idx)
    }
    for (let i = 1; i <= PRELOAD_BEHIND; i++) {
      const idx = currentIdx - i * direction
      if (idx >= 0 && idx < frameCount) targets.push(idx)
    }

    targets.forEach(idx => {
      if (cache.has(idx)) return // already loaded
      const img = new Image()
      img.src = frameUrl(base, idx)
      img.onload = () => {
        cache.set(idx, img)
        evictCache(currentIdx)
      }
    })
  }, [])

  // Evict frames furthest from current to keep cache bounded
  function evictCache(currentIdx) {
    const cache = cacheRef.current
    if (cache.size <= MAX_CACHE) return

    const sorted = [...cache.keys()].sort(
      (a, b) => Math.abs(a - currentIdx) - Math.abs(b - currentIdx)
    )
    // Keep the closest MAX_CACHE entries
    for (let i = MAX_CACHE; i < sorted.length; i++) {
      cache.delete(sorted[i])
    }
  }

  // ── Load a specific frame ─────────────────────────────────────────────────
  const loadAndRender = useCallback((idx) => {
    const cache = cacheRef.current
    const base = assetBaseRef.current

    if (cache.has(idx)) {
      drawFrame(cache.get(idx))
      return
    }

    // Frame not cached — show last valid frame immediately (no black)
    if (lastFrameRef.current) {
      drawFrame(lastFrameRef.current)
    }

    // Load in background then render when ready
    const img = new Image()
    img.src = frameUrl(base, idx)
    img.onload = () => {
      cache.set(idx, img)
      // Only render if we're still on this frame
      if (frameIndexRef.current === idx) drawFrame(img)
    }
  }, [drawFrame])

  const scrollStopTimerRef = useRef(null)

  // ── Scroll handler ────────────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    if (pendingRender.current) return
    pendingRender.current = true

    rafRef.current = requestAnimationFrame(() => {
      pendingRender.current = false
      const section = sectionRef.current
      const manifest = manifestRef.current
      if (!section || !manifest) return

      const scrollY = window.scrollY
      const sectionTop = section.getBoundingClientRect().top + scrollY
      const sectionH = section.offsetHeight
      const viewportH = window.innerHeight

      // Progress: 0 at top of hero, 1 when hero exits viewport
      const raw = (scrollY - sectionTop) / (sectionH - viewportH)
      const progress = Math.min(1, Math.max(0, raw))

      // Track direction
      directionRef.current = scrollY >= lastScrollY.current ? 1 : -1
      lastScrollY.current = scrollY

      progressRef.current = progress
      setHeroProgress(progress)

      // Frame index
      const newIdx = Math.round(progress * (manifest.frameCount - 1))
      if (newIdx !== frameIndexRef.current) {
        frameIndexRef.current = newIdx
        if (DEBUG_SCROLL_HERO) {
          console.log(`[ScrollHero] Frame ${newIdx + 1} / ${manifest.frameCount} (frame-${padFrame(newIdx + 1)}.webp)`)
        }
        loadAndRender(newIdx)
        schedulePreload(newIdx, directionRef.current, manifest)
        evictCache(newIdx)
      }

      // Log when scrolling has stopped
      if (DEBUG_SCROLL_HERO) {
        if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
        scrollStopTimerRef.current = setTimeout(() => {
          console.log(
            `%c[ScrollHero] 🎯 STOPPED AT FRAME ${newIdx + 1} / ${manifest.frameCount} (frame-${padFrame(newIdx + 1)}.webp, index: ${newIdx})`,
            'background: #111318; color: #F4C400; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
          )
        }, 150)
      }
    })
  }, [loadAndRender, schedulePreload])


  // ── Initialise / re-initialise on viewport change ─────────────────────────
  const initialise = useCallback(async (mobile) => {
    const base = assetBase(mobile)
    assetBaseRef.current = base

    // Clear old cache
    cacheRef.current.clear()
    lastFrameRef.current = null
    frameIndexRef.current = 0

    try {
      const res = await fetch(`${base}/manifest.json`)
      const manifest = await res.json()
      manifestRef.current = manifest

      // Load frame 0 with absolute priority
      const img = new Image()
      img.src = frameUrl(base, 0)
      img.onload = () => {
        cacheRef.current.set(0, img)
        lastFrameRef.current = img
        resizeCanvas()
        drawFrame(img)
        // Start preloading nearby frames
        schedulePreload(0, 1, manifest)
      }
    } catch (err) {
      console.error('[ScrollHero] Failed to load manifest:', err)
    }
  }, [drawFrame, resizeCanvas, schedulePreload])

  // ── Responsive breakpoint watcher ─────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handler = (e) => {
      setIsMobile(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Re-initialise when isMobile changes
  useEffect(() => {
    initialise(isMobile)
  }, [isMobile, initialise])

  // ── Scroll listener ───────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return // static mode — no scroll scrub
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll, reducedMotion])

  // ── Resize listener ───────────────────────────────────────────────────────
  useEffect(() => {
    const ro = new ResizeObserver(resizeCanvas)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [resizeCanvas])

  // ── Reduced motion: static first frame ───────────────────────────────────
  // Already handled by initialise → draws frame 0. No scroll scrub registered.

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      className="cinematic-hero"
      ref={sectionRef}
      aria-labelledby="ch-heading"
    >
      <div className="cinematic-hero-sticky">
        {/* Canvas — cinematic frame */}
        <canvas
          ref={canvasRef}
          className="ch-canvas"
          aria-hidden="true"
        />

        {/* Gradient overlay — subtle, does not obscure the cinematic */}
        <div className="ch-overlay" aria-hidden="true" />

        {/* Frame-synchronized Hero content journey */}
        <HeroContent
          progress={heroProgress}
          content={content}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  )
}


import { useState, useEffect, useRef } from 'react'
import {
  IoDocumentTextOutline,
  IoWalletOutline,
  IoBarChartOutline,
  IoChatbubbleOutline,
  IoAddCircleOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoLockClosedOutline,
  IoCashOutline,
  IoCompassOutline,
  IoPersonAddOutline,
  IoGameControllerOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
  IoChevronForwardOutline,
  IoArrowDownOutline,
  IoSparklesOutline,
  IoReceiptOutline,
  IoStatsChartOutline,
  IoChatbubblesOutline,
} from 'react-icons/io5'
import './styles.css'
import {
  HERO_CONTENT,
  NAV_LINKS,
  PROBLEM_SECTION,
  LIFECYCLE_STAGES,
  TOURNAMENTS,
  TRUST_PILLARS,
  PLAYER_CAREER,
  LEADERBOARD,
  ROLES,
  ORGANIZER_DASHBOARD,
  RESULT_FLOW,
  PRIZE_CATEGORIES,
  FOOTER_LINKS,
} from './data'
import ScrollHero from './components/ScrollHero'


// ─── Reveal hook ────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)

      // Hide nav while inside the cinematic hero scroll distance.
      // The hero sticky exits when scrollY > heroTop + heroHeight - viewportHeight.
      const hero = document.querySelector('.cinematic-hero')
      if (hero) {
        const heroEnd = hero.offsetTop + hero.offsetHeight - window.innerHeight
        setPastHero(y >= heroEnd)
      } else {
        // No cinematic hero — always show nav
        setPastHero(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once immediately so the nav is hidden on first paint
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`nav${scrolled ? ' scrolled' : ''}${pastHero ? '' : ' nav--hero-hidden'}`}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!pastHero}
      >
        <div className="container">
          <div className="nav__inner">
            {/* Logo */}
            <a href="#" className="nav__logo" aria-label="FF War home">
              <span className="nav__logo-mark">
                {/* Abstract competition mark: upward arrow / arena shape */}
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <polygon
                    points="10,2 18,17 2,17"
                    stroke="#F4C400"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    fill="rgba(244,196,0,0.12)"
                  />
                  <line x1="10" y1="8" x2="10" y2="13" stroke="#F4C400" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="10" cy="15.5" r="0.9" fill="#F4C400"/>
                </svg>
              </span>
              <span className="nav__logo-word">
                <span className="nav__logo-word-ff">FF</span>
                <span className="nav__logo-word-sep" aria-hidden="true" />
                <span className="nav__logo-word-war">WAR</span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="nav__links" role="list">
              {NAV_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="nav__link">{l.label}</a>
                </li>
              ))}
            </ul>

            {/* Desktop actions */}
            <div className="nav__actions">
              <a href="#" className="nav__sign-in">Sign in</a>
              <a href="#tournaments" className="btn btn--primary">Explore Tournaments</a>
            </div>

            {/* Hamburger */}
            <button
              className={`nav__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav__drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="nav__drawer-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <div className="nav__drawer-actions">
          <a href="#" className="btn btn--secondary" style={{ justifyContent: 'center' }}>Sign in</a>
          <a href="#tournaments" className="btn btn--primary" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Explore Tournaments</a>
        </div>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Replaced with cinematic canvas scroll hero — see src/components/ScrollHero.jsx

// ─── Problem Section ──────────────────────────────────────────────────────────
function ProblemSection() {
  const [ref, visible] = useReveal(0.1)

  const PROBLEM_ICONS = {
    '01': <IoDocumentTextOutline size={18} />,
    '02': <IoReceiptOutline size={18} />,
    '03': <IoStatsChartOutline size={18} />,
    '04': <IoChatbubblesOutline size={18} />,
  }

  const PIPELINE_ICONS = {
    discover: <IoCompassOutline size={17} />,
    register: <IoPersonAddOutline size={17} />,
    play:     <IoGameControllerOutline size={17} />,
    results:  <IoCheckmarkCircleOutline size={17} />,
    prizes:   <IoTrophyOutline size={17} />,
    history:  <IoTimeOutline size={17} />,
  }

  const { eyebrow, headline, body, cards, solution } = PROBLEM_SECTION

  return (
    <section className="section section--cloud problem-section" aria-labelledby="problem-heading">
      <div className="container" ref={ref}>
        {/* Intro */}
        <div className={`problem-intro reveal${visible ? ' visible' : ''}`}>
          <div className="problem-eyebrow-badge">
            <span className="problem-eyebrow-dot" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="h2 problem-heading" id="problem-heading">
            {headline}
          </h2>
          <p className="body-lg problem-body">
            {body}
          </p>
        </div>

        {/* Fragmented Cards Composition */}
        <div className="problem-cards-wrapper">
          <div className="problem-cards-grid">
            {cards.map((card, i) => (
              <div
                key={card.num}
                className={`problem-card problem-card--${i + 1} reveal${
                  visible ? ` visible reveal-delay-${i + 1}` : ''
                }`}
              >
                <div className="problem-card__header">
                  <span className="problem-card__number">{card.num}</span>
                  <div className="problem-card__icon">
                    {PROBLEM_ICONS[card.num] || <IoDocumentTextOutline size={18} />}
                  </div>
                  <span className="problem-card__tag">{card.tag}</span>
                </div>
                <div className="problem-card__body">
                  <h3 className="problem-card__title">{card.title}</h3>
                  <p className="problem-card__sub">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Convergence */}
        <div className={`problem-transition reveal${visible ? ' visible reveal-delay-5' : ''}`}>
          <div className="problem-transition__graphic" aria-hidden="true">
            <svg className="problem-converge-svg" viewBox="0 0 600 70" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="convergeGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E4E7EB" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#E4E7EB" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F4C400" />
                </linearGradient>
                <linearGradient id="convergeGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E4E7EB" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#E4E7EB" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F4C400" />
                </linearGradient>
              </defs>
              {/* Converging dashed flow lines */}
              <path d="M 80 0 C 130 35, 230 55, 300 66" stroke="url(#convergeGradLeft)" strokeWidth="1.75" strokeDasharray="3 3" />
              <path d="M 200 0 C 230 28, 265 50, 300 66" stroke="url(#convergeGradLeft)" strokeWidth="1.5" />
              <path d="M 520 0 C 470 35, 370 55, 300 66" stroke="url(#convergeGradRight)" strokeWidth="1.75" strokeDasharray="3 3" />
              <path d="M 400 0 C 370 28, 335 50, 300 66" stroke="url(#convergeGradRight)" strokeWidth="1.5" />
              {/* Convergence center junction */}
              <circle cx="300" cy="66" r="3.5" fill="#F4C400" />
            </svg>
          </div>

          <div className="problem-transition__hub">
            <div className="problem-transition__pill">
              <span className="problem-transition__dot" />
              <span className="problem-transition__label">{solution.eyebrow}</span>
            </div>
            <h3 className="problem-solution__headline">{solution.headline}</h3>
            <p className="problem-solution__body">{solution.body}</p>
          </div>

          <div className="problem-transition__stem">
            <div className="problem-transition__stem-line" />
            <IoArrowDownOutline size={14} className="problem-transition__stem-arrow" />
          </div>
        </div>

        {/* Platform Visual Anchor */}
        <div className={`platform-panel-wrapper reveal${visible ? ' visible reveal-delay-6' : ''}`}>
          <div className="platform-panel">
            {/* Platform Header */}
            <div className="platform-panel__header">
              <div className="platform-panel__brand">
                <div className="platform-panel__logo-mark">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <polygon points="12,2 22,19 2,19" stroke="#F4C400" strokeWidth="2.2" fill="rgba(244,196,0,0.18)" />
                    <line x1="12" y1="8" x2="12" y2="14" stroke="#111318" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="1.1" fill="#111318" />
                  </svg>
                </div>
                <div>
                  <div className="platform-panel__brand-title">{solution.brandName}</div>
                  <div className="platform-panel__brand-subtitle">{solution.brandSubtitle}</div>
                </div>
              </div>

              <div className="platform-panel__status">
                <span className="platform-panel__status-dot" />
                <span className="platform-panel__status-text">{solution.statusBadge}</span>
              </div>
            </div>

            {/* Platform Pipeline Flow */}
            <div className="platform-pipeline">
              <div className="platform-pipeline__track">
                {solution.pipeline.map((step, idx) => (
                  <div key={step.id} className="platform-pipeline__node">
                    <div className="platform-step-card">
                      <div className="platform-step-card__top">
                        <span className="platform-step-card__num">{step.num}</span>
                        <div className="platform-step-card__icon">
                          {PIPELINE_ICONS[step.id] || <IoSparklesOutline size={16} />}
                        </div>
                      </div>
                      <div className="platform-step-card__label">{step.label}</div>
                    </div>
                    {idx < solution.pipeline.length - 1 && (
                      <div className="platform-pipeline__chevron" aria-hidden="true">
                        <IoChevronForwardOutline size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Value Pillars */}
            <div className="platform-pillars">
              {solution.pillars.map((pillar) => (
                <div key={pillar.title} className="platform-pillar">
                  <div className="platform-pillar__icon">
                    <IoShieldCheckmarkOutline size={18} />
                  </div>
                  <div className="platform-pillar__content">
                    <div className="platform-pillar__title">{pillar.title}</div>
                    <div className="platform-pillar__desc">{pillar.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── Lifecycle Section ────────────────────────────────────────────────────────
function LifecycleSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const [headerRef, headerVisible] = useReveal()

  // Auto-cycle lifecycle stages on intersection
  useEffect(() => {
    let interval
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setActiveIdx(i => (i + 1) % LIFECYCLE_STAGES.length)
          }, 1400)
        } else {
          clearInterval(interval)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { clearInterval(interval); observer.disconnect() }
  }, [])

  return (
    <section className="section" id="lifecycle" ref={sectionRef} aria-labelledby="lifecycle-heading">
      <div className="container">
        <div
          ref={headerRef}
          className={`lifecycle__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <p className="eyebrow">The Complete Tournament Lifecycle</p>
          <h2 className="h2" id="lifecycle-heading">From discovery to your record.</h2>
          <p className="body-lg" style={{ maxWidth: 560, margin: '16px auto 0' }}>
            Every stage of competition, in one place. No external tools required.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="lifecycle__timeline">
          <div className="lifecycle__track" role="list">
            {LIFECYCLE_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className={`lifecycle__stage${i === activeIdx ? ' active' : i < activeIdx ? ' done' : ''}`}
                role="listitem"
              >
                <div className="lifecycle__node">{stage.num}</div>
                <span className="lifecycle__stage-label">{stage.label}</span>
              </div>
            ))}
          </div>

          <div className="lifecycle__cards">
            {LIFECYCLE_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className={`lifecycle__card${i === activeIdx ? ' active' : ''}`}
              >
                <div className="lifecycle__card-num">{stage.num}</div>
                <div className="lifecycle__card-label">{stage.label}</div>
                <div className="lifecycle__card-body">{stage.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lifecycle__mobile" aria-hidden="false">
          {LIFECYCLE_STAGES.map(stage => (
            <div key={stage.id} className="lc-mobile__step">
              <div className="lc-mobile__line" />
              <div className="lc-mobile__node">{stage.num}</div>
              <div className="lc-mobile__content">
                <div className="lc-mobile__label">{stage.label}</div>
                <div className="lc-mobile__desc">{stage.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Tournament Card ──────────────────────────────────────────────────────────
function TCard({ t, delay }) {
  const [ref, visible] = useReveal(0.1)
  const fillPct = Math.round((t.registered / t.capacity) * 100)
  const isFull = t.registered >= t.capacity

  return (
    <article
      ref={ref}
      className={`t-card reveal${visible ? ` visible reveal-delay-${delay}` : ''}`}
      aria-label={`Tournament: ${t.name}`}
    >
      {/* Thumbnail / Header Image */}
      <div className="t-card__thumb card-image">
        <img
          src={t.image}
          alt={`${t.name} tournament`}
          loading="lazy"
        />
        <span className="t-card__mode-badge">{t.mode}</span>
      </div>

      <div className="t-card__body">
        {/* Verified badge — only when verified */}
        {t.verified && (
          <span className="t-card__verified" aria-label="Verified organizer">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 5 L4.2 7.5 L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Verified Organizer
          </span>
        )}

        <h3 className="t-card__name">{t.name}</h3>

        {/* Economics */}
        <div className="t-card__economics">
          <div className="t-card__econ-item">
            <div className="t-card__econ-label">Entry</div>
            <div className="t-card__econ-value">₹{t.entry}</div>
          </div>
          <div className="t-card__econ-item">
            <div className="t-card__econ-label">Prize Pool</div>
            <div className="t-card__econ-value t-card__econ-value--prize">₹{t.prize.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Meta */}
        <div className="t-card__meta">
          <div className="t-card__meta-row">
            <span>{t.date} · {t.time}</span>
          </div>
          <div className="t-card__meta-row">
            <span>{t.registered} / {t.capacity} participants</span>
            <span className="t-card__meta-val">{Math.round(fillPct)}% full</span>
          </div>
          <div className="t-card__capacity">
            <div className="t-card__capacity-bar">
              <div
                className={`t-card__capacity-fill${isFull ? ' full' : ''}`}
                style={{ width: `${fillPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="t-card__cta">
          <span className={`t-card__status${isFull ? ' full' : t.status === 'Registration Open' ? ' open' : ''}`}>
            {t.status}
          </span>
          <a href="#" className="t-card__link">
            View tournament <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function TournamentsSection() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section className="section section--cloud" id="tournaments" aria-labelledby="tournaments-heading">
      <div className="container">
        <div
          ref={headerRef}
          className={`tournaments__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <div>
            <p className="eyebrow">Upcoming Competition</p>
            <h2 className="h2" id="tournaments-heading">Find your next tournament.</h2>
          </div>
          <a href="#" className="tournaments__view-all">
            View all <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="tournament-grid">
          {TOURNAMENTS.map((t, i) => (
            <TCard key={t.id} t={t} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Trust Section ────────────────────────────────────────────────────────────
function TrustSection() {
  const [ref, visible] = useReveal()

  return (
    <section className="section trust-section section--large" id="trust" aria-labelledby="trust-heading">
      <div className="trust__bg-grid" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <div ref={ref} className={`trust__header reveal${visible ? ' visible' : ''}`}>
          <p className="eyebrow trust__eyebrow">Built Around Trust</p>
          <h2 className="h2 trust__headline" id="trust-heading">Know what you're playing for.</h2>
          <p className="body-lg trust__desc" style={{ marginTop: 16 }}>
            Every element of the platform — rules, results, money, and history — is
            designed to be clear, verified, and auditable.
          </p>
        </div>

        <div className="trust__grid" role="list">
          {TRUST_PILLARS.map((p, i) => (
            <div
              key={p.num}
              className={`trust__pillar reveal${visible ? ` visible reveal-delay-${i + 1}` : ''}${i === 1 ? ' trust__pillar--highlight' : ''}`}
              role="listitem"
            >
              <div className="trust__num">{p.num}</div>
              <h3 className="trust__title">{p.title}</h3>
              <p className="trust__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Career Section ───────────────────────────────────────────────────────────
function CareerSection() {
  const [ref, visible] = useReveal()
  const { name, rank, matches, wins, top3, kills, earnings, recentResults } = PLAYER_CAREER

  return (
    <section className="section" id="career" aria-labelledby="career-heading">
      <div className="container">
        <div
          ref={ref}
          className={`career__layout reveal${visible ? ' visible' : ''}`}
        >
          {/* Left: text + portrait */}
          <div className="career__left">
            <p className="eyebrow">Player Career</p>
            <h2 className="h2" id="career-heading">Your matches become your record.</h2>
            <p className="body-lg">
              Results, kills, placements, prizes, and completed tournaments build a
              competitive history that stays with your profile.
            </p>
            <a href="#" className="btn btn--primary" style={{ marginTop: 32 }}>Start Competing</a>

            {/* Portrait */}
            <div className="career__portrait" style={{ marginTop: 40 }} aria-hidden="true">
              <div className="career__portrait-glow" />
              <div className="career__portrait-silhouette" />
              <div className="career__portrait-rank">{rank}</div>
              <div className="career__portrait-tag">
                <div className="career__portrait-name">{name}</div>
                <div className="career__portrait-sub">Platform Rank {rank}</div>
              </div>
            </div>
          </div>

          {/* Right: dashboard */}
          <div className="career__dashboard" role="region" aria-label="Career dashboard example">
            <div className="career__dash-header">
              <span className="career__dash-title">Career Overview</span>
              <span className="career__dash-player">{name}</span>
            </div>

            <div className="career__stats-row">
              {[
                { val: matches, lbl: 'Matches' },
                { val: wins, lbl: 'Wins' },
                { val: top3, lbl: 'Top 3' },
                { val: kills, lbl: 'Kills' },
                { val: `₹${earnings.toLocaleString('en-IN')}`, lbl: 'Earnings', yellow: true },
              ].map(s => (
                <div key={s.lbl} className="career__stat">
                  <div className={`career__stat-val${s.yellow ? ' career__stat-val--yellow' : ''}`}>{s.val}</div>
                  <div className="career__stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            <div className="career__results">
              <div className="career__results-title">Recent Results</div>
              {recentResults.map((r, i) => (
                <div key={i} className="career__result-row">
                  <span className="career__result-name">{r.tournament}</span>
                  <span className="career__result-date">{r.date}</span>
                  <span className={`career__result-badge${r.result === '#1' ? ' gold' : ''}`}>{r.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
function LeaderboardSection() {
  const [headerRef, headerVisible] = useReveal()
  const [tableRef, tableVisible] = useReveal()

  return (
    <section className="section section--cloud" id="leaderboard" aria-labelledby="lb-heading">
      <div className="container">
        <div
          ref={headerRef}
          className={`lb__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <div>
            <p className="eyebrow">Competitive Rankings</p>
            <h2 className="h2" id="lb-heading">See who is performing.</h2>
          </div>
          <a href="#" className="tournaments__view-all">Full leaderboard <span aria-hidden="true">→</span></a>
        </div>

        <div ref={tableRef} className={`lb__table reveal${tableVisible ? ' visible' : ''}`} role="table" aria-label="Player leaderboard">
          <div className="lb__thead" role="row">
            <span className="lb__th" role="columnheader">Rank</span>
            <span className="lb__th" role="columnheader">Player</span>
            <span className="lb__th" role="columnheader">Score</span>
            <span className="lb__th" role="columnheader">Wins · Kills</span>
            <span className="lb__th" role="columnheader">Trend</span>
          </div>

          {LEADERBOARD.map((p, i) => (
            <div
              key={p.rank}
              className={`lb__row${p.rank === 1 ? ' rank-1' : ''} reveal${tableVisible ? ` visible reveal-delay-${Math.min(i + 1, 7)}` : ''}`}
              role="row"
            >
              <span className="lb__rank" role="cell">
                {String(p.rank).padStart(2, '0')}
              </span>
              <div className="lb__player" role="cell">
                <div className="lb__avatar" aria-hidden="true">{p.name[0]}</div>
                <span className="lb__name">{p.name}</span>
              </div>
              <span className="lb__score" role="cell">{p.score.toLocaleString('en-IN')}</span>
              <span className="lb__stat" role="cell">{p.wins}W · {p.kills}K</span>
              <span className={`lb__trend ${p.trend}`} role="cell" aria-label={`Trend: ${p.trend}`}>
                {p.trend === 'up' ? '↑' : p.trend === 'down' ? '↓' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Roles Section ────────────────────────────────────────────────────────────
function RolesSection() {
  const [ref, visible] = useReveal()

  return (
    <section className="section" id="roles" aria-labelledby="roles-heading">
      <div className="container">
        <div ref={ref} className={`roles__header reveal${visible ? ' visible' : ''}`}>
          <p className="eyebrow">The Platform</p>
          <h2 className="h2" id="roles-heading">One platform. Three roles.</h2>
          <p className="body-lg" style={{ maxWidth: 520, margin: '16px auto 0' }}>
            Built for everyone who makes local competition happen.
          </p>
        </div>

        <div className="roles__grid">
          {ROLES.map((role, i) => (
            <div
              key={role.id}
              className={`role-card reveal${visible ? ` visible reveal-delay-${i + 1}` : ''}`}
              tabIndex="0"
            >
              <div className="role-card__label">{role.label}</div>
              <div className="role-card__tagline">{role.tagline}</div>
              <ul className="role-card__features" aria-label={`${role.label} features`}>
                {role.features.map(f => (
                  <li key={f} className="role-card__feature">{f}</li>
                ))}
              </ul>
              <a href="#" className="role-card__cta">
                {role.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Organizer Section ────────────────────────────────────────────────────────
function OrganizerSection() {
  const [ref, visible] = useReveal()
  const { stats, tournaments, flow } = ORGANIZER_DASHBOARD

  const statusClass = { LIVE: 'live', REGISTRATION: 'reg', UPCOMING: 'upcoming' }

  return (
    <section className="section section--cloud" id="organizer" aria-labelledby="org-heading">
      <div className="container">
        <div ref={ref} className={`organizer__layout reveal${visible ? ' visible' : ''}`}>
          {/* Text */}
          <div className="organizer__text">
            <p className="eyebrow">Organizer Experience</p>
            <h2 className="h2" id="org-heading">
              Run tournaments without running everything manually.
            </h2>
            <p className="body-lg">
              Create tournaments, manage participants, submit results, configure prizes,
              and track earnings — all from one dashboard.
            </p>

            {/* Flow */}
            <div className="org-flow" aria-label="Organizer process flow">
              {flow.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="org-flow__step">
                    <div className="org-flow__dot" />
                    <span className="org-flow__label">{step}</span>
                  </div>
                  {i < flow.length - 1 && <span className="org-flow__arrow" aria-hidden="true"> → </span>}
                </div>
              ))}
            </div>

            <a href="#" className="btn btn--primary" style={{ marginTop: 32 }}>Create a Tournament</a>
          </div>

          {/* UI mockup */}
          <div
            className={`org-ui reveal${visible ? ' visible reveal-delay-2' : ''}`}
            role="img"
            aria-label="Organizer dashboard interface example"
          >
            {/* Window bar */}
            <div className="org-ui__bar">
              <div className="org-ui__dot" /><div className="org-ui__dot" /><div className="org-ui__dot" />
            </div>

            <div className="org-ui__content">
              {/* Stats row */}
              <div className="org-ui__section-title">Dashboard Overview</div>
              <div className="org-ui__stats">
                {stats.map(s => (
                  <div key={s.label} className="org-ui__stat">
                    <div className="org-ui__stat-val">{s.value}</div>
                    <div className="org-ui__stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tournament list */}
              <div className="org-ui__section-title" style={{ marginTop: 16 }}>Active Tournaments</div>
              <div className="org-ui__tournament-list">
                {tournaments.map(t => (
                  <div key={t.name} className="org-ui__t-row">
                    <span className="org-ui__t-name">{t.name}</span>
                    <span className={`org-ui__t-status ${statusClass[t.status] || ''}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Results & Prizes Section ─────────────────────────────────────────────────
function ResultsSection() {
  const [ref, visible] = useReveal()

  const STEP_ICONS = [
    <IoAddCircleOutline        size={14} color="#F4C400" />,
    <IoDocumentTextOutline     size={14} color="#F4C400" />,
    <IoShieldCheckmarkOutline  size={14} color="#F4C400" />,
    <IoTimeOutline             size={14} color="#F4C400" />,
    <IoLockClosedOutline       size={14} color="#F4C400" />,
    <IoCashOutline             size={14} color="#F4C400" />,
  ]

  return (
    <section className="section section--dark" aria-labelledby="results-heading">
      <div className="container">
        <div className={`reveal${visible ? ' visible' : ''}`} style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="eyebrow">Result Verification</p>
          <h2 className="h2" id="results-heading" ref={ref}>
            Results you can trust. Prizes you can track.
          </h2>
          <p className="body-lg" style={{ maxWidth: 520, margin: '16px auto 0' }}>
            The platform's verification process ensures every result is
            evidenced, reviewed, and final before prizes are released.
          </p>
        </div>

        <div className="results__layout">
          {/* Verification flow */}
          <div className={`results__flow reveal${visible ? ' visible reveal-delay-1' : ''}`} aria-label="Result verification flow">
            {RESULT_FLOW.map((step, i) => (
              <div key={step.step} className="results__step">
                <div className="results__step-line" aria-hidden="true" />
                <div className="results__node" aria-hidden="true">
                  {STEP_ICONS[i]}
                </div>
                <div className="results__step-content">
                  <div className="results__step-label">{step.step}</div>
                  <div className="results__step-detail">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Prize categories */}
          <div className={`prizes__grid reveal${visible ? ' visible reveal-delay-2' : ''}`} aria-label="Prize categories">
            <h3 className="h3" style={{ marginBottom: 24 }}>Flexible Prize Engine</h3>
            {PRIZE_CATEGORIES.map(cat => (
              <div key={cat.category}>
                <div className="prize-cat__label">{cat.category}</div>
                <div className="prize-cat__items">
                  {cat.items.map(item => (
                    <div key={item} className="prize-cat__item">{item}</div>
                  ))}
                </div>
              </div>
            ))}
            <p className="body-md" style={{ marginTop: 20, color: 'rgba(255,255,255,.35)', fontSize: 13 }}>
              Placement, kill, hybrid, and custom prize categories. Each tournament
              defines its own structure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function CTASection() {
  const [ref, visible] = useReveal()

  return (
    <section className="cta section--dark" aria-labelledby="cta-heading">
      <div className="cta__bg" aria-hidden="true" />
      <div className="cta__grid" aria-hidden="true" />
      <div className="container" style={{ width: '100%' }}>
        <div ref={ref} className={`cta__content reveal${visible ? ' visible' : ''}`}>
          <p className="cta__eyebrow">Start Competing</p>
          <h2 className="cta__h" id="cta-heading">Your next match is waiting.</h2>
          <p className="cta__body">
            Find a tournament. Compete with your squad. Start building your record.
          </p>
          <div className="cta__actions">
            <a href="#tournaments" className="btn btn--primary btn--lg">Explore Tournaments</a>
            <a href="#" className="btn btn--ghost-dark btn--lg">Create a Tournament</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer__upper">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-name">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <polygon points="10,2 18,17 2,17" stroke="#F4C400" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(244,196,0,0.12)"/>
                <line x1="10" y1="8" x2="10" y2="13" stroke="#F4C400" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="10" cy="15.5" r="0.9" fill="#F4C400"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,.9)' }}>FF</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F4C400', display: 'inline-block', margin: '0 2px 1px' }} aria-hidden="true" />
              <span style={{ color: '#F4C400' }}>WAR</span>
            </div>
            <p className="footer__brand-desc">
              Local Free Fire competition, organized. Tournament platform for players, organizers, and communities.
            </p>
          </div>

          {/* 3-column navigation grid */}
          <div className="footer__nav-grid">
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col} className="footer__col">
                <div className="footer__col-title">{col}</div>
                <ul className="footer__links" role="list">
                  {links.map(l => (
                    <li key={l.label}>
                      <a href={l.href} className="footer__link">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__lower">
          <p className="footer__copyright">© 2026 FF War. All rights reserved.</p>
          <p className="footer__badge">Local Competition · Organized</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ScrollHero content={HERO_CONTENT} />
        <ProblemSection />
        <LifecycleSection />
        <TournamentsSection />
        <TrustSection />
        <CareerSection />
        <LeaderboardSection />
        <RolesSection />
        <OrganizerSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

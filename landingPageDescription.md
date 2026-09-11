Perfect. We’ve locked the **hero direction and positioning**, so the next step is the actual **UI/UX design system for the landing page**.

I’m going to keep this grounded in the tournament platform specification: the platform is built around **Players, Organizers, and Admins**, with discovery → registration → payment → competition → results → prizes → player history as the core lifecycle. 

# STEP 3 — LANDING PAGE UI/UX DESIGN SPEC

## 1. Overall visual direction

The landing page should communicate:

> **Competitive, but calm.**
> **Modern, but not sterile.**
> **Gaming, but not childish.**
> **Professional, but not corporate.**

Think:

**Premium sports platform + SaaS product + Free Fire identity**

—not—

**Free Fire loading screen + esports poster + gaming casino UI.**

### The visual hierarchy

```text
                    BRAND
                      ↓
                 TRUST / CLARITY
                      ↓
                TOURNAMENTS
                      ↓
                  COMPETE
                      ↓
                YOUR RECORD
                      ↓
             ORGANIZER / ADMIN
                      ↓
                FINAL ACTION
```

The page should progressively answer:

1. What is this?
2. Why does it exist?
3. How does it work?
4. What can I play?
5. Why should I trust it?
6. What happens to my results?
7. Can I use it as an organizer?
8. What should I do now?

---

# 2. Global design system

## Background

Primary:

```text
#F7F8FA
```

Secondary:

```text
#FFFFFF
```

Dark sections:

```text
#101318
```

Deepest text:

```text
#111318
```

Secondary text:

```text
#626873
```

Borders:

```text
#E6E8EC
```

### Accent

Use the Free Fire-inspired yellow carefully:

```text
#F5C400
```

But the important rule is:

> **Yellow is an accent, not the environment.**

Don't turn the whole site yellow.

Use it for:

* active navigation
* tiny labels
* CTA accents
* icons
* ranking highlights
* small lines
* decorative geometry
* important numbers

---

# 3. Typography

The typography should feel like a **professional competition platform**, not a gaming poster.

### Primary font

Something in the territory of:

**Inter / Manrope / Plus Jakarta Sans**

Use one primary family rather than mixing five fonts.

### Headings

Strong:

```text
font-weight: 700–800
letter-spacing: -0.035em
```

Example:

> Play. Compete. Build your record.

Large but controlled.

### Body

```text
16–18px
line-height: 1.6
```

### Micro labels

```text
11–12px
font-weight: 600
letter-spacing: 0.08em
text-transform: uppercase
```

These tiny labels are useful for the sports-platform feeling.

---

# 4. Navigation

Desktop:

```text
┌──────────────────────────────────────────────────────────────┐
│  FREE FIRE WAR     Tournaments   Leaderboard   How it works   │
│                                                Sign in  [Play]│
└──────────────────────────────────────────────────────────────┘
```

### Left

Logo:

**FREE FIRE WAR**

Keep it clean.

Avoid:

* giant flame
* aggressive skull
* excessive weapon imagery
* glowing logo

A small yellow graphic element can sit beside the wordmark.

### Navigation

* Tournaments
* Leaderboard
* How It Works
* About

Right:

**Sign in**

and a primary CTA:

**Explore Tournaments**

### Sticky behavior

At the beginning:

transparent/light.

After scrolling:

```text
background: rgba(255,255,255,.92)
backdrop-filter: blur(...)
border-bottom: 1px solid #E6E8EC
```

Very subtle.

---

# 5. HERO

Locked content:

### Eyebrow

**THE HOME OF LOCAL FREE FIRE COMPETITION**

### Headline

# Play. Compete. Build your record.

### Supporting text

> Find tournaments, compete with your squad, track your results, and build a competitive history that stays with you.

### CTA

**Explore Tournaments**

Secondary:

**How It Works**

---

## Hero composition

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  THE HOME OF LOCAL FREE FIRE COMPETITION                    │
│                                                             │
│  Play. Compete.              ┌───────────────────────────┐  │
│  Build your record.          │                           │  │
│                              │    RESTRAINED FREE FIRE   │  │
│  Find tournaments...         │    CINEMATIC VISUAL       │  │
│                              │                           │  │
│  [Explore Tournaments]       │                           │  │
│  [How It Works]              └───────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The right-side image should **not** be a chaotic battle scene.

Instead:

* one character
* controlled environment
* atmospheric lighting
* strong silhouette
* minimal background activity
* yellow visual accent
* generous negative space

The visual should support the typography rather than compete with it.

---

# 6. HERO → PROBLEM TRANSITION

Immediately after the hero, don't jump into another giant gaming visual.

Instead, create a calm transition.

Small label:

**LOCAL COMPETITION, ORGANIZED**

Large statement:

# Competition shouldn't feel complicated.

Then explain the problem.

The specification explicitly identifies the fragmented workflow around local tournaments: messaging groups, social media, forms, payment screenshots, spreadsheets, and manual result handling. 

Visually:

```text
WhatsApp       Forms       Payments
     \            |            /
      \           |           /
       \          |           /
          FRAGMENTED
              ↓
        FREE FIRE WAR
              ↓
           ORGANIZED
```

But **do not literally recreate WhatsApp/Telegram interfaces**.

Use abstract cards.

---

# 7. SECTION — “FROM CHAOS TO CLARITY”

This is one of the strongest sections.

### Heading

# One place for the entire competition.

Supporting:

> Discover tournaments, register your squad, play, see verified results, receive prizes, and keep your competitive history together.

Then a horizontal lifecycle:

```text
DISCOVER
   ↓
REGISTER
   ↓
PAY
   ↓
PLAY
   ↓
RESULTS
   ↓
PRIZES
   ↓
HISTORY
```

This directly reflects the platform lifecycle in the specification. 

### UI treatment

Each stage gets a small card.

Not giant cards.

Approximately:

```text
160–190px width
120px height
```

Lots of whitespace.

Thin connecting line.

Yellow only appears at the currently highlighted stage.

---

# 8. TOURNAMENT DISCOVERY

Now we introduce actual competition.

Eyebrow:

**TOURNAMENTS**

Heading:

# Find your next tournament.

Supporting:

> Browse competitions, compare entry details, and choose where you want to play.

---

## Tournament card

Each card should look closer to a professional sports fixture than an esports poster.

```text
┌─────────────────────────────────────┐
│ VERIFIED ORGANIZER                  │
│                                     │
│ Weekend Squad Clash                 │
│                                     │
│ ₹50 Entry       ₹5,000 Prize       │
│                                     │
│ SAT · 8:00 PM                      │
│ 24 / 48 TEAMS                       │
│                                     │
│ [View Tournament]                  │
└─────────────────────────────────────┘
```

Important:

**Do not invent these values in the actual implementation.**

They are structural examples only.

All real values must come from the tournament data.

The specification explicitly defines tournament information such as entry fee, prize pool, date/time, participant limits, registration status, and organizer information. 

---

# 9. TRUST SECTION

This should be visually quieter.

Dark background.

Small yellow line.

Eyebrow:

**BUILT AROUND TRUST**

Headline:

# Know what you're playing for.

Four pillars:

### 01

**Clear Rules**

Rules and tournament information are visible before registration.

### 02

**Verified Results**

Results move through the platform's verification process.

### 03

**Transparent Money**

Entry fees, prizes, and financial activity are structured through the platform.

### 04

**Your History**

Your completed tournaments become part of your competitive record.

These aren't random marketing claims—the specification makes trust, transparent economics, verified results, auditability, and player history core principles of the platform. 

---

# 10. PLAYER CAREER SECTION

This should be one of the **signature sections**.

Because the platform isn't supposed to merely help someone enter tournaments.

It builds a record.

Eyebrow:

**YOUR COMPETITIVE HISTORY**

Headline:

# Every tournament becomes part of your record.

Visual:

```text
┌─────────────────────────────────────────────┐
│ PLAYER                                      │
│                                             │
│  27          8          14          ₹12,500 │
│ Matches    Wins      Top Finishes   Earnings│
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ Tournament        Result       Date         │
│ ─────────────────────────────────────────── │
│ Squad Clash       #1           ...          │
│ Weekend Cup       #4           ...          │
│ Community War     #2           ...          │
│                                             │
└─────────────────────────────────────────────┘
```

This is essentially the visual representation of the **Player Career/History** concept from the specification. 

### Important

Don't make this look like a generic SaaS analytics dashboard.

It should feel like:

**athlete career record**

rather than:

**business analytics.**

---

# 11. LEADERBOARD

A very restrained sports-ranking section.

Eyebrow:

**COMPETITIVE RANKINGS**

Headline:

# See who is performing.

Example visual:

```text
01   PLAYER NAME             1,842
02   PLAYER NAME             1,716
03   PLAYER NAME             1,604
04   PLAYER NAME             1,531
05   PLAYER NAME             1,492
```

Use:

* position
* player
* score/ranking metric
* small result indicator

Avoid giant flames and “#1 KILLER” style gaming language.

The platform specification explicitly includes leaderboards within the player experience. 

---

# 12. THREE ROLES

This section explains the ecosystem.

Headline:

# Built for everyone behind the match.

Three equal columns:

### PLAYER

**Find. Compete. Build your record.**

* Discover tournaments
* Register
* Play
* Track results
* View history

### ORGANIZER

**Create. Manage. Grow.**

* Create tournaments
* Manage participants
* Publish results
* Handle prize workflows
* Track earnings

### ADMIN

**Verify. Resolve. Protect.**

* Verify organizers
* Review tournaments
* Handle disputes
* Manage payouts
* Maintain platform integrity

These three roles are foundational to the product architecture. 

---

# 13. ORGANIZER SECTION

Now switch perspective.

Dark/light split.

Left:

# Run tournaments without running everything manually.

Right:

A clean organizer interface showing:

```text
Tournament
Participants
Payments
Results
Prize
Status
```

Then a simple progression:

```text
CREATE
   →
MANAGE
   →
VERIFY
   →
SETTLE
```

This demonstrates that the product isn't only a player-facing marketplace.

The specification gives organizers tournament creation, participant management, results, prize/earnings management, and tournament history as core responsibilities. 

---

# 14. RESULTS + PRIZES

This should be a particularly trustworthy section.

Headline:

# Results you can trust. Prizes you can track.

Visual flow:

```text
RESULT SUBMITTED
        ↓
EVIDENCE
        ↓
VERIFICATION
        ↓
FINAL RESULT
        ↓
PRIZE SETTLEMENT
```

Small supporting text explains that the platform's trust architecture includes result verification, dispute handling, payout workflows, and auditability. 

### Visual style

Don't use:

❌ money raining
❌ cash graphics
❌ coins flying
❌ giant ₹ symbols

Instead:

Use a **clean transaction/result timeline**.

---

# 15. FINAL CTA

The final section should be dramatically simpler.

Large dark section.

Headline:

# Your next match is waiting.

Supporting:

> Find a tournament. Play with your squad. Start building your record.

Button:

**Explore Tournaments**

Secondary:

**Create a Tournament**

The page should end with confidence, not hype.

---

# 16. FOOTER

Very minimal.

```text
FREE FIRE WAR

Tournaments
Leaderboard
How It Works
About

For Players
For Organizers
Admin

Terms
Privacy
Support
```

Bottom:

```text
© FREE FIRE WAR
```

Only include actual links/features when they exist in the implementation.

---

# 17. Animation language

This is **extremely important** for your “less hurry, bustle, commotion, or excitement” requirement.

The page should feel like it has **time**.

### Hero

Very slow:

```text
scale: 1 → 1.025
```

over several seconds.

Very subtle atmospheric movement.

### Text

Use:

```text
opacity: 0 → 1
translateY: 16px → 0
```

Duration:

```text
600–900ms
```

### Cards

On scroll:

```text
opacity
+
8–16px upward movement
```

No bouncing.

### Tournament cards

Hover:

```text
translateY(-2px)
```

Maybe a very subtle border/accent change.

### Navigation

Smooth.

### Avoid completely

* glitch
* shake
* rapid zoom
* flashing
* spinning
* aggressive particle effects
* cursor explosions
* constant moving backgrounds
* huge parallax
* auto-scrolling card carousels

---

# 18. Mobile design

Mobile isn't a shrunken desktop.

It should be independently composed.

At roughly:

```text
390 × 844
```

Hero:

```text
┌─────────────────────┐
│ FREE FIRE WAR       │
│                 ☰   │
│                     │
│ THE HOME OF...      │
│                     │
│ Play. Compete.      │
│ Build your record.  │
│                     │
│ Find tournaments... │
│                     │
│ [Explore]           │
│                     │
│   CINEMATIC         │
│   VISUAL            │
│                     │
└─────────────────────┘
```

Don't put a complicated multi-column composition into mobile.

---

# 19. Mobile tournament cards

One column.

```text
┌─────────────────────────┐
│ VERIFIED                │
│                         │
│ Weekend Squad Clash     │
│                         │
│ ₹50       ₹5,000        │
│ Entry     Prize         │
│                         │
│ SAT · 8 PM              │
│                         │
│ [View Tournament]       │
└─────────────────────────┘
```

Spacing is more important than information density.

---

# 20. Responsive breakpoints

Use approximately:

```text
≤ 767px       Mobile
768–1199px    Tablet
≥ 1200px      Desktop
```

Test specifically:

```text
390 × 844
375 × 812
412 × 915
768 × 1024
1440 × 900
```

And ensure:

**zero horizontal overflow.**

---

# 21. Page rhythm

This is what will make the design feel “premium.”

Don't make every section visually loud.

Use this rhythm:

```text
LIGHT
  ↓
LIGHT
  ↓
LIGHT
  ↓
DARK
  ↓
LIGHT
  ↓
LIGHT
  ↓
DARK
  ↓
LIGHT
```

And alternate:

**information → visual → information → proof → product → CTA**

rather than:

**giant image → giant image → giant image → giant image.**

---

# 22. The most important design principle

The screenshot you showed has a lot of **information and visual energy**.

That can work inside the actual dashboard.

But the landing page has a different job.

### Dashboard

> “There is a lot happening here.”

### Landing page

> **“Everything is under control.”**

That distinction should drive the entire design.

The platform itself is solving fragmentation and operational chaos; therefore the landing page should visually demonstrate the solution by being **organized, spacious, predictable, and trustworthy**. 

---

## Final page flow

```text
NAV
 │
 ▼
HERO
"Play. Compete. Build your record."
 │
 ▼
PROBLEM
"Competition shouldn't feel complicated."
 │
 ▼
SOLUTION
"One place for the entire competition."
 │
 ▼
TOURNAMENTS
"Find your next tournament."
 │
 ▼
TRUST
"Know what you're playing for."
 │
 ▼
PLAYER CAREER
"Every tournament becomes part of your record."
 │
 ▼
LEADERBOARD
"See who is performing."
 │
 ▼
ROLES
"Built for everyone behind the match."
 │
 ▼
ORGANIZER
"Run tournaments without running everything manually."
 │
 ▼
RESULTS / PRIZES
"Results you can trust. Prizes you can track."
 │
 ▼
FINAL CTA
"Your next match is waiting."
 │
 ▼
FOOTER
```

### Next production step

Now that **content architecture + visual direction + UI/UX structure** are defined, the next step should be **Step 4: actual high-fidelity screen specification** — section-by-section pixel-level layout, exact container widths, spacing scale, typography sizes, button dimensions, card geometry, image placement, desktop/mobile compositions, and the exact visual treatment for the Free Fire artwork.

That is the point where we can move from **“what the landing page should be”** to **“exactly how to build it.”**

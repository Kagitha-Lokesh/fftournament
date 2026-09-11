Yes — now we go to the **actual build blueprint**.

I’m keeping this strictly on the **Free Fire Tournament Platform**. The source establishes the product around three dashboards—Player, Organizer, Admin—with the tournament lifecycle, trust/verification, financial handling, results, and persistent career history as foundational product concepts.

# STEP 6 — HIGH-FIDELITY HOMEPAGE BLUEPRINT

This is the bridge between **design direction** and **coding**.

The rule now is:

> **Every section gets a precise job, hierarchy, geometry, interaction, and responsive behavior.**

---

# 01 — GLOBAL PAGE FRAME

## Desktop

```text
Viewport:          1440 × 900
Max content:       1280px
Side margin:       80px
Grid:              12 columns
Column gap:        24px
```

Content width:

```text
1280px
```

At larger displays, don't allow content to stretch endlessly.

```text
1440px viewport
       ↓
80px margin
       ↓
1280px content
       ↓
80px margin
```

This creates the controlled feeling we want.

---

# 02 — HEADER

### Height

```text
72px
```

Structure:

```text
┌────────────────────────────────────────────────────────────┐
│  FF WAR       Tournaments   Leaderboard   How it works     │
│                                             Sign in  [Play]│
└────────────────────────────────────────────────────────────┘
```

### Left

Original platform logo/wordmark.

Do **not** reproduce an official publisher/game logo.

### Center

```text
Tournaments
Leaderboard
How it works
```

Optional:

```text
About
```

### Right

```text
Sign in
[Explore Tournaments]
```

---

# 03 — HEADER BEHAVIOR

Initial:

```text
background: transparent
```

Once the user scrolls:

```text
background: rgba(255,255,255,.94)
border-bottom: 1px solid #E5E7EB
```

Transition:

```text
200–250ms
```

No dramatic shrinking header.

---

# 04 — HERO GEOMETRY

Hero height:

```text
760–820px
```

Desktop grid:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   5.5 columns                 6.5 columns                   │
│                                                             │
│   TEXT                         VISUAL                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Text begins approximately:

```text
x = 80px
```

Vertical position:

```text
~180–210px from top
```

---

# 05 — HERO CONTENT

### Eyebrow

```text
THE HOME OF LOCAL FREE FIRE COMPETITION
```

Size:

```text
12px
```

### H1

```text
Play. Compete.
Build your record.
```

Size:

```text
72px desktop
```

Line-height:

```text
~0.98
```

Width:

```text
600px
```

### Body

```text
Find tournaments, compete with your squad,
track your results, and build a competitive
history that stays with you.
```

Maximum width:

```text
520px
```

### Actions

```text
[ Explore Tournaments ]   [ How It Works ]
```

---

# 06 — HERO VISUAL POSITION

The artwork begins approximately:

```text
x = 680px
```

and extends toward:

```text
x = 1400px
```

It should visually bleed toward the right edge.

This makes the page feel more cinematic without requiring a full-screen background.

---

# 07 — HERO VISUAL MASK

Instead of a hard rectangular image:

```text
████████████████
```

use a soft composition:

```text
             █████████
          █████████████
       █████████████████
    █████████████████████
```

The left edge can gradually disappear into the page background.

This lets the artwork coexist with the typography.

---

# 08 — HERO DECORATION

One thin yellow diagonal system.

For example:

```text
                    /
                   /
                  /
                 /
```

Opacity:

```text
10–15%
```

Add perhaps a small metadata marker:

```text
LOCAL COMPETITION
01
```

But keep it almost invisible.

---

# 09 — SECTION TRANSITION

After the hero, introduce breathing room.

Don't immediately throw a giant card grid at the visitor.

Approximately:

```text
96–120px
```

Then:

```text
LOCAL COMPETITION, ORGANIZED
```

---

# 10 — PROBLEM SECTION

### Heading

# Competition shouldn't feel complicated.

Width:

```text
700px
```

Alignment:

**left**

Not centered.

This gives the page a more editorial/professional character.

---

# 11 — PROBLEM VISUAL

Place four small cards underneath.

```text
┌──────────────┐
│ REGISTRATION │
│    FORM      │
└──────────────┘

┌──────────────┐
│   PAYMENT    │
│  SCREENSHOT  │
└──────────────┘

┌──────────────┐
│   RESULTS    │
│  SPREADSHEET │
└──────────────┘

┌──────────────┐
│    CHAT      │
│    GROUP     │
└──────────────┘
```

These represent the fragmentation described in the specification. 

### Important

These are **conceptual illustrations**, not claims that the platform integrates with those services.

---

# 12 — VISUAL TRANSFORMATION

Under the four cards:

```text
                         ↓
                  ONE PLATFORM
                         ↓
              STRUCTURED COMPETITION
```

Then the next section begins.

This creates the first major narrative transition:

**fragmentation → organization.**

---

# 13 — LIFECYCLE SECTION

Background:

```text
#FFFFFF
```

Eyebrow:

**THE COMPLETE TOURNAMENT LIFECYCLE**

Heading:

# From discovery to your record.

Use the actual lifecycle:

```text
DISCOVER
   →
REGISTER
   →
PAY
   →
PLAY
   →
RESULTS
   →
PRIZES
   →
HISTORY
```

The specification explicitly defines discovery, registration, payment, play, results, prizes, and career history as the centralized lifecycle. 

---

# 14 — LIFECYCLE INTERACTION

As the user scrolls, each stage becomes active.

Example:

```text
DISCOVER
   ✓
```

then:

```text
DISCOVER ─ REGISTER
             ✓
```

then:

```text
DISCOVER ─ REGISTER ─ PAY
                         ✓
```

Yellow line progressively extends.

But the animation should be:

**slow + precise.**

---

# 15 — TOURNAMENT DISCOVERY

This is the first genuinely product-heavy section.

Background:

```text
#F6F7F9
```

Eyebrow:

**UPCOMING COMPETITION**

Heading:

# Find your next tournament.

Right side:

```text
View all →
```

---

# 16 — TOURNAMENT GRID

Desktop:

```text
3 columns
```

Gap:

```text
24px
```

Card:

```text
~410px × 330px
```

Depending on container width.

---

# 17 — TOURNAMENT CARD STRUCTURE

```text
┌──────────────────────────────────────┐
│                                      │
│  small environment image             │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  ✓ VERIFIED ORGANIZER                │
│                                      │
│  TOURNAMENT NAME                     │
│                                      │
│  Squad / Solo                        │
│                                      │
│  ENTRY           PRIZE               │
│  ₹XX             ₹XXXX              │
│                                      │
│  DATE · TIME                         │
│                                      │
│  24 / 48 PARTICIPANTS                │
│                                      │
│  View tournament →                   │
└──────────────────────────────────────┘
```

---

# 18 — CARD HIERARCHY

The eye should follow:

```text
Tournament name
       ↓
Prize
       ↓
Entry
       ↓
Time
       ↓
Availability
       ↓
CTA
```

Don't make:

**ENTRY FEE**

the biggest element.

The tournament itself is the primary information.

---

# 19 — CARD IMAGE

Image height:

```text
120–140px
```

Don't put text over the image.

This is deliberate.

We want readability.

---

# 20 — TRUST INDICATOR

Use a small badge:

```text
✓ PLATFORM VERIFIED
```

or:

```text
✓ VERIFIED ORGANIZER
```

only when the corresponding backend state exists.

The specification explicitly requires trust badges to reflect actual verification state. 

---

# 21 — TRUST SECTION

Now transition into a dark section.

```text
#101318
```

Top padding:

```text
128px
```

Eyebrow:

**BUILT AROUND TRUST**

Headline:

# Know what you're playing for.

---

# 22 — TRUST FOUR-COLUMN SYSTEM

```text
01                 02                 03                 04

CLEAR RULES        VERIFIED RESULTS   TRANSPARENT        YOUR
                                      MONEY              HISTORY
```

Each has:

### Number

12px yellow.

### Title

18–20px white.

### Description

15–16px grey.

---

# 23 — TRUST VISUAL

Behind the four columns:

very subtle grid.

```text
┼────┼────┼────┼────┼
│    │    │    │    │
├────┼────┼────┼────┼
│    │    │    │    │
└────┴────┴────┴────┴
```

Opacity:

```text
3–5%
```

This makes the section feel technical without becoming “cyber.”

---

# 24 — PLAYER CAREER SECTION

Return to white.

Eyebrow:

**PLAYER CAREER**

Heading:

# Your matches become your record.

The persistent player history is not a side feature; the source explicitly calls Player Career/History one of the foundational areas to build from day one. 

---

# 25 — CAREER LAYOUT

Desktop:

```text
5 columns                 7 columns
PLAYER                    CAREER
PORTRAIT                   INTERFACE
```

Left:

large portrait.

Right:

career dashboard.

---

# 26 — CAREER DASHBOARD

Top:

```text
MATCHES       WINS       TOP 3       KILLS       EARNINGS
```

Then:

```text
RECENT TOURNAMENTS
```

Then result rows.

Then:

```text
PERFORMANCE TREND
```

The specification's player dashboard includes tournament counts, wins, top-three finishes, kills, earnings, upcoming tournaments, active tournament countdown, and recent results. 

---

# 27 — CAREER VISUAL

Don't make this look like accounting software.

Use:

* large numbers
* compact metadata
* ranking position
* tournament badges
* result indicators

The emotional message is:

> **“My matches are building something.”**

---

# 28 — LEADERBOARD

Eyebrow:

**COMPETITIVE RANKINGS**

Heading:

# See who is performing.

Use a wide table.

```text
┌────────────────────────────────────────────────────────┐
│ RANK     PLAYER                         PERFORMANCE     │
│                                                        │
│ 01       PLAYER NAME                   1,842            │
│ 02       PLAYER NAME                   1,716            │
│ 03       PLAYER NAME                   1,604            │
│ 04       PLAYER NAME                   1,531            │
│ 05       PLAYER NAME                   1,492            │
└────────────────────────────────────────────────────────┘
```

These numbers are placeholders only.

---

# 29 — LEADERBOARD DETAIL

First-place row:

```text
01
```

gets a thin yellow vertical line.

No giant trophy.

No fire animation.

No “KING OF THE LOBBY.”

Professional ranking.

---

# 30 — THREE ROLE SECTION

Background:

```text
#F6F7F9
```

Heading:

# One platform. Three roles.

Three cards:

```text
┌───────────────┐
│ PLAYER        │
│               │
│ Compete.      │
│ Build your    │
│ record.       │
└───────────────┘

┌───────────────┐
│ ORGANIZER     │
│               │
│ Create.       │
│ Manage.       │
│ Grow.         │
└───────────────┘

┌───────────────┐
│ ADMIN         │
│               │
│ Verify.       │
│ Resolve.      │
│ Protect.      │
└───────────────┘
```

These are the three actual platform roles; Admin is the super-role rather than a separate fourth system. 

---

# 31 — ORGANIZER SECTION

Background:

```text
#FFFFFF
```

Left:

```text
ORGANIZER EXPERIENCE

Run tournaments
without running everything
manually.
```

Right:

large UI mockup.

---

# 32 — ORGANIZER UI

Show:

```text
ACTIVE TOURNAMENTS
────────────────────

Tournament A       LIVE
Tournament B       REGISTRATION
Tournament C       UPCOMING

────────────────────

REGISTRATIONS
REVENUE
PENDING SETTLEMENT
```

The actual organizer dashboard includes active tournaments, completed tournaments, total players, revenue, pending settlement, rating, and completion. 

---

# 33 — ORGANIZER FLOW

Under the mockup:

```text
CREATE
   →
MANAGE
   →
SUBMIT RESULTS
   →
SETTLE
```

This makes the organizer value proposition immediately understandable.

---

# 34 — RESULTS SECTION

Dark background again.

Eyebrow:

**RESULT VERIFICATION**

Heading:

# Results you can trust.

Then:

```text
RESULT SUBMITTED
        │
        ▼
EVIDENCE
        │
        ▼
VERIFICATION
        │
        ▼
DISPUTE WINDOW
        │
        ▼
FINAL RESULT
        │
        ▼
PRIZE SETTLEMENT
```

The source explicitly specifies that results should move through evidence, verification, dispute handling, and finalization before prizes settle. 

---

# 35 — WHY THIS SECTION MATTERS

This section answers a huge user concern:

> **“If I win, what proves that the result is real?”**

That's more valuable than another character image.

And it differentiates the platform from the fragmented workflows described in the product specification.

---

# 36 — PRIZE SECTION

Below the result workflow, show a compact prize model.

```text
PLACEMENT
1st
2nd
3rd

KILLS
Most kills
2nd
3rd

SPECIAL
MVP
Best Team
Fair Play
```

The prize engine supports placement, kill, hybrid, and custom categories. 

So visually communicate:

**flexible tournament economics**

rather than:

**every tournament pays the same way.**

---

# 37 — FINAL CTA

Now we deliberately remove complexity.

Dark background.

Centered.

```text
START COMPETING

Your next match is waiting.

Find a tournament, compete with your squad,
and start building your record.

[ Explore Tournaments ]
```

Secondary:

```text
Create a Tournament →
```

---

# 38 — FINAL CTA HEIGHT

Approximately:

```text
520px
```

No giant artwork required.

Potentially use a very subtle background crop of the hero environment at:

```text
opacity: 0.15
```

The page should end quietly.

---

# 39 — FOOTER

Two levels.

### Upper

```text
FREE FIRE WAR

Tournaments
Leaderboard
How it works
About
```

### Product

```text
Players
Organizers
Admin
```

### Legal

```text
Privacy
Terms
Support
```

Then:

```text
© FREE FIRE WAR
```

Only expose actual routes once implemented.

---

# 40 — MOBILE BLUEPRINT

Now the desktop structure changes.

### Header

```text
┌─────────────────────────────┐
│ FREE FIRE WAR           ☰   │
└─────────────────────────────┘
```

Height:

```text
64px
```

---

# 41 — MOBILE HERO

```text
┌─────────────────────────────┐
│                             │
│ THE HOME OF LOCAL...        │
│                             │
│ Play. Compete.              │
│ Build your record.          │
│                             │
│ Find tournaments...         │
│                             │
│ [ Explore Tournaments ]     │
│ [ How It Works ]            │
│                             │
│                             │
│        HERO VISUAL          │
│                             │
└─────────────────────────────┘
```

H1:

```text
44–48px
```

---

# 42 — MOBILE TOURNAMENTS

One column.

No 3-column compression.

```text
TOURNAMENT
─────────────
Tournament name

₹30       ₹1,440
Entry     Prize

08 SEP · 8 PM

24 / 48

[View tournament]
```

---

# 43 — MOBILE CAREER

Portrait moves above interface.

```text
PLAYER PORTRAIT

↓
CAREER STATS

24
MATCHES

6
WINS

11
TOP 3

187
KILLS

↓
RECENT RESULTS
```

This gives the section a natural narrative flow.

---

# 44 — MOBILE TRUST

Four pillars become a vertical sequence:

```text
01  CLEAR RULES
│
02  VERIFIED RESULTS
│
03  TRANSPARENT MONEY
│
04  YOUR HISTORY
```

A vertical line connects them.

---

# 45 — MOBILE ROLES

Stack:

```text
PLAYER
↓
ORGANIZER
↓
ADMIN
```

Each card approximately:

```text
100–140px tall
```

No horizontal carousel.

---

# 46 — MOBILE RESULTS

The result pipeline becomes vertical:

```text
RESULT
  ↓
EVIDENCE
  ↓
VERIFICATION
  ↓
DISPUTE
  ↓
FINAL
  ↓
SETTLEMENT
```

Very easy to scan.

---

# 47 — RESPONSIVE BREAKPOINTS

Use:

```text
< 768px
Mobile

768–1199px
Tablet

≥ 1200px
Desktop
```

But components should respond fluidly rather than relying exclusively on breakpoints.

---

# 48 — TABLET

At 768–1024:

Hero:

```text
~50/50
```

Tournament cards:

```text
2 columns
```

Roles:

```text
3 columns
```

Career:

```text
portrait above or beside depending on width
```

Leaderboard can remain horizontal with reduced padding.

---

# 49 — MOTION SYSTEM

Use only three motion families.

### 1. Reveal

```text
opacity
+
translateY(12–20px)
```

### 2. Emphasis

```text
border/accent
```

### 3. Ambient

Very subtle hero movement.

That's it.

---

# 50 — MOTION TIMING

Standard:

```text
500–700ms
```

Hero ambient:

```text
8–15 seconds
```

Hover:

```text
180–250ms
```

Easing:

Use smooth deceleration.

No spring/bounce unless a very specific UI interaction warrants it.

---

# 51 — WHAT HAPPENS WHEN THE USER STOPS SCROLLING?

Nothing dramatic.

The interface simply settles.

This is an important part of the brand.

The platform should feel:

> **stable**

rather than:

> constantly trying to entertain you.

---

# 52 — PERFORMANCE PRIORITY

Order of importance:

```text
1. Text
2. CTA
3. Tournament information
4. Product UI
5. Images
6. Decorative animation
```

If the browser is under load:

**decoration loses first.**

Never sacrifice core content for visual effects.

---

# 53 — ACCESSIBILITY PRIORITY

All primary actions must remain usable without animation.

For:

```css
prefers-reduced-motion: reduce
```

remove:

* hero movement
* section transforms
* animated decorative lines
* complex hover movement

The actual information remains identical.

---

# 54 — THE COMPLETE VISUAL JOURNEY

Now we can see what the visitor experiences:

```text
                 HERO
                  │
          "I understand this."
                  ↓
               PROBLEM
                  │
          "I recognize this."
                  ↓
               LIFECYCLE
                  │
          "This solves it."
                  ↓
             TOURNAMENTS
                  │
          "I can play here."
                  ↓
                TRUST
                  │
          "I can trust this."
                  ↓
             MY RECORD
                  │
       "My results matter here."
                  ↓
             LEADERBOARD
                  │
          "There is competition."
                  ↓
               ROLES
                  │
       "This works for everyone."
                  ↓
              ORGANIZER
                  │
          "I can run events."
                  ↓
          RESULTS / PRIZES
                  │
        "The system is accountable."
                  ↓
               CTA
                  │
          "Let's compete."
```

That's the actual story.

---

# 55 — THE LANDING PAGE'S SECRET WEAPON

The most important visual isn't the hero character.

It's the **transition from fragmented competition → structured competition**.

The source says the platform's goal is explicitly broader than a tournament-registration site: it is intended as a local esports ecosystem where tournaments, results, payments, organizers, and players have verifiable history. 

Therefore the landing page should visually evolve from:

**messy**

→ **organized**

→ **trusted**

→ **measurable**

→ **competitive**

→ **persistent record**

That gives the page an actual narrative instead of eleven unrelated marketing sections.

---

# STEP 7 — READY FOR IMPLEMENTATION

We now have:

* Product positioning
* Landing-page information architecture
* Visual identity
* Color system
* Typography direction
* Asset direction
* Desktop layout
* Mobile layout
* Component hierarchy
* Animation rules
* Trust rules
* Product/data boundaries
* Responsive behavior


```

including the reusable tournament card, leaderboard, trust badge, role card, career panel, responsive navigation, data model, animation utilities, and the separation between **static marketing content and future API-driven tournament data**.

That is where we can start turning this blueprint into the actual working landing page.

Yes. One correction first: my previous response accidentally drifted back into the **invitation/video-generation project** instead of continuing the **Free Fire tournament landing page**. I’ve re-anchored to the actual Free Fire platform spec. The product’s core is a trusted ecosystem covering discovery, registration, payment, play, results, prizes, and career history across exactly three roles: Player, Organizer, and Admin.

So let's continue properly.

# STEP 4 — HIGH-FIDELITY LANDING PAGE SPEC

Now we move from **concept** to **build specification**.

The goal is that a frontend developer could take this document and build the page without having to make major design decisions.

---

# 1. MASTER CANVAS

## Desktop

Target:

**1440 × 900**

Maximum content width:

```text
1280px
```

Page side margins:

```text
80px
```

Maximum reading width:

```text
650–720px
```

for large textual sections.

### Grid

Use a 12-column grid.

```text
┌─────────────────────────────────────────────────────────────┐
│  1  2  3  4  5  6  7  8  9  10 11 12                    │
└─────────────────────────────────────────────────────────────┘
```

Typical:

### Text

```text
5–6 columns
```

### Visual

```text
5–7 columns
```

### Gap

```text
24px
```

---

# 2. GLOBAL SPACING SYSTEM

Don't randomly choose margins throughout the page.

Use a consistent scale:

```text
8
12
16
24
32
48
64
80
96
120
160
```

### Section padding

Desktop:

```text
120px 0
```

Large feature sections:

```text
144–160px 0
```

Mobile:

```text
72–88px 0
```

This whitespace is one of the main mechanisms that makes the platform feel calm.

---

# 3. NAVIGATION — EXACT STRUCTURE

Height:

```text
72px
```

Content:

```text
max-width: 1280px
```

Layout:

```text
LOGO        NAV LINKS                 AUTH / CTA
```

### Desktop

```text
FREE FIRE WAR

Tournaments
Leaderboard
How it works
About

Sign in
[Explore Tournaments]
```

### Button

Height:

```text
42–44px
```

Radius:

```text
8px
```

Don't use the ultra-rounded SaaS pill treatment.

This is a **competitive platform**, not a children's app.

---

# 4. HERO — EXACT COMPOSITION

Hero minimum height:

```text
calc(100vh - 72px)
```

But don't force exactly 100vh if the viewport is short.

### Grid

```text
5.5 columns text
+
6.5 columns visual
```

Text vertically centered.

---

## Hero hierarchy

### Eyebrow

```text
12px
600
uppercase
letter-spacing: .10em
```

Yellow accent line:

```text
28 × 2px
```

before or beside it.

---

### H1

Desktop:

```text
68–76px
line-height: .98–1.02
font-weight: 750–800
```

Maximum width:

```text
600px
```

Text:

# Play. Compete. Build your record.

The line breaks should be intentional.

Prefer:

```text
Play. Compete.
Build your record.
```

rather than allowing arbitrary browser wrapping.

---

### Body

```text
18px
line-height: 1.6
max-width: 540px
```

---

### CTA group

Margin-top:

```text
32px
```

Primary:

**Explore Tournaments**

Secondary:

**How It Works**

Gap:

```text
12px
```

---

# 5. HERO VISUAL

This is where we should resist the temptation to make it look like a Free Fire advertisement.

Use **one strong visual**.

Potential direction:

```text
Free Fire character
       +
competitive environment
       +
subtle atmospheric depth
       +
yellow graphic accent
```

No:

* explosion
* giant fireball
* five characters fighting
* dozens of weapons
* text embedded in image
* excessive smoke
* neon
* visual clutter

The image should occupy roughly:

```text
52–58%
```

of the hero's visual width.

---

# 6. HERO DECORATIVE SYSTEM

Use a very subtle yellow geometric motif.

For example:

```text
       /
      /
     /        CHARACTER
    /
___/
```

or thin angular lines inspired by the game's visual language.

Opacity:

```text
10–20%
```

This lets the brand retain gaming DNA without turning the page into visual noise.

---

# 7. SECTION 02 — THE PROBLEM

Background:

```text
#F7F8FA
```

Centered content.

Top spacing:

```text
120px
```

Eyebrow:

**LOCAL COMPETITION, ORGANIZED**

Heading:

# Competition shouldn't feel complicated.

Body:

> Local tournaments often live across messages, forms, payment screenshots, social channels, and manually maintained results. The platform brings that lifecycle together.

The source specification explicitly identifies these fragmented channels as a core problem the platform is designed to solve. 

---

# 8. FRAGMENTATION VISUAL

Rather than logos of external services, create four abstract cards:

```text
┌──────────────┐
│ REGISTRATION │
│    FORM      │
└──────────────┘

┌──────────────┐
│ PAYMENT      │
│ SCREENSHOT   │
└──────────────┘

┌──────────────┐
│ RESULT       │
│ SPREADSHEET  │
└──────────────┘

┌──────────────┐
│ CHAT         │
│ GROUP        │
└──────────────┘
```

Then connect them toward:

```text
┌──────────────────────┐
│     ONE PLATFORM     │
│                      │
│ Tournament Lifecycle │
└──────────────────────┘
```

This is much cleaner than showing actual third-party brands.

---

# 9. SECTION 03 — THE COMPLETE LIFECYCLE

Heading:

# Everything your tournament needs. In one place.

The platform lifecycle is:

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

This follows the actual product scope rather than inventing a marketing funnel. 

---

## Desktop visual

Horizontal timeline:

```text
DISCOVER ── REGISTER ── PAY ── PLAY ── RESULTS ── PRIZES ── HISTORY
```

Each node:

```text
32 × 32px
```

Yellow active node.

Line:

```text
1px
```

Cards underneath.

---

# 10. SECTION 04 — TOURNAMENT DISCOVERY

This should feel like the moment the visitor starts seeing the **actual product**.

Heading:

# Find your next tournament.

Supporting:

> Browse upcoming competitions and choose where you want to compete.

---

## Tournament cards

Desktop:

3-column grid.

```text
┌──────────────────────┐
│ VERIFIED              │
│                      │
│ Tournament Name      │
│                      │
│ Entry       Prize    │
│ ₹XX         ₹XXXX    │
│                      │
│ DATE · TIME          │
│                      │
│ 24 / 48 participants │
│                      │
│ View tournament →    │
└──────────────────────┘
```

### Card dimensions

Approximately:

```text
390px wide
```

Height:

```text
300–340px
```

depending on content.

---

# 11. TOURNAMENT CARD VISUAL LANGUAGE

Don't put huge game artwork inside every card.

Instead:

### Top

Tiny status.

### Middle

Tournament title.

### Lower

Important economics:

```text
ENTRY FEE
PRIZE POOL
```

### Bottom

Date + capacity + action.

This makes scanning easy.

---

# 12. TRUST BADGES

There is a very important implementation constraint here.

The platform defines:

* Unverified
* Verified Organizer
* Platform Verified Tournament

And the specification explicitly says trust badges must reflect actual backend state. 

Therefore:

### Design

Use:

```text
✓ VERIFIED ORGANIZER
```

or

```text
✓ PLATFORM VERIFIED
```

only when the backend actually says so.

Never hard-code a fake checkmark simply because it looks good.

---

# 13. SECTION 05 — TRUST

Dark background:

```text
#101318
```

Heading in white:

# Know what you're playing for.

Supporting text in muted grey.

Then four columns:

```text
01
CLEAR RULES

02
VERIFIED RESULTS

03
TRANSPARENT MONEY

04
YOUR HISTORY
```

The source defines trust first, transparent economics, and one source of truth as core principles. 

---

# 14. TRUST SECTION MICRO-INTERACTION

On scroll:

```text
01
```

appears first.

Then the description.

Then a thin line extends toward:

```text
02
```

But keep the animation slow.

The section shouldn't feel like a PowerPoint presentation.

---

# 15. SECTION 06 — PLAYER CAREER

This should be one of the **hero-level product differentiators**.

Heading:

# Your matches become your record.

Supporting:

> Results, kills, placements, prizes, and completed tournaments build a competitive history that stays with your profile.

The specification explicitly gives players access to complete history, career statistics, achievements, results, kills, and prizes. 

---

# 16. CAREER UI

Use a large floating profile card.

```text
┌───────────────────────────────────────────────┐
│                                               │
│ PLAYER                                        │
│                                               │
│ 24          6          11          ₹4,250     │
│ Matches    Wins      Top 3       Earnings     │
│                                               │
│ ───────────────────────────────────────────── │
│                                               │
│ RECENT RESULTS                                │
│                                               │
│ Tournament             Result                 │
│ ───────────────────────────────────────────── │
│ Tournament A           #1                     │
│ Tournament B           #3                     │
│ Tournament C           #6                     │
│                                               │
└───────────────────────────────────────────────┘
```

Again, these numbers are **visual placeholders**, not real platform data.

---

# 17. CAREER VISUAL TREATMENT

Behind the card:

Very subtle:

```text
large "01"
```

or a thin ranking line.

Don't put a character illustration behind the dashboard.

This section is about **the player's record**.

---

# 18. SECTION 07 — LEADERBOARD

Heading:

# See who is performing.

Use a sports-table layout.

```text
RANK   PLAYER             SCORE
────────────────────────────────
01     Player             1842
02     Player             1716
03     Player             1604
04     Player             1531
05     Player             1492
```

### First-place treatment

Only one restrained yellow indicator.

Not:

🔥🔥🔥🔥🔥

The design should feel like:

**ESPN ranking**

rather than:

**YouTube gaming thumbnail.**

---

# 19. SECTION 08 — THREE ROLES

Heading:

# One platform. Three roles.

Three large cards.

### Player

**Compete and build your record.**

### Organizer

**Run tournaments with structure.**

### Admin

**Verify, manage, and protect the ecosystem.**

The actual specification defines exactly these three dashboards and makes Admin the super-role. 

---

# 20. ROLE CARD INTERACTION

Default:

```text
white
```

Hover:

```text
slightly darker border
+
2px elevation
+
yellow indicator
```

Don't transform the entire card.

No:

* card flips
* 3D rotations
* giant scale
* glow

---

# 21. SECTION 09 — ORGANIZER

Use a 50/50 split.

Left:

# Run tournaments without running everything manually.

Right:

A clean organizer interface.

Show:

```text
ACTIVE TOURNAMENTS

Participants

Results

Prize Configuration

Earnings
```

The organizer role includes tournament creation, participant management, result submission, prize configuration, and earnings. 

---

# 22. ORGANIZER PROCESS

Below the interface:

```text
CREATE
   →
MANAGE
   →
SUBMIT RESULTS
   →
SETTLE
```

This should communicate operational simplicity.

---

# 23. SECTION 10 — RESULTS + PRIZES

Dark or off-white section.

Heading:

# Results you can trust. Prizes you can track.

Visual:

```text
RESULT
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

This is grounded directly in the documented result verification and payout workflow. 

---

# 24. PRIZE VISUAL

The platform supports:

* Placement prizes
* Kill prizes
* Hybrid structures
* Custom categories

rather than assuming every tournament has the same prize model. 

So the UI should visually communicate flexibility.

Example:

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
Fair Play
Best Team
```

Don't design the landing page around a single prize formula.

---

# 25. SECTION 11 — FINAL CTA

Full-width dark section.

Approximately:

```text
500–600px
```

vertical height.

Centered:

Eyebrow:

**START COMPETING**

Headline:

# Your next match is waiting.

Supporting:

> Find a tournament, compete with your squad, and start building your record.

CTA:

**Explore Tournaments**

Secondary:

**Create a Tournament**

---

# 26. FOOTER

Simple.

```text
FREE FIRE WAR

Tournaments
Leaderboard
How it works
About

Players
Organizers
Admin

Privacy
Terms
Support
```

No giant footer graphic.

No oversized slogan.

---

# 27. MOBILE RECOMPOSITION

This is critical.

Don't merely stack desktop sections.

### Hero

Mobile:

```text
NAV
 ↓
EYEBROW
 ↓
HEADLINE
 ↓
BODY
 ↓
CTA
 ↓
VISUAL
```

The image becomes full-width underneath the text.

---

# 28. MOBILE TYPOGRAPHY

H1:

```text
42–48px
```

Line-height:

```text
1.0–1.08
```

Body:

```text
16px
```

Section headings:

```text
36–42px
```

Cards:

```text
100% width
```

Horizontal padding:

```text
20px
```

---

# 29. MOBILE NAV

Desktop navigation disappears.

Use:

```text
FREE FIRE WAR                         ☰
```

Menu should be clean and full-screen or dropdown.

No giant animated hamburger.

---

# 30. MOBILE LIFECYCLE

Don't force seven items into a tiny horizontal row.

Use:

```text
01 DISCOVER
      ↓
02 REGISTER
      ↓
03 PAY
      ↓
04 PLAY
      ↓
05 RESULTS
      ↓
06 PRIZES
      ↓
07 HISTORY
```

Or a vertically connected timeline.

Much easier to understand.

---

# 31. MOBILE TOURNAMENTS

One card per row.

No horizontal carousel unless there is a strong reason.

The user should be able to scan:

```text
Tournament
↓
Entry
↓
Prize
↓
Date
↓
Capacity
↓
CTA
```

without hunting around.

---

# 32. DESKTOP → MOBILE IMAGE RULE

Don't crop the desktop hero into mobile.

Create:

```text
hero-desktop
hero-mobile
```

with different compositions.

Desktop:

```text
character + environment
```

Mobile:

```text
character/detail + stronger vertical composition
```

Same visual identity, different framing.

---

# 33. ANIMATION SYSTEM

The landing page should feel **alive but settled**.

### Section entrance

```text
opacity: 0 → 1
translateY: 20px → 0
```

Duration:

```text
700ms
```

### Card entrance

```text
500–650ms
```

### Stagger

```text
60–100ms
```

Maximum.

Don't create a 2-second chain reaction where seven cards fly onto the screen one after another.

---

# 34. HERO MOTION

If we use video/cinematic artwork:

Movement should be:

```text
very slow
```

Potentially:

```text
1.00 → 1.025
```

scale.

Very subtle environmental motion.

The visitor should almost wonder:

> “Is that moving?”

That's the right amount.

---

# 35. SCROLL BEHAVIOR

Normal browser scrolling.

No:

* scroll hijacking
* forced snap between sections
* wheel interception
* artificial acceleration

The page should feel like a normal website.

The cinematic behavior belongs in invitation projects where frame sequences are intentionally scrubbed; this Free Fire landing page doesn't need to inherit that interaction model.

---

# 36. ACCESSIBILITY

Must support:

```css
@media (prefers-reduced-motion: reduce)
```

Then:

* disable large transforms
* remove atmospheric movement
* use simple opacity transitions
* preserve all information

Buttons must have obvious focus states.

Contrast must remain strong.

---

# 37. DATA ARCHITECTURE

Even though this is a landing page, don't hard-code tournament information into scattered HTML.

Structure conceptually:

```javascript
const platformData = {
    tournaments: [],
    leaderboard: [],
    trust: {},
    roles: {},
    statistics: {}
};
```

Then render dynamic elements from data.

This aligns with the platform's broader **single source of truth** principle: the database is authoritative for registrations, payments, status, results, and history—not screenshots or spreadsheets. 

---

# 38. WHAT THE LANDING PAGE SHOULD NOT CLAIM

This is important because the specification distinguishes current MVP scope from future possibilities.

Don't casually advertise:

* advanced matchmaking
* native mobile apps
* massive social network
* AI tournament automation
* sponsor marketplace
* complicated microservices
* features outside the current product scope

The specification specifically says these are **not** things to build initially. 

So the landing page should sell the **real product**, not an imaginary future version.

---

# 39. THE VISUAL HIERARCHY

At any point, the visitor should know what's important.

Priority:

```text
1. HEADLINE
2. PRIMARY ACTION
3. TOURNAMENT / PRODUCT INFORMATION
4. TRUST SIGNAL
5. SECONDARY INFORMATION
6. DECORATION
```

Never:

```text
1. Artwork
2. Glow
3. Animation
4. Random statistics
5. Text
```

That's how gaming sites become noisy.

---

# 40. FINAL DESIGN CHARACTER

If we freeze the page and remove every animation, it should **still look premium**.

If we remove all game artwork, it should **still communicate a serious competition platform**.

If we remove the yellow accent, it should **still work visually**.

If we restore the yellow and Free Fire imagery, it should immediately feel like **Free Fire competition**.

That's the test.

---

# 41. FINAL WIREFRAME

```text
┌──────────────────────────────────────────────────────────────┐
│ NAV                                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ THE HOME OF LOCAL FREE FIRE COMPETITION                      │
│                                                              │
│ Play. Compete.                 CINEMATIC                     │
│ Build your record.             FREE FIRE                     │
│                                VISUAL                        │
│ Find tournaments...                                           │
│                                                              │
│ [Explore Tournaments] [How It Works]                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Competition shouldn't feel complicated.                      │
│                                                              │
│ fragmented workflows → one organized platform                │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Everything your tournament needs. In one place.               │
│                                                              │
│ Discover → Register → Pay → Play → Results → Prizes → History│
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Find your next tournament.                                    │
│                                                              │
│ [ Tournament ] [ Tournament ] [ Tournament ]                 │
│                                                              │
├══════════════════════════════════════════════════════════════┤
│                                                              │
│                 Know what you're playing for.                 │
│                                                              │
│   Clear Rules   Verified Results   Transparent Money   Record │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Every tournament becomes part of your record.                 │
│                                                              │
│             ┌──────────────────────────────┐                 │
│             │ PLAYER CAREER                │                 │
│             │ Matches Wins Top3 Earnings   │                 │
│             │ Recent Results               │                 │
│             └──────────────────────────────┘                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ See who is performing.                                        │
│                                                              │
│ 01 Player       Score                                         │
│ 02 Player       Score                                         │
│ 03 Player       Score                                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ One platform. Three roles.                                   │
│                                                              │
│ [ PLAYER ] [ ORGANIZER ] [ ADMIN ]                            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Run tournaments without running everything manually.          │
│                                                              │
│                         ORGANIZER UI                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Results you can trust. Prizes you can track.                  │
│                                                              │
│ Result → Evidence → Verification → Dispute → Settlement      │
│                                                              │
├══════════════════════════════════════════════════════════════┤
│                                                              │
│                 Your next match is waiting.                  │
│                                                              │
│                   [ Explore Tournaments ]                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

## The next step is now **STEP 5 — VISUAL ASSET DIRECTION**

Before writing `index.html`, `style.css`, and `script.js`, we should define the **actual imagery/art direction** for this page: the hero artwork, tournament imagery, career visual, organizer visual, dark trust section treatment, iconography, logo treatment, and the exact image-generation prompts.

That is where we can make the landing page stop looking like a generic esports SaaS template and give it a **distinct Free Fire War visual identity** while preserving the calm/professional direction.

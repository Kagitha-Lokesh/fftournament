// ──────────────────────────────────────────────────────────────────────────────
// FREE FIRE WAR — Centralised demo data
// All real values must come from the API / database in production.
// Nothing here is a claim about live platform state.
// ──────────────────────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  intro: {
    eyebrow: "THE HOME OF LOCAL FREE FIRE COMPETITION",
    headline: ["Play.", "Compete.", "Build your", "record."],
    body: "Find tournaments, compete with your squad, track your results, and build a competitive history that stays with you.",
    primaryCta: {
      label: "Explore Tournaments",
      href: "#tournaments"
    },
    secondaryCta: {
      label: "How It Works",
      href: "#lifecycle"
    }
  },

  competition: {
    eyebrow: "FIND YOUR NEXT MATCH",
    headline: ["Competition", "starts here."],
    body: "Discover local tournaments, join your squad, and step into your next match.",
    primaryCta: {
      label: "Explore Tournaments",
      href: "#tournaments"
    },
    secondaryCta: {
      label: "How It Works",
      href: "#lifecycle"
    }
  },

  final: {
    left: {
      eyebrow: "YOUR RECORD",
      headline: ["Every match counts.", "Built over time."],
      body: "Every tournament becomes part of your competitive journey."
    },
    right: {
      eyebrow: "YOUR HISTORY",
      headline: ["Competition,", "properly recorded."],
      items: "Tournaments. Results. Achievements.",
      body: "One competitive history, kept in one place."
    }
  }
};


export const NAV_LINKS = [
  { label: "Tournaments", href: "#tournaments" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "How It Works", href: "#lifecycle" },
  { label: "About", href: "#about" },
];

export const PROBLEM_SECTION = {
  eyebrow: "THE PROBLEM",
  headline: "Competition, without the chaos.",
  body: "Tournament links, payment screenshots, result sheets and chat groups shouldn't be scattered across different places.",
  cards: [
    {
      num: "01",
      tag: "Scattered",
      title: "Registration Form",
      sub: "Scattered across links and DMs",
      detail: "Manual Google Forms with missing player tags",
    },
    {
      num: "02",
      tag: "Unverified",
      title: "Payment Screenshot",
      sub: "Sent to the group or DM",
      detail: "Unverified UPI receipts buried in chat feeds",
    },
    {
      num: "03",
      tag: "Manual",
      title: "Result Spreadsheet",
      sub: "Manually maintained",
      detail: "Unchecked tally sheets prone to disputes",
    },
    {
      num: "04",
      tag: "Chaos",
      title: "Chat Group",
      sub: "Where everything gets lost",
      detail: "Room codes lost in endless message spam",
    },
  ],
  solution: {
    eyebrow: "ONE PLATFORM",
    headline: "Everything connected.",
    body: "Discover tournaments, register, play, verify results, track prizes and build your competitive history — all in one place.",
    brandName: "FF WAR",
    brandSubtitle: "ONE COMPETITIVE HOME",
    statusBadge: "Unified System",
    pipeline: [
      { id: "discover", label: "Discover", num: "01" },
      { id: "register", label: "Register", num: "02" },
      { id: "play",     label: "Play",     num: "03" },
      { id: "results",  label: "Results",  num: "04" },
      { id: "prizes",   label: "Prizes",   num: "05" },
      { id: "history",  label: "History",  num: "06" },
    ],
    pillars: [
      {
        title: "Structured Competition",
        desc: "Clear formats, guaranteed slots, automated schedules",
      },
      {
        title: "Verified Results",
        desc: "Evidence-backed submissions & dispute safeguards",
      },
      {
        title: "Your Record",
        desc: "Persistent career profile, rankings & verified stats",
      },
    ],
  },
};


export const LIFECYCLE_STAGES = [
  {
    id: "discover",
    label: "Discover",
    num: "01",
    description:
      "Browse tournaments near you. Filter by entry fee, format, and schedule.",
  },
  {
    id: "register",
    label: "Register",
    num: "02",
    description:
      "Join as solo or squad. Your slot is confirmed the moment you register.",
  },
  {
    id: "pay",
    label: "Pay",
    num: "03",
    description:
      "Entry fees are handled through the platform. No payment screenshots.",
  },
  {
    id: "play",
    label: "Play",
    num: "04",
    description:
      "Compete. Room codes and match schedules come through the platform.",
  },
  {
    id: "results",
    label: "Results",
    num: "05",
    description:
      "Results are submitted with evidence and go through verification.",
  },
  {
    id: "prizes",
    label: "Prizes",
    num: "06",
    description:
      "Prize settlement follows the verified result. Tracked and auditable.",
  },
  {
    id: "history",
    label: "History",
    num: "07",
    description:
      "Every match, result, and prize becomes part of your permanent record.",
  },
];

const CARD_HUE = [0, 30, 180, 240, 320];

export const TOURNAMENTS = [
  {
    id: "t1",
    name: "Weekend Squad Clash",
    mode: "Squad",
    image: "/assets/tournaments/tournament-squad-01.webp",
    verified: true,
    entry: 50,
    prize: 5000,
    date: "SAT, 13 SEP",
    time: "8:00 PM",
    registered: 24,
    capacity: 48,
    status: "Registration Open",
    hue: CARD_HUE[0],
  },
  {
    id: "t2",
    name: "City Duos Showdown",
    mode: "Duo",
    image: "/assets/tournaments/tournament-duo-01.webp",
    verified: true,
    entry: 30,
    prize: 2400,
    date: "SUN, 14 SEP",
    time: "6:00 PM",
    registered: 36,
    capacity: 48,
    status: "Registration Open",
    hue: CARD_HUE[1],
  },
  {
    id: "t3",
    name: "Solo Ranked Cup",
    mode: "Solo",
    image: "/assets/tournaments/tournament-solo-01.webp",
    verified: false,
    entry: 20,
    prize: 900,
    date: "MON, 15 SEP",
    time: "7:30 PM",
    registered: 12,
    capacity: 32,
    status: "Upcoming",
    hue: CARD_HUE[2],
  },
  {
    id: "t4",
    name: "Community War — Season 3",
    mode: "Squad",
    image: "/assets/tournaments/tournament-squad-02.webp",
    verified: true,
    entry: 100,
    prize: 12000,
    date: "SAT, 20 SEP",
    time: "5:00 PM",
    registered: 40,
    capacity: 64,
    status: "Registration Open",
    hue: CARD_HUE[3],
  },
  {
    id: "t5",
    name: "Night Shift Invitational",
    mode: "Squad",
    image: "/assets/tournaments/tournament-squad-03.webp",
    verified: true,
    entry: 75,
    prize: 8000,
    date: "FRI, 19 SEP",
    time: "10:00 PM",
    registered: 48,
    capacity: 48,
    status: "Full",
    hue: CARD_HUE[4],
  },
  {
    id: "t6",
    name: "Rapid Fire — Quick Solo",
    mode: "Solo",
    image: "/assets/tournaments/tournament-solo-02.webp",
    verified: false,
    entry: 10,
    prize: 400,
    date: "WED, 17 SEP",
    time: "8:00 PM",
    registered: 18,
    capacity: 32,
    status: "Upcoming",
    hue: CARD_HUE[0],
  },
];

export const TRUST_PILLARS = [
  {
    num: "01",
    title: "Clear Rules",
    body: "Rules and tournament information are visible before registration. No surprises after you've paid.",
  },
  {
    num: "02",
    title: "Verified Results",
    body: "Results move through the platform's evidence and verification process before they become final.",
  },
  {
    num: "03",
    title: "Transparent Money",
    body: "Entry fees, prizes, and financial activity are structured through the platform — not screenshots.",
  },
  {
    num: "04",
    title: "Your History",
    body: "Every completed tournament builds your competitive record. It stays with your profile permanently.",
  },
];

export const PLAYER_CAREER = {
  name: "SHADOW_K",
  rank: "#04",
  matches: 27,
  wins: 8,
  top3: 14,
  kills: 187,
  earnings: 12500,
  recentResults: [
    { tournament: "Weekend Squad Clash", result: "#1", date: "06 SEP" },
    { tournament: "City Duos Showdown", result: "#3", date: "31 AUG" },
    { tournament: "Community War S2", result: "#2", date: "24 AUG" },
    { tournament: "Solo Ranked Cup", result: "#6", date: "17 AUG" },
  ],
};

export const LEADERBOARD = [
  { rank: 1, name: "GHOST_RX", score: 1842, wins: 12, kills: 247, trend: "up" },
  { rank: 2, name: "SHADOW_K", score: 1716, wins: 8, kills: 187, trend: "up" },
  { rank: 3, name: "APEX_ZERO", score: 1604, wins: 7, kills: 163, trend: "stable" },
  { rank: 4, name: "FURY_77", score: 1531, wins: 6, kills: 141, trend: "down" },
  { rank: 5, name: "RAZE_PRO", score: 1492, wins: 5, kills: 128, trend: "up" },
  { rank: 6, name: "VIPER_09", score: 1408, wins: 4, kills: 112, trend: "stable" },
  { rank: 7, name: "BLAZE_X", score: 1374, wins: 4, kills: 98, trend: "down" },
];

export const ROLES = [
  {
    id: "player",
    label: "Player",
    tagline: "Compete. Build your record.",
    features: [
      "Discover & join tournaments",
      "Squad & solo registration",
      "Verified results tracking",
      "Persistent career history",
      "Rankings & leaderboards",
    ],
    cta: "Start Competing",
  },
  {
    id: "organizer",
    label: "Organizer",
    tagline: "Create. Manage. Grow.",
    features: [
      "Tournament creation tools",
      "Participant management",
      "Result submission & evidence",
      "Prize configuration",
      "Earnings & settlement",
    ],
    cta: "Create a Tournament",
  },
  {
    id: "admin",
    label: "Admin",
    tagline: "Verify. Resolve. Protect.",
    features: [
      "Organizer verification",
      "Tournament oversight",
      "Dispute resolution",
      "Payout management",
      "Platform integrity",
    ],
    cta: "Platform Control",
  },
];

export const ORGANIZER_DASHBOARD = {
  stats: [
    { label: "Active Tournaments", value: "4" },
    { label: "Total Players", value: "834" },
    { label: "Pending Settlement", value: "₹2,300" },
    { label: "Completion Rate", value: "98%" },
  ],
  tournaments: [
    { name: "Weekend Squad Clash", status: "LIVE", players: 48 },
    { name: "City Duos Showdown", status: "REGISTRATION", players: 36 },
    { name: "Night Shift Invitational", status: "UPCOMING", players: 0 },
  ],
  flow: ["Create", "Manage", "Submit Results", "Settle"],
};

export const RESULT_FLOW = [
  { step: "Result Submitted", detail: "Organizer submits final placements" },
  { step: "Evidence", detail: "Screenshots and match data attached" },
  { step: "Verification", detail: "Platform reviews the submission" },
  { step: "Dispute Window", detail: "24-hour period for player disputes" },
  { step: "Final Result", detail: "Result locked and published" },
  { step: "Prize Settlement", detail: "Prizes distributed to winners" },
];

export const PRIZE_CATEGORIES = [
  {
    category: "Placement",
    items: ["1st Place", "2nd Place", "3rd Place"],
  },
  {
    category: "Kills",
    items: ["Most Kills", "2nd Most Kills", "3rd Most Kills"],
  },
  {
    category: "Special",
    items: ["MVP", "Best Team", "Fair Play"],
  },
];

export const FOOTER_LINKS = {
  Platform: [
    { label: "Tournaments", href: "#tournaments" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "How It Works", href: "#lifecycle" },
    { label: "About", href: "#about" },
  ],
  "For You": [
    { label: "Players", href: "#roles" },
    { label: "Organizers", href: "#organizer" },
    { label: "Admin", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ],
};

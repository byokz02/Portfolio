/* ------------------------------------------------------------
   PROJECTS DATA — edit this array to add / change projects.
   Fields:
     title, desc, tech: [..], repo (url), demo (url or null),
     year, role, art: one of "energy" | "search" | "race" | "sheet" | "click"
   Rule Card is shown separately as the featured project in index.html.
------------------------------------------------------------ */
window.PROJECTS = [
  {
    title: "ElecTrack",
    desc: "Our team's capstone research: an IoT smart plug that tracks the electricity consumption of whatever is plugged into it. It is monitoring-only by design, so it measures and reports usage instead of switching appliances on or off.",
    tech: ["IoT", "Smart plug", "Energy monitoring", "Capstone research"],
    repo: null,
    demo: null,
    role: "Capstone · IoT smart plug",
    art: "energy"
  },
  {
    title: "Lost & Found",
    desc: "A school lost-and-found system for posting, browsing and claiming missing items, with image uploads. Built with Django and set up for cloud deployment with Gunicorn and WhiteNoise.",
    tech: ["Python", "Django", "Pillow", "Gunicorn", "WhiteNoise"],
    repo: "https://github.com/byokz02/lostandfound",
    demo: null,
    role: "Web app",
    art: "search"
  },
  {
    title: "Palosebo",
    desc: "A real-time 2-player racing game with name entry, a countdown timer and a leaderboard that saves the fastest finish times. A five-person team build.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "CSS"],
    repo: "https://github.com/byokz02/Palosebo-game",
    demo: null,
    role: "Team game",
    art: "race"
  },
  {
    title: "EVD Compilation",
    desc: "A lightweight web page that sends records to Google Sheets through a Google Apps Script web app, turning a spreadsheet into a simple backend for compiling exam data.",
    tech: ["HTML", "JavaScript", "Fetch API", "Apps Script"],
    repo: "https://github.com/byokz02/EVD_COMPILATION",
    demo: null,
    role: "Data tool",
    art: "sheet"
  },
  {
    title: "Click the Button",
    desc: "A 5-second click-speed challenge with a live countdown, a score counter and a session high score. Small, fast and written in plain JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/byokz02/IT_MAYBE",
    demo: null,
    role: "Mini game",
    art: "click"
  }
];

/* Monochrome line-art "plates" for each project (no screenshots needed). */
window.PROJECT_ART = {
  energy: `<svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4">
      <rect x="62" y="44" width="92" height="112" rx="22"/>
      <rect x="74" y="56" width="68" height="88" rx="14" opacity=".35"/>
      <path d="M96 84v22M120 84v22" stroke-width="5" stroke-linecap="round"/>
      <path d="M100 124a10 10 0 0 0 16 0" />
      <circle cx="140" cy="62" r="3.5" fill="currentColor"/>
      <path d="M154 100 C 176 100, 176 70, 196 70" stroke-dasharray="3 5" opacity=".6"/>
      <path d="M206 150 L224 128 L240 136 L256 104 L272 112 L290 80" stroke-linejoin="round"/>
      <path d="M206 160 H294" opacity=".4"/>
      <circle cx="290" cy="80" r="3.5" fill="currentColor"/>
      <text x="206" y="68" font-size="11" fill="currentColor" stroke="none" font-family="Inter, sans-serif" letter-spacing="2" opacity=".75">kWh</text>
    </g></svg>`,
  search: `<svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4">
      <rect x="40" y="40" width="70" height="88" rx="3"/><rect x="58" y="58" width="70" height="88" rx="3" opacity=".55"/>
      <path d="M52 60h46M52 72h30M52 84h38"/>
      <circle cx="205" cy="98" r="44"/><circle cx="205" cy="98" r="32" opacity=".4"/>
      <path d="M237 130l38 38" stroke-width="6" stroke-linecap="round"/>
      <path d="M190 92l10 10 18-22"/>
    </g></svg>`,
  race: `<svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4">
      <path d="M110 20v170M210 20v170" stroke-width="5"/>
      <path d="M104 40h12M104 70h12M104 100h12M104 130h12M104 160h12M204 40h12M204 70h12M204 100h12M204 130h12M204 160h12" opacity=".5"/>
      <circle cx="110" cy="92" r="10" fill="currentColor"/><circle cx="210" cy="122" r="10"/>
      <path d="M90 18h140" stroke-dasharray="4 5"/>
      <text x="236" y="26" font-size="12" fill="currentColor" stroke="none" font-family="Inter, sans-serif" letter-spacing="2">FINISH</text>
    </g></svg>`,
  sheet: `<svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="40" y="36" width="150" height="128"/>
      <path d="M40 60h150M40 84h150M40 108h150M40 132h150M80 36v128M130 36v128"/>
      <rect x="40" y="36" width="150" height="24" fill="currentColor" opacity=".18"/>
      <path d="M205 100h40" stroke-dasharray="3 4"/><path d="M240 94l8 6-8 6"/>
      <rect x="252" y="76" width="44" height="48" rx="4"/><path d="M262 92h24M262 102h18M262 112h22"/>
    </g></svg>`,
  click: `<svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4">
      <rect x="70" y="62" width="150" height="58" rx="6"/>
      <text x="145" y="98" text-anchor="middle" font-size="16" fill="currentColor" stroke="none" font-family="Anton, Impact, sans-serif" letter-spacing="2">CLICK ME!</text>
      <path d="M196 106l0 52 13-12 9 20 9-4-9-20 17-1z" fill="currentColor" stroke="none"/>
      <path d="M182 92l-14-8M186 80l-6-14M198 78l4-15" opacity=".6"/>
      <text x="70" y="150" font-size="11" fill="currentColor" stroke="none" font-family="Inter, sans-serif" letter-spacing="2" opacity=".7">TIME LEFT: 5s</text>
    </g></svg>`
};

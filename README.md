# DKODER — PLACEMENT OS
### The Complete Placement Preparation Platform & Web App Experience
**Frontend Design Competition — Round 2 Masterpiece Submission**

> “LEARN. COMPETE. BUILD. GROW. The operating system engineered to turn campus placement uncertainty into a predictable, confident career milestone.”

---

## 🧭 Executive Summary & Product Architecture

**DKODER — PLACEMENT OS** is a complete, multi-route placement preparation platform and web application. Rather than a single portfolio landing page, it is engineered as a **commercial-grade SaaS application shell** featuring a collapsible sidebar, dynamic breadcrumb header, global command palette, and dedicated pages for every phase of a candidate's preparation lifecycle.

### The Core Placement Journey
$$\mathbf{TARGET} \longrightarrow \mathbf{PREPARE} \longrightarrow \mathbf{PRACTICE} \longrightarrow \mathbf{TRACK} \longrightarrow \mathbf{COMPETE} \longrightarrow \mathbf{GET\ READY}$$

---

## 🎨 Original DKoder Brand Identity & Logo System

The brand identity was built around an **original vector geometric "D/K" monogram**:
- **Angular 'D' Spine:** Represents solid structural foundations in computer science and data structures.
- **Forward Progression Chevron (The 'K' Upper Branch):** Signifies career velocity, upward mobility, and placement targeting.
- **Code Terminal Bracket (The 'K' Lower Leg):** Represents practical software engineering depth and execution.
- **Negative Space Aperture:** Minimalist central aperture that remains razor-sharp at small sizes (16px favicon, 24px navbar, 48px app icon).
- **Exported React SVG Components (`src/components/brand/DKoderLogo.jsx`):**
  - `<DKoderLogo variant="full" />`: Mark + Wordmark + Tagline.
  - `<DKoderMark size="sm|md|lg" theme="default|monochrome|purple" />`: Icon-only mark.
  - `<DKoderWordmark />`: Typographic wordmark with status dot.
  - `public/favicon.svg`: Matching high-resolution vector favicon.

---

## 🖥️ 11 Dedicated Application Routes

| Route | Page | Purpose & Core User Experience |
| :--- | :--- | :--- |
| **`/dashboard`** | **Dashboard Overview** | Candidate intelligence hub: *Good Morning Bharath*, Active Placement Mission hero (Amazon • 20+ LPA, 74% Readiness), *Next Best Action* (Solve 3 Array Problems), 4 Bento metric cards (*Today's Challenge, Continue Coding, Upcoming Mock, 7-Day Streak*), Placement Readiness 4-discipline breakdown, Recent Activity, and Recommended For You. |
| **`/mission`** | **Placement Mission** | Dynamic target configuration (*Company, Package, Language, Level*), Mission Progress pipeline (*Foundation ✓, DSA 78%, Coding 64%, Mock 48%, Interview 31%, Ready 12%*), and an interactive 6-stage journey timeline (*Target ➔ Foundation ➔ Practice ➔ Mock ➔ Interview ➔ Ready*). |
| **`/practice`** | **Practice Archive** | Question browser with 7-parameter top filter bar (*Company, Package, Language, Level, Topic, Difficulty, Recency*), 6 Category Tabs (*All, Aptitude, MCQ, DSA, Coding, Company Questions*), and expandable **"WHY THIS QUESTION?"** diagnostic drawers. |
| **`/coding`** | **Coding Workspace** | Full-screen IDE layout: Collapsible problem list, Problem Statement with examples & constraints, Monaco-style editor with line numbers, multi-language switcher (*JavaScript, Python, Java, C++, SQL*), test case switcher, execution console, runtime (38ms), memory (42MB), and working `[ RUN ]` & `[ SUBMIT ]` actions with celebratory confetti. |
| **`/career`** | **Career Tracks** | 7 In-depth specialization tracks (*AI/ML, Data Science, Software Engineering, Web Dev, Cybersecurity, Cloud/DevOps, IoT & Robotics*) with modal views detailing salary benchmarks, required skills, and 5-phase career progression roadmaps. |
| **`/challenges`** | **Challenge Arena** | High-stakes coding sprints: Daily Challenge (*Array Rotation, 15 min, active timer `01:42:18`, +120 XP*), Weekly Systems Challenge, Amazon OA Sprint, and Campus Speed Sprint with animated completion states (+120 XP, Challenge Complete ✓, Streak: 7 days). |
| **`/leaderboard`** | **Leaderboard & Hall of Fame** | Filter tabs (*Global, College, Department, Friends*), visually strong 3D-styled **Top 3 Podium** (*#01 Arun +1840 XP, #02 Priya +1720 XP, #03 Rahul +1650 XP*), and Candidate Ranking Table (Ranks 4–10) with streaks, badges, and weekly movement (`↑2`, `↓1`). |
| **`/opportunities`** | **Active Opportunities** | Campus hiring desk categorized by *Hackathons, Internships, Placement Drives, Competitions* with instant search, eligibility, package/grant details, bookmarked saves, and detailed modal views. |
| **`/pathfinder`** | **Placement Pathfinder** | 5-Step planning tool (*Target Company, Package, Language, Level, Career Goal*) synthesizing a deterministic milestone trajectory (*Strengthen Arrays ➔ 10 Coding Problems ➔ Aptitude Mock ➔ Company OA Set ➔ Full Assessment*). |
| **`/profile`** | **Candidate Profile** | Student identity desk (*Bharath Raj, CSE Department, Batch 2026*), key stats (*1840 XP, 7-Day Streak, 48 Solved, 6 Mocks, 74% Readiness*), earned badges, recent activity, active track, and saved opportunities. |
| **`/settings`** | **System Settings** | Placement target defaults, proctored notification cadence, editor font size (12px/14px/16px), tab spacing, and local preference synchronization. |

---

## 🎛️ Application Shell & Navigation Architecture

### Desktop Experience
- **Collapsible Sidebar:** Smooth transition between expanded mode (icon + label + live badge) and collapsed mode (icon only + tooltip). Remembers user preference in `localStorage`.
- **TopBar:** Page title, breadcrumb trail (`Candidate Core / Dashboard`), global command search trigger (`Ctrl + K`), notification flyout panel, and profile menu.
- **Notification Panel:** Interactive flyout displaying targeted recruitment alerts, daily challenge bounties, streak achievements, and unread counter badges.
- **Profile Menu:** Candidate identity dropdown with quick telemetry and route jumps.

### Mobile Experience
- **Dedicated Mobile Header:** Brand mark, page title, search trigger, and notifications.
- **Sticky Bottom Navigation:** Fixed bottom bar with 5 primary touch points: **Home, Mission, Practice, Career, Profile** (each with minimum 44px touch targets).
- **"More" Bottom Sheet:** Slide-up technical drawer providing single-tap access to *Coding Workspace, Challenge Arena, Leaderboard, Opportunities, Pathfinder, and Settings*.
- **Full Breakpoint Support:** Verified on 320px, 375px, 390px, 414px, 768px, 1024px, 1440px, and 1920px with zero horizontal scrollbar overflow.

---

## ⌨️ Advanced Keyboard Interaction

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| **`Ctrl + K` / `Cmd + K`** | Open Command Palette | Launches global fuzzy search across all 11 pages, companies, and questions |
| **`/`** | Global Search | Quick search trigger from anywhere in the app |
| **`Esc`** | Close Overlays | Dismisses command palette, drawers, or open modals |
| **`?`** | Keyboard Cheatsheet | Toggles interactive keyboard shortcuts modal |
| **`G` then `H`** | Jump to Dashboard | Navigates directly to candidate dashboard |
| **`G` then `M`** | Jump to Mission | Opens target configuration & journey timeline |
| **`G` then `P`** | Jump to Practice | Jumps to practice question archive |
| **`G` then `C`** | Jump to Career Tracks | Opens the 7-track progression matrix |
| **`G` then `L`** | Jump to Leaderboard | Jumps to campus Hall of Fame |
| **`G` then `O`** | Jump to Opportunities | Opens active campus drives & hackathons |

---

## 🛠️ Technology Stack & Performance

- **Framework:** React 19 + React Router v7 + Vite 8
- **Styling:** Vanilla Tailwind CSS with custom editorial design tokens
- **Smooth Momentum Scrolling:** Lenis (synchronized with GSAP ticker)
- **Animation & Transitions:** Framer Motion (spring physics) + GSAP ScrollTrigger
- **Iconography:** Lucide React
- **Celebratory Physics:** Canvas Confetti
- **Build Performance:** Zero-warning clean production bundle compiling in **1.38s**.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Active on http://localhost:5174/

# 3. Production build verification
npm run build
```

---

## 🌟 References & Originality Declaration

DKoder and TechHike were referenced strictly for their real-world product concepts (company OA preparation, package targeting, coding workspaces, aptitude MCQs, leaderboard gamification, and campus placement telemetry). The visual identity, layout architecture, collapsible application shell, SVG logo system, and interaction workflows are 100% original.

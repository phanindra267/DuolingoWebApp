# 🦉 Duolingo Clone

A Duolingo-inspired language learning application with gamification, skill trees, lesson players, and persistent progress.

## ✨ Features

### Core Learning Experience
- **Skill Tree / Learning Path** with Units → Skills → Lessons → Exercises hierarchy
- **Lock/Unlock progression** — only the next available skill is active
- **Completed / Active / Locked states** with visual indicators
- **Progress rings & Crowns** for skill mastery visualization
- **Unit navigation** between themed learning units

### Lesson Player
- Multiple exercise types:
  - ✅ Multiple Choice
  - ✅ Translate / Word Bank (tap-the-words)
  - ✅ Match Pairs
  - ✅ Fill in the Blank
  - ✅ Type-the-Answer
- Animated **Correct / Incorrect feedback** with Duo mascot reactions
- **Lesson progress bar**
- **Heart system** — wrong answers cost hearts
- **Out-of-hearts failure state** with gem-refill option
- **Lesson completion celebration** with XP reward
- Confetti, modals, toasts, and celebratory micro-interactions

### Gamification
- **XP system** with award on lesson completion
- **Daily Streak** tracking (yesterday → today continuity)
- **Hearts** (5 max) with gem-based refill mechanism
- **Daily XP goal** indicator
- **Gems / Lingots** currency
- **Leaderboard** with ranked competition
- **Persistent progress** across refreshes via SQLite + localStorage fallback

### Screens
- Home / Learning Path
- Lesson Player
- Profile page (XP, streak, accuracy, stats)
- Leaderboard
- Quests / Daily goals
- Shop (gems → hearts refill)
- Characters showcase
- Settings (dark mode, sound, motion, listening)

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling     | Tailwind CSS v4 + Radix UI + Sonner     |
| State       | React Context + React Query (TanStack)  |
| Backend     | FastAPI + Python 3.11+                  |
| ORM         | SQLModel (Pydantic + SQLAlchemy)        |
| Database    | **SQLite** (assignment requirement)     |
| Hosting     | Vercel (Frontend) + Railway/Render (Backend) |

---

## 🏗️ Architecture

```
                        ┌──────────────────────────┐
                        │   Browser / Next.js UI   │
                        │  (Skill Tree, Lessons,   │
                        │   Profile, Gamification) │
                        └────────────┬─────────────┘
                                     │
                                     │  REST / JSON
                                     ▼
                        ┌──────────────────────────┐
                        │  FastAPI Backend (API)   │
                        │  • User state / XP       │
                        │  • Streaks / Hearts      │
                        │  • Course → Unit → Skill │
                        │  • Lesson → Exercises    │
                        │  • Leaderboard           │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │       SQLite DB          │
                        │  (auto-seeded on first   │
                        │   startup when empty)    │
                        └──────────────────────────┘
```

### Folder Structure

```
duolingo-clone/
├── frontend/                  # Next.js + React + TypeScript
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # Home (skill tree / learning path)
│   │   ├── lesson/[nodeId]/   # Lesson player
│   │   ├── skill/[skillId]/   # Skill details
│   │   ├── profile/           # Learner profile + stats
│   │   ├── leaderboard/       # Ranked leaderboard
│   │   ├── quests/            # Daily quests
│   │   ├── shop/              # Hearts refill shop
│   │   ├── characters/        # Mascots gallery
│   │   ├── settings/          # Settings
│   │   ├── more/[slug]/       # Catch-all pages
│   │   ├── layout.tsx
│   │   └── globals.css        # Tailwind + Duolingo design tokens
│   ├── components/
│   │   ├── duo/               # Duo-specific: AppShell, Btn, Mascot
│   │   ├── ui/                # Radix + shadcn style primitives
│   │   ├── SkillTree.tsx      # Learning path renderer
│   │   ├── SkillNode.tsx      # Single skill node
│   │   ├── ExerciseCard.tsx   # Lesson exercise wrapper
│   │   ├── ProgressBar.tsx
│   │   ├── HeartDisplay.tsx
│   │   ├── FeedbackOverlay.tsx
│   │   ├── OutOfHeartsModal.tsx
│   │   └── TopBar.tsx
│   ├── hooks/
│   ├── lib/
│   │   ├── duo/
│   │   │   ├── data.ts        # Skill-tree metadata (units/nodes)
│   │   │   └── store.tsx      # DuoState Context Provider
│   │   ├── api.ts             # Fetch helpers (env-aware)
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── vercel.json            # Vercel deployment config
│   └── .env.example
│
├── backend/                   # FastAPI + SQLModel
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app, CORS, /health, lifespan
│   │   ├── database.py        # Engine, init_db(), ensure_seeded()
│   │   ├── models.py          # SQLModel ORM tables
│   │   └── routers/
│   │       ├── user.py        # /api/user/state + /leaderboard
│   │       └── course.py      # /api/course/* (Language/Unit/Skill/Lesson/Exercise)
│   ├── seed.py                # Seed runner (idempotent via ensure_seeded)
│   ├── requirements.txt
│   ├── railway.json           # Railway deployment spec
│   ├── nixpacks.toml          # Railway Nixpacks plan
│   ├── Procfile               # Render / Heroku start command
│   └── .env.example
│
├── render.yaml                # Render blueprint (optional)
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

### Tables (SQLite via SQLModel)

| Table      | Key Columns                                                                 |
|------------|-----------------------------------------------------------------------------|
| **User**   | `id`, `username`, `xp`, `gems`, `hearts`, `streak`, `dailyXp`, `dailyGoal`, `completed` (JSON), `answers`, `correctAnswers`, `quests` (JSON), preferences, `last_active` |
| **Language** | `id`, `name`, `flag`                                                       |
| **Unit**   | `id`, `language_id → Language.id`, `title`, `order`, `description`        |
| **Skill**  | `id`, `unit_id → Unit.id`, `title`, `description`, `lock_status`, `progress`, `xp_reward`, `crowns` |
| **Lesson** | `id`, `skill_id → Skill.id`, `title`, `order`                             |
| **Exercise**| `id`, `lesson_id → Lesson.id`, `type`, `content_json`, `answer_json`, `order` |

### Relationships

```
Language 1───∞ Unit 1───∞ Skill 1───∞ Lesson 1───∞ Exercise
            User (global learner state persisted separately)
```

### Exercise Types
Stored as `type = "multiple_choice" | "translate" | "fill_blank" | "typing" | "match_pairs"` with JSON payloads in `content_json` and `answer_json`.

---

## 🔌 API Overview

All endpoints are prefixed with `/api` unless otherwise noted.

### Health
| Method | Path       | Returns           |
|--------|------------|-------------------|
| GET    | `/health`  | `{ "status": "ok" }` |

### User / Learner state
| Method | Path                  | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/user/state`     | Returns the demo learner's DuoState  |
| POST   | `/api/user/state`     | Persists DuoState + updates streak  |
| GET    | `/api/user/leaderboard` | Returns ranked top 10 with `isYou` |

### Course / Learning path
| Method | Path                                            | Description                     |
|--------|-------------------------------------------------|---------------------------------|
| GET    | `/api/course/`                                  | List all languages              |
| GET    | `/api/course/language/{language_id}`            | Single language                 |
| GET    | `/api/course/language/{language_id}/units`      | Ordered units in language       |
| GET    | `/api/course/unit/{unit_id}/skills`             | Skills inside a unit            |
| GET    | `/api/course/skill/{skill_id}/lessons`          | Lessons inside a skill          |
| GET    | `/api/course/lesson/{lesson_id}`                | Lesson metadata                 |
| GET    | `/api/course/lesson/{lesson_id}/exercises`      | Exercises in a lesson           |
| POST   | `/api/course/skill/{skill_id}/complete`         | Advance skill progress +25%     |

### CORS
Origins come from the `FRONTEND_URL` env var (comma-separated list allowed).
For convenience, localhost origins and `*` are always added in dev.

---

## ⚙️ Setup — Local Development

### Prerequisites
- Node.js **18+** (prefer 20 LTS)
- Python **3.11+**
- pip / venv

---

### 1. Backend setup

```bash
cd backend
python -m venv .venv

# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt

# (Optional) create a .env — defaults are fine for local dev
# cp .env.example .env

# Run the seed + dev server (auto-seeds on startup when DB is empty)
uvicorn app.main:app --reload --port 8000
```

Backend is live at http://localhost:8000
- Health check: http://localhost:8000/health
- API docs: http://localhost:8000/docs  (Swagger UI)
- Alternative docs: http://localhost:8000/redoc

To re-run just the seed: `python seed.py` (idempotent).

---

### 2. Frontend setup

```bash
cd frontend
npm install

# (Optional) configure env — default points to localhost:8000
# cp .env.example .env.local

# Dev server
npm run dev
# → http://localhost:3000

# Production build + serve
npm run build
npm start
```

---

## 🔐 Environment Variables

### Frontend (`/frontend/.env.local`)
```ini
# Comma-separated list of origins allowed by the backend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> In **Vercel**, set `NEXT_PUBLIC_API_URL` to your **deployed** backend, e.g. `https://duolingo-backend.up.railway.app`

### Backend (`/backend/.env`)
```ini
# Your deployed frontend URL (for CORS). Comma-separate for multiple.
FRONTEND_URL=http://localhost:3000

# Optional — custom SQLite path (default: ./database.db relative to backend/)
# DATABASE_URL=sqlite:///./database.db
```

---

## 🌱 Seed Data

Seeding happens **automatically on backend startup** if the database is empty.
It creates:

- 🇪🇸 **Language:** Spanish
- 📚 **2 Units:** Basics + Food & Family
- 🧠 **6 Skills:** Greetings, Numbers 1–10, Common Phrases, Food, Family, Restaurant
- 📝 **6 Lessons** (one per skill) with varied exercises:
  - Multiple Choice
  - Translate / Word Bank
  - Fill in the Blank
  - Typing
  - Match Pairs
- 🧑‍🎓 **Learner:** `demo_user` with 240 XP, 505 gems, 4-day streak

You can re-run manually:

```bash
cd backend && python seed.py
```

---

## 🚀 Deployment

### Option A — Recommended

| Component | Provider | Root Dir    |
|-----------|----------|-------------|
| Frontend  | Vercel   | `frontend/` |
| Backend   | Railway  | `backend/`  |

> SQLite on Railway uses a disk (paid) or ephemeral storage. For a **free** durable SQLite, use Render with a **Persistent Disk**, or host on a VPS.

---

### Vercel — Frontend

1. Push this repo to **GitHub (public)**.
2. Go to https://vercel.com/new and import the repo.
3. Vercel detects Next.js automatically. Make sure:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `frontend`
   - **Build command:** `next build`  (or `npm run build`)
   - **Install command:** `npm install`
4. In **Environment Variables** add:
   - `NEXT_PUBLIC_API_URL` = `https://<YOUR_RAILWAY_OR_RENDER_BACKEND>.com`
   (You can add this after deploying the backend, then re-deploy the frontend.)
5. Deploy. 🚀

The [`frontend/vercel.json`](frontend/vercel.json) is pre-configured as a fallback.

---

### Railway — Backend

1. From the same GitHub repo, create a new **Railway** service.
2. Set **Root Directory** → `backend`
3. Railway will pick up [`backend/railway.json`](backend/railway.json) and [`backend/nixpacks.toml`](backend/nixpacks.toml) automatically.
   - Install: `pip install -r requirements.txt`
   - Build (seed): `python seed.py`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add a service **Variable**:
   - `FRONTEND_URL` = `https://<your-vercel-frontend>.vercel.app`
   - (Optional) `DATABASE_URL` = `sqlite:///./database.db` (default)
5. **Add a custom domain** (Railway → Settings → Networking → Generate Domain) and copy it.
6. Update the frontend's `NEXT_PUBLIC_API_URL` in Vercel and re-deploy.

> 💡 For **persistent SQLite on Railway**, use a **Volume** (Settings → Volumes → Mount at `/app`) OR run on Render with a disk (below).

---

### Render — Backend (better for free persistent SQLite)

Use the blueprint file [`render.yaml`](render.yaml) at repo root, or configure manually:

- **Type:** Web Service
- **Runtime:** Python
- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt && python seed.py`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:**
  - `FRONTEND_URL` = `https://<your-frontend>.vercel.app`
- **Advanced → Add Disk:**
  - Name: `sqlite-data`
  - Mount Path: `/opt/render/project/src`
  - Size: 1 GB (free tier eligible)

Then in the frontend: `NEXT_PUBLIC_API_URL=https://YOUR_RENDER_BACKEND.onrender.com`

---

## ✅ Final Production Integration Flow

```
  Browser (Incognito)
      │
      ▼
  Vercel Frontend ──► NEXT_PUBLIC_API_URL ──► Railway/Render Backend
                                                    │
                                                    ▼
                                               SQLite Database
```

**Smoke test the production build locally before deploying:**

```bash
# Terminal 1
cd backend
.venv\Scripts\Activate.ps1     # Windows
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Terminal 2
cd frontend
$env:NEXT_PUBLIC_API_URL="http://localhost:8000"
npm run build
npm start
# Open http://localhost:3000 → click around, do a lesson, refresh, verify persistence
```

---

## 🧠 Design Decisions & Assumptions

1. **Single demo learner** — The assignment asks for an "immediately usable" seeded experience with a sample learner. A single `id=1` user (`demo_user`) is auto-created/returned. Multi-account auth is out of scope.
2. **Backend-seeded course + Frontend skill-tree metadata** — The course structure is authoritative in the DB, while the frontend `lib/duo/data.ts` provides a skill-tree visual layout (node positions, colors) that mirrors the seeded Skill IDs. This keeps deployment zero-config while still letting you customize visuals.
3. **SQLite is a file** — Cloud providers with ephemeral filesystems (Railway *without* a Volume, old Render plans, Heroku dynos) will reset the DB on restart. Use a persistent disk (Render) or a Volume. The assignment explicitly asks for SQLite and evaluates database design & persistence, so verify progress survives a restart before submitting.
4. **Graceful fallback** — If the backend is unavailable in the browser, the frontend falls back to `localStorage` so the app is still usable offline. Data re-syncs to the backend when it comes back online.
5. **`FRONTEND_URL` + wildcard CORS** — For student project simplicity, `*` is also allowed in dev. In production, set `FRONTEND_URL` to your real origin.
6. **Hearts refill** costs 350 gems (tuned for starter 505 gems, so a single refill is possible). Matches typical Duolingo-like balance.
7. **Daily Streak** is computed server-side based on `last_active` vs. `today - 1` (yesterday). If you stop using the app for ≥2 days, streak resets to 1 on your next XP-earning lesson.

---

## 📝 Assignment Compliance Checklist (Must Have)

- ✅ Next.js + TypeScript frontend
- ✅ FastAPI backend
- ✅ SQLite database
- ✅ Skill tree / learning path (Units → Skills → Lessons → Exercises)
- ✅ Locked / unlocked / completed progression
- ✅ Progress rings / crowns
- ✅ XP (display + reward on lesson complete + persist)
- ✅ Streak (display + logic + persist)
- ✅ Hearts (5, wrong-answer penalty, refill via gems)
- ✅ Gems (mocked, earnable + spendable on refills)
- ✅ Lesson player with MCQ / Translate / Word bank / Match / Fill blank / Type answer
- ✅ Correct + incorrect animated feedback
- ✅ XP + skill progress on lesson completion
- ✅ Daily goal indicator
- ✅ Leaderboard
- ✅ Hearts regeneration / refill mechanism
- ✅ Persistent learner progress (backend DB + localStorage fallback)
- ✅ Seeded course + sample learner (app is immediately usable)
- ✅ Profile page with XP / streak / stats
- ✅ Modals (lesson complete / out-of-hearts)
- ✅ Toasts (Sonner)
- ✅ Celebratory states, animations, progress visuals
- ✅ Settings page placeholder (dark mode, sound, motion, listening)
- ✅ Public GitHub repo structure: `frontend/`, `backend/`, `README.md`
- ✅ Hosted frontend + backend

---

## 🔗 Final Submission Package

> 📋 Replace these with your deployed URLs after hosting:

| Item            | Example / Placeholder                                              |
|-----------------|--------------------------------------------------------------------|
| GitHub Repo     | `https://github.com/YOUR_USERNAME/duolingo-clone`                 |
| Live Frontend   | `https://duolingo-clone-YOURNAME.vercel.app`                      |
| Backend API     | `https://duolingo-backend-YOURNAME.up.railway.app`                |
| Health check    | `https://duolingo-backend-YOURNAME.up.railway.app/health`         |
| Swagger Docs    | `https://duolingo-backend-YOURNAME.up.railway.app/docs`           |

---

## 🧪 Local Commands Cheat Sheet

```bash
# ---- BACKEND ----
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows
# source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python seed.py               # optional seed (also auto-runs on startup when DB empty)
uvicorn app.main:app --reload --port 8000

# ---- FRONTEND ----
cd frontend
npm install
npm run dev                 # http://localhost:3000
npm run build               # production build
npm start                   # serve production build
npm run lint                # eslint
```

---

Happy learning! 🦉✨

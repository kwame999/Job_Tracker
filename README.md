
<!-- <img width="803" height="227" alt="Frame 1171 (1)" src="https://github.com/user-attachments/assets/59ec491a-f715-48ee-a11a-242bd1c13f4f" /> -->

# JTracker
JTracker is a job-application tracking app built with React + TypeScript. It combines a kanban-style dashboard, lightweight project customization, and an AI career coach chat to help track progress and stay consistent while applying.

## 📐 Architecture

AI Orchestration & Context Injection UX-Hunt utilizes a "Dynamic Context" architecture to power the AI Coach. Rather than a standard chatbot, the system serializes the user’s real-time job application data (stored in Supabase) into a structured knowledge base. This context is injected into the Gemini Pro model via custom system instructions, allowing the Coach to provide highly relevant, data-driven advice, such as identifying "Ghosted" trends or generating interview prep specific to companies already on the user's board.

<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/0c93fa29-ba3c-45e9-afe6-951e8b1f5bb9" /><img width="1912" height="901" alt="image" src="https://github.com/user-attachments/assets/8c180002-e873-4322-a9b6-d3aa1e9ec96a" />

## ✨ Features

- Track job applications by status (Wishlist, Applied, Interview, Offer, Rejected, Ghosted).
- Create custom pipeline columns for personalized workflows.
- Add/edit/delete job entries with notes and salary details.
- Dashboard overview with tags and quick stats.
- AI coach chat experience powered by Gemini for strategy/support prompts.
- Supabase-backed persistence for jobs and custom containers.

## 💻Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Supabase (PostgreSQL)
- AI: Google Gemini Pro (Function Calling/Context Injection).

## 🛠Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_KEY=your_gemini_api_key
```

### 3) Run locally

```bash
npm run dev
```

## 📄Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

## ✏️ Roadmap
  
Phase 1: Intelligent Automation – Implement Gemini Function Calling to allow the Coach to directly update job statuses and add notes via natural language commands.

Phase 2: Document Intelligence – Integration with PDF parsers to allow users to upload job descriptions and receive instant resume-tailoring suggestions.

Phase 3: Market Analytics – Interactive salary heatmaps and industry-specific trend analysis based on aggregated (anonymized) user data.

Phase 4: Browser Extension – A companion "Clipper" to pull job data directly from LinkedIn, Indeed, and Glassdoor straight into the dashboard.

# JTracker

JTracker is a job-application tracking app built with React + TypeScript. It combines a kanban-style dashboard, lightweight project customization, and an AI career coach chat to help track progress and stay consistent while applying.

## Features

- Track job applications by status (Wishlist, Applied, Interview, Offer, Rejected, Ghosted).
- Create custom pipeline columns for personalized workflows.
- Add/edit/delete job entries with notes and salary details.
- Dashboard overview with tags and quick stats.
- AI coach chat experience powered by Gemini for strategy/support prompts.
- Supabase-backed persistence for jobs and custom containers.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Supabase (`@supabase/supabase-js`)
- Gemini (`@google/genai`)

## Getting started

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

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

## Notes

- This repository is actively being refined for portfolio presentation.
- Next planned cleanup: move shared TypeScript snippets/types into dedicated files where applicable.

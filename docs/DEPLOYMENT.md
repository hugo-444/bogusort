# Deployment Guide

This project ships both a Fastify backend and a Vite/React frontend. GitHub Pages can only host the static frontend bundle, so you will still need a reachable backend (Railway, Render, Fly, etc.) or a mock API endpoint for full functionality.

## 1. Prepare Backend (required for live data)
1. Deploy `apps/backend` (e.g., Railway) and expose it at `https://api.example.com`.
2. Ensure CORS allows your GitHub Pages origin.
3. Note the base URL; the frontend will call it via `VITE_API_URL`.

## 2. Configure GitHub Pages Workflow
1. Add a repository secret named `VITE_API_URL` that points to your deployed backend. If you do not have a backend yet, you can set this to a mock service (e.g., `https://mock.inventory.example/api`).
2. No other secrets are required. The workflow automatically sets a `VITE_BASE_PATH` that matches your repository name so assets resolve at `https://<user>.github.io/<repo>/`.
3. Push the new workflow (`.github/workflows/frontend-pages.yml`) to `main`. On every push that touches the frontend, GitHub Actions will build `apps/frontend`, upload `dist`, and deploy it to GitHub Pages.

## 3. Local Preview of the Pages Build
```bash
cd /path/to/bogusort
VITE_API_URL=https://api.example.com \
VITE_BASE_PATH=/bogusort/ \
pnpm --filter @inventory/frontend build
npx serve apps/frontend/dist
```

## 4. Mock API Options
- **Local Fastify mock:** run `pnpm --filter @inventory/backend dev` and leave it reachable via `ngrok http 4000`. Use the resulting HTTPS URL as `VITE_API_URL`.
- **Hosted mock:** tools like [Mockoon Cloud](https://mockoon.com/cloud/) or [Beeceptor](https://beeceptor.com/) can stub `/scan`, `/products`, `/locations`, and `/activity` so the frontend UI can be demonstrated without the real backend.

## 5. Troubleshooting
- **Blank page or 404 assets:** confirm `VITE_BASE_PATH` matches the repository folder (`/<repo>/`). The workflow exports this automatically, but you can override locally when testing.
- **CORS errors:** backend must allow the `https://<user>.github.io` origin.
- **Stale bundle:** GitHub Pages caches aggressively. Use `Settings → Pages → Rebuild` or push a no-op commit to retrigger the workflow.


# Inventory Manager – Architecture Plan (v0.1)

Prepared by: Architect-Agent  
Date: 2025-11-26

## 1. Guiding Principles
- Scanner-first UX: all flows optimized for camera input before manual entry.
- Location-agnostic: encode parsing/validation rules centrally so new patterns do not require schema changes.
- Modular services: Product, Inventory, Location, Movement operate as isolated service layers sharing Prisma models.
- Offline-ready posture: APIs designed to tolerate retries and idempotency from mobile devices.
- Observability: Capture audit trails (inventory movements) for every quantity change.

## 2. Delivery Milestones (Agent Hand-off Points)

| Milestone | Scope | Primary Agent | Dependencies |
|-----------|-------|---------------|--------------|
| M0 – Repo Scaffold | Monorepo, shared config, docs, agent board | Coordinator | none |
| M1 – Domain Blueprint | Prisma ERD, API contracts, service responsibilities | Architect/Data | M0 |
| M2 – Backend Foundations | Fastify app, routes skeleton, Prisma client, validation utils | Backend | M1 |
| M3 – Frontend Foundations | Vite + React 19 app, routing, scanner stub, shared hooks | Frontend | M2 (for contracts) |
| M4 – Inventory Flow Alpha | End-to-end scan → create product → place inventory | Backend + Frontend + Data | M2 + M3 |
| M5 – QA Harness | Vitest suites, contract tests, Playwright smoke flows | QA | M4 |

## 3. Monorepo Layout

```
/
├─ apps/
│  ├─ backend/      Fastify + Prisma service
│  └─ frontend/     Vite + React mobile client
├─ packages/
│  ├─ config/       Shared eslint/prettier/tsconfig
│  └─ ui/           (future) shared UI primitives
├─ prisma/          Schema + migrations + ERD exports
├─ docs/            Architecture, decision logs, runbooks
├─ scripts/         Tooling (db setup, seeding, lint hooks)
└─ AGENT_STATUS.md
```

Package manager: **pnpm** (workspaces) with Node 20 target.  
TypeScript everywhere, strict mode.

## 4. Backend Architecture (Fastify + Prisma)

### Services
- `ProductService`: CRUD, UPC auto-create, style/variant linking.
- `LocationService`: Backroom + Floor parsing/validation, canonical storage.
- `InventoryService`: Stock mutations, no-negative guard, multi-location tracking.
- `MovementService`: Persists every action, drives activity log.

### Layers
1. **Routes** (Fastify plugins) – validation via `zod`.
2. **Services** – pure business logic.
3. **Repositories** – Prisma queries; single source of truth.
4. **Events** – internal pub/sub for audit + future webhooks.

### Initial Endpoints
- `POST /scan` – accepts barcode, returns product or triggers creation template.
- `POST /products` / `GET /products/:id`
- `POST /inventory/move` – handles place/pull/move operations.
- `GET /locations/:code` – resolves any location string to canonical info.
- `GET /activity` – movement feed with filters.

### Tech Decisions
- Fastify plugins per domain for easy composition.
- Prisma schema generated from `prisma/schema.prisma`, migrations stored in repo.
- Use PostgreSQL locally via Docker (compose file under `scripts/compose.local.yml`).

## 5. Frontend Architecture (React 19 + Vite)

### Structure
- `src/routes` – Router-based pages (Scanner, Products, Product Detail, Locations, Activity).
- `src/features` – Domain-specific hooks + components (scanner, product, location, movement).
- `src/components` – Shared UI: `LocationCard`, `ProductCard`, `MovementHistory`.
- `src/lib` – API client, storage helpers.

### Key Flows
1. **Scan-first entry**  
   - Access camera (html5-qrcode wrapper), send barcode to `/scan`.  
   - Display immediate product info or creation form.
2. **Inventory movement**  
   - Guided forms for place/pull/move with location validation helper.
3. **Activity feed**  
   - Infinite scroll list over `/activity`.

### Tech Decisions
- Tailwind (or UnoCSS) for responsive mobile-first styling; final choice pending Frontend-Agent.
- TanStack Query for data fetching & caching with optimistic updates.
- Zod shared schemas via `packages/config` for request validation on client.

## 6. Data Model Draft (high-level)
- `Product`: id, upc, name, departmentId, styleId, variantId, price.
- `Style`: id, departmentId, label, metadata JSON.
- `Variant`: id, styleId, label, attributes JSON.
- `Location`: id, code, type (backroom/floor), meta JSON (aisle, column, etc.).
- `InventoryPlacement`: id, productId, locationId, quantity.
- `InventoryMovement`: id, type, productId, fromLocationId, toLocationId, quantity, userId, metadata, createdAt.
- `Department`, `User` scaffolding for RBAC later.

## 7. Dev Workflow
1. `pnpm install` at repo root to set up all workspaces.
2. `pnpm db:up` runs docker compose for postgres.  
3. `pnpm prisma:migrate dev` to apply schema.  
4. `pnpm dev` concurrently runs backend (`pnpm --filter backend dev`) and frontend (`pnpm --filter frontend dev`).
5. Testing via `pnpm test` (Vitest backend/frontend) and `pnpm e2e` (Playwright once flows exist).

## 8. Immediate Next Steps
1. Coordinator: initialize pnpm workspace, root tooling.
2. Backend-Agent: create Fastify skeleton with health check + basic structure.
3. Frontend-Agent: scaffold Vite app with initial routes + scanner placeholder.
4. Data-Agent: translate data model into Prisma schema.
5. QA-Agent: set up Vitest config + placeholder suites after scaffolds exist.

This plan unblocks the Data, Backend, and Frontend agents once committed. The Coordinator should now update the status board to reflect Architect completion and upcoming work.


# Solar-Energy

Comprehensive monorepo for the VoltVision solar energy project. This repository contains three main services:

- `VoltVision-Backend` — primary backend REST API (in TypeScript/Node).
- `VoltVision-data-API` — lightweight data-ingest API and cron job for energy records.
- `VoltVision-Frontend` — Vite + React frontend application.

This README describes the project structure, environment variables, development setup, and useful scripts for each service.

**Live Demo**

Frontend deployment: [https://volt-vision.netlify.app/](https://volt-vision.netlify.app/)

**Repository Structure**

- `VoltVision-Backend/` — Server handling users, solar units, invoices, payments, analytics, background sync, and webhooks.
- `VoltVision-data-API/` — Service responsible for collecting/cron-ing energy-generation records from devices or external providers.
- `VoltVision-Frontend/` — React UI (admin + public pages) built with Vite.

**Quick Start (local dev)**

Prerequisites:

- Node.js 18+ (or the version set in each service `package.json`).
- npm or yarn.
- MongoDB (local or cloud instance via MongoDB Atlas).
- Optional: `ngrok` for exposing local servers to the internet when testing webhooks.

General pattern to run each service locally:

1. Open a terminal in the service folder (e.g. `VoltVision-Backend`).
2. Copy `.env.example` to `.env` (if present) and set environment variables.
3. Install dependencies: `npm install`.
4. Run in dev mode: `npm run dev` or `npm run start:dev` (see each `package.json`).

Example commands:

```bash
cd VoltVision-Backend
npm install
npm run dev
```

Repeat for `VoltVision-data-API` and `VoltVision-Frontend` (frontend typically uses `npm run dev` to start Vite).

**Environment variables**

Each service keeps its env variables in a `.env` file at the service root. Common variables:

- `PORT` — server port
- `MONGODB_URL` — MongoDB connection string (local or MongoDB Atlas)
- `NODE_ENV` — `development` | `production`
- `CLERK_SECRET_KEY` — Clerk authentication secret
- `CLERK_PUBLISHABLE_KEY` — Clerk publishable key (frontend)
- `STRIPE_SECRET_KEY` — Stripe secret key for payment processing
- `STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (frontend)
- `NGROK_AUTH_TOKEN` — ngrok authentication token (optional, for webhook testing)

Refer to the `.env` files in each service folder for specific variable names and values.

**Database & Seeding**

- Both backend services include `infrastructure/seed.ts` (or similar) to seed sample data. Run the seed script after connecting to MongoDB.

Example:

```bash
cd VoltVision-Backend
npm run seed
```

Check `package.json` scripts for the exact command name.

**Background jobs & scheduler**

- `VoltVision-Backend` contains a `scheduler.ts` and `background/sync-energy-generation-records.ts` for periodic processing.
- `VoltVision-data-API` contains `energy-generation-cron.ts` for timed ingestion tasks.

Start these with the service (some are automatically started by the main server), or run them separately per `package.json` scripts.

**Frontend**

- Start the frontend with `npm run dev` in `VoltVision-Frontend` and open the printed local URL (usually `http://localhost:5173`).
- The frontend uses Vite + React; build for production with `npm run build` and preview with `npm run preview`.

**Webhooks & ngrok**

- To test webhooks locally, use `ngrok` to create a public HTTPS endpoint that forwards to your local backend. The repo contains `ngrok.yml` for each service.

Example:

```bash
ngrok http 3000 --config ./ngrok.yml
```

Replace `3000` with your `PORT` value and adjust the ngrok config path as needed.

**Testing & Linting**

- Each service may include scripts for tests and linting in their `package.json`. Run `npm test` and `npm run lint` from service directories when available.

**Scripts (check each service `package.json`)**

- `npm run dev` — start in development, often with `nodemon` or `ts-node-dev`.
- `npm run build` — compile TypeScript to JS for production.
- `npm start` — run compiled production server.
- `npm run seed` — run DB seed script.

**Contributing**

- Fork the repo, create a feature branch, implement changes, and open a pull request with clear description of changes.
- Follow the existing TypeScript style and patterns found in `src/` folders.

**Troubleshooting**

- If the server fails to connect to the database, ensure `DATABASE_URL`/DB env vars are correct and the DB is accepting connections from your host.
- If a port is in use, change `PORT` in the `.env` file.




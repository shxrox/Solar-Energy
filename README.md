# VoltVision

# ![Logo](./VoltVision-Frontend/public/assets//icons/logo.svg) VoltVision

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

#### Data API

```bash
cd ../VoltVision-data-API
npm install
npm run dev
```

#### Frontend

```bash
cd ../VoltVision-Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

## 🔄 Core Features

### 1. Database & Seeding

Both backend services include seed scripts to populate the database with sample data.

```bash
npm run seed
```

Run the command from the respective service directory after configuring `MONGODB_URL`.

---

### 2. Background Jobs

- **Energy Sync**:  
  `VoltVision-Backend/background/sync-energy-generation-records.ts` handles periodic data reconciliation.

- **Ingestion Cron**:  
  `VoltVision-data-API/energy-generation-cron.ts` automatically ingests or simulates energy readings.

---

### 3. Payments & Authentication

- **Authentication**: Managed using **Clerk** for secure user sessions.
- **Payments**: Integrated with **Stripe** for subscriptions and billing. Webhooks process payment and subscription events.

---

## ⚓ Webhooks & Local Testing

To test Stripe or Clerk webhooks locally, expose your backend using **ngrok**:

```bash
ngrok http 3000 --config ./ngrok.yml
```

Update webhook URLs in the Stripe and Clerk dashboards with the generated HTTPS endpoint.

---

## 🧪 Scripts

Common scripts available in each service (`package.json`):

- `npm run dev` – Start development server with hot reload
- `npm run build` – Build the project for production
- `npm run start` – Run the production build
- `npm run lint` – Run code style checks

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

Built with ❤️ for **sustainable energy management** and **grid optimization**.


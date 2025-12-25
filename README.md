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


# VoltVision

![Logo](./VoltVision-Frontend/public/assets/logo/logo-edited.png)

**VoltVision** is a comprehensive monorepo for solar energy management. It features a robust data-ingestion engine, a financial backend integrated with Stripe, and a modern React dashboard for real-time monitoring.

---

## 🚀 Live Deployments

| Service | Deployment Link |
| :--- | :--- |
| **Front-end** | https://volt-visions.netlify.app/ |
| **Back-end API** | https://backend-6fd8.onrender.com |
| **Data-API** | https://solar-energy-o8f7.onrender.com |

---

## 📂 Repository Structure

- **`VoltVision-Backend/`**  
  Primary REST API handling users, solar units, invoicing, analytics, and Stripe payment processing.

- **`VoltVision-data-API/`**  
  Lightweight service for energy record ingestion and automated cron jobs.

- **`VoltVision-Frontend/`**  
  Modern UI built with **Vite + React** for administrators and consumers.

---

## ⚙️ Environment Variables

Each service requires a `.env` file in its root directory.

### Backend (`VoltVision-Backend/.env`)

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_url
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_secret
DATA_API_URL=https://solar-energy-o8f7.onrender.com
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=https://volt-visions.netlify.app
```

### Frontend (`VoltVision-Frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_BACKEND_URL=https://backend-6fd8.onrender.com
```

### Data API (`VoltVision-data-API/.env`)

```env
PORT=3001
MONGODB_URL=your_mongodb_connection_url
```

---

## 🛠️ Quick Start (Local Development)

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** or **yarn**

### Installation & Execution

Clone the repository:

```bash
git clone <your-repo-link>
cd VoltVision
```

#### Backend

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


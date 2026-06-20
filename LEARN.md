# 🧠 VoltVision Learning Guide

Welcome to the VoltVision `LEARN.md`! If you are a new contributor, a team member, or just looking to understand how this project is stitched together, you're in the right place. 

This document explains the architecture, core workflows, and technologies powering our solar energy management system so you can start contributing effectively.

---

## 🏗️ System Architecture Overview

VoltVision is built as a **monorepo** utilizing a microservice-like approach. It is divided into three primary domains:

### 1. The Frontend (`VoltVision-Frontend`)
* **Role:** The user interface for both administrators and consumers.
* **Stack:** React, Vite.
* **Key Responsibilities:**
  * Real-time monitoring of solar units via the dashboard.
  * Handling user sessions and protected routes using **Clerk**.
  * Managing client-side checkout interactions via **Stripe**.
  * Fetching and displaying aggregated data from the Backend API.

### 2. The Primary Backend (`VoltVision-Backend`)
* **Role:** The central nervous system of the application.
* **Stack:** Node.js, Express (implied by typical REST setup), MongoDB.
* **Key Responsibilities:**
  * Serving REST API endpoints for the Frontend.
  * Managing business logic for users, solar units, invoices, and analytics.
  * Listening to **Stripe Webhooks** to update user subscription/payment statuses.
  * Listening to **Clerk Webhooks** to sync user creation/updates to our database.
  * Running background jobs (`background/sync-energy-generation-records.ts`) to reconcile data.

### 3. The Data API (`VoltVision-data-API`)
* **Role:** A lightweight ingestion engine specifically for energy metrics.
* **Stack:** Node.js, MongoDB.
* **Key Responsibilities:**
  * Handling high-frequency data ingestion from solar hardware (or simulating it).
  * Executing automated Cron jobs (`energy-generation-cron.ts`) to record readings periodically without bogging down the primary backend.

---

## 🔄 Core Workflows (How Data Moves)

Understanding these workflows will help you navigate the codebase:

### 1. Energy Ingestion Flow
1. The **Data API** runs a cron job (`energy-generation-cron.ts`).
2. Readings are generated/ingested and saved directly to the database.
3. The **Primary Backend** runs a reconciliation job (`sync-energy-generation-records.ts`) to aggregate this data for billing or analytics.
4. The **Frontend** fetches this aggregated data to render charts on the dashboard.

### 2. User Authentication Flow
1. A user signs up on the **Frontend** using the Clerk UI.
2. Clerk handles the secure authentication and issues a session token.
3. Clerk fires a webhook to the **Backend** (`CLERK_WEBHOOK_SIGNING_SECRET`).
4. The **Backend** receives the payload and creates a corresponding user profile in MongoDB.

### 3. Payment & Invoicing Flow
1. A user initiates a subscription/payment on the **Frontend**.
2. Stripe processes the payment securely.
3. Stripe fires a webhook to the **Backend** (`STRIPE_WEBHOOK_SECRET`).
4. The **Backend** verifies the event and updates the user's invoice/subscription status in MongoDB.

---

## 📚 Key Technologies to Brush Up On

If you are new to the stack, here are the core technologies you should familiarize yourself with:

* **[React & Vite](https://vitejs.dev/guide/):** Understanding functional components, hooks, and Vite's fast build tool.
* **[MongoDB & Mongoose](https://mongoosejs.com/):** How NoSQL data is structured, seeded, and queried.
* **[Clerk Auth](https://clerk.com/docs):** How webhooks work for user syncing, and how protected routes work in React.
* **[Stripe Payments](https://stripe.com/docs):** Specifically, how to handle `price_id` checkout sessions and verify webhooks locally.

---

## 🗺️ Suggested Learning Path for New Developers

If you want to dive into the code, follow this sequence:

1. **Spin up the environment:** Follow the *Quick Start* in the `README.md`. Make sure you run the seed script (`npm run seed`) so you have data to play with.
2. **Follow the Data:** Open `VoltVision-data-API/energy-generation-cron.ts` to see how raw data enters the system.
3. **Trace an API Call:** Open the `VoltVision-Backend` routing files. Trace a request from the endpoint down to the MongoDB controller.
4. **Inspect the Webhooks:** Look at how the Backend processes incoming Clerk or Stripe webhooks. (Setting up `ngrok` as detailed in the README is crucial for testing this).
5. **Explore the UI:** Run the `VoltVision-Frontend` and see how it fetches data from the backend to populate the dashboard.

*Happy Coding! Built with ❤️ for sustainable energy management.*

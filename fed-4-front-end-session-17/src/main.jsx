import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./pages/home/home.page.jsx";
import DashboardPage from "./pages/dashboard/dashboard.page.jsx";

import RootLayout from "./layouts/root.layout.jsx";
import MainLayout from "./layouts/main.layout.jsx";
import DashboardLayout from "./layouts/dashboard.layout.jsx";
import AdminLayout from "./layouts/admin.layout.jsx";
import SignInPage from "./pages/auth/sign-in-page.jsx";
import SignUpPage from "./pages/auth/sign-up-page.jsx";
import SolarUnitsPage from "./pages/admin/solar-units.page.jsx";
import SettingsPage from "./pages/admin/settings.page.jsx";
import SolarUnitDetailPage from "./pages/admin/solar-unit-detail.page.jsx";
import AuthorizedLayout from "./layouts/authorized.layout.jsx";
import ProtectedLayout from "./layouts/protected.layout.jsx";
import AdminPage from "./pages/admin/admin.page.jsx";
import SolarUnitEditPage from "./pages/admin/solar-unit-edit.page.jsx";
import SolarUnitCreatePage from "./pages/admin/solar-unit-create.page.jsx";
import AnomaliesPage from "./pages/anomalies/anomalies.page.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";

import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/anomalies" element={<AnomaliesPage />} />
                  <Route path="/dashboard/analytics" element={<Analytics />} />

                </Route>
                <Route element={<AuthorizedLayout />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/solar-units" element={<SolarUnitsPage />} />
                    <Route path="/admin/solar-units/:id" element={<SolarUnitDetailPage />} />
                    <Route path="/admin/solar-units/:id/edit" element={<SolarUnitEditPage />} />
                    <Route path="/admin/solar-units/create" element={<SolarUnitCreatePage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

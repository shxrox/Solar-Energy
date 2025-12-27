
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

// --- REDUX & AUTH ---
import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";

// --- LAYOUTS ---
import RootLayout from "./layouts/root.layout.jsx";
import MainLayout from "./layouts/main.layout.jsx";
import DashboardLayout from "./layouts/dashboard.layout.jsx";
import AuthorizedLayout from "./layouts/authorized.layout.jsx";
import ProtectedLayout from "./layouts/protected.layout.jsx";

// --- PUBLIC PAGES ---
import HomePage from "./pages/home/home.page.jsx";
import SignInPage from "./pages/auth/sign-in-page.jsx";
import SignUpPage from "./pages/auth/sign-up-page.jsx";
import Story from "./pages/home/components/HeroSection/Story";
import ContactUs from "./pages/home/components/HeroSection/ContactUs";

// --- DASHBOARD PAGES ---
import DashboardPage from "./pages/dashboard/dashboard.page.jsx";
import AnomaliesPage from "./pages/anomalies/anomalies.page.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";

// --- ADMIN PAGES ---
import AdminPage from "./pages/admin/admin.page.jsx";
import SolarUnitsPage from "./pages/admin/solar-units.page.jsx";
import SolarUnitDetailPage from "./pages/admin/solar-unit-detail.page.jsx";
import SolarUnitEditPage from "./pages/admin/solar-unit-edit.page.jsx";
import SolarUnitCreatePage from "./pages/admin/solar-unit-create.page.jsx";
import SettingsPage from "./pages/admin/settings.page.jsx";
import InvoiceDashbord from "./pages/admin/invoices.page.jsx";
import AdminAnomaliesPage from "./pages/admin/admin-anomalies.page.jsx";
// --- BILLING PAGES ---
import InvoicesPage from "./pages/invoices/invoices.page.jsx";
import PaymentPage from "./pages/payment/payment.page.jsx";
import PaymentCompletePage from "./pages/payment/complete.page.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

createRoot(document.getElementById("root")).render(
  <StrictMode>
 
     <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Routes >
            <Route element={<RootLayout />}>
              
              {/* Public Routes */}
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/our-story" element={<Story />} />
              </Route>

              {/* Protected Routes (Require Login) */}
              <Route element={<ProtectedLayout />}>
                
                {/* ✅ EVERYTHING uses DashboardLayout now (Single Sidebar) */}
                <Route element={<DashboardLayout />}>
                  
                  {/* User Routes */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/anomalies" element={<AnomaliesPage />} />
                  <Route path="/dashboard/analytics" element={<Analytics />} />
                  <Route path="/dashboard/invoices" element={<InvoicesPage />} />
                  <Route path="/dashboard/invoices/complete" element={<PaymentCompletePage />} />
                  
                  <Route path="/dashboard/payment/:id" element={<PaymentPage />} />
                  <Route path="/dashboard/invoices/complete" element={<PaymentCompletePage />} />

                  {/* Admin Routes (Require 'admin' role) */}
                  <Route element={<AuthorizedLayout />}>
                    {/* Note: We REMOVED AdminLayout to stop the double sidebar */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/solar-units" element={<SolarUnitsPage />} />
                    <Route path="/admin/solar-units/:id" element={<SolarUnitDetailPage />} />
                    <Route path="/admin/solar-units/:id/edit" element={<SolarUnitEditPage />} />
                    <Route path="/admin/solar-units/create" element={<SolarUnitCreatePage />} />
                    <Route path="/admi/anomalies" element={<AdminAnomaliesPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                    <Route path="/admin/invoices-dashbord" element={<InvoiceDashbord />} />
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


import { useState } from "react";
import {
  ChartLine,
  LayoutDashboard,
  TriangleAlert,
  BadgeDollarSign,
  Sun,
  Settings,
  Landmark,
  Menu,
  X,
  AlertTriangle
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";

// 1. Define Standard Items
const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: <TriangleAlert className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartLine className="w-5 h-5" />,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <BadgeDollarSign className="w-5 h-5" />,
  },
];

// 2. Define Admin Items
const adminItems = [
  {
    title: "Manage Units",
    url: "/admin/solar-units",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    title: "Financial Overview",
    url: "/admin/invoices-dashbord",
    icon: <Landmark className="w-5 h-5" />,
  },
    {
    title: "Anomalies Overview",
    url: "/admi/anomalies",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

// Custom Sidebar Item Component
const SidebarItem = ({ item, onClick }) => {
  let location = useLocation();
  // const isActive = location.pathname === item.url || location.pathname.startsWith(`${item.url}/`);
  const isActive =
  item.url === "/dashboard"
    ? location.pathname === "/dashboard"
    : location.pathname === item.url || location.pathname.startsWith(`${item.url}/`);


  return (
    <li>
      <Link
        to={item.url}
        onClick={onClick}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
          ${isActive
            ? "bg-primary/10 " 
            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
          }
        `}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  );
};

export function AppSidebar() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      {/* Fixed: z-[60] ensures it stays above the sidebar (z-50) so the button is always clickable */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-base-100 text-base-content border-b border-base-200 flex items-center justify-between px-4 z-[60]">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content shadow-sm overflow-hidden">
             <img src="/assets/logo/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span className="font-[Inter] text-lg font-bold tracking-tight">VoltVision</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md hover:bg-base-200 transition-colors text-base-content"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- MOBILE BACKDROP --- */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      {/* Fixed: z-50 places it below the header (z-60) but above content */}
      <aside className={`
        fixed md:sticky top-0 z-50 h-screen w-64 flex-col bg-base-100 text-base-content border-r border-base-200 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:flex
      `}>

        {/* Header / Logo (Desktop Only) */}
        <div className="h-16 flex items-center px-6 border-b border-base-200/50 hidden md:flex">
          <Link to="/" className="flex items-center gap-3 group w-full">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden">
               <img
                  src="/assets/logo/logo.png"
                  alt="VoltVision Logo"
                  className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col">
              <span className="font-[Inter] text-lg font-bold tracking-tight leading-none">
                VoltVision
              </span>
               <span className="text-[10px] text-base-content/60 font-medium tracking-wide">
                Energy Monitor
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Header Spacer (To push content down below the fixed header) */}
        <div className="h-16 md:hidden flex-shrink-0" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">

          {/* Group 1: Main Menu */}
          <div>
            <h3 className="px-3 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
              Menu
            </h3>
            <ul className="space-y-1">
              {userItems.map((item) => (
                <SidebarItem key={item.url} item={item} onClick={() => setIsMobileOpen(false)} />
              ))}
            </ul>
          </div>

          {/* Group 2: Admin Controls (Conditional) */}
          {isAdmin && (
            <div>
              <h3 className="px-3 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                Admin Controls
              </h3>
              <ul className="space-y-1">
                {adminItems.map((item) => (
                  <SidebarItem key={item.url} item={item} onClick={() => setIsMobileOpen(false)} />
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer / User Profile Snippet */}
        <div className="p-4 border-t border-base-200 bg-base-100 mt-auto">
           <div className="flex items-center gap-3 p-2 rounded-xl bg-base-200/50 border border-base-200">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  {user?.firstName?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                  <p className="text-xs font-semibold truncate text-base-content">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-[10px] text-base-content/60 truncate">
                    {isAdmin ? "Administrator" : "Standard Plan"}
                  </p>
              </div>
           </div>
        </div>

      </aside>
    </>
  );
}
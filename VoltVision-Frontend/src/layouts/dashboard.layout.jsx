import { Outlet } from "react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full bg-slate-200">
          <SidebarTrigger className="block" />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}

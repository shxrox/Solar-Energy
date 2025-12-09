import { Outlet } from "react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full ">
          <SidebarTrigger className="block" />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}

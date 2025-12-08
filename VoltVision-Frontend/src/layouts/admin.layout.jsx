import { Outlet } from "react-router";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="p-4 w-full bg-slate-200">
          <SidebarTrigger className="block" />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}

import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";

export default function DashboardLayout() {
  return (
    <div>
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-1 p-4">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

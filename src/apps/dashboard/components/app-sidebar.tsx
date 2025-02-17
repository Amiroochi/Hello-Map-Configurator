import * as React from "react";

import { LifeBuoy, Send, Computer } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";

const data = {
  navMain: [
    {
      name: "Projects",
      url: "/dashboard/projects",
      icon: Computer,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/dashboard/feedback",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="!h-[calc(100svh))]" {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="#">
              <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
                <img
                  src="/logo.png"
                  alt="Hello Map Configurator"
                  className="w-6 h-6"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Hello Map Configurator
                </span>
                <span className="truncate text-xs">version 1.0.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

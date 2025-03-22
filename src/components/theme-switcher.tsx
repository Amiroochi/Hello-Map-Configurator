import { useCallback } from "react";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "./theme-provider";
import { SidebarMenuButton } from "./ui/sidebar";

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    updateTheme(theme === "light" ? "dark" : "light");
  }, [theme, updateTheme]);

  return (
    <SidebarMenuButton className="cursor-pointer" onClick={toggleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </SidebarMenuButton>
  );
}

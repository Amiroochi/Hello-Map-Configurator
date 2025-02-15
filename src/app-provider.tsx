import { createContext, ReactNode, useContext, useMemo } from "react";

import { useUser, UseUserReturn } from "./hooks/use-user";

const AppContext = createContext<{ user: UseUserReturn } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const user = useUser();

  const state = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}

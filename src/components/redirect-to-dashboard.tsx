import { useEffect } from "react";

import { useRedirect } from "@/hooks/use-redirect";
export function RedirectToDashboard() {
  const { redirectToDashboard } = useRedirect();

  useEffect(() => {
    redirectToDashboard();
  }, []);

  return null;
}

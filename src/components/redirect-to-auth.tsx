import { useEffect } from "react";

import { useRedirect } from "@/hooks/use-redirect";
export function RedirectToAuth() {
  const { redirectToAuth } = useRedirect();

  useEffect(() => {
    redirectToAuth();
  }, []);

  return null;
}

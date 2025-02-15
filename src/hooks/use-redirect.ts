import { useCallback } from "react";
import { useNavigate } from "react-router";

import { auth, dashboard } from "@/routes";

export function useRedirect() {
  const navigate = useNavigate();

  const redirectToAuth = useCallback(() => navigate(auth.login), []);
  const redirectToDashboard = useCallback(() => navigate(dashboard.home), []);

  return { redirectToAuth, redirectToDashboard };
}

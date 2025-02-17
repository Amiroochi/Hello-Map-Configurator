import { Route, Routes } from "react-router";

import { Login } from "./apps/auth/login";
import { AuthLayout } from "./apps/auth/layout";
import { RedirectToAuth } from "./components/redirect-to-auth";

export function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="*" element={<RedirectToAuth />} />
      </Route>
    </Routes>
  );
}

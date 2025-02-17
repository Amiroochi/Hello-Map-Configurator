import { lazy } from "react";
import { Route, Routes } from "react-router";

import { Home } from "./apps/dashboard/home";
import DashboardLayout from "./apps/dashboard/layout";
import { RedirectToDashboard } from "./components/redirect-to-dashboard";

const Profile = lazy(() => import("./apps/dashboard/profile"));
const Setting = lazy(() => import("./apps/dashboard/setting"));
const Support = lazy(() => import("./apps/dashboard/support"));
const Feedback = lazy(() => import("./apps/dashboard/feedback"));
const Projects = lazy(() => import("./apps/dashboard/projects"));

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />} />
        <Route path="support" element={<Support />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="projects" element={<Projects />} />
      </Route>
      <Route path="*" element={<RedirectToDashboard />} />
    </Routes>
  );
}

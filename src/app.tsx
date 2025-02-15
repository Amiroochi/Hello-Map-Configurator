import { Routes, Route } from "react-router";

import { Login } from "./apps/auth/login";
import AuthLayout from "./apps/auth/layout";
import { AppProvider } from "./app-provider";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route index element={<>Home</>} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="dashboard" element={<>Dashboard Layout</>}>
          <Route index element={<>Dashboard Home</>} />
          <Route path="projects" element={<>Dashboard Projects</>} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;

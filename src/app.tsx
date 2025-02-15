import { Routes, Route } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

import { Login } from "./apps/auth/login";
import AuthLayout from "./apps/auth/layout";
import { AppProvider } from "./app-provider";
import { NotFound } from "./routes/not-found";
import { ErrorHandler } from "./components/error-handler";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index path="login" element={<Login />} />
          </Route>
          <Route path="dashboard" element={<>Dashboard Layout</>}>
            <Route index element={<>Dashboard Home</>} />
            <Route path="projects" element={<>Dashboard Projects</>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <ErrorHandler />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;

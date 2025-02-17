import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

import { AppProvider, useApp } from "./app-provider";
import { AuthenticatedApp } from "./authenticated-app";
import { ErrorHandler } from "./components/error-handler";
import { UnAuthenticatedApp } from "./unauthenticated-app";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppView />
        <Toaster />
        <ErrorHandler />
      </AppProvider>
    </QueryClientProvider>
  );
}

function AppView() {
  const { user } = useApp();

  return user.id ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;

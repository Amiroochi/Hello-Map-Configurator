// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

import { AppProvider, useApp } from "./app-provider";
import { AuthenticatedApp } from "./authenticated-app";
import { ErrorHandler } from "./components/error-handler";
import { UnAuthenticatedApp } from "./unauthenticated-app";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider>
          <AppView />
          <Toaster />
          <ErrorHandler />
        </ThemeProvider>
      </AppProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

function AppView() {
  const { user } = useApp();

  return user.id ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;

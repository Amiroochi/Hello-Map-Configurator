import { ReactNode } from "react";
import { ErrorBoundary as ErrorBoundaryPrimitive } from "react-error-boundary";

function fallbackRender({ error }: { error: { message: string } }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryPrimitive fallbackRender={fallbackRender}>
      {children}
    </ErrorBoundaryPrimitive>
  );
}

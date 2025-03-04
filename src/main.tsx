import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./app";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./__mocks__/browser");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

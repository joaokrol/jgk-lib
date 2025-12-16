import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@app/App";
import { AntdProvider } from "@app/providers/AntdProvider";
import { QueryProvider } from "@app/providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AntdProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@app/App";
import { QueryProvider } from "@app/providers/query/QueryProvider";
import { AntdProvider } from "@app/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AntdProvider>
  </StrictMode>
);

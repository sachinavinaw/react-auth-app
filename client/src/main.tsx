import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppInitializer from "./AppInitializer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppInitializer />
  </StrictMode>,
);

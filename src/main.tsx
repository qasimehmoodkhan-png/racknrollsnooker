import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

try {
  const rootNode = document.getElementById("root");
  if (!rootNode) {
    throw new Error("App root element was not found.");
  }

  createRoot(rootNode).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Public app failed to initialize.', error);
  const rootNode = document.getElementById("root");
  if (rootNode) {
    rootNode.innerHTML = `
      <div style="min-height:100vh;display:grid;place-items:center;background:#050505;color:#fff;font-family:Inter,sans-serif;">
        <div style="padding:24px 32px;border:1px solid rgba(197,160,89,0.35);background:rgba(255,255,255,0.03);border-radius:16px;max-width:560px;text-align:center;">
          <h1 style="margin:0 0 12px;font-size:28px;">Website temporarily unavailable</h1>
          <p style="margin:0;color:rgba(255,255,255,0.72);">The page is loading a safe local fallback. Please refresh in a moment.</p>
        </div>
      </div>
    `;
  }
}


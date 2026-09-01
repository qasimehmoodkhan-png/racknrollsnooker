import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './pages/AdminDashboard.tsx';
import './index.css';

const dismissLoader = () => {
  const loader = document.getElementById('app-loading');
  if (loader) {
    loader.remove();
  }

  if (typeof window !== 'undefined' && typeof (window as any).__RNR_ADMIN_READY__ === 'function') {
    (window as any).__RNR_ADMIN_READY__();
  }
};

try {
  const rootNode = document.getElementById('root');
  if (!rootNode) {
    throw new Error('Admin root element was not found.');
  }

  createRoot(rootNode).render(
    <StrictMode>
      <AdminDashboard />
    </StrictMode>
  );

  setTimeout(dismissLoader, 300);
} catch (error) {
  console.error('Admin dashboard failed to initialize.', error);
  const rootNode = document.getElementById('root');
  if (rootNode) {
    rootNode.innerHTML = `
      <div style="min-height:100vh;display:grid;place-items:center;background:#050505;color:#fff;font-family:Inter,sans-serif;">
        <div style="padding:24px 32px;border:1px solid rgba(197,160,89,0.35);background:rgba(255,255,255,0.03);border-radius:16px;max-width:560px;text-align:center;">
          <h1 style="margin:0 0 12px;font-size:28px;">Admin dashboard unavailable</h1>
          <p style="margin:0;color:rgba(255,255,255,0.72);">The dashboard is loading with a safe fallback. Please refresh or retry in a moment.</p>
        </div>
      </div>
    `;
  }
  dismissLoader();
}

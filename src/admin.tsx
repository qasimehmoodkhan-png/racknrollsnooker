import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './pages/AdminDashboard.tsx';
import './index.css';

const loadingNode = document.getElementById('app-loading');
if (loadingNode) {
  loadingNode.remove();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>
);

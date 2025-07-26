import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "@/components/ui/sonner"
import App from './App';

import './index.css';
import { ReactFlowProvider } from '@xyflow/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
    <Toaster  position="top-center"   />
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);

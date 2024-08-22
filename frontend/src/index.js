import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const clerkFrontendApi = process.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
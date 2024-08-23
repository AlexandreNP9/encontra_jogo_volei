import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react'; // Importando ClerkProvider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Substitua 'your-clerk-frontend-api' pelo valor real de sua API key.
const clerkFrontendApi = `import.meta.env.VITE_CLERK_PUBLISHABLE_KEY`;

ReactDOM.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);

// Função opcional para medir a performance da aplicação
reportWebVitals();
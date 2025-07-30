import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  const domain = process.env.AUTH0_DOMAIN || '';
  const clientId = process.env.AUTH0_CLIENT_ID || '';
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  if (process.env.NODE_ENV === 'test' || !domain || !clientId) {
    root.render(app);
  } else {
    root.render(
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        {app}
      </Auth0Provider>
    );
  }
}

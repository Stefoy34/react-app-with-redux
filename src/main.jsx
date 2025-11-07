import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './states/store.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

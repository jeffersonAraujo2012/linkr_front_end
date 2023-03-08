import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyle.js';
import App from './components/App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

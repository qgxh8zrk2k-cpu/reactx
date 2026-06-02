import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx'; // This links to your app.jsx file
import './index.css'; // If you have a CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
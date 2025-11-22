import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import bg from "./assets/web_bg.png";

// Inject BG globally (Vite Production Safe)
document.documentElement.style.setProperty("--bg-image", `url(${bg})`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

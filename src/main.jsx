import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />  
    </AuthProvider>
  </React.StrictMode>
);

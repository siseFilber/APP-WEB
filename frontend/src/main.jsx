import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Antes quizás decía ./context/AuthContext
// Ahora debe apuntar al archivo que tiene la lógica:
import { AuthProvider } from './context/AuthProvider';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
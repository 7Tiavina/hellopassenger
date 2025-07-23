import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './main';


export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Redirection vers /login par défaut */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Page de connexion : autorisée seulement si déconnecté */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />}
      />

      {/* Tableau de bord : accessible seulement si connecté */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Gestion des routes inconnues */}
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Routes>
  );
}

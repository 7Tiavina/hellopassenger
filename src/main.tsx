import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


// Définition du type pour le contexte d'authentification
type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personnalisé pour accéder facilement au contexte
export function useAuth() {
  return useContext(AuthContext)!;
}

// Fournisseur du contexte (accessible à toute l'app)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie l’état de connexion dans le localStorage au démarrage
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  // Fonction de connexion (fictive ici)
  const login = (email: string, password: string) => {
    if (email === 'admin@test.com' && password === '1234') {
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Point d’entrée de l’app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

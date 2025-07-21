import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../main';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(email, pass);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ada7bb]">
      <div className="bg-[#ffffff] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-[#2c2c2c] mb-6">
          Connexion
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2 text-[#2c2c2c]">Email</label>
        <input
          type="email"
          placeholder="admin@test.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-[#ada7bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc80a]"
        />

        <label className="block mb-2 text-[#2c2c2c]">Mot de passe</label>
        <input
          type="password"
          placeholder="••••••••"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-[#ada7bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc80a]"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#ffc80a] text-[#2c2c2c] py-2 rounded-lg font-semibold hover:bg-[#e6b108] transition"
        >
          Se connecter
        </button>

        <p className="mt-4 text-sm text-center text-[#2c2c2c]">
          Pas encore de compte ?{' '}
          <span
            className="text-[#ffc80a] hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Inscrivez‑vous
          </span>
        </p>
      </div>
    </div>
  );
}

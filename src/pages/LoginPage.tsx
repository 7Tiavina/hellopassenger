import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../main';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, pass);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={pass} onChange={e => setPass(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
}

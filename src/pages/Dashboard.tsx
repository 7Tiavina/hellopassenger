import { useNavigate } from 'react-router-dom';
import { useAuth } from '../main';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenue sur le dashboard</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

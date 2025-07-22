import React from 'react';
import { useAuth } from '../../main';

const bgPrimary = 'bg-[#ffc80a]';
const textPrimary = 'text-[#2c2c2c]';
const textAlt = 'text-[#ada7bb]';
const bgLight = 'bg-[#ffffff]';

export function TopNavbar({
  onSectionChange,
}: {
  onSectionChange: (s: string) => void;
}) {
  const { logout } = useAuth();
  return (
    <header className={`flex justify-between items-center px-6 py-3 shadow ${bgPrimary}`}>
      <nav className="flex space-x-6">
        <button onClick={() => onSectionChange('reservations')} className={`${textPrimary} hover:underline`}>
          Avantages
        </button>
        <button onClick={() => onSectionChange('history')} className={`${textPrimary} hover:underline`}>
          Infos & Guide d'achat
        </button>
        <button onClick={() => onSectionChange('profile')} className={`${textPrimary} hover:underline`}>
          Contactez-nous
        </button>
      </nav>
      <button
        onClick={logout}
        className={`${bgLight} ${textPrimary} px-4 py-1 rounded hover:bg-[#ada7bb] transition`}
      >
        Déconnexion
      </button>
    </header>
  );
}

export function SidebarMenu({
  onSectionChange,
}: {
  onSectionChange: (s: string) => void;
}) {
  const textAlt = 'text-[#ada7bb]';
  return (
    <aside className="w-56 p-4" style={{ backgroundColor: '#2c2c2c' }}>
      {[
        { key: 'reservations', label: 'Mes Réservations' },
        { key: 'history', label: 'Historique Transactions' },
        { key: 'profile', label: 'Info Perso' },
        { key: 'address', label: 'Adresse' },
        { key: 'security', label: 'Sécurités' },
      ].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSectionChange(key)}
          className={`${textAlt} block w-full text-left mb-2 hover:text-white`}
        >
          {label}
        </button>
      ))}
    </aside>
  );
}

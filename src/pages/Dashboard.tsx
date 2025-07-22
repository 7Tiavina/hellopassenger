// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../main';
import { TopNavbar, SidebarMenu } from '../components/layout/LayoutComponents';
import ReservationForm, { type ReservationData } from '../components/reservations/ReservationForm';
import {
  HistorySection,
  ProfileSection,
  AddressSection,
  SecuritySection,
} from '../components/dashboard/DashboardSections';

type Section = 'reservations' | 'history' | 'profile' | 'address' | 'security';

export default function Dashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState<Section>('reservations');
  const [showForm, setShowForm] = useState(false);

  // 1️⃣ État des réservations & initialisation depuis localStorage
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  useEffect(() => {
    const data = localStorage.getItem('reservations');
    if (data) {
      setReservations(JSON.parse(data));
    }
  }, []);

  // 2️⃣ Ajout d’une réservation + mise à jour du localStorage
  const handleComplete = (data: ReservationData) => {
    const updated = [...reservations, data];
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar onSectionChange={(key: string) => setSection(key as Section)} />
      <div className="flex flex-1">
        <SidebarMenu
          onSectionChange={key => {
            setSection(key as Section);
            setShowForm(false);
          }}
        />
        <main className="flex-1 p-6 overflow-auto">
          {section === 'reservations' && (
            <>
              {!showForm ? (
                <>
                  {/* Bouton pour lancer le formulaire */}
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#ffc80a] text-[#2c2c2c] px-6 py-3 rounded shadow hover:opacity-90 transition"
                  >
                    Réserver une consigne
                  </button>

                  {/* Tableau persistant */}
                  {reservations.length > 0 && (
                    <table className="min-w-full mt-6 border">
                      <thead className="bg-[#ada7bb] text-[#2c2c2c]">
                        <tr>
                          <th className="px-4 py-2 border">Départ</th>
                          <th className="px-4 py-2 border">Arrivée</th>
                          <th className="px-4 py-2 border">Collecte</th>
                          <th className="px-4 py-2 border">Livraison</th>
                          <th className="px-4 py-2 border">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((r, i) => (
                          <tr key={i} className="odd:bg-white even:bg-gray-100">
                            <td className="px-4 py-2 border">{r.departure}</td>
                            <td className="px-4 py-2 border">{r.arrival}</td>
                            <td className="px-4 py-2 border">{r.collectDate}</td>
                            <td className="px-4 py-2 border">{r.deliverDate}</td>
                            <td className="px-4 py-2 border">{r.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              ) : (
                /* On passe handleComplete : formulaire inchangé */
                <ReservationForm onComplete={handleComplete} />
              )}
            </>
          )}
          {section === 'history' && <HistorySection />}
          {section === 'profile' && <ProfileSection />}
          {section === 'address' && <AddressSection />}
          {section === 'security' && <SecuritySection />}
        </main>
      </div>
    </div>
  );
}

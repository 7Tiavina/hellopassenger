// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../main';
import { TopNavbar, SidebarMenu } from '../components/layout/LayoutComponents';
import ReservationForm, { type ReservationData } from '../components/reservations/ReservationForm';
import ReservationList from '../components/reservations/ReservationList';

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
  //  Crée une ref unique
  const newRef = `CNG-${Date.now()}`

  //  Ajoute cette ref au data
  const withRef: ReservationData = { ...data, ref: newRef }

  //  Met à jour le tableau et le localStorage
  const updated = [...reservations, withRef]
  setReservations(updated)
  localStorage.setItem('reservations', JSON.stringify(updated))

  //  Ferme le formulaire
  setShowForm(false)
}


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
                    <ReservationList reservations={reservations} />
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

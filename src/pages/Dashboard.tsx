import React, { useState } from 'react';
import { useAuth } from '../main';
import { TopNavbar, SidebarMenu } from '../components/layout/LayoutComponents';
import ReservationForm from '../components/reservations/ReservationForm';
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

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar onSectionChange={(s: string) => setSection(s as Section)} />
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
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#ffc80a] text-[#2c2c2c] px-6 py-3 rounded shadow hover:opacity-90 transition"
                >
                  Réserver une consigne
                </button>
              ) : (
                <ReservationForm />
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

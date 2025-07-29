// src/pages/Dashboard.tsx
import React, { useState } from 'react'
import { useAuth } from '../main'
import { TopNavbar, SidebarMenu } from '../components/layout/LayoutComponents'
import ReservationForm from '../components/reservations/ReservationForm'
import ReservationList from '../components/reservations/ReservationList'

import {
  HistorySection,
  ProfileSection,
  AddressSection,
  SecuritySection,
} from '../components/dashboard/DashboardSections'

type Section = 'reservations' | 'history' | 'profile' | 'address' | 'security'

export default function Dashboard() {
  const { logout } = useAuth()
  const [section, setSection] = useState<Section>('reservations')
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar onSectionChange={(key) => setSection(key as Section)} />

      <div className="flex flex-1">
        <SidebarMenu
          onSectionChange={(key) => {
            setSection(key as Section)
            setShowForm(false)
          }}
        />

        <main className="flex-1 p-6 overflow-auto">
          {section === 'reservations' && (
            <>
              {!showForm ? (
                <>
                  {/* Bouton pour afficher le formulaire */}
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#ffc80a] text-[#2c2c2c] px-6 py-3 rounded shadow hover:opacity-90 transition"
                  >
                    Réserver une consigne
                  </button>

                  {/* Liste des réservations via l’API */}
                  <div className="mt-6">
                    <ReservationList />
                  </div>
                </>
              ) : (
                /* Formulaire avec rappel de fermeture */
                <div className="mt-6">
                  <ReservationForm
                    onDone={() => {
                      setShowForm(false)
                      setSection('reservations')
                    }}
                  />
                </div>
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
  )
}

// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../main';

type Section =
  | 'reservations'
  | 'history'
  | 'profile'
  | 'address'
  | 'security';

// Étapes du workflow
type Step = 1 | 2 | 3 | 4 | 5;

export default function Dashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState<Section>('reservations');
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>(1);

  const next = () => setStep(s => (s < 5 ? (s + 1) as Step : s));
  const back = () => setStep(s => (s > 1 ? (s - 1) as Step : s));
  const progress = (step - 1) * 25;

  // Couleurs custom
  const bgPrimary = 'bg-[#ffc80a]';
  const textPrimary = 'text-[#2c2c2c]';
  const textAlt = 'text-[#ada7bb]';
  const bgLight = 'bg-[#ffffff]';

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR EN HAUT */}
      <header className={`flex justify-between items-center px-6 py-3 shadow ${bgPrimary}`}>
        <nav className="flex space-x-6">
          <button onClick={() => setSection('reservations')} className={`${textPrimary} hover:underline`}>Avantages</button>
          <button onClick={() => setSection('history')} className={`${textPrimary} hover:underline`}>Infos & Guide d'achat</button>
          <button onClick={() => setSection('profile')} className={`${textPrimary} hover:underline`}>Contactez-nous</button>
        </nav>
        <button
          onClick={logout}
          className={`${bgLight} ${textPrimary} px-4 py-1 rounded hover:bg-[#ada7bb] transition`}
        >
          Déconnexion
        </button>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR À GAUCHE */}
        <aside className="w-56 p-4" style={{ backgroundColor: '#2c2c2c' }}>
          <button
            onClick={() => { setSection('reservations'); setShowForm(false); }}
            className={`${textAlt} block w-full text-left mb-2 hover:text-white`}
          >
            Mes Réservations
          </button>
          <button
            onClick={() => setSection('history')}
            className={`${textAlt} block w-full text-left mb-2 hover:text-white`}
          >
            Historique Transactions
          </button>
          <button
            onClick={() => setSection('profile')}
            className={`${textAlt} block w-full text-left mb-2 hover:text-white`}
          >
            Info Perso
          </button>
          <button
            onClick={() => setSection('address')}
            className={`${textAlt} block w-full text-left mb-2 hover:text-white`}
          >
            Adresse
          </button>
          <button
            onClick={() => setSection('security')}
            className={`${textAlt} block w-full text-left hover:text-white`}
          >
            Sécurités
          </button>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 p-6 overflow-auto">
          {/* MES RÉSERVATIONS */}
          {section === 'reservations' && (
            <>
              {!showForm ? (
                <button
                  onClick={() => { setShowForm(true); setStep(1); }}
                  className={`${bgPrimary} ${textPrimary} px-6 py-3 rounded shadow hover:opacity-90 transition`}
                >
                  Réserver une consigne
                </button>
              ) : (
                <div className={`${bgLight} p-6 rounded-lg shadow max-w-3xl mx-auto`}>
                  {/* Barre de progression */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                    <div
                      className="bg-[#2c2c2c] h-2 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Étape 1 : Sélection Trajet */}
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Étape 1 : Sélection Trajet</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block mb-1">Aéroport de départ</label>
                          <select className="w-full border rounded p-2">
                            <option>TNR</option>
                            <option>MDG</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Aéroport d’arrivée</label>
                          <select className="w-full border rounded p-2">
                            <option>CDG</option>
                            <option>ORY</option>
                          </select>
                        </div>
                        <div>
                          <p>Distance estimée : 8 000 km</p>
                          <p>Prix : 120 €</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 2 : Détails Bagages */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Étape 2 : Détails Bagages</h3>
                      <button className="mb-4 text-blue-600 hover:underline">+ Ajouter bagage</button>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <label className="block mb-1">Type</label>
                          <select className="w-full border rounded p-2">
                            <option>Valise</option>
                            <option>Sac</option>
                            <option>Carton</option>
                          </select>

                          <label className="block mt-3 mb-1">Dimensions (L x l x H)</label>
                          <input type="text" className="w-full border rounded p-2" placeholder="50x30x20 cm" />

                          <label className="block mt-3 mb-1">Poids</label>
                          <input type="range" min="0" max="50" className="w-full" />

                          <label className="block mt-3 mb-1">Photo</label>
                          <input type="file" className="w-full" />

                          <div className="mt-3 space-x-4">
                            <label><input type="checkbox" /> Fragile</label>
                            <label><input type="checkbox" /> Valeur déclarée</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 3 : Créneaux Horaires */}
                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Étape 3 : Créneaux Horaires</h3>
                      <div className="space-y-4">
                        <div>
                          <label>Collecte (Madagascar)</label>
                          <input type="date" className="w-full border rounded p-2" />
                        </div>
                        <div>
                          <label>Livraison (France)</label>
                          <input type="date" className="w-full border rounded p-2" />
                        </div>
                        <div>
                          <label>Heure</label>
                          <select className="w-full border rounded p-2">
                            <option>08:00</option>
                            <option>12:00</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 4 : Coordonnées */}
                  {step === 4 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Étape 4 : Coordonnées</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Adresse précise collecte"
                          className="w-full border rounded p-2"
                        />
                        <input
                          type="text"
                          placeholder="Adresse livraison France"
                          className="w-full border rounded p-2"
                        />
                        <input
                          type="text"
                          placeholder="Contact d'urgence"
                          className="w-full border rounded p-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Étape 5 : Paiement */}
                  {step === 5 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Étape 5 : Paiement</h3>
                      <div className="space-y-4">
                        <p>Récapitulatif détaillé ici…</p>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg mb-2">
                          Payer par carte (Stripe)
                        </button>
                        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg mb-2">
                          Mobile Money
                        </button>
                        <button className="w-full bg-gray-700 text-white py-2 rounded-lg">
                          Virement
                        </button>
                        <label className="flex items-center space-x-2 mt-4">
                          <input type="checkbox" />
                          <span>Ajouter Assurance bagage</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Boutons Précédent / Suivant / Terminer */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={back}
                      disabled={step === 1}
                      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                      ← Précédent
                    </button>
                    {step < 5 ? (
                      <button
                        onClick={next}
                        className={`${bgPrimary} ${textPrimary} px-4 py-2 rounded`}
                      >
                        Suivant →
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('Réservation terminée !')}
                        className={`${bgPrimary} ${textPrimary} px-4 py-2 rounded`}
                      >
                        Terminer
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* AUTRES SECTIONS */}
          {section === 'history' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Historique de transactions</h2>
            </div>
          )}
          {section === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Informations personnelles</h2>
            </div>
          )}
          {section === 'address' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Mes adresses</h2>
            </div>
          )}
          {section === 'security' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Paramètres de sécurité</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

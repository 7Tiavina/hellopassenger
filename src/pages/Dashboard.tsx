// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../main';

type Step =
  | 1
  | 2
  | 3
  | 4
  | 5;

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>(1);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const next = () => setStep(prev => (prev < 5 ? (prev + 1) as Step : prev));
  const back = () => setStep(prev => (prev > 1 ? (prev - 1) as Step : prev));

  // Progress en % selon l'étape
  const progress = (step - 1) * 25;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <button className="text-gray-700 hover:text-gray-900">Configurer</button>
          <button className="text-gray-700 hover:text-gray-900">Mon compte</button>
          <button className="text-gray-700 hover:text-gray-900">Mes réservations</button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </nav>

      <main className="p-6">
        {/* Bouton pour ouvrir le formulaire */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Réserver une consigne
          </button>
        )}

        {/* LE FORMULAIRE EN 5 ÉTAPES */}
        {showForm && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
            {/* BARRE DE PROGRESSION */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-blue-600 h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Contenu de l'étape */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Étape 1 : Sélection Trajet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Aéroport de départ</label>
                    <select className="w-full border rounded p-2">
                      <option>TNR</option>
                      <option>MDG</option>
                      {/* … */}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Aéroport d’arrivée</label>
                    <select className="w-full border rounded p-2">
                      <option>CDG</option>
                      <option>ORY</option>
                      {/* … */}
                    </select>
                  </div>
                  <div>
                    <p>Distance estimée : 8 000 km</p>
                    <p>Prix : 120 €</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Étape 2 : Détails Bagages</h3>
                <button className="mb-4 text-blue-600 hover:underline">+ Ajouter bagage</button>
                {/* Ici, tu pourras mapper sur un tableau de bagages */}
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <label className="block mb-1">Type</label>
                    <select className="w-full border rounded p-2">
                      <option>Valise</option>
                      <option>Sac</option>
                      <option>Carton</option>
                    </select>

                    <label className="block mt-3 mb-1">Dimensions (L x l x H)</label>
                    <input type="text" className="w-full border rounded p-2" placeholder="50x30x20 cm" />

                    <label className="block mt-3 mb-1">Poids</label>
                    <input type="range" min="0" max="50" className="w-full" />

                    <label className="block mt-3 mb-1">Photo</label>
                    <input type="file" className="w-full" />

                    <div className="mt-3 space-x-4">
                      <label>
                        <input type="checkbox" /> Fragile
                      </label>
                      <label>
                        <input type="checkbox" /> Valeur déclarée
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      {/* … */}
                    </select>
                  </div>
                </div>
              </div>
            )}

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

            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Étape 5 : Paiement</h3>
                <div className="space-y-4">
                  <div>
                    <p>Récapitulatif détaillé ici…</p>
                  </div>
                  <div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg mb-2">
                      Payer par carte (Stripe)
                    </button>
                    <button className="w-full bg-yellow-500 text-white py-2 rounded-lg mb-2">
                      Mobile Money
                    </button>
                    <button className="w-full bg-gray-700 text-white py-2 rounded-lg">
                      Virement
                    </button>
                  </div>
                  <label className="flex items-center space-x-2 mt-4">
                    <input type="checkbox" />
                    <span>Ajouter Assurance bagage</span>
                  </label>
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={back}
                disabled={step === 1}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                ← Précédent
              </button>
              {step < 5 ? (
                <button
                  onClick={next}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={() => alert('Paiement effectué !')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Terminer
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

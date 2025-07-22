import React, { useState } from 'react';

const bgPrimary = 'bg-[#ffc80a]';
const textPrimary = 'text-[#2c2c2c]';
const bgLight = 'bg-[#ffffff]';

export default function ReservationForm() {
  const [step, setStep] = useState<1|2|3|4|5>(1);
  const progress = (step - 1) * 25;
  const next = () => setStep(s => (s < 5 ? (s + 1) as any : s));
  const back = () => setStep(s => (s > 1 ? (s - 1) as any : s));

  return (
    <div className={`${bgLight} p-6 rounded-lg shadow max-w-3xl mx-auto`}>
      {/* barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-[#2c2c2c] h-2 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* étapes */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 1 : Sélection Trajet</h3>
          <label className="block mb-1">Aéroport de départ</label>
          <select className="w-full border rounded p-2 mb-4">
            <option>TNR</option><option>MDG</option>
          </select>
          <label className="block mb-1">Aéroport d’arrivée</label>
          <select className="w-full border rounded p-2 mb-4">
            <option>CDG</option><option>ORY</option>
          </select>
          <p>Distance estimée : 8 000 km</p>
          <p>Prix : 120 €</p>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 2 : Détails Bagages</h3>
          <button className="mb-4 text-blue-600 hover:underline">+ Ajouter bagage</button>
          <div className="border rounded p-4">
            <label className="block mb-1">Type</label>
            <select className="w-full border rounded p-2 mb-3">
              <option>Valise</option><option>Sac</option><option>Carton</option>
            </select>
            <label className="block mb-1">Dimensions (L x l x H)</label>
            <input type="text" className="w-full border rounded p-2 mb-3" placeholder="50x30x20 cm" />
            <label className="block mb-1">Poids</label>
            <input type="range" min="0" max="50" className="w-full mb-3" />
            <label className="block mb-1">Photo</label>
            <input type="file" className="w-full mb-3" />
            <div className="space-x-4">
              <label><input type="checkbox" /> Fragile</label>
              <label><input type="checkbox" /> Valeur déclarée</label>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 3 : Créneaux Horaires</h3>
          <label className="block mb-1">Collecte (Madagascar)</label>
          <input type="date" className="w-full border rounded p-2 mb-3" />
          <label className="block mb-1">Livraison (France)</label>
          <input type="date" className="w-full border rounded p-2 mb-3" />
          <label className="block mb-1">Heure</label>
          <select className="w-full border rounded p-2">
            <option>08:00</option><option>12:00</option>
          </select>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 4 : Coordonnées</h3>
          <input type="text" placeholder="Adresse collecte" className="w-full border rounded p-2 mb-3" />
          <input type="text" placeholder="Adresse livraison" className="w-full border rounded p-2 mb-3" />
          <input type="text" placeholder="Contact d'urgence" className="w-full border rounded p-2" />
        </div>
      )}
      {step === 5 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 5 : Paiement</h3>
          <p className="mb-4">Récapitulatif détaillé ici…</p>
          <button className="w-full bg-green-600 text-white py-2 rounded mb-2">Carte (Stripe)</button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded mb-2">Mobile Money</button>
          <button className="w-full bg-gray-700 text-white py-2 rounded">Virement</button>
          <label className="flex items-center space-x-2 mt-4">
            <input type="checkbox" /> Ajouter Assurance
          </label>
        </div>
      )}

      {/* navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ← Précédent
        </button>
        {step < 5 ? (
          <button onClick={next} className={`${bgPrimary} ${textPrimary} px-4 py-2 rounded`}>
            Suivant →
          </button>
        ) : (
          <button onClick={() => alert('Terminé !')} className={`${bgPrimary} ${textPrimary} px-4 py-2 rounded`}>
            Terminer
          </button>
        )}
      </div>
    </div>
  );
}

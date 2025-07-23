// src/components/reservations/ReservationForm.tsx
import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

// 1️⃣ Type exporté pour Dashboard.tsx
export type ReservationData = {
  departure: string;
  arrival: string;
  collectDate: string;
  deliverDate: string;
  status: string;         // ex: “En cours”, “Terminé”
  ref?: string;           // ← ajouté pour identifier chaque réservation
};

type Props = {
  onComplete: (data: ReservationData) => void
}

export default function ReservationForm({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [showQR, setShowQR] = useState(false)                // ← placé ici

  // Données du formulaire
  const [departure, setDeparture] = useState('TNR')
  const [arrival, setArrival] = useState('CDG')
  const [collectDate, setCollectDate] = useState('')
  const [deliverDate, setDeliverDate] = useState('')
  const [baggages, setBaggages] = useState<
    { type: string; dims: string; weight: number; fragile: boolean; insured: boolean }[]
  >([])
  const [status] = useState('En cours')

  // Progression et navigation
  const progress = (step - 1) * 25
  const next = () => setStep((s) => (s < 5 ? (s + 1) as any : s))
  const back = () => setStep((s) => (s > 1 ? (s - 1) as any : s))

  // Gestion des bagages
  const addBaggage = () => {
    setBaggages((b) => [...b, { type: 'Valise', dims: '', weight: 0, fragile: false, insured: false }])
  }
  const updateBaggage = (i: number, field: string, value: any) => {
    setBaggages((b) => b.map((bag, idx) => (idx === i ? { ...bag, [field]: value } : bag)))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-[#2c2c2c] h-2 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Étapes 1 à 4 (inchangées) */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 1 : Sélection Trajet</h3>
          <label className="block mb-1">Aéroport de départ</label>
          <select
            className="w-full border rounded p-2 mb-4"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          >
            <option>TNR</option>
            <option>MDG</option>
          </select>
          <label className="block mb-1">Aéroport d’arrivée</label>
          <select
            className="w-full border rounded p-2"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          >
            <option>CDG</option>
            <option>ORY</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 2 : Détails Bagages</h3>
          <button onClick={addBaggage} className="mb-4 text-blue-600 hover:underline">
            + Ajouter bagage
          </button>
          <div className="space-y-4">
            {baggages.map((bag, i) => (
              <div key={i} className="border rounded p-4">
                <label className="block mb-1">Type</label>
                <select
                  className="w-full border rounded p-2 mb-3"
                  value={bag.type}
                  onChange={(e) => updateBaggage(i, 'type', e.target.value)}
                >
                  <option>Valise</option>
                  <option>Sac</option>
                  <option>Carton</option>
                </select>
                <label className="block mb-1">Dimensions (L x l x H)</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-3"
                  placeholder="50x30x20 cm"
                  value={bag.dims}
                  onChange={(e) => updateBaggage(i, 'dims', e.target.value)}
                />
                <label className="block mb-1">Poids</label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  className="w-full mb-3"
                  value={bag.weight}
                  onChange={(e) => updateBaggage(i, 'weight', Number(e.target.value))}
                />
                <label className="block mb-1">Photo</label>
                <input type="file" className="w-full mb-3" />
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={bag.fragile}
                      onChange={(e) => updateBaggage(i, 'fragile', e.target.checked)}
                    />
                    Fragile
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={bag.insured}
                      onChange={(e) => updateBaggage(i, 'insured', e.target.checked)}
                    />
                    Valeur déclarée
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 3 : Créneaux Horaires</h3>
          <label className="block mb-1">Collecte (Madagascar)</label>
          <input
            type="date"
            className="w-full border rounded p-2 mb-4"
            value={collectDate}
            onChange={(e) => setCollectDate(e.target.value)}
          />
          <label className="block mb-1">Livraison (France)</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={deliverDate}
            onChange={(e) => setDeliverDate(e.target.value)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 4 : Coordonnées</h3>
          <input
            type="text"
            placeholder="Adresse précise collecte"
            className="w-full border rounded p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Adresse livraison France"
            className="w-full border rounded p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Contact d'urgence"
            className="w-full border rounded p-2"
          />
        </div>
      )}

      {/* Étape 5 : Paiement + QR */}
      {step === 5 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Étape 5 : Paiement</h3>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg mb-2">
            Payer par carte (Stripe)
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-lg mb-2">
            Mobile Money
          </button>
          <button className="w-full bg-gray-700 text-white py-2 rounded-lg mb-4">
            Virement
          </button>
          <label className="flex items-center space-x-2 mb-6">
            <input type="checkbox" /> Ajouter Assurance bagage
          </label>

          {/* Bouton Terminer */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                onComplete({ departure, arrival, collectDate, deliverDate, status })
                setShowQR(true)               // ← seul bouton Terminer
              }}
              className="bg-[#ffc80a] text-[#2c2c2c] px-4 py-2 rounded"
            >
              Terminer
            </button>
          </div>

          {/* QR Code après validation */}
          {showQR && (
            <div className="flex justify-center mt-6">
              <QRCodeCanvas
                value={JSON.stringify({
                  departure,
                  arrival,
                  collectDate,
                  deliverDate,
                  status,
                })}
                size={180}
                bgColor="#ffffff"
                fgColor="#2c2c2c"
                level="H"
                includeMargin
              />
            </div>
          )}
        </div>
      )}

      {/* Barre de navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ← Précédent
        </button>
        {step < 5 && (
          <button
            onClick={next}
            className="bg-[#ffc80a] text-[#2c2c2c] px-4 py-2 rounded"
          >
            Suivant →
          </button>
        )}
      </div>
    </div>
  )
}

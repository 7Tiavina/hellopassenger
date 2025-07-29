// src/components/reservations/ReservationForm.tsx
import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'

type Props = {
  onDone: () => void
}

export default function ReservationForm({ onDone }: Props) {
  const navigate = useNavigate()

  // Étapes du formulaire (1 → 5)
  const [step, setStep] = useState<1|2|3|4|5>(1)
  const progress = (step - 1) * 25

  // Données
  const [departure, setDeparture] = useState('TNR')
  const [arrival, setArrival] = useState('CDG')
  const [collectDate, setCollectDate] = useState('')
  const [deliverDate, setDeliverDate] = useState('')
  const [status, setStatus] = useState('en_attente')

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [showQR, setShowQR] = useState(false)
  const [reservationRef, setReservationRef] = useState<string>('')

  const next = () => setStep(s => (s < 5 ? (s + 1) as any : s))
  const back = () => setStep(s => (s > 1 ? (s - 1) as any : s))

  const handleSubmit = async () => {
    // 1️⃣ Validation client
    if (!collectDate || !deliverDate) {
      setError('Les dates de collecte et de livraison sont obligatoires.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          departure,
          arrival,
          collect_date: collectDate,
          deliver_date: deliverDate,
          status,
        }),
      })
      const json = await res.json()

      // 2️⃣ Gestion erreurs 422 Laravel
      if (res.status === 422 && json.errors) {
        const msgs = Object.values(json.errors).flat().join(' ')
        throw new Error(msgs)
      }

      // 3️⃣ Vérifie succès général
      if (!json.success) {
        throw new Error(json.message || 'Erreur interne API')
      }

      // 4️⃣ Récupère la référence renvoyée
      const payload = (json as any).reservation ?? (json as any).data
      if (!payload || !payload.ref) {
        throw new Error('Réponse API invalide: pas de référence')
      }
      setReservationRef(payload.ref)
      setStatus(payload.status || status)
      setShowQR(true)

      // 5️⃣ Redirection vers /dashboard
     navigate('/dashboard?section=reservations')
     onDone()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Impossible de créer la réservation.')
    } finally {
      setLoading(false)
    }
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

      {/* Étapes */}
      {step === 1 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Étape 1 : Trajet</h3>
          <select
            className="w-full border rounded p-2 mb-4"
            value={departure}
            onChange={e => setDeparture(e.target.value)}
          >
            <option>TNR</option>
            <option>MDG</option>
          </select>
          <select
            className="w-full border rounded p-2"
            value={arrival}
            onChange={e => setArrival(e.target.value)}
          >
            <option>CDG</option>
            <option>ORY</option>
          </select>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Étape 2 : Bagages</h3>
          <p className="italic text-gray-500">(À implémenter si besoin)</p>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Étape 3 : Horaires</h3>
          <label className="block mb-1">Collecte</label>
          <input
            type="date"
            className="w-full border rounded p-2 mb-4"
            value={collectDate}
            onChange={e => setCollectDate(e.target.value)}
          />
          <label className="block mb-1">Livraison</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={deliverDate}
            onChange={e => setDeliverDate(e.target.value)}
          />
        </>
      )}

      {step === 4 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Étape 4 : Coordonnées</h3>
          <p className="italic text-gray-500">(À implémenter si besoin)</p>
        </>
      )}

      {step === 5 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Étape 5 : Paiement</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#ffc80a] text-[#2c2c2c] py-2 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50"
          >
            {loading ? 'Chargement…' : 'Terminer et générer QR'}
          </button>

          {showQR && (
            <div className="mt-6 flex flex-col items-center space-y-4">
              <p className="font-medium">Réf : {reservationRef}</p>
              <QRCodeCanvas
                value={JSON.stringify({
                  ref: reservationRef,
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
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          disabled={step === 1 || loading}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ← Précédent
        </button>
        {step < 5 && (
          <button
            onClick={() => {
              setError('')
              next()
            }}
            disabled={loading}
            className="bg-[#ffc80a] text-[#2c2c2c] px-4 py-2 rounded hover:bg-yellow-500 disabled:opacity-50"
          >
            Suivant →
          </button>
        )}
      </div>
    </div>
  )
}

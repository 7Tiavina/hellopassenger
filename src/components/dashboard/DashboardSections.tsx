// src/components/dashboard/DashboardSections.tsx
import React, { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export type ReservationData = {
  id: number
  departure: string
  arrival: string
  collect_date: string
  deliver_date: string
  status: string
  ref?: string
}

export function HistorySection() {
  const [reservations, setReservations] = useState<ReservationData[]>([])
  const [selected, setSelected] = useState<ReservationData | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 6
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/reservations')
      .then((res) => res.json())
      .then((json) => {
        const list = json.data as ReservationData[]
        const mapped = list.map((r, i) => ({
          ...r,
          ref: r.ref ?? `CNG-${1000 + i}`,
          status: r.status ?? 'En cours',
        }))
        setReservations(mapped)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Erreur lors du chargement des réservations.')
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(reservations.length / perPage)
  const start = (page - 1) * perPage
  const paginated = reservations.slice(start, start + perPage)

  if (loading) {
    return <p className="text-center text-gray-500">Chargement en cours…</p>
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }
  if (reservations.length === 0) {
    return <p className="text-center text-gray-500">Aucune réservation pour le moment.</p>
  }

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="text-blue-600 hover:underline"
        >
          ← Retour à l'historique
        </button>

        <h2 className="text-2xl font-bold">
          Détails de la consigne {selected.ref}
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Trajet :</strong> {selected.departure} → {selected.arrival}
          </p>
          <p>
            <strong>Collecte :</strong> {selected.collect_date}
          </p>
          <p>
            <strong>Livraison :</strong> {selected.deliver_date}
          </p>
          <p>
            <strong>Statut :</strong> {selected.status}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <QRCodeCanvas
            value={JSON.stringify(selected)}
            size={200}
            bgColor="#ffffff"
            fgColor="#2c2c2c"
            level="H"
            includeMargin
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Historique de transactions</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((r, idx) => {
          const i = start + idx
          const ref = r.ref ?? `CNG-${1000 + i}`
          const statusColor =
            r.status === 'Terminé'
              ? 'bg-green-100 text-green-800'
              : r.status === 'En cours'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'

          return (
            <div
              key={ref}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <img
                src="/bag-placeholder.png"
                alt="Consigne"
                className="h-32 w-full object-cover rounded-md mb-4"
              />

              <div className="mb-3">
                <p className="text-sm text-gray-500">
                  Réf. : <span className="font-medium">{ref}</span>
                </p>
                <h3 className="text-lg font-semibold text-[#2c2c2c]">
                  {r.departure} → {r.arrival}
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                Collecte : {r.collect_date}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Livraison : {r.deliver_date}
              </p>

              <span
                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor}`}
              >
                {r.status}
              </span>

              <button
                onClick={() => setSelected(r)}
                className="mt-4 block w-full bg-[#ffc80a] text-[#2c2c2c] py-2 rounded hover:bg-yellow-500 transition"
              >
                Suivre
              </button>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-3 py-1 rounded ${
                n === page ? 'bg-[#ffc80a] text-white' : 'bg-gray-100'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export function ProfileSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Informations personnelles</h2>
      {/* … contenu à venir … */}
    </div>
  )
}

export function AddressSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mes adresses</h2>
      {/* … contenu à venir … */}
    </div>
  )
}

export function SecuritySection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Paramètres de sécurité</h2>
      {/* … contenu à venir … */}
    </div>
  )
}

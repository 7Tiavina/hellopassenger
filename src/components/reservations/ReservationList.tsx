// src/components/reservations/ReservationList.tsx
import React, { useState, useEffect } from 'react'

export type ReservationData = {
  id: number
  ref: string
  departure: string
  arrival: string
  collect_date: string
  deliver_date: string
  status: string
}

export default function ReservationList() {
  const [reservations, setReservations] = useState<ReservationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:8000/api/reservations')
      .then(res => res.json())
      .then(json => {
        const list = json.data as any[]
        const mapped = list.map(r => ({
          id: r.id,
          ref: r.ref,
          departure: r.departure,
          arrival: r.arrival,
          collect_date: r.collect_date,
          deliver_date: r.deliver_date,
          status: r.status ?? 'En cours',
        }))
        setReservations(mapped)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Impossible de charger les réservations.')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des réservations…</p>
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }
  if (reservations.length === 0) {
    return <p className="text-center text-gray-500">Aucune réservation trouvée.</p>
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-[#ada7bb] text-[#2c2c2c]">
          <tr>
            <th className="px-4 py-2 border">Réf.</th>
            <th className="px-4 py-2 border">Départ</th>
            <th className="px-4 py-2 border">Arrivée</th>
            <th className="px-4 py-2 border">Collecte</th>
            <th className="px-4 py-2 border">Livraison</th>
            <th className="px-4 py-2 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r, i) => (
            <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className="px-4 py-2 border">{r.ref}</td>
              <td className="px-4 py-2 border">{r.departure}</td>
              <td className="px-4 py-2 border">{r.arrival}</td>
              <td className="px-4 py-2 border">{r.collect_date}</td>
              <td className="px-4 py-2 border">{r.deliver_date}</td>
              <td className="px-4 py-2 border">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

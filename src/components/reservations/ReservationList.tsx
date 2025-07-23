// src/components/reservations/ReservationList.tsx
import type { ReservationData } from './ReservationForm';

type Props = {
  reservations: ReservationData[];
};

export default function ReservationList({ reservations }: Props) {
  return (
    <table className="min-w-full mt-6 border">
      <thead className="bg-[#ada7bb] text-[#2c2c2c]">
        <tr>
          <th className="px-4 py-2 border">Départ</th>
          <th className="px-4 py-2 border">Arrivée</th>
          <th className="px-4 py-2 border">Collecte</th>
          <th className="px-4 py-2 border">Livraison</th>
          <th className="px-4 py-2 border">Statut</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((r, i) => (
          <tr key={i} className="odd:bg-white even:bg-gray-100">
            <td className="px-4 py-2 border">{r.departure}</td>
            <td className="px-4 py-2 border">{r.arrival}</td>
            <td className="px-4 py-2 border">{r.collectDate}</td>
            <td className="px-4 py-2 border">{r.deliverDate}</td>
            <td className="px-4 py-2 border">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

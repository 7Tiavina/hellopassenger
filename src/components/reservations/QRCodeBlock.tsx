// src/components/reservations/QRCodeBlock.tsx
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { ReservationData } from './ReservationForm';

type Props = {
data: ReservationData;
index: number;
};

export default function QRCodeBlock(props: Props) {
const { data, index } = props;
const ref = `CNG-${1000 + index}`;
const qrValue = JSON.stringify({
ref,
from: data.departure,
to: data.arrival,
status: data.status,
collect: data.collectDate,
deliver: data.deliverDate,
});

return (
<div className="mt-6 p-4 bg-white border rounded shadow text-center">
<p className="text-sm mb-2">QR Code de votre réservation</p>
<QRCodeCanvas value={qrValue} size={160} />
<p className="text-xs text-gray-500 mt-2">{ref}</p>
</div>
);
}


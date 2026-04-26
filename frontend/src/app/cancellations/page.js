export default function Cancellations() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Cancellations & Refunds</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed font-medium">
         <p className="mb-4">YatraMind strives to provide a hassle-free cancellation process. Please review our policies below:</p>
         <ul className="list-disc pl-6 space-y-2">
            <li><strong>Flights:</strong> Standard airline cancellation fees apply. YatraMind processing fee of ₹300 per passenger.</li>
            <li><strong>Hotels:</strong> Free cancellation up to 48 hours prior to check-in for eligible properties.</li>
            <li><strong>Buses & Trains:</strong> Refund logic follows primary vendor routing. Non-refundable convenience fees apply.</li>
         </ul>
         <p className="mt-6 text-sm text-gray-500">Refunds are typically processed to your original payment method within 5-7 business days.</p>
      </div>
    </div>
  );
}

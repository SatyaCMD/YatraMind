export default function FAQs() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6 mt-8">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800">How do I cancel my booking?</h3>
            <p className="text-gray-600 mt-2">You can cancel your booking directly from your user dashboard by navigating to the "Bookings" tab and selecting the cancel option.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800">How does Yatra AI work?</h3>
            <p className="text-gray-600 mt-2">Yatra AI safely analyzes millions of travel points to summarize your perfect itinerary seamlessly.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800">Is my payment secure?</h3>
            <p className="text-gray-600 mt-2">Yes! We use highly encrypted SSL connections matching standard banking practices.</p>
         </div>
      </div>
    </div>
  );
}

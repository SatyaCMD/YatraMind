export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed space-y-4">
         <p>Your privacy is important to us. This Privacy Policy clarifies how YatraMind collects, processes, and protects your personal data.</p>
         <h3 className="text-xl font-bold text-gray-900 pt-4">Data Collection</h3>
         <p>We collect essential booking information including legal names, emails, and contact details to fulfill your requested itineraries.</p>
         <h3 className="text-xl font-bold text-gray-900 pt-4">AI Processing</h3>
         <p>Queries passed to the Yatra AI assistant are completely anonymous and only utilized to return contextual itinerary information.</p>
         <h3 className="text-xl font-bold text-gray-900 pt-4">Data Security</h3>
         <p>We implement technical and organizational security measures to safeguard your stored profiles securely within MongoDB environments.</p>
      </div>
    </div>
  );
}

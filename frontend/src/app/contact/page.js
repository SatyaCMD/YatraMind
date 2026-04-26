export default function ContactUs() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">We are available 24/7. Reach out to the YatraMind support team below.</p>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <form className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
             <input type="text" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
             <input type="email" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
             <textarea rows="5" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500"></textarea>
           </div>
           <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition">Send Message</button>
         </form>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-bold text-2xl tracking-tight text-white mb-4 block hover:text-blue-400 transition">YatraMind</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered intelligent travel companion. We help you explore the world with personalized insights, seamless bookings, and 24/7 smart assistance.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">Bookings</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition">Flights</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Hotels</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Trains & Buses</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Holiday Packages</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition">FAQs</a></li>
              <li><a href="/cancellations" className="hover:text-blue-400 transition">Cancellations</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
             <h3 className="font-bold text-lg mb-4 text-gray-200">Get the App</h3>
             <p className="text-gray-400 text-sm mb-4">Download YatraMind for the best booking experience.</p>
             <div className="flex flex-col gap-3">
               <a href="https://play.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition px-4 py-2.5 rounded-xl border border-gray-700">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-5 h-5" alt="Google Play" />
                 <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 leading-none">GET IT ON</span>
                   <span className="text-sm font-bold text-white leading-tight">Google Play</span>
                 </div>
               </a>
               <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition px-4 py-2.5 rounded-xl border border-gray-700">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" className="w-5 h-5" alt="App Store" />
                 <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 leading-none">Download on the</span>
                   <span className="text-sm font-bold text-white leading-tight">App Store</span>
                 </div>
               </a>
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} YatraMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

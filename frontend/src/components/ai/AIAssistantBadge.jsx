'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Sparkles, X, MapPin, IndianRupee, DollarSign, Clock, Loader2, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AIAssistantBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const pathname = usePathname();

  const handleGenerateItinerary = async () => {
    if (!aiQuery) return;
    setAiLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/plan', { query: aiQuery });
      setAiData(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'AI generation failed due to a server error. Please try again.');
    }
    setAiLoading(false);
  };

  const isHiddenPage = ['/login', '/signup', '/verify', '/admin'].includes(pathname);
  if (isHiddenPage) return null;

  return (
    <>
      {/* Floating AI Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full p-4 shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-1 transition duration-300 flex items-center gap-3 overflow-hidden group"
      >
        <Sparkles className="w-6 h-6 animate-pulse text-yellow-300" />
        <span className="font-bold tracking-wide mr-2 group-hover:block transition-all hidden md:block">Yatra AI</span>
      </button>

      {/* AI Chat Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-end sm:justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ y: 200, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
               {/* Header */}
               <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white flex justify-between items-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                 <div className="flex items-center gap-3 z-10">
                   <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                     <Sparkles className="w-6 h-6 text-yellow-300" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg leading-tight">Yatra AI Assistant</h3>
                     <p className="text-xs text-indigo-100 opacity-90">Your personal travel architect</p>
                   </div>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="z-10 bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               {/* Chat Body */}
               <div className="flex-1 overflow-y-auto p-6 bg-slate-50 relative">
                 {!aiData ? (
                   <div className="flex flex-col items-center justify-center text-center h-full text-gray-500 py-12">
                     <Sparkles className="w-12 h-12 text-indigo-200 mb-4" />
                     <p className="font-medium text-lg text-gray-600 mb-2">Too busy to plan?</p>
                     <p className="text-sm">Just tell me what you want.<br/><br/>
                     <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-indigo-200" onClick={() => setAiQuery("Plan a 3-day trip to Goa under ₹15,000 for a couple")}>"Plan a 3-day trip to Goa under ₹15,000"</span>
                     </p>
                   </div>
                 ) : (
                   <div className="space-y-6">
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-50">
                         <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
                           <MapPin className="text-blue-500 w-5 h-5" /> Destination: {aiData.location}
                         </h3>
                         <div className="flex gap-4 mt-3">
                            <span className="flex items-center gap-1 bg-violet-50 px-3 py-1 rounded-lg text-violet-700 text-sm font-semibold">
                               {aiData.currencySymbol === '$' ? <DollarSign className="w-4 h-4"/> : <IndianRupee className="w-4 h-4"/>} 
                               {aiData.budget || "-"}
                            </span>
                            <span className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-lg text-indigo-700 text-sm font-semibold"><Clock className="w-4 h-4"/> {aiData.duration || "5 days"}</span>
                         </div>
                      </div>

                      {aiData.lowestPrices && (
                         <div>
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-500" /> Lowest Available Prices</h4>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Flight</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.flight}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Train</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.train}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Bus</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.bus}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Cab</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.cab}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Hotel</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.hotel}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
                                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Villa</p>
                                   <p className="text-indigo-600 font-black">{aiData.currencySymbol || '₹'}{aiData.lowestPrices.villa}</p>
                                </div>
                            </div>
                         </div>
                      )}

                      <div>
                         <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-500" /> Itinerary</h4>
                         <div className="space-y-4">
                           {aiData.itinerary?.map((item, idx) => (
                             <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl shadow-sm">
                               <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                                 {item.day}
                               </div>
                               <div>
                                 <h5 className="font-bold text-gray-900 text-sm">{item.title}</h5>
                                 <p className="text-gray-600 text-xs mt-1 leading-relaxed">{item.description}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                      </div>

                      {aiData.recommendedHotels?.length > 0 && (
                        <div>
                         <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Top Hotel Stays</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {aiData.recommendedHotels.map((hotel, idx) => (
                             <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:border-indigo-200 transition">
                               <h5 className="font-bold text-gray-900 text-sm">{hotel.name}</h5>
                               <div className="flex justify-between items-center mt-2">
                                 <span className="text-indigo-600 font-bold text-sm">{aiData.currencySymbol || '₹'}{hotel.price}<span className="text-xs text-gray-400 font-normal">/nt</span></span>
                                 <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">★ {hotel.rating}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                        </div>
                      )}
                   </div>
                 )}
               </div>

               {/* Input Area */}
               <div className="p-4 bg-white border-t border-gray-100">
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerateItinerary()}
                      placeholder="Ask Yatra AI something..." 
                      className="w-full bg-slate-100 px-5 py-4 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition text-sm text-gray-700"
                    />
                    <button 
                      onClick={handleGenerateItinerary}
                      disabled={aiLoading}
                      className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white w-10 rounded-xl flex items-center justify-center transition disabled:opacity-50"
                    >
                      {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
               </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

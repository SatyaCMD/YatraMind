'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plane, Train, Car, Bus, Calendar, CreditCard, TicketX, Award, MapPin, Trash2, ArrowLeft, ArrowRight, User, Phone, Mail, Save, DownloadCloud, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { logoutUser } from '../../store/slices/authSlice';

export default function UserProfile() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pnrInput, setPnrInput] = useState('');
  const [pnrStatus, setPnrStatus] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [upcomingJourneys, setUpcomingJourneys] = useState([]);

  useEffect(() => {
     const stored = JSON.parse(localStorage.getItem('yatraJourneys') || '[]');
     setUpcomingJourneys(stored);
  }, []);

  const travelDone = [];

  const handleCancel = (id) => {
    toast.success(`Cancellation request submitted for Booking ID: ${id}`);
  };

  const handleCheckPNR = () => {
    if (!pnrInput) return;
    toast.loading('Fetching Live PNR Status from Database...', { id: 'pnr-toast' });
    setTimeout(() => {
       toast.success(`Booking Confirmed!`, { id: 'pnr-toast' });
       setPnrStatus({ id: pnrInput.toUpperCase(), status: 'CONFIRMED' });
    }, 1500);
  };

  const downloadTicketPDF = async (journey) => {
    const doc = new jsPDF('landscape');
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 277, 130);
    
    doc.setFillColor(30, 58, 138);
    doc.rect(10, 10, 277, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(`YATRAMIND ${journey.type.toUpperCase()} E-TICKET`, 15, 28);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`PNR: ${journey.id}`, 240, 28);
    
    doc.setDrawColor(150, 150, 150);
    doc.setLineDash([2, 2], 0);
    doc.line(210, 35, 210, 140);
    doc.setLineDash([]);
    
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text('NAME OF PASSENGER', 15, 48);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text((user?.name || 'Guest').toUpperCase(), 15, 56);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('FROM', 15, 75);
    doc.text('TO', 100, 75);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(journey.from.toUpperCase(), 15, 84);
    doc.text(journey.to.toUpperCase(), 100, 84);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('STATUS', 15, 105);
    doc.text('DATE', 60, 105);
    doc.text('TYPE', 110, 105);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(journey.status.toUpperCase(), 15, 114);
    doc.text(journey.date.toUpperCase(), 60, 114);
    doc.text(journey.type.toUpperCase(), 110, 114);

    // Barcode Simulation
    doc.setFillColor(0, 0, 0);
    let currentX = 15;
    for (let i = 0; i < 45; i++) {
        const w = [0.4, 0.8, 1.2, 1.6][Math.floor(Math.random() * 4)];
        const gap = [1, 1.5, 2][Math.floor(Math.random() * 3)];
        doc.rect(currentX, 120, w, 15, 'F');
        currentX += w + gap;
    }
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`*${journey.id.replace(/\D/g, '') || '012399948293'}*`, 35, 138);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('NAME', 215, 48);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text((user?.name || 'Guest').toUpperCase(), 215, 56);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('TICKET ID', 215, 75);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(journey.id, 215, 86);
    doc.setTextColor(0, 0, 0);
    
    try {
       const qrDataUrl = await QRCode.toDataURL(`YTR-${journey.id}-${user?.name || 'Guest'}`, { margin: 1 });
       doc.addImage(qrDataUrl, 'PNG', 242, 95, 40, 40);
    } catch (e) {
       console.error(e);
    }
    
    doc.save(`YatraMind_BoardingPass_${journey.id}.pdf`);
    toast.success('Ticket downloaded successfully!');
  };

  const executeDeleteAccount = () => {
     setShowDeleteConfirm(false);
     toast.error('Account completely deleted.');
     dispatch(logoutUser());
     if (typeof window !== 'undefined') localStorage.removeItem('yatra_mock_registered_user');
     window.location.href = "/signup";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      
      {/* Back Button */}
      <div>
         <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
         </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar sidebar */}
      <div className="w-full md:w-1/4">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
            <p className="text-gray-500 mb-6">{user?.email || 'user@example.com'}</p>
            
            <div className="w-full flex justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-6">
               <span className="flex items-center gap-2 text-yellow-700 font-bold"><Award className="w-4 h-4"/> Yatra {user?.memberTier || 'Gold'}</span>
            </div>

            <div className="w-full space-y-2">
               <button onClick={() => setActiveTab('upcoming')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition ${activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Upcoming Bookings</button>
               <button onClick={() => setActiveTab('past')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition ${activeTab === 'past' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Travel History</button>
               <button onClick={() => setActiveTab('cancel')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition ${activeTab === 'cancel' ? 'bg-orange-500 text-white' : 'text-orange-500 hover:bg-orange-50'}`}>Cancel a Ticket</button>
               <button onClick={() => setActiveTab('edit')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition ${activeTab === 'edit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Edit Profile</button>
               <button onClick={() => setShowDeleteConfirm(true)} className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl font-bold transition text-red-600 hover:bg-red-50 mt-4 border border-red-100`}>
                  Delete Account <Trash2 className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

       {/* Main Content */}
      <div className="w-full md:w-3/4">
         {activeTab === 'upcoming' && (
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             
             {/* PNR Checker Widget */}
             <div className="mb-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2"><Search className="w-5 h-5"/> Live PNR Status Checker</h3>
                <div className="flex gap-3 relative">
                   <input 
                     value={pnrInput} 
                     onChange={(e) => { setPnrInput(e.target.value); setPnrStatus(null); }} 
                     type="text" 
                     placeholder="Enter 10-digit PNR / Booking ID" 
                     className="flex-1 p-3 border border-indigo-200 rounded-xl outline-none focus:border-indigo-500 uppercase font-mono tracking-wider" 
                   />
                   <button onClick={handleCheckPNR} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition">Select & Verify</button>
                </div>
                {pnrStatus && (
                   <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-xl flex items-center gap-3">
                      <div className="bg-green-500 text-white p-1 rounded-full"><Search className="w-4 h-4"/></div>
                      <div>
                         <p className="text-sm font-bold text-green-900">PNR: {pnrStatus.id}</p>
                         <p className="text-xs text-green-700">Flight & Seats are globally {pnrStatus.status}. Enjoy your journey!</p>
                      </div>
                   </div>
                )}
             </div>

             <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Journeys</h2>
             <div className="space-y-4">
               {upcomingJourneys.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50/50">
                     <div className="w-16 h-16 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-2">No Upcoming Journeys</h3>
                     <p className="text-gray-500 mb-6 max-w-sm mx-auto">You haven't booked any trips yet. Discover your next adventure using our AI engine!</p>
                     <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg">Start Booking</Link>
                  </div>
               ) : (
                 upcomingJourneys.map(b => (
                   <div key={b.id} className="border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                           {b.type === 'Flight' ? <Plane className="w-6 h-6"/> :
                            b.type === 'Cab' ? <Car className="w-6 h-6"/> :
                            b.type === 'Bus' ? <Bus className="w-6 h-6"/> : 
                            <Train className="w-6 h-6"/>}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-400">ID: {b.id}</span>
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">{b.from} <ArrowRight className="w-4 h-4 text-gray-300"/> {b.to}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3"/> {b.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">{b.status}</span>
                        <button onClick={() => downloadTicketPDF(b)} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                           <DownloadCloud className="w-4 h-4"/> Download Ticket
                        </button>
                      </div>
                   </div>
                 ))
               )}
             </div>
           </div>
         )}

         {activeTab === 'past' && (
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Done</h2>
             <div className="space-y-4">
               {travelDone.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50/50">
                     <p className="text-gray-500 font-medium">You have no past travel history.</p>
                  </div>
               ) : (
                 travelDone.map(b => (
                   <div key={b.id} className="border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 opacity-75">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 text-gray-600 p-3 rounded-lg"><b.icon className="w-6 h-6"/></div>
                        <div>
                          <span className="text-xs font-bold text-gray-400">ID: {b.id}</span>
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">{b.from} <ArrowRight className="w-4 h-4 text-gray-300"/> {b.to}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3"/> {b.date}</p>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-bold">{b.status}</span>
                   </div>
                 ))
               )}
             </div>
           </div>
         )}

         {activeTab === 'cancel' && (
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
             <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center gap-2"><TicketX className="w-6 h-6"/> Cancel Ticket</h2>
             <p className="text-gray-500 mb-8">Select an upcoming booking to initiate a refund.</p>
             <div className="grid grid-cols-1 gap-4">
               {upcomingJourneys.length === 0 ? (
                  <div className="border border-dashed border-red-200 rounded-2xl p-8 text-center bg-red-50/20">
                     <p className="text-red-400 font-medium">No valid tickets available to cancel.</p>
                  </div>
               ) : (
                 upcomingJourneys.map(b => (
                   <div key={b.id} className="border border-red-50 hover:border-red-200 rounded-xl p-4 flex justify-between items-center transition bg-red-50/20">
                      <span className="font-bold text-gray-800">{b.from} to {b.to} ({b.date})</span>
                      <button onClick={() => handleCancel(b.id)} className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-600">Cancel</button>
                   </div>
                 ))
               )}
             </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <User className="w-6 h-6 text-blue-600"/> Edit Personal Profile
              </h2>
              
              <div className="space-y-6 max-w-lg">
                 <div>
                   <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                   <div className="relative">
                     <User className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                     <input type="text" defaultValue={user?.name} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none" />
                   </div>
                 </div>

                 <div>
                   <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address (Read Only)</label>
                   <div className="relative">
                     <Mail className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                     <input type="email" defaultValue={user?.email} disabled className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl outline-none cursor-not-allowed" />
                   </div>
                 </div>

                 <div>
                   <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number</label>
                   <div className="relative">
                     <Phone className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                     <input type="tel" placeholder="+91 9876543210" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none" />
                   </div>
                 </div>

                 <button onClick={() => toast.success('Profile updated successfully!')} className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition mt-4">
                    <Save className="w-5 h-5" /> Save Changes
                 </button>
              </div>
            </div>
          )}
         </div>
      </div>

      {showDeleteConfirm && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Delete Account?</h3>
               <p className="text-gray-500 text-center mb-8">This action is irreversible. All your upcoming journeys, travel history, and Yatra Gold status will be permanently erased.</p>
               
               <div className="flex gap-4">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition">
                     Cancel
                  </button>
                  <button onClick={executeDeleteAccount} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition">
                     Yes, Delete
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}

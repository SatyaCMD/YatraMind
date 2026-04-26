'use client';
import { useState, useEffect, Suspense } from 'react';
import { ShieldCheck, CreditCard, Wallet, Lock, DownloadCloud, RefreshCw, User, Users, CheckCircle, ArrowRight, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import FakeCaptcha from '../../components/auth/FakeCaptcha';

function CheckoutContent() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  
  const [passengerInfo, setPassengerInfo] = useState({ name: '', age: '', contact: '' });
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [travelClass, setTravelClass] = useState('Economy');
  const [cardNumber, setCardNumber] = useState('');

  const classMultiplier = {
    'Economy': 1, 'Premium Economy': 1.5, 'Business': 2.5, 'First Class': 4,
    'Sleeper': 1, '3rd AC': 1.5, '2nd AC': 2.5, '1st AC': 4,
    'Sleeper AC': 2, 'Non AC Sleeper': 1.5, 'Seating AC': 1.2, 'Non AC Seating': 1,
    'Mini': 1, 'Sedan': 1.5, 'SUV': 2.5, 'Premium': 4
  };

  const searchParams = useSearchParams();
  const queryPrice = searchParams.get('price');
  const baseTicketPrice = queryPrice ? parseInt(queryPrice) : 3900;
  
  const typeParam = searchParams.get('type') || 'flights';
  const displayType = typeParam === 'trains' ? 'Train' : typeParam === 'buses' ? 'Bus' : typeParam === 'cabs' ? 'Cab' : 'Flight';
  
  const carrier = searchParams.get('carrier') || 'AI-409';
  const fromCity = searchParams.get('from') || 'DELHI (DEL)';
  const toCity = searchParams.get('to') || 'MUMBAI (BOM)';

  const getClassOptions = () => {
    if (displayType === 'Train' || displayType === 'Flight') return ['Sleeper', '3rd AC', '2nd AC', '1st AC'];
    if (displayType === 'Bus') return ['Sleeper AC', 'Non AC Sleeper', 'Seating AC', 'Non AC Seating'];
    if (displayType === 'Cab') return ['Mini', 'Sedan', 'SUV', 'Premium'];
    return ['Economy', 'Premium Economy', 'Business', 'First Class'];
  };

  const currentClassOptions = getClassOptions();

  useEffect(() => {
    if (!currentClassOptions.includes(travelClass)) {
      setTravelClass(currentClassOptions[0]);
    }
  }, [displayType]);

  const baseFare = baseTicketPrice * (classMultiplier[travelClass] || 1);
  const finalFare = baseFare + 499 + 200;

  const handleCardNumberChange = (e) => {
     let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
     let formatted = '';
     for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
     }
     setCardNumber(formatted.substring(0, 19)); // Max 16 digits + 3 spaces
  };

  const seatLayouts = {
    // Flight / Standard
    'First Class': [['1A', 'GAP', '1F'], ['2A', 'GAP', '2F']],
    'Business': [['3A', '3C', 'GAP', '3D', '3F'], ['4A', '4C', 'GAP', '4D', '4F']],
    'Premium Economy': [['10A', '10B', 'GAP', '10E', '10F']],
    'Economy': [['20A', '20B', '20C', 'GAP', '20D', '20E', '20F']],
    
    // Train & Re-branded Flights
    '1st AC': [['H1-A', 'GAP', 'H1-B'], ['H1-C', 'GAP', 'H1-D']],
    '2nd AC': [['A1-1', 'A1-2', 'GAP', 'A1-3', 'A1-4'], ['A1-5', 'A1-6', 'GAP', 'A1-7', 'A1-8']],
    '3rd AC': [['B1-1', 'B1-2', 'B1-3', 'GAP', 'B1-4', 'B1-5', 'B1-6'], ['B1-7', 'B1-8', 'B1-9', 'GAP', 'B1-10', 'B1-11', 'B1-12']],
    'Sleeper': [['S1-1', 'S1-2', 'S1-3', 'GAP', 'S1-4', 'S1-5', 'S1-6']],
    
    // Buses
    'Sleeper AC': [['L1', 'L2', 'GAP', 'U1', 'U2'], ['L3', 'L4', 'GAP', 'U3', 'U4']],
    'Non AC Sleeper': [['L1', 'L2', 'GAP', 'U1', 'U2']],
    'Seating AC': [['1A', '1B', 'GAP', '1C', '1D'], ['2A', '2B', 'GAP', '2C', '2D']],
    'Non AC Seating': [['1A', '1B', 'GAP', '1C', '1D']],
    
    // Cabs
    'Mini': [['1-Front', 'GAP', '2-BkLeft', '3-BkRight']],
    'Sedan': [['1-Front', 'GAP', '2-BkLeft', '3-BkMid', '4-BkRight']],
    'SUV': [['1-Front', 'GAP', '2-MidL', '3-MidR', 'GAP', '4-BkL', '5-BkR']],
    'Premium': [['1-Front', 'GAP', '2-CaptL', '3-CaptR']]
  };

  const seatMap = seatLayouts[travelClass] || seatLayouts['Economy'];
  
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
     const stored = JSON.parse(localStorage.getItem('yatraBookedSeats') || '[]');
     if (stored.length === 0) {
        const defaultBooked = ['1A', '3C', '11E', '20D', '22B', '24F'];
        localStorage.setItem('yatraBookedSeats', JSON.stringify(defaultBooked));
        setBookedSeats(defaultBooked);
     } else {
        setBookedSeats(stored);
     }
  }, []);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      
      const newlyBooked = [...bookedSeats, selectedSeat];
      setBookedSeats(newlyBooked);
      localStorage.setItem('yatraBookedSeats', JSON.stringify(newlyBooked));

      // Push newly created journey into user's profile
      const storedJourneys = JSON.parse(localStorage.getItem('yatraJourneys') || '[]');
      const newJourney = {
         id: `YTR-${Math.floor(Math.random() * 89999) + 10000}A`,
         type: displayType,
         from: fromCity.toUpperCase(),
         to: toCity.toUpperCase(),
         date: new Date().toLocaleDateString('en-GB'),
         status: 'Confirmed'
      };
      localStorage.setItem('yatraJourneys', JSON.stringify([newJourney, ...storedJourneys]));
    }, 2000);
  };

  const downloadPDF = async () => {
    const doc = new jsPDF('landscape');
    
    // Outer Border
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 277, 130);
    
    // Top Indigo-style Header Block
    doc.setFillColor(30, 58, 138); // Deep Blue
    doc.rect(10, 10, 277, 25, 'F');
    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('YATRAMIND BOARDING PASS', 15, 28);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('PNR: YTR99X', 250, 28);
    
    // Perforated Line (Right Stub)
    doc.setDrawColor(150, 150, 150);
    doc.setLineDash([2, 2], 0);
    doc.line(210, 35, 210, 140);
    doc.setLineDash([]);
    
    // Left Content Area
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text('NAME OF PASSENGER', 15, 48);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text((passengerInfo.name || 'Premium Passenger').toUpperCase(), 15, 56);
    
    // Route
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('FROM', 15, 75);
    doc.text('TO', 100, 75);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(fromCity.toUpperCase(), 15, 84);
    doc.text(toCity.toUpperCase(), 100, 84);
    
    // Trip Details Row
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('CARRIER', 15, 105);
    doc.text('DATE', 60, 105);
    doc.text('TIME', 110, 105);
    doc.text('CLASS', 160, 105);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(carrier.toUpperCase(), 15, 114);
    doc.text(new Date().toLocaleDateString('en-GB'), 60, 114);
    doc.text('10:45 AM', 110, 114);
    doc.text(travelClass.toUpperCase(), 160, 114);

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
    doc.text('*012399948293*', 35, 138);

    // Right Stub (Passenger Copy)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('NAME', 215, 48);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text((passengerInfo.name || 'Premium Passenger').toUpperCase(), 215, 56);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('SEAT', 215, 75);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(selectedSeat || 'TBA', 215, 86);
    doc.setTextColor(0, 0, 0);
    
    // Generate QR
    try {
       const rawPayload = `YTR-${passengerInfo.name}-${selectedSeat}-DELBOM`;
       const qrDataUrl = await QRCode.toDataURL(rawPayload, { margin: 1 });
       // Drop QR to the bottom right of the stub
       doc.addImage(qrDataUrl, 'PNG', 242, 95, 40, 40);
    } catch (e) {
       console.error(e);
    }
    
    // --- PAGE 2: TRANSACTION RECEIPT ---
    doc.addPage('a4', 'portrait');
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Receipt Header IRCTC STYLE
    doc.setFillColor(30, 58, 138); 
    doc.rect(10, 10, 190, 30, 'F');
    
    // Exact icon.svg Replica Box
    doc.setFillColor(235, 78, 66); // primary reddish orange
    doc.roundedRect(15, 14, 22, 22, 4, 4, 'F');
    
    // The "Y" Path
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(2.5);
    doc.setLineCap('round');
    doc.setLineJoin('round');
    // M 28 35 L 50 62 L 72 35
    doc.line(19, 20, 26, 27);
    doc.line(33, 20, 26, 27);
    // M 50 62 L 50 78
    doc.line(26, 27, 26, 32);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('YATRAMIND E-TICKET', 45, 24);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ELECTRONIC RESERVATION SLIP (E-RS)', 45, 32);

    try {
       const qrReceiptDataUrl = await QRCode.toDataURL(`YATRAMIND-RECEIPT-${finalFare}-${passengerInfo.name || 'Guest'}`, { margin: 0 });
       // Drop QR to the top right of the receipt
       doc.addImage(qrReceiptDataUrl, 'PNG', 168, 13, 24, 24);
    } catch (e) {
       console.error(e);
    }
    
    // Body Details
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction Details', 10, 55);
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(10, 58, 200, 58);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PNR No:', 15, 68);
    doc.setFont('helvetica', 'normal');
    const pnrStr = `YTR${Math.floor(Math.random() * 89999) + 10000}X`;
    doc.text(pnrStr, 45, 68);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction ID:', 110, 68);
    doc.setFont('helvetica', 'normal');
    doc.text('TXN' + Date.now().toString().slice(-8), 150, 68);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date of Booking:', 15, 78);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleString(), 45, 78);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Class:', 110, 78);
    doc.setFont('helvetica', 'normal');
    doc.text(travelClass.toUpperCase(), 150, 78);

    doc.line(10, 85, 200, 85);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Passenger Details', 10, 95);
    doc.line(10, 98, 200, 98);

    doc.setFillColor(240, 240, 240);
    doc.rect(10, 102, 190, 8, 'F');
    doc.setFontSize(10);
    doc.text('S.No.', 15, 107.5);
    doc.text('Name', 35, 107.5);
    doc.text('Age', 100, 107.5);
    doc.text('Seat/Berth', 130, 107.5);
    doc.text('Status', 170, 107.5);

    doc.setFont('helvetica', 'normal');
    doc.text('1', 17, 117);
    doc.text((passengerInfo.name || 'Premium Passenger').toUpperCase(), 35, 117);
    doc.text((passengerInfo.age || '25').toString(), 100, 117);
    doc.text(selectedSeat || 'TBA', 130, 117);
    doc.text('CNF', 170, 117);
    
    doc.line(10, 122, 200, 122);
    
    // Table Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Fare Breakdown', 10, 138);
    doc.line(10, 141, 200, 141);
    
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 145, 190, 8, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 15, 150.5);
    doc.text('Amount (INR)', 160, 150.5);
    
    // Table Content
    let y = 160;
    doc.setFont('helvetica', 'normal');
    doc.text(`Ticket Fare (${travelClass})`, 15, y);
    doc.text(`Rs. ${baseFare.toLocaleString()}`, 160, y);
    
    y += 10;
    doc.text('IRCTC / Convenience Fee', 15, y);
    doc.text('Rs. 200', 160, y);
    
    y += 10;
    doc.text('PG Charges / GST (18%)', 15, y);
    doc.text('Rs. 499', 160, y);
    
    y += 10;
    doc.setLineWidth(0.8);
    doc.line(10, y-4, 200, y-4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Total Amount Paid', 15, y + 2);
    doc.text(`Rs. ${finalFare.toLocaleString()}`, 160, y + 2);
    doc.line(10, y + 6, 200, y + 6);
    
    // Footer Instructions like IRCTC
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const instructY = y + 20;
    doc.text('IMPORTANT INSTRUCTIONS:', 10, instructY);
    doc.text('1. Present this e-ticket along with a valid original photo ID proof at the time of journey.', 10, instructY + 5);
    doc.text('2. Please report to the boarding point at least 45 minutes prior to departure.', 10, instructY + 10);
    doc.text('3. This is a system generated document and does not require a physical signature.', 10, instructY + 15);
    doc.text('Thank you for choosing YatraMind. Have a safe journey!', 10, instructY + 25);

    doc.save(`YatraMind_BoardingPass+Receipt_${passengerInfo.name || 'Guest'}.pdf`);
  };

  if (paid) {
     return (
       <div className="max-w-3xl mx-auto px-4 py-20 text-center">
         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
         </div>
         <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
         <p className="text-gray-500 mb-10 text-lg">Your booking is confirmed. We have sent the itinerary to your registered email.</p>
         
         <button onClick={downloadPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition flex justify-center items-center gap-3 mx-auto mb-6">
           <DownloadCloud className="w-6 h-6"/>
           Download e-Ticket & Receipt (PDF)
         </button>
         
         <Link href="/profile" className="text-gray-500 hover:text-indigo-600 font-bold transition flex items-center justify-center gap-2">
            View Upcoming Journeys <ArrowRight className="w-4 h-4" />
         </Link>
       </div>
     );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
       
       {!paid && (
         <div className="mb-6 border-b border-gray-100 pb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold transition group">
               <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition"/> 
               Discard Ticket & Return to Dashboard
            </Link>
         </div>
       )}

       <div className="flex flex-col md:flex-row gap-12">
       
       <div className="w-full md:w-2/3 space-y-6">
         
         {/* Step 1: Passenger Details */}
         <div className={`p-8 rounded-2xl shadow-sm border ${step === 1 ? 'border-blue-500 bg-white ring-4 ring-blue-50' : 'border-gray-100 bg-white opacity-70'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span> Passenger Details</h2>
            {step >= 1 && (
               <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-1 block">Full Name</label>
                        <input value={passengerInfo.name} onChange={e => setPassengerInfo({...passengerInfo, name: e.target.value})} type="text" placeholder="John Doe" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" disabled={step !== 1} />
                     </div>
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-1 block">Age</label>
                        <input value={passengerInfo.age} onChange={e => setPassengerInfo({...passengerInfo, age: e.target.value})} type="number" placeholder="28" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" disabled={step !== 1} />
                     </div>
                  </div>
                  <div className="mb-6">
                     <label className="text-sm font-bold text-gray-700 mb-2 block">Cabin Class</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         {currentClassOptions.map(cls => (
                           <button 
                             key={cls}
                             onClick={() => {
                                setTravelClass(cls);
                                setSelectedSeat(null); // Reset seat on class change
                             }}
                             className={`p-3 rounded-xl border text-sm font-bold transition ${travelClass === cls ? 'bg-blue-600 border-blue-700 text-white shadow-md' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-400'}`}
                           >
                             {cls}
                           </button>
                        ))}
                     </div>
                  </div>

                  {step === 1 && (
                     <button onClick={() => setStep(2)} disabled={!passengerInfo.name || !passengerInfo.age} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-xl transition ml-auto flex items-center gap-2">Next: Seat Selection <ArrowRight className="w-4 h-4"/></button>
                  )}
               </div>
            )}
         </div>

         {/* Step 2: Seat Selection */}
         <div className={`p-8 rounded-2xl shadow-sm border ${step === 2 ? 'border-blue-500 bg-white ring-4 ring-blue-50' : 'border-gray-100 bg-gray-50 opacity-70'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span> Select Your Seat</h2>
            {step === 2 && (
               <div>
                  <div className="bg-slate-100 rounded-xl p-8 max-w-sm mx-auto border-2 border-slate-200 mb-6 relative">
                     {/* Plane nose visual */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-24 border-b-[40px] border-b-slate-100 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent"></div>
                     <div className="flex flex-col gap-3">
                       {seatMap.map((row, i) => (
                         <div key={i} className="flex justify-center gap-2">
                           {row.map((seat, j) => {
                              if (seat === 'GAP') return <div key={j} className="w-6"></div>;
                              const isBooked = bookedSeats.includes(seat);
                              const isSelected = selectedSeat === seat;
                              return (
                                 <button 
                                   key={j} 
                                   disabled={isBooked}
                                   onClick={() => setSelectedSeat(seat)}
                                   className={`w-10 h-10 rounded-t-lg rounded-b-sm border shadow-sm font-bold text-xs flex items-center justify-center transition
                                     ${isBooked ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' : 
                                       isSelected ? 'bg-blue-600 border-blue-700 text-white scale-110' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-50 cursor-pointer'}
                                   `}
                                 >{seat}</button>
                              )
                           })}
                         </div>
                       ))}
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 font-semibold mb-1">Selected Seat</p>
                      <p className="text-xl font-bold text-blue-900">{selectedSeat || 'None'}</p>
                    </div>
                    <button onClick={() => setStep(3)} disabled={!selectedSeat} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-xl transition flex items-center gap-2">Proceed to Payment <ArrowRight className="w-4 h-4"/></button>
                  </div>
               </div>
            )}
            {step > 2 && <p className="font-bold text-blue-600 border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded-r-lg">Seat {selectedSeat} Confirmed</p>}
         </div>

         {/* Step 3: Checkout */}
         <div className={`p-8 rounded-2xl shadow-sm border ${step === 3 ? 'border-blue-500 bg-white ring-4 ring-blue-50' : 'border-gray-100 bg-gray-50 opacity-70'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span> Secure Checkout</h2>
            
            {step === 3 && (
               <div>
                  <p className="text-gray-500 mb-6"><Lock className="w-4 h-4 inline mr-1 text-green-600"/> 256-bit SSL Enhanced Encryption</p>
                  
                  <div className="flex gap-4 mb-6">
                     <button onClick={() => setMethod('card')} className={`flex-1 py-4 border-2 rounded-xl flex flex-col items-center gap-2 font-bold transition ${method === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-500 hover:border-indigo-300'}`}>
                        <CreditCard className="w-6 h-6"/> Card
                     </button>
                     <button onClick={() => setMethod('upi')} className={`flex-1 py-4 border-2 rounded-xl flex flex-col items-center gap-2 font-bold transition ${method === 'upi' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-500 hover:border-indigo-300'}`}>
                        <Wallet className="w-6 h-6"/> UPI
                     </button>
                     <button onClick={() => setMethod('netbanking')} className={`flex-1 py-4 border-2 rounded-xl flex flex-col items-center gap-2 font-bold transition ${method === 'netbanking' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-500 hover:border-indigo-300'}`}>
                        <Building className="w-6 h-6"/> Net Banking
                     </button>
                  </div>

                  {method === 'card' && (
                  <div className="space-y-4">
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-1 block">Card Number</label>
                        <input value={cardNumber} onChange={handleCardNumberChange} type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 text-lg tracking-widest font-mono bg-white" />
                     </div>
                     <div className="flex gap-4">
                        <div className="flex-1">
                        <label className="text-sm font-bold text-gray-700 mb-1 block">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 bg-white" />
                        </div>
                        <div className="flex-1">
                        <label className="text-sm font-bold text-gray-700 mb-1 block">CVV</label>
                        <input type="password" placeholder="•••" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 bg-white" />
                        </div>
                     </div>
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-1 block">Name on Card</label>
                        <input type="text" placeholder={passengerInfo.name || "Cardholder Name"} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 bg-white" />
                     </div>
                  </div>
                  )}

                  {method === 'upi' && (
                  <div className="border border-gray-200 p-8 rounded-xl text-center bg-gray-50 flex flex-col items-center justify-center">
                     <div className="w-48 h-48 bg-white border border-gray-200 mb-4 p-2 shadow-sm rounded-lg" style={{backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')", backgroundSize: 'contain'}}></div>
                     <p className="font-bold text-gray-700 mb-4">Scan QR to Pay ₹{finalFare.toLocaleString()} via UPI</p>
                     
                     <div className="w-full relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                        <div className="relative flex justify-center"><span className="bg-gray-50 px-4 text-sm text-gray-400 font-bold">OR</span></div>
                     </div>
                     
                     <div className="w-full text-left mt-2">
                        <label className="text-sm font-bold text-gray-700 block mb-2">Enter UPI ID</label>
                        <input type="text" placeholder="username@okhdfc" className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-600" />
                     </div>
                  </div>
                  )}

                  {method === 'netbanking' && (
                  <div className="space-y-4 border border-gray-200 p-8 rounded-xl bg-gray-50 text-left">
                      <label className="text-sm font-bold text-gray-700 block mb-2">Select Your Bank</label>
                      <select className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-600 bg-white text-lg font-medium text-gray-700 cursor-pointer shadow-sm">
                          <option>HDFC Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                          <option>Punjab National Bank</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-4 leading-relaxed"><Lock className="w-3 h-3 inline mr-1"/>You will be redirected to your bank's secure portal to complete the transaction.</p>
                  </div>
                  )}
               </div>
            )}
         </div>

       </div>

       {/* Price breakdown Sidebar */}
       <div className="w-full md:w-1/3">
         <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Fare Summary</h3>
            <div className="space-y-4 mb-6 text-gray-300 text-sm">
               <div className="flex justify-between">
                 <span>{travelClass} Fare ({classMultiplier[travelClass]}x)</span>
                 <span className="font-bold text-white">₹{baseFare.toLocaleString()}</span>
               </div>
               {selectedSeat && (
                 <div className="flex justify-between">
                   <span>Seat Selection ({selectedSeat})</span>
                   <span className="font-bold text-emerald-400">Included</span>
                 </div>
               )}
               <div className="flex justify-between">
                 <span>Taxes & Fees</span>
                 <span className="font-bold text-white">₹499</span>
               </div>
               <div className="flex justify-between">
                 <span>Convenience Fee</span>
                 <span className="font-bold text-white">₹200</span>
               </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
               <span className="text-lg">Total Pay</span>
               <span className="text-3xl font-black text-emerald-400">₹{finalFare.toLocaleString()}</span>
            </div>

            {step === 3 && (
               <>
               <div className="mt-8 mb-4">
                  <FakeCaptcha onVerify={(val) => setCaptchaVerified(val)} />
               </div>

               <button 
                 onClick={handlePayment} 
                 disabled={loading || !captchaVerified || cardNumber.length < 19 && method === 'card'} 
                 className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 text-white font-black text-xl py-5 rounded-xl shadow-lg shadow-emerald-500/20 transition mt-4 flex justify-center items-center gap-2"
               >
                 {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : (loading ? 'Processing...' : `Pay ₹${finalFare.toLocaleString()} Securely`)}
               </button>
               </>
            )}
         </div>
       </div>

     </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-32 text-gray-400 font-bold tracking-widest uppercase">Initializing Secure Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

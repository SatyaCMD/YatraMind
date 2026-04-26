'use client';
import { useState, use } from 'react';
import { Car, Train, Home, Bus, Shield, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FakeCaptcha from '../../../components/auth/FakeCaptcha';

export default function BookingDetails({ params }) {
  const unwrappedParams = use(params);
  const service = unwrappedParams.service; 
  const [cabBooked, setCabBooked] = useState(false);
  const [cabOtp, setCabOtp] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleAuthGuard = (targetUrl) => {
    if (!isAuthenticated) {
       toast.error("Please login first to proceed with bookings or transactions.");
       router.push("/login");
    } else {
       router.push(targetUrl);
    }
  };

  const generateCabOtp = () => {
     if (!isAuthenticated) {
       toast.error("Please login first to proceed with bookings or transactions.");
       router.push("/login");
       return;
     }
     setCabOtp(Math.floor(1000 + Math.random() * 9000).toString());
     setCabBooked(true);
     toast.success("OTP Generated successfully!");
  };

  const generateMockResults = (serv) => {
    const results = [];
    const carriers = {
      flights: ['Indigo 6E', 'AirIndia AI', 'Vistara UK', 'Akasa QP', 'SpiceJet SG'],
      trains: ['Rajdhani Express', 'Shatabdi Exp', 'Vande Bharat', 'Duronto Exp', 'Garib Rath'],
      buses: ['Volvo Intercity', 'Scania Premium', 'Sleeper AC', 'Mercedes Benz', 'Zingbus'],
      cabs: ['Uber Go', 'Ola Mini', 'BluSmart', 'Meru Cabs', 'Uber Sedan', 'Ola SUV', 'MakeMyTrip Cabs']
    };
    
    // Normalize mapping
    const lookup = serv === 'trains' ? 'trains' : serv === 'buses' ? 'buses' : serv === 'cabs' ? 'cabs' : 'flights';
    const pool = carriers[lookup];
    const cities = ['Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 'Chennai (MAA)', 'Kolkata (CCU)'];
    
    for(let i=0; i<15; i++) {
       const carrier = pool[i % pool.length] + ' ' + (100 + i*7);
       const isDirect = i % 3 === 0;
       const isTwoStop = i % 5 === 0 && i !== 0;

       let type = 'Non-Stop';
       let layover = null;
       let duration = `${Math.floor(Math.random() * 2) + 2}h ${Math.floor(Math.random() * 50) + 10}m`;

       if (isTwoStop) {
          type = '2 Stops';
          layover = 'Via Bhopal (2h 15m), Jaipur (1h 30m)';
          duration = `${Math.floor(Math.random() * 4) + 8}h ${Math.floor(Math.random() * 50) + 10}m`;
       } else if (!isDirect) {
          type = '1 Stop';
          layover = `Via ${['Ahmedabad', 'Surat', 'Nagpur', 'Indore'][i % 4]} (1h 45m)`;
          duration = `${Math.floor(Math.random() * 3) + 4}h ${Math.floor(Math.random() * 50) + 10}m`;
       }

       const hr = (6 + i) % 24;
       const ampm = hr >= 12 ? 'PM' : 'AM';
       const depHr = hr % 12 === 0 ? 12 : hr % 12;
       
       const arrHr24 = (hr + parseInt(duration.split('h')[0])) % 24;
       const arrAmpm = arrHr24 >= 12 ? 'PM' : 'AM';
       const arrHr = arrHr24 % 12 === 0 ? 12 : arrHr24 % 12;

       results.push({
         id: `OPT-${i+1}`,
         carrier,
         from: cities[i % cities.length],
         to: cities[(i + 1) % cities.length],
         departure: `${depHr < 10 ? '0'+depHr : depHr}:30 ${ampm}`,
         arrival: `${arrHr < 10 ? '0'+arrHr : arrHr}:45 ${arrAmpm}`,
         price: 3000 + Math.floor(Math.random() * 6000),
         seatsLeft: Math.floor(Math.random() * 20) + 1,
         duration,
         type,
         layover
       });
    }
    return results;
  };

  const mockResults = generateMockResults(service);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 capitalize text-gray-900">Available {service}</h1>
      <p className="text-gray-600 mb-8">We found {mockResults.length} options for your travel date.</p>
      
      <div className="space-y-4">
         {mockResults.map((res) => (
            <div key={res.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition">
               
               <div className="flex-1 w-full grid grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{res.carrier}</h3>
                    <p className="text-sm text-gray-500">{res.seatsLeft} seats left</p>
                  </div>
                  <div className="text-center flex flex-col items-center group relative">
                     <span className="text-xs text-gray-500 font-medium mb-1">{res.from}</span>
                     <span className="font-bold text-gray-900">{res.departure}</span>
                     <div className="w-full h-px bg-gray-300 my-2 relative min-w-[120px]">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400 font-bold border border-gray-100 rounded-full">{res.duration}</span>
                     </div>
                     {res.layover && (
                        <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold mt-1">
                          {res.layover}
                        </span>
                     )}
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <span className="text-xs text-gray-500 font-medium mb-1">{res.to}</span>
                     <span className="font-bold text-gray-900">{res.arrival}</span>
                     <span className={`text-xs font-bold px-2 py-0.5 rounded mt-1 ${res.type === 'Non-Stop' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        {res.type}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  <span className="text-2xl font-black text-blue-600">₹{res.price.toLocaleString()}</span>
                  <button onClick={() => handleAuthGuard(`/checkout?price=${res.price}&type=${service}&carrier=${encodeURIComponent(res.carrier)}&from=${encodeURIComponent(res.from)}&to=${encodeURIComponent(res.to)}`)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md whitespace-nowrap">
                    Book Now
                  </button>
               </div>

            </div>
         ))}
      </div>
    </div>
  );
}

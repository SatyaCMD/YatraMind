'use client';
import { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FlightSearch() {
  const [tripType, setTripType] = useState('one-way');
  const [showPopup, setShowPopup] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flightClass, setFlightClass] = useState('Sleeper');
  const [startDate, setStartDate] = useState(new Date());

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  
  const initialReturn = new Date();
  initialReturn.setDate(initialReturn.getDate() + 3);
  const [returnDate, setReturnDate] = useState(initialReturn);
  
  // Dynamic grid class based on visible elements
  const isRoundTrip = tripType === 'round-trip';
  const gridClass = isRoundTrip ? 'grid-cols-1 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-4';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        {['One-Way', 'Round-Trip', 'Multi-City'].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="tripType" 
              value={type.toLowerCase()} 
              checked={tripType === type.toLowerCase()}
              onChange={(e) => setTripType(e.target.value)}
              className="accent-blue-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${tripType === type.toLowerCase() ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
              {type}
            </span>
          </label>
        ))}
      </div>

      <div className={`grid ${gridClass} gap-4`}>
        {/* From */}
        <SearchAutocomplete 
           service="flights" 
           label="FROM" 
           placeholder="Delhi (DEL)"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* To */}
        <SearchAutocomplete 
           service="flights" 
           label="TO" 
           placeholder="Mumbai (BOM)"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Departure */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">DEPARTURE</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <DatePicker 
              selected={startDate} 
              onChange={(date) => {
                  setStartDate(date);
                  if (isRoundTrip && date >= returnDate) {
                      const next = new Date(date);
                      next.setDate(next.getDate() + 2);
                      setReturnDate(next);
                  }
              }} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={new Date()}
              maxDate={maxDate}
            />
          </div>
        </div>

        {/* Return */}
        {isRoundTrip && (
           <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
             <label className="text-xs text-gray-500 font-semibold mb-1 block">RETURN</label>
             <div className="flex items-center gap-2">
               <Calendar className="text-blue-500 w-5 h-5 flex-shrink-0" />
               <DatePicker 
                 selected={returnDate} 
                 onChange={(date) => setReturnDate(date)} 
                 className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
                 dateFormat="dd MMM yy"
                 minDate={startDate}
                 maxDate={maxDate}
                 placeholderText="Select Date"
               />
             </div>
           </div>
        )}

        {/* Travellers & Class */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">TRAVELLERS & CLASS</label>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
             <Users className="text-gray-400 w-5 h-5 flex-shrink-0" />
             <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">{adults + children} Traveller{adults + children > 1 && 's'}</span>
                <span className="text-xs text-gray-500">{flightClass}</span>
             </div>
          </div>

          {showPopup && (
             <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 shadow-2xl rounded-2xl z-50 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Select Travellers</h3>
                
                <div className="flex justify-between items-center mb-4">
                   <div>
                     <p className="font-bold text-gray-800">Adults</p>
                     <p className="text-xs text-gray-500">12+ yrs</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">-</button>
                     <span className="font-bold text-gray-900">{adults}</span>
                     <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">+</button>
                   </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                   <div>
                     <p className="font-bold text-gray-800">Children</p>
                     <p className="text-xs text-gray-500">2 - 12 yrs</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">-</button>
                     <span className="font-bold text-gray-900">{children}</span>
                     <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">+</button>
                   </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-4">Travel Class</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                   {['Sleeper', '3rd AC', '2nd AC', '1st AC'].map(c => (
                      <button 
                         key={c} 
                         onClick={() => setFlightClass(c)} 
                         className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${flightClass === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                         {c}
                      </button>
                   ))}
                </div>

                <button onClick={() => setShowPopup(false)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
                   Apply Selection
                </button>
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/flights">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Flights
          </button>
        </Link>
      </div>
    </div>
  );
}

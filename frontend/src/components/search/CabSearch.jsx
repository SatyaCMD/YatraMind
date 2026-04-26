'use client';
import { useState } from 'react';
import { Calendar, Search, Car, Clock } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CabSearch() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="cabType" value="airport" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-900">Airport Transfer</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="cabType" value="outstation" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Outstation Round-Trip</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="cabType" value="hourly" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Hourly Rentals</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Pickup */}
        <SearchAutocomplete 
           service="cabs" 
           label="PICKUP LOCATION" 
           placeholder="Connaught Place, Delhi"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Drop */}
        <SearchAutocomplete 
           service="cabs" 
           label="DROP LOCATION" 
           placeholder="Terminal 3, IGI Airport"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Pickup Date */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">PICKUP DATE</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Pickup Time */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 cursor-pointer">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">PICKUP TIME</label>
          <div className="flex items-center gap-2">
             <Clock className="text-gray-400 w-5 h-5 flex-shrink-0" />
             <input type="time" defaultValue="10:00" className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/cabs">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Outstation & Airport Cabs
          </button>
        </Link>
      </div>
    </div>
  );
}

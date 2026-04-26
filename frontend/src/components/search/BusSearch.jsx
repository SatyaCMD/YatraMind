'use client';
import { useState } from 'react';
import { Calendar, Search, Bus } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BusSearch() {
  const [pref, setPref] = useState('All Types');
  const [startDate, setStartDate] = useState(new Date());

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="busType" value="private" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-900">Private Buses</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="busType" value="government" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Government Buses (RTC)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* From */}
        <SearchAutocomplete 
           service="buses" 
           label="LEAVING FROM" 
           placeholder="ISBT Kashmere Gate"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* To */}
        <SearchAutocomplete 
           service="buses" 
           label="GOING TO" 
           placeholder="Swargate, Pune"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Departure */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">DATE OF JOURNEY</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={new Date()}
              maxDate={maxDate}
            />
          </div>
        </div>

        {/* Seat Type */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 cursor-pointer">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">PREFERENCES</label>
          <div className="flex items-center gap-2">
             <Bus className="text-gray-400 w-5 h-5 flex-shrink-0" />
             <select 
                value={pref} 
                onChange={(e) => setPref(e.target.value)} 
                className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer appearance-none"
             >
                <option value="All Types">All Types</option>
                <option value="Sleeper AC">Sleeper AC</option>
                <option value="Non AC Sleeper">Non AC Sleeper</option>
                <option value="Seating AC">Seating AC</option>
                <option value="Non AC Seating">Non AC Seating</option>
             </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/buses">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Buses
          </button>
        </Link>
      </div>
    </div>
  );
}

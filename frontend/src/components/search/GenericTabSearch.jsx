'use client';
import { MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

export default function GenericTabSearch({ title, placeholder, service }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="mb-6">
         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Input */}
        <SearchAutocomplete 
          service={service}
          label="SEARCH DETAILS"
          placeholder={placeholder}
          className="relative border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />
        
        {/* Dates Placeholder */}
        <div className="relative border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">DATE</label>
          <div className="flex items-center gap-2 pt-1.5">
             <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={new Date()}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href={`/book/${service}`}>
           <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
             <Search className="w-5 h-5" />
             Search
           </button>
        </Link>
      </div>
    </div>
  );
}

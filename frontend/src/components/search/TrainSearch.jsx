'use client';
import { useState } from 'react';
import { Calendar, Users, Search, Train } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TrainSearch() {
  const [classType, setClassType] = useState('All Classes');
  const [startDate, setStartDate] = useState(new Date());

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="trainType" value="book" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-900">Book Train Tickets</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="trainType" value="pnr" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Check PNR Status</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* From */}
        <SearchAutocomplete 
           service="trains" 
           label="FROM STATION" 
           placeholder="New Delhi (NDLS)"
           className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* To */}
        <SearchAutocomplete 
           service="trains" 
           label="TO STATION" 
           placeholder="Mumbai Central (BCT)"
           className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Departure */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">TRAVEL DATE</label>
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

        {/* Class */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 cursor-pointer">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">CLASS & QUOTA</label>
          <div className="flex items-center gap-2">
             <Train className="text-gray-400 w-5 h-5 flex-shrink-0" />
             <select className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer appearance-none" onChange={(e) => setClassType(e.target.value)}>
                <option>All Classes</option>
                <option>1st AC</option>
                <option>2nd AC</option>
                <option>3rd AC</option>
                <option>Sleeper</option>
             </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/trains">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Trains
          </button>
        </Link>
      </div>
    </div>
  );
}

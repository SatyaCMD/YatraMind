'use client';
import { useState } from 'react';
import { Calendar, Search, ShieldCheck, HeartPulse, ShieldAlert, PlaneTakeoff } from 'lucide-react';
import Link from 'next/link';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function InsuranceSearch() {
  const [checkIn, setCheckIn] = useState(new Date());
  const initialCheckOut = new Date();
  initialCheckOut.setDate(initialCheckOut.getDate() + 1);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto overflow-hidden">
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="insType" value="international" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-900">International Travel</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="insType" value="domestic" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Domestic Protection</span>
        </label>
      </div>

      {/* Trust banner */}
      <div className="hidden md:flex justify-between items-center bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
         <div className="flex items-center gap-3 text-blue-700 font-bold text-sm">
            <HeartPulse className="w-5 h-5 text-red-500" /> COVID-19 & Medical Coverage Up to $500,000
         </div>
         <div className="flex items-center gap-3 text-blue-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-orange-500" /> Flight Delay & Trip Cancellation Recovery
         </div>
         <div className="flex items-center gap-3 text-blue-700 font-bold text-sm">
            <PlaneTakeoff className="w-5 h-5 text-emerald-500" /> Lost Baggage Protection
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative col-span-1 md:col-span-2 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">DESTINATION COUNTRY</label>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500 w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="e.g. USA, UK, UAE, Schengen" 
              className="w-full text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">TRIP START</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <DatePicker 
              selected={checkIn} 
              onChange={(date) => {
                 setCheckIn(date); 
                 if(date >= checkOut) {
                    const nextDay = new Date(date);
                    nextDay.setDate(date.getDate() + 1);
                    setCheckOut(nextDay);
                 }
              }} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={new Date()}
            />
          </div>
        </div>
        
        {/* End Date */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">TRIP END</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <DatePicker 
              selected={checkOut} 
              onChange={(date) => setCheckOut(date)} 
              className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              dateFormat="dd MMM yy"
              minDate={checkIn}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/insurance">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Protect My Journey
          </button>
        </Link>
      </div>
    </div>
  );
}

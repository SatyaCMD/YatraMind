'use client';
import { useState } from 'react';
import { MapPin, Calendar, Users, Search, BedDouble } from 'lucide-react';
import Link from 'next/link';
import SearchAutocomplete from './SearchAutocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HotelSearch() {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  
  const [checkIn, setCheckIn] = useState(new Date());
  
  const initialCheckOut = new Date();
  initialCheckOut.setDate(initialCheckOut.getDate() + 1);
  const [checkOut, setCheckOut] = useState(initialCheckOut);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        {['Up to 4 Rooms', 'Group Bookings'].map((type, idx) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="hotelType" 
              defaultChecked={idx === 0}
              className="accent-blue-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${idx === 0 ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
              {type}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* City/Location */}
        <SearchAutocomplete 
           service="hotels" 
           label="CITY, PROPERTY NAME OR LOCATION" 
           placeholder="Goa"
           className="relative col-span-1 md:col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"
        />

        {/* Check-In */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">CHECK-IN</label>
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

        {/* Check-Out */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">CHECK-OUT</label>
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

        {/* Rooms & Guests */}
        <div className="relative col-span-1 border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">ROOMS & GUESTS</label>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
             <BedDouble className="text-gray-400 w-5 h-5 flex-shrink-0" />
             <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">{rooms} Room{rooms > 1 && 's'}, {guests} Guests</span>
             </div>
          </div>

          {showPopup && (
             <div className="absolute top-full left-0 lg:right-0 mt-2 w-[300px] bg-white border border-gray-200 shadow-2xl rounded-2xl z-50 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Rooms & Guests</h3>
                
                <div className="flex justify-between items-center mb-6">
                   <div>
                     <p className="font-bold text-gray-800">Rooms</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <button onClick={() => { setRooms(Math.max(1, rooms - 1)); setGuests(Math.max(guests, Math.max(1, rooms - 1))); }} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">-</button>
                     <span className="font-bold text-gray-900 w-4 text-center">{rooms}</span>
                     <button onClick={() => setRooms(rooms + 1)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">+</button>
                   </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                   <div>
                     <p className="font-bold text-gray-800">Guests</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <button onClick={() => setGuests(Math.max(rooms, guests - 1))} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">-</button>
                     <span className="font-bold text-gray-900 w-4 text-center">{guests}</span>
                     <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-100">+</button>
                   </div>
                </div>

                <button onClick={() => setShowPopup(false)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
                   Apply Selection
                </button>
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/hotels">
           <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
             <Search className="w-5 h-5" />
             Search Hotels
           </button>
        </Link>
      </div>
    </div>
  );
}

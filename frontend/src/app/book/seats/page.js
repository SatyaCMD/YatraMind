'use client';
import { useState } from 'react';
import { Plane, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SeatSelection() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  // Matrix: rows 1-10, columns A,B,C - D,E,F
  const rows = Array.from({length: 10}, (_, i) => i + 1);
  const leftCols = ['A', 'B', 'C'];
  const rightCols = ['D', 'E', 'F'];
  
  const occupiedSeats = ['1A', '1F', '3B', '4C', '7D', '8E', '10A'];

  const handleSeatClick = (seatId) => {
     if (!occupiedSeats.includes(seatId)) {
        setSelectedSeat(seatId);
     }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Your Seat</h1>
        <p className="text-gray-500">Flight DEL to BOM • Air India AI-409</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
        {/* Airplane Fuselage map */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-gray-100 flex flex-col items-center relative overflow-hidden">
           <Plane className="w-16 h-16 text-gray-200 mb-8 transform -rotate-90" />
           
           <div className="flex gap-8">
             {/* Left side */}
             <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                   {rows.map(r => (
                     <div key={`L-${r}`} className="flex gap-2">
                        {leftCols.map(c => {
                           const sId = `${r}${c}`;
                           const occ = occupiedSeats.includes(sId);
                           const sel = selectedSeat === sId;
                           return (
                             <button 
                               key={sId}
                               onClick={() => handleSeatClick(sId)}
                               className={`w-10 h-10 rounded-t-lg rounded-b-sm font-bold text-xs flex items-center justify-center transition border ${occ ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' : sel ? 'bg-blue-600 text-white border-blue-600 shadow-md transform -translate-y-1' : 'bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 border-gray-300'}`}
                             >
                               {occ ? 'X' : sId}
                             </button>
                           )
                        })}
                     </div>
                   ))}
                </div>
             </div>

             {/* Aisle */}
             <div className="w-4 bg-gray-50 flex flex-col items-center text-gray-300 text-[10px] py-4">AISLE</div>

             {/* Right side */}
             <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                   {rows.map(r => (
                     <div key={`R-${r}`} className="flex gap-2">
                        {rightCols.map(c => {
                           const sId = `${r}${c}`;
                           const occ = occupiedSeats.includes(sId);
                           const sel = selectedSeat === sId;
                           return (
                             <button 
                               key={sId}
                               onClick={() => handleSeatClick(sId)}
                               className={`w-10 h-10 rounded-t-lg rounded-b-sm font-bold text-xs flex items-center justify-center transition border ${occ ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' : sel ? 'bg-blue-600 text-white border-blue-600 shadow-md transform -translate-y-1' : 'bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 border-gray-300'}`}
                             >
                               {occ ? 'X' : sId}
                             </button>
                           )
                        })}
                     </div>
                   ))}
                </div>
             </div>
           </div>
        </div>

        {/* Summary side */}
        <div className="w-full md:w-80 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col relative top-12">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Booking Details</h3>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">Selected Seat</span>
                  <span className="font-black text-blue-600 text-xl">{selectedSeat || '--'}</span>
               </div>
               <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">Base Fare</span>
                  <span className="font-bold text-gray-900">₹4,599</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total</span>
                  <span className="font-black text-2xl text-gray-900">₹4,599</span>
               </div>
            </div>

            <Link href={selectedSeat ? "/checkout" : "#"}>
              <button disabled={!selectedSeat} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center gap-2">
                Proceed to Payment <CheckCircle2 className="w-5 h-5"/>
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

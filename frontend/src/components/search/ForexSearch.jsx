'use client';
import { useState } from 'react';
import { Search, Landmark, ArrowRightLeft, PercentCircle } from 'lucide-react';
import Link from 'next/link';

const rates = {
   'USD': 83.50,
   'EUR': 89.20,
   'GBP': 105.40,
   'AED': 22.70,
   'SGD': 61.80,
   'AUD': 54.30,
   'INR': 1.0,
   'CAD': 60.15,
   'CHF': 92.45,
   'JPY': 0.55
};

export default function ForexSearch() {
  const [sellCurrency, setSellCurrency] = useState('INR');
  const [buyCurrency, setBuyCurrency] = useState('USD');
  const [amount, setAmount] = useState(1000);

  // Conversion logic (INR base simplification)
  // Value in INR = amount * rates[sellCurrency]
  // Buy amount = (Value in INR) / rates[buyCurrency]
  const baseInr = amount * (rates[sellCurrency] || 1);
  const rawConverted = baseInr / (rates[buyCurrency] || 1);
  const commission = rawConverted * 0.02; // 2% commission
  const finalAmount = rawConverted - commission;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="forexType" value="cash" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-900">Currency Notes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="forexType" value="card" className="accent-blue-600 w-4 h-4" />
          <span className="text-sm font-medium text-gray-500">Forex Travel Card</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* I Have */}
        <div className="md:col-span-4 relative border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">YOU SELL</label>
          <div className="flex items-center gap-2">
            <select value={sellCurrency} onChange={e => setSellCurrency(e.target.value)} className="text-lg font-bold text-gray-900 bg-transparent border-none outline-none appearance-none cursor-pointer">
               {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full text-lg font-bold text-gray-900 focus:outline-none text-right bg-transparent"
            />
          </div>
        </div>

        {/* Swap */}
        <div className="md:col-span-1 flex justify-center py-2">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 transition" onClick={() => {
                const temp = sellCurrency;
                setSellCurrency(buyCurrency);
                setBuyCurrency(temp);
            }}>
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            </div>
        </div>

        {/* I Get */}
        <div className="md:col-span-4 relative border border-gray-200 rounded-xl p-3 bg-gray-50 opacity-90">
          <label className="text-xs text-gray-500 font-semibold mb-1 block">YOU BUY (ESTIMATED)</label>
          <div className="flex items-center gap-2">
            <select value={buyCurrency} onChange={e => setBuyCurrency(e.target.value)} className="text-lg font-bold text-gray-900 bg-transparent border-none outline-none appearance-none cursor-pointer">
               {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="text" 
              value={finalAmount.toFixed(2)}
              readOnly
              className="w-full text-lg font-bold text-gray-900 focus:outline-none text-right bg-transparent"
            />
          </div>
        </div>

        {/* Commission Banner */}
        <div className="md:col-span-3 bg-red-50 border border-red-100 rounded-xl p-3 flex flex-col justify-center h-full">
            <p className="text-xs font-bold text-red-600 flex items-center gap-1"><PercentCircle className="w-3 h-3"/> Flat 2% Commission</p>
            <p className="text-[10px] text-gray-500 mt-1">Included in final price. Transparent Global Rates.</p>
        </div>
      </div>
      
      {/* Denominations UI */}
      <div className="mt-6 border border-gray-100 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Landmark className="w-5 h-5 text-gray-400" />
             <div>
                <p className="text-sm font-bold text-gray-800">Cash Denomination Split</p>
                <p className="text-xs text-gray-500">Customize how you receive your {buyCurrency} notes on checkout.</p>
             </div>
          </div>
          <span className="bg-white border border-gray-200 px-3 py-1 rounded text-xs font-bold text-gray-600 shadow-sm">
             Available: 100s, 50s, 20s, 10s
          </span>
      </div>

      <div className="mt-8 flex justify-center -mb-12 relative z-20">
        <Link href="/book/forex">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-105 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Exchange Currency
          </button>
        </Link>
      </div>
    </div>
  );
}

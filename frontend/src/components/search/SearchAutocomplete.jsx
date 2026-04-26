'use client';
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { locationsData } from '../../data/locations';

export default function SearchAutocomplete({ service, placeholder, label, value, onChange, className }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const dataset = locationsData[service] || locationsData['flights'];

  const filtered = dataset.filter(
    item => item.city.toLowerCase().includes(query.toLowerCase()) || 
            item.code.toLowerCase().includes(query.toLowerCase()) ||
            item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (item) => {
    const formatted = `${item.city} (${item.code})`;
    setQuery(formatted);
    if(onChange) onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={className || "relative border border-gray-200 rounded-xl p-3 hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 bg-white"}>
      {label && <label className="text-xs font-semibold text-gray-500 mb-1 block uppercase">{label}</label>}
      <div className="flex items-center gap-2">
        <MapPin className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <input 
          type="text" 
          placeholder={placeholder} 
          className="w-full bg-transparent outline-none font-bold text-lg text-gray-800 placeholder-gray-300"
          value={query}
          onChange={(e) => {
             setQuery(e.target.value);
             setIsOpen(true);
             if (onChange) onChange(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && filtered.length > 0 && query.length > 0 && (
        <div className="absolute z-50 top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
           {filtered.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelect(item)}
                className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex items-center justify-between"
              >
                 <div>
                    <p className="font-bold text-gray-900">{item.city} <span className="text-gray-400 font-normal">({item.code})</span></p>
                    <p className="text-xs text-gray-500 mt-1">{item.name}</p>
                 </div>
              </div>
           ))}
        </div>
      )}
    </div>
  );
}

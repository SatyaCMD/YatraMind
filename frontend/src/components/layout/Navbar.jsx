'use client';
import { useState, useEffect } from 'react';
import { Plane, Building, Train, Bus, Car, Map, Banknote, ShieldCheck, UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModule } from '../../store/slices/uiSlice';
import { logoutUser } from '../../store/slices/authSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Flights', id: 'flights', icon: Plane },
  { name: 'Hotels', id: 'hotels', icon: Building },
  { name: 'Villas', id: 'villas', icon: Building },
  { name: 'Holidays', id: 'packages', icon: Map },
  { name: 'Trains', id: 'trains', icon: Train },
  { name: 'Buses', id: 'buses', icon: Bus },
  { name: 'Cabs', id: 'cabs', icon: Car },
  { name: 'Forex', id: 'forex', icon: Banknote },
  { name: 'Insurance', id: 'insurance', icon: ShieldCheck },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const activeModule = useSelector((state) => state.ui.activeModule);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Plane className="w-6 h-6" />
            </div>
            <span className="font-bold text-2xl text-blue-900 tracking-tight">YatraMind</span>
          </div>
          <div className="flex items-center gap-4">
            {(!mounted || !isAuthenticated) ? (
              <Link 
                href="/login"
                className="flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-xl hover:bg-blue-100 transition"
              >
                <UserCircle className="w-5 h-5" />
                <span>Log in / Sign up</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-xl hover:bg-blue-100 transition"
                >
                  <UserCircle className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                <button 
                  onClick={() => {
                      dispatch(logoutUser());
                      window.location.href = '/login?loggedOut=true';
                  }}
                  className="text-red-500 font-bold text-sm hover:underline px-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Module Navigation */}
      {mounted && !pathname.includes('/checkout') && !pathname.includes('/book') && (
      <div className="bg-white border-t border-gray-100 shadow-sm relative z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between overflow-x-auto no-scrollbar py-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => dispatch(setActiveModule(item.id))}
                  className={`flex flex-col items-center min-w-[70px] p-2 rounded-lg transition-all relative ${
                    isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      )}
    </nav>
  );
}

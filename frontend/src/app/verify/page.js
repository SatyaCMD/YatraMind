'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function VerifyPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // verify logic here
    setTimeout(() => { 
      setLoading(false); 
      dispatch({ type: 'auth/loginUser' });
      toast.success('Verified! Logging in...'); 
      window.location.href="/"; 
    }, 1000);
  };

  const handleResend = () => {
    toast.success("New OTP sent to your email.");
    setTimeLeft(60);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 to-blue-900 text-white flex-col justify-center p-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] opacity-10 bg-cover bg-center"></div>
         
         <div className="relative z-10 max-w-md">
            <h1 className="text-5xl font-bold mb-4">Secure Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Account Access</span></h1>
            <p className="text-indigo-100 text-lg mb-12">
              Enterprise-grade security ensuring your travel bookings and personal preferences remain exclusively yours.
            </p>

            <div className="space-y-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm flex items-center gap-4">
                <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg font-bold text-sm">2FA</div>
                <div>
                  <h3 className="font-bold text-lg mb-0 text-blue-200 leading-tight">Two-Factor Auth</h3>
                  <p className="text-sm text-indigo-100">Bank-level encryption standards.</p>
                </div>
              </div>
            </div>
         </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.4, ease: 'easeOut' }}
           className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
        >
           <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Verification</h2>
           <p className="text-center text-gray-500 mb-8">Enter the OTP sent to your email</p>

           {/* Debug Note from Original Image */}
           <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 text-center">
             <p className="text-xs text-yellow-600 font-bold uppercase mb-1">Debug Mode</p>
             <p className="text-xs text-yellow-700 mb-1">Use this OTP to login:</p>
             <p className="text-xl font-bold tracking-widest text-yellow-800">986963</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">One-Time Password</label>
                <div className="relative">
                  <ShieldCheck className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" placeholder="• • • • • •" required maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition text-center tracking-[0.5em] font-bold text-xl text-gray-700"
                    value={otp} onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                 <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex justify-center items-center gap-2">
                   {loading ? 'Processing...' : <>Verify & Proceed <ArrowRight className="w-5 h-5" /></>}
                 </button>
              </div>
           </form>

           <div className="text-center mt-8">
             <p className="text-xs text-gray-500 mb-2">Didn't receive the code?</p>
             <button 
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`font-bold text-sm transition ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
             >
                {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : 'Resend OTP'}
             </button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}

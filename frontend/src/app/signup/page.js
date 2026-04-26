'use client';
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    if (typeof window !== 'undefined') {
      // Mock saving user
      localStorage.setItem('yatra_mock_registered_user', JSON.stringify({
         name: formData.name,
         email: formData.email
      }));
      // Wipe any existing/mock journeys for a fresh account
      localStorage.removeItem('yatraJourneys');
    }
    
    // register logic here
    setTimeout(() => { 
       setLoading(false); 
       toast.success('Registration successful. Please sign in.');
       router.push("/login"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row-reverse bg-slate-50">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex-col justify-center p-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] opacity-10 bg-cover bg-center"></div>
         
         <div className="relative z-10 max-w-md">
            <h1 className="text-5xl font-bold mb-4">Master the<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Travel Itineraries</span></h1>
            <p className="text-indigo-100 text-lg mb-12">
              Start your journey today. Get unlimited access to advanced forecasting models and intelligent hotel analysis.
            </p>

            <div className="space-y-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-1 text-purple-200">Free Premium Trial</h3>
                <p className="text-sm text-indigo-100">Full access, no credit card required.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-1 text-purple-200">Automated Reports</h3>
                <p className="text-sm text-indigo-100">Generate professional trip analysis instantly.</p>
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
           <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
           <p className="text-center text-gray-500 mb-8">Join us to start your journey</p>

           <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" placeholder="John Doe" required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" placeholder="you@example.com" required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition"
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <div className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Retype Password</label>
                <div className="relative">
                  <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition"
                    value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  <div className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                 <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex justify-center items-center gap-2">
                   {loading ? 'Processing...' : <>Sign Up <ArrowRight className="w-5 h-5" /></>}
                 </button>
              </div>
           </form>

           <p className="text-center mt-8 text-sm text-gray-600">
             Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
           </p>
        </motion.div>
      </div>
    </div>
  );
}

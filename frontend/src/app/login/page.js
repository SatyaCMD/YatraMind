'use client';
import { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import FakeCaptcha from '../../components/auth/FakeCaptcha';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoggedOutState, setIsLoggedOutState] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
       const params = new URLSearchParams(window.location.search);
       if (params.get('loggedOut') === 'true') {
          setIsLoggedOutState(true);
          window.history.replaceState({}, '', '/login');
          
          let current = 5;
          const interval = setInterval(() => {
             current -= 1;
             setRedirectCountdown(current);
             if (current <= 0) {
                clearInterval(interval);
                router.push('/');
             }
          }, 1000);
          return () => clearInterval(interval);
       }
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // login logic...
    setTimeout(() => { 
       setLoading(false); 

       let userData = { name: formData.email.split('@')[0], email: formData.email, memberTier: 'Yatra Gold' };
       if (typeof window !== 'undefined') {
          const registered = localStorage.getItem('yatra_mock_registered_user');
          if (registered) {
             const parsed = JSON.parse(registered);
             if (parsed.email === formData.email) {
                userData.name = parsed.name;
             }
          }
       }

       dispatch(loginUser(userData));
       toast.success('Logged in successfully!'); 
       router.push("/"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 to-blue-900 text-white flex-col justify-center p-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] opacity-10 bg-cover bg-center"></div>
         
         <div className="relative z-10 max-w-md">
            <h1 className="text-5xl font-bold mb-4">Welcome to the<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Future of Travel</span></h1>
            <p className="text-indigo-100 text-lg mb-12">
              Join millions exploring the world using advanced AI to predict the best itineraries before they happen.
            </p>

            <div className="space-y-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-1 text-blue-200">92% Prediction Accuracy</h3>
                <p className="text-sm text-indigo-100">On Flight and Hotel Price Drops</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-1 text-blue-200">24/7 Smart Assistant</h3>
                <p className="text-sm text-indigo-100">Continuous scanning for better deals</p>
              </div>
            </div>
         </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
           initial={{ x: -50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.4, ease: 'easeOut' }}
           className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
        >
           {isLoggedOutState ? (
             <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Logout Successful</h2>
                <p className="text-gray-500 mb-6">You have been securely signed out.</p>
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl font-medium animate-pulse">
                   Redirecting to Dashboard in {redirectCountdown} seconds...
                </div>
                <Link href="/" className="inline-block mt-6 text-sm text-gray-500 hover:text-blue-600 font-bold transition">
                   Click here to return immediately
                </Link>
             </div>
           ) : (
             <>
             <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
             <p className="text-center text-gray-500 mb-8">Sign in to your account</p>

           <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Captcha */}
              <div className="pt-2">
                 <FakeCaptcha onVerify={(val) => setCaptchaVerified(val)} />
              </div>

              <div className="pt-2">
                 <button 
                   type="submit" 
                   disabled={loading || !captchaVerified} 
                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg transition flex justify-center items-center gap-2"
                 >
                   {loading ? 'Authenticating...' : <>Login Securely <ArrowRight className="w-5 h-5" /></>}
                 </button>
              </div>
           </form>
            <p className="text-center mt-8 text-sm text-gray-600">
              Don't have an account? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Sign up</Link>
            </p>
            </>
           )}
        </motion.div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function FakeCaptcha({ onVerify }) {
  const [status, setStatus] = useState('idle'); // 'idle', 'verifying', 'verified'

  const handleVerify = () => {
    if (status !== 'idle') return;
    setStatus('verifying');
    setTimeout(() => {
      setStatus('verified');
      if (onVerify) onVerify(true);
    }, 1500); // simulate network verification
  };

  return (
    <div 
       onClick={handleVerify}
       className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition ${
          status === 'verified' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
       }`}
       style={{ minWidth: '280px' }}
    >
       <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded border flex items-center justify-center ${
            status === 'verified' ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'
          }`}>
             {status === 'verifying' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
             {status === 'verified' && <ShieldCheck className="w-4 h-4 text-white" />}
          </div>
          <span className={`text-sm font-semibold ${status === 'verified' ? 'text-emerald-700' : 'text-gray-700'}`}>
             {status === 'verifying' ? 'Verifying security...' : status === 'verified' ? 'Human Verification Passed' : 'Verify you are human'}
          </span>
       </div>
       <div className="flex flex-col items-end">
          <ShieldCheck className="w-6 h-6 text-gray-300" />
          <span className="text-[9px] text-gray-400 mt-0.5">Protected by YatraShield</span>
       </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { Users, Activity, Settings, Database, ServerCrash, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemOnline, setSystemOnline] = useState(true);

  const [users, setUsers] = useState([
    { id: 'USR-8991', name: 'Satya', email: 'user@example.com', status: 'Active', tier: 'Gold' },
    { id: 'USR-8992', name: 'Rahul S.', email: 'rahul@mail.com', status: 'Active', tier: 'Silver' },
    { id: 'USR-8993', name: 'Priya K.', email: 'priya@mail.com', status: 'Suspended', tier: 'Bronze' }
  ]);

  const handleDeleteUser = (id) => {
    if(confirm('Wipe user data completely?')) {
      setUsers(users.filter(u => u.id !== id));
      toast.success(`User ${id} completely wiped from database.`);
    }
  };

  const handleToggleSystem = () => {
    setSystemOnline(!systemOnline);
    if(systemOnline) toast.error('SYSTEM OFFLINE. Routing blocked.');
    else toast.success('SYSTEM ONLINE. Traffic flowing.');
  };

  const handleClearLogs = () => {
    toast.loading('Flushing AI & Server logs...', { duration: 1500 });
    setTimeout(() => toast.success('All logs cleared successfully!'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white min-h-screen p-6 flex flex-col shadow-2xl z-10 relative">
         <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-700">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-xl">Y</div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">YatraAdmin</h2>
              <p className="text-xs text-indigo-400 font-mono">v2.4.0-production</p>
            </div>
         </div>
         
         <nav className="flex-1 space-y-2">
           <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${activeTab === 'dashboard' ? 'bg-indigo-600 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
              <Activity className="w-5 h-5"/> Main Overview
           </button>
           <button onClick={() => setActiveTab('users')} className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${activeTab === 'users' ? 'bg-indigo-600 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
              <Users className="w-5 h-5"/> Manage Users
           </button>
           <button onClick={() => setActiveTab('bookings')} className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${activeTab === 'bookings' ? 'bg-indigo-600 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
              <FileText className="w-5 h-5"/> Booking Records
           </button>
           <button onClick={() => setActiveTab('settings')} className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${activeTab === 'settings' ? 'bg-indigo-600 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
              <Settings className="w-5 h-5"/> System Configuration
           </button>
         </nav>
         
         <button className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 font-bold py-3 px-4 rounded-xl transition mt-auto flex justify-center items-center gap-2">
           <ShieldAlert className="w-5 h-5" /> Terminate Session
         </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <div>
             <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">System Control</h1>
             <p className="text-slate-500 mt-1">Superuser access confirmed. Proceed with caution.</p>
           </div>
           <div className={`px-4 py-2 rounded-lg font-bold border flex items-center gap-2 ${systemOnline ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
             <div className={`w-3 h-3 rounded-full ${systemOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
             {systemOnline ? 'GLOBAL NETWORK ONLINE' : 'ROUTING SUSPENDED'}
           </div>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition">
                 <h3 className="text-slate-500 font-bold text-sm mb-2 uppercase">Total Registered</h3>
                 <p className="text-4xl font-black text-slate-800">4,289</p>
                 <span className="text-emerald-500 text-sm font-bold mt-2 inline-block">+12% this week</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition">
                 <h3 className="text-slate-500 font-bold text-sm mb-2 uppercase">Active PNRs</h3>
                 <p className="text-4xl font-black text-slate-800">892</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition">
                 <h3 className="text-slate-500 font-bold text-sm mb-2 uppercase">AI Queries</h3>
                 <p className="text-4xl font-black text-slate-800">12.4k</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition">
                 <h3 className="text-slate-500 font-bold text-sm mb-2 uppercase">Gross GMV</h3>
                 <p className="text-4xl font-black text-emerald-600">₹42.5M</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Live Traffic Logs</h2>
                  <button onClick={handleClearLogs} className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100">Flush DB Logs</button>
               </div>
               <div className="space-y-1">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-mono text-xs text-slate-500">{i}</div>
                        <div>
                          <p className="font-bold text-slate-800">New Payment Dispatched</p>
                          <p className="text-sm text-slate-500 font-mono">TXN-00{i*9928} (Credit Card) processed successfully</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Success</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
             <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Database className="text-indigo-600"/> User Database</h2>
             <table className="w-full text-left">
               <thead>
                 <tr className="text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
                   <th className="pb-4 font-bold">User UID</th>
                   <th className="pb-4 font-bold">Name & Email</th>
                   <th className="pb-4 font-bold">Tier</th>
                   <th className="pb-4 font-bold">Status</th>
                   <th className="pb-4 font-bold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-4 font-mono text-sm font-bold text-slate-600">{u.id}</td>
                      <td className="py-4">
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </td>
                      <td className="py-4"><span className="px-3 py-1 rounded bg-yellow-50 font-bold text-yellow-700 text-xs border border-yellow-200">{u.tier}</span></td>
                      <td className="py-4">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                           {u.status}
                         </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-indigo-600 hover:underline text-sm font-bold mr-4">Edit</button>
                        <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:underline text-sm font-bold">Nuke Data</button>
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><ServerCrash className="text-red-500"/> Core Infrastructure Controls</h2>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">Master Server Killswitch</p>
                        <p className="text-sm text-slate-500">Temporarily block all app routing and API payloads.</p>
                      </div>
                      <button onClick={handleToggleSystem} className={`px-6 py-2 rounded-lg font-bold transition text-white ${systemOnline ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                        {systemOnline ? 'Force Offline' : 'Restore Service'}
                      </button>
                   </div>
                   
                   <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">Reset Search Cache</p>
                        <p className="text-sm text-slate-500">Clear Redis AI route cache.</p>
                      </div>
                      <button onClick={() => toast.success('Cache cleared (0ms).')} className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold transition">
                        Clear Cache
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

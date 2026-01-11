
import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Heart, Coffee, Star, MapPin, 
  MessageSquare, Bell, Calendar, ArrowRight, ShieldCheck, 
  Handshake, Globe, Award, Settings, LogOut, Scale, 
  CheckCircle, Plus, Search, Filter, Bookmark, Info,
  ExternalLink, ChevronRight, Clock, Book, Sparkles, Save, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AssociateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  const [privacy, setPrivacy] = useState({
    publicProfile: false, // Default to false
    email: true,
    phone: false,
    specialization: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('uclf_associate_privacy');
    if (saved) setPrivacy(JSON.parse(saved));
  }, []);

  const savePrivacy = () => {
    localStorage.setItem('uclf_associate_privacy', JSON.stringify(privacy));
    alert('Public directory settings updated.');
  };

  const handleLogout = () => {
    localStorage.removeItem('uclf_user');
    navigate('/');
    window.location.reload();
  };

  const navItems = [
    { id: 'overview', name: 'Dashboard', icon: <Globe size={18} /> },
    { id: 'ethics', name: 'Ethics Hub', icon: <ShieldCheck size={18} /> },
    { id: 'fellowship', name: 'Fellowship Groups', icon: <Users size={18} /> },
    { id: 'events', name: 'Events & CLE', icon: <Calendar size={18} /> },
    { id: 'networking', name: 'Networking', icon: <Handshake size={18} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
  ];

  const stats = [
    { label: 'Fellowship Groups', value: '12', icon: <Coffee size={20} />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Seminars Attended', value: '5', icon: <BookOpen size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Networking Connections', value: '28', icon: <Users size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Mentorship Hours', value: '14', icon: <Star size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-8 border-b border-gray-100">
           <div className="flex items-center space-x-4 text-primary">
              <div className="h-14 w-14 flex items-center justify-center">
                <img src={UCLF_LOGO} alt="UCLF Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-xl tracking-tight font-serif italic">Associate Hub</span>
           </div>
        </div>
        <nav className="p-6 space-y-2 flex-grow">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-[1.25rem] transition-all font-bold text-sm ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className={activeTab === item.id ? 'text-secondary' : 'text-gray-400'}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
          <div className="bg-gray-50 p-4 rounded-2xl mb-6">
             <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-black">A</div>
                <div>
                   <p className="text-xs font-black text-gray-900 leading-none mb-1">Associate Member</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Region: Central</p>
                </div>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-red-500 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md px-10 py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40 shadow-sm">
           <div>
              <h1 className="text-3xl font-black text-gray-900 font-serif">
                {activeTab === 'overview' ? 'Fraternity Dashboard' : 
                 activeTab === 'ethics' ? 'Ethics Hub' : 
                 activeTab === 'fellowship' ? 'Fellowship Groups' : 
                 activeTab === 'events' ? 'Events & CLE' :
                 activeTab === 'networking' ? 'Professional Network' : 'Account Settings'}
              </h1>
              <div className="flex items-center mt-1.5 space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Session Active • 2024 Membership Verified</p>
              </div>
           </div>
           <div className="flex items-center space-x-6">
              <button className="p-3 bg-gray-50 text-gray-400 hover:text-primary transition-all rounded-2xl relative border border-gray-100 group">
                 <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                 <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-10 w-px bg-gray-200"></div>
              <Link to="/ai-assistant" className="hidden md:flex items-center space-x-3 bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <ShieldCheck size={18} className="text-secondary" />
                <span>AI Ethics Advisor</span>
              </Link>
           </div>
        </header>

        <div className="p-10 space-y-12">
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {stats.map(stat => (
                   <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                     <div className={`p-5 rounded-2xl w-fit mb-6 ${stat.bg} ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                     <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                   </div>
                 ))}
              </div>

              {/* Sidebar Content (Directory Promo) */}
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 font-serif">Member Visibility</h3>
                    <p className="text-sm text-gray-500">Control how your professional details appear in the public UCLF directory.</p>
                 </div>
                 <button onClick={() => setActiveTab('settings')} className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Manage Privacy</button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
               <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 font-serif mb-10 border-b pb-4">Directory Privacy</h2>
                  <div className="space-y-8">
                     <p className="text-sm text-gray-600 font-medium italic mb-6">"Speak up and judge fairly; defend the rights of the poor and needy." — Manage your public presence below.</p>
                     <div className="space-y-4">
                        {/* Global Visibility Toggle */}
                        <label className={`flex items-center justify-between p-8 rounded-3xl border-2 transition-all cursor-pointer ${privacy.publicProfile ? 'bg-primary text-white border-primary shadow-xl ring-4 ring-primary/5' : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-white'}`}>
                           <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-2xl ${privacy.publicProfile ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                 <Eye size={24} className={privacy.publicProfile ? 'text-secondary' : 'text-primary'} />
                              </div>
                              <div>
                                 <p className="font-black uppercase tracking-widest text-sm">View in public member directory</p>
                                 <p className={`text-xs mt-1 font-bold ${privacy.publicProfile ? 'text-blue-100' : 'text-gray-400'}`}>Allow others to find and connect with you</p>
                              </div>
                           </div>
                           <div className="relative">
                              <input type="checkbox" className="sr-only" checked={privacy.publicProfile} onChange={e => setPrivacy({...privacy, publicProfile: e.target.checked})} />
                              <div className={`w-14 h-7 rounded-full transition-colors ${privacy.publicProfile ? 'bg-secondary' : 'bg-gray-300'}`}>
                                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${privacy.publicProfile ? 'left-8' : 'left-1'}`}></div>
                              </div>
                           </div>
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                           <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white transition-all">
                              <div>
                                 <p className="font-black text-[11px] uppercase tracking-widest text-gray-900">Show Email</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5 rounded text-primary" checked={privacy.email} onChange={e => setPrivacy({...privacy, email: e.target.checked})} />
                           </label>
                           <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white transition-all">
                              <div>
                                 <p className="font-black text-[11px] uppercase tracking-widest text-gray-900">Show Phone</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5 rounded text-primary" checked={privacy.phone} onChange={e => setPrivacy({...privacy, phone: e.target.checked})} />
                           </label>
                           <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white transition-all">
                              <div>
                                 <p className="font-black text-[11px] uppercase tracking-widest text-gray-900">Show Specialty</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5 rounded text-primary" checked={privacy.specialization} onChange={e => setPrivacy({...privacy, specialization: e.target.checked})} />
                           </label>
                        </div>
                     </div>
                     <button onClick={savePrivacy} className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center hover:bg-blue-800 transition-all">
                        <Save size={18} className="mr-2" /> Commit Privacy Preferences
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssociateDashboard;


import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Phone, Mail, Award, GraduationCap, 
  Briefcase, ChevronRight, X, ShieldCheck, Scale, Eye, 
  Settings, EyeOff, Save, CheckCircle, Info
} from 'lucide-react';
import { MembershipTier, MemberProfile } from '../types';

const MOCK_MEMBERS: MemberProfile[] = [
  {
    id: 'm1',
    name: 'Counsel Martin Sabiiti',
    tier: MembershipTier.FULL,
    specialization: 'Criminal Defense, JLOS Policy',
    location: 'Kampala',
    email: 'martin.s@uclf.org.ug',
    phone: '+256 772 123 456',
    church: 'Watoto Church',
    visibility: { publicProfile: true, email: true, phone: true, specialization: true, location: true }
  },
  {
    id: 'm2',
    name: 'Anne Muhairwe',
    tier: MembershipTier.FULL,
    specialization: 'Public Administration Law',
    location: 'Kampala',
    email: 'anne.m@uclf.org.ug',
    phone: '+256 701 999 888',
    church: 'All Saints Cathedral',
    visibility: { publicProfile: true, email: true, phone: false, specialization: true, location: true }
  },
  {
    id: 'm3',
    name: 'David Komakech',
    tier: MembershipTier.FULL,
    specialization: 'Land Mediation',
    location: 'Gulu',
    email: 'david.k@uclf.org.ug',
    phone: '+256 752 444 333',
    church: 'Gulu Community Church',
    visibility: { publicProfile: true, email: true, phone: true, specialization: true, location: true }
  },
  {
    id: 'm4',
    name: 'Grace Aber',
    tier: MembershipTier.ASSOCIATE,
    specialization: 'Social Justice, Gender Law',
    location: 'Gulu',
    email: 'grace.a@uclf.org.ug',
    phone: '+256 781 000 111',
    church: 'St. Peters Cathedral',
    visibility: { publicProfile: true, email: true, phone: true, specialization: false, location: true }
  },
  {
    id: 'm5',
    name: 'Sarah Nakimera',
    tier: MembershipTier.STUDENT,
    specialization: 'LLB Year 3 Student',
    location: 'Mukono',
    email: 'sarah.n@ucu.ac.ug',
    phone: '+256 700 123 789',
    church: 'UCU Chapel',
    visibility: { publicProfile: true, email: false, phone: false, specialization: true, location: true }
  },
  {
    id: 'm6',
    name: 'Private Member Example',
    tier: MembershipTier.FULL,
    specialization: 'Confidential Practice',
    location: 'Kampala',
    email: 'private@uclf.org.ug',
    phone: '+256 000 000 000',
    church: 'Private Chapel',
    visibility: { publicProfile: false, email: false, phone: false, specialization: false, location: false }
  }
];

const MemberDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<'All' | MembershipTier>('All');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPrivacyPanel, setShowPrivacyPanel] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    email: true,
    phone: true,
    specialization: true
  });

  useEffect(() => {
    // Check for logged in user
    const userStr = localStorage.getItem('uclf_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      
      // Load their specific privacy settings if they exist
      const privacyKey = `uclf_privacy_${user.tier.toLowerCase()}`;
      const savedPrivacy = localStorage.getItem(privacyKey);
      if (savedPrivacy) {
        setPrivacySettings(JSON.parse(savedPrivacy));
      }
    }
  }, []);

  const savePrivacySettings = () => {
    if (currentUser) {
      const privacyKey = `uclf_privacy_${currentUser.tier.toLowerCase()}`;
      localStorage.setItem(privacyKey, JSON.stringify(privacySettings));
      setShowPrivacyPanel(false);
      alert('Your directory privacy settings have been updated.');
    }
  };

  const filteredMembers = useMemo(() => {
    // If the logged in user is one of the mock members, we update their visibility flags dynamically for display
    return MOCK_MEMBERS.map(m => {
      if (currentUser && (m.email === currentUser.email || m.name === currentUser.name)) {
        return { ...m, visibility: { ...m.visibility, ...privacySettings } };
      }
      return m;
    }).filter(m => {
      // Rule: Only members who have accepted to be viewed in the public directory
      if (!m.visibility.publicProfile) return false;

      const matchesSearch = 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.visibility.specialization && m.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
        m.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTier = activeTier === 'All' || m.tier === activeTier;
      
      return matchesSearch && matchesTier;
    });
  }, [searchTerm, activeTier, privacySettings, currentUser]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">Member Directory</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
            Browse verified UCLF members who have opted-in to the public fraternity registry.
          </p>
          
          <div className="mt-12 relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              className="w-full pl-16 pr-6 py-6 rounded-[2rem] shadow-2xl outline-none text-xl font-medium focus:ring-8 focus:ring-white/10 transition-all"
              placeholder="Search by name, specialization, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        
        {/* PRIVACY CONTROL PANEL FOR LOGGED IN USERS */}
        {currentUser && (
          <div className="mb-10 bg-white rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden animate-in slide-in-from-top-4 duration-500">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-50/50">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-secondary shadow-lg">
                  <Settings size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 leading-tight">My Directory Privacy</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your public presence</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrivacyPanel(!showPrivacyPanel)}
                className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  showPrivacyPanel ? 'bg-gray-200 text-gray-600' : 'bg-primary text-white shadow-lg shadow-primary/20'
                }`}
              >
                {showPrivacyPanel ? 'Close Settings' : 'Configure Visibility'}
              </button>
            </div>

            {showPrivacyPanel && (
              <div className="p-10 border-t border-gray-100 bg-white space-y-10 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Public Toggle */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Global Presence</label>
                    <button 
                      onClick={() => setPrivacySettings({...privacySettings, publicProfile: !privacySettings.publicProfile})}
                      className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                        privacySettings.publicProfile ? 'border-primary bg-blue-50 text-primary' : 'border-gray-100 bg-gray-50 text-gray-400'
                      }`}
                    >
                      {privacySettings.publicProfile ? <Eye className="mb-3" /> : <EyeOff className="mb-3" />}
                      <span className="text-xs font-black uppercase tracking-widest">Public Profile</span>
                    </button>
                  </div>
                  
                  {/* Info Toggles */}
                  {[
                    { key: 'email', label: 'Email Address', icon: <Mail size={18} /> },
                    { key: 'phone', label: 'Phone Number', icon: <Phone size={18} /> },
                    { key: 'specialization', label: 'Specialization', icon: <Scale size={18} /> },
                  ].map((field) => (
                    <div key={field.key} className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Toggle {field.label}</label>
                      <button 
                        disabled={!privacySettings.publicProfile}
                        onClick={() => setPrivacySettings({...privacySettings, [field.key]: !(privacySettings as any)[field.key]})}
                        className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          !(privacySettings as any)[field.key] || !privacySettings.publicProfile
                            ? 'border-gray-100 bg-gray-50 text-gray-300' 
                            : 'border-green-100 bg-green-50 text-green-600'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {field.icon}
                          <span className="text-xs font-black uppercase tracking-widest">{field.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          (privacySettings as any)[field.key] && privacySettings.publicProfile ? 'bg-green-500 border-green-500' : 'bg-transparent border-gray-200'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center text-xs font-medium text-gray-500 italic">
                    <Info size={16} className="mr-2 text-primary" />
                    Updates reflect immediately in the results below.
                  </div>
                  <button 
                    onClick={savePrivacySettings}
                    className="bg-primary text-white px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-800 transition-all flex items-center"
                  >
                    <Save size={16} className="mr-2" /> Commit Privacy Rules
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <Filter size={14} className="mr-2" /> Filter by Tier
              </h3>
              <div className="space-y-2">
                {['All', MembershipTier.FULL, MembershipTier.ASSOCIATE, MembershipTier.STUDENT].map((tier) => (
                  <button 
                    key={tier}
                    onClick={() => setActiveTier(tier as any)}
                    className={`w-full px-5 py-3 rounded-xl text-left text-sm font-bold transition-all ${
                      activeTier === tier 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 translate-x-2' 
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                 <div className="flex items-center text-[10px] font-black text-primary uppercase tracking-widest">
                    <ShieldCheck size={14} className="mr-2" /> Verified Registry
                 </div>
                 <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                   Only members who have explicitly enabled "Public Visibility" in their profile settings appear here.
                 </p>
              </div>
            </div>
          </aside>

          {/* Directory Grid */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className={`bg-white rounded-[2.5rem] p-8 border transition-all group flex flex-col relative overflow-hidden ${
                currentUser && (member.email === currentUser.email || member.name === currentUser.name)
                  ? 'border-primary ring-2 ring-primary/5 shadow-xl'
                  : 'border-gray-100 shadow-sm hover:shadow-xl'
              }`}>
                {currentUser && (member.email === currentUser.email || member.name === currentUser.name) && (
                  <div className="absolute top-0 right-0 bg-primary text-secondary px-4 py-1.5 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest">
                    My Public Listing
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-inner transition-transform group-hover:scale-110 ${
                      member.tier === MembershipTier.FULL ? 'bg-primary' : 
                      member.tier === MembershipTier.ASSOCIATE ? 'bg-orange-500' : 'bg-green-600'
                    }`}>
                      {member.tier === MembershipTier.FULL ? <Briefcase size={28} /> : 
                       member.tier === MembershipTier.ASSOCIATE ? <Award size={28} /> : <GraduationCap size={28} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight">{member.name}</h3>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">{member.tier}</p>
                    </div>
                  </div>
                  <MapPin size={18} className="text-secondary opacity-30" />
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center text-sm font-bold">
                     <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 text-gray-400">
                        <Scale size={16} />
                     </span>
                     {member.visibility.specialization ? (
                       <span className="text-gray-700">{member.specialization}</span>
                     ) : (
                       <span className="text-gray-300 italic font-medium">Information Private</span>
                     )}
                  </div>
                  <div className="flex items-center text-sm font-bold">
                     <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 text-gray-400"><MapPin size={16} /></span>
                     <span className="text-gray-700">{member.location} Hub</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                     <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 text-gray-400"><Mail size={16} /></span>
                     {member.visibility.email ? (
                       <a href={`mailto:${member.email}`} className="text-primary hover:underline">{member.email}</a>
                     ) : (
                       <span className="text-gray-300 italic font-medium">Contact Private</span>
                     )}
                  </div>
                  <div className="flex items-center text-sm font-bold">
                     <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 text-gray-400"><Phone size={16} /></span>
                     {member.visibility.phone ? (
                       <span className="text-gray-700">{member.phone}</span>
                     ) : (
                       <span className="text-gray-300 italic font-medium">Contact Private</span>
                     )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{member.church}</span>
                   </div>
                   <button className="text-primary font-black uppercase text-[10px] tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                     Profile Dossier <ChevronRight size={14} className="ml-1" />
                   </button>
                </div>
              </div>
            ))}
            
            {filteredMembers.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center">
                <div className="bg-gray-50 p-10 rounded-full mb-8 shadow-inner">
                  <Search size={64} className="text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 font-serif">No matching members found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto font-medium">Only members who have explicitly enabled public visibility appear in this directory.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveTier('All'); }}
                  className="mt-8 bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDirectory;


import React, { useState, useMemo, useEffect } from 'react';
import { 
  GraduationCap, Book, Users, Star, Calendar, MessageSquare, 
  Search, Bell, ArrowRight, BookOpen, Scale, Award, 
  MapPin, LogOut, FileText, Briefcase, Download, Filter, FileCode, Landmark, ShieldCheck,
  Clock, ArrowLeft, Settings, Save, Eye
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Resource {
  id: string;
  title: string;
  category: 'Legal Templates' | 'Case Law Summary' | 'Research Publication' | 'Christian Ethics' | 'Policy Brief' | 'Training Manual';
  date: string;
  size: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
}

const STUDENT_RESOURCES: Resource[] = [
  { id: '1', title: 'Standard Plaint Drafting Template', category: 'Legal Templates', date: 'Mar 2024', size: '1.2 MB', format: 'DOCX' },
  { id: '2', title: 'Uganda v. Kwoyelo: Trial Summary', category: 'Case Law Summary', date: 'Feb 2024', size: '2.4 MB', format: 'PDF' },
  { id: '3', title: 'Biblical Foundations of Justice', category: 'Christian Ethics', date: 'Jan 2024', size: '3.1 MB', format: 'PDF' },
  { id: '4', title: 'Juvenile Justice Policy Brief 2023', category: 'Policy Brief', date: 'Dec 2023', size: '1.8 MB', format: 'PDF' },
  { id: '5', title: 'Criminal Procedure Training Manual', category: 'Training Manual', date: 'Mar 2024', size: '5.6 MB', format: 'PDF' },
  { id: '6', title: 'Impact of ADR on Family Disputes in Uganda', category: 'Research Publication', date: 'Nov 2023', size: '4.2 MB', format: 'PDF' },
  { id: '7', title: 'Affidavit of Service Template', category: 'Legal Templates', date: 'Feb 2024', size: '0.8 MB', format: 'DOCX' },
  { id: '8', title: 'Supreme Court Ruling on Land Evictions', category: 'Case Law Summary', date: 'Jan 2024', size: '1.5 MB', format: 'PDF' },
];

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'internships' | 'moots' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  const [privacy, setPrivacy] = useState({
    publicProfile: true, // Opt-in
    email: false,
    university: true,
    location: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('uclf_student_privacy');
    if (saved) setPrivacy(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uclf_user');
    navigate('/');
    window.location.reload();
  };

  const savePrivacy = () => {
    localStorage.setItem('uclf_student_privacy', JSON.stringify(privacy));
    alert('Student profile privacy updated.');
  };

  const filteredResources = useMemo(() => {
    return STUDENT_RESOURCES.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const universityStats = [
    { label: 'Internship Applied', value: '3', icon: <Briefcase size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Moot Court Wins', value: '2', icon: <Scale size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Chapter Credits', value: '15', icon: <Star size={20} />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Fellowships', value: '8', icon: <Users size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const moots = [
    { title: 'Constitutional Moot 2024', date: 'April 28', university: 'Makerere University', status: 'Upcoming' },
    { title: 'Human Rights Dialogue', date: 'May 12', university: 'UCU Mukono', status: 'Registration Open' },
  ];

  const categories = ['All', 'Legal Templates', 'Case Law Summary', 'Research Publication', 'Christian Ethics', 'Policy Brief', 'Training Manual'];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center space-x-4 text-primary">
              <div className="h-12 w-12 flex items-center justify-center">
                <img src={UCLF_LOGO} alt="UCLF Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg">Student Hub</span>
           </div>
        </div>
        <nav className="p-4 space-y-1 flex-grow">
          {[
            { id: 'overview', name: 'Overview', icon: <BookOpen size={18} /> },
            { id: 'internships', name: 'Internships', icon: <Briefcase size={18} /> },
            { id: 'moots', name: 'Moot Courts', icon: <Scale size={18} /> },
            { id: 'resources', name: 'Resource Library', icon: <FileText size={18} /> },
            { id: 'settings', name: 'My Settings', icon: <Settings size={18} /> },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
           <div>
              <h1 className="text-2xl font-bold text-gray-900 font-serif lowercase capitalize">
                {activeTab === 'resources' ? 'Resource Library' : activeTab === 'overview' ? 'Student Dashboard' : activeTab}
              </h1>
              <p className="text-sm text-gray-500 text-green-600 font-bold uppercase tracking-widest text-[10px] mt-1">Law Chapter: UCU Mukono</p>
           </div>
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-2 border-white shadow-sm">
                S
              </div>
           </div>
        </header>

        <div className="p-8 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {universityStats.map(stat => (
                  <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className={`p-4 rounded-2xl w-fit mb-4 ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Internship Feed */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-gray-900 font-serif">Active Internship Opportunities</h2>
                      <button onClick={() => setActiveTab('internships')} className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { firm: 'UCLF Secretariat', role: 'Legal Intern (Pro-Bono)', type: 'Remote/Hybrid', deadline: 'May 10' },
                        { firm: 'High Court Gulu', role: 'Judicial Clerkship', type: 'On-site', deadline: 'May 25' },
                        { firm: 'Sabiiti & Co Advocates', role: 'Junior Law Clerk', type: 'Full-time Summer', deadline: 'June 01' }
                      ].map((job, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all group cursor-pointer">
                          <div className="flex items-center space-x-4">
                              <div className="bg-primary/5 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all"><Briefcase size={20} /></div>
                              <div>
                                <h4 className="font-bold text-sm text-gray-900">{job.role}</h4>
                                <p className="text-xs text-gray-500">{job.firm} • {job.type}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Apply by</p>
                              <p className="text-xs font-bold text-primary">{job.deadline}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar / Profile Card */}
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
                      <div className="w-24 h-24 rounded-full bg-green-50 mx-auto mb-6 flex items-center justify-center text-green-600 border-4 border-white shadow-inner">
                        <GraduationCap size={48} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 font-serif">Membership Status</h3>
                      <p className="text-xs text-gray-500 mb-6">Level: LLB Year 3</p>
                      <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-8">Verified Student Member</div>
                      
                      <div className="space-y-4 text-left border-t pt-6 border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">My Mentor</p>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-primary text-[10px]">GM</div>
                            <div>
                              <p className="text-xs font-bold text-gray-900">Counsel Grace M.</p>
                              <p className="text-[10px] text-gray-500">Senior Advocate</p>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
               <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 font-serif mb-10 border-b pb-4">Directory & Privacy</h2>
                  <div className="space-y-8">
                     <p className="text-sm text-gray-600 font-medium">Manage how you appear to mentors and recruiters in the searchable fraternity registry.</p>
                     <div className="space-y-4">
                        {/* Directory Opt-in Toggle */}
                        <label className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer ${privacy.publicProfile ? 'bg-primary text-white border-primary shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-white'}`}>
                           <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-xl ${privacy.publicProfile ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                 <Eye size={20} className={privacy.publicProfile ? 'text-secondary' : 'text-primary'} />
                              </div>
                              <div>
                                 <p className="font-black uppercase tracking-widest text-[11px]">View in public member directory</p>
                                 <p className={`text-[10px] font-bold ${privacy.publicProfile ? 'text-blue-100' : 'text-gray-400'}`}>Allow mentors to find you</p>
                              </div>
                           </div>
                           <input type="checkbox" className="sr-only" checked={privacy.publicProfile} onChange={e => setPrivacy({...privacy, publicProfile: e.target.checked})} />
                           <div className={`w-12 h-6 rounded-full relative transition-colors ${privacy.publicProfile ? 'bg-secondary' : 'bg-gray-300'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacy.publicProfile ? 'left-7' : 'left-1'}`}></div>
                           </div>
                        </label>

                        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white transition-all">
                           <div>
                              <p className="font-black text-gray-900">Show Email to Public</p>
                              <p className="text-xs text-gray-400">Allow recruiters and mentors to email you.</p>
                           </div>
                           <input type="checkbox" className="w-6 h-6 rounded text-primary" checked={privacy.email} onChange={e => setPrivacy({...privacy, email: e.target.checked})} />
                        </label>
                        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white transition-all">
                           <div>
                              <p className="font-black text-gray-900">Show My University</p>
                              <p className="text-xs text-gray-400">Display your current law faculty/university chapter.</p>
                           </div>
                           <input type="checkbox" className="w-6 h-6 rounded text-primary" checked={privacy.university} onChange={e => setPrivacy({...privacy, university: e.target.checked})} />
                        </label>
                     </div>
                     <button onClick={savePrivacy} className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center">
                        <Save size={18} className="mr-2" /> Save Settings
                     </button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Resource Library Header Controls */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-grow max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search resources, titles, or categories..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Resource Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((res) => (
                  <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all group flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${
                        res.category === 'Legal Templates' ? 'bg-blue-50 text-blue-600' :
                        res.category === 'Case Law Summary' ? 'bg-orange-50 text-orange-600' :
                        res.category === 'Christian Ethics' ? 'bg-purple-50 text-purple-600' :
                        res.category === 'Training Manual' ? 'bg-green-50 text-green-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                         <FileText size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{res.format}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {res.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

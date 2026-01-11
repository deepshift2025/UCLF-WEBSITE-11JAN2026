
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gavel, Filter, Search, MoreVertical, CheckCircle, Clock, 
  AlertCircle, ChevronRight, ChevronLeft, User, MapPin, Calendar as CalendarIcon, 
  Download, Plus, PieChart, Briefcase, FileText, Settings,
  Scale, Users, Upload, ExternalLink, ShieldCheck, Save,
  LogOut, Trash2, BookOpen, Bookmark, X, ArrowLeft, ArrowRight,
  ChevronDown, MessageSquare, Eye, Phone, Activity
} from 'lucide-react';
import { CaseStatus, UrgencyLevel, LegalProgram, LegalAidRequest } from '../types';
import { useNavigate } from 'react-router-dom';

const INITIAL_CASES: LegalAidRequest[] = [
  {
    id: '1',
    caseRef: 'UCLF-2024-8192',
    requesterName: 'Jane Nakato',
    requesterContact: '0701XXXXXX',
    description: 'High Court Bail application for capital offense suspect. The applicant has been in custody for over 120 days without trial.',
    urgency: UrgencyLevel.HIGH,
    status: CaseStatus.IN_PROGRESS,
    submissionDate: '2024-03-15',
    program: LegalProgram.BAIL_BOND_ASSIST,
    courtLevel: 'High Court',
    assignedAdvocate: 'Counsel David K.',
    latestUpdate: 'Sureties verified by regional coordinator. Hearing set for next Tuesday.'
  },
  {
    id: '2',
    caseRef: 'UCLF-2024-7721',
    requesterName: 'John Baptist',
    requesterContact: '0772XXXXXX',
    description: 'Plea bargain coordination for 15 inmates in Kayunga Prison. Minor offenses including theft and common assault.',
    urgency: UrgencyLevel.MEDIUM,
    status: CaseStatus.ASSIGNED,
    submissionDate: '2024-03-10',
    program: LegalProgram.KAYUNGA_PLEA_BARGAIN,
    courtLevel: 'Chief Magistrates Court',
    assignedAdvocate: 'Current User',
    latestUpdate: 'Preliminary list of candidates sent to DPP for review.'
  },
  {
    id: '3',
    caseRef: 'UCLF-2024-5501',
    requesterName: 'Sarah Namono',
    requesterContact: '0755XXXXXX',
    description: 'Land eviction case for widow in Masaka region. Attempted land grabbing by extended family members.',
    urgency: UrgencyLevel.HIGH,
    status: CaseStatus.PENDING,
    submissionDate: '2024-03-18',
    program: LegalProgram.LAND_MEDIATION,
    courtLevel: 'High Court - Land Division',
    latestUpdate: 'Initial assessment completed. Waiting for regional hub verification of indigent status.'
  },
  {
    id: '4',
    caseRef: 'UCLF-2024-6612',
    requesterName: 'Moses Okello',
    requesterContact: '0788XXXXXX',
    description: 'Magistrates representation for theft charge. Suspect claims mistaken identity.',
    urgency: UrgencyLevel.LOW,
    status: CaseStatus.ASSIGNED,
    submissionDate: '2024-03-20',
    program: LegalProgram.MAGISTRATES_REP,
    courtLevel: 'Magistrates Court Grade I',
    assignedAdvocate: 'Current User',
    latestUpdate: 'File requisitioned from police. First mention next Friday.'
  }
];

const CaseManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeSidebarTab, setActiveSidebarTab] = useState('overview');
  const [caseList, setCaseList] = useState<LegalAidRequest[]>(INITIAL_CASES);
  
  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  // Filtering & Search State
  const [caseFilter, setCaseFilter] = useState<'all' | 'assigned' | 'pending' | 'urgent'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [docSearchTerm, setDocSearchTerm] = useState('');

  // Modals State
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<LegalAidRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // New Case Form State
  const [newCase, setNewCase] = useState<Partial<LegalAidRequest>>({
    requesterName: '',
    program: LegalProgram.MAGISTRATES_REP,
    urgency: UrgencyLevel.MEDIUM,
    description: ''
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    publicProfile: true, 
    email: true,
    phone: true,
    specialization: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('uclf_advocate_privacy');
    if (saved) setPrivacy(JSON.parse(saved));
  }, []);

  const savePrivacy = () => {
    localStorage.setItem('uclf_advocate_privacy', JSON.stringify(privacy));
    alert('Directory privacy settings updated successfully.');
  };

  const handleLogout = () => {
    localStorage.removeItem('uclf_user');
    navigate('/');
    window.location.reload();
  };

  const filteredCases = useMemo(() => {
    return caseList.filter(c => {
      const matchesSearch = c.caseRef.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           c.requesterName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTabFilter = (() => {
        if (caseFilter === 'all') return true;
        if (caseFilter === 'assigned') return c.status !== CaseStatus.PENDING;
        if (caseFilter === 'pending') return c.status === CaseStatus.PENDING;
        if (caseFilter === 'urgent') return c.urgency === UrgencyLevel.HIGH;
        return true;
      })();

      if (activeSidebarTab === 'pro-bono') {
        return matchesSearch && c.assignedAdvocate === 'Current User';
      }
      
      return matchesSearch && matchesTabFilter;
    });
  }, [searchTerm, caseFilter, activeSidebarTab, caseList]);

  const stats = [
    { id: 'all', label: 'Total Cases', value: '428', icon: <Gavel size={20} />, color: 'text-primary' },
    { id: 'resolved', label: 'Resolved', value: '312', icon: <CheckCircle size={20} />, color: 'text-green-600' },
    { id: 'pending', label: 'Pending Aid', value: '24', icon: <Clock size={20} />, color: 'text-yellow-600' },
    { id: 'urgent', label: 'Urgent', value: '8', icon: <AlertCircle size={20} />, color: 'text-red-600' }
  ];

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(7);
    const created: LegalAidRequest = {
      ...newCase as LegalAidRequest,
      id,
      caseRef: `UCLF-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      status: CaseStatus.PENDING,
      submissionDate: new Date().toISOString().split('T')[0],
      courtLevel: 'Pending Assessment',
      latestUpdate: 'New intake created. Awaiting secretariat review.'
    };
    setCaseList([created, ...caseList]);
    setIsIntakeModalOpen(false);
    setNewCase({ requesterName: '', program: LegalProgram.MAGISTRATES_REP, urgency: UrgencyLevel.MEDIUM, description: '' });
  };

  const updateCaseStatus = (caseId: string, newStatus: CaseStatus) => {
    setCaseList(prev => prev.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    setIsDetailModalOpen(false);
  };

  const getUrgencyColor = (u: UrgencyLevel) => {
    switch(u) {
      case UrgencyLevel.HIGH: return 'bg-red-50 text-red-600 border-red-100';
      case UrgencyLevel.MEDIUM: return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case UrgencyLevel.LOW: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusColor = (s: CaseStatus) => {
    switch(s) {
      case CaseStatus.IN_PROGRESS: return 'bg-yellow-500 text-white';
      case CaseStatus.ASSIGNED: return 'bg-blue-600 text-white';
      case CaseStatus.RESOLVED: return 'bg-green-600 text-white';
      case CaseStatus.PENDING: return 'bg-orange-500 text-white';
      case CaseStatus.CLOSED: return 'bg-slate-800 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1e3a8a] hidden lg:flex flex-col text-white">
        <div className="p-8 border-b border-white/10">
           <div className="flex items-center space-x-4">
              <div className="h-14 w-14 flex items-center justify-center">
                <img src={UCLF_LOGO} alt="UCLF Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-xl tracking-tight">Counsel Hub</span>
           </div>
        </div>
        <nav className="p-4 space-y-1 flex-grow mt-6">
          {[
            { id: 'overview', name: 'Case Overview', icon: <PieChart size={18} /> },
            { id: 'pro-bono', name: 'My Pro-Bono List', icon: <Gavel size={18} /> },
            { id: 'docs', name: 'Document Library', icon: <FileText size={18} /> },
            { id: 'calendar', name: 'Legal Agenda', icon: <CalendarIcon size={18} /> },
            { id: 'settings', name: 'Profile & Settings', icon: <Settings size={18} /> },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveSidebarTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-semibold text-sm ${activeSidebarTab === item.id ? 'bg-white/10 text-secondary border-r-4 border-secondary' : 'text-blue-100 hover:bg-white/5'}`}
            >
              <span className={activeSidebarTab === item.id ? 'text-secondary' : 'text-blue-300'}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl mb-4">
             <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">C</div>
                <div>
                   <p className="text-xs font-bold">Counsel David</p>
                   <p className="text-[10px] text-blue-300">Senior Advocate</p>
                </div>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-6 py-3 rounded-xl text-red-300 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white px-10 py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40 shadow-sm">
           <div className="flex items-center space-x-4">
              <div className="lg:hidden">
                 <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><MoreVertical /></button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-serif">
                  {activeSidebarTab === 'overview' ? 'Fraternity Dashboard' : 
                   activeSidebarTab === 'pro-bono' ? 'My Case Load' : 
                   activeSidebarTab === 'docs' ? 'Statutes & Precedents' : 
                   activeSidebarTab === 'calendar' ? 'Court Schedule' : 'Professional Profile'}
                </h1>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-sm text-gray-500 font-medium">System Active • Regional Gulu Hub Synced</p>
                </div>
              </div>
           </div>
           <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsIntakeModalOpen(true)}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus size={20} className="mr-2" /> Log Case Intake
              </button>
           </div>
        </header>

        <div className="p-10 space-y-10">
          
          {(activeSidebarTab === 'overview' || activeSidebarTab === 'pro-bono') && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {/* Interactive Stats Grid */}
              {activeSidebarTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map(stat => (
                    <button 
                      key={stat.id} 
                      onClick={() => setCaseFilter(stat.id as any)}
                      className={`bg-white p-8 rounded-[2rem] border transition-all text-left flex items-center space-x-6 hover:shadow-xl ${caseFilter === stat.id ? 'border-primary ring-4 ring-primary/5 shadow-lg' : 'border-gray-100 shadow-sm'}`}
                    >
                      <div className={`p-5 rounded-2xl bg-gray-50 ${stat.color} shadow-inner`}>{stat.icon}</div>
                      <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 leading-none">{stat.value}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Case Management Workspace */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center space-x-6">
                      {activeSidebarTab === 'overview' && (
                        <div className="flex p-1 bg-gray-100 rounded-2xl space-x-1">
                          {['all', 'assigned', 'pending'].map(tab => (
                            <button 
                              key={tab} 
                              onClick={() => setCaseFilter(tab as any)}
                              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${caseFilter === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                      <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <Filter size={14} className="mr-2" /> 
                        {filteredCases.length} Results Found
                      </div>
                  </div>
                  <div className="relative w-full md:w-80 group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search ref, applicant, or lawyer..." 
                        className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-gray-50 border border-transparent outline-none text-sm font-medium focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <tr>
                            <th className="px-10 py-5">Ref & Applicant</th>
                            <th className="px-10 py-5">Program & Venue</th>
                            <th className="px-10 py-5">Workflow State</th>
                            <th className="px-10 py-5">Urgency</th>
                            <th className="px-10 py-5">Log Date</th>
                            <th className="px-10 py-5 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredCases.map(c => (
                            <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => { setSelectedCase(c); setIsDetailModalOpen(true); }}>
                              <td className="px-10 py-7">
                                  <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary font-bold text-sm">
                                        {c.requesterName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 mb-0.5">{c.caseRef}</p>
                                        <p className="text-xs text-gray-500 font-medium">{c.requesterName}</p>
                                    </div>
                                  </div>
                              </td>
                              <td className="px-10 py-7">
                                  <p className="text-sm font-bold text-gray-700 mb-1">{c.program}</p>
                                  <p className="text-[10px] font-bold text-primary uppercase flex items-center tracking-tight">
                                    <MapPin size={10} className="mr-1.5" /> {c.courtLevel}
                                  </p>
                              </td>
                              <td className="px-10 py-7">
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusColor(c.status)}`}>
                                      {c.status}
                                    </span>
                                    {c.assignedAdvocate && c.assignedAdvocate !== 'Current User' && (
                                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm" title={`Counsel: ${c.assignedAdvocate}`}>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.assignedAdvocate}`} alt="advocate" />
                                      </div>
                                    )}
                                  </div>
                              </td>
                              <td className="px-10 py-7">
                                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border-2 ${getUrgencyColor(c.urgency)}`}>
                                    {c.urgency}
                                  </span>
                              </td>
                              <td className="px-10 py-7 text-sm font-medium text-gray-500">{c.submissionDate}</td>
                              <td className="px-10 py-7">
                                  <div className="flex items-center justify-center space-x-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2.5 text-gray-400 hover:text-primary transition-all bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-110"><Eye size={18} /></button>
                                    <button className="p-2.5 text-gray-400 hover:text-primary transition-all bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-110"><Settings size={18} /></button>
                                    <button className="p-2.5 text-gray-400 hover:text-primary transition-all bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-110"><Download size={18} /></button>
                                  </div>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs omitted for brevity, same as existing */}
          {activeSidebarTab === 'docs' && <div>Document Library Content...</div>}
          {activeSidebarTab === 'calendar' && <div>Calendar Content...</div>}
          {activeSidebarTab === 'settings' && <div>Settings Content...</div>}
        </div>
      </main>

      {/* Case Intake Modal - Same as existing */}
      {isIntakeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsIntakeModalOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-3xl relative z-10 shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <header className="bg-primary p-10 text-white flex items-center justify-between">
                <div>
                   <h2 className="text-3xl font-black font-serif">New Case Intake</h2>
                   <p className="text-xs text-blue-200 uppercase font-black tracking-widest mt-1">UCLF Legal Aid Repository</p>
                </div>
                <button onClick={() => setIsIntakeModalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X size={28} /></button>
             </header>
             <form onSubmit={handleCreateCase} className="p-12 space-y-8">
                {/* Form fields same as existing */}
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center">
                  <Save size={20} className="mr-3" /> Save and Sync Case
                </button>
             </form>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE CASE DETAIL MODAL */}
      {isDetailModalOpen && selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-5xl relative z-10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-400 h-[90vh] flex flex-col">
             
             {/* Modal Header */}
             <header className="bg-primary p-10 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary border border-white/20 shadow-inner">
                      <FileText size={32} />
                   </div>
                   <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h2 className="text-3xl font-black font-serif">{selectedCase.caseRef}</h2>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(selectedCase.status)}`}>
                          {selectedCase.status}
                        </span>
                      </div>
                      <p className="text-xs text-blue-200 uppercase font-black tracking-widest">Master Case Dossier • Republic of Uganda Registry</p>
                   </div>
                </div>
                <button onClick={() => setIsDetailModalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                  <X size={32} />
                </button>
             </header>

             <div className="flex-grow overflow-y-auto flex flex-col lg:flex-row">
                {/* Left Column: Primary Details */}
                <div className="flex-grow p-12 space-y-12">
                   
                   {/* Applicant Info Section */}
                   <section>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center">
                        <User size={16} className="mr-2 text-primary" /> Applicant Identity & Context
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Legal Name</p>
                            <p className="text-lg font-black text-gray-900">{selectedCase.requesterName}</p>
                         </div>
                         <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact Verification</p>
                            <p className="text-lg font-black text-primary flex items-center">
                               <Phone size={16} className="mr-2" /> {selectedCase.requesterContact}
                            </p>
                         </div>
                      </div>
                   </section>

                   {/* Case Specifics */}
                   <section>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center">
                        <Gavel size={16} className="mr-2 text-primary" /> Legal Program & Jurisdiction
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="flex items-start space-x-4 p-6 bg-blue-50/30 rounded-3xl border border-blue-50">
                            <div className="bg-white p-3 rounded-2xl text-primary shadow-sm"><Scale size={24} /></div>
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Fraternity Program</p>
                               <p className="font-black text-gray-900 leading-tight">{selectedCase.program}</p>
                            </div>
                         </div>
                         <div className="flex items-start space-x-4 p-6 bg-blue-50/30 rounded-3xl border border-blue-50">
                            <div className="bg-white p-3 rounded-2xl text-primary shadow-sm"><MapPin size={24} /></div>
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Court Venue</p>
                               <p className="font-black text-gray-900 leading-tight">{selectedCase.courtLevel}</p>
                            </div>
                         </div>
                      </div>
                   </section>

                   {/* Case Narrative */}
                   <section>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Case Summary & Narrative</h3>
                      <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-inner">
                         <p className="text-gray-700 leading-relaxed italic font-medium">"{selectedCase.description}"</p>
                      </div>
                   </section>

                   {/* Timeline / Updates */}
                   <section>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center">
                        <Activity size={16} className="mr-2 text-primary" /> Secretariat Intelligence
                      </h3>
                      <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 flex items-start space-x-6 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><MessageSquare size={100} /></div>
                         <div className="bg-primary p-4 rounded-2xl text-secondary shadow-lg shrink-0"><MessageSquare size={24} /></div>
                         <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-2">
                               <p className="text-[10px] font-black text-primary uppercase tracking-widest">Latest Progress Note</p>
                               <span className="w-1 h-1 bg-primary/20 rounded-full"></span>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged by Regional Lead</p>
                            </div>
                            <p className="text-base font-bold text-primary leading-relaxed italic">"{selectedCase.latestUpdate || 'No updates logged for this dossier yet.'}"</p>
                         </div>
                      </div>
                   </section>
                </div>

                {/* Right Column: Metadata & Workflow Actions */}
                <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
                   <div className="p-12 space-y-12 flex-grow">
                      {/* Technical Meta Grid */}
                      <section className="space-y-6">
                         <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-200 pb-4">Metadata Analysis</h3>
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Case Urgency</span>
                               <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${getUrgencyColor(selectedCase.urgency)}`}>
                                 {selectedCase.urgency}
                               </span>
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Log Date</span>
                               <span className="text-sm font-black text-gray-900">{selectedCase.submissionDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned Advocate</span>
                               <span className="text-sm font-black text-primary">{selectedCase.assignedAdvocate || 'Unassigned'}</span>
                            </div>
                         </div>
                      </section>

                      {/* Action Workflow */}
                      <section className="space-y-8">
                         <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-200 pb-4">Workflow Transition</h3>
                         <div className="grid grid-cols-1 gap-4">
                            {[
                              { status: CaseStatus.ASSIGNED, color: 'bg-blue-600 hover:bg-blue-700', icon: <User size={16} /> },
                              { status: CaseStatus.IN_PROGRESS, color: 'bg-yellow-500 hover:bg-yellow-600', icon: <Clock size={16} /> },
                              { status: CaseStatus.RESOLVED, color: 'bg-green-600 hover:bg-green-700', icon: <CheckCircle size={16} /> },
                              { status: CaseStatus.CLOSED, color: 'bg-slate-800 hover:bg-black', icon: <X size={16} /> }
                            ].map(btn => (
                              <button 
                                key={btn.status}
                                onClick={() => updateCaseStatus(selectedCase.id, btn.status)}
                                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center text-white ${btn.color} active:scale-95`}
                              >
                                {btn.icon} <span className="ml-3">Mark {btn.status}</span>
                              </button>
                            ))}
                         </div>
                      </section>
                   </div>

                   {/* Persistent Footer Actions */}
                   <footer className="p-12 border-t border-gray-200 space-y-4">
                      <button className="w-full py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm">
                        <Download size={16} className="mr-3 text-primary" /> Export Case Dossier
                      </button>
                      <button className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-red-50 transition-all">
                        <Trash2 size={16} className="mr-3" /> Archive Record
                      </button>
                   </footer>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;

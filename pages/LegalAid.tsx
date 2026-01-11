
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, Search, CheckCircle, ShieldQuestion, Scale, Users, ShieldAlert, 
  HeartHandshake, ChevronRight, FileUp, ClipboardList, AlertCircle, 
  ArrowLeft, ArrowRight, User, MapPin, X, FileText, ImageIcon, 
  Loader2, Clock, History, ExternalLink, Gavel, Sparkles, BookOpen,
  MessageSquare, ShieldCheck, Info
} from 'lucide-react';
import { UrgencyLevel, CaseStatus, LegalAidRequest, LegalProgram } from '../types';

// Fix: Declared 'Globe' before its usage in 'PROGRAMS_DETAIL' to avoid block-scoped variable error.
const Globe = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  error?: string;
}

const MOCK_CASES: LegalAidRequest[] = [
  {
    id: '1',
    caseRef: 'UCLF-2024-8192',
    requesterName: 'John Doe',
    requesterContact: '0701234567',
    description: 'Land dispute regarding family property in Kayunga.',
    urgency: UrgencyLevel.HIGH,
    status: CaseStatus.IN_PROGRESS,
    submissionDate: '2024-03-15',
    program: LegalProgram.LAND_MEDIATION,
    latestUpdate: "Initial mediation session scheduled for next week."
  },
  {
    id: '2',
    caseRef: 'UCLF-2024-9001',
    requesterName: 'Moses Okello',
    requesterContact: '0771234567',
    description: 'Bail application for suspect in detention over 48 hours.',
    urgency: UrgencyLevel.HIGH,
    status: CaseStatus.ASSIGNED,
    submissionDate: '2024-03-20',
    program: LegalProgram.BAIL_BOND_ASSIST,
    assignedAdvocate: "Counsel Grace Aber",
    latestUpdate: "Advocate assigned. Police bond papers being processed."
  }
];

const PROGRAMS_DETAIL = [
  { 
    id: LegalProgram.CAPITAL_DEFENSE, 
    title: 'Capital Defense', 
    desc: 'Defense for indigent persons facing capital charges at the High Court level.',
    icon: <ShieldAlert className="text-red-600" />
  },
  { 
    id: LegalProgram.LAND_MEDIATION, 
    title: 'Land Mediation', 
    desc: 'Resolving land disputes through Alternative Dispute Resolution (ADR) for widows and orphans.',
    icon: <Scale className="text-primary" />
  },
  { 
    id: LegalProgram.REFUGEE_PROTECTION, 
    title: 'Refugee Protection', 
    desc: 'Legal aid and documentation assistance for displaced populations in West Nile and Central regions.',
    icon: <Globe size={24} className="text-blue-600" />
  },
  { 
    id: LegalProgram.KAYUNGA_PLEA_BARGAIN, 
    title: 'Kayunga Plea Bargain', 
    desc: 'Strategic intervention in Kayunga to reduce case backlog and secure fair hearings for minor offenders.',
    icon: <Gavel className="text-secondary" />
  }
];

const LegalAid: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [trackingRef, setTrackingRef] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<LegalAidRequest | null | 'not-found'>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    program: LegalProgram.CAPITAL_DEFENSE,
    courtLevel: 'High Court',
    description: '',
    urgency: UrgencyLevel.LOW,
    isIndigent: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f: File) => ({
        id: Math.random().toString(36).substring(7),
        file: f,
        progress: 100,
        error: f.size > 5 * 1024 * 1024 ? "File too large (>5MB)" : undefined
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleTrackCase = () => {
    if (!trackingRef.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const found = MOCK_CASES.find(c => c.caseRef.toLowerCase() === trackingRef.trim().toLowerCase());
      setTrackingResult(found || 'not-found');
      setIsSearching(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-primary text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80" alt="court" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-serif">Legal Aid & Justice Portal</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto italic font-medium leading-relaxed">
            "Speak up and judge fairly; defend the rights of the poor and needy." — Proverbs 31:9
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* RESTORED: AI Legal Assistant Banner */}
        <div className="mb-16 bg-white rounded-[2.5rem] p-10 text-gray-900 relative overflow-hidden shadow-2xl border border-blue-100 group animate-in fade-in slide-in-from-top duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
            <Sparkles size={240} className="text-primary" />
          </div>
          <div className="relative z-10 lg:flex items-center justify-between gap-12">
            <div className="mb-8 lg:mb-0 lg:max-w-3xl">
              <div className="inline-flex items-center space-x-3 bg-primary/10 text-primary px-5 py-2 rounded-full mb-6 border border-primary/20 shadow-sm">
                <Sparkles size={18} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Consult our Legal AI</span>
              </div>
              <h2 className="text-4xl font-black mb-6 font-serif text-gray-900 leading-tight">Virtual Legal Aid Assistant</h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Need instant clarification on Ugandan law or professional ethics? Our AI is trained on the <strong className="text-primary">Constitution of Uganda</strong> and judicial precedents to provide preliminary guidance.
              </p>
            </div>
            <Link 
              to="/ai-assistant" 
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-800 transition-all shadow-xl hover:shadow-primary/30 inline-flex items-center shrink-0 group-hover:translate-x-2"
            >
              Start AI Consultation <ArrowRight className="ml-3" />
            </Link>
          </div>
        </div>

        {/* RESTORED: Specialized Programs Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 font-serif">Our Specialized Programs</h2>
              <p className="text-gray-500 mt-1">UCLF provides targeted interventions for marginalized populations.</p>
            </div>
            <div className="hidden md:flex items-center text-[10px] font-black text-primary uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl">
              <ShieldCheck size={14} className="mr-2" /> Licensed Legal Aid Provider
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS_DETAIL.map((prog) => (
              <div key={prog.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="bg-gray-50 p-4 rounded-2xl w-fit mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  {prog.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">{prog.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed italic font-medium">{prog.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Intake Form Column */}
          <div className="lg:col-span-8">
            {!submitted ? (
              <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 lg:p-12">
                <div className="mb-12">
                  <h2 className="text-3xl font-black text-gray-900 font-serif mb-2">Apply for Legal Aid</h2>
                  <p className="text-gray-500 text-sm">Please follow the 3-step process to lodge your application in our repository.</p>
                </div>

                <div className="flex items-center space-x-4 mb-12">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`flex items-center ${i < 3 ? 'flex-1' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all shadow-sm ${step >= i ? 'bg-primary text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        {i}
                      </div>
                      {i < 3 && <div className={`h-1 flex-1 mx-2 rounded-full ${step > i ? 'bg-primary' : 'bg-gray-100'}`}></div>}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-500">
                      <h3 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-4">Personal & Contact Identity</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Legal Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm bg-gray-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm bg-gray-50" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Resident District / Location</label>
                        <input required type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm bg-gray-50" placeholder="e.g. Kayunga, Gulu, Arua..." value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-500">
                      <h3 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-4">Case Details & Mapping</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Legal Program</label>
                          <select className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 bg-white font-bold text-sm appearance-none cursor-pointer" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value as LegalProgram})}>
                            {Object.values(LegalProgram).map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Court Level</label>
                          <select className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 bg-white font-bold text-sm appearance-none cursor-pointer" value={formData.courtLevel} onChange={e => setFormData({...formData, courtLevel: e.target.value})}>
                            <option>High Court</option>
                            <option>Chief Magistrates Court</option>
                            <option>Magistrates Court Grade I</option>
                            <option>Magistrates Court Grade II</option>
                            <option>Supreme Court / Court of Appeal</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Case Urgency</label>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.values(UrgencyLevel).map(u => (
                            <button key={u} type="button" onClick={() => setFormData({...formData, urgency: u})} className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${formData.urgency === u ? 'border-primary bg-blue-50 text-primary shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Incident Summary</label>
                        <textarea rows={4} className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 bg-gray-50 font-medium text-sm resize-none" placeholder="Please describe the legal issue concisely..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-500">
                      <h3 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-4">Verification & Attachments</h3>
                      <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-primary p-2 rounded-xl text-secondary shadow-md"><ShieldCheck size={20} /></div>
                          <h4 className="font-black text-primary font-serif">Indigence Verification</h4>
                        </div>
                        <label className="flex items-start space-x-4 cursor-pointer group">
                          <div className="mt-1">
                            <input type="checkbox" className="w-6 h-6 rounded-lg text-primary border-primary/20 focus:ring-primary cursor-pointer" checked={formData.isIndigent} onChange={e => setFormData({...formData, isIndigent: e.target.checked})} />
                          </div>
                          <span className="text-sm font-bold text-blue-900 group-hover:text-primary transition-colors leading-relaxed italic">
                            "I solemnly declare that I lack the financial capacity to engage private legal counsel and request UCLF pro-bono assistance."
                          </span>
                        </label>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Supporting Evidence (Bond, Summons, etc.)</label>
                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-primary transition-all cursor-pointer group bg-gray-50/30 hover:bg-white">
                          <FileUp className="mx-auto mb-4 text-gray-300 group-hover:text-primary group-hover:scale-110 transition-transform" size={48} />
                          <p className="text-sm font-black text-gray-500 group-hover:text-primary uppercase tracking-widest">Select files for encrypted upload</p>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
                      </div>
                      {files.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {files.map(f => (
                            <div key={f.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm animate-in zoom-in duration-300">
                              <div className="flex items-center space-x-3 overflow-hidden">
                                <div className="bg-blue-50 p-2.5 rounded-xl text-primary shadow-inner"><FileText size={18} /></div>
                                <span className="text-xs font-bold text-gray-700 truncate">{f.file.name}</span>
                              </div>
                              <CheckCircle size={18} className="text-green-500 shrink-0" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                    {step > 1 ? (
                      <button type="button" onClick={() => setStep(step - 1)} className="flex items-center font-black text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-all">
                        <ArrowLeft size={18} className="mr-2" /> Navigate Back
                      </button>
                    ) : <div />}
                    <button type="submit" className="bg-primary text-white px-16 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center hover:bg-blue-800 transition-all shadow-2xl shadow-primary/20 active:scale-95">
                      {step === 3 ? "Authorize Submission" : "Continue Mapping"} <ArrowRight size={18} className="ml-3" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center shadow-2xl border border-gray-100 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <CheckCircle size={64} />
                </div>
                <h2 className="text-4xl font-black mb-4 font-serif text-gray-900">Application Lodged</h2>
                <p className="text-gray-500 mb-12 max-w-md mx-auto italic font-medium leading-relaxed">
                  Your case dossier has been securely logged. Use this authority reference to monitor progress with the Secretariat:
                </p>
                <div className="bg-gray-900 inline-block px-12 py-6 rounded-[2rem] border-4 border-primary/20 font-mono font-black text-2xl text-secondary mb-16 shadow-2xl">
                  UCLF-2024-8192
                </div>
                <div className="flex flex-col items-center">
                  <button onClick={() => setSubmitted(false)} className="text-primary font-black uppercase tracking-widest text-xs hover:underline flex items-center">
                    Log Another Intake <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Tools Column */}
          <div className="lg:col-span-4 space-y-10">
            {/* Case Tracker Widget */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Search size={140} className="text-primary" /></div>
              <h3 className="text-xl font-black mb-8 font-serif flex items-center text-primary relative z-10">
                <Search size={22} className="mr-3 text-secondary" /> Registry Tracker
              </h3>
              <div className="relative mb-8 z-10">
                <input 
                  type="text" 
                  className="w-full pl-6 pr-14 py-5 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 font-bold text-sm transition-all" 
                  placeholder="Ref: UCLF-2024-..." 
                  value={trackingRef} 
                  onChange={e => setTrackingRef(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleTrackCase()}
                />
                <button onClick={handleTrackCase} className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                  {isSearching ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={24} />}
                </button>
              </div>

              {trackingResult && trackingResult !== 'not-found' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-top duration-500 relative z-10">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      trackingResult.status === CaseStatus.IN_PROGRESS ? 'bg-yellow-500 text-white' :
                      trackingResult.status === CaseStatus.ASSIGNED ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {trackingResult.status}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{trackingResult.submissionDate}</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/5 p-3 rounded-xl text-primary shadow-inner shrink-0"><Gavel size={18} /></div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Assigned Program</p>
                        <p className="text-sm font-black text-gray-900 leading-tight">{trackingResult.program}</p>
                      </div>
                    </div>
                    {trackingResult.assignedAdvocate && (
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/5 p-3 rounded-xl text-primary shadow-inner shrink-0"><User size={18} /></div>
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Lead Counsel</p>
                          <p className="text-sm font-black text-gray-900 leading-tight">{trackingResult.assignedAdvocate}</p>
                        </div>
                      </div>
                    )}
                    <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 italic">
                      <div className="flex items-center space-x-3 mb-2">
                        <History size={14} className="text-primary" />
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">Latest Update</span>
                      </div>
                      <p className="text-xs text-blue-900 font-medium leading-relaxed">"{trackingResult.latestUpdate}"</p>
                    </div>
                  </div>
                </div>
              )}
              {trackingResult === 'not-found' && (
                <div className="p-6 bg-red-50 text-red-600 rounded-[2rem] text-xs font-black text-center border-2 border-red-100 animate-in shake duration-300 uppercase tracking-widest">
                  Authority Reference Not Found
                </div>
              )}
            </div>

            {/* Impact Metrics RESTORED/RETAINED */}
            <div className="bg-primary text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <ClipboardList size={120} />
              </div>
              <h3 className="text-2xl font-black mb-8 font-serif flex items-center relative z-10 text-secondary">
                <Scale className="mr-3" size={24} /> 2023 Impact
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Cases Handled</span>
                  <span className="text-2xl font-black">1,240</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Bail Success</span>
                  <span className="text-2xl font-black">84%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Plea Bargains</span>
                  <span className="text-2xl font-black">215</span>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
                <Link to="/about" className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] hover:underline flex items-center transition-all group-hover:translate-x-2">
                  View Annual Impact Report <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* FAQ Helper RESTORED */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
               <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-6 flex items-center">
                 <Info size={16} className="mr-2" /> Eligibility Note
               </h4>
               <p className="text-xs text-blue-100 leading-relaxed italic font-medium opacity-80 mb-6">
                 UCLF exclusively serves indigent persons who demonstrate a complete lack of financial means. Applications are subjected to regional verification.
               </p>
               <Link to="/eligibility-guidelines" className="w-full py-4 bg-white/10 hover:bg-white hover:text-primary transition-all rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center justify-center">
                 Read Eligibility Guidelines
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAid;

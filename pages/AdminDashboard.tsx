
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShieldAlert, Image as ImageIcon, Handshake, Calendar, 
  Plus, Trash2, Save, LogOut, ChevronRight, LayoutDashboard,
  ExternalLink, CheckCircle, AlertTriangle, Users, Globe,
  Clock, FileText, Camera, MapPin, Edit3, X, Newspaper, 
  BookOpen, Download, Link as LinkIcon, Music, Video, Scale, 
  FileCheck, FileSearch, Search, Filter, UserCheck, UserMinus, Mail,
  UserPlus, UserCog
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Event, NewsArticle, Resource, GalleryImage, MembershipTier } from '../types';

const DEFAULT_GALLERY: GalleryImage[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    caption: 'Annual General Meeting 2024 - Strategy Session at the Secretariat.',
    category: 'Governance',
    date: 'March 20, 2024',
    location: 'Kampala'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80',
    caption: 'West Nile Expansion: Meeting with local community leaders in Arua.',
    category: 'Outreach',
    date: 'March 15, 2024',
    location: 'Arua'
  }
];

const DEFAULT_PARTNERS = [
  { name: 'Uganda Law Council', type: 'Regulatory Body', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=LAW+COUNCIL' },
  { name: 'Uganda Police Force', type: 'Institutional Partner', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=POLICE' },
];

const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'CLE Seminar: Christian Ethics in Legal Practice',
    description: 'A licensed Continuous Legal Education session exploring the intersection of professional legal ethics and biblical justice principles.',
    type: 'CLE',
    date: 'April 15, 2024 • 9:00 AM',
    location: 'Imperial Royale Hotel, Kampala',
    cleCredits: 5,
    capacity: 100,
    filled: 78,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'
  }
];

const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'UCLF Expands Operations to West Nile',
    excerpt: 'Strategic growth initiative brings pro-bono legal aid to Arua, Madi Okollo, and Terego districts.',
    content: 'Full content goes here...',
    date: 'March 28, 2024',
    imageUrls: ['https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80'],
    category: 'Expansion'
  }
];

const INITIAL_RESOURCES: Resource[] = [
  { id: '1', title: 'Standard Land Purchase Agreement', category: 'Legal Templates', date: 'Oct 2023', type: 'DOC', downloadUrl: '#' },
];

const MOCK_REGISTERED_USERS = [
  { id: 'u1', name: 'Counsel Martin Sabiiti', email: 'martin.s@uclf.org.ug', tier: MembershipTier.FULL, status: 'Active', joined: 'Jan 2012', location: 'Kampala' },
  { id: 'u2', name: 'Jane Nakato', email: 'j.nakato@uclf.org.ug', tier: MembershipTier.ASSOCIATE, status: 'Active', joined: 'Mar 2018', location: 'Kampala' },
  { id: 'u3', name: 'Sarah Nakimera', email: 'sarah.n@ucu.ac.ug', tier: MembershipTier.STUDENT, status: 'Active', joined: 'Feb 2023', location: 'Mukono' },
  { id: 'u4', name: 'David Komakech', email: 'david.k@uclf.org.ug', tier: MembershipTier.FULL, status: 'Active', joined: 'Nov 2015', location: 'Gulu' },
  { id: 'u5', name: 'Grace Aber', email: 'g.aber@uclf.org.ug', tier: MembershipTier.ASSOCIATE, status: 'Pending', joined: 'Mar 2024', location: 'Arua' },
  { id: 'u6', name: 'Robert Anguyo', email: 'r.anguyo@uclf.org.ug', tier: MembershipTier.FULL, status: 'Active', joined: 'Jun 2019', location: 'Arua' },
  { id: 'u7', name: 'John Baptist', email: 'j.baptist@uclf.org.ug', tier: MembershipTier.STUDENT, status: 'Inactive', joined: 'Aug 2022', location: 'Lira' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const resourceFormRef = useRef<HTMLDivElement>(null);
  const memberFormRef = useRef<HTMLDivElement>(null);
  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";
  
  const [activeTab, setActiveTab] = useState<'gallery' | 'partners' | 'events' | 'news' | 'resources' | 'members'>('members');
  
  // Data States
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [partners, setPartners] = useState<{name: string, type: string, logoUrl: string}[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [registeredMembers, setRegisteredMembers] = useState<any[]>([]);

  // Filtering Member States
  const [memberSearch, setMemberSearch] = useState('');
  const [memberTierFilter, setMemberTierFilter] = useState<'All' | MembershipTier>('All');

  // Filtering Resource States
  const [resSearch, setResSearch] = useState('');
  const [resTypeFilter, setResTypeFilter] = useState<'All' | Resource['type']>('All');

  // Member Form State
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    tier: MembershipTier.FULL,
    status: 'Active',
    joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    location: 'Kampala'
  });

  // Gallery Form State
  const [newGalleryImage, setNewGalleryImage] = useState<Partial<GalleryImage>>({
    url: '', caption: '', category: 'General', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), location: 'Kampala'
  });

  const [newPartner, setNewPartner] = useState({ name: '', type: '', logoUrl: '' });
  
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '', description: '', type: 'Fellowship', date: '', location: '', cleCredits: 0, capacity: 50, filled: 0, imageUrl: ''
  });
  
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<NewsArticle>>({
    title: '', excerpt: '', content: '', date: '', imageUrls: [''], category: 'General'
  });
  
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    title: '', category: 'Legal Templates', date: '', type: 'PDF', downloadUrl: '', description: ''
  });

  const [notification, setNotification] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('uclf_user');
    if (!userStr || JSON.parse(userStr).tier !== 'Admin') {
      navigate('/login');
      return;
    }

    const loadData = (key: string, initial: any, setter: Function) => {
      const saved = localStorage.getItem(key);
      if (saved) setter(JSON.parse(saved));
      else {
        setter(initial);
        localStorage.setItem(key, JSON.stringify(initial));
      }
    };

    loadData('uclf_gallery_data', DEFAULT_GALLERY, setGallery);
    loadData('uclf_partners', DEFAULT_PARTNERS, setPartners);
    loadData('uclf_events', INITIAL_EVENTS, setEvents);
    loadData('uclf_news', INITIAL_NEWS, setNews);
    loadData('uclf_resources', INITIAL_RESOURCES, setResources);
    loadData('uclf_registered_members', MOCK_REGISTERED_USERS, setRegisteredMembers);
  }, [navigate]);

  const showNotice = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('uclf_user');
    navigate('/login');
    window.location.reload();
  };

  // MEMBER HANDLERS
  const handleSaveMember = () => {
    if (!memberForm.name || !memberForm.email) {
      showNotice('Identity and Email are mandatory', 'error');
      return;
    }

    let updated: any[];
    if (editingMemberId) {
      updated = registeredMembers.map(m => m.id === editingMemberId ? { ...memberForm, id: editingMemberId } : m);
      showNotice('Member record updated');
    } else {
      updated = [{ ...memberForm, id: 'u' + Date.now() }, ...registeredMembers];
      showNotice('New member enrolled');
    }

    setRegisteredMembers(updated);
    localStorage.setItem('uclf_registered_members', JSON.stringify(updated));
    resetMemberForm();
  };

  const resetMemberForm = () => {
    setEditingMemberId(null);
    setIsMemberFormOpen(false);
    setMemberForm({
      name: '',
      email: '',
      tier: MembershipTier.FULL,
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      location: 'Kampala'
    });
  };

  const startEditMember = (m: any) => {
    setEditingMemberId(m.id);
    setMemberForm(m);
    setIsMemberFormOpen(true);
    memberFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteMember = (id: string) => {
    if (window.confirm('Revoke all access for this member? This action is immediate.')) {
        const updated = registeredMembers.filter(m => m.id !== id);
        setRegisteredMembers(updated);
        localStorage.setItem('uclf_registered_members', JSON.stringify(updated));
        showNotice('Member credentials revoked');
    }
  };

  const filteredMembers = useMemo(() => {
    return registeredMembers.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.email.toLowerCase().includes(memberSearch.toLowerCase());
        const matchesTier = memberTierFilter === 'All' || m.tier === memberTierFilter;
        return matchesSearch && matchesTier;
    });
  }, [memberSearch, memberTierFilter, registeredMembers]);

  // OTHER HANDLERS (Gallery, Partners, etc.)
  const addImageToGallery = () => {
    if (!newGalleryImage.url || !newGalleryImage.caption) { showNotice('URL and Caption are required', 'error'); return; }
    const newImage: GalleryImage = { ...newGalleryImage as GalleryImage, id: 'g' + Date.now() };
    const updated = [newImage, ...gallery];
    setGallery(updated);
    localStorage.setItem('uclf_gallery_data', JSON.stringify(updated));
    setNewGalleryImage({ url: '', caption: '', category: 'General', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), location: 'Kampala' });
    showNotice('Gallery image published');
  };

  const removeImageFromGallery = (id: string) => {
    const updated = gallery.filter((img) => img.id !== id);
    setGallery(updated);
    localStorage.setItem('uclf_gallery_data', JSON.stringify(updated));
    showNotice('Image removed from gallery');
  };

  const addPartner = () => {
    if (!newPartner.name || !newPartner.logoUrl) return;
    const updated = [newPartner, ...partners];
    setPartners(updated);
    localStorage.setItem('uclf_partners', JSON.stringify(updated));
    setNewPartner({ name: '', type: '', logoUrl: '' });
    showNotice('Partner added');
  };

  const removePartner = (index: number) => {
    const updated = partners.filter((_, i) => i !== index);
    setPartners(updated);
    localStorage.setItem('uclf_partners', JSON.stringify(updated));
    showNotice('Partner removed');
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    let updated: Event[];
    if (editingEventId) updated = events.map(e => e.id === editingEventId ? { ...newEvent, id: editingEventId } as Event : e);
    else updated = [{ ...newEvent, id: 'e' + Date.now() } as Event, ...events];
    setEvents(updated);
    localStorage.setItem('uclf_events', JSON.stringify(updated));
    setEditingEventId(null);
    setNewEvent({ title: '', description: '', type: 'Fellowship', date: '', location: '', cleCredits: 0, capacity: 50, filled: 0, imageUrl: '' });
    showNotice(editingEventId ? 'Event updated' : 'Event published');
  };

  const addNews = () => {
    if (!newArticle.title || !newArticle.date) return;
    let updated: NewsArticle[];
    if (editingNewsId) updated = news.map(a => a.id === editingNewsId ? { ...newArticle, id: editingNewsId } as NewsArticle : a);
    else updated = [{ ...newArticle, id: 'n' + Date.now() } as NewsArticle, ...news];
    setNews(updated);
    localStorage.setItem('uclf_news', JSON.stringify(updated));
    setEditingNewsId(null);
    setNewArticle({ title: '', excerpt: '', content: '', date: '', imageUrls: [''], category: 'General' });
    showNotice(editingNewsId ? 'News updated' : 'News published');
  };

  const addResource = () => {
    if (!newResource.title || !newResource.downloadUrl) { showNotice('Please provide title and download URL', 'error'); return; }
    let updated: Resource[];
    if (editingResourceId) updated = resources.map(r => r.id === editingResourceId ? { ...newResource, id: editingResourceId } as Resource : r);
    else updated = [{ ...newResource, id: 'r' + Date.now() } as Resource, ...resources];
    setResources(updated);
    localStorage.setItem('uclf_resources', JSON.stringify(updated));
    setEditingResourceId(null);
    setNewResource({ title: '', category: 'Legal Templates', date: '', type: 'PDF', downloadUrl: '', description: '' });
    showNotice(editingResourceId ? 'Resource updated' : 'Resource published');
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 flex flex-col text-slate-300 shadow-2xl shrink-0">
        <div className="p-8 border-b border-slate-800">
           <div className="flex items-center space-x-4 text-red-500">
              <div className="h-14 w-14 flex items-center justify-center">
                <img src={UCLF_LOGO} alt="UCLF Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="font-black text-xl tracking-tight text-white font-serif italic">Admin Console</span>
           </div>
        </div>
        
        <nav className="p-6 space-y-2 flex-grow overflow-y-auto">
          {[
            { id: 'members', name: 'Member Registry', icon: <Users size={18} /> },
            { id: 'gallery', name: 'Gallery Control', icon: <Camera size={18} /> },
            { id: 'partners', name: 'Strategic Partners', icon: <Handshake size={18} /> },
            { id: 'events', name: 'Events & Calendar', icon: <Calendar size={18} /> },
            { id: 'news', name: 'News & Bulletins', icon: <Newspaper size={18} /> },
            { id: 'resources', name: 'Library & Assets', icon: <BookOpen size={18} /> },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all font-black text-xs uppercase tracking-widest">
            <LogOut size={18} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto relative">
        <header className="bg-white/80 backdrop-blur-md px-10 py-8 border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
           <div>
              <h1 className="text-3xl font-black text-slate-900 font-serif lowercase capitalize">{activeTab.replace('-', ' ')} management</h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Master Authority Access • Real-time Sync Active</p>
           </div>
           {notification && (
              <div className={`px-6 py-3 rounded-2xl border flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 duration-300 ${notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                 <CheckCircle size={18} />
                 <span className="text-xs font-black uppercase tracking-widest">{notification.msg}</span>
              </div>
           )}
        </header>

        <div className="p-10 max-w-6xl mx-auto w-full">
          
          {/* MEMBERS REGISTRY TAB */}
          {activeTab === 'members' && (
            <div className="space-y-12 animate-in fade-in duration-500">
                {/* Manual Add/Edit Form */}
                {isMemberFormOpen && (
                  <div ref={memberFormRef} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-red-100 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                      <h2 className="text-2xl font-black text-slate-900 font-serif flex items-center">
                        {editingMemberId ? <UserCog className="mr-3 text-red-600" /> : <UserPlus className="mr-3 text-red-600" />}
                        {editingMemberId ? 'Modify Member Profile' : 'Enroll New Fraternity Member'}
                      </h2>
                      <button onClick={resetMemberForm} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Legal Name</label>
                          <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="e.g. Counsel John Doe" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Electronic Mail</label>
                          <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="name@uclf.org.ug" value={memberForm.email} onChange={e => setMemberForm({...memberForm, email: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Membership Tier</label>
                          <select className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm cursor-pointer" value={memberForm.tier} onChange={e => setMemberForm({...memberForm, tier: e.target.value as MembershipTier})}>
                             <option value={MembershipTier.FULL}>Full Member (Advocate)</option>
                             <option value={MembershipTier.ASSOCIATE}>Associate Member</option>
                             <option value={MembershipTier.STUDENT}>Student Member</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Account State</label>
                          <select className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm cursor-pointer" value={memberForm.status} onChange={e => setMemberForm({...memberForm, status: e.target.value})}>
                             <option>Active</option>
                             <option>Pending</option>
                             <option>Inactive</option>
                             <option>Suspended</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Regional Hub</label>
                          <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="e.g. Kampala" value={memberForm.location} onChange={e => setMemberForm({...memberForm, location: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Enrolment Date</label>
                          <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="e.g. Jan 2024" value={memberForm.joined} onChange={e => setMemberForm({...memberForm, joined: e.target.value})} />
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button onClick={handleSaveMember} className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center">
                         <Save size={18} className="mr-2" /> {editingMemberId ? 'Authorize Profile Changes' : 'Commit New Enrollment'}
                       </button>
                       <button onClick={resetMemberForm} className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 font-serif">Membership Registry Access</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Master controls for fraternity credentials</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            {!isMemberFormOpen && (
                              <button 
                                onClick={() => setIsMemberFormOpen(true)}
                                className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all flex items-center shrink-0"
                              >
                                <Plus size={16} className="mr-2" /> New Registry Entry
                              </button>
                            )}
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search registry..." 
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-red-500/5 transition-all text-xs font-bold"
                                    value={memberSearch}
                                    onChange={e => setMemberSearch(e.target.value)}
                                />
                            </div>
                            <select 
                                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer focus:ring-4 focus:ring-red-500/5 transition-all"
                                value={memberTierFilter}
                                onChange={e => setMemberTierFilter(e.target.value as any)}
                            >
                                <option value="All">All Tiers</option>
                                <option value={MembershipTier.FULL}>Full Members</option>
                                <option value={MembershipTier.ASSOCIATE}>Associates</option>
                                <option value={MembershipTier.STUDENT}>Students</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Identity & Email</th>
                                    <th className="px-6 py-4">Membership Tier</th>
                                    <th className="px-6 py-4">Regional Hub</th>
                                    <th className="px-6 py-4">Access State</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-center">Executive Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredMembers.map(m => (
                                    <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shadow-inner">
                                                    {m.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-tight">{m.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold flex items-center mt-0.5"><Mail size={10} className="mr-1" /> {m.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 ${
                                                m.tier === MembershipTier.FULL ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                                m.tier === MembershipTier.ASSOCIATE ? 'bg-orange-50 border-orange-100 text-orange-600' :
                                                'bg-emerald-50 border-emerald-100 text-emerald-600'
                                            }`}>
                                                {m.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center text-xs font-bold text-slate-500">
                                                <MapPin size={12} className="mr-1.5 text-slate-300" /> {m.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-emerald-500 animate-pulse' : m.status === 'Pending' ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{m.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase">{m.joined}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center space-x-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditMember(m)} className="p-2.5 text-slate-400 hover:text-primary transition-all bg-white rounded-xl border border-slate-100 shadow-sm" title="Modify Record"><Edit3 size={16} /></button>
                                                <button onClick={() => deleteMember(m.id)} className="p-2.5 text-slate-400 hover:text-red-500 transition-all bg-white rounded-xl border border-slate-100 shadow-sm" title="Revoke Credentials"><UserMinus size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredMembers.length === 0 && (
                            <div className="py-20 text-center flex flex-col items-center">
                                <Users size={48} className="text-slate-100 mb-4" />
                                <h4 className="text-lg font-black text-slate-400 font-serif">No registry records match your criteria</h4>
                                <button onClick={() => { setMemberSearch(''); setMemberTierFilter('All'); }} className="mt-4 text-xs font-black text-red-500 hover:underline uppercase tracking-widest">Clear Registry Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
                 <h2 className="text-xl font-black text-slate-900 font-serif mb-8 border-b border-slate-50 pb-4">Add Photo to Mission Gallery</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Image URL</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="https://unsplash.com/..." value={newGalleryImage.url} onChange={e => setNewGalleryImage({...newGalleryImage, url: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Image Caption</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="A brief context..." value={newGalleryImage.caption} onChange={e => setNewGalleryImage({...newGalleryImage, caption: e.target.value})} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Category</label>
                                <select className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" value={newGalleryImage.category} onChange={e => setNewGalleryImage({...newGalleryImage, category: e.target.value})}>
                                    <option>General</option><option>Legal Aid</option><option>Outreach</option><option>Fellowship</option><option>Governance</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Location</label>
                                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Kampala" value={newGalleryImage.location} onChange={e => setNewGalleryImage({...newGalleryImage, location: e.target.value})} />
                            </div>
                        </div>
                    </div>
                 </div>
                 <button onClick={addImageToGallery} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Publish to Gallery</button>
              </div>
              
              <div className="space-y-6">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Managed Gallery Registry ({gallery.length})</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {gallery.map((img) => (
                      <div key={img.id} className="group relative bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex space-x-6">
                        <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-inner">
                            <img src={img.url} alt="p" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0 pt-2 relative">
                            <span className="bg-slate-50 text-slate-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">{img.category}</span>
                            <h4 className="font-black text-slate-900 text-sm mt-2 line-clamp-2">{img.caption}</h4>
                            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight flex items-center">
                                <MapPin size={10} className="mr-1" /> {img.location} • {img.date}
                            </p>
                            <button onClick={() => removeImageFromGallery(img.id)} className="absolute top-0 right-0 text-red-300 hover:text-red-500 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div ref={resourceFormRef} className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 font-serif mb-10 border-b border-slate-50 pb-6 flex items-center">
                    <BookOpen className="mr-3 text-red-600" /> Upload New Resource
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                     <div className="space-y-6">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Title" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} />
                        <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" value={newResource.category} onChange={e => setNewResource({...newResource, category: e.target.value as any})}>
                           <option value="Legal Templates">Legal Templates</option><option value="Case Law">Case Law</option><option value="Reports">Reports</option>
                        </select>
                     </div>
                     <div className="space-y-6">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Download Link" value={newResource.downloadUrl} onChange={e => setNewResource({...newResource, downloadUrl: e.target.value})} />
                        <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value as any})}>
                           <option value="PDF">PDF</option><option value="DOC">DOC</option>
                        </select>
                     </div>
                  </div>
                  <button onClick={addResource} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Commit Resource</button>
               </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-slate-100">
                 <h2 className="text-2xl font-black text-slate-900 font-serif mb-10 border-b border-slate-50 pb-6">
                   Publish Bulletin
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div className="space-y-6">
                      <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Headline" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} />
                      <textarea rows={3} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Excerpt" value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})} />
                    </div>
                    <div className="space-y-6">
                      <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Date" value={newArticle.date} onChange={e => setNewArticle({...newArticle, date: e.target.value})} />
                      <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Content" value={newArticle.content} onChange={e => setNewArticle({...newArticle, content: e.target.value})} />
                    </div>
                 </div>
                 <button onClick={addNews} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Publish Bulletin</button>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div ref={formRef} className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 font-serif mb-10 border-b border-slate-50 pb-6 flex items-center">
                    <Calendar className="mr-3 text-red-600" /> Dispatch Event Listing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                     <div className="space-y-6">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                        <textarea rows={3} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Details" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                     </div>
                     <div className="space-y-6">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                     </div>
                  </div>
                  <button onClick={addEvent} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Publish Event</button>
               </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
                 <h2 className="text-xl font-black text-slate-900 font-serif mb-8 border-b border-slate-50 pb-4">Enroll Strategic Partner</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-6">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Entity Name" value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} />
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Category" value={newPartner.type} onChange={e => setNewPartner({...newPartner, type: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all font-bold text-sm" placeholder="Logo URL" value={newPartner.logoUrl} onChange={e => setNewPartner({...newPartner, logoUrl: e.target.value})} />
                    </div>
                 </div>
                 <button onClick={addPartner} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Authenticate Partner</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

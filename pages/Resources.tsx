
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, FileText, Download, Filter, Book, Scale, 
  Music, Video, Sparkles, ArrowRight, MessageSquare, 
  X, Bookmark, Info, Calendar, BookOpen, Award, ExternalLink,
  ChevronRight, Library, GraduationCap, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Resource } from '../types';

interface JournalVolume {
  id: string;
  volume: string;
  issue: string;
  year: string;
  title: string;
  theme: string;
  editor: string;
  issn: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
}

const DEFAULT_DOCS: Resource[] = [
  { id: '1', title: 'Standard Land Purchase Agreement', category: 'Legal Templates', date: 'Oct 2023', type: 'DOC', downloadUrl: '#' },
  { id: '2', title: 'The Role of Faith in Ugandan Judiciary', category: 'Christian Ethics', date: 'Jan 2024', type: 'PDF', downloadUrl: '#' },
  { id: '3', title: 'UCLF Annual Impact Report 2023', category: 'Reports', date: 'Mar 2024', type: 'PDF', downloadUrl: '#' },
  { id: '4', title: 'Uganda v Kwoyelo: International Crimes Analysis', category: 'Case Law', date: 'Aug 2024', type: 'Case', downloadUrl: '#' },
  { id: '5', title: 'Constitutional Petition No. 5 of 2023 Summary', category: 'Case Law', date: 'Dec 2023', type: 'Case', downloadUrl: '#' },
  { id: '6', title: 'Fellowship Message: Justice for Widows', category: 'Audios', date: 'Feb 2024', type: 'Audio', downloadUrl: '#' },
  { id: '7', title: 'CLE Webinar: Electronic Evidence in Uganda', category: 'Videos', date: 'May 2024', type: 'Video', downloadUrl: '#' },
  { id: '8', title: 'Biblical Foundations of Justice', category: 'Christian Ethics', date: 'Sep 2024', type: 'PDF', downloadUrl: '#' },
  { id: '9', title: 'Power of Attorney Template', category: 'Legal Templates', date: 'Nov 2023', type: 'DOC', downloadUrl: '#' },
  { id: '10', title: 'Guideline on Plea Bargaining in Uganda', category: 'Legal Templates', date: 'Jun 2023', type: 'PDF', downloadUrl: '#' },
  { id: '11', title: 'Supreme Court Ruling on Land Evictions', category: 'Case Law', date: 'Jan 2024', type: 'Case', downloadUrl: '#' },
  { id: '12', title: 'Pastoral Visit Report: Gulu District', category: 'Reports', date: 'Dec 2023', type: 'PDF', downloadUrl: '#' },
];

const JOURNAL_VOLUMES: JournalVolume[] = [
  {
    id: 'v8',
    volume: '8',
    issue: '1',
    year: '2024',
    title: 'The Digital Frontier of Justice',
    theme: 'AI, Technology and Rule of Law in East Africa',
    editor: 'Dr. Sarah Namulondo',
    issn: 'ISSN 2415-0819',
    description: 'Exploring the intersection of legal tech, constitutional rights in the age of surveillance, and the digitalization of the Ugandan Judiciary.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    downloadUrl: '#'
  },
  {
    id: 'v7',
    volume: '7',
    issue: '2',
    year: '2023',
    title: 'Reconciliation and Restorative Justice',
    theme: 'Biblical Foundations in Post-Conflict Legal Frameworks',
    editor: 'Counsel James Mukasa',
    issn: 'ISSN 2415-0819',
    description: 'A comprehensive study on how Christian mediation principles are being integrated into local council courts and regional mediation centers.',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80',
    downloadUrl: '#'
  },
  {
    id: 'v6',
    volume: '6',
    issue: '1',
    year: '2022',
    title: 'Land Rights and Vulnerable Communities',
    theme: 'Legal Protection for Widows and Orphans in Uganda',
    editor: 'Hon. Justice David Kato',
    issn: 'ISSN 2415-0819',
    description: 'Analyzing the Land Act 1998 through the lens of social justice and the protection of ancestral property rights for marginalized groups.',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80',
    downloadUrl: '#'
  }
];

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [documents, setDocuments] = useState<Resource[]>(DEFAULT_DOCS);
  
  useEffect(() => {
    const saved = localStorage.getItem('uclf_resources');
    if (saved) {
      setDocuments(JSON.parse(saved));
    } else {
      localStorage.setItem('uclf_resources', JSON.stringify(DEFAULT_DOCS));
    }
  }, []);

  const categories = [
    { name: 'All', icon: <Filter size={18} /> },
    { name: 'UCLF Law Journal', icon: <BookOpen size={18} /> },
    { name: 'Legal Templates', icon: <FileText size={18} /> },
    { name: 'Case Law', icon: <Scale size={18} /> },
    { name: 'Christian Ethics', icon: <Book size={18} /> },
    { name: 'Audios', icon: <Music size={18} /> },
    { name: 'Videos', icon: <Video size={18} /> },
    { name: 'Reports', icon: <FileText size={18} /> },
  ];

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        doc.title.toLowerCase().includes(term) || 
        doc.category.toLowerCase().includes(term) ||
        doc.date.toLowerCase().includes(term);
      
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, documents]);

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('All');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Search Header Section */}
      <div className="bg-primary pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" alt="law background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 font-serif tracking-tight">Resource Library</h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
            Access our comprehensive repository of scholarly journals, legal precedents, templates, and Christian ethical guidelines.
          </p>
          
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              className="w-full pl-16 pr-20 py-6 rounded-[2rem] shadow-2xl focus:ring-8 focus:ring-white/20 outline-none text-xl font-medium transition-all"
              placeholder="Search journals, templates, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* AI Assistant Banner */}
        <div className="mb-12 bg-white rounded-[2.5rem] p-10 text-gray-900 relative overflow-hidden shadow-2xl border border-blue-100 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
            <Sparkles size={240} className="text-primary" />
          </div>
          
          <div className="relative z-10 lg:flex items-center justify-between gap-12">
            <div className="mb-8 lg:mb-0 lg:max-w-3xl">
              <div className="inline-flex items-center space-x-3 bg-primary/10 text-primary px-5 py-2 rounded-full mb-6 border border-primary/20">
                <Sparkles size={18} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Powered by UCLF Gemini AI</span>
              </div>
              <h2 className="text-4xl font-black mb-6 font-serif text-gray-900 leading-tight">UCLF Virtual Legal Assistant</h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Drafting a paper for the <strong className="text-primary">Law Journal</strong>? Our AI can help you summarize precedents or verify statutory citations in seconds.
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

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Enhanced Category Navigation */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center pl-4">
                  <Filter size={14} className="mr-2 text-primary" /> Resource Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name} 
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex items-center w-full px-6 py-4 rounded-2xl transition-all border-2 text-sm font-bold ${
                        activeCategory === cat.name 
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 translate-x-2' 
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className={`mr-4 transition-colors ${activeCategory === cat.name ? 'text-secondary' : 'text-primary/40'}`}>
                        {cat.icon}
                      </span>
                      {cat.name}
                      {activeCategory === cat.name && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-secondary"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><Library size={80} /></div>
                <h4 className="font-black mb-4 flex items-center text-secondary uppercase tracking-widest text-xs">
                  Call for Papers
                </h4>
                <p className="text-sm font-medium leading-relaxed opacity-90 mb-6">
                  UCLF is accepting submissions for Volume 9 of the Law Journal. Deadline: August 2024.
                </p>
                <button className="text-xs font-black uppercase tracking-widest flex items-center hover:underline">
                  View Guidelines <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Resource Display Grid */}
          <div className="flex-grow">
            
            {/* SPECIALIZED VIEW: LAW JOURNAL */}
            {activeCategory === 'UCLF Law Journal' ? (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                   <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="w-full md:w-64 h-80 rounded-2xl overflow-hidden shadow-2xl relative group shrink-0 border-8 border-gray-50">
                         <img src={JOURNAL_VOLUMES[0].imageUrl} alt="Latest Volume" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                         <div className="absolute top-4 right-4 bg-secondary text-primary font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Newest Release</div>
                      </div>
                      <div className="flex-grow">
                         <div className="flex items-center space-x-3 mb-4">
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Official Journal Volume {JOURNAL_VOLUMES[0].volume}</span>
                            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{JOURNAL_VOLUMES[0].issn}</span>
                         </div>
                         <h2 className="text-4xl font-black text-gray-900 font-serif leading-tight mb-6">
                            {JOURNAL_VOLUMES[0].title}: <span className="text-primary italic">{JOURNAL_VOLUMES[0].theme}</span>
                         </h2>
                         <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                            "{JOURNAL_VOLUMES[0].description}"
                         </p>
                         <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-gray-50">
                            <div className="flex items-center space-x-3">
                               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary font-black text-[10px]">ED</div>
                               <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">General Editor</p>
                                  <p className="text-sm font-black text-gray-900">{JOURNAL_VOLUMES[0].editor}</p>
                               </div>
                            </div>
                            <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-blue-800 transition-all flex items-center">
                               <Download size={18} className="mr-2" /> Download Full Volume
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {JOURNAL_VOLUMES.slice(1).map(volume => (
                     <div key={volume.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex gap-8 items-start">
                           <div className="w-32 h-44 rounded-xl overflow-hidden shadow-lg shrink-0 group-hover:scale-105 transition-transform border-4 border-gray-50">
                              <img src={volume.imageUrl} alt={volume.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-grow pt-2">
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Volume {volume.volume} • {volume.year}</p>
                              <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-primary transition-colors">{volume.title}</h3>
                              <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed italic mb-6">"{volume.description}"</p>
                              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{volume.issn}</span>
                                 <button className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                                   Access Issue <ChevronRight size={14} className="ml-1" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
                      <GraduationCap size={200} />
                   </div>
                   <div className="relative z-10 max-w-2xl mx-auto">
                      <h3 className="text-3xl font-black mb-6 font-serif text-secondary">Academic Submissions</h3>
                      <p className="text-blue-100 leading-relaxed font-medium mb-10 italic">
                         The UCLF Law Journal is a peer-reviewed publication dedicated to advancing Christian legal scholarship in Africa. We welcome articles, case notes, and book reviews.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                         <button className="bg-white text-primary px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all shadow-lg w-full sm:w-auto">
                            Submission Portal
                         </button>
                         <button className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto">
                            Editorial Policy
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              /* STANDARD ASSET VIEW */
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                      {filteredDocs.length} Resources Available
                    </h3>
                    { (searchTerm || activeCategory !== 'All') && (
                      <button 
                        onClick={clearFilters}
                        className="text-[10px] font-black text-primary hover:text-red-500 uppercase tracking-widest flex items-center transition-colors"
                      >
                        <X size={12} className="mr-1" /> Clear All Filters
                      </button>
                    )}
                  </div>
                  <div className="hidden md:flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest space-x-6">
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div> PDF</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> DOC</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-secondary mr-2"></div> CASE</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocs.map((doc) => (
                    <div key={doc.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col group relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                        <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                          doc.category === 'Legal Templates' ? 'bg-blue-50 text-blue-600' :
                          doc.category === 'Case Law' ? 'bg-orange-50 text-orange-600' :
                          doc.category === 'Christian Ethics' ? 'bg-purple-50 text-purple-600' :
                          doc.category === 'Reports' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {doc.category}
                        </div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                          <Calendar size={12} className="mr-1.5" /> {doc.date}
                        </div>
                      </div>

                      <div className="flex items-start space-x-6 mb-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-inner ${
                          doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                          doc.type === 'Case' ? 'bg-blue-50 text-blue-600' :
                          doc.type === 'Audio' ? 'bg-orange-50 text-orange-600' :
                          doc.type === 'Video' ? 'bg-purple-50 text-purple-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {doc.type === 'Audio' ? <Music size={28} /> : 
                          doc.type === 'Video' ? <Video size={28} /> :
                          doc.type === 'Case' ? <Scale size={28} /> :
                          <FileText size={28} />}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">{doc.title}</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type: {doc.type} Asset</p>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <a 
                          href={doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center hover:scale-105 transition-transform group/dl"
                        >
                          <Download size={14} className="mr-2 group-hover/dl:animate-bounce" /> Download Resource
                        </a>
                        <button className="p-3 text-gray-300 hover:text-secondary hover:bg-gray-50 rounded-2xl transition-all">
                          <Bookmark size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredDocs.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center">
                      <div className="bg-gray-50 p-10 rounded-full mb-8 shadow-inner">
                        <Search size={64} className="text-gray-200" />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 font-serif mb-3">No matching resources found</h4>
                      <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed mb-10">
                        We couldn't find anything matching "<span className="text-primary font-bold">{searchTerm}</span>" in the <span className="text-primary font-bold">{activeCategory}</span> category.
                      </p>
                      <button 
                        onClick={clearFilters}
                        className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg"
                      >
                        Reset all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;

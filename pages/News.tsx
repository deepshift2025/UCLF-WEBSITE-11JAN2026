
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Newspaper, ArrowRight, ExternalLink, Calendar, 
  ChevronRight, Sparkles, Filter, Search, X, Loader2, ImageIcon
} from 'lucide-react';
import { NewsArticle } from '../types';

const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'UCLF Expands Operations to West Nile',
    excerpt: 'Strategic growth initiative brings pro-bono legal aid to Arua, Madi Okollo, and Terego districts.',
    content: 'The Uganda Christian Lawyers Fraternity is proud to announce the formal expansion of its regional footprint into the West Nile sub-region. This strategic move aims to bring justice closer to the marginalized communities in Arua, Madi Okollo, and Terego districts. Our teams will focus on refugee rights, land mediation, and juvenile justice.\n\nIn collaboration with local community leaders and the Uganda Police Force, UCLF has established a new hub that will serve as a sanctuary for those seeking legal redress but lack the means to afford private counsel. This expansion is part of our 5-year strategic plan to ensure that every corner of the Republic is reached by the message of faith and the practice of fair justice.',
    date: 'March 28, 2024',
    imageUrls: ['https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80'],
    category: 'Regional Expansion'
  },
  {
    id: 'n2',
    title: 'Annual General Meeting Scheduled',
    excerpt: 'Key policy-making gathering set for May 20th at the Kampala Secretariat. All full members encouraged to attend.',
    content: 'The Board of Directors of UCLF invites all full and associate members to the 2024 Annual General Meeting. This year’s agenda includes the review of the 5-year strategic plan, election of new regional coordinators, and the official launch of the Pro-Bono Digital Tracker.\n\nFollowing the professional deliberations, there will be a fellowship dinner to celebrate the milestones achieved in the previous fiscal year. Membership verification will be conducted at the entrance, and all attendees are encouraged to register their participation via the Events portal to facilitate logistical planning.',
    date: 'March 20, 2024',
    imageUrls: ['https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80'],
    category: 'Governance'
  }
];

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = () => {
      const saved = localStorage.getItem('uclf_news');
      if (saved) {
        setArticles(JSON.parse(saved));
      } else {
        setArticles(DEFAULT_NEWS);
        localStorage.setItem('uclf_news', JSON.stringify(DEFAULT_NEWS));
      }
      setIsLoading(false);
    };
    loadNews();
  }, []);

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" alt="news bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif tracking-tight">Regional Bulletins</h1>
          <p className="text-xl text-blue-100 italic max-w-2xl mx-auto font-medium">
            Official updates and stories from our fraternity's mission across Uganda.
          </p>
          
          <div className="mt-12 relative max-w-2xl mx-auto group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              className="w-full pl-14 pr-6 py-5 rounded-3xl shadow-xl focus:ring-8 focus:ring-white/20 outline-none text-lg font-medium transition-all"
              placeholder="Search news by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                      <div className="h-60 overflow-hidden relative">
                        <img 
                          src={article.imageUrls?.[0] || (article as any).imageUrl || (article as any).image} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                           <span className="bg-primary/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                             {article.category}
                           </span>
                           {article.imageUrls && article.imageUrls.length > 1 && (
                             <span className="bg-secondary/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center">
                               <ImageIcon size={12} className="mr-1.5" /> +{article.imageUrls.length - 1} More
                             </span>
                           )}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                          <Calendar size={12} className="mr-2" /> {article.date}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight font-serif">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow italic">
                          {article.excerpt}
                        </p>
                        <div className="pt-6 border-t border-gray-50">
                           <Link 
                            to={`/news/${article.id}`}
                            className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center group-hover:translate-x-2 transition-transform"
                           >
                             Read Full Report <ArrowRight size={14} className="ml-2" />
                           </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                   <Newspaper size={48} className="mx-auto text-gray-200 mb-4" />
                   <h3 className="text-xl font-black text-gray-900 font-serif">No articles found</h3>
                   <p className="text-gray-500 mt-2">Adjust your search to find other bulletins.</p>
                   <button onClick={() => setSearchTerm('')} className="mt-6 text-primary font-bold hover:underline">Clear Search</button>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 space-y-12">
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 border-b border-gray-50 pb-4">Trending Categories</h3>
                  <div className="flex flex-wrap gap-2">
                     {Array.from(new Set(articles.map(a => a.category))).map(cat => (
                        <button key={cat} onClick={() => setSearchTerm(cat)} className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                          {cat}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-primary rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform"><Sparkles size={120} /></div>
                  <h3 className="text-2xl font-black mb-4 font-serif text-secondary leading-tight">Member Voices</h3>
                  <p className="text-sm text-blue-100 italic leading-relaxed mb-10 opacity-90">
                    "UCLF has transformed my practice from a mere career to a divine calling of serving the marginalized."
                  </p>
                  <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-primary transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-lg">Submit your Story</button>
               </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;

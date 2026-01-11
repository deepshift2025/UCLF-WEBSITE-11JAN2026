
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, ArrowLeft, Share2, MessageSquare, 
  Clock, Bookmark, ArrowRight, Newspaper, ChevronRight
} from 'lucide-react';
import { NewsArticle } from '../types';

const NewsDetail: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [otherNews, setOtherNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('uclf_news');
    if (saved) {
      const articles: NewsArticle[] = JSON.parse(saved);
      const found = articles.find(a => a.id === newsId);
      setArticle(found || null);
      setOtherNews(articles.filter(a => a.id !== newsId).slice(0, 3));
    }
  }, [newsId]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-md">
          <Newspaper size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-2xl font-black text-gray-900 font-serif mb-4">Report Not Found</h2>
          <p className="text-gray-500 mb-8 font-medium">This bulletin might have been archived or moved by the Secretariat.</p>
          <Link to="/news" className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center">
            <ArrowLeft size={18} className="mr-2" /> Back to Newsroom
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Featured Header Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={article.imageUrls?.[0] || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'} 
          alt={article.title} 
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end pb-16">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <Link to="/news" className="inline-flex items-center text-blue-200 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] mb-8">
              <ArrowLeft size={16} className="mr-2" /> Newsroom
            </Link>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-secondary text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                {article.category}
              </span>
              <div className="flex items-center text-white/80 text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <Calendar size={14} className="mr-2" /> {article.date}
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white font-serif leading-tight max-w-4xl shadow-sm">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-xl prose-blue max-w-none">
              <p className="text-xl text-gray-500 font-serif italic border-l-4 border-primary pl-8 mb-12 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="text-gray-700 leading-[2] text-lg font-medium space-y-8 whitespace-pre-wrap">
                {article.content}
              </div>

              {/* Sub-images / Gallery */}
              {article.imageUrls && article.imageUrls.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
                  {article.imageUrls.slice(1).map((url, i) => (
                    <div key={i} className="rounded-[2.5rem] overflow-hidden shadow-xl h-80 border-8 border-gray-50">
                      <img src={url} alt={`Media ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center"><Share2 size={16} className="mr-2 text-primary" /> Share Report</span>
                <span className="flex items-center cursor-pointer hover:text-primary transition-colors"><Bookmark size={16} className="mr-2" /> Archive For Later</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-primary font-black border border-gray-100 shadow-sm">U</div>
                <div>
                  <p className="text-xs font-black text-gray-900 leading-none">UCLF Editorial</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Media & Secretariat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-200 pb-4 flex items-center justify-between">
                Related Bulletins <ChevronRight size={14} />
              </h3>
              <div className="space-y-8">
                {otherNews.map(news => (
                  <Link key={news.id} to={`/news/${news.id}`} className="group block">
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                        <img src={news.imageUrls?.[0]} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors leading-tight mb-2">{news.title}</h4>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">{news.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><MessageSquare size={120} /></div>
              <h4 className="text-xl font-black text-secondary font-serif mb-4">Official Feedback</h4>
              <p className="text-xs text-blue-100 leading-relaxed font-medium mb-10 italic">
                Have a question or clarification regarding this bulletin? Contact the regional secretariat directly.
              </p>
              <Link to="/contact" className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-primary transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 text-center block">
                Contact Secretariat
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;

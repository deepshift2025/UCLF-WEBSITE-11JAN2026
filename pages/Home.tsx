
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Scale, Calendar, ArrowRight, Heart, MapPin, 
  Award, CheckCircle, Handshake, Quote, Volume2, Globe, Sparkles, 
  MessageSquare, Newspaper, Clock, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_PARTNERS = [
  { name: 'Uganda Law Council', type: 'Regulatory Body', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=LAW+COUNCIL' },
  { name: 'Uganda Police Force', type: 'Institutional Partner', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=POLICE' },
  { name: 'Uganda Prisons Service', type: 'Correctional Services', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=PRISONS' },
  { name: 'JLOS Secretariat', type: 'Justice Sector', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=JLOS' },
  { name: 'LASPNET', type: 'Legal Aid Network', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=LASPNET' },
  { name: 'Uganda Law Society', type: 'Bar Association', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=ULS' },
  { name: 'Foundation for Human Rights', type: 'NGO Partner', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=FHRI' },
  { name: 'UCU Law Faculty', type: 'Academic Chapter', logoUrl: 'https://placehold.co/200x80/1e3a8a/white?text=UCU+LAW' },
];

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80',
];

const Home: React.FC = () => {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);
  const [galleryImages, setGalleryImages] = useState(DEFAULT_GALLERY);

  useEffect(() => {
    const savedPartners = localStorage.getItem('uclf_partners');
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      localStorage.setItem('uclf_partners', JSON.stringify(DEFAULT_PARTNERS));
    }
    
    const savedGallery = localStorage.getItem('uclf_gallery_data');
    if (savedGallery) {
      const parsed = JSON.parse(savedGallery);
      setGalleryImages(parsed.map((img: any) => img.url));
    }
  }, []);

  const testimonials = [
    {
      name: 'Namyalo Beatrice',
      location: 'Kasese District',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300',
      text: 'UCLF helped me recover my family land after it was illegally grabbed. Their mediation service saved my children\'s future without a long court battle.',
    },
    {
      name: 'Okello Moses',
      location: 'Gulu City',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      text: 'I was wrongfully detained for two weeks. A UCLF lawyer provided me with a free defense and I was eventually cleared of all charges. God bless them!',
    },
    {
      name: 'Sarah Nakimera',
      location: 'Kayunga',
      image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&q=80&w=300',
      text: 'Through the plea bargain program, I was able to get a fair hearing. The legal education they gave us in prison changed my perspective on life.',
    },
    {
      name: 'John Baptist',
      location: 'Arua',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300',
      text: 'As a refugee, accessing legal help was impossible until I met UCLF. They helped me with my documentation and protected my rights.',
    }
  ];

  const newsBulletins = [
    {
      id: 'n1',
      title: 'West Nile Regional Expansion Launch',
      category: 'Outreach',
      date: 'March 28, 2024',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80',
      link: '/news/n1'
    },
    {
      id: 'n2',
      title: 'CLE Seminar: Ethics in Christian Practice',
      category: 'Education',
      date: 'April 15, 2024',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
      link: '/news/n2'
    },
    {
      id: 'n1', // Re-using for demo
      title: 'Annual General Meeting 2024 Notice',
      category: 'Governance',
      date: 'May 20, 2024',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80',
      link: '/news/n1'
    },
    {
      id: 'n2', // Re-using for demo
      title: 'Land Mediation Success in Omoro',
      category: 'Impact',
      date: 'March 10, 2024',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
      link: '/news/n2'
    }
  ];

  const newsTickerItems = [
    "Upcoming CLE Seminar on Christian Ethics in Legal Practice - April 15th",
    "UCLF expands legal aid operations to 3 new districts in West Nile",
    "Registration for 2024 National Youth Convention is now open",
    "Annual General Meeting scheduled for May 20th at the Kampala Secretariat",
  ];

  const scrollPartners = [...partners, ...partners];
  const scrollGallery = [...galleryImages, ...galleryImages];
  const scrollTestimonials = [...testimonials, ...testimonials];
  const scrollNews = [...newsBulletins, ...newsBulletins];

  return (
    <div className="flex flex-col">
      {/* News Ticker Section */}
      <div className="bg-secondary text-primary py-2 overflow-hidden border-b border-secondary/50 relative z-30">
        <div className="flex items-center">
          <div className="bg-secondary px-4 py-1 font-bold text-xs uppercase tracking-widest flex items-center shrink-0 z-10 border-r border-primary/20">
            <Volume2 size={14} className="mr-2" /> Latest Updates
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {newsTickerItems.map((item, idx) => (
              <Link key={idx} to="/news" className="mx-8 text-xs font-bold hover:underline flex items-center">
                {item} <ArrowRight size={12} className="ml-2 opacity-50" />
              </Link>
            ))}
            {newsTickerItems.map((item, idx) => (
              <Link key={idx + newsTickerItems.length} to="/news" className="mx-8 text-xs font-bold hover:underline flex items-center">
                {item} <ArrowRight size={12} className="ml-2 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
            alt="background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6 border border-secondary/30">
              <Award size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Serving Uganda since 1986</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif">
              Justice and <span className="text-secondary">Human Dignity</span> for All.
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl italic">
              "Speak up and judge fairly; defend the rights of the poor and needy." — Proverbs 31:9
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/membership" 
                className="bg-secondary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg text-center"
              >
                Join the Fraternity
              </Link>
              <Link 
                to="/legal-aid" 
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg text-center"
              >
                Seek Legal Aid
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Our Vision</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We envision a world where justice and human dignity are a reality for all. We share faith in Christ while promoting access to justice through speaking up, fellowship, mentorship and defending the rights of the vulnerable.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-lg text-primary mr-4 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Nationwide Presence</h4>
                    <p className="text-sm text-gray-500">Active in Kampala, Gulu, Kasese, Masaka, Arua, and more across Central, Northern, and South Western regions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" alt="Team meeting" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-secondary p-8 rounded-2xl shadow-xl hidden md:block border-4 border-white">
                <p className="text-primary font-bold text-2xl">NGO Registered</p>
                <p className="text-primary/70 font-medium">Since 2005</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Testimonials Section */}
      <section className="py-24 bg-gray-50 overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="text-primary" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Impact Stories</h2>
          </div>
          <p className="text-gray-500 text-sm">Hearing from the individuals and communities we serve across the Republic.</p>
        </div>
        
        <div className="relative flex overflow-x-hidden pb-12">
          <div className="animate-marquee whitespace-nowrap flex space-x-8">
            {scrollTestimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="w-[450px] bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col justify-between whitespace-normal group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="mb-6">
                  <div className="bg-primary/5 p-3 rounded-2xl w-fit mb-6">
                    <Quote size={24} className="text-primary" />
                  </div>
                  <p className="text-gray-600 font-medium italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-50">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center">
                      <MapPin size={10} className="mr-1" /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners Scrolling Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <Handshake className="text-secondary" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Strategic Partners</h2>
          </div>
          <p className="text-gray-500 text-sm">Collaborating with key institutions to enhance access to justice.</p>
        </div>
        
        <div className="relative flex overflow-x-hidden border-y border-gray-100 py-12 bg-gray-50/50">
          <div className="animate-marquee whitespace-nowrap">
            {scrollPartners.map((partner, idx) => (
              <div 
                key={idx} 
                className="mx-12 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 group"
              >
                <div className="h-16 flex items-center justify-center transition-all">
                  {partner.logoUrl ? (
                    <img 
                      src={partner.logoUrl} 
                      alt={partner.name} 
                      className="max-h-full max-w-[180px] object-contain group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="w-32 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-primary font-black text-[10px] text-center px-2 uppercase shadow-sm">
                      {partner.name}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UCLF in Action (Gallery) */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">UCLF in Action</h2>
            <p className="text-gray-400 text-sm mt-2">A visual journey through our mission and field activities.</p>
          </div>
          <Link to="/gallery" className="hidden md:flex items-center text-secondary font-bold text-sm uppercase tracking-widest hover:underline">
            View Mission Gallery <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap py-4">
            {scrollGallery.map((img, idx) => (
              <div 
                key={idx} 
                className="mx-4 w-[300px] h-[200px] md:w-[400px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl relative group"
              >
                <img src={img} alt="UCLF Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-secondary pl-3">Field Activity {idx % galleryImages.length + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling News Bulletin Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Newspaper className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Regional Bulletin</h2>
            </div>
            <p className="text-gray-500 text-sm">Stay informed about our professional and community interventions.</p>
          </div>
          <Link to="/news" className="hidden md:flex items-center text-primary font-bold text-sm uppercase tracking-widest hover:underline">
            All Bulletins <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="relative flex overflow-x-hidden pb-12">
          <div className="animate-marquee whitespace-nowrap flex space-x-6">
            {scrollNews.map((news, idx) => (
              <Link 
                key={idx} 
                to={news.link}
                className="w-[380px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col whitespace-normal overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                      <Clock size={12} className="mr-1.5 text-primary" /> {news.date}
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors leading-tight mb-4">
                      {news.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                    Read Story <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence Section */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-serif">Regional Presence</h2>
              <p className="text-blue-100 max-w-xl">Serving the indigent and marginalized across Northern, South Western, West Nile, and Central Uganda.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <Globe size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Authorized by Police & Prisons</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'northern', region: 'Northern', districts: 'Gulu District' },
              { id: 'west-nile', region: 'West Nile', districts: 'Arua, Madi Okollo, Terego' },
              { id: 'south-western', region: 'South Western', districts: 'Kasese, Masaka' },
              { id: 'central', region: 'Central', districts: 'Kampala, Kayunga, Buikwe' }
            ].map((office, i) => (
              <Link 
                to={`/regional-office/${office.id}`}
                key={i} 
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <MapPin className="text-secondary" />
                  <ArrowRight size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-serif">{office.region} Region</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{office.districts}</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary group-hover:underline">View Regional Details</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Banner */}
      <section className="bg-primary py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e40af] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between text-white border border-blue-400/20 shadow-2xl">
            <div className="mb-8 lg:mb-0 lg:mr-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center font-serif">
                <Heart className="mr-3 text-secondary" fill="currentColor" /> Pro Bono Fund
              </h2>
              <p className="text-blue-100 text-lg">
                Your donations directly fund criminal defense for the innocent and land protection for widows.
              </p>
            </div>
            <Link 
              to="/donate" 
              className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary hover:text-primary transition-all shadow-xl whitespace-nowrap"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

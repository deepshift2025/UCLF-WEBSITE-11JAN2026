
import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, Maximize2, Calendar, MapPin, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryImage } from '../types';

const DEFAULT_GALLERY_DATA: GalleryImage[] = [
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
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
    caption: 'High Court session - Pro-bono defense for indigent clients.',
    category: 'Legal Aid',
    date: 'February 28, 2024',
    location: 'Gulu'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80',
    caption: 'Plea Bargain initiative at Kayunga Prison - Rights sensitization.',
    category: 'Prison Ministry',
    date: 'January 12, 2024',
    location: 'Kayunga'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80',
    caption: 'Student Symposium - Mentoring future lawyers at UCU Mukono.',
    category: 'Mentorship',
    date: 'December 05, 2023',
    location: 'Mukono'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80',
    caption: 'Fellowship Dinner - Strengthening the bonds of faith among members.',
    category: 'Fellowship',
    date: 'November 20, 2023',
    location: 'Kampala'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80',
    caption: 'Northern Region Board Meeting - Reviewing 2023 performance.',
    category: 'Governance',
    date: 'October 15, 2023',
    location: 'Gulu'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80',
    caption: 'Land Mediation session in a village outreach program.',
    category: 'Legal Aid',
    date: 'September 10, 2023',
    location: 'Masaka'
  }
];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Corrected localStorage key to match Admin panel updates
    const saved = localStorage.getItem('uclf_gallery_data');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        setImages(DEFAULT_GALLERY_DATA);
      }
    } else {
      setImages(DEFAULT_GALLERY_DATA);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = images.filter(img => 
    filter === 'All' || img.category === filter
  );

  const navigateImage = useCallback((direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      nextIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage]);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-primary pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif">Mission Gallery</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium leading-relaxed">
            A visual record of our journey, fellowship, and commitment to justice across the Republic.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {/* Filtering */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-gray-100 flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setSelectedImage(null); // Clear selected if filter changes
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img)}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-100 animate-in fade-in duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                 <span className="bg-secondary text-primary px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest w-fit mb-3">
                   {img.category}
                 </span>
                 <h4 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-4">
                   {img.caption}
                 </h4>
                 <div className="flex items-center text-[9px] font-black text-blue-200 uppercase tracking-widest">
                   <Calendar size={12} className="mr-1.5" /> {img.date}
                 </div>
              </div>
              <div className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 size={16} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
             <Camera size={64} className="mx-auto text-gray-200 mb-6" />
             <h3 className="text-2xl font-black text-gray-900 font-serif">No images found</h3>
             <p className="text-gray-500 mt-2">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            onClick={() => setSelectedImage(null)}
          ></div>
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-secondary transition-colors p-2 z-[120]"
          >
            <X size={40} />
          </button>

          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all z-[120] border border-white/10 group"
            title="Previous Image"
          >
            <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all z-[120] border border-white/10 group"
            title="Next Image"
          >
            <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative z-[110] w-full max-w-6xl flex flex-col items-center">
             <div className="w-full bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                   {/* Image View */}
                   <div className="lg:col-span-8 bg-black flex items-center justify-center min-h-[400px] relative overflow-hidden">
                      <img 
                        key={selectedImage.id}
                        src={selectedImage.url} 
                        alt={selectedImage.caption} 
                        className="max-w-full max-h-[80vh] object-contain animate-in zoom-in duration-500" 
                      />
                   </div>
                   
                   {/* Info Panel */}
                   <div className="lg:col-span-4 bg-white p-12 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-8">
                        <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border border-primary/20">
                          {selectedImage.category}
                        </span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-black text-gray-900 font-serif mb-8 leading-tight">
                        {selectedImage.caption}
                      </h2>
                      
                      <div className="space-y-6 mb-12">
                         <div className="flex items-center text-gray-500 font-bold">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 text-primary">
                               <Calendar size={18} />
                            </div>
                            <div>
                               <p className="text-[10px] uppercase tracking-widest text-gray-400">Captured On</p>
                               <p className="text-sm">{selectedImage.date}</p>
                            </div>
                         </div>
                         <div className="flex items-center text-gray-500 font-bold">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 text-primary">
                               <MapPin size={18} />
                            </div>
                            <div>
                               <p className="text-[10px] uppercase tracking-widest text-gray-400">Location</p>
                               <p className="text-sm font-black">{selectedImage.location} Hub</p>
                            </div>
                         </div>
                      </div>

                      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                         <button 
                           onClick={() => setSelectedImage(null)}
                           className="flex items-center text-primary font-black uppercase text-[10px] tracking-widest hover:translate-x-1 transition-transform"
                         >
                           <ArrowLeft size={16} className="mr-2" /> Back to Gallery
                         </button>
                         <div className="flex space-x-2">
                            <button 
                              onClick={() => navigateImage('prev')}
                              className="p-3 bg-gray-50 hover:bg-primary hover:text-white transition-all rounded-2xl"
                            >
                               <ChevronLeft size={18} />
                            </button>
                            <button 
                              onClick={() => navigateImage('next')}
                              className="p-3 bg-gray-50 hover:bg-primary hover:text-white transition-all rounded-2xl"
                            >
                               <ChevronRight size={18} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

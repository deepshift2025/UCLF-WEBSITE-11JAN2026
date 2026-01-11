
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, MapPin, Users, CheckCircle, Info, ArrowRight, 
  Loader2, Sparkles, Newspaper, ExternalLink, Ticket,
  // Fix: Added 'X' to imports to resolve "Cannot find name 'X'" error
  X, XCircle, AlertTriangle, ChevronLeft, ChevronRight, Filter as FilterIcon
} from 'lucide-react';
import { Event } from '../types';

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
  },
  {
    id: 'e2',
    title: 'National Youth Convention 2024',
    description: 'Inspiring the next generation of Christian lawyers. Featuring keynote speakers, breakout sessions, and networking retreats.',
    type: 'Conference',
    date: 'June 20-22, 2024',
    location: 'Uganda Christian University, Mukono',
    capacity: 300,
    filled: 298,
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80'
  },
  {
    id: 'e3',
    title: 'Northern Region Legal Aid Workshop',
    description: 'Practical training for pro-bono advocates on land dispute mediation and juvenile justice procedures in Northern Uganda.',
    type: 'Workshop',
    date: 'May 05, 2024 • 10:00 AM',
    location: 'Gulu City Main Hall',
    capacity: 50,
    filled: 42,
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80'
  },
  {
    id: 'e4',
    title: 'Monthly Fellowship & Prayer Meeting',
    description: 'A dedicated time for spiritual renewal, prayer for the justice sector, and workplace pastoral support.',
    type: 'Fellowship',
    date: 'April 30, 2024 • 5:30 PM',
    location: 'UCLF Secretariat / Zoom',
    capacity: 200,
    filled: 110,
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80'
  }
];

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null);
  
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 3, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('uclf_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }

    const savedEvents = localStorage.getItem('uclf_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      localStorage.setItem('uclf_events', JSON.stringify(INITIAL_EVENTS));
    }
  }, []);

  const handleRSVP = (eventId: string) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setRsvpLoading(eventId);

    setTimeout(() => {
      const updatedEvents = events.map(event => {
        if (event.id === eventId) {
          const isRemoving = event.isRSVPed;
          return {
            ...event,
            isRSVPed: !isRemoving,
            filled: isRemoving ? event.filled - 1 : event.filled + 1
          };
        }
        return event;
      });
      setEvents(updatedEvents);
      localStorage.setItem('uclf_events', JSON.stringify(updatedEvents));
      setRsvpLoading(null);
    }, 1200);
  };

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  }, [currentMonth]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDay(null);
  };

  const filteredEvents = useMemo(() => {
    if (selectedDay === null) return events;

    return events.filter(e => {
      const datePart = e.date.split(' • ')[0];
      const eventDateObj = new Date(datePart);
      
      return (
        eventDateObj.getDate() === selectedDay &&
        eventDateObj.getMonth() === currentMonth.getMonth() &&
        eventDateObj.getFullYear() === currentMonth.getFullYear()
      );
    });
  }, [events, selectedDay, currentMonth]);

  const hasEventOnDay = (day: number) => {
    return events.some(e => {
      const datePart = e.date.split(' • ')[0];
      const eventDateObj = new Date(datePart);
      return (
        eventDateObj.getDate() === day &&
        eventDateObj.getMonth() === currentMonth.getMonth() &&
        eventDateObj.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80" alt="background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif tracking-tight">Events Calendar</h1>
          <p className="text-xl text-blue-100 italic max-w-2xl mx-auto font-medium">
            Book your seat for seminars, conventions, and fellowship gatherings across the Republic.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <div>
                   <h2 className="text-2xl font-black text-gray-900 flex items-center font-serif">
                      <CalendarIcon className="mr-3 text-primary" size={24} /> Program Calendar
                   </h2>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Select a day to view scheduled events</p>
                </div>
                
                <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                   <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-500"><ChevronLeft size={20} /></button>
                   <span className="text-sm font-black text-gray-800 w-32 text-center uppercase tracking-widest">
                     {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                   </span>
                   <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-500"><ChevronRight size={20} /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest py-2">
                    {d}
                  </div>
                ))}
                {calendarDays.map((day, idx) => (
                  <div key={idx} className="aspect-square flex items-center justify-center relative">
                    {day !== null ? (
                      <button 
                        onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                        className={`w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all relative group ${
                          selectedDay === day 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105 z-10' 
                          : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="text-sm font-bold">{day}</span>
                        {hasEventOnDay(day) && (
                          <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${selectedDay === day ? 'bg-secondary animate-pulse' : 'bg-primary/40'}`}></div>
                        )}
                      </button>
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 flex items-center font-serif">
                  <FilterIcon className="mr-3 text-primary" size={32} /> {selectedDay ? `Events on ${monthNames[currentMonth.getMonth()]} ${selectedDay}` : 'Upcoming Fraternity Events'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Join fellow professionals in Christ-centered activities</p>
              </div>
            </div>

            <div className="space-y-8">
              {filteredEvents.map((event) => {
                const isFull = event.filled >= event.capacity;
                return (
                  <div key={event.id} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative animate-in fade-in duration-500">
                    <div className="absolute top-0 right-0 p-6 z-10">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        event.type === 'CLE' ? 'bg-purple-600 text-white' :
                        event.type === 'Conference' ? 'bg-orange-500 text-white' :
                        event.type === 'Workshop' ? 'bg-green-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {event.type} {event.cleCredits && `• ${event.cleCredits} CLE CREDITS`}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start gap-10">
                      <div className="shrink-0 w-full md:w-48">
                         <div className="aspect-square md:aspect-auto md:h-64 rounded-3xl overflow-hidden shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
                            {event.imageUrl ? (
                              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white">
                                <CalendarIcon size={40} className="opacity-20 mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">UCLF Official</p>
                              </div>
                            )}
                            <div className={`absolute bottom-4 left-4 right-4 py-4 rounded-2xl text-center border-2 transition-colors ${event.isRSVPed ? 'bg-green-50 border-green-200' : 'bg-white/90 border-gray-100 backdrop-blur-sm'}`}>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{event.date.split(' ')[0]}</p>
                              <p className={`text-2xl font-black leading-tight ${event.isRSVPed ? 'text-green-600' : 'text-primary'}`}>{event.date.split(' ')[1]?.replace(',', '') || '??'}</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors font-serif leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-8">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-6 mb-10">
                          <div className="flex items-center text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                            <MapPin size={18} className="mr-2 text-secondary shrink-0" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                            <Users size={18} className="mr-2 text-secondary shrink-0" />
                            <span>{event.filled} / {event.capacity} Registered</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-6">
                          <button
                            onClick={() => handleRSVP(event.id)}
                            disabled={rsvpLoading === event.id || (isFull && !event.isRSVPed)}
                            className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                              event.isRSVPed 
                                ? 'bg-green-600 text-white hover:bg-red-600 hover:shadow-red-200 group/btn' 
                                : isFull 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                  : 'bg-primary text-white hover:bg-blue-800 shadow-primary/20'
                            }`}
                          >
                            {rsvpLoading === event.id ? (
                              <Loader2 size={20} className="animate-spin mr-3" />
                            ) : event.isRSVPed ? (
                              <>
                                <CheckCircle size={20} className="mr-3 group-hover/btn:hidden" />
                                <XCircle size={20} className="mr-3 hidden group-hover/btn:block" />
                                <span className="group-hover/btn:hidden">Attendance Confirmed</span>
                                <span className="hidden group-hover/btn:block">Cancel Attendance</span>
                              </>
                            ) : null}
                            {!event.isRSVPed && (isFull ? 'Event Full' : 'Confirm Attendance')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><Info size={80} /></div>
               <h4 className="font-black mb-4 flex items-center text-secondary uppercase tracking-widest text-xs">
                 Fraternity Protocol
               </h4>
               <p className="text-sm font-medium leading-relaxed opacity-90 mb-6 italic">
                 Most events require official membership status for full accreditation and CLE certificate issuance.
               </p>
               <button onClick={() => navigate('/membership')} className="text-xs font-black uppercase tracking-widest flex items-center hover:underline text-secondary">
                 Check Member Status <ArrowRight size={14} className="ml-2" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

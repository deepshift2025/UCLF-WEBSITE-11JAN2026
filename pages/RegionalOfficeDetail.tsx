
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Users, Star, Calendar, Heart, 
  ArrowLeft, ChevronRight, Gavel, ExternalLink, Quote 
} from 'lucide-react';

interface StaffProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface SuccessStory {
  title: string;
  content: string;
  category: string;
}

interface RegionalEvent {
  title: string;
  date: string;
  location: string;
}

interface OfficeData {
  id: string;
  region: string;
  districts: string;
  address: string;
  phone: string;
  email: string;
  staff: StaffProfile[];
  stories: SuccessStory[];
  events: RegionalEvent[];
  donationTarget: number;
  donationCurrent: number;
}

const REGIONAL_OFFICE_DATA: Record<string, OfficeData> = {
  'northern': {
    id: 'northern',
    region: 'Northern',
    districts: 'Gulu District',
    address: 'Plot 4, Awere Road, Gulu City Centre',
    phone: '+256 471 456 789',
    email: 'gulu@uclf.org.ug',
    staff: [
      { name: 'David Komakech', role: 'Regional Coordinator', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', bio: 'Expert in Land Mediation and ADR with 12 years of experience.' },
      { name: 'Grace Aber', role: 'Legal Officer', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace', bio: 'Specializes in Juvenile Justice and child protection.' }
    ],
    stories: [
      { title: 'Land Recovery for Widows', category: 'Land Justice', content: 'Successfully restored 15 acres of family land to a group of widows in Omoro District through community mediation.' },
      { title: 'Naguru Remand Success', category: 'Juvenile Justice', content: 'Secured rehabilitation and bail for 12 minors wrongfully detained.' }
    ],
    events: [
      { title: 'Regional Law Symposium', date: 'April 20, 2024', location: 'Gulu Main Hall' },
      { title: 'Police Bond Awareness', date: 'May 5, 2024', location: 'Various Police Posts' }
    ],
    donationTarget: 15000000,
    donationCurrent: 6450000,
  },
  'west-nile': {
    id: 'west-nile',
    region: 'West Nile',
    districts: 'Arua, Madi Okollo, Terego',
    address: 'Rhino Camp Road, Arua City',
    phone: '+256 476 111 222',
    email: 'arua@uclf.org.ug',
    staff: [
      { name: 'Robert Anguyo', role: 'Regional Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', bio: 'Advocate specializing in Refugee Rights and International Law.' },
      { name: 'Sarah Candiru', role: 'Paralegal', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', bio: 'Deeply involved in community sensitization programs.' }
    ],
    stories: [
      { title: 'Refugee Documentation', category: 'Human Rights', content: 'Assisted 200 South Sudanese refugees in obtaining legal identification for access to essential services.' }
    ],
    events: [
      { title: 'Refugee Rights Workshop', date: 'April 15, 2024', location: 'Arua Refugee Hub' }
    ],
    donationTarget: 12000000,
    donationCurrent: 3200000,
  },
  'south-western': {
    id: 'south-western',
    region: 'South Western',
    districts: 'Kasese, Masaka',
    address: 'Kasese Municipality, Near High Court',
    phone: '+256 483 555 666',
    email: 'kasese@uclf.org.ug',
    staff: [
      { name: 'Charles Mumbere', role: 'Senior Advocate', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charles', bio: 'Expert in Land Tenure systems in the Rwenzori region.' }
    ],
    stories: [
      { title: 'Kasese Mediation Success', category: 'Mediation', content: 'Resolved a decade-long clan dispute over ancestral land borders without a single court appearance.' }
    ],
    events: [
      { title: 'Justice for Widows Seminar', date: 'June 10, 2024', location: 'Kasese Community Centre' }
    ],
    donationTarget: 20000000,
    donationCurrent: 14800000,
  },
  'central': {
    id: 'central',
    region: 'Central',
    districts: 'Kampala, Kayunga, Buikwe',
    address: 'UCLF Secretariat, P.O. Box 29375, Kampala',
    phone: '+256 414 123 456',
    email: 'central@uclf.org.ug',
    staff: [
      { name: 'Martin Sabiiti', role: 'CEO / Regional Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martin', bio: 'Providing strategic leadership for the entire fraternity.' },
      { name: 'Jane Nakato', role: 'Operations Manager', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', bio: 'Specialist in legal aid coordination and monitoring.' }
    ],
    stories: [
      { title: 'Capital Offense Defense', category: 'Criminal Law', content: 'Successfully defended a wrongfully accused father of four in a landmark acquittal at the High Court.' }
    ],
    events: [
      { title: 'National General Meeting', date: 'May 20, 2024', location: 'Kampala' },
      { title: 'UCLF Law Journal Launch', date: 'July 15, 2024', location: 'Makerere Law Faculty' }
    ],
    donationTarget: 50000000,
    donationCurrent: 21500000,
  }
};

const RegionalOfficeDetail: React.FC = () => {
  const { officeId } = useParams<{ officeId: string }>();
  const office = officeId ? REGIONAL_OFFICE_DATA[officeId] : null;

  if (!office) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <h2 className="text-2xl font-bold mb-4">Office Not Found</h2>
        <Link to="/about" className="text-primary font-bold flex items-center">
          <ArrowLeft size={18} className="mr-2" /> Back to About Us
        </Link>
      </div>
    );
  }

  const donationPercent = Math.min(100, (office.donationCurrent / office.donationTarget) * 100);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" alt="map" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link to="/about" className="inline-flex items-center text-blue-200 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-6">
            <ArrowLeft size={16} className="mr-2" /> All Regions
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-serif">{office.region} Regional Office</h1>
          <p className="text-xl text-blue-100 italic">Serving {office.districts}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left/Center) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Office Location</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Physical Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Phone Support</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{office.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Email</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{office.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 flex items-center justify-center p-4">
                 <div className="text-center opacity-30">
                    <MapPin size={48} className="mx-auto mb-2 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-widest">Interactive Map Placeholder</p>
                 </div>
              </div>
            </div>

            {/* Staff Profiles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Users className="mr-3 text-primary" /> Meet the Regional Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {office.staff.map((member, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/5">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{member.role}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Success Stories */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Star className="mr-3 text-secondary" /> Local Success Stories
              </h2>
              <div className="space-y-6">
                {office.stories.map((story, i) => (
                  <div key={i} className="bg-primary text-white p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                      <Gavel size={120} />
                    </div>
                    <div className="relative z-10">
                      <span className="bg-secondary text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                        {story.category}
                      </span>
                      <h3 className="text-xl font-bold mb-4 font-serif">{story.title}</h3>
                      <div className="flex items-start space-x-4">
                        <Quote size={24} className="text-secondary shrink-0 opacity-50" />
                        <p className="text-blue-100 italic leading-relaxed">{story.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            
            {/* Regional Calendar */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center text-primary font-serif">
                <Calendar className="mr-2" size={20} /> Regional Calendar
              </h3>
              <div className="space-y-6">
                {office.events.map((event, i) => (
                  <div key={i} className="flex space-x-4 items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="bg-gray-50 p-2.5 rounded-xl text-primary shrink-0 flex flex-col items-center">
                       <span className="text-[10px] uppercase font-bold">{event.date.split(' ')[0]}</span>
                       <span className="text-lg font-bold leading-tight">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{event.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center">
                        <MapPin size={10} className="mr-1" /> {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-8 w-full bg-gray-50 text-gray-600 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:bg-gray-100 transition-colors">
                Contact for RSVP
              </Link>
            </div>

            {/* Regional Fundraiser */}
            <div className="bg-[#1e3a8a] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Heart size={80} fill="currentColor" />
              </div>
              <h3 className="text-lg font-bold mb-4 font-serif flex items-center">
                <Heart className="mr-2 text-secondary" size={20} /> Regional Pro Bono Fund
              </h3>
              <p className="text-xs text-blue-100 mb-8 leading-relaxed">
                Directly support cases and field activities in the <strong>{office.region}</strong> region.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold">{office.donationCurrent.toLocaleString()} <span className="text-[10px] uppercase text-blue-300">UGX</span></span>
                  <span className="text-xs font-bold text-blue-300 uppercase">Target: {office.donationTarget.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="bg-secondary h-full transition-all duration-1000" 
                    style={{ width: `${donationPercent}%` }}
                  ></div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-center">
                  {donationPercent.toFixed(1)}% of Regional Goal Reached
                </div>
              </div>

              <Link to="/donate" className="w-full bg-secondary text-primary py-4 rounded-xl font-bold flex items-center justify-center hover:bg-yellow-500 transition-all shadow-lg">
                Donate to this Office <ChevronRight size={18} />
              </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Resources</h3>
               <div className="space-y-2">
                 {[
                   { name: 'Legal Aid Portal', link: '/legal-aid' },
                   { name: 'Resource Library', link: '/resources' },
                   { name: 'Member Registration', link: '/membership' }
                 ].map((link, i) => (
                   <Link key={i} to={link.link} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all">
                      <span className="text-sm font-bold text-gray-700">{link.name}</span>
                      <ExternalLink size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                   </Link>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalOfficeDetail;

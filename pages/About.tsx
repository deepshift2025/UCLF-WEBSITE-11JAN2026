
import React from 'react';
import { Shield, Heart, Scale, Users, MapPin, Globe, CheckCircle, Calendar, Star, Home as HomeIcon, ArrowRight, Briefcase, Mail, Award, Landmark, Quote, Eye, Rocket, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const boardMembers = [
    { name: "Mrs. Anne K.T. Muhairwe", role: "Board President", bio: "Deputy Inspector General of Government. Championing ethical governance.", seed: "Anne" },
    { name: "Counsel James Mukasa", role: "Vice President", bio: "Senior Advocate with focus on Constitutional Law and Rights.", seed: "James" },
    { name: "Dr. Sarah Namulondo", role: "General Secretary", bio: "Legal Academic and specialist in International Humanitarian Law.", seed: "SarahN" },
    { name: "Mr. Peter Wambuzi", role: "Treasurer", bio: "Finance professional and legal consultant for non-profits.", seed: "PeterW" },
    { name: "Hon. Justice David Kato", role: "Director - Ethics", bio: "Advancing Christian ethics in the Ugandan Judiciary.", seed: "DavidK" },
    { name: "Counsel Martha Birungi", role: "Director - Legal Aid", bio: "Leading pro-bono initiatives for marginalized widows.", seed: "MarthaB" },
    { name: "Mr. Robert Ayazika", role: "Director - Northern Region", bio: "Coordinating regional hubs and community outreach.", seed: "RobertA" },
    { name: "Ms. Grace Aber", role: "Director - West Nile", seed: "GraceA", bio: "Focusing on refugee justice and administrative law." },
    { name: "Counsel Simon K.", role: "Director - Student Affairs", seed: "Simon", bio: "Mentoring the next generation of Christian lawyers." },
    { name: "Mrs. Faith Namara", role: "Director - Publicity", seed: "FaithN", bio: "Strategic communications and public relations." },
    { name: "Mr. John Baptist", role: "Director - Welfare", seed: "JohnB", bio: "Ensuring member support and fellowship growth." },
    { name: "Counsel Moses Okello", role: "Board Member", seed: "MosesO", bio: "Legal researcher and human rights activist." }
  ];

  const advisoryBoard = [
    { name: "Bishop Dr. Fred Sheldon", role: "Spiritual Patron", seed: "Sheldon" },
    { name: "Justice Dr. Julia Sebutinde", role: "Legal Advisor", seed: "Julia" },
    { name: "Prof. Emmanuel Lule", role: "Academic Consultant", seed: "Emmanuel" },
    { name: "Hon. Lady Justice Jane K.", role: "Judicial Advisor", seed: "JaneK" },
    { name: "Rev. Canon Peter Johnston", role: "Ethics Overseer", seed: "Canon" },
    { name: "Dr. Martin Ssenkubuge", role: "Policy Advisor", seed: "MartinS" },
    { name: "Ms. Rebecca Alitwala", role: "Community Patron", seed: "Rebecca" },
    { name: "Counsel Joseph Matsiko", role: "Senior Counsel", seed: "Joseph" }
  ];

  const staffMembers = [
    { name: "Mr. Martin Sabiiti", role: "Chief Executive Officer", email: "m.sabiiti@uclf.org.ug", seed: "Martin" },
    { name: "Jane Nakato", role: "Programs Manager", email: "j.nakato@uclf.org.ug", seed: "Jane" },
    { name: "Robert Anguyo", role: "Regional Lead - West Nile", email: "r.anguyo@uclf.org.ug", seed: "Robert" },
    { name: "David Komakech", role: "Regional Lead - North", email: "d.komakech@uclf.org.ug", seed: "David" },
    { name: "Charles Mumbere", role: "Regional Lead - SW", email: "c.mumbere@uclf.org.ug", seed: "Charles" },
    { name: "Sarah Candiru", role: "Finance Officer", email: "s.candiru@uclf.org.ug", seed: "Sarah" },
    { name: "Grace Aber", role: "Senior Legal Officer", email: "g.aber@uclf.org.ug", seed: "Grace" },
    { name: "Peter Okot", role: "M&E Officer", email: "p.okot@uclf.org.ug", seed: "Peter" },
    { name: "Beatrice Namyalo", role: "IT Administrator", email: "b.namyalo@uclf.org.ug", seed: "Beatrice" },
    { name: "John Baptist", role: "Paralegal Coord.", email: "j.baptist@uclf.org.ug", seed: "John" },
    { name: "Faith Namara", role: "Comms Officer", email: "f.namara@uclf.org.ug", seed: "Faith" },
    { name: "Martha Birungi", role: "Executive Asst.", email: "m.birungi@uclf.org.ug", seed: "Martha" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary py-24 px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Our Identity & Mission</h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-xl italic">
          "Speak up and judge fairly; defend the rights of the poor and needy." — Proverbs 31:9
        </p>
      </section>

      {/* History */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">A Legacy of Justice</h2>
            <div className="prose prose-blue text-gray-600 leading-relaxed space-y-4 text-lg">
              <p>
                The <strong>Uganda Christian Lawyers Fraternity (UCLF)</strong> began in 1986 as a fellowship of Christian law students. Over nearly four decades, we have evolved into a premier association of over 500 legal professionals across the Justice, Law and Order Sector.
              </p>
              <p>
                Registered as an NGO in 2005, we are licensed by the Uganda Law Council as a Legal Aid Service Provider and Continuous Legal Education (CLE) training dispenser. We work closely with the Uganda Police Force and Prisons Service to ensure access to justice in every corner of the nation.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "1986", lab: "Founded" },
                { val: "500+", lab: "Members" },
                { val: "10+", lab: "Districts" },
                { val: "7", lab: "Faculties" }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 shadow-sm">
                  <h4 className="text-2xl font-bold text-primary">{stat.val}</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-black">{stat.lab}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-gray-50">
            <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80" alt="Legal justice" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Statement Section */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
            <Landmark size={600} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Vision Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center space-x-6 mb-8">
                <div className="bg-secondary p-5 rounded-3xl shadow-xl text-primary transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <Eye size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-serif text-secondary">Our Vision</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200 mt-1">The Future We Seek</p>
                </div>
              </div>
              <p className="text-2xl font-medium leading-relaxed italic text-blue-50">
                "A world where justice and human dignity are a reality for all."
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center space-x-6 mb-8">
                <div className="bg-secondary p-5 rounded-3xl shadow-xl text-primary transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                  <Target size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-serif text-secondary">Our Mission</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200 mt-1">Our Daily Mandate</p>
                </div>
              </div>
              <p className="text-xl font-medium leading-relaxed text-blue-50">
                "To promote access to justice through fellowship, mentorship, and defending the rights of the vulnerable while sharing faith in Christ."
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                {['Fellowship', 'Mentorship', 'Defense', 'Faith'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from the CEO */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row relative">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-20 -translate-y-20">
               <Scale size={400} className="text-primary" />
            </div>

            {/* CEO Photo Column */}
            <div className="lg:w-2/5 relative">
              <div className="h-full min-h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Mr. Martin Sabiiti" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-12 text-white">
                 <h3 className="text-2xl font-black font-serif">Mr. Martin Sabiiti</h3>
                 <p className="text-sm font-black text-secondary uppercase tracking-[0.2em] mt-2">Chief Executive Officer</p>
              </div>
            </div>

            {/* Statement Content Column */}
            <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center">
              <div className="mb-8">
                <div className="bg-primary/5 p-4 rounded-3xl w-fit mb-8 shadow-inner">
                  <Quote size={40} className="text-primary opacity-20" />
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 font-serif leading-tight mb-8">
                   Refining the <span className="text-primary italic">Pursuit of Justice</span> through Faith.
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium italic">
                  <p>
                    "Since our humble beginnings in 1986, the Uganda Christian Lawyers Fraternity has stood as a beacon of hope for those forgotten by the mechanisms of power. Our mission is clear: to reconcile professional excellence with biblical compassion."
                  </p>
                  <p>
                    "We do not merely practice law; we serve a higher mandate. Whether through land mediation for widows in the North or pro-bono defense in the High Court, our work is a testament to the belief that every Ugandan deserves human dignity, regardless of their financial standing."
                  </p>
                  <p>
                    "As we look to the future, we invite you to join this fellowship. Together, we are not just building a legal practice; we are building a more just and empathetic Republic for generations to come."
                  </p>
                </div>
              </div>
              
              <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                 <div className="flex items-center space-x-6">
                    <div className="h-px w-12 bg-primary/20"></div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest italic">Official Statement • 2024 Strategic Launch</p>
                 </div>
                 <Link to="/contact" className="inline-flex items-center text-primary font-black uppercase text-xs tracking-[0.2em] hover:translate-x-2 transition-transform">
                   Request a Meeting <ArrowRight size={16} className="ml-2" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Board Section (12 Members) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 font-serif">Board of Directors</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Providing strategic governance and ensuring the UCLF vision is upheld across the Republic.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {boardMembers.map((member, i) => (
            <div key={i} className={`bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-primary transition-all duration-500 ${i < 2 ? 'lg:col-span-2 lg:flex-row lg:text-left lg:items-start lg:gap-8 bg-blue-50/30' : ''}`}>
              <div className={`${i < 2 ? 'w-32 h-32' : 'w-24 h-24'} rounded-3xl overflow-hidden mb-6 lg:mb-0 shadow-inner group-hover:scale-105 transition-transform border-4 border-white`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{member.name}</h3>
                <p className="text-primary font-black mb-4 text-[10px] uppercase tracking-widest">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed italic">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Board Section (8 Members) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <div className="inline-flex items-center space-x-2 bg-secondary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Landmark size={14} className="text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Elders & Guardians</span>
             </div>
             <h2 className="text-3xl font-black text-gray-900 mb-4 font-serif">Advisory Board & Patrons</h2>
             <p className="text-gray-500 max-w-xl mx-auto italic">Providing spiritual oversight and high-level strategic counsel.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryBoard.map((advisor, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center text-center group hover:shadow-xl transition-all">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/10 group-hover:scale-110 transition-transform">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${advisor.seed}`} alt={advisor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{advisor.name}</h4>
                <p className="text-secondary font-black text-[9px] uppercase tracking-widest">{advisor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secretariat Staff Section (12 Members) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4 font-serif">Our Secretariat Team</h2>
          <p className="text-gray-500 max-w-xl mx-auto italic">The professional engine behind our legal aid, outreach programs, and member services.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((member, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-gray-50 hover:shadow-2xl transition-all duration-500">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 shadow-sm border-2 border-white group-hover:scale-110 transition-transform">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-gray-900 text-base leading-tight mb-1">{member.name}</h4>
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-primary rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
                 <Briefcase size={10} className="mr-1.5" /> {member.role}
              </div>
              <a href={`mailto:${member.email}`} className="flex items-center text-[10px] font-bold text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">
                 <Mail size={12} className="mr-1.5" /> {member.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Presence */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black mb-4 font-serif">Regional Presence</h2>
              <p className="text-blue-100 max-w-xl">Serving the indigent and marginalized across Northern, South Western, West Nile, and Central Uganda.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full border border-white/20">
              <Globe size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Authorized Agency</span>
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
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all hover:-translate-y-2 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <MapPin className="text-secondary" size={24} />
                  <ArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-serif">{office.region} Region</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">{office.districts}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary group-hover:underline">Explore Hub</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

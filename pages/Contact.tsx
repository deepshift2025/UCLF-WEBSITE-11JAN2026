
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, 
  CheckCircle, Clock, Globe, MessageSquare, AlertCircle, 
  ChevronRight, ArrowRight, ShieldCheck, HeartHandshake,
  UserCheck, HelpCircle, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to Secretariat
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const offices = [
    {
      city: 'Kampala (Head Office)',
      address: 'P.O. Box 29375, Kampala, Uganda',
      phone: '+256 414 123 456',
      email: 'info@uclf.org.ug',
      districts: 'Central Region Hub'
    },
    {
      city: 'Gulu (Northern)',
      address: 'Plot 4, Awere Road, Gulu City',
      phone: '+256 471 000 000',
      email: 'gulu@uclf.org.ug',
      districts: 'Northern Region Hub'
    },
    {
      city: 'Kasese (South Western)',
      address: 'Rwenzori Region Office, Near High Court',
      phone: '+256 483 111 222',
      email: 'southwest@uclf.org.ug',
      districts: 'Western Region Hub'
    },
    {
      city: 'Arua (West Nile)',
      address: 'Rhino Camp Road, Arua City Hub',
      phone: '+256 476 333 444',
      email: 'westnile@uclf.org.ug',
      districts: 'West Nile Hub'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="bg-primary pt-32 pb-48 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" alt="contact" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-3 bg-secondary/20 text-secondary px-6 py-2 rounded-full mb-8 border border-secondary/30 backdrop-blur-md">
            <HeartHandshake size={18} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">We are here to serve</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 font-serif leading-tight">Connect with <span className="text-secondary">Our Team</span></h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto italic font-medium leading-relaxed">
            From legal aid requests to membership inquiries, our Secretariat across the Republic is ready to provide guidance and support.
          </p>
        </div>
      </section>

      <section className="py-24 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 h-full">
                <h2 className="text-2xl font-black text-gray-900 mb-10 font-serif border-b border-gray-50 pb-4">Headquarters</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-blue-50 p-4 rounded-2xl text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-widest mb-1 text-primary">Physical Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">UCLF Secretariat, P.O. Box 29375,<br />Kampala, Uganda</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-blue-50 p-4 rounded-2xl text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-widest mb-1 text-primary">Hotline Support</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">+256 414 123 456<br />Monday – Friday, 8am – 5pm</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-blue-50 p-4 rounded-2xl text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-widest mb-1 text-primary">General Inquiries</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">info@uclf.org.ug</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-50">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Social Fellowship</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: <Facebook />, link: "#" },
                      { icon: <Twitter />, link: "#" },
                      { icon: <Linkedin />, link: "#" }
                    ].map((social, i) => (
                      <a key={i} href={social.link} className="w-12 h-12 rounded-2xl bg-gray-50 text-primary flex items-center justify-center hover:bg-secondary hover:text-primary transition-all shadow-sm border border-gray-100">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <AlertCircle size={140} className="text-secondary" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-4 font-serif text-secondary flex items-center">
                    <AlertCircle size={20} className="mr-2" /> Legal Emergency?
                  </h4>
                  <p className="text-sm text-blue-100 leading-relaxed font-medium mb-10 opacity-90 italic">
                    If you are facing an immediate threat of arrest, land eviction, or human rights violation, please prioritize our Legal Aid portal.
                  </p>
                  <Link to="/legal-aid" className="w-full py-4 bg-secondary text-primary font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-yellow-400 transition-all shadow-lg shadow-black/20">
                    File Urgent Case Request <ArrowRight size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 lg:p-16 h-full flex flex-col">
                {!submitted ? (
                  <>
                    <div className="mb-12">
                      <h2 className="text-4xl font-black mb-4 font-serif text-gray-900">Send a Digital Inquiry</h2>
                      <p className="text-gray-500 font-medium">Our Secretariat will review your message and route it to the relevant department.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Identity</label>
                          <div className="relative">
                            <UserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              required 
                              type="text" 
                              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold" 
                              placeholder="e.g. John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Electronic Mail</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              required 
                              type="email" 
                              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold" 
                              placeholder="name@provider.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Telephone Contact</label>
                          <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text" 
                              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold" 
                              placeholder="+256..."
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Inquiry Category</label>
                          <select 
                            className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          >
                            <option>General Inquiry</option>
                            <option>Membership Application</option>
                            <option>Legal Aid Eligibility</option>
                            <option>Donations & Partnership</option>
                            <option>Media & Secretariat</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Message Body</label>
                        <textarea 
                          required 
                          rows={6} 
                          className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium resize-none leading-relaxed" 
                          placeholder="How can our fraternity assist you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-6 border-t border-gray-50">
                        <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <Clock size={16} className="mr-3 text-primary animate-pulse" />
                          Response usually within 24 business hours
                        </div>
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full sm:w-auto bg-primary text-white px-16 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center hover:bg-blue-800 transition-all shadow-2xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <><Loader2 className="animate-spin mr-3" /> Transmitting...</>
                          ) : (
                            <>Authorize Send <Send size={18} className="ml-3" /></>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-20 text-center animate-in zoom-in duration-500 flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-10 shadow-inner">
                      <CheckCircle size={64} />
                    </div>
                    <h2 className="text-4xl font-black mb-6 font-serif text-gray-900">Communication Logged</h2>
                    <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto italic font-medium leading-relaxed">
                      Thank you for reaching out, <span className="font-bold text-primary">{formData.name}</span>. Your inquiry regarding <strong>{formData.subject}</strong> has been transmitted to the Secretariat.
                    </p>
                    <div className="bg-blue-50/50 rounded-[2rem] p-8 mb-12 text-left border border-blue-100 flex items-start max-w-lg shadow-sm">
                      <MessageSquare size={24} className="text-primary mr-4 mt-1 shrink-0" />
                      <p className="text-sm text-blue-900 leading-relaxed font-medium">"We have received your message. A reference number has been generated and a member of our team will contact you via <strong>{formData.email}</strong> shortly."</p>
                    </div>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all flex items-center"
                    >
                      New Inquiry <ArrowRight size={14} className="ml-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Hubs Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-gray-900 font-serif flex items-center">
               <Globe className="mr-4 text-primary" size={32} /> Our Regional Presence
            </h2>
            <p className="text-gray-500 mt-2 font-medium">UCLF maintains active hubs to ensure access to justice across the Republic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="bg-gray-50 p-3 rounded-xl w-fit mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <MapPin size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-1 leading-tight">{office.city}</h4>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-6">{office.districts}</p>
                <div className="space-y-4 mb-8 flex-grow">
                   <p className="text-xs text-gray-500 font-medium leading-relaxed">{office.address}</p>
                   <p className="text-xs text-primary font-black">{office.phone}</p>
                </div>
                <div className="pt-6 border-t border-gray-50">
                  <Link to={`/regional-office/${office.city.toLowerCase().split(' ')[0]}`} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary flex items-center group-hover:translate-x-2 transition-transform">
                    Regional Details <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Quick Support Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="w-20 h-20 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
             <HelpCircle size={40} />
           </div>
           <h2 className="text-4xl font-black text-gray-900 mb-6 font-serif">Frequently Asked Inquiries</h2>
           <p className="text-gray-500 mb-16 font-medium">Quick answers to common professional and legal aid questions.</p>
           
           <div className="space-y-6 text-left">
              {[
                { q: "How do I become a registered member of the Fraternity?", a: "Membership is open to Christian law students, advocates, and judicial officers. You can register via our Membership portal, upload your credentials, and pay the annual fee based on your tier." },
                { q: "Who is eligible for UCLF pro-bono legal aid services?", a: "Our services are exclusively for 'indigent persons' who cannot afford private legal fees. We prioritize cases involving widows, orphans, refugees, and capital defense." },
                { q: "Can I earn CLE credits through UCLF events?", a: "Yes. UCLF is a licensed provider of Continuous Legal Education (CLE). Check our Events Calendar for upcoming accredited seminars and workshops." }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:border-primary/20 transition-all group">
                   <h4 className="text-lg font-black text-gray-900 mb-4 font-serif flex items-center group-hover:text-primary transition-colors">
                     <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 text-xs shrink-0 shadow-lg">?</span>
                     {faq.q}
                   </h4>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed pl-12">
                     {faq.a}
                   </p>
                </div>
              ))}
           </div>

           <div className="mt-20 p-12 bg-primary text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                <ShieldCheck size={280} fill="white" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-3xl font-black mb-6 font-serif text-secondary">Fraternity Registry</h2>
                 <p className="text-lg text-blue-100 leading-relaxed font-medium mb-10 italic">
                   Looking for a specific advocate or member within our network? Access the official UCLF Public Directory to connect with verified Christian lawyers nationwide.
                 </p>
                 <Link to="/member-directory" className="inline-flex items-center px-12 py-5 bg-white text-primary rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-secondary hover:text-primary transition-all active:scale-95">
                   Search Member Directory <ChevronRight className="ml-3" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

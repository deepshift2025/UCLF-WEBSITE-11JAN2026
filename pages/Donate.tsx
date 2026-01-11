
import React, { useState } from 'react';
import { 
  Heart, CreditCard, Smartphone, CheckCircle, Home, Scale, 
  Construction, Handshake, Users, Clock, ArrowRight, 
  Sparkles, MapPin, Briefcase, Award, MessageSquare, X, Loader2,
  ShieldCheck
} from 'lucide-react';

const Donate: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('100000');
  const [fund, setFund] = useState<'justice-house' | 'pro-bono'>('justice-house');
  const [method, setMethod] = useState<'mobile' | 'card'>('mobile');

  // Volunteer State
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [isVolunteerLoading, setIsVolunteerLoading] = useState(false);
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    email: '',
    role: 'Legal Aid Support',
    region: 'Central'
  });

  const presetAmounts = ['50000', '100000', '500000', '1000000'];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVolunteerLoading(true);
    setTimeout(() => {
      setIsVolunteerLoading(false);
      setVolunteerSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Heart size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 font-serif text-gray-900 tracking-tight">Partner with UCLF</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto italic font-medium leading-relaxed">
            "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink... I was in prison and you came to visit me."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Main Donation Form */}
          <div className="lg:col-span-8">
            {step === 1 ? (
              <div className="bg-white rounded-[3rem] shadow-xl p-10 lg:p-12 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <Scale size={240} className="text-primary" />
                </div>
                <h3 className="text-xl font-black mb-8 font-serif text-gray-900 border-b border-gray-50 pb-4">01. Select Strategic Project</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <button 
                    onClick={() => setFund('justice-house')}
                    className={`p-8 rounded-[2rem] border-2 text-left transition-all relative group ${fund === 'justice-house' ? 'border-primary bg-blue-50 ring-4 ring-primary/5' : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'}`}
                  >
                    <div className={`p-4 rounded-2xl w-fit mb-6 shadow-sm transition-all ${fund === 'justice-house' ? 'bg-primary text-white scale-110' : 'bg-white text-gray-400 group-hover:text-primary'}`}>
                      <Construction size={28} />
                    </div>
                    <h4 className="font-black text-gray-900">Justice House Project</h4>
                    <p className="text-[10px] text-primary mt-2 uppercase font-black tracking-[0.2em]">Capital Campaign</p>
                  </button>
                  <button 
                    onClick={() => setFund('pro-bono')}
                    className={`p-8 rounded-[2rem] border-2 text-left transition-all relative group ${fund === 'pro-bono' ? 'border-primary bg-blue-50 ring-4 ring-primary/5' : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'}`}
                  >
                    <div className={`p-4 rounded-2xl w-fit mb-6 shadow-sm transition-all ${fund === 'pro-bono' ? 'bg-primary text-white scale-110' : 'bg-white text-gray-400 group-hover:text-primary'}`}>
                      <Scale size={28} />
                    </div>
                    <h4 className="font-black text-gray-900">Pro Bono Fund</h4>
                    <p className="text-[10px] text-primary mt-2 uppercase font-black tracking-[0.2em]">Operations & Legal Aid</p>
                  </button>
                </div>

                <h3 className="text-xl font-black mb-8 font-serif text-gray-900 border-b border-gray-50 pb-4">02. Contribution Amount (UGX)</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {presetAmounts.map((amt) => (
                    <button 
                      key={amt} 
                      onClick={() => setAmount(amt)} 
                      className={`py-5 rounded-2xl font-black text-sm border-2 transition-all ${amount === amt ? 'border-primary bg-primary text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'}`}
                    >
                      {parseInt(amt).toLocaleString()}
                    </button>
                  ))}
                  <div className="col-span-2 lg:col-span-4 relative group">
                    <input 
                      type="text" 
                      className="w-full px-8 py-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-xl shadow-inner" 
                      placeholder="Other Amount" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value.replace(/\D/g,''))} 
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-gray-400 uppercase tracking-widest text-xs">UGX</span>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full bg-primary text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-800 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center group">
                  Proceed to Secure Checkout <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : step === 2 ? (
              <div className="bg-white rounded-[3rem] shadow-xl p-10 lg:p-12 border border-gray-100 animate-in slide-in-from-right duration-500">
                <h3 className="text-xl font-black mb-8 font-serif text-gray-900 border-b border-gray-50 pb-4 flex items-center">
                  <CreditCard className="mr-3 text-primary" /> Secure Payment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                   <button onClick={() => setMethod('mobile')} className={`p-8 rounded-[2rem] border-2 flex flex-col items-center transition-all ${method === 'mobile' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>
                    <Smartphone className="mb-4" size={32} />
                    <span className="text-sm font-black uppercase tracking-widest">Mobile Money</span>
                  </button>
                  <button onClick={() => setMethod('card')} className={`p-8 rounded-[2rem] border-2 flex flex-col items-center transition-all ${method === 'card' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>
                    <CreditCard className="mb-4" size={32} />
                    <span className="text-sm font-black uppercase tracking-widest">Card Payment</span>
                  </button>
                </div>

                {method === 'mobile' ? (
                  <div className="space-y-6 mb-12 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">MTN / Airtel Phone Number</label>
                      <input type="text" className="w-full px-6 py-5 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 font-bold" placeholder="07XX XXXXXX" />
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-400 uppercase">
                      {/* Fix: Component correctly imported from lucide-react above */}
                      <ShieldCheck size={14} className="text-primary" /> Secure Transaction by Flutterwave
                    </div>
                  </div>
                ) : (
                   <div className="space-y-6 mb-12 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
                    <input type="text" className="w-full px-6 py-5 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 font-bold" placeholder="Full Name on Card" />
                    <input type="text" className="w-full px-6 py-5 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 font-bold" placeholder="Card Number (0000 0000 0000 0000)" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" className="w-full px-6 py-5 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 font-bold" placeholder="MM / YY" />
                      <input type="text" className="w-full px-6 py-5 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/5 font-bold" placeholder="CVV" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-500 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Go Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Confirm {parseInt(amount).toLocaleString()} UGX Gift</button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] shadow-xl p-20 text-center border border-gray-100 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <CheckCircle size={64} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 font-serif">Impact Authenticated</h2>
                <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto italic font-medium">
                  A receipt for <span className="font-black text-primary">{parseInt(amount).toLocaleString()} UGX</span> has been sent. Thank you for building a legacy of justice with UCLF.
                </p>
                <button onClick={() => setStep(1)} className="bg-primary text-white px-20 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-800 transition-all">Finish</button>
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Home size={120} fill="white" />
              </div>
              <div className="relative z-10">
                <div className="bg-secondary p-3 rounded-xl w-fit mb-6 shadow-lg shadow-black/20 text-primary">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-2xl font-black mb-4 font-serif text-secondary">Justice House</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-medium mb-10 opacity-90 italic">
                  Building a permanent home for 40 professional staff, a high-tech resource library, and a restoration center for survivors of domestic violence.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] uppercase font-black tracking-[0.2em]">
                    <span className="text-blue-200">Capital Target Achieved</span>
                    <span className="text-secondary">40%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-secondary h-full w-[40%] transition-all duration-1000 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                 {/* Fix: Component correctly imported from lucide-react above */}
                 <ShieldCheck size={16} className="mr-2 text-primary" /> Institutional Transparency
               </h4>
               <p className="text-[11px] text-gray-500 leading-relaxed mb-8 italic font-medium">UCLF is a registered NGO (S.5914/5536). Audited financial reports are presented annually to the General Assembly and the Uganda Law Council.</p>
               <div className="flex items-center space-x-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                  <div className="h-8 w-12 bg-gray-200 rounded-lg flex items-center justify-center font-black text-[8px] border border-gray-300 uppercase">U.L.C</div>
                  <div className="h-8 w-12 bg-gray-200 rounded-lg flex items-center justify-center font-black text-[8px] border border-gray-300 uppercase">P.E.S.A</div>
                  <div className="h-8 w-12 bg-gray-200 rounded-lg flex items-center justify-center font-black text-[8px] border border-gray-300 uppercase">J.L.O.S</div>
               </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 italic">
               <p className="text-gray-600 text-sm leading-relaxed mb-4">"Your donation doesn't just hire a lawyer; it restores a family's land and gives hope to a child in detention."</p>
               <p className="text-[10px] font-black text-primary uppercase tracking-widest">— Martin Sabiiti, CEO</p>
            </div>
          </div>
        </div>

        {/* Volunteer Section - NEW FEATURE */}
        <section className="mt-20 border-t-4 border-dashed border-gray-200 pt-20">
           <div className="bg-gradient-to-br from-white to-gray-50 rounded-[4rem] p-12 lg:p-20 shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                 <Handshake size={320} className="text-primary" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                 <div>
                    <div className="inline-flex items-center space-x-3 bg-secondary/20 text-primary px-6 py-2.5 rounded-full mb-8 border border-secondary/20 shadow-sm">
                       <Clock size={18} className="text-secondary animate-pulse" />
                       <span className="text-xs font-black uppercase tracking-widest">Share Your Gifts</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-serif mb-8 leading-tight">Volunteer Your Time</h2>
                    <p className="text-xl text-gray-500 leading-relaxed font-medium mb-12 italic">
                       We value professional expertise and compassionate hearts as much as financial contributions. Join our network of over 100 active volunteers across Uganda.
                    </p>
                    
                    <div className="space-y-8">
                       {[
                         { title: 'Legal Aid Support', icon: <Briefcase />, desc: 'Join pro-bono defense teams in various regional court circuits.' },
                         { title: 'Youth Mentorship', icon: <Users />, desc: 'Guide law students in Christian ethics and professional excellence.' },
                         { title: 'Community Outreach', icon: <MapPin />, desc: 'Assist in legal sensitization and land mediation field activities.' }
                       ].map((v, i) => (
                         <div key={i} className="flex items-start space-x-6 group/item">
                            <div className="bg-white p-4 rounded-2xl text-primary shadow-sm border border-gray-100 group-hover/item:bg-primary group-hover/item:text-white transition-all">
                               {v.icon}
                            </div>
                            <div>
                               <h4 className="font-black text-gray-900 text-lg mb-1">{v.title}</h4>
                               <p className="text-sm text-gray-500 font-medium">{v.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative">
                    <div className="absolute -top-6 -right-6 bg-primary text-secondary p-8 rounded-3xl shadow-xl hidden md:block">
                       <p className="text-2xl font-black leading-none">100+</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Active Advocates</p>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 font-serif mb-8 border-b border-gray-50 pb-4">Expression of Interest</h3>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Legal Name</label>
                          <input 
                            required type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                            placeholder="e.g. Counsel Sarah Nam..."
                            value={volunteerData.name}
                            onChange={e => setVolunteerData({...volunteerData, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Primary Interest Area</label>
                          <select 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none"
                            value={volunteerData.role}
                            onChange={e => setVolunteerData({...volunteerData, role: e.target.value})}
                          >
                             <option>Legal Aid Support</option>
                             <option>Student Mentorship</option>
                             <option>Ethics Research</option>
                             <option>Resource Mobilization</option>
                          </select>
                       </div>
                       <div className="pt-4">
                          <button 
                            type="submit" 
                            disabled={isVolunteerLoading || volunteerSubmitted}
                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all flex items-center justify-center ${volunteerSubmitted ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-blue-800'}`}
                          >
                             {isVolunteerLoading ? (
                               <Loader2 className="animate-spin" />
                             ) : volunteerSubmitted ? (
                               <><CheckCircle size={16} className="mr-2" /> Application Logged</>
                             ) : (
                               <>Volunteer Now <ArrowRight size={16} className="ml-2" /></>
                             )}
                          </button>
                       </div>
                       {volunteerSubmitted && (
                         <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-green-700 text-xs font-bold text-center animate-in fade-in slide-in-from-top-2">
                            Thank you, {volunteerData.name.split(' ')[0]}! Our Secretariat will contact you for a professional screening within 48 hours.
                         </div>
                       )}
                    </form>
                 </div>
              </div>
           </div>
        </section>

        {/* Footer Support Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="bg-blue-50 text-primary p-3 rounded-xl w-fit mx-auto mb-4"><Award size={24} /></div>
              <h4 className="font-black text-gray-900 text-sm mb-1">Corporate Giving</h4>
              <p className="text-xs text-gray-500 font-medium">Partner your Law Firm or Company with our national mission.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="bg-blue-50 text-primary p-3 rounded-xl w-fit mx-auto mb-4"><MessageSquare size={24} /></div>
              <h4 className="font-black text-gray-900 text-sm mb-1">Impact Stories</h4>
              <p className="text-xs text-gray-500 font-medium">Receive monthly updates on how your gifts are changing lives.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="bg-blue-50 text-primary p-3 rounded-xl w-fit mx-auto mb-4"><Users size={24} /></div>
              <h4 className="font-black text-gray-900 text-sm mb-1">Group Gifts</h4>
              <p className="text-xs text-gray-500 font-medium">Organize a contribution drive within your local fellowship chapter.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;


import React from 'react';
import { 
  ArrowLeft, ShieldCheck, Scale, AlertCircle, 
  CheckCircle2, Info, Gavel, Users, Heart,
  // Fix: Added 'ArrowRight' to imports to resolve "Cannot find name 'ArrowRight'" error
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EligibilityGuidelines: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-primary text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" alt="court" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/legal-aid" className="inline-flex items-center text-blue-200 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Legal Aid Portal
          </Link>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 font-serif tracking-tight">Eligibility Guidelines</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
            Defining the criteria for UCLF pro-bono legal assistance and justice support.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 lg:p-16 space-y-16">
          
          {/* Section 1: Core Mission */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl text-primary shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 font-serif">The Indigent Clause</h2>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Core Mandate</p>
              </div>
            </div>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
              <p className="mb-6">
                The Uganda Christian Lawyers Fraternity (UCLF) is dedicated to fulfilling the biblical mandate to defend the needy. However, due to limited resources, we must prioritize those in absolute need. 
              </p>
              <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 italic text-blue-900 mb-6">
                "UCLF exclusively serves <strong>indigent persons</strong>—defined as individuals who demonstrate a complete lack of financial means to engage private legal counsel without causing significant hardship to their basic survival (food, shelter, health)."
              </div>
            </div>
          </section>

          {/* Section 2: Criteria Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center font-serif">
                <CheckCircle2 className="mr-3 text-green-600" /> Qualification Criteria
              </h3>
              <ul className="space-y-4 text-sm font-medium text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0"></span>
                  <span>No identifiable property or assets that can be liquidated.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0"></span>
                  <span>Monthly household income below the national poverty threshold.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0"></span>
                  <span>Marginalized status (Widows, Orphans, Refugees, PWDs).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0"></span>
                  <span>Cases involving gross human rights violations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50/30 p-8 rounded-[2.5rem] border border-red-100">
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center font-serif">
                <AlertCircle className="mr-3 text-red-600" /> Common Exclusions
              </h3>
              <ul className="space-y-4 text-sm font-medium text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 mr-3 shrink-0"></span>
                  <span>Commercial litigation for profit-making entities.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 mr-3 shrink-0"></span>
                  <span>Divorce proceedings (unless involving domestic violence).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 mr-3 shrink-0"></span>
                  <span>Cases where the applicant has private legal counsel.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 mr-3 shrink-0"></span>
                  <span>Defamation or libel suits for public figures.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Verification Process */}
          <section className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 shadow-inner">
                <Info size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 font-serif">Verification Workflow</h2>
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Regional Audit</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Dossier Submission", 
                  desc: "Applicant logs case details via the UCLF portal or regional office physically." 
                },
                { 
                  step: "02", 
                  title: "Regional Screening", 
                  desc: "Regional coordinators conduct physical or phone-based verification of indigent status." 
                },
                { 
                  step: "03", 
                  title: "Counsel Assignment", 
                  desc: "Approved cases are assigned to pro-bono advocates within the Fraternity network." 
                }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                  <span className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform">{item.step}</span>
                  <h4 className="font-black text-gray-900 mb-3 mt-4 leading-tight">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Christian Ethics */}
          <section className="p-12 bg-primary rounded-[3.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <Heart size={280} fill="white" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-black mb-6 font-serif text-secondary">The Ministry of Reconciliation</h2>
              <p className="text-lg text-blue-100 leading-relaxed font-medium mb-10 italic">
                "UCLF does not just provide legal representation; we seek spiritual restoration. We encourage Alternative Dispute Resolution (ADR) and mediation to preserve community bonds, following the example of Christ."
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  Licensed ADR Provider
                </div>
                <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  Faith-Based Justice
                </div>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-lg font-black text-gray-900 font-serif mb-1">Ready to Proceed?</h4>
              <p className="text-sm text-gray-500 font-medium">Ensure you have your supporting documents ready for upload.</p>
            </div>
            <Link to="/legal-aid" className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-blue-800 transition-all flex items-center">
              Submit Case Intake <ArrowRight size={18} className="ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityGuidelines;

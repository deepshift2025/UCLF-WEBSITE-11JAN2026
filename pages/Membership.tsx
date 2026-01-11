
import React, { useState, useRef } from 'react';
import { Check, UserPlus, Briefcase, GraduationCap, Award, BookOpen, Star, X, Upload, FileText, CheckCircle, Loader2, AlertCircle, ArrowRight, Building2, Landmark, ShieldCheck, Users, Scale, Mail, Phone } from 'lucide-react';
import { MembershipTier } from '../types';
import { useNavigate, Link } from 'react-router-dom';

interface BaseForm {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
  church: string;
  postalAddress: string;
}

interface StudentForm extends BaseForm {
  university: string;
  faculty: string;
  yearOfStudy: string;
  studentId: string;
  gradYear: string;
  universityEmail: string;
  whatsappPhone: string;
}

interface FullMemberForm extends BaseForm {
  barNumber: string;
  rollNumber: string;
  firmName: string;
  practiceYears: string;
  specialization: string;
  proBonoInterest: boolean;
}

interface AssociateForm extends BaseForm {
  profession: string;
  employer: string;
  designation: string;
  reasonForJoining: string;
  otherMemberships: string;
}

type MembershipFormState = StudentForm & FullMemberForm & AssociateForm;

const INITIAL_FORM_STATE: Partial<MembershipFormState> = {
  name: '',
  email: '',
  phone: '',
  cv: null,
  church: '',
  postalAddress: '',
  university: '',
  faculty: '',
  yearOfStudy: '',
  studentId: '',
  gradYear: '',
  universityEmail: '',
  whatsappPhone: '',
  barNumber: '',
  rollNumber: '',
  firmName: '',
  practiceYears: '',
  specialization: '',
  proBonoInterest: false,
  profession: '',
  employer: '',
  designation: '',
  reasonForJoining: '',
  otherMemberships: '',
};

const Membership: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<Partial<MembershipFormState>>(INITIAL_FORM_STATE);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tiers = [
    {
      name: MembershipTier.STUDENT,
      icon: <GraduationCap size={32} />,
      price: '50,000 UGX',
      period: 'per year',
      features: ['University Chapters', 'Annual Law Symposium', 'Internship Placement', 'Leadership Retreats', 'Spiritual Mentorship'],
      color: 'bg-gray-100',
    },
    {
      name: MembershipTier.FULL,
      icon: <Briefcase size={32} />,
      price: '200,000 UGX',
      period: 'per year',
      features: ['Voting Rights', 'Licensed CLE Credits', 'Bar & Bench Events', 'UCLF Law Journal Access', 'Pro Bono Assignments'],
      color: 'bg-blue-50 border-2 border-primary',
      popular: true,
    },
    {
      name: MembershipTier.ASSOCIATE,
      icon: <Award size={32} />,
      price: '150,000 UGX',
      period: 'per year',
      features: ['Networking Opportunities', 'Faith & Ethics Seminars', 'Small Group Fellowship', 'Welfare Support', 'Access to Events'],
      color: 'bg-gray-100',
    },
  ];

  const handleOpenModal = (tier: MembershipTier) => {
    // Crucial: Reset form when opening to avoid "sticky" data from other tiers
    setFormData(INITIAL_FORM_STATE);
    setSelectedTier(tier);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.name && selectedTier) {
        localStorage.setItem('uclf_user', JSON.stringify({
          name: formData.name,
          tier: selectedTier,
          email: formData.email || formData.universityEmail
        }));
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const goToDashboard = () => {
    if (selectedTier === MembershipTier.FULL) navigate('/case-management');
    else if (selectedTier === MembershipTier.ASSOCIATE) navigate('/associate-dashboard');
    else navigate('/student-dashboard');
    setIsModalOpen(false);
  };

  const renderTierSpecificFields = () => {
    switch (selectedTier) {
      case MembershipTier.STUDENT:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-3">University & Contact Details</h4>
            
            {/* Explicit Contact Fields for Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-green-50/30 p-8 rounded-[2rem] border border-green-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Student Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    required type="email" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-white font-bold text-sm"
                    placeholder="e.g. name@university.ac.ug"
                    value={formData.universityEmail}
                    onChange={(e) => setFormData({...formData, universityEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Primary Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    required type="tel" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-white font-bold text-sm"
                    placeholder="+256..."
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData({...formData, whatsappPhone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Institution Name</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  required
                >
                  <option value="">Select Institution</option>
                  <option value="Makerere">Makerere University</option>
                  <option value="UCU">Uganda Christian University</option>
                  <option value="KIU">Kampala International University</option>
                  <option value="Cavendish">Cavendish University</option>
                  <option value="IUIU">Islamic University in Uganda</option>
                  <option value="LDC">Law Development Centre</option>
                  <option value="Other">Other Authorized Institution</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Faculty / Department</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="e.g. Faculty of Law"
                  value={formData.faculty}
                  onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Current Year</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                  required
                >
                  <option value="">Year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="LDC">LDC Bar Course</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Student / Registration ID</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="ID Number"
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Expected Graduation</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="e.g. 2026"
                  value={formData.gradYear}
                  onChange={(e) => setFormData({...formData, gradYear: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        );

      case MembershipTier.FULL:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-3">Professional Credentials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Bar Enrolment Number</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="BC/XXXX/YY"
                  value={formData.barNumber}
                  onChange={(e) => setFormData({...formData, barNumber: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">High Court Roll No.</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="Roll No."
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Firm / Chambers</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="Practice Name"
                  value={formData.firmName}
                  onChange={(e) => setFormData({...formData, firmName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Years in Practice</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="Years"
                  value={formData.practiceYears}
                  onChange={(e) => setFormData({...formData, practiceYears: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Primary Specialization</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm resize-none"
                placeholder="e.g. Criminal Law, ADR, Land..."
                rows={2}
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                required
              ></textarea>
            </div>
          </div>
        );

      case MembershipTier.ASSOCIATE:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-3">Background & Motivation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Primary Profession</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="e.g. Police, Academic, Social Work"
                  value={formData.profession}
                  onChange={(e) => setFormData({...formData, profession: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Current Employer</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                  placeholder="Entity Name"
                  value={formData.employer}
                  onChange={(e) => setFormData({...formData, employer: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Official Designation</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm"
                placeholder="Current Title"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Reason for Joining</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm resize-none"
                placeholder="Briefly explain your vision for the fraternity..."
                rows={3}
                value={formData.reasonForJoining}
                onChange={(e) => setFormData({...formData, reasonForJoining: e.target.value})}
                required
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-24 text-center px-4">
        <h1 className="text-4xl lg:text-5xl font-black mb-6 font-serif">Join the Fraternity</h1>
        <p className="max-w-3xl mx-auto text-xl text-blue-100 italic">
          Be part of over 500 legal professionals across Uganda dedicated to "Speaking up and judging fairly."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-24">
        {/* Member Directory Access Card */}
        <div className="mb-12 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-top duration-700">
           <div className="flex items-center space-x-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-primary shadow-inner">
                 <Users size={32} />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-gray-900 font-serif">Fraternity Directory</h2>
                 <p className="text-sm text-gray-500 font-medium">Browse verified UCLF members, advocates, and students nationwide.</p>
              </div>
           </div>
           <Link to="/member-directory" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all flex items-center shrink-0">
             Open Directory <ArrowRight size={18} className="ml-2" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rounded-[3rem] p-10 shadow-xl flex flex-col ${tier.color} relative transition-all hover:scale-[1.02] border border-transparent hover:border-primary/10 group`}>
              {tier.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary font-black text-[10px] uppercase tracking-widest px-5 py-2 rounded-full z-10 shadow-lg">
                  Most Popular
                </span>
              )}
              <div className="text-primary mb-8 bg-white p-4 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">{tier.icon}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif">{tier.name}</h3>
              <div className="mb-10">
                <span className="text-4xl font-black text-primary">{tier.price}</span>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-2">{tier.period}</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow text-sm font-medium text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-md mr-4 mt-0.5"><Check className="text-green-600" size={14} /></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleOpenModal(tier.name)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
                  tier.popular 
                  ? 'bg-primary text-white shadow-primary/20 hover:bg-blue-800' 
                  : 'bg-white text-primary border-2 border-primary/20 hover:bg-gray-50'
                }`}
              >
                Register as {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FIXED MODAL: FLEXBOX FOR STICKY HEADER/FOOTER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={handleCloseModal}></div>
          
          <div className="bg-white rounded-[3rem] w-full max-w-4xl relative z-[110] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-400">
            
            {/* STICKY HEADER */}
            <header className="shrink-0 bg-white border-b border-gray-100 px-10 py-8 flex items-center justify-between z-20">
              <div className="flex items-center space-x-5">
                <div className="bg-primary/5 p-4 rounded-2xl text-primary shadow-inner">
                  {tiers.find(t => t.name === selectedTier)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-primary font-serif">Enrollment: {selectedTier}</h2>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Official Fraternity Registry Intake</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="p-3 hover:bg-red-50 rounded-2xl transition-all text-gray-400 hover:text-red-500">
                <X size={28} />
              </button>
            </header>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
              {!isSubmitted ? (
                <form id="membershipForm" onSubmit={handleSubmit} className="space-y-16">
                  {/* Personal Profile Section - Reduced emphasis if tier specific fields overlap */}
                  <div className="space-y-10">
                    <h4 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-3">Identities & Spirituality</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Full Legal Identity</label>
                        <input 
                          required type="text" 
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm" 
                          placeholder="As per Government ID"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Church / Fellowship</label>
                        <input 
                          required type="text" 
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm" 
                          placeholder="Place of Worship"
                          value={formData.church}
                          onChange={(e) => setFormData({...formData, church: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* Only show these if NOT student (Student gets their own highlighted section below) */}
                    {selectedTier !== MembershipTier.STUDENT && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Secure Email</label>
                          <input 
                            required type="email" 
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm" 
                            placeholder="name@provider.ug"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Contact Phone</label>
                          <input 
                            required type="tel" 
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm" 
                            placeholder="+256..."
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Physical / Postal Address</label>
                      <input 
                        required type="text" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-gray-50 font-bold text-sm" 
                        placeholder="Plot, Street, Region"
                        value={formData.postalAddress}
                        onChange={(e) => setFormData({...formData, postalAddress: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Tier Specific Fields */}
                  {renderTierSpecificFields()}

                  {/* Supporting Attachments */}
                  <div className="space-y-8">
                    <h4 className="text-sm font-black text-primary uppercase tracking-widest border-l-4 border-primary pl-3">Supporting Documentation</h4>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-[2.5rem] p-12 text-center cursor-pointer transition-all hover:bg-gray-50/50 ${
                        formData.cv ? 'border-primary bg-blue-50/20' : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      {formData.cv ? (
                        <div className="flex flex-col items-center animate-in zoom-in duration-300">
                          <div className="w-20 h-20 bg-primary text-secondary rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                             <FileText size={40} />
                          </div>
                          <p className="text-sm font-black text-gray-900">{formData.cv.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{(formData.cv.size / 1024).toFixed(1)} KB Ready for Transmission</p>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); setFormData({...formData, cv: null}); }}
                            className="mt-6 text-xs font-black text-red-500 hover:underline uppercase tracking-widest"
                          >
                            Remove and Replace
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-400 group">
                          <Upload className="mx-auto mb-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-primary" size={64} />
                          <p className="text-lg font-black text-gray-700">Upload Bio / Credentials</p>
                          <p className="text-xs font-medium mt-2">Max 10MB (PDF or Word Documents Preferred)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ethical Declaration */}
                  <div className="p-10 bg-primary text-white rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                      <ShieldCheck size={180} fill="white" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-black mb-6 font-serif text-secondary flex items-center">
                        <Scale size={20} className="mr-3" /> Professional Covenant
                      </h4>
                      <p className="text-xs text-blue-100 leading-relaxed mb-10 italic font-medium opacity-90">
                        "I solemnly pledge my commitment to the UCLF mandate. I will uphold the principles of Christian Legal Ethics, defending the marginalized with biblical compassion and professional excellence in alignment with the Laws of Uganda."
                      </p>
                      <label className="flex items-center space-x-4 cursor-pointer">
                        <input required type="checkbox" className="w-6 h-6 rounded-lg border-white/20 text-secondary focus:ring-secondary bg-white/10" id="agree" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">I Authorize and Attest to the Above</span>
                      </label>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle size={72} />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-4 font-serif">Submission Lodged</h3>
                  <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto italic font-medium leading-relaxed">
                    Thank you, <span className="font-black text-primary underline">{formData.name}</span>. Your application for <strong>{selectedTier}</strong> status is now in the regional audit queue.
                  </p>
                  <div className="bg-gray-50 rounded-[2.5rem] p-12 border border-gray-100 text-left space-y-8 mb-12 max-w-2xl mx-auto shadow-inner">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-4">Verification Roadmap</h4>
                    {[
                      { step: "01", label: "Credential Audit", desc: "Our Membership Committee reviews your practice/academic eligibility." },
                      { step: "02", label: "Fee Invoicing", desc: "Upon approval, you will receive an invoice for the annual subscription." },
                      { step: "03", label: "National Induction", desc: "Official entry into the UCLF Registry and issuance of digital credentials." }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-6">
                        <div className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shrink-0 font-black text-sm shadow-lg">{step.step}</div>
                        <div>
                           <h5 className="font-black text-gray-900 text-base mb-1">{step.label}</h5>
                           <p className="text-xs text-gray-500 font-medium italic">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={goToDashboard}
                    className="bg-primary text-white px-20 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:bg-blue-800 transition-all active:scale-95"
                  >
                    Enter Private {selectedTier === MembershipTier.STUDENT ? 'Student' : 'Member'} Hub
                  </button>
                </div>
              )}
            </div>

            {/* STICKY FOOTER */}
            {!isSubmitted && (
              <footer className="shrink-0 bg-gray-50 border-t border-gray-100 px-10 py-8 z-20">
                <button 
                  type="submit" 
                  form="membershipForm"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center hover:bg-blue-800 transition-all shadow-2xl shadow-primary/20 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin mr-3" size={24} /> Authenticating Identity...</>
                  ) : (
                    <>Commit Final Enrollment <ArrowRight className="ml-3" size={24} /></>
                  )}
                </button>
              </footer>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;

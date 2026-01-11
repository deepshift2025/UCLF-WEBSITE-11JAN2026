
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, Mail, ArrowRight, Gavel, GraduationCap, Award, 
  ShieldCheck, AlertCircle, Loader2, Eye, EyeOff, ShieldAlert, ChevronRight
} from 'lucide-react';
import { MembershipTier } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  const handleSimulatedLogin = (tier: MembershipTier | 'Admin') => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const mockUser = {
        name: tier === 'Admin' ? 'System Administrator' :
              tier === MembershipTier.STUDENT ? 'Student Member' : 
              tier === MembershipTier.ASSOCIATE ? 'Associate Member' : 'Counsel Advocate',
        email: `${tier.toLowerCase()}@uclf.org.ug`,
        tier: tier,
      };

      localStorage.setItem('uclf_user', JSON.stringify(mockUser));
      setIsLoading(false);

      if (tier === 'Admin') navigate('/admin-dashboard');
      else if (tier === MembershipTier.FULL) navigate('/case-management');
      else if (tier === MembershipTier.ASSOCIATE) navigate('/associate-dashboard');
      else navigate('/student-dashboard');

      window.location.reload();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Please use the 'Test Access' buttons below to navigate the prototype dashboards.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl mb-4">
            <img src={UCLF_LOGO} alt="UCLF Logo" className="w-32 h-32 object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 font-serif">Member Portal</h1>
          <p className="text-gray-500 mt-2 font-medium">Access your UCLF professional workspace</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={120} className="text-primary" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl flex items-start text-xs font-medium animate-in fade-in duration-300">
                <AlertCircle size={16} className="mr-3 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-800 transition-all shadow-lg shadow-primary/20"
            >
              Sign In <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-px flex-grow bg-gray-200"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prototype Test Access</span>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-3">
             <button 
              onClick={() => handleSimulatedLogin('Admin')}
              disabled={isLoading}
              className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-200 hover:border-red-600 hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 p-2 rounded-xl text-white">
                  <ShieldAlert size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-red-900">Login as Administrator</p>
                  <p className="text-[10px] text-red-500 uppercase tracking-widest">System Management Access</p>
                </div>
              </div>
              {isLoading ? <Loader2 size={18} className="animate-spin text-red-600" /> : <ChevronRight size={18} className="text-red-300" />}
            </button>

            <button 
              onClick={() => handleSimulatedLogin(MembershipTier.FULL)}
              disabled={isLoading}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Gavel size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">Login as Advocate</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Full Member Dashboard</p>
                </div>
              </div>
              {isLoading ? <Loader2 size={18} className="animate-spin text-primary" /> : <ChevronRight size={18} className="text-gray-300" />}
            </button>

            <button 
              onClick={() => handleSimulatedLogin(MembershipTier.ASSOCIATE)}
              disabled={isLoading}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-orange-50 p-2 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Award size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">Login as Associate</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Professional Associate Hub</p>
                </div>
              </div>
              {isLoading ? <Loader2 size={18} className="animate-spin text-orange-600" /> : <ChevronRight size={18} className="text-gray-300" />}
            </button>

            <button 
              onClick={() => handleSimulatedLogin(MembershipTier.STUDENT)}
              disabled={isLoading}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-2 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <GraduationCap size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">Login as Student</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">University Chapter Hub</p>
                </div>
              </div>
              {isLoading ? <Loader2 size={18} className="animate-spin text-green-600" /> : <ChevronRight size={18} className="text-gray-300" />}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 font-medium">Not a member yet? <button onClick={() => navigate('/membership')} className="text-primary font-black hover:underline">Register Now</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

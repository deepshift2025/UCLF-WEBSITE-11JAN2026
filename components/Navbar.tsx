
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Gavel, User, Heart, BookOpen, Calendar, Info, PhoneCall, Briefcase, LayoutDashboard, GraduationCap, ShieldAlert, ChevronDown, Newspaper, Camera, LogOut as LogOutIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MembershipTier } from '../types';

interface UserSession {
  name: string;
  tier: MembershipTier | 'Admin';
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSession | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  useEffect(() => {
    const saved = localStorage.getItem('uclf_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Membership', path: '/membership' },
    { name: 'Legal Aid', path: '/legal-aid' },
    { name: 'Resources', path: '/resources' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.tier === 'Admin') {
      return { path: '/admin-dashboard', label: 'Admin Portal', icon: <ShieldAlert size={16} /> };
    }
    if (user.tier === MembershipTier.FULL) {
      return { path: '/case-management', label: 'Advocate Dashboard', icon: <Briefcase size={16} /> };
    }
    if (user.tier === MembershipTier.ASSOCIATE) {
      return { path: '/associate-dashboard', label: 'Associate Dashboard', icon: <LayoutDashboard size={16} /> };
    }
    if (user.tier === MembershipTier.STUDENT) {
      return { path: '/student-dashboard', label: 'Student Hub', icon: <GraduationCap size={16} /> };
    }
    return null;
  };

  const dashboard = getDashboardLink();

  const handleLogout = () => {
    localStorage.removeItem('uclf_user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-20 w-auto flex items-center justify-center">
                <img 
                  src={UCLF_LOGO} 
                  alt="UCLF Logo" 
                  className="h-full w-auto object-contain py-2" 
                />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-[13px] font-bold transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Custom Dropdown for News & Events & Gallery */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-[13px] font-bold transition-colors ${
                  location.pathname.includes('/news') || location.pathname.includes('/events') || location.pathname.includes('/gallery')
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <span>News & Events</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/news"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-primary transition-all"
                  >
                    <Newspaper size={16} />
                    <span>Latest News</span>
                  </Link>
                  <Link
                    to="/events"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-primary transition-all"
                  >
                    <Calendar size={16} />
                    <span>Events Calendar</span>
                  </Link>
                  <Link
                    to="/gallery"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-primary transition-all border-t border-gray-50"
                  >
                    <Camera size={16} />
                    <span>Mission Gallery</span>
                  </Link>
                </div>
              )}
            </div>
            
            {dashboard && (
              <Link
                to={dashboard.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border transition-all ml-2 ${
                  user?.tier === 'Admin' ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-blue-50 text-primary border-primary/20 hover:bg-blue-100'
                }`}
              >
                {dashboard.icon}
                <span>{dashboard.label}</span>
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                className="ml-4 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-all shadow-sm"
              >
                Member Login
              </Link>
            ) : (
              <div className="flex items-center ml-4 space-x-4">
                 <div className="flex items-center space-x-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border ${user.tier === 'Admin' ? 'bg-red-600 text-white' : 'bg-primary text-secondary'}`}>
                      {user.name.charAt(0)}
                   </div>
                   <span className="text-xs font-bold text-gray-500 hidden xl:block">{user.name.split(' ')[0]}</span>
                 </div>
                 <button 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Logout"
                 >
                   <LogOutIcon size={18} />
                 </button>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 block px-3 py-4 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="border-t border-gray-50 mt-2 pt-2">
              <p className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">News & Events</p>
              <Link
                to="/news"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-primary transition-all"
              >
                <Newspaper size={18} />
                <span>Latest News</span>
              </Link>
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-primary transition-all"
              >
                <Calendar size={18} />
                <span>Events Calendar</span>
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-primary transition-all"
              >
                <Camera size={18} />
                <span>Mission Gallery</span>
              </Link>
            </div>
            
            {dashboard && (
              <Link
                to={dashboard.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-4 rounded-md text-base font-bold ${user?.tier === 'Admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-primary'}`}
              >
                {dashboard.icon}
                <span>{dashboard.label}</span>
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 w-full mt-4 bg-primary text-white px-3 py-3 rounded-md text-base font-medium shadow-md"
              >
                <User size={18} />
                <span>Member Login</span>
              </Link>
            ) : (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center space-x-3 px-3 py-4 text-red-500 hover:bg-red-50 rounded-md text-base font-bold w-full text-left"
              >
                <LogOutIcon size={20} />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

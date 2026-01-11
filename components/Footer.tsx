
import React from 'react';
import { Gavel, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  const UCLF_LOGO = "https://i.postimg.cc/TYDvMJrD/UCLF-LOGO-(1).png";

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-white mb-2">
              <img src={UCLF_LOGO} alt="UCLF Logo" className="h-16 w-16 object-contain" />
              <span className="text-3xl font-black tracking-tight">UCLF</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Uganda Christian Lawyers Fraternity. Promoting justice and human dignity through fellowship, mentorship and legal aid since 1986.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"><Linkedin size={16} /></a>
            </div>
            <div className="pt-4 flex items-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              <ShieldCheck size={14} className="mr-2" /> NGO Reg: S.5914/5536
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#/legal-aid" className="hover:text-secondary transition-colors">Criminal Defense</a></li>
              <li><a href="#/legal-aid" className="hover:text-secondary transition-colors">Juvenile Justice</a></li>
              <li><a href="#/legal-aid" className="hover:text-secondary transition-colors">Land Mediation</a></li>
              <li><a href="#/legal-aid" className="hover:text-secondary transition-colors">Refugee Rights</a></li>
              <li><a href="#/resources" className="hover:text-secondary transition-colors">CLE Training</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Member Area</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#/membership" className="hover:text-secondary transition-colors">Join Fraternity</a></li>
              <li><a href="#/membership" className="hover:text-secondary transition-colors">Mentorship Program</a></li>
              <li><a href="#/membership" className="hover:text-secondary transition-colors">University Chapters</a></li>
              <li><a href="#/resources" className="hover:text-secondary transition-colors">UCLF Law Journal</a></li>
              <li><a href="#/donate" className="hover:text-secondary transition-colors">Pro Bono Fund</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-secondary flex-shrink-0" size={18} />
                <span className="text-gray-400">P.O. Box 29375,<br />Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-secondary flex-shrink-0" size={18} />
                <span className="text-gray-400">+256 414 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-secondary flex-shrink-0" size={18} />
                <span className="text-gray-400">info@uclf.org.ug</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
          <p>© {new Date().getFullYear()} Uganda Christian Lawyers Fraternity. Serving God and Justice.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">CLE Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

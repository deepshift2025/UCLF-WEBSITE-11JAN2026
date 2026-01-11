
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const LegalAid = lazy(() => import('./pages/LegalAid'));
const Membership = lazy(() => import('./pages/Membership'));
const Resources = lazy(() => import('./pages/Resources'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const RegionalOfficeDetail = lazy(() => import('./pages/RegionalOfficeDetail'));
const Events = lazy(() => import('./pages/Events'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const CaseManagement = lazy(() => import('./pages/CaseManagement'));
const AssociateDashboard = lazy(() => import('./pages/AssociateDashboard'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Login = lazy(() => import('./pages/Login'));
const EligibilityGuidelines = lazy(() => import('./pages/EligibilityGuidelines'));
const MemberDirectory = lazy(() => import('./pages/MemberDirectory'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal-aid" element={<LegalAid />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:newsId" element={<NewsDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/login" element={<Login />} />
              <Route path="/case-management" element={<CaseManagement />} />
              <Route path="/associate-dashboard" element={<AssociateDashboard />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/regional-office/:officeId" element={<RegionalOfficeDetail />} />
              <Route path="/eligibility-guidelines" element={<EligibilityGuidelines />} />
              <Route path="/member-directory" element={<MemberDirectory />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

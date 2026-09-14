import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Impact from './pages/Impact';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import CleanAir from './pages/CleanAir';
import ClimateResilience from './pages/ClimateResilience';
import StyleGuide from './pages/StyleGuide';
import PrivacyPolicy from './pages/LegalPrivacy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clean-air" element={<CleanAir />} />
          <Route path="/climate-resilience" element={<ClimateResilience />} />
          <Route path="/clean-air-climate-resilience" element={<CleanAir />} />
          <Route path="/cacr" element={<CleanAir />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Feedback />} />
          <Route path="/service" element={<Services />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

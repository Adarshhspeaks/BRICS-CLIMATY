import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Clean Air', path: '/clean-air' },
    { name: 'Climate Resilience', path: '/climate-resilience' },
    { name: 'Impact', path: '/impact' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="BRICS-CLIMATY Home">
          <img 
            src="/assets/brics-logo.png" 
            alt="BRICS-CLIMATY Logo" 
            className="navbar-logo-img" 
            width="40" 
            height="40" 
          />
          <span className="logo-text">BRICS-CLIMATY</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <li key={link.path} className="nav-item">
                  <Link 
                    to={link.path} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <Link to="/feedback" className="btn btn-primary btn-sm nav-cta-btn">
            Give Feedback
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="mobile-nav-item">
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mobile-nav-footer">
            <Link to="/feedback" className="btn btn-primary btn-lg mobile-cta-btn">
              Give Feedback
            </Link>
            <div className="mobile-socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

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
    { name: 'Services', path: '/service' },
    { name: 'Impact', path: '/impact' },
    { name: 'Project', path: '/project' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="BRICS-CLIMATY Home">
          <div className="logo-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#1b4332" stroke="#1b4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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
          <Link to="/contact" className="btn btn-primary btn-sm nav-cta-btn">
            Get Assessment
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
            <Link to="/contact" className="btn btn-primary btn-lg mobile-cta-btn">
              Get Free Assessment
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

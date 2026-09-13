import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-main">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#1b4332" stroke="#1b4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="footer-logo-text">BRICS-CLIMATY</span>
            </Link>
            <p className="footer-description">
              Top sustainability experts empowering businesses to cut emissions, lower costs, and drive long-term environmental impact. Trusted by 500+ companies on their journey to net-zero.
            </p>
            <div className="footer-social-links">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/service" className="footer-link">Services</Link></li>
              <li><Link to="/impact" className="footer-link">Impact</Link></li>
              <li><Link to="/project" className="footer-link">Project</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-link-list">
              <li><Link to="/service/commercial-residential-solar-installation" className="footer-link">Solar Installation</Link></li>
              <li><Link to="/service/carbon-footprint-analysis" className="footer-link">Carbon Footprint Analysis</Link></li>
              <li><Link to="/service/sustainable-building-design-consulting" className="footer-link">Sustainable Building Design</Link></li>
              <li><Link to="/service/smart-waste-management-reduction-solutions" className="footer-link">Smart Waste Management</Link></li>
            </ul>
          </div>

          {/* Utility / Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources & Legal</h4>
            <ul className="footer-link-list">
              <li><Link to="/style-guide" className="footer-link">Style Guide</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/404" className="footer-link">404 Page</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} BRICS-CLIMATY. All rights reserved.
          </p>
          <div className="footer-attribution">
            <span>Powered by Framer</span>
            <span className="dot-separator">•</span>
            <span>Created by Fluxory Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

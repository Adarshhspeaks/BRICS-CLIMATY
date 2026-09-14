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
              <img 
                src="/assets/brics-logo.png" 
                alt="BRICS-CLIMATY Logo" 
                className="footer-logo-img" 
                width="44" 
                height="44" 
              />
              <span className="footer-logo-text">BRICS-CLIMATY</span>
            </Link>
            <p className="footer-description">
              Top sustainability experts empowering businesses to cut emissions, lower costs, and drive long-term environmental impact. Trusted by 500+ companies on their journey to net-zero.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/clean-air" className="footer-link">Clean Air</Link></li>
              <li><Link to="/climate-resilience" className="footer-link">Climate Resilience</Link></li>
              <li><Link to="/impact" className="footer-link">Impact</Link></li>
              <li><Link to="/feedback" className="footer-link">Feedback</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} BRICS-CLIMATY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

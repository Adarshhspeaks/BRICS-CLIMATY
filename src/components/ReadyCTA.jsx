import React from 'react';
import { Link } from 'react-router-dom';
import './ReadyCTA.css';

export default function ReadyCTA() {
  return (
    <section className="ready-cta-section">
      <div className="container">
        <div className="ready-cta-card">
          <div className="ready-cta-badge">
            <span className="badge-dot"></span>
            <span>Get Started</span>
          </div>
          <h2 className="ready-cta-heading">
            Ready to Reduce Your Environmental Impact?
          </h2>
          <p className="ready-cta-text">
            Book a free 30-minute consultation to get a carbon footprint estimate and discover sustainability opportunities for your business.
          </p>
          <div className="ready-cta-actions">
            <Link to="/feedback" className="btn btn-dark btn-lg">
              Share Your Feedback
            </Link>
            <Link to="/impact" className="btn btn-outline-white btn-lg">
              Explore Impact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

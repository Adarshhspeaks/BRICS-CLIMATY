import React, { useState } from 'react';
import './NewsletterCTA.css';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-text-col">
            <h3 className="newsletter-title">Join 10,000+ Businesses Going Green</h3>
            <p className="newsletter-subtitle">
              Get monthly sustainability tips, industry insights, and exclusive resources delivered straight to your inbox.
            </p>
          </div>

          <div className="newsletter-form-col">
            {subscribed ? (
              <div className="newsletter-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Thank you for subscribing to BRICS-CLIMATY updates!</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

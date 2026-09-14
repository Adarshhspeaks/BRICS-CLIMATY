import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import './NewsletterCTA.css';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .upsert([{ email: email.trim().toLowerCase() }], { onConflict: 'email' });

        if (error) {
          console.error('Newsletter subscription error:', error);
        }
      }
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.warn('Newsletter fallback:', err);
      setSubscribed(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
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

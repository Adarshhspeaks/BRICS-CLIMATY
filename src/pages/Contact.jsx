import React, { useState } from 'react';
import FAQAccordion from '../components/FAQAccordion';
import NewsletterCTA from '../components/NewsletterCTA';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'commercial-residential-solar-installation',
    energyBill: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured or dev server was not restarted. Please refresh the browser.');
      }

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim() || null,
            service: formData.service,
            energy_bill: formData.energyBill.trim() || null,
            message: formData.message.trim()
          }
        ]);

      if (error) {
        console.error('Supabase contact insert error:', error);
        throw new Error(error.message || 'Failed to submit consultation request. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Get In Touch &#125;</span>
              Free Consultation
            </span>
          </div>
          <h1 className="contact-hero-title">
            Let's Build Your Net-Zero Future
          </h1>
          <p className="contact-hero-subtitle">
            Speak with an accredited sustainability engineer. Request a complimentary carbon footprint estimate and discover your organization's energy savings potential.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form Column */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success-box">
                  <div className="success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="success-title">Consultation Request Received!</h3>
                  <p className="success-desc">
                    Thank you, <strong>{formData.name}</strong>. A BRICS-CLIMATY senior sustainability consultant will review your details and reach out within 24 business hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', company: '', service: 'commercial-residential-solar-installation', energyBill: '', message: '' }); }}
                    className="btn btn-secondary btn-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">Request a Free Energy Audit</h2>
                  
                  {submitError && (
                    <div style={{
                      padding: '12px 16px',
                      background: '#fee2e2',
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      color: '#991b1b',
                      fontSize: '14px',
                      marginBottom: '20px'
                    }}>
                      ⚠️ {submitError}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-input" 
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Work Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-input" 
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company / Organization</label>
                      <input 
                        type="text" 
                        name="company" 
                        className="form-input" 
                        placeholder="e.g. Acme Corp"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Primary Interest</label>
                      <select 
                        name="service" 
                        className="form-select"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="commercial-residential-solar-installation">Solar Energy Installation</option>
                        <option value="carbon-footprint-analysis">Carbon Footprint Analysis</option>
                        <option value="sustainable-building-design-consulting">Green Building & LEED Certification</option>
                        <option value="smart-waste-management-reduction-solutions">Smart Waste Management</option>
                        <option value="other">General Sustainability Consulting</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Monthly Energy Bill (Optional)</label>
                    <input 
                      type="text" 
                      name="energyBill" 
                      className="form-input" 
                      placeholder="e.g. $15,000 / month"
                      value={formData.energyBill}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">How can we help your team? *</label>
                    <textarea 
                      name="message" 
                      className="form-textarea" 
                      rows="4" 
                      placeholder="Tell us about your facility, emissions targets, or specific project requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg submit-btn">
                    {isSubmitting ? 'Submitting Request...' : 'Book Free Consultation'}
                  </button>
                </form>
              )}
            </div>

            {/* Info Column */}
            <div className="contact-info-col">
              <div className="info-card">
                <h3 className="info-card-title">Direct Inquiries</h3>
                
                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Email Us</span>
                    <a href="mailto:hello@brics-climaty.com" className="info-val">hello@brics-climaty.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Call Our Engineers</span>
                    <a href="tel:+15553924910" className="info-val">+1 (555) 392-4910</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Operating Hours</span>
                    <span className="info-val">Mon – Fri: 8:00 AM – 6:00 PM EST</span>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="info-card">
                <h3 className="info-card-title">Global Offices</h3>
                <div className="office-list">
                  <div className="office-item">
                    <span className="office-city">San Francisco, CA</span>
                    <span className="office-addr">450 Mission Street, Suite 1400</span>
                  </div>
                  <div className="office-item">
                    <span className="office-city">Austin, TX</span>
                    <span className="office-addr">200 Congress Avenue, Floor 8</span>
                  </div>
                  <div className="office-item">
                    <span className="office-city">London, UK</span>
                    <span className="office-addr">1 Poultry, Bank, EC2R 8EJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq-section">
        <div className="container">
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}

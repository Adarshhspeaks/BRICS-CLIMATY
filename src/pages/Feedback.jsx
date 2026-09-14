import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import './Feedback.css';

const categories = [
  'General Feedback',
  'Website Experience',
  'Climate Data & Tools',
  'Policy & Research',
  'Partnership Suggestion',
  'Report an Issue'
];

const ratingLabels = {
  1: 'Needs Improvement',
  2: 'Fair Experience',
  3: 'Good Experience',
  4: 'Very Good Experience',
  5: 'Outstanding Experience!'
};

const feedbackFaqs = [
  {
    question: "How is my feedback utilized at BRICS-CLIMATY?",
    answer: "Every piece of feedback is directly reviewed by our climate policy, technology, and research teams. It informs our platform roadmap, data visualizations, and strategic decarbonization frameworks across all BRICS partner initiatives."
  },
  {
    question: "Will I receive a direct response to my submission?",
    answer: "Yes! If you provide your email address, our team typically acknowledges and responds to inquiries or actionable suggestions within 24 to 48 hours."
  },
  {
    question: "Is my personal and organizational information kept confidential?",
    answer: "Absolutely. All submissions are encrypted and handled in strict compliance with international privacy standards and our Privacy Policy. We never sell or distribute your data to third parties."
  },
  {
    question: "Can I submit institutional research or partnership proposals here?",
    answer: "Yes, select 'Partnership Suggestion' or 'Policy & Research' as the category, and provide relevant context or links in the message area. Our partnership coordinators will reach out directly."
  }
];

export default function Feedback() {
  const [category, setCategory] = useState('General Feedback');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [nps, setNps] = useState(9);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    subscribeNewsletter: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('feedback')
          .insert([
            {
              name: formData.name.trim(),
              email: formData.email.trim(),
              organization: formData.organization.trim() || null,
              category,
              rating,
              nps_score: nps,
              subject: formData.subject.trim() || null,
              message: formData.message.trim(),
              subscribe_newsletter: formData.subscribeNewsletter
            }
          ]);

        if (error) {
          console.error('Supabase feedback insert error:', error);
          throw new Error(error.message || 'Failed to submit feedback. Please try again.');
        }

        // Also add to newsletter if opted in
        if (formData.subscribeNewsletter) {
          try {
            await supabase
              .from('newsletter_subscribers')
              .upsert([{ email: formData.email.trim() }], { onConflict: 'email' });
          } catch (nlErr) {
            console.warn('Newsletter subscribe secondary error:', nlErr);
          }
        }
      } else {
        // Simulated submission if Supabase keys are not configured yet
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'There was an issue submitting your feedback. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError('');
    setFormData({
      name: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
      subscribeNewsletter: true
    });
    setRating(5);
    setCategory('General Feedback');
    setNps(9);
  };

  return (
    <div className="feedback-page">
      {/* Hero Header */}
      <section className="feedback-hero">
        <div className="container">
          <div className="feedback-hero-content text-center">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Your Voice Shapes Climate Action</span>
            </div>
            <h1 className="feedback-title">
              We Value Your <span className="text-primary-green">Feedback</span>
            </h1>
            <p className="feedback-subtitle">
              Help us advance sustainable transition frameworks and empower BRICS climate initiatives. Share your thoughts, report ideas, or provide suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Feedback Form & Information Section */}
      <section className="feedback-main-section">
        <div className="container">
          <div className="feedback-layout">
            
            {/* Left Column: Form / Success Card */}
            <div className="feedback-form-card">
              {submitted ? (
                <div className="feedback-success-state">
                  <div className="success-icon-circle">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2 className="success-title">Thank You for Your Feedback!</h2>
                  <p className="success-description">
                    Your insights have been securely transmitted to the BRICS-CLIMATY core working group. We deeply appreciate your commitment to climate transparency and actionable sustainability.
                  </p>
                  
                  <div className="success-meta-box">
                    <div className="meta-row">
                      <span className="meta-label">Category:</span>
                      <span className="meta-value">{category}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Satisfaction:</span>
                      <span className="meta-value">{rating} / 5 Stars ({ratingLabels[rating]})</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Reference ID:</span>
                      <span className="meta-value code-font">BC-FB-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>

                  <button onClick={handleReset} className="btn btn-primary btn-lg mt-24">
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="feedback-form">
                  <h2 className="form-heading">Share Your Experience</h2>
                  <p className="form-subheading">Select a category and let us know how we can serve you better.</p>

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

                  {/* Category Selection */}
                  <div className="form-group">
                    <label className="form-label">Feedback Category *</label>
                    <div className="category-chips-grid">
                      {categories.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`category-chip ${category === cat ? 'active' : ''}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="form-group">
                    <div className="rating-label-row">
                      <label className="form-label">Overall Experience Rating *</label>
                      <span className="rating-status-text">{ratingLabels[hoverRating || rating]}</span>
                    </div>
                    <div className="star-rating-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="star-btn"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          aria-label={`Rate ${star} star`}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill={(hoverRating || rating) >= star ? "#f5ad11" : "#e0e6e3"}
                            stroke={(hoverRating || rating) >= star ? "#d49206" : "#cbd5d0"}
                            strokeWidth="1.5"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Work or Personal Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Organization & Subject Row */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="organization" className="form-label">Organization / Country</label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        placeholder="e.g. Global Clean Tech / India"
                        value={formData.organization}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Brief summary of your feedback"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Detailed Message */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Your Feedback / Suggestion *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Please provide detailed feedback, specific pages or features you liked or would like improved..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {/* NPS Recommendation Score */}
                  <div className="form-group">
                    <div className="nps-header-row">
                      <label className="form-label">How likely are you to recommend BRICS-CLIMATY?</label>
                      <span className="nps-badge">{nps} / 10</span>
                    </div>
                    <div className="nps-slider-wrapper">
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={nps} 
                        onChange={(e) => setNps(parseInt(e.target.value))}
                        className="nps-slider"
                      />
                      <div className="nps-scale-labels">
                        <span>1 (Not Likely)</span>
                        <span>5 (Neutral)</span>
                        <span>10 (Extremely Likely)</span>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="subscribeNewsletter"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleChange}
                      className="custom-checkbox"
                    />
                    <label htmlFor="subscribeNewsletter" className="checkbox-label">
                      Keep me updated on BRICS-CLIMATY quarterly sustainability insights and platform releases.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full mt-16">
                    {isSubmitting ? (
                      <span className="btn-loading-flex">
                        <span className="loading-spinner"></span>
                        Submitting Feedback...
                      </span>
                    ) : (
                      'Send Feedback'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Key Pillars & Live Stats */}
            <div className="feedback-sidebar">
              {/* Snapshot Stats Card */}
              <div className="feedback-sidebar-card stats-highlight-card">
                <h3 className="sidebar-card-title">Community Response</h3>
                <div className="rating-score-box">
                  <div className="rating-score-num">4.9</div>
                  <div className="rating-score-stars">
                    <div className="stars-row">
                      {'★★★★★'}
                    </div>
                    <span className="rating-count">Based on 1,400+ feedback reviews</span>
                  </div>
                </div>

                <div className="stat-bars-list">
                  <div className="stat-bar-item">
                    <div className="stat-bar-label">
                      <span>Data Accuracy & Insights</span>
                      <span>98%</span>
                    </div>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div className="stat-bar-item">
                    <div className="stat-bar-label">
                      <span>Platform Usability & Design</span>
                      <span>96%</span>
                    </div>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div className="stat-bar-item">
                    <div className="stat-bar-label">
                      <span>Response & Resolution Rate</span>
                      <span>99%</span>
                    </div>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="feedback-sidebar-card direct-channels-card">
                <h3 className="sidebar-card-title">Direct Inquiries</h3>
                
                <div className="channel-item">
                  <div className="channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="channel-info">
                    <span className="channel-name">Feedback & Research Desk</span>
                    <a href="mailto:feedback@brics-climaty.org" className="channel-link">feedback@brics-climaty.org</a>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="channel-info">
                    <span className="channel-name">Estimated Response Time</span>
                    <span className="channel-detail">Within 24 business hours</span>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="channel-info">
                    <span className="channel-name">Privacy Protection</span>
                    <span className="channel-detail">Strict zero-data-sharing policy</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Link */}
              <div className="feedback-sidebar-card explore-impact-card">
                <h4 className="explore-card-heading">Want to see our latest results?</h4>
                <p className="explore-card-desc">Discover our comprehensive metrics on emissions reduction, clean energy capacity, and verified regional outcomes.</p>
                <Link to="/impact" className="btn btn-outline-dark btn-sm">
                  View Impact Report →
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="feedback-faqs-section">
        <div className="container">
          <div className="text-center mb-40">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Common Questions</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about feedback, suggestions, and research contributions.</p>
          </div>
          <div className="faq-container-narrow">
            <FAQAccordion items={feedbackFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './About.css';

export default function About() {
  const values = [
    {
      title: 'Scientific Rigor',
      desc: 'All our calculations, carbon audits, and reduction models adhere strictly to the GHG Protocol and SBTi standards.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      )
    },
    {
      title: 'Measurable Value',
      desc: 'We focus on sustainable actions that yield concrete economic returns, operational efficiency, and risk reduction.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      )
    },
    {
      title: 'Radical Transparency',
      desc: 'We provide clear, unvarnished data dashboards so stakeholders can verify progress toward net-zero milestones.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )
    },
    {
      title: 'Long-term Stewardship',
      desc: 'Sustainability is not a one-time project. We build lasting partnerships that scale as environmental regulations evolve.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; About Us &#125;</span>
              Who We Are
            </span>
          </div>
          <h1 className="about-hero-title">
            Pioneering Sustainable Business Solutions Since 2018
          </h1>
          <p className="about-hero-subtitle">
            BRICS-CLIMATY was founded with a single mission: to empower businesses of all sizes to cut emissions, lower energy expenditures, and build resilient net-zero futures through proven technology and data-backed engineering.
          </p>
        </div>
      </section>

      {/* Story & Mission Grid */}
      <section className="section about-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-card">
              <img src="/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png" alt="Wind turbines at sunset" className="story-img" />
              <div className="story-image-overlay">
                <span className="story-stat-badge">500+ Projects Completed</span>
              </div>
            </div>

            <div className="story-content">
              <span className="story-kicker">&#123; Our Story &#125;</span>
              <h2 className="story-title">From Passion to Planetary Impact</h2>
              <p className="story-text">
                What started as a boutique energy advisory firm has grown into a premier global sustainability consultancy. We have helped over 500 enterprise clients eliminate more than 1.2 million metric tons of CO2 emissions.
              </p>
              <p className="story-text">
                Our interdisciplinary team combines certified environmental engineers, LEED AP architects, data scientists, and clean energy financiers to craft pragmatic, high-ROI sustainability programs.
              </p>
              <div className="story-stats-row">
                <div className="story-stat-item">
                  <span className="stat-big">15+</span>
                  <span className="stat-desc">Years Combined Experience</span>
                </div>
                <div className="story-stat-item">
                  <span className="stat-big">1.2M+</span>
                  <span className="stat-desc">Tons CO2 Reduced</span>
                </div>
                <div className="story-stat-item">
                  <span className="stat-big">99%</span>
                  <span className="stat-desc">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Principles &#125;</span>
              The Values That Drive Us
            </span>
          </div>
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Guided by Science and Integrity</h2>
          </div>

          <div className="values-grid">
            {values.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon-box">{val.icon}</div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

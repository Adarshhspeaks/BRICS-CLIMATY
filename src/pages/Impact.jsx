import React from 'react';
import { Link } from 'react-router-dom';
import CarbonCalculator from '../components/CarbonCalculator';
import PartnersMarquee from '../components/PartnersMarquee';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Impact.css';

export default function Impact() {
  const industryImpacts = [
    {
      sector: 'Heavy Manufacturing',
      metric: '65% Avg Reduction',
      desc: 'Process heat recovery, on-site solar arrays, and high-efficiency variable frequency drive upgrades.'
    },
    {
      sector: 'Commercial Real Estate',
      metric: 'LEED Gold Standard',
      desc: 'Decarbonizing multi-tenant towers through smart metering, facade optimization, and green power purchasing.'
    },
    {
      sector: 'Technology & Data Centers',
      metric: '100% Matching Clean Power',
      desc: 'Continuous 24/7 carbon-free energy (CFE) contracts, direct PPA brokerage, and liquid cooling retrofits.'
    },
    {
      sector: 'Logistics & Warehousing',
      metric: '40,000 MT CO2 Cut',
      desc: 'Fleet depot electrification, microgrids, and roof solar canopy generation.'
    }
  ];

  return (
    <div className="impact-page">
      {/* Hero */}
      <section className="impact-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Real Progress &#125;</span>
              Measurable Results
            </span>
          </div>
          <h1 className="impact-hero-title">
            Measuring What Matters: Our Environmental Impact
          </h1>
          <p className="impact-hero-subtitle">
            Every sustainability strategy we implement is backed by rigorous scientific verification, certified carbon audits, and transparent reporting.
          </p>
        </div>
      </section>

      {/* Big Impact Numbers Banner */}
      <section className="section impact-metrics-section">
        <div className="container">
          <div className="impact-metrics-card">
            <h2 className="impact-metrics-title">Cumulative Environmental Impact (2018–2026)</h2>
            <div className="metrics-dashboard-grid">
              <div className="dashboard-metric-box">
                <span className="dash-num">1.2M+</span>
                <span className="dash-label">Metric Tons CO2 Reduced</span>
                <span className="dash-sub">Equivalent to taking 260,000 passenger cars off the road for a year</span>
              </div>

              <div className="dashboard-metric-box">
                <span className="dash-num">185 GWh</span>
                <span className="dash-label">Clean Energy Generated</span>
                <span className="dash-sub">Generated from commercial solar and microgrid installations</span>
              </div>

              <div className="dashboard-metric-box">
                <span className="dash-num">480+</span>
                <span className="dash-label">Enterprises Transformed</span>
                <span className="dash-sub">Active global corporate partners executing net-zero roadmaps</span>
              </div>

              <div className="dashboard-metric-box">
                <span className="dash-num">49,980+</span>
                <span className="dash-label">Trees Planted Annually</span>
                <span className="dash-sub">Dedicated reforestation projects restoring native ecosystems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Carbon Offset & Solar ROI Calculator */}
      <CarbonCalculator />

      <PartnersMarquee />

      {/* Sector Impact Breakdown */}
      <section className="section industry-impact-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; By Sector &#125;</span>
              Impact Across Industries
            </span>
          </div>
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Customized Solutions for Every Industry</h2>
          </div>

          <div className="industry-grid">
            {industryImpacts.map((ind, idx) => (
              <div key={idx} className="industry-card">
                <span className="industry-sector-tag">{ind.sector}</span>
                <h3 className="industry-metric-highlight">{ind.metric}</h3>
                <p className="industry-desc">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study Spotlight */}
      <section className="section spotlight-section">
        <div className="container">
          <div className="spotlight-card">
            <div className="spotlight-media">
              <img src="/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png" alt="Johnson Manufacturing Case Study" className="spotlight-img" />
            </div>
            <div className="spotlight-info">
              <span className="spotlight-tag">Featured Success Story</span>
              <h3 className="spotlight-title">Manufacturing Giant Achieves 65% Emission Reduction</h3>
              <p className="spotlight-desc">
                By combining a 4.2 MW on-site solar rooftop installation with industrial heat recovery and machine learning efficiency optimization, Johnson Manufacturing eliminated 28,000 metric tons of carbon annually.
              </p>
              <div className="spotlight-stats-row">
                <div>
                  <span className="spotlight-stat-val">$1.4M</span>
                  <span className="spotlight-stat-lbl">Annual Energy Savings</span>
                </div>
                <div>
                  <span className="spotlight-stat-val">3.2 Yrs</span>
                  <span className="spotlight-stat-lbl">Full Payback Period</span>
                </div>
              </div>
              <Link to="/project/sustainx" className="btn btn-primary btn-sm">
                Read Full Case Study
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

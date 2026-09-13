import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Pricing.css';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      badge: 'For SMBs & Growing Brands',
      monthlyPrice: 1499,
      annualPrice: 1199,
      desc: 'Essential carbon footprint auditing and basic energy efficiency modeling to jumpstart your sustainability journey.',
      features: [
        'Annual Scope 1 & 2 GHG Audit',
        'Energy Bill & Peak Demand Audit',
        'Basic Solar Feasibility Report',
        'Standard GHG Protocol Certification',
        'Email & Helpdesk Support'
      ],
      popular: false,
      cta: 'Get Started with Starter'
    },
    {
      name: 'Growth',
      badge: 'Most Popular for Enterprises',
      monthlyPrice: 3499,
      annualPrice: 2799,
      desc: 'Comprehensive decarbonization strategy with Scope 3 supply chain modeling, solar microgrid design, and quarterly reporting.',
      features: [
        'Complete Scope 1, 2 & 3 Carbon Inventory',
        'Detailed Solar & Battery Storage Engineering',
        'Quarterly ESG & Investor Disclosures',
        'Supply Chain Vendor Carbon Surveys',
        'Dedicated Senior Climate Engineer',
        '24/7 Energy Dashboard Access'
      ],
      popular: true,
      cta: 'Choose Growth Plan'
    },
    {
      name: 'Enterprise',
      badge: 'Custom Decarbonization',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      desc: 'Full-scale sustainability consulting for multi-site industrial operators, real estate portfolios, and global corporations.',
      features: [
        'Multi-Facility Global Net-Zero Roadmap',
        'LEED Platinum & BREEAM Certified Advisory',
        'Custom Power Purchase Agreement (PPA) Brokerage',
        'TRUE Zero-Waste-to-Landfill Certification',
        'Board-Level ESG Strategy & Executive Briefings',
        'On-Site Implementation & Commissioning'
      ],
      popular: false,
      cta: 'Contact for Custom Proposal'
    }
  ];

  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="pricing-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Plans & Pricing &#125;</span>
              Transparent Investment
            </span>
          </div>
          <h1 className="pricing-hero-title">
            Transparent Pricing for Every Business Stage
          </h1>
          <p className="pricing-hero-subtitle">
            Predictable, value-driven consulting tiers tailored to your organization's sustainability targets, compliance requirements, and scale.
          </p>

          {/* Billing Switch */}
          <div className="pricing-toggle-wrapper">
            <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
            <button 
              className={`toggle-switch ${isAnnual ? 'annual' : ''}`}
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle annual or monthly pricing"
            >
              <div className="toggle-slider"></div>
            </button>
            <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>
              Annual <span className="discount-pill">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="section pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, idx) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div key={idx} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  
                  <div className="pricing-card-header">
                    <span className="plan-badge">{plan.badge}</span>
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-desc">{plan.desc}</p>
                  </div>

                  <div className="pricing-price-row">
                    {typeof price === 'number' ? (
                      <>
                        <span className="price-currency">$</span>
                        <span className="price-val">{price.toLocaleString()}</span>
                        <span className="price-period">/ month</span>
                      </>
                    ) : (
                      <span className="price-custom">Custom</span>
                    )}
                  </div>
                  {isAnnual && typeof price === 'number' && (
                    <span className="billed-annually-tag">Billed annually (${(price * 12).toLocaleString()}/yr)</span>
                  )}

                  <Link 
                    to="/contact" 
                    className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} pricing-cta-btn`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="pricing-features-list">
                    <span className="features-headline">Included Features:</span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="pricing-feature-row">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pricing-faq-section">
        <div className="container">
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Frequently Asked Pricing Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

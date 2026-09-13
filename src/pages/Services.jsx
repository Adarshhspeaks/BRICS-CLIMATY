import React from 'react';
import { Link } from 'react-router-dom';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Services.css';

export default function Services() {
  const serviceList = [
    {
      id: 'commercial-residential-solar-installation',
      number: '/01',
      title: 'Commercial & Residential Solar Installation',
      description: 'Turn unused rooftop and ground space into high-efficiency clean energy assets. Eliminate volatile utility rate spikes and cut power costs by up to 70%.',
      features: ['Turn-key PV Engineering & Permitting', 'Tier-1 High Efficiency Solar Modules', 'Battery Storage & Microgrid Integration', '25-Year Performance & O&M Warranty'],
      image: '/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png'
    },
    {
      id: 'carbon-footprint-analysis',
      number: '/02',
      title: 'Carbon Footprint Analysis & ESG Auditing',
      description: 'Gain absolute clarity over Scope 1, 2, and 3 greenhouse gas emissions. Build science-based net-zero roadmaps that satisfy investor ESG criteria.',
      features: ['GHG Protocol & SBTi Compliant Baselines', 'Supply Chain & Scope 3 Footprint Modeling', 'Marginal Abatement Cost Curves (MACC)', 'Investor-Grade ESG Disclosures & Reports'],
      image: '/assets/4NstCLeetsWI2DxicnCgTfZKL38.png'
    },
    {
      id: 'sustainable-building-design-consulting',
      number: '/03',
      title: 'Sustainable Building Design & LEED Consulting',
      description: 'Maximize energy efficiency, occupant wellness, and asset valuation with LEED, BREEAM, and WELL certified green building consulting.',
      features: ['Whole-Building Energy & Daylight Simulation', 'Low-Carbon Materials & Embodied Carbon Audits', 'HVAC & Smart Building Automation', 'LEED Platinum & Net-Zero Energy Certification'],
      image: '/assets/S27Lb7w9Bj6JhGM4MULjLrgI1Pw.png'
    },
    {
      id: 'smart-waste-management-reduction-solutions',
      number: '/04',
      title: 'Smart Waste Management & Circular Economy',
      description: 'Transition from linear consumption to profitable circular operations. Cut landfill haulage fees by up to 45% while boosting material reuse.',
      features: ['Comprehensive Waste Stream Characterization', 'Circular Procurement & Packaging Redesign', 'Organic Diversion & Composting Systems', 'Zero-Waste-to-Landfill Certification Support'],
      image: '/assets/ZfeqNExBMiNIhY2aPulV2iPlyQ0.png'
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Our Services &#125;</span>
              What We Do
            </span>
          </div>
          <h1 className="services-hero-title">
            Complete Sustainability Solutions for Your Business
          </h1>
          <p className="services-hero-subtitle">
            From renewable energy transition to carbon accounting and circular operations, our integrated services help companies decarbonize with measurable ROI.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section services-list-section">
        <div className="container">
          <div className="services-detailed-list">
            {serviceList.map((service, idx) => (
              <div key={service.id} className={`service-detailed-row ${idx % 2 === 1 ? 'reversed' : ''}`}>
                <div className="service-detail-text">
                  <span className="service-number-tag">{service.number}</span>
                  <h2 className="service-detail-title">{service.title}</h2>
                  <p className="service-detail-desc">{service.description}</p>
                  
                  <ul className="service-feature-bullets">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="service-bullet-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/service/${service.id}`} className="btn btn-primary btn-sm service-action-btn">
                    View Service Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>

                <div className="service-detail-image-box">
                  <img src={service.image} alt={service.title} className="service-detail-img" />
                </div>
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

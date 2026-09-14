import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeroBackground from '../components/AnimatedHeroBackground';
import PartnersMarquee from '../components/PartnersMarquee';
import FAQAccordion from '../components/FAQAccordion';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Home.css';

export default function Home() {
  const services = [
    {
      id: 'commercial-residential-solar-installation',
      number: '01',
      title: 'Commercial & Residential Solar Installation',
      description: 'Upgrade your energy with solar solutions, cutting costs up to 70% and eliminating carbon emissions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )
    },
    {
      id: 'carbon-footprint-analysis',
      number: '02',
      title: 'Carbon Footprint Analysis',
      description: 'Gain clear insights into your emissions with audits that reveal reduction opportunities and actionable net-zero roadmaps.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    {
      id: 'sustainable-building-design-consulting',
      number: '03',
      title: 'Sustainable Building Design & Consulting',
      description: 'Achieve LEED certification with expert guidance on energy-efficient design, green materials, and sustainable construction.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="9" y1="22" x2="9" y2="22.01"></line>
          <line x1="15" y1="22" x2="15" y2="22.01"></line>
          <line x1="8" y1="6" x2="8" y2="6.01"></line>
          <line x1="16" y1="6" x2="16" y2="6.01"></line>
          <line x1="8" y1="10" x2="8" y2="10.01"></line>
          <line x1="16" y1="10" x2="16" y2="10.01"></line>
          <line x1="8" y1="14" x2="8" y2="14.01"></line>
          <line x1="16" y1="14" x2="16" y2="14.01"></line>
        </svg>
      )
    },
    {
      id: 'smart-waste-management-reduction-solutions',
      number: '04',
      title: 'Smart Waste Management & Reduction Solutions',
      description: 'Adopt circular economy and zero-waste strategies to cut disposal costs by 45% while boosting recycling and minimizing waste.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      )
    }
  ];

  const projects = [
    {
      id: 'sustainx',
      client: 'Johnson Manufacturing',
      title: 'Manufacturing Giant Achieves 65% Emission Reduction',
      tag: 'Solar + Efficiency',
      image: '/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png',
      stat: '65% Emissions Cut'
    },
    {
      id: 'cleanpath',
      client: 'Apex Global HQ',
      title: 'Tech Campus Earns LEED Platinum Certification',
      tag: 'Green Building',
      image: '/assets/4NstCLeetsWI2DxicnCgTfZKL38.png',
      stat: 'LEED Platinum'
    },
    {
      id: 'greenshift',
      client: 'Vanguard Logistics',
      title: 'Renewable Microgrid Powers Fleet Charging Depot',
      tag: 'Clean Mobility',
      image: '/assets/S27Lb7w9Bj6JhGM4MULjLrgI1Pw.png',
      stat: '40k Tons Saved'
    }
  ];

  return (
    <div className="home-page">
      {/* =========================================================================
          HERO SECTION (FULL BACKGROUND)
          ========================================================================= */}
      <section className="hero-section hero-full-bg">
        {/* Dynamic Animated Wind Turbine Background & Lighter Sunlit Atmospheric Tone */}
        <AnimatedHeroBackground />

        <div className="container hero-container">
          <div className="hero-content">
            {/* Top Badge */}
            <div className="hero-badge glass-badge">
              <span className="hero-badge-pill">MISSION 2026</span>
              <span className="hero-badge-text">90% Clean Energy Growth Target</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title hero-title-white">
              Build a Greener Tomorrow, Starting Today
            </h1>

            {/* Subheadline */}
            <p className="hero-subtitle hero-subtitle-white">
              Leading sustainability consultants helping businesses reduce carbon emissions, save costs, and create lasting environmental impact. Join 500+ companies on the path to net-zero.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Assessment
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link to="/service" className="btn btn-secondary-glass btn-lg">
                Explore Our Solutions
              </Link>
            </div>

            {/* Floating Glassmorphism Hero Stats & Widgets */}
            <div className="hero-glass-widgets-row">
              {/* Target Widget */}
              <div className="hero-glass-widget">
                <div className="widget-header">
                  <div className="widget-dot"></div>
                  <span className="widget-tag">Target</span>
                </div>
                <h3 className="widget-text">
                  Accelerating renewable energy adoption by 90% across BRICS partner nations
                </h3>
              </div>

              {/* Key Impact Stats Widget */}
              <div className="hero-glass-widget stat-highlight-widget">
                <div className="widget-header">
                  <span className="widget-icon">⚡</span>
                  <span className="widget-tag">Verified Progress</span>
                </div>
                <div className="widget-metrics-inline">
                  <div>
                    <strong className="metric-val">1.2M+</strong>
                    <span className="metric-lbl">Tons CO₂ Cut</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div>
                    <strong className="metric-val">185 GWh</strong>
                    <span className="metric-lbl">Clean Power</span>
                  </div>
                </div>
              </div>

              {/* Review & Trust Widget */}
              <div className="hero-glass-widget review-glass-widget">
                <div className="review-avatars">
                  <div className="avatar-circle">
                    <img src="/assets/j7IgTTiMBlOV06MaJzWzmoPNw5k.png" alt="User avatar" />
                  </div>
                  <div className="avatar-circle">
                    <img src="/assets/dgPGRfxB7ngWR4EA5vLMmpWEf5I.png" alt="User avatar" />
                  </div>
                  <div className="avatar-circle">
                    <img src="/assets/46De3EP856BP5nf1kfYTsOIIqqw.png" alt="User avatar" />
                  </div>
                </div>
                <div className="review-info">
                  <div className="stars">★★★★★</div>
                  <span className="review-text">500+ Verified 5-Star Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* =========================================================================
          SECTION 01: ABOUT GREENVOLT
          ========================================================================= */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="section-badge-wrapper">
            <span className="section-badge">
              <span className="section-number">&#123; 01 &#125;</span>
              About BRICS-CLIMATY
            </span>
          </div>

          <div className="section-heading-wrapper">
            <h2 className="section-heading">
              We help businesses reduce carbon emissions, adopt clean energy, and achieve measurable progress toward net-zero goals.
            </h2>
            <p className="section-subheading">
              Expert sustainability and renewable energy solutions to cut carbon emissions and help your business reach net-zero. Get a free carbon footprint assessment today.
            </p>
          </div>

          <div className="about-cards-grid">
            <div className="about-feature-card">
              <div className="feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="feature-title">End-to-End Strategy</h3>
              <p className="feature-desc">From initial energy audits to turn-key installation and ESG reporting, we manage the entire sustainability lifecycle.</p>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 className="feature-title">Measurable ROI</h3>
              <p className="feature-desc">Our renewable solutions deliver immediate energy savings, rapid payback periods, and enhanced brand equity.</p>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Industry-Certified</h3>
              <p className="feature-desc">Accredited LEED APs, CEMs, and carbon accountants bringing 15+ years of trusted engineering expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: IMPACT IN NUMBERS
          ========================================================================= */}
      <section className="section impact-numbers-section">
        <div className="container">
          <div className="section-badge-wrapper">
            <span className="section-badge">
              <span className="section-number">&#123; 02 &#125;</span>
              Our Environmental Impact in Numbers
            </span>
          </div>

          <div className="impact-grid">
            <div className="impact-stat-card">
              <span className="impact-stat-number">1.2M+</span>
              <h4 className="impact-stat-label">CO2 Emissions Reduced</h4>
              <p className="impact-stat-sub">Metric tons of greenhouse gases eliminated across client operations.</p>
            </div>

            <div className="impact-stat-card">
              <span className="impact-stat-number">480+</span>
              <h4 className="impact-stat-label">Companies Transformed</h4>
              <p className="impact-stat-sub">Enterprises and SMBs transitioning toward verified net-zero pathways.</p>
            </div>

            <div className="impact-stat-card">
              <span className="impact-stat-number">49,980+</span>
              <h4 className="impact-stat-label">Trees Planted Annually</h4>
              <p className="impact-stat-sub">Biodiversity reforestation initiatives funded through client partnerships.</p>
            </div>

            <div className="impact-stat-card">
              <span className="impact-stat-number">99%</span>
              <h4 className="impact-stat-label">Client Satisfaction Rate</h4>
              <p className="impact-stat-sub">Consistent high client retention and verified ROI metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: SERVICES
          ========================================================================= */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="services-header-row">
            <div>
              <div className="section-badge-wrapper">
                <span className="section-badge">
                  <span className="section-number">&#123; 03 &#125;</span>
                  Comprehensive Sustainability
                </span>
              </div>
              <h2 className="section-heading">Solutions for Modern Businesses</h2>
              <p className="section-subheading">
                We deliver end-to-end sustainability consulting, from renewable energy to carbon neutrality, tailored to your business goals.
              </p>
            </div>
            <Link to="/service" className="btn btn-secondary view-all-btn">
              View All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <div className="services-grid">
            {services.map((srv) => (
              <div key={srv.id} className="service-card">
                <div className="service-card-top">
                  <div className="service-icon-wrapper">
                    {srv.icon}
                  </div>
                  <span className="service-card-num">{srv.number}</span>
                </div>
                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.description}</p>
                <Link to={`/service/${srv.id}`} className="service-learn-more">
                  <span>Learn more</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: PROJECTS / SUCCESS STORIES
          ========================================================================= */}
      <section className="section projects-section" id="projects">
        <div className="container">
          <div className="services-header-row">
            <div>
              <div className="section-badge-wrapper">
                <span className="section-badge">
                  <span className="section-number">&#123; 04 &#125;</span>
                  Recent Success Stories
                </span>
              </div>
              <h2 className="section-heading">Stories of Measurable Impact</h2>
              <p className="section-subheading">
                See how our solutions help businesses cut emissions, save costs, and achieve real impact.
              </p>
            </div>
            <Link to="/project" className="btn btn-secondary view-all-btn">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <div className="projects-grid">
            {projects.map((proj) => (
              <Link to={`/project/${proj.id}`} key={proj.id} className="project-card">
                <div className="project-image-box">
                  <img src={proj.image} alt={proj.title} className="project-img" />
                  <span className="project-tag-pill">{proj.tag}</span>
                </div>
                <div className="project-card-body">
                  <span className="project-client">{proj.client}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  <div className="project-card-footer">
                    <span className="project-stat-highlight">{proj.stat}</span>
                    <span className="project-arrow-link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: WHY CHOOSE US
          ========================================================================= */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="why-choose-card">
            <div className="section-badge-wrapper">
              <span className="section-badge dark">
                <span className="section-number">&#123; 05 &#125;</span>
                Why Leading Organizations Choose Us
              </span>
            </div>
            <h2 className="why-choose-heading">
              Trusted by top organizations for proven strategies, expert guidance, and measurable results.
            </h2>

            <div className="pillars-grid">
              <div className="pillar-item">
                <span className="pillar-badge">&#123; Sustainability &#125;</span>
                <p className="pillar-text">
                  Certified experts with 15+ years of experience delivering proven, industry-backed sustainability strategies.
                </p>
              </div>

              <div className="pillar-item">
                <span className="pillar-badge">&#123; Data-Driven &#125;</span>
                <p className="pillar-text">
                  Data-driven recommendations with real-time dashboards and quarterly impact reports to track your progress.
                </p>
              </div>

              <div className="pillar-item">
                <span className="pillar-badge">&#123; End-to-End &#125;</span>
                <p className="pillar-text">
                  From assessment to implementation and monitoring, our dedicated team ensures seamless execution and continuous optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06: FAQS
          ========================================================================= */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; 06 &#125;</span>
              Frequently Asked Questions
            </span>
          </div>

          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Find Clear Answers</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Find answers to the most common questions about our sustainability solutions, renewable energy services, and carbon reduction strategies.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* Ready CTA & Newsletter */}
      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

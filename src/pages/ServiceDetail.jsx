import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './ServiceDetail.css';

const serviceData = {
  'commercial-residential-solar-installation': {
    title: 'Commercial & Residential Solar Installation',
    tagline: 'High-yield solar photovoltaic solutions reducing operational energy expenditures by up to 70%.',
    badge: 'Clean Power & Storage',
    overview: 'Our turn-key solar installation service delivers custom-engineered rooftop, canopy, and ground-mount PV systems for commercial properties, manufacturing facilities, and residential portfolios. We oversee feasibility, electrical engineering, utility interconnection, local permitting, incentive capture, and long-term asset management.',
    image: '/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png',
    benefits: [
      { title: 'Immediate Utility Savings', desc: 'Lock in predictable low electricity rates and protect operations against peak demand charges.' },
      { title: 'Accelerated 3-5 Year ROI', desc: 'Leverage federal tax credits, depreciation bonuses, and local renewable energy credits.' },
      { title: 'Battery Backup Resilience', desc: 'Ensure mission-critical uptime during grid outages with integrated lithium-ion storage.' },
      { title: 'Scope 2 Decarbonization', desc: 'Generate verified on-site renewable energy certificates (RECs) for sustainability reporting.' }
    ],
    process: [
      { step: '01', name: 'Solar Site Assessment', desc: '3D irradiance modeling, structural roof audits, and interval meter data analysis.' },
      { step: '02', name: 'Engineering & Permitting', desc: 'Stamped electrical single-line diagrams, AHJ permitting, and utility interconnection approval.' },
      { step: '03', name: 'Procurement & Build', desc: 'Tier-1 bifacial panels, smart inverters, and rapid installation by certified electricians.' },
      { step: '04', name: 'Commissioning & Monitoring', desc: 'Grid parallel testing, SCADA dashboard integration, and 25-year warranty management.' }
    ],
    stats: [
      { value: '70%', label: 'Max Energy Cost Reduction' },
      { value: '3-5 Yrs', label: 'Average Payback Period' },
      { value: '25 Yrs', label: 'Guaranteed Equipment Lifespan' }
    ]
  },
  'carbon-footprint-analysis': {
    title: 'Carbon Footprint Analysis & ESG Auditing',
    tagline: 'Science-based GHG inventories and comprehensive Scope 1, 2, and 3 decarbonization roadmaps.',
    badge: 'Carbon Accounting',
    overview: 'Accurate greenhouse gas accounting is the foundation of every credible corporate sustainability initiative. BRICS-CLIMATY provides ISO 14064 and GHG Protocol compliant audits that pinpoint operational inefficiencies, quantify supply chain emissions, and generate prioritized abatement pathways aligned with SBTi targets.',
    image: '/assets/4NstCLeetsWI2DxicnCgTfZKL38.png',
    benefits: [
      { title: 'Rigorous Scope 1, 2 & 3 Inventories', desc: 'End-to-end quantification across direct combustion, purchased electricity, and value chain activities.' },
      { title: 'Investor-Grade ESG Compliance', desc: 'Audit-ready documentation formatted for CSRD, SEC, CDP, and GRI reporting standards.' },
      { title: 'Marginal Abatement Costing', desc: 'Rank emission reduction initiatives by cost-per-ton avoided to optimize capital expenditure.' },
      { title: 'Supplier Engagement Programs', desc: 'Custom vendor surveys and procurement criteria to reduce upstream supply chain intensity.' }
    ],
    process: [
      { step: '01', name: 'Data Ingestion & Boundary Definition', desc: 'Establish organizational boundaries, activity datasets, and emission factor databases.' },
      { step: '02', name: 'Lifecycle GHG Modeling', desc: 'Calculate exact baseline footprints using hybrid spend-based and activity-based methodologies.' },
      { step: '03', name: 'Abatement Roadmap Design', desc: 'Develop milestone-driven mitigation strategies with CapEx/OpEx forecasting.' },
      { step: '04', name: 'Executive Dashboard & Disclosures', desc: 'Deliver interactive reporting dashboards and compliance-ready filing packages.' }
    ],
    stats: [
      { value: '100%', label: 'GHG Protocol Compliance' },
      { value: '45+', label: 'Industry Sectors Audited' },
      { value: '< 4 Wks', label: 'Turnaround Delivery Time' }
    ]
  },
  'sustainable-building-design-consulting': {
    title: 'Sustainable Building Design & LEED Consulting',
    tagline: 'High-performance architectural strategies for LEED Platinum, BREEAM, and Net-Zero Energy buildings.',
    badge: 'Green Architecture',
    overview: 'We partner with developers, architects, and facilities managers to integrate sustainability into every phase of the built environment. From parametric energy modeling and daylight optimization to low-embodied carbon material selection, we guide projects from initial concept through certification.',
    image: '/assets/S27Lb7w9Bj6JhGM4MULjLrgI1Pw.png',
    benefits: [
      { title: 'LEED & WELL Certification', desc: 'Proven track record securing LEED Gold/Platinum and WELL Building Standard certifications.' },
      { title: 'Energy Efficiency Optimization', desc: 'Cut operational energy consumption by 40-60% through passive design and smart HVAC.' },
      { title: 'Enhanced Asset Value', desc: 'Green-certified properties command higher lease rates, faster occupancy, and premium valuations.' },
      { title: 'Occupant Health & Wellbeing', desc: 'Optimize indoor environmental quality, acoustic comfort, and natural circadian lighting.' }
    ],
    process: [
      { step: '01', name: 'Eco-Charrette & Goal Setting', desc: 'Align design team around targeted certification rating systems and sustainability metrics.' },
      { step: '02', name: 'Building Energy Simulation', desc: 'Iterative thermodynamic modeling, facade solar heat gain analysis, and daylight mapping.' },
      { step: '03', name: 'Material & Systems Specification', desc: 'Evaluate EPDs, recycled content, non-toxic finishes, and high-efficiency mechanical plant.' },
      { step: '04', name: 'Certification Audit & Submittal', desc: 'Manage all credit documentation, commissioning reports, and USGBC/GBCI verification.' }
    ],
    stats: [
      { value: '50+', label: 'Certified Green Projects' },
      { value: '45%', label: 'Average Energy Reduction' },
      { value: '100%', label: 'LEED Pass Rate on First Attempt' }
    ]
  },
  'smart-waste-management-reduction-solutions': {
    title: 'Smart Waste Management & Circular Economy',
    tagline: 'Zero-waste strategies, material reuse protocols, and automated resource recovery systems.',
    badge: 'Circular Economy',
    overview: 'Transforming waste from an operational liability into a value-generating asset. BRICS-CLIMATY performs comprehensive facility waste characterization audits, redesigns packaging workflows, establishes closed-loop recovery loops, and implements organic composting systems to achieve TRUE Zero Waste certification.',
    image: '/assets/ZfeqNExBMiNIhY2aPulV2iPlyQ0.png',
    benefits: [
      { title: 'Substantial Haulage Cost Savings', desc: 'Eliminate unnecessary tipping fees and landfill taxes through source reduction and diversion.' },
      { title: 'Circular Material Monetization', desc: 'Establish direct commodity resale agreements for segregated paper, metals, and plastics.' },
      { title: 'Supply Chain Waste Minimization', desc: 'Transition vendors to reusable packaging, standardized pallets, and returnable dunnage.' },
      { title: 'TRUE Zero Waste Certification', desc: 'Attain internationally recognized verification for diverting >90% of waste from landfills.' }
    ],
    process: [
      { step: '01', name: 'On-Site Waste Stream Audit', desc: 'Sort, weigh, and catalog all facility output streams to identify highest-impact diversion vectors.' },
      { step: '02', name: 'Source Reduction Engineering', desc: 'Redesign intake procurement and operational packaging to prevent waste generation at the source.' },
      { step: '03', name: 'Hauler & Offtake Optimization', desc: 'Renegotiate hauler contracts and establish partnerships with specialized regional recyclers.' },
      { step: '04', name: 'Staff Training & Zero-Waste Tracking', desc: 'Deploy color-coded sorting stations, gamified employee training, and automated diversion metrics.' }
    ],
    stats: [
      { value: '92%', label: 'Average Diversion Achieved' },
      { value: '45%', label: 'Disposal Cost Savings' },
      { value: '0 lbs', label: 'Landfill Target' }
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug];

  if (!service) {
    return <Navigate to="/service" replace />;
  }

  return (
    <div className="service-detail-page">
      {/* Hero Header */}
      <section className="service-detail-hero">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Service &#125;</span>
              {service.badge}
            </span>
          </div>
          <h1 className="service-hero-title">{service.title}</h1>
          <p className="service-hero-tagline">{service.tagline}</p>
          <div className="service-hero-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Get Consultation
            </Link>
            <Link to="/service" className="btn btn-secondary btn-lg">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Main Overview */}
      <section className="section service-overview-section">
        <div className="container">
          <div className="service-overview-grid">
            <div className="service-overview-text">
              <span className="section-kicker">&#123; Overview &#125;</span>
              <h2 className="service-overview-heading">Transforming Operations into Sustainable Competitive Advantages</h2>
              <p className="service-overview-desc">{service.overview}</p>
              
              <div className="service-stats-banner">
                {service.stats.map((st, idx) => (
                  <div key={idx} className="service-stat-box">
                    <span className="stat-num">{st.value}</span>
                    <span className="stat-label">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-overview-media">
              <img src={service.image} alt={service.title} className="service-media-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section service-benefits-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Advantages &#125;</span>
              Key Business Benefits
            </span>
          </div>
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Why Choose BRICS-CLIMATY For This Solution</h2>
          </div>

          <div className="benefits-grid">
            {service.benefits.map((b, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-check-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b8e58" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / How It Works */}
      <section className="section service-process-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Methodology &#125;</span>
              Our 4-Step Execution Process
            </span>
          </div>
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">How We Deliver Measurable Results</h2>
          </div>

          <div className="process-grid">
            {service.process.map((pr, idx) => (
              <div key={idx} className="process-step-card">
                <span className="process-step-num">{pr.step}</span>
                <h3 className="process-step-title">{pr.name}</h3>
                <p className="process-step-desc">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section service-faq-section">
        <div className="container">
          <div className="section-heading-wrapper" style={{ textAlign: 'center' }}>
            <h2 className="section-heading">Common Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

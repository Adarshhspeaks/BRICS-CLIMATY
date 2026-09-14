import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BRICSWeatherMap from '../components/BRICSWeatherMap';
import FAQAccordion from '../components/FAQAccordion';
import ReadyCTA from '../components/ReadyCTA';

import './ClimateResilience.css';

const resilienceDimensions = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    num: "01",
    title: "Critical Infrastructure Hardening & Microgrids",
    desc: "Upgrading transmission substations, port logistics, and hospital backup arrays with climate-hardened renewable microgrids and localized battery storage to ensure zero downtime during extreme weather.",
    badge: "Grid Security"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    num: "02",
    title: "Water Security & Sponge City Architecture",
    desc: "Deploying permeable pavements, bio-retention swales, decentralized stormwater harvesting, and aquifer recharge networks to mitigate catastrophic flooding while buffering against severe drought.",
    badge: "Hydrological Buffer"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M2 17h20M2 7h20"/>
      </svg>
    ),
    num: "03",
    title: "Coastal Defense & Blue Carbon Ecosystems",
    desc: "Restoring living coastal barriers—mangroves, coral reefs, and bio-engineered breakwaters—to absorb storm surge kinetic energy while sequestering high-density blue carbon.",
    badge: "Coastal Protection"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    num: "04",
    title: "Urban Heat Island Mitigation & Cool Canopies",
    desc: "Integrating high-albedo reflective materials, extensive rooftop vegetation, and ventilation wind corridors to lower metropolitan peak summer temperatures by up to 4.2°C.",
    badge: "Thermal Defense"
  }
];

const riskCalculatorData = {
  Infrastructure: {
    title: "Energy & Transportation Asset Defense",
    threat: "Extreme storm surges, grid blackout risk, flood damage to substations.",
    solution: "Substation flood barriers, decentralized solar microgrids, predictive transformer cooling, redundant transport corridors.",
    roi: "3.8x Disaster Cost Avoidance Ratio",
    implementationTime: "8 - 14 Weeks"
  },
  Agriculture: {
    title: "Climate-Smart Agro-Ecosystems",
    threat: "Prolonged multi-month droughts, unpredictable monsoons, soil salinization.",
    solution: "Solar-powered precision drip irrigation, regenerative agroforestry buffers, drought-resistant heritage crop selection.",
    roi: "45% Yield Stabilization under heat stress",
    implementationTime: "4 - 8 Weeks"
  },
  Municipal: {
    title: "Sponge City & Urban Climate Adaptation",
    threat: "Flash urban pluvial flooding, severe heat stress, stormwater overflow.",
    solution: "Underground detention vaults, porous public plazas, green corridors, emergency early evacuation telemetry.",
    roi: "60% Reduction in flood liability payouts",
    implementationTime: "12 - 20 Weeks"
  },
  Coastal: {
    title: "Marine & Delta Storm Surge Protection",
    threat: "Accelerated sea-level rise, coastal erosion, cyclone tidal surges.",
    solution: "Mangrove wetland restoration, hybrid living dikes, offshore wave dissipators, real-time tidal gauge networks.",
    roi: "85% Wave energy reduction at shoreline",
    implementationTime: "16 - 24 Weeks"
  }
};

const resilienceFaqs = [
  {
    question: "How does climate resilience differ from climate mitigation?",
    answer: "While climate mitigation focuses on reducing greenhouse gas emissions (the cause of climate change), climate resilience and adaptation focus on preparing infrastructure, supply chains, and societies to withstand and thrive amidst the unavoidable impacts and extreme weather events already occurring."
  },
  {
    question: "How are climate risk assessments quantified under BRICS-CLIMATY?",
    answer: "We employ IPCC SSP (Shared Socioeconomic Pathways) climate modeling combined with high-resolution GIS topological scans to simulate 10-year, 50-year, and 100-year disaster scenarios specific to your asset locations."
  },
  {
    question: "Does resilience planning unlock green financing and lower insurance premiums?",
    answer: "Yes! Verified resilience investments provide lower cost of capital through sustainability-linked bonds and typically result in 15% to 35% discounts on catastrophic property and business interruption insurance."
  },
  {
    question: "Can small and medium enterprises implement localized resilience measures?",
    answer: "Absolutely. We offer modular resilience toolkits covering backup power, flood barriers, supply chain multi-sourcing, and emergency continuity plans specifically tailored for SMB facilities."
  }
];

export default function ClimateResilience() {
  const [selectedRisk, setSelectedRisk] = useState('Infrastructure');
  const activeSector = riskCalculatorData[selectedRisk];

  return (
    <div className="resilience-page">
      {/* Hero Section */}
      <section className="resilience-hero">
        <div className="container">
          <div className="resilience-hero-content text-center">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Climate Adaptation & Risk Mitigation • CACR</span>
            </div>
            <h1 className="resilience-title">
              Building <span className="text-primary-green">Unshakeable</span> Climate Resilience
            </h1>
            <p className="resilience-lead">
              Empowering cities, enterprises, and critical ecosystems across BRICS member states to anticipate, withstand, and rapidly recover from climate volatility and extreme weather shocks.
            </p>
            <div className="resilience-actions">
              <Link to="/impact" className="btn btn-primary btn-lg">
                Explore Adaptation Metrics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resilience Stats Bar */}
      <section className="resilience-stats-strip">
        <div className="container">
          <div className="stats-strip-grid">
            <div className="stat-strip-card">
              <span className="strip-num">$3.5B+</span>
              <span className="strip-label">Resilient Infrastructure Protected</span>
            </div>
            <div className="stat-strip-card">
              <span className="strip-num">250+</span>
              <span className="strip-label">Municipal Adaptation Plans Deployed</span>
            </div>
            <div className="stat-strip-card">
              <span className="strip-num">12.5M</span>
              <span className="strip-label">Citizens Covered by Early Warning Systems</span>
            </div>
            <div className="stat-strip-card">
              <span className="strip-num">100%</span>
              <span className="strip-label">Alignment with Sendai & UNFCCC Goals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Resilience Dimensions */}
      <section className="section resilience-dimensions-section">
        <div className="container">
          <div className="text-center mb-50">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Adaptation Pillars</span>
            </div>
            <h2 className="section-title">Four Dimensions of Comprehensive Resilience</h2>
            <p className="section-subtitle">
              Targeted engineering, nature-based defenses, and intelligent forecasting to safeguard against extreme climate hazards.
            </p>
          </div>

          <div className="dimensions-cards-grid">
            {resilienceDimensions.map((dim) => (
              <div key={dim.num} className="dimension-card">
                <div className="dim-top">
                  <div className="dim-icon-box">{dim.icon}</div>
                  <span className="dim-num">{dim.num}</span>
                </div>
                <span className="dim-badge">{dim.badge}</span>
                <h3 className="dim-title">{dim.title}</h3>
                <p className="dim-desc">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live BRICS Weather Monitoring Map */}
      <section className="section brics-weather-section">
        <div className="container">
          <div className="text-center mb-40">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Live Climate Monitoring</span>
            </div>
            <h2 className="section-title">Real-Time Weather Across BRICS Member States</h2>
            <p className="section-subtitle">
              Live conditions and 5-day outlooks for each BRICS capital, tracking the extreme heat, storm, and flood risk drivers behind our resilience strategy.
            </p>
          </div>

          <BRICSWeatherMap />
        </div>
      </section>

      {/* Interactive Sector Risk Assessment Matrix */}
      <section className="section risk-matrix-section">
        <div className="container">
          <div className="risk-matrix-card">
            <div className="matrix-header">
              <div>
                <span className="matrix-badge">CACR Sector Matrix</span>
                <h2 className="matrix-title">Explore Sector Adaptation Strategies</h2>
                <p className="matrix-subtitle">Select a sector to view identified climate threats, engineered countermeasures, and projected risk reduction.</p>
              </div>
              <div className="matrix-selector-pills">
                {Object.keys(riskCalculatorData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRisk(key)}
                    className={`matrix-pill-btn ${selectedRisk === key ? 'active' : ''}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="matrix-body-grid">
              <div className="matrix-left-col">
                <span className="matrix-asset-tag">Sector Profile: {selectedRisk}</span>
                <h3 className="matrix-target-title">{activeSector.title}</h3>
                
                <div className="threat-box">
                  <span className="box-title">Identified Climate Hazard:</span>
                  <p className="box-desc">{activeSector.threat}</p>
                </div>

                <div className="solution-box">
                  <span className="box-title">Engineered Resilience Countermeasures:</span>
                  <p className="box-desc">{activeSector.solution}</p>
                </div>
              </div>

              <div className="matrix-right-col">
                <div className="roi-stat-card">
                  <span className="roi-label">Resilience Impact & Cost-Benefit</span>
                  <span className="roi-val">{activeSector.roi}</span>
                  <div className="timeline-badge">
                    <span>Average Deployment:</span>
                    <strong>{activeSector.implementationTime}</strong>
                  </div>
                  <Link to="/feedback" className="btn btn-primary btn-md w-full mt-20">
                    Get Customized Blueprint →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <ReadyCTA />

      {/* FAQ Section */}
      <section className="section resilience-faqs">
        <div className="container">
          <div className="text-center mb-40">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="section-title">Climate Resilience & Adaptation FAQ</h2>
            <p className="section-subtitle">Clarifying methodologies, vulnerability modeling, and institutional resilience integration.</p>
          </div>
          <div className="faq-container-narrow">
            <FAQAccordion items={resilienceFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
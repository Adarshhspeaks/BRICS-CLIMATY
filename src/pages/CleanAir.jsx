import BRICSAirQualityMap from '../components/BRICSAirQualityMap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import ReadyCTA from '../components/ReadyCTA';
import './CleanAir.css';

const airPillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    num: "01",
    title: "Industrial Emissions Control & Filtration",
    desc: "Deploying multi-stage electrostatic precipitators, catalytic NOx reducers, and real-time Continuous Emission Monitoring Systems (CEMS) across heavy manufacturing and thermal facilities.",
    tag: "Industrial De-smogging"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    num: "02",
    title: "Urban Airshed & Low-Emission Corridors",
    desc: "Designing comprehensive Low-Emission Zones (LEZs), fleet electrification pathways, and dense urban green buffers to eliminate tailpipe particulates and ground-level ozone.",
    tag: "Urban Mobility"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    num: "03",
    title: "Agricultural Biomass & Zero-Burn Valorization",
    desc: "Eliminating seasonal crop residue burning through rapid decentralized biochar pyrolyzers, bio-pellet manufacturing, and automated zero-till seeding equipment.",
    tag: "Rural Air Quality"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    num: "04",
    title: "AI-Powered Air Quality Forecasting & IoT Grids",
    desc: "Hyper-local micro-sensor grids fused with satellite remote sensing and machine learning models to provide 72-hour high-resolution smog dispersion alerts and source attribution.",
    tag: "Smart Intelligence"
  }
];

const aqiMetrics = [
  { name: 'PM2.5 (Fine Particles)', current: '12.4 µg/m³', target: '< 10 µg/m³', status: 'Optimal / 64% Cut', score: 92 },
  { name: 'PM10 (Coarse Dust)', current: '24.8 µg/m³', target: '< 20 µg/m³', status: 'Safe / 52% Drop', score: 86 },
  { name: 'Nitrogen Dioxide (NO₂)', current: '18.2 ppb', target: '< 25 ppb', status: 'Compliant / Stable', score: 95 },
  { name: 'Sulfur Dioxide (SO₂)', current: '4.1 ppb', target: '< 10 ppb', status: 'Ultra-Low Baseline', score: 98 },
];

const cleanAirFaqs = [
  {
    question: "What is the Clean Air and Climate Resilience (CACR) Framework?",
    answer: "The CACR Framework is BRICS-CLIMATY's integrated roadmap linking atmospheric emissions mitigation directly with long-term climate resilience. It establishes standardized metrics, industrial decarbonization blueprints, and multi-region airshed management strategies."
  },
  {
    question: "How does airshed management differ from traditional point-source pollution control?",
    answer: "Airshed management treats entire atmospheric geographic basins as unified systems, accounting for meteorological wind vectors, transboundary particulate transport, and cumulative regional emissions rather than isolated factory stacks."
  },
  {
    question: "Can industrial facilities integrate real-time CEMS monitoring with BRICS-CLIMATY?",
    answer: "Yes. We offer automated API integration for IoT telemetry, connecting industrial emission sensors directly to our predictive analytics dashboard for automated compliance audits and early deviation warnings."
  },
  {
    question: "What support is provided for municipal low-emission transit transitions?",
    answer: "We deliver turnkey EV fleet charging optimization, route efficiency simulations, micro-mobility corridor mapping, and carbon credit verification for public transportation authorities."
  }
];

export default function CleanAir() {
  const [selectedTab, setSelectedTab] = useState('Industrial');

  return (
    <div className="clean-air-page">
      {/* Hero Section */}
      <section className="clean-air-hero">
        <div className="container">
          <div className="clean-air-hero-grid">
            <div className="hero-text-col">
              <div className="badge-pill mb-16">
                <span className="badge-dot"></span>
                <span>Clean Air Initiative • CACR Program</span>
              </div>
              <h1 className="clean-air-title">
                Clean Air & <span className="text-primary-green">Atmospheric</span> Restoration
              </h1>
              <p className="clean-air-lead">
                Delivering advanced emissions mitigation, particulate matter reduction, and intelligent airshed management to protect public health and accelerate net-zero skies across BRICS nations.
              </p>
              <div className="clean-air-actions">
                <Link to="/impact" className="btn btn-primary btn-lg">
                  View Air Quality Metrics
                </Link>
              </div>
            </div>

            {/* Live AQI Radar Dashboard Card */}
            <div className="aqi-dashboard-card">
              <div className="aqi-card-header">
                <div>
                  <span className="aqi-card-tag">CACR Live Telemetry</span>
                  <h3 className="aqi-card-title">Airshed Health Index</h3>
                </div>
                <div className="aqi-status-pill">
                  <span className="live-dot"></span>
                  <span>Active Monitoring</span>
                </div>
              </div>

              <div className="aqi-metrics-list">
                {aqiMetrics.map((item, idx) => (
                  <div key={idx} className="aqi-metric-row">
                    <div className="metric-info-top">
                      <span className="metric-name">{item.name}</span>
                      <span className="metric-val">{item.current}</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: `${item.score}%` }}></div>
                    </div>
                    <div className="metric-info-bottom">
                      <span>Target: {item.target}</span>
                      <span className="metric-status-badge">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="aqi-card-footer">
                <div className="footer-stat">
                  <span className="stat-big">4.8M+</span>
                  <span className="stat-label">Tons PM2.5 Prevented</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-big">850k</span>
                  <span className="stat-label">Respiratory Cases Averted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BRICSAirQualityMap />
      

      {/* 4 Clean Air Pillars */}
      <section className="section clean-air-pillars-section">
        <div className="container">
          <div className="text-center mb-50">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Strategic Interventions</span>
            </div>
            <h2 className="section-title">Four Pillars of Clean Air Transition</h2>
            <p className="section-subtitle">
              Comprehensive engineering and policy solutions to eliminate harmful aerosols, oxides, and particulate matter at scale.
            </p>
          </div>

          <div className="pillars-cards-grid">
            {airPillars.map((pillar) => (
              <div key={pillar.num} className="clean-pillar-card">
                <div className="pillar-top">
                  <div className="pillar-icon-box">{pillar.icon}</div>
                  <span className="pillar-num">{pillar.num}</span>
                </div>
                <span className="pillar-tag-badge">{pillar.tag}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Solutions Deep Dive */}
      <section className="section sector-solutions-section">
        <div className="container">
          <div className="solutions-container-card">
            <div className="solutions-tabs-header">
              <div>
                <span className="solutions-badge">CACR Sector Roadmaps</span>
                <h2 className="solutions-heading">Targeted Air Quality Programs</h2>
              </div>
              <div className="solutions-tabs-nav">
                {['Industrial', 'Municipal', 'Agricultural', 'Transport'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`tab-pill-btn ${selectedTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="solutions-content-body">
              {selectedTab === 'Industrial' && (
                <div className="solution-detail-grid">
                  <div className="solution-text">
                    <h3>Heavy Industry & Manufacturing Clean Air Retrofits</h3>
                    <p>
                      We deliver comprehensive thermal efficiency and filtration overhauls for cement, steel, chemical, and energy generation plants. Our turn-key retrofits guarantee compliance with stringent emission caps while capturing valuable heat and material byproducts.
                    </p>
                    <ul className="solution-bullet-list">
                      <li>Catalytic selective reduction (SCR) for 95% NOx suppression</li>
                      <li>Dry desulfurization units yielding reusable gypsum</li>
                      <li>Continuous cloud-connected compliance telemetry and reporting</li>
                    </ul>
                  </div>
                  <div className="solution-stat-box">
                    <span className="stat-number">65%</span>
                    <span className="stat-desc">Average drop in industrial particulate emissions achieved across 140+ retrofitted sites.</span>
                  </div>
                </div>
              )}

              {selectedTab === 'Municipal' && (
                <div className="solution-detail-grid">
                  <div className="solution-text">
                    <h3>Urban Airshed Management & Low-Emission Zones</h3>
                    <p>
                      Transforming metropolitan air quality through predictive traffic management, street-level air purification totems, dust-suppression asphalt treatments, and expansive green canopy networks.
                    </p>
                    <ul className="solution-bullet-list">
                      <li>City-wide sensor density for localized street pollution mapping</li>
                      <li>Dynamic congestion mitigation linked to real-time air quality data</li>
                      <li>Urban forestry and green corridor air scrubbing corridors</li>
                    </ul>
                  </div>
                  <div className="solution-stat-box">
                    <span className="stat-number">35+</span>
                    <span className="stat-desc">BRICS metropolitan airsheds actively implementing our municipal clean air framework.</span>
                  </div>
                </div>
              )}

              {selectedTab === 'Agricultural' && (
                <div className="solution-detail-grid">
                  <div className="solution-text">
                    <h3>Zero-Burn Crop Residue & Biochar Transformation</h3>
                    <p>
                      Eliminating open-field burning of crop residue by converting agricultural waste into biochar soil enrichers and industrial bio-pellets, creating clean air and additional farm revenue streams.
                    </p>
                    <ul className="solution-bullet-list">
                      <li>Mobile pyrolyzer units for on-farm processing</li>
                      <li>Long-term carbon sequestration verified under gold standard</li>
                      <li>99% elimination of seasonal smog spikes in agricultural belts</li>
                    </ul>
                  </div>
                  <div className="solution-stat-box">
                    <span className="stat-number">1.8M</span>
                    <span className="stat-desc">Tons of crop residue repurposed annually into carbon-negative biochar.</span>
                  </div>
                </div>
              )}

              {selectedTab === 'Transport' && (
                <div className="solution-detail-grid">
                  <div className="solution-text">
                    <h3>Freight & Public Transit Electrification Corridors</h3>
                    <p>
                      Replacing heavy diesel pollution along high-traffic logistics arteries with megawatt-scale electric fleet charging, hydrogen fuel cell pilots, and zero-emission multimodal hubs.
                    </p>
                    <ul className="solution-bullet-list">
                      <li>Fleet transition financial modeling and lifecycle ROI analysis</li>
                      <li>Depot microgrid design powered by rooftop commercial solar</li>
                      <li>Elimination of localized particulate hotspots near residential hubs</li>
                    </ul>
                  </div>
                  <div className="solution-stat-box">
                    <span className="stat-number">40k</span>
                    <span className="stat-desc">Diesel truck routes converted to clean electric logistics corridors.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <ReadyCTA />

      {/* FAQ Section */}
      <section className="section clean-air-faqs">
        <div className="container">
          <div className="text-center mb-40">
            <div className="badge-pill mb-16">
              <span className="badge-dot"></span>
              <span>Questions & Insights</span>
            </div>
            <h2 className="section-title">Clean Air FAQ</h2>
            <p className="section-subtitle">Common queries regarding emissions control, monitoring networks, and CACR standards.</p>
          </div>
          <div className="faq-container-narrow">
            <FAQAccordion items={cleanAirFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectList = [
    {
      id: 'sustainx',
      client: 'Johnson Manufacturing',
      title: 'Manufacturing Giant Achieves 65% Emission Reduction',
      category: 'solar',
      tag: 'Solar + Efficiency',
      image: '/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png',
      summary: 'Turn-key 4.2 MW solar microgrid and smart boiler optimization saving 28,000 MT CO2 annually.',
      stat: '65% Emissions Cut',
      roi: '$1.4M / yr saved'
    },
    {
      id: 'cleanpath',
      client: 'Apex Global HQ',
      title: 'Tech Campus Earns LEED Platinum Certification',
      category: 'building',
      tag: 'Green Building',
      image: '/assets/4NstCLeetsWI2DxicnCgTfZKL38.png',
      summary: 'Complete architectural decarbonization, parametric facade modeling, and 100% renewable power.',
      stat: 'LEED Platinum',
      roi: '52% Energy Cut'
    },
    {
      id: 'greenshift',
      client: 'Vanguard Logistics',
      title: 'Renewable Microgrid Powers Fleet Charging Depot',
      category: 'solar',
      tag: 'Clean Mobility',
      image: '/assets/S27Lb7w9Bj6JhGM4MULjLrgI1Pw.png',
      summary: 'Deploying on-site solar canopy and 8 MWh battery storage to electrify 120 heavy freight vehicles.',
      stat: '40k Tons Saved',
      roi: '8 MWh Battery'
    },
    {
      id: 'ecoloop',
      client: 'Metro Retail Properties',
      title: 'Zero-Waste Program Diverts 94% from Landfills',
      category: 'waste',
      tag: 'Circular Economy',
      image: '/assets/ZfeqNExBMiNIhY2aPulV2iPlyQ0.png',
      summary: 'Standardizing tenant recycling streams, organic compost processing, and plastic elimination.',
      stat: '94% Landfill Diversion',
      roi: '45% Haulage Cut'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projectList 
    : projectList.filter(p => p.category === activeFilter);

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero-section">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Case Studies &#125;</span>
              Proven Results
            </span>
          </div>
          <h1 className="projects-hero-title">
            Driving Sustainable Impact, One Project at a Time
          </h1>
          <p className="projects-hero-subtitle">
            Explore our featured portfolio of enterprise decarbonization, renewable microgrids, and LEED-certified sustainable architectures.
          </p>

          {/* Filter Pills */}
          <div className="project-filter-pills">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'solar' ? 'active' : ''}`}
              onClick={() => setActiveFilter('solar')}
            >
              Solar & Storage
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'building' ? 'active' : ''}`}
              onClick={() => setActiveFilter('building')}
            >
              Green Buildings
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'waste' ? 'active' : ''}`}
              onClick={() => setActiveFilter('waste')}
            >
              Circular Economy
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section projects-gallery-section">
        <div className="container">
          <div className="projects-gallery-grid">
            {filteredProjects.map((proj) => (
              <Link to={`/project/${proj.id}`} key={proj.id} className="project-gallery-card">
                <div className="project-gallery-media">
                  <img src={proj.image} alt={proj.title} className="gallery-img" />
                  <span className="gallery-tag">{proj.tag}</span>
                </div>
                <div className="project-gallery-body">
                  <span className="gallery-client">{proj.client}</span>
                  <h3 className="gallery-title">{proj.title}</h3>
                  <p className="gallery-summary">{proj.summary}</p>
                  <div className="gallery-footer">
                    <div className="gallery-metrics">
                      <span className="metric-badge">{proj.stat}</span>
                      <span className="metric-roi">{proj.roi}</span>
                    </div>
                    <span className="gallery-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './ProjectDetail.css';

const caseStudies = {
  sustainx: {
    title: 'Manufacturing Giant Achieves 65% Emission Reduction',
    client: 'Johnson Manufacturing Corp',
    location: 'Detroit, Michigan',
    tag: 'Solar + Efficiency',
    timeframe: '12 Months',
    image: '/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png',
    challenge: 'Johnson Manufacturing operated three heavy assembly plants with aging natural gas boilers and uninsulated steam lines, creating an annual carbon footprint of 43,000 metric tons and soaring peak utility bills exceeding $3.8M annually.',
    solution: 'BRICS-CLIMATY designed a phased decarbonization plan: installing a 4.2 MW rooftop and solar canopy PV system, deploying smart variable speed heat pumps for thermal processes, and integrating an IoT energy management network that auto-shifts loads during peak utility pricing windows.',
    results: [
      { metric: '65%', label: 'Total GHG Emission Reduction' },
      { metric: '$1.4M', label: 'Annual Operational Cost Savings' },
      { metric: '28,000 MT', label: 'Annual CO2 Avoided' },
      { metric: '3.2 Yrs', label: 'Full CapEx Payback' }
    ],
    testimonial: {
      quote: "BRICS-CLIMATY's engineering precision gave our executive board the confidence to execute our largest clean energy investment to date. The cost savings exceeded projections from month one.",
      author: 'Robert Sterling, VP of Plant Engineering'
    }
  },
  cleanpath: {
    title: 'Tech Campus Earns LEED Platinum Certification',
    client: 'Apex Global HQ',
    location: 'Austin, Texas',
    tag: 'Green Building',
    timeframe: '18 Months',
    image: '/assets/4NstCLeetsWI2DxicnCgTfZKL38.png',
    challenge: 'Apex Global commissioned a new 350,000 sq. ft. engineering campus with the aggressive goal of achieving LEED Platinum certification, net-zero carbon operations, and world-class indoor air quality for 2,400 employees.',
    solution: 'BRICS-CLIMATY served as the master sustainability consultant, directing dynamic thermodynamic building energy simulation, specifying ultra-low embodied carbon mass timber structural elements, integrating electrochromic smart glass, and designing a 100% on-site renewable microgrid with geothermal cooling.',
    results: [
      { metric: 'LEED', label: 'Platinum Certification' },
      { metric: '52%', label: 'Energy Use Reduction (EUI)' },
      { metric: '100%', label: 'Renewable Power Match' },
      { metric: '96%', label: 'Construction Waste Diverted' }
    ],
    testimonial: {
      quote: 'Our new headquarters has become a global benchmark for sustainable workplace design, attracting top-tier engineering talent and winning international architectural acclaim.',
      author: 'Clara Hughes, VP Workplace Environments'
    }
  },
  greenshift: {
    title: 'Renewable Microgrid Powers Fleet Charging Depot',
    client: 'Vanguard Logistics',
    location: 'Ontario, California',
    tag: 'Clean Mobility',
    timeframe: '14 Months',
    image: '/assets/S27Lb7w9Bj6JhGM4MULjLrgI1Pw.png',
    challenge: 'Vanguard Logistics committed to converting 120 heavy Class-8 diesel freight trucks to battery-electric powertrains, but faced local grid capacity bottlenecks that threatened to delay charging depot activation by three years.',
    solution: 'BRICS-CLIMATY engineered an islandable behind-the-meter microgrid featuring 3.5 MW of solar canopy arrays, an 8 MWh Tesla Megapack battery energy storage system (BESS), and intelligent depot charging software that schedules megawatt charging during low-cost solar hours.',
    results: [
      { metric: '40,000 MT', label: 'Annual Diesel CO2 Avoided' },
      { metric: '8 MWh', label: 'Battery Storage Installed' },
      { metric: '120 Trucks', label: 'Electrified & Operating' },
      { metric: '0 Min', label: 'Grid Outage Downtime' }
    ],
    testimonial: {
      quote: 'BRICS-CLIMATY solved a grid bottleneck that other consultants told us was impossible. We deployed our electric fleet two years faster than expected.',
      author: 'Marcus Vance, Director of Fleet Electrification'
    }
  }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = caseStudies[slug];

  if (!project) {
    return <Navigate to="/project" replace />;
  }

  return (
    <div className="project-detail-page">
      {/* Hero */}
      <section className="project-detail-hero">
        <div className="container">
          <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
            <span className="section-badge">
              <span className="section-number">&#123; Case Study &#125;</span>
              {project.tag}
            </span>
          </div>
          <h1 className="project-hero-title">{project.title}</h1>
          
          <div className="project-meta-row">
            <div className="meta-item">
              <span className="meta-label">Client</span>
              <span className="meta-val">{project.client}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-val">{project.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Duration</span>
              <span className="meta-val">{project.timeframe}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Banner Image */}
      <div className="container">
        <div className="project-hero-image-wrap">
          <img src={project.image} alt={project.title} className="project-hero-media" />
        </div>
      </div>

      {/* Metrics Banner */}
      <section className="section project-results-section">
        <div className="container">
          <div className="project-metrics-grid">
            {project.results.map((res, idx) => (
              <div key={idx} className="project-stat-card">
                <span className="project-stat-number">{res.metric}</span>
                <span className="project-stat-title">{res.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section project-narrative-section">
        <div className="container">
          <div className="narrative-grid">
            <div className="narrative-col challenge-col">
              <span className="narrative-tag">&#123; The Challenge &#125;</span>
              <h2 className="narrative-heading">Operational Bottlenecks & High Emissions</h2>
              <p className="narrative-text">{project.challenge}</p>
            </div>

            <div className="narrative-col solution-col">
              <span className="narrative-tag">&#123; The Solution &#125;</span>
              <h2 className="narrative-heading">Engineered Decarbonization Strategy</h2>
              <p className="narrative-text">{project.solution}</p>
            </div>
          </div>

          {/* Testimonial Quote */}
          {project.testimonial && (
            <div className="project-quote-card">
              <p className="quote-text">"{project.testimonial.quote}"</p>
              <span className="quote-author">— {project.testimonial.author}</span>
            </div>
          )}
        </div>
      </section>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

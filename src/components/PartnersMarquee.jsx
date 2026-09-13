import React from 'react';
import './PartnersMarquee.css';

export default function PartnersMarquee() {
  const logos = [
    { name: 'EcoVentures', src: '/assets/zzkg7tOwfbm9yzFCA6RGVR1PKM0.svg' },
    { name: 'TerraRenew', src: '/assets/btquB5tg2VPDHpNGoPOeUOwS8E.svg' },
    { name: 'SolarMatrix', src: '/assets/C9N699f4TPD8w8SekPsttOdlNU.svg' },
    { name: 'PureGrid', src: '/assets/fSDjTkuy7FWAFbKfafwMua99T9c.svg' },
    { name: 'VerdeTech', src: '/assets/3QlzlWUv8F9VM5QFN2mr8E3SeQ.svg' },
    { name: 'BioFlux', src: '/assets/J1x9vu6l6vX0PZPvvC7QuydC4E.svg' },
  ];

  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-title">Join 500+ companies accelerating their sustainability goals</p>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="partner-logo-item">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="partner-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

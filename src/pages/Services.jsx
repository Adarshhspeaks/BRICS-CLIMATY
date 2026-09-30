import React from 'react';
import CarbonCalculator from '../components/CarbonCalculator';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';
import './Services.css';

export default function Services() {
  return (
    <div className="services-page">
      {/* Interactive Carbon Offset & Solar ROI Calculator */}
      <CarbonCalculator />

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

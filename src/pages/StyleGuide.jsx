import React from 'react';
import { Link } from 'react-router-dom';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';

export default function StyleGuide() {
  const colorSwatches = [
    { name: 'Primary Forest', hex: '#1B4332', text: '#ffffff' },
    { name: 'Deep Emerald', hex: '#00140C', text: '#ffffff' },
    { name: 'Accent Emerald', hex: '#0B8E58', text: '#ffffff' },
    { name: 'Accent Sage', hex: '#376F58', text: '#ffffff' },
    { name: 'Accent Amber', hex: '#F5AD11', text: '#111111' },
    { name: 'Body Neutral', hex: '#F2F2F2', text: '#111111' },
    { name: 'Text Main', hex: '#111111', text: '#ffffff' },
    { name: 'Text Muted', hex: '#6C6C6C', text: '#ffffff' }
  ];

  return (
    <div className="style-guide-page" style={{ padding: '140px 0 60px' }}>
      <div className="container">
        <div className="section-badge-wrapper" style={{ justifyContent: 'center' }}>
          <span className="section-badge">
            <span className="section-number">&#123; Design Tokens &#125;</span>
            Style Guide
          </span>
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '700', textAlign: 'center', marginBottom: '16px' }}>
          BRICS-CLIMATY Design System & Style Guide
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto 60px' }}>
          Official brand colors, typography hierarchy, UI components, button variants, and design patterns.
        </p>

        {/* Color Palette */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Color Palette</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {colorSwatches.map((c, i) => (
              <div key={i} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-card)', overflow: 'hidden' }}>
                <div style={{ background: c.hex, height: '100px', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
                  <span style={{ color: c.text, fontWeight: '700', fontSize: '13px' }}>{c.hex}</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600' }}>{c.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Typography (Inter)</h2>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: '20px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Heading 1 (58px Bold)</span>
              <h1 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '4px' }}>Build a Greener Tomorrow</h1>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Heading 2 (36px Semi-Bold)</span>
              <h2 style={{ fontSize: '32px', fontWeight: '600', letterSpacing: '-0.02em', marginTop: '4px' }}>Comprehensive Sustainability Solutions</h2>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Body Text (16px Regular)</span>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '4px', maxWidth: '700px' }}>
                Leading sustainability consultants helping businesses reduce carbon emissions, save costs, and create lasting environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Interactive Buttons</h2>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: '20px', padding: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn btn-primary">Primary Button</Link>
            <Link to="/service" className="btn btn-secondary">Secondary Button</Link>
            <Link to="/contact" className="btn btn-primary btn-sm">Small Button</Link>
            <Link to="/contact" className="btn btn-primary btn-lg">Large Button</Link>
          </div>
        </section>
      </div>

      <ReadyCTA />
      <NewsletterCTA />
    </div>
  );
}

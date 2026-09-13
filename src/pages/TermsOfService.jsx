import React from 'react';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';

export default function TermsOfService() {
  return (
    <div className="legal-page" style={{ padding: '140px 0 60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-badge-wrapper">
          <span className="section-badge">
            <span className="section-number">&#123; Legal &#125;</span>
            Terms of Service
          </span>
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '24px', lineHeight: '1.2' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px' }}>
          Last Updated: September 2026
        </p>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>1. Engagement of Services</h2>
          <p>
            By accessing or engaging BRICS-CLIMATY for sustainability advisory, carbon accounting, LEED consulting, or solar installations, you agree to comply with and be bound by these Terms of Service.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>2. Scope of Advisory</h2>
          <p>
            BRICS-CLIMATY delivers strategic recommendations, energy modeling, and engineering designs based on client-provided operational data. Actual financial returns and energy reductions depend on facility operations, utility rate tariffs, and weather conditions.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>3. Intellectual Property</h2>
          <p>
            All custom methodologies, proprietary calculation models, and software deliverables provided by BRICS-CLIMATY remain the intellectual property of BRICS-CLIMATY unless otherwise specified in an active statement of work.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>4. Inquiries & Legal Notices</h2>
          <p>
            Please direct legal inquiries to <a href="mailto:legal@brics-climaty.com" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>legal@brics-climaty.com</a>.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <ReadyCTA />
        <NewsletterCTA />
      </div>
    </div>
  );
}

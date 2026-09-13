import React from 'react';
import ReadyCTA from '../components/ReadyCTA';
import NewsletterCTA from '../components/NewsletterCTA';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page" style={{ padding: '140px 0 60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-badge-wrapper">
          <span className="section-badge">
            <span className="section-number">&#123; Legal &#125;</span>
            Privacy Policy
          </span>
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '24px', lineHeight: '1.2' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px' }}>
          Last Updated: September 2026
        </p>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>1. Information We Collect</h2>
          <p>
            At BRICS-CLIMATY, we collect information you provide directly to us when requesting a carbon audit, scheduling a consultation, or subscribing to our sustainability newsletter. This includes your name, corporate email address, company name, and facility operational metrics.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>2. How We Use Your Data</h2>
          <p>
            We use collected data solely to deliver energy feasibility analyses, calculate preliminary carbon emissions baselines, formulate decarbonization roadmaps, and communicate important ESG updates.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>3. Confidentiality & Security</h2>
          <p>
            All client utility records, facility interval meter data, and emissions inventories are treated as strictly confidential proprietary information. We implement enterprise-grade encryption and will never sell your information to third parties.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>4. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or your data rights, please email us at <a href="mailto:privacy@brics-climaty.com" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>privacy@brics-climaty.com</a>.
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

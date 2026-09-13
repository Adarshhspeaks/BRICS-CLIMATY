import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 20px 80px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '72px', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1', marginBottom: '16px' }}>404</span>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
          The page you are looking for might have been moved, renamed, or doesn't exist. Let's get you back on track toward sustainability.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

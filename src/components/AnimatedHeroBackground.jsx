import React, { useState } from 'react';
import './AnimatedHeroBackground.css';

export default function AnimatedHeroBackground() {
  const [videoError, setVideoError] = useState(false);

  // Turbines coordinates mapped relative to the background image
  const turbines = [
    // 1. Prominent Large Foreground Turbine (Right)
    { id: 't-fg-right', x: 71.4, y: 30.8, size: 360, duration: 6.8, delay: 0, opacity: 0.95 },
    
    // 2. Middle Riverbank Turbine (Left)
    { id: 't-mid-left', x: 25.5, y: 29.5, size: 160, duration: 8.2, delay: -2.3, opacity: 0.9 },
    
    // 3. Second Riverbank Turbine (Further Left)
    { id: 't-far-left-1', x: 14.6, y: 30.5, size: 110, duration: 9.4, delay: -4.1, opacity: 0.85 },
    
    // 4. Distant Leftmost Turbine
    { id: 't-far-left-2', x: 10.1, y: 33.2, size: 85, duration: 10.6, delay: -1.7, opacity: 0.8 },
    
    // 5. Far Distant Background Turbines across the field
    { id: 't-dist-1', x: 31.8, y: 32.2, size: 70, duration: 11.2, delay: -3.5, opacity: 0.75 },
    { id: 't-dist-2', x: 41.2, y: 33.1, size: 60, duration: 12.0, delay: -5.8, opacity: 0.7 },
    { id: 't-dist-3', x: 51.8, y: 33.6, size: 72, duration: 10.8, delay: -2.9, opacity: 0.75 },
    { id: 't-dist-4', x: 59.2, y: 34.0, size: 55, duration: 12.5, delay: -7.1, opacity: 0.65 },
    { id: 't-dist-5', x: 65.5, y: 34.4, size: 60, duration: 11.8, delay: -1.2, opacity: 0.65 },
    { id: 't-dist-6', x: 88.2, y: 30.8, size: 120, duration: 8.8, delay: -3.3, opacity: 0.85 },
  ];

  return (
    <div className="animated-hero-bg-wrapper">
      {/* 1. Direct HTML5 Video Background (plays if hero-windmills.mp4 or hero-video.mp4 is available) */}
      {!videoError && (
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/hero-windmills.mp4" type="video/mp4" />
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* 2. Base High-Resolution Landscape Image */}
      <img
        src="/assets/ibAgROfpxJ6EiOkukBxvK41iIA.png"
        alt="Renewable wind energy landscape"
        className="hero-landscape-img"
      />

      {/* 3. Smooth Rotating Windmill Blades System */}
      <div className="turbines-overlay-container">
        {turbines.map((t) => (
          <div
            key={t.id}
            className="turbine-hub-anchor"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: `${t.size}px`,
              height: `${t.size}px`,
              opacity: t.opacity,
            }}
          >
            <svg
              className="turbine-rotor-svg"
              viewBox="-100 -100 200 200"
              style={{
                animationDuration: `${t.duration}s`,
                animationDelay: `${t.delay}s`,
              }}
            >
              <defs>
                <linearGradient id={`blade-grad-${t.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                  <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.75" />
                </linearGradient>
                <filter id={`shadow-${t.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#00140c" floodOpacity="0.25" />
                </filter>
              </defs>

              <g filter={`url(#shadow-${t.id})`}>
                {/* Blade 1 (0 deg - Top) */}
                <path
                  d="M -3,0 Q -4,-45 -1,-85 Q 0,-92 2,-92 Q 4,-85 3,-45 Q 2,-10 3,0 Z"
                  fill={`url(#blade-grad-${t.id})`}
                />

                {/* Blade 2 (120 deg - Bottom Right) */}
                <g transform="rotate(120)">
                  <path
                    d="M -3,0 Q -4,-45 -1,-85 Q 0,-92 2,-92 Q 4,-85 3,-45 Q 2,-10 3,0 Z"
                    fill={`url(#blade-grad-${t.id})`}
                  />
                </g>

                {/* Blade 3 (240 deg - Bottom Left) */}
                <g transform="rotate(240)">
                  <path
                    d="M -3,0 Q -4,-45 -1,-85 Q 0,-92 2,-92 Q 4,-85 3,-45 Q 2,-10 3,0 Z"
                    fill={`url(#blade-grad-${t.id})`}
                  />
                </g>

                {/* Central Hub Cap */}
                <circle cx="0" cy="0" r="5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      {/* 4. Ambient Sunlight Rays & Gentle Water Shimmer */}
      <div className="ambient-sunlight-sweep"></div>
      <div className="river-mist-glow"></div>

      {/* 5. Much Lighter, Sunlit Warm Emerald-Gold Atmospheric Overlay */}
      <div className="hero-lighter-tone-overlay"></div>
    </div>
  );
}

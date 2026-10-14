import React from 'react';

interface BrandMarkProps {
  variant?: 'full' | 'compact' | 'monogram' | 'crest-vertical';
  subtitle?: string;
  secondarySubtitle?: string;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'full',
  subtitle = 'FRENCH FINE DINING',
  secondarySubtitle,
  className = ''
}) => {
  // Vector Ornate Crest with intertwined M & E monogram
  const crestSvg = (size: number) => (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 64 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, overflow: 'visible' }}
    >
      {/* Outer subtle glow */}
      <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <g filter="url(#crestGlow)">
        {/* Main Ornate Oval Frame */}
        <ellipse cx="32" cy="38" rx="19" ry="25" stroke="#C8A878" strokeWidth="1" strokeOpacity="0.85" />
        <ellipse cx="32" cy="38" rx="17" ry="23" stroke="#E8DFD0" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1.5 2" />

        {/* Side flourish scrolls - Left */}
        <path
          d="M13 38 C9 35 6 38 9 41 C11 43 14 41 13 38 M13 35 C10 30 7 32 10 34"
          stroke="#C8A878"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Side flourish scrolls - Right */}
        <path
          d="M51 38 C55 35 58 38 55 41 C53 43 50 41 51 38 M51 35 C54 30 57 32 54 34"
          stroke="#C8A878"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top 8-pointed gold star (L'Étoile) */}
        <g transform="translate(32, 10)">
          <path d="M0 -7 L1.5 -2 L6.5 0 L1.5 2 L0 7 L-1.5 2 L-6.5 0 L-1.5 -2 Z" fill="#C8A878" />
          <path d="M0 -4.5 L1 -1.5 L4.5 0 L1 1.5 L0 4.5 L-1 1.5 L-4.5 0 L-1 -1.5 Z" fill="#E8DFD0" opacity="0.9" transform="rotate(45)" />
          <circle cx="0" cy="0" r="1" fill="#101827" stroke="#C8A878" strokeWidth="0.5" />
        </g>

        {/* Bottom Fleur-de-lis motif */}
        <g transform="translate(32, 65)">
          <path
            d="M0 -4 C1.2 -2.5 2 -1 2 0 C2 1.5 0.8 2.2 0 2.2 C-0.8 2.2 -2 1.5 -2 0 C-2 -1 -1.2 -2.5 0 -4 Z"
            fill="#C8A878"
          />
          <path
            d="M-0.5 -1 C-2 -2 -3.5 -1.5 -3.5 0 C-3.5 1.2 -2 1.8 -0.8 1 M0.5 -1 C2 -2 3.5 -1.5 3.5 0 C3.5 1.2 2 1.8 0.8 1"
            stroke="#C8A878"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <line x1="-3" y1="1.5" x2="3" y2="1.5" stroke="#C8A878" strokeWidth="0.6" />
        </g>

        {/* Intertwined Monogram "M" & "E" */}
        {/* Letter M */}
        <path
          d="M24 46 L24 30 L29.5 40 L35 30 L35 46"
          stroke="#C8A878"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Letter E interwoven */}
        <path
          d="M28 32 H37 M28 38 H34.5 M28 44 H37"
          stroke="#E8DFD0"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />
      </g>
    </svg>
  );

  if (variant === 'crest-vertical') {
    return (
      <div className={`brand-mark brand-mark-vertical ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {crestSvg(56)}
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: 'var(--color-ivory)',
            textTransform: 'uppercase',
            marginTop: '0.75rem'
          }}
        >
          Maison Étoile
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'var(--color-gold)',
              marginTop: '0.25rem',
              letterSpacing: '0.04em'
            }}
          >
            {subtitle}
          </span>
        )}
        {secondarySubtitle && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '160px', margin: '0.65rem 0' }}>
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-gold-border))' }} />
              <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem' }}>⚜</span>
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--color-gold-border), transparent)' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--color-ivory-dim)',
                letterSpacing: '0.05em'
              }}
            >
              {secondarySubtitle}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`brand-mark ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}>
      {crestSvg(variant === 'compact' ? 32 : 40)}

      {variant !== 'monogram' && (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: variant === 'compact' ? '1.25rem' : '1.5rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'var(--color-ivory)',
              textTransform: 'uppercase'
            }}
          >
            Maison Étoile
          </span>
          {subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                marginTop: '3px'
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

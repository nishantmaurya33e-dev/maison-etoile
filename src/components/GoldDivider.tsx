import React from 'react';

interface GoldDividerProps {
  ornament?: 'star' | 'fleur' | 'diamond' | 'none';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  ornament = 'star',
  className = '',
  spacing = 'md'
}) => {
  const marginMap = {
    sm: 'var(--space-8) 0',
    md: 'var(--space-12) 0',
    lg: 'var(--space-16) 0'
  };

  return (
    <div
      className={`gold-divider-container ${className}`}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: marginMap[spacing],
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Left Hairline Gradient */}
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(200, 168, 120, 0.45))'
        }}
      />

      {/* Center Ornament */}
      {ornament !== 'none' && (
        <div
          style={{
            padding: '0 1.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gold)'
          }}
        >
          {ornament === 'star' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L13.8 8.8 L20.5 12 L13.8 15.2 L12 22 L10.2 15.2 L3.5 12 L10.2 8.8 Z"
                fill="#C8A878"
              />
              <circle cx="12" cy="12" r="1.5" fill="#101827" stroke="#C8A878" strokeWidth="0.8" />
            </svg>
          )}

          {ornament === 'fleur' && (
            <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>⚜</span>
          )}

          {ornament === 'diamond' && (
            <span style={{ fontSize: '0.65rem', lineHeight: 1 }}>✦</span>
          )}
        </div>
      )}

      {/* Right Hairline Gradient */}
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(200, 168, 120, 0.45), transparent)'
        }}
      />
    </div>
  );
};

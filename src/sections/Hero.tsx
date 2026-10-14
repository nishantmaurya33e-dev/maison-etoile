import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
  onWatchStory?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onReserveTable,
  onWatchStory
}) => {
  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Introduction Maison Étoile"
    >
      {/* Edge-to-Edge Full-Bleed Cinematic Hero Image Layer */}
      <div className="hero-bg-container" aria-hidden="true">
        <img
          src="/images/hero/hero-cinematic.jpg"
          alt="Haute gastronomie française à Maison Étoile"
          className="hero-full-bg-image"
          loading="eager"
        />
        {/* Layered dark atmospheric overlays for luxury depth and text contrast */}
        <div className="hero-overlay-gradient" />
        <div className="hero-overlay-radial" />
      </div>

      {/* Foreground Content Layer */}
      <div className="container-wide hero-content-layer">
        <div className="hero-text-content">
          {/* French Tagline Badge - Rise on Load */}
          <div className="hero-badge hero-anim-badge">
            <span className="badge-bullet" aria-hidden="true">✦</span>
            <span>A TASTE OF FRANCE</span>
          </div>

          {/* Main Headline - Luxury Reveal Animation */}
          <h1 className="hero-title hero-anim-headline">
            EXQUISITE CUISINE,
            <br />
            <span className="gold-accent-text">TIMELESS MOMENTS</span>
          </h1>

          {/* Supporting Editorial Copy - Rise Animation */}
          <p className="hero-subtext hero-anim-subtext">
            At Maison Étoile, we bring the soul of French gastronomy to your table — where every dish tells a story of passion, heritage, and poetic artistry.
          </p>

          {/* CTA Buttons - Staggered Rise Animations */}
          <div className="hero-actions">
            {/* Signature Glass Capsule Primary CTA */}
            <button
              type="button"
              onClick={onExploreMenu}
              className="btn-glass-primary hero-btn-primary hero-anim-primary-cta"
              aria-label="Explorer la carte du restaurant"
            >
              <span>EXPLORE THE MENU</span>
              <ArrowRight size={16} aria-hidden="true" style={{ color: 'var(--color-gold)' }} />
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={onWatchStory || onReserveTable}
              className="btn-secondary hero-btn-secondary hero-anim-secondary-cta"
              aria-label="Découvrir notre histoire en vidéo ou réserver"
            >
              <Play size={14} aria-hidden="true" style={{ fill: 'currentColor', opacity: 0.8 }} />
              <span>WATCH OUR STORY</span>
            </button>
          </div>

          {/* Trust & Heritage Micro-Badges - Rise Animation */}
          <div className="hero-meta hero-anim-meta">
            <div className="meta-item">
              <span className="meta-number">1889</span>
              <span className="meta-label">Parisian Heritage</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-item">
              <span className="meta-number">100%</span>
              <span className="meta-label">Seasonal Terroir</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-item">
              <span className="meta-number">700+</span>
              <span className="meta-label">Grand Cru Cellar</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-text-content {
          max-width: 780px;
          text-align: left;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: var(--color-gold);
          margin-bottom: 1.5rem;
          padding: 0.4rem 0.95rem;
          background: rgba(16, 24, 39, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(200, 168, 120, 0.35);
          border-radius: var(--radius-pill);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .badge-bullet {
          font-size: 0.7rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.4rem);
          line-height: 1.1;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
        }

        .gold-accent-text {
          color: var(--color-gold);
          font-style: italic;
          font-family: var(--font-serif);
        }

        .hero-subtext {
          font-size: clamp(1rem, 1.3vw, 1.18rem);
          color: var(--color-ivory);
          max-width: 580px;
          margin-bottom: 2.75rem;
          font-weight: 300;
          line-height: 1.8;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.35rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(232, 223, 208, 0.18);
          max-width: 520px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-number {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--color-gold);
          font-weight: 600;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .meta-label {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-ivory-dim);
        }

        .meta-divider {
          width: 1px;
          height: 28px;
          background: rgba(232, 223, 208, 0.2);
        }

        @media (max-width: 768px) {
          .hero-text-content {
            text-align: center;
            margin: 0 auto;
          }
          .hero-subtext {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-meta {
            justify-content: center;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Play, Compass } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

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
          src={getAssetUrl('images/hero/hero-cinematic.jpg')}
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

            {/* Scroll World Immersive Experience CTA */}
            <a
              href="./world.html"
              className="btn-secondary hero-btn-secondary hero-btn-world hero-anim-secondary-cta"
              aria-label="Voler à travers le monde Maison Étoile (Scroll World)"
            >
              <Compass size={14} aria-hidden="true" style={{ color: 'var(--color-gold)' }} />
              <span>VOYAGE IMMERSIF 3D</span>
              <span className="hero-world-badge" aria-hidden="true">✦</span>
            </a>
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
        {/* Subtle Ambient Candlelight Sparkle Motes */}
        <div className="hero-sparkles-layer" aria-hidden="true">
          <span className="sparkle-mote s1">✦</span>
          <span className="sparkle-mote s2">✦</span>
          <span className="sparkle-mote s3">✦</span>
          <span className="sparkle-mote s4">✦</span>
        </div>
      </div>

      <style>{`
        .hero-sparkles-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          overflow: hidden;
        }

        .sparkle-mote {
          position: absolute;
          color: var(--color-gold);
          font-size: 0.85rem;
          opacity: 0.35;
          animation: stardustTwinkle 6s ease-in-out infinite;
        }

        .s1 { top: 20%; left: 15%; animation-delay: 0s; font-size: 0.75rem; }
        .s2 { top: 35%; right: 18%; animation-delay: 2s; font-size: 0.95rem; }
        .s3 { bottom: 25%; left: 28%; animation-delay: 4s; font-size: 0.65rem; }
        .s4 { top: 65%; right: 24%; animation-delay: 1.5s; font-size: 0.8rem; }

        @keyframes stardustTwinkle {
          0%, 100% { opacity: 0.2; transform: translateY(0) scale(0.9); }
          50% { opacity: 0.8; transform: translateY(-10px) scale(1.15); }
        }

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
          font-size: clamp(2.1rem, 5.8vw, 4.4rem);
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
          font-size: clamp(0.95rem, 1.25vw, 1.18rem);
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

        .hero-btn-world {
          border-color: rgba(200, 168, 120, 0.45) !important;
          background: rgba(200, 168, 120, 0.08) !important;
          gap: 0.55rem;
          text-decoration: none;
        }

        .hero-btn-world:hover {
          background: rgba(200, 168, 120, 0.22) !important;
          border-color: #E0C69B !important;
          box-shadow: 0 0 25px rgba(200, 168, 120, 0.45) !important;
          transform: translateY(-2px);
        }

        .hero-world-badge {
          color: var(--color-gold);
          font-size: 0.8rem;
          margin-left: 2px;
          animation: badgePulse 2.5s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .hero-meta {
          display: inline-flex;
          align-items: center;
          gap: 1.75rem;
          padding: 0.95rem 1.85rem;
          background: linear-gradient(135deg, rgba(23, 36, 59, 0.62) 0%, rgba(16, 24, 39, 0.78) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(200, 168, 120, 0.35);
          border-radius: var(--radius-pill);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(232, 223, 208, 0.15);
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
          background: rgba(200, 168, 120, 0.3);
        }

        @media (max-width: 768px) {
          .hero-text-content {
            text-align: center;
            margin: 0 auto;
          }
          .hero-subtext {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2rem;
          }
          .hero-actions {
            justify-content: center;
            margin-bottom: 2.5rem;
          }
          .hero-meta {
            margin: 0 auto;
          }
        }

        @media (max-width: 580px) {
          .hero-meta {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.35rem;
            padding: 0.85rem 0.5rem;
            width: 100%;
            max-width: 360px;
            border-radius: 14px;
            box-sizing: border-box;
          }
          .meta-divider {
            display: none;
          }
          .meta-item {
            text-align: center;
          }
          .meta-number {
            font-size: 1.2rem;
          }
          .meta-label {
            font-size: 0.5625rem;
            letter-spacing: 0.08em;
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

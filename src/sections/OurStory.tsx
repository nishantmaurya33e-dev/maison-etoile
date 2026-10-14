import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface OurStoryProps {
  onDiscoverMore?: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onDiscoverMore }) => {
  return (
    <section id="our-story" className="section" aria-label="Notre Histoire et Philosophie">
      <div className="container">
        <div className="story-grid">
          {/* Left Column: Visual framing with Rise Animation */}
          <div className="story-visual reveal-on-scroll stagger-2">
            <div className="story-frame">
              <div className="story-inner-border" aria-hidden="true" />
              <img
                src="/images/story/story-interior.jpg"
                alt="Intérieur raffiné de la salle de réception Maison Étoile à Paris, lustres de cristal et vue sur la Seine"
                className="story-image"
                loading="lazy"
              />
              <div className="story-caption-overlay">
                <span className="caption-year">DEPUIS LE CŒUR DE PARIS</span>
                <span className="caption-text">Une élégance intemporelle sous la lueur des lustres de cristal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy with Reveal & Rise Animations */}
          <div className="story-content">
            <div className="section-label reveal-on-scroll" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              OUR STORY
            </div>

            <h2 className="story-title reveal-on-scroll stagger-1">
              A LEGACY OF FRENCH
              <br />
              <span className="gold-accent-text">CULINARY ART</span>
            </h2>

            <p className="story-lead reveal-on-scroll stagger-2">
              Maison Étoile was born from a simple belief — that dining is not just about food, but about emotion, connection and beauty. Inspired by the timeless charm of Paris, we create an experience that lingers long after the last bite.
            </p>

            <p className="story-body reveal-on-scroll stagger-3">
              Chaque soir, notre brigade réinterprète les grands classiques du patrimoine gastronomique français. Des produits nobles issus de terroirs d’exception, travaillés avec humilité et précision. Ici, le geste culinaire rencontre l’art de recevoir pour offrir un moment suspendu hors du temps.
            </p>

            <div className="story-highlights reveal-on-scroll stagger-4">
              <div className="highlight-card">
                <Compass className="highlight-icon" size={20} aria-hidden="true" />
                <div>
                  <h3 className="highlight-title">Artisanat & Terroirs</h3>
                  <p className="highlight-desc">Partenariats directs avec des maraîchers, éleveurs et vignerons d’exception.</p>
                </div>
              </div>
              <div className="highlight-card">
                <span className="highlight-icon star-icon" aria-hidden="true">✦</span>
                <div>
                  <h3 className="highlight-title">Ambiance Feutrée</h3>
                  <p className="highlight-desc">Lumière tamisée à la bougie, acoustique délicate et service attentionné.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }} className="reveal-on-scroll stagger-5">
              <a
                href="#experience"
                onClick={(e) => {
                  if (onDiscoverMore) {
                    e.preventDefault();
                    onDiscoverMore();
                  }
                }}
                className="btn-glass-primary"
                style={{ minWidth: '210px' }}
              >
                <span>DISCOVER MORE</span>
                <ArrowRight size={16} aria-hidden="true" style={{ color: 'var(--color-gold)' }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 4.5rem;
          align-items: center;
        }

        .story-visual {
          position: relative;
        }

        .story-frame {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(200, 168, 120, 0.35);
        }

        .story-inner-border {
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(232, 223, 208, 0.2);
          pointer-events: none;
          z-index: 2;
          border-radius: 6px;
        }

        .story-image {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .story-frame:hover .story-image {
          transform: scale(1.03);
        }

        .story-caption-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(16, 24, 39, 0.95) 0%, rgba(16, 24, 39, 0.6) 60%, transparent 100%);
          padding: 2.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          z-index: 3;
        }

        .caption-year {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: var(--color-gold);
          text-transform: uppercase;
        }

        .caption-text {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-style: italic;
          color: var(--color-ivory);
        }

        .story-title {
          font-size: clamp(2rem, 3.2vw, 3rem);
          margin-bottom: 1.5rem;
          line-height: 1.15;
          text-transform: uppercase;
        }

        .story-lead {
          font-size: 1.125rem;
          color: var(--color-ivory);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-weight: 300;
        }

        .story-body {
          font-size: 0.9375rem;
          color: var(--color-ivory-dim);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .story-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          border-top: 1px solid rgba(232, 223, 208, 0.1);
          padding-top: 1.75rem;
        }

        .highlight-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .highlight-icon {
          color: var(--color-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .star-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .highlight-title {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-ivory);
          margin-bottom: 0.35rem;
        }

        .highlight-desc {
          font-size: 0.8125rem;
          color: var(--color-silver);
          line-height: 1.55;
        }

        @media (max-width: 991px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .story-content {
            text-align: left;
          }
        }

        @media (max-width: 580px) {
          .story-highlights {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

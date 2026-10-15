import React, { useState } from 'react';
import { Utensils, Wine, Crown, ArrowRight, X } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const DiningExperience: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const pillars = [
    {
      id: 'fine-dining',
      icon: Utensils,
      title: 'FINE DINING',
      subtitle: 'Haute Gastronomie Étoilée',
      description: 'Meticulously crafted dishes, using the finest seasonal French ingredients sourced from artisan purveyors.',
      modalDetail: 'Notre brigade menée par un chef d’exception conçoit chaque menu comme un hommage vivant à l’art culinaire français. Les cuissons millimétrées, les réductions savamment concentrées et le respect absolu de la saisonnalité garantissent une symphonie gustative inoubliable.'
    },
    {
      id: 'wine-pairing',
      icon: Wine,
      title: 'WINE & PAIRING',
      subtitle: 'Cave des Grands Crus',
      description: 'A curated selection of world-class wines, perfectly paired with each course to elevate every note.',
      modalDetail: 'Avec plus de 700 références issues des plus grands domaines viticoles (Bordeaux Premiers Crus, Bourgogne Grands Crus, cuvées rares de Champagne), notre chef sommelier compose des accords sur mesure en harmonie avec chaque assiette.'
    },
    {
      id: 'private-dining',
      icon: Crown,
      title: 'PRIVATE DINING',
      subtitle: 'Salons Particuliers & Réceptions',
      description: 'Exclusive spaces for intimate gatherings, confidential business dinners, and romantic celebrations.',
      modalDetail: 'Pour vos réceptions privées, notre Salon Étoile et notre Alcôve Napoléonienne accueillent de 4 à 24 convives dans une confidentialité absolue, avec un maître d’hôtel dédié et un menu d’exception personnalisé selon vos souhaits.'
    }
  ];

  return (
    <section id="experience" className="section" aria-label="Expérience Gastronomique Maison Étoile">
      <div className="container-wide">
        <div className="experience-layout">
          {/* Left Visual Composition */}
          <div className="experience-image-card reveal-on-scroll">
            <div className="experience-image-inner">
              <img
                src={getAssetUrl('images/story/story-interior.jpg')}
                alt="Ambiance féerique du restaurant Maison Étoile illuminé aux chandelles"
                className="exp-img"
                loading="lazy"
              />
              <div className="exp-overlay">
                <span className="exp-pill">ÉLÉGANCE PARISIENNE</span>
                <p className="exp-quote">« La table est le lieu sacré où le goût s’élève en art de vivre. »</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Section */}
          <div className="experience-text-content">
            <div className="section-label reveal-on-scroll stagger-1" style={{ textAlign: 'left', marginBottom: '0.85rem' }}>
              DINING EXPERIENCE
            </div>

            <h2 className="experience-heading reveal-on-scroll stagger-2">
              AN UNFORGETTABLE
              <br />
              <span className="gold-accent-text">CULINARY JOURNEY</span>
            </h2>

            <p className="experience-intro reveal-on-scroll stagger-3">
              Every detail at Maison Étoile is designed to elevate your experience — from the first sip of vintage champagne to the last delicate mignardise. Discover what makes dining with us truly unique.
            </p>

            {/* 3 Pillars Columns */}
            <div className="pillars-grid">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.id} className={`pillar-item reveal-on-scroll stagger-${idx + 4}`}>
                    <div className="pillar-icon-box">
                      <IconComponent size={20} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    </div>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.description}</p>
                    <button
                      type="button"
                      onClick={() => setActiveModal(pillar.id)}
                      className="pillar-link"
                      aria-label={`En savoir plus sur ${pillar.title}`}
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="pillar-modal-overlay"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="pillar-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveModal(null)}
              aria-label="Fermer la fenêtre d'information"
            >
              <X size={18} />
            </button>
            {pillars
              .filter((p) => p.id === activeModal)
              .map((p) => (
                <div key={p.id}>
                  <div className="section-label" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    {p.subtitle}
                  </div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-ivory)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-ivory-dim)', marginBottom: '1.5rem' }}>
                    {p.modalDetail}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-glass-primary"
                      style={{ minWidth: '180px', height: '46px' }}
                    >
                      RÉSERVER CE SERVICE
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="btn-secondary"
                      style={{ height: '46px', padding: '0 1.5rem' }}
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <style>{`
        .experience-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .experience-image-card {
          position: relative;
        }

        .experience-image-inner {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(200, 168, 120, 0.35);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
        }

        .exp-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
        }

        .exp-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(16, 24, 39, 0.92) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.75rem;
        }

        .exp-pill {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          letter-spacing: 0.22em;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .exp-quote {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-style: italic;
          color: var(--color-ivory);
          line-height: 1.45;
        }

        .experience-heading {
          font-size: clamp(2rem, 3.2vw, 3rem);
          margin-bottom: 1.25rem;
          line-height: 1.15;
          text-transform: uppercase;
        }

        .experience-intro {
          font-size: 1rem;
          color: var(--color-ivory-dim);
          line-height: 1.75;
          margin-bottom: 2.5rem;
          max-width: 640px;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(232, 223, 208, 0.12);
        }

        .pillar-item {
          display: flex;
          flex-direction: column;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.6);
          border: 1px solid rgba(200, 168, 120, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .pillar-title {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-ivory);
          margin-bottom: 0.5rem;
        }

        .pillar-desc {
          font-size: 0.8125rem;
          color: var(--color-silver);
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .pillar-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold);
          transition: gap var(--transition-fast), color var(--transition-fast);
        }

        .pillar-link:hover {
          gap: 0.65rem;
          color: #FFFFFF;
        }

        .pillar-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16, 24, 39, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .pillar-modal-card {
          background: #17243B;
          border: 1px solid var(--color-gold);
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 520px;
          width: 100%;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          color: var(--color-silver);
          padding: 4px;
        }

        .modal-close-btn:hover {
          color: #FFFFFF;
        }

        @media (max-width: 991px) {
          .experience-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

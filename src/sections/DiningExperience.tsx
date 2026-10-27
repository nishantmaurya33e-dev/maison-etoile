import React, { useState } from 'react';
import { Utensils, Wine, Crown, ArrowRight, X, Compass, Sparkles } from 'lucide-react';
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

        {/* Scroll World Immersive Showcase Card */}
        <div className="world-experience-card reveal-on-scroll stagger-5">
          <div className="world-card-glow" aria-hidden="true" />
          <div className="world-card-content">
            <div className="world-card-text">
              <span className="world-card-eyebrow">
                <Sparkles size={13} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                <span>EXPÉRIENCE CULINAIRE IMMERSIVE • SCROLL WORLD</span>
              </span>
              <h3 className="world-card-title">Survolez le Monde de Maison Étoile</h3>
              <p className="world-card-description">
                Plongez dans un vol cinématographique continu où chaque défilement guide la caméra à travers nos salons de réception, l’atelier secret du chef, la cave des 700 grands crus et notre table d’exception.
              </p>
            </div>
            <div className="world-card-action">
              <a
                href="./world.html"
                className="btn-glass-primary world-cta-btn"
                aria-label="Lancer le voyage immersif 3D Scroll World"
              >
                <Compass size={15} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                <span>LANCER LE VOYAGE 3D</span>
                <ArrowRight size={15} aria-hidden="true" style={{ color: 'var(--color-gold)' }} />
              </a>
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
          grid-template-columns: 0.85fr 1.15fr;
          gap: 4rem;
          align-items: center;
        }

        .experience-image-card {
          position: relative;
        }

        .experience-image-inner {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(200, 168, 120, 0.35);
          box-shadow: 0 25px 55px rgba(0, 0, 0, 0.7), 0 0 30px rgba(200, 168, 120, 0.12);
        }

        .exp-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .experience-image-card:hover .exp-img {
          transform: scale(1.04);
        }

        .exp-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(16, 24, 39, 0.92) 100%);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
        }

        .exp-pill {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .exp-quote {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--color-ivory);
          line-height: 1.5;
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
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 640px;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(200, 168, 120, 0.2);
        }

        .pillar-item {
          display: flex;
          flex-direction: column;
          background: linear-gradient(145deg, rgba(23, 36, 59, 0.65) 0%, rgba(16, 24, 39, 0.8) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(200, 168, 120, 0.22);
          border-radius: 14px;
          padding: 1.75rem 1.35rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(232, 223, 208, 0.1);
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        .pillar-item:hover {
          transform: translateY(-5px);
          border-color: rgba(200, 168, 120, 0.55);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65), 0 0 24px rgba(200, 168, 120, 0.2);
        }

        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(200, 168, 120, 0.18) 0%, rgba(23, 36, 59, 0.85) 100%);
          border: 1px solid rgba(200, 168, 120, 0.38);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.15rem;
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .pillar-item:hover .pillar-icon-box {
          transform: scale(1.08);
          border-color: var(--color-gold);
        }

        .pillar-title {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-ivory);
          margin-bottom: 0.5rem;
        }

        .pillar-desc {
          font-size: 0.8125rem;
          color: var(--color-silver);
          line-height: 1.65;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .pillar-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          background: rgba(200, 168, 120, 0.08);
          border: 1px solid rgba(200, 168, 120, 0.25);
          border-radius: 20px;
          padding: 0.45rem 0.95rem;
          align-self: flex-start;
          transition: all var(--transition-fast);
        }

        .pillar-link:hover {
          gap: 0.7rem;
          background: var(--color-gold);
          color: #101827;
          border-color: var(--color-gold);
          box-shadow: 0 4px 14px rgba(200, 168, 120, 0.35);
        }

        .pillar-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 25, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: subtleFadeIn 0.3s ease;
        }

        .pillar-modal-card {
          background: linear-gradient(165deg, rgba(23, 36, 59, 0.92) 0%, rgba(16, 24, 39, 0.96) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--color-gold);
          border-radius: 16px;
          padding: 2.75rem;
          max-width: 540px;
          width: 100%;
          position: relative;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 30px rgba(200, 168, 120, 0.2);
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.7);
          border: 1px solid rgba(200, 168, 120, 0.3);
          color: var(--color-silver);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: #FFFFFF;
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.2);
        }

        /* World Experience Card (Scroll World) */
        .world-experience-card {
          margin-top: 3.5rem;
          position: relative;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(23, 36, 59, 0.75) 0%, rgba(16, 24, 39, 0.9) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(200, 168, 120, 0.4);
          padding: 2.25rem 2.5rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(200, 168, 120, 0.12);
          overflow: hidden;
        }

        .world-card-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 168, 120, 0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        .world-card-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .world-card-text {
          max-width: 680px;
        }

        .world-card-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .world-card-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          color: var(--color-ivory);
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-bottom: 0.65rem;
        }

        .world-card-description {
          font-size: 0.875rem;
          color: var(--color-silver);
          line-height: 1.7;
          margin: 0;
        }

        .world-card-action {
          flex-shrink: 0;
        }

        .world-cta-btn {
          height: 48px;
          padding: 0 1.65rem;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-decoration: none;
          gap: 0.6rem;
        }

        @media (max-width: 991px) {
          .world-card-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .world-experience-card {
            padding: 1.85rem 1.5rem;
            margin-top: 2.5rem;
          }
          .world-card-action {
            width: 100%;
          }
          .world-cta-btn {
            width: 100%;
            justify-content: center;
          }
          .experience-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 600px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .pillar-item {
            padding: 1.5rem;
          }
          .pillar-modal-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

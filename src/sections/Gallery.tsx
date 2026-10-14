import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => ((prev! + 1) % GALLERY_ITEMS.length));
    }
  }, [activeItemIndex]);

  const handlePrev = useCallback(() => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  }, [activeItemIndex]);

  const handleClose = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, handleClose, handleNext, handlePrev]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeItemIndex]);

  const currentItem: GalleryItem | null = activeItemIndex !== null ? GALLERY_ITEMS[activeItemIndex] : null;

  return (
    <section id="gallery" className="section" aria-label="Galerie Photographique Maison Étoile">
      <div className="container-wide">
        {/* Section Header with Left-Aligned Editorial + Right-Aligned Action matching Figma */}
        <div className="gallery-header-row">
          <div className="gallery-header-text">
            <div className="section-label reveal-on-scroll stagger-1" style={{ textAlign: 'left', marginBottom: '0.65rem' }}>
              OUR GALLERY
            </div>
            <h2 className="section-title reveal-on-scroll stagger-2" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              MOMENTS WORTH SAVOURING
            </h2>
            <p className="section-subtitle reveal-on-scroll stagger-3" style={{ textAlign: 'left', margin: 0, maxWidth: '620px' }}>
              A glimpse into our world — exquisite dishes, elegant interiors and unforgettable Parisian evenings.
            </p>
          </div>

          <div className="gallery-header-action reveal-on-scroll stagger-4">
            <button
              type="button"
              onClick={() => setActiveItemIndex(0)}
              className="gallery-view-all-btn"
              aria-label="Voir la galerie complète dans le visualiseur"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Editorial Photo Grid */}
        <div className="gallery-editorial-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-card reveal-on-scroll stagger-${(index % 6) + 1}`}
              onClick={() => setActiveItemIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItemIndex(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Agrandir la photographie : ${item.title}`}
            >
              {/* Inner Hairline Gold Border */}
              <div className="gallery-inner-border" aria-hidden="true" />

              <img
                src={item.image}
                alt={item.title}
                className="gallery-thumb"
                loading="lazy"
              />

              <div className="gallery-card-overlay">
                <span className="gallery-hover-icon" aria-hidden="true">
                  <Eye size={18} />
                </span>
                <div className="gallery-caption-box">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-teaser">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Interactive Lightbox */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualiseur d'image: ${currentItem.title}`}
          className="lightbox-backdrop"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            type="button"
            className="lightbox-btn-close"
            onClick={handleClose}
            aria-label="Fermer la vue agrandie (Échap)"
          >
            <X size={22} />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            className="lightbox-nav-btn btn-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Image précédente (Flèche gauche)"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="lightbox-nav-btn btn-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Image suivante (Flèche droite)"
          >
            <ChevronRight size={26} />
          </button>

          {/* Main Visual Content */}
          <div
            className="lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-img-frame">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="lightbox-current-img"
              />
            </div>

            <div className="lightbox-info-bar">
              <div className="lightbox-counter">
                PHOTO {activeItemIndex! + 1} / {GALLERY_ITEMS.length}
              </div>
              <h3 className="lightbox-title">{currentItem.title}</h3>
              <p className="lightbox-desc">{currentItem.caption}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.75rem;
          flex-wrap: wrap;
        }

        .gallery-header-action {
          flex-shrink: 0;
        }

        .gallery-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          transition: gap var(--transition-fast), color var(--transition-fast);
        }

        .gallery-view-all-btn:hover {
          gap: 0.75rem;
          color: #FFFFFF;
        }

        .gallery-editorial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .gallery-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          background: #0d131f;
          border: 1px solid rgba(200, 168, 120, 0.25);
          cursor: pointer;
          aspect-ratio: 16 / 10;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .gallery-inner-border {
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(232, 223, 208, 0.12);
          pointer-events: none;
          z-index: 2;
          border-radius: 6px;
          transition: border-color 0.3s ease;
        }

        .gallery-card:hover .gallery-inner-border {
          border-color: rgba(200, 168, 120, 0.35);
        }

        .gallery-card:hover, .gallery-card:focus-visible {
          transform: translateY(-5px);
          border-color: var(--color-gold);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(200, 168, 120, 0.18);
        }

        .gallery-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card:hover .gallery-thumb {
          transform: scale(1.06);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(16, 24, 39, 0.95) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          opacity: 0.9;
          transition: opacity 0.3s ease;
          z-index: 3;
        }

        .gallery-card:hover .gallery-card-overlay {
          opacity: 1;
        }

        .gallery-hover-icon {
          align-self: flex-end;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.75);
          border: 1px solid var(--color-gold-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          opacity: 0;
          transform: scale(0.85);
          transition: all 0.25s ease;
        }

        .gallery-card:hover .gallery-hover-icon {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-item-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-ivory);
          margin-bottom: 0.25rem;
        }

        .gallery-item-teaser {
          font-size: 0.75rem;
          color: var(--color-ivory-dim);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Lightbox Overlay */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 25, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: subtleFadeIn 0.3s ease;
        }

        .lightbox-btn-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.75);
          border: 1px solid var(--color-gold-border);
          color: var(--color-ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 210;
          transition: all 0.2s ease;
        }

        .lightbox-btn-close:hover {
          color: #FFFFFF;
          border-color: var(--color-gold);
          transform: scale(1.05);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.8);
          border: 1px solid var(--color-gold-border);
          color: var(--color-ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 210;
          transition: all 0.2s ease;
        }

        .lightbox-nav-btn:hover {
          background: rgba(200, 168, 120, 0.25);
          border-color: var(--color-gold);
          color: #FFFFFF;
        }

        .btn-prev { left: 24px; }
        .btn-next { right: 24px; }

        .lightbox-stage {
          max-width: 980px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-img-frame {
          max-height: 70vh;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(200, 168, 120, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        }

        .lightbox-current-img {
          max-height: 70vh;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }

        .lightbox-info-bar {
          text-align: center;
          margin-top: 1.25rem;
          max-width: 680px;
        }

        .lightbox-counter {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          letter-spacing: 0.22em;
          color: var(--color-gold);
          margin-bottom: 0.35rem;
          text-transform: uppercase;
        }

        .lightbox-title {
          font-size: 1.5rem;
          color: var(--color-ivory);
          margin-bottom: 0.35rem;
        }

        .lightbox-desc {
          font-size: 0.875rem;
          color: var(--color-ivory-dim);
          line-height: 1.6;
        }

        @media (max-width: 991px) {
          .gallery-editorial-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .gallery-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .gallery-editorial-grid {
            grid-template-columns: 1fr;
          }
          .lightbox-nav-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { SIGNATURE_DISHES, ALL_MENU_ITEMS } from '../data/restaurantData';
import { DishItem } from '../types';
import { Wine, Sparkles, Check, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getAssetUrl } from '../utils/assets';

interface MenuPreviewProps {
  onReserveDish?: (dishName: string) => void;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ onReserveDish }) => {
  const [activeCategory, setActiveCategory] = useState<'signature' | 'all' | 'entree' | 'plat' | 'dessert'>('signature');
  const [selectedDishModal, setSelectedDishModal] = useState<DishItem | null>(null);

  // Close modal on Escape key & lock scroll when dish modal is open
  useEffect(() => {
    if (!selectedDishModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDishModal(null);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDishModal]);

  // Trigger scroll reveal whenever category changes
  useScrollReveal(activeCategory);

  const displayedDishes = activeCategory === 'signature'
    ? SIGNATURE_DISHES
    : activeCategory === 'all'
    ? ALL_MENU_ITEMS
    : ALL_MENU_ITEMS.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="menu" className="section" aria-label="Carte et Créations Signature">
      <div className="container-wide">
        {/* Section Header with Reveal Animation */}
        <div className="section-header">
          <div className="section-label reveal-on-scroll">OUR MENU</div>
          <h2 className="section-title reveal-on-scroll stagger-1">SIGNATURE CREATIONS</h2>
          <p className="section-subtitle reveal-on-scroll stagger-2">
            A curated selection of our most loved dishes, honoring seasonal French terroir with culinary nuance.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="menu-filter-bar reveal-on-scroll stagger-3" role="tablist" aria-label="Filtres de carte">
            <button
              role="tab"
              aria-selected={activeCategory === 'signature'}
              className={`filter-pill ${activeCategory === 'signature' ? 'active' : ''}`}
              onClick={() => setActiveCategory('signature')}
            >
              Créations Signature
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Toute la Carte
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'entree'}
              className={`filter-pill ${activeCategory === 'entree' ? 'active' : ''}`}
              onClick={() => setActiveCategory('entree')}
            >
              Entrées
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'plat'}
              className={`filter-pill ${activeCategory === 'plat' ? 'active' : ''}`}
              onClick={() => setActiveCategory('plat')}
            >
              Plats Principaux
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'dessert'}
              className={`filter-pill ${activeCategory === 'dessert' ? 'active' : ''}`}
              onClick={() => setActiveCategory('dessert')}
            >
              Desserts
            </button>
          </div>
        </div>

        {/* 4 Elegant Dish Cards Grid with Staggered Rise Animations */}
        <div className="dishes-grid">
          {displayedDishes.map((dish, index) => (
            <article
              key={dish.id}
              className={`dish-card reveal-on-scroll stagger-${(index % 4) + 1}`}
            >
              {/* Image Frame */}
              <div className="dish-image-wrapper">
                <img
                  src={getAssetUrl(dish.image)}
                  alt={dish.name}
                  className="dish-image"
                  loading="lazy"
                />
                <span className="dish-category-badge">{dish.frenchCategory}</span>
              </div>

              {/* Dish Details */}
              <div className="dish-content">
                <div className="dish-header-row">
                  <h3 className="dish-title">{dish.name}</h3>
                  <div className="dish-price-box">
                    <span className="dish-price">{dish.price}</span>
                    <span className="demo-price-tag" title="Donnée de démonstration — non contractuelle">Démo</span>
                  </div>
                </div>

                <p className="dish-description">{dish.description}</p>

                {/* Sommelier Pairing note */}
                {dish.pairing && (
                  <div className="dish-pairing-note">
                    <Wine size={13} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    <span>Accord conseillé : {dish.pairing}</span>
                  </div>
                )}

                {/* Dietary Tags & Action */}
                <div className="dish-footer-row">
                  <div className="dish-tags">
                    {dish.dietary?.map((tag) => (
                      <span key={tag} className="dietary-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDishModal(dish)}
                    className="dish-detail-btn"
                    aria-label={`Détails et accords pour ${dish.name}`}
                  >
                    Détails →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner with Rise Animation */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }} className="reveal-on-scroll stagger-2">
          <button
            type="button"
            onClick={() => setActiveCategory(activeCategory === 'all' ? 'signature' : 'all')}
            className="btn-glass-primary"
            style={{ minWidth: '220px' }}
          >
            <span>{activeCategory === 'all' ? 'VOIR LA SÉLECTION' : 'VIEW FULL MENU'}</span>
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-silver)', marginTop: '0.75rem' }}>
            * Carte de démonstration artistique. Les créations varient selon les arrivages du marché.
          </p>
        </div>
      </div>

      {/* Dish Quick Detail Modal */}
      {selectedDishModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          className="dish-modal-overlay"
          onClick={() => setSelectedDishModal(null)}
        >
          <div
            className="dish-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDishModal(null)}
              className="dish-modal-close-btn"
              aria-label="Fermer la fiche du plat"
            >
              <X size={18} />
            </button>
            <div className="dish-modal-img-col">
              <img
                src={getAssetUrl(selectedDishModal.image)}
                alt={selectedDishModal.name}
                className="modal-dish-img"
              />
            </div>
            <div className="dish-modal-text-col">
              <div className="section-label" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                {selectedDishModal.frenchCategory}
              </div>
              <h3 id="dish-modal-title" className="modal-dish-title">{selectedDishModal.name}</h3>
              <p className="modal-dish-price">
                {selectedDishModal.price} <span className="demo-price-tag">Tarif Démo</span>
              </p>
              <p className="modal-dish-desc">{selectedDishModal.description}</p>

              {selectedDishModal.pairing && (
                <div className="modal-pairing-card">
                  <Sparkles size={16} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                  <div>
                    <strong>Accord Mets & Vins du Sommelier :</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>{selectedDishModal.pairing}</p>
                  </div>
                </div>
              )}

              <div className="modal-actions-row">
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedDishModal.name;
                    setSelectedDishModal(null);
                    if (onReserveDish) {
                      onReserveDish(name);
                    } else {
                      document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-glass-primary"
                  style={{ minWidth: '180px', height: '48px' }}
                >
                  <Check size={16} aria-hidden="true" />
                  <span>RÉSERVER POUR CE PLAT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDishModal(null)}
                  className="btn-secondary"
                  style={{ height: '48px', padding: '0 1.5rem' }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .menu-filter-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2.25rem;
          flex-wrap: wrap;
        }

        .filter-pill {
          padding: 0.6rem 1.35rem;
          border-radius: var(--radius-pill);
          background: linear-gradient(135deg, rgba(23, 36, 59, 0.5) 0%, rgba(16, 24, 39, 0.7) 100%);
          border: 1px solid rgba(200, 168, 120, 0.28);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--color-ivory-dim);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
        }

        .filter-pill:hover {
          color: #FFFFFF;
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.18);
          transform: translateY(-1px);
        }

        .filter-pill.active {
          background: linear-gradient(135deg, rgba(200, 168, 120, 0.35) 0%, rgba(23, 36, 59, 0.8) 100%);
          border-color: var(--color-gold);
          color: #FFFFFF;
          box-shadow: 0 0 20px rgba(200, 168, 120, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .dishes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.85rem;
        }

        .dish-card {
          background: linear-gradient(145deg, rgba(23, 36, 59, 0.65) 0%, rgba(16, 24, 39, 0.82) 100%);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(200, 168, 120, 0.28);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(232, 223, 208, 0.15);
        }

        .dish-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(232, 223, 208, 0.3), transparent);
          pointer-events: none;
        }

        .dish-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-gold);
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.85), 0 0 28px rgba(200, 168, 120, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.22);
        }

        .dish-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #0d131f;
        }

        .dish-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dish-card:hover .dish-image {
          transform: scale(1.06);
        }

        .dish-category-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: var(--font-sans);
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold);
          background: rgba(16, 24, 39, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(200, 168, 120, 0.35);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
        }

        .dish-content {
          padding: 1.65rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .dish-header-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .dish-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--color-ivory);
          line-height: 1.25;
        }

        .dish-price-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .dish-price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .demo-price-tag {
          font-size: 0.5625rem;
          font-family: var(--font-sans);
          letter-spacing: 0.05em;
          color: var(--color-silver);
          text-transform: uppercase;
        }

        .dish-description {
          font-size: 0.8125rem;
          color: var(--color-ivory-dim);
          line-height: 1.65;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .dish-pairing-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.725rem;
          color: var(--color-gold);
          font-style: italic;
          margin-bottom: 1.15rem;
          padding: 0.55rem 0.85rem;
          border-radius: 8px;
          background: rgba(200, 168, 120, 0.08);
          border: 1px dashed rgba(200, 168, 120, 0.3);
        }

        .dish-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(232, 223, 208, 0.12);
        }

        .dish-tags {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .dietary-tag {
          font-size: 0.625rem;
          font-family: var(--font-sans);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          background: rgba(232, 223, 208, 0.06);
          color: var(--color-silver);
        }

        .dish-detail-btn {
          font-size: 0.75rem;
          font-family: var(--font-sans);
          color: var(--color-gold);
          letter-spacing: 0.05em;
          transition: color var(--transition-fast);
        }

        .dish-detail-btn:hover {
          color: #FFFFFF;
        }

        /* Modal Styles */
        .dish-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16, 24, 39, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .dish-modal-card {
          background: #17243B;
          border: 1px solid var(--color-gold);
          border-radius: 14px;
          max-width: 760px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
          position: relative;
        }

        .dish-modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(16, 24, 39, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(200, 168, 120, 0.4);
          color: var(--color-silver);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all var(--transition-fast);
        }

        .dish-modal-close-btn:hover {
          color: #FFFFFF;
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.2);
        }

        .dish-modal-img-col {
          position: relative;
          background: #101827;
        }

        .modal-dish-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dish-modal-text-col {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-dish-title {
          font-size: 1.85rem;
          line-height: 1.2;
        }

        .modal-dish-price {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-gold);
        }

        .modal-dish-desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--color-ivory);
        }

        .modal-pairing-card {
          background: rgba(16, 24, 39, 0.6);
          border: 1px solid rgba(200, 168, 120, 0.3);
          border-radius: 8px;
          padding: 0.85rem;
          display: flex;
          gap: 0.75rem;
          font-size: 0.85rem;
        }

        .modal-actions-row {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 1200px) {
          .dishes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 767px) {
          .dishes-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin: 0 auto;
            gap: 1.5rem;
          }
          .dish-card {
            border-radius: 14px;
          }
          .dish-content {
            padding: 1.35rem;
          }
          .menu-filter-bar {
            gap: 0.5rem;
            margin-top: 1.5rem;
          }
          .filter-pill {
            padding: 0.5rem 1rem;
            font-size: 0.6875rem;
          }
          .dish-modal-card {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow-y: auto;
          }
          .dish-modal-img-col {
            height: 220px;
          }
          .dish-modal-text-col {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

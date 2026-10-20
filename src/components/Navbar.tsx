import React, { useState, useEffect } from 'react';
import { BrandMark } from './BrandMark';
import { Menu, X, Calendar, ChevronRight, Sparkles, MapPin, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenReservationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'ACCUEIL', href: '#hero', num: '01', desc: 'Salon & Bienvenue' },
    { label: 'NOTRE HISTOIRE', href: '#our-story', num: '02', desc: 'Tradition & Vision' },
    { label: 'LE MENU', href: '#menu', num: '03', desc: 'Haute Gastronomie' },
    { label: 'EXPÉRIENCE', href: '#experience', num: '04', desc: 'Grands Crus & Salons' },
    { label: 'GALERIE', href: '#gallery', num: '05', desc: 'Instants Précieux' },
    { label: 'CONTACT', href: '#contact', num: '06', desc: 'Accès & Réservation' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}
      >
        {/* Top Demo Notice Banner - Integrated seamlessly above navigation */}
        <aside
          aria-label="Avertissement de démonstration"
          className="header-top-banner"
        >
          <span>✦ MAISON ÉTOILE PARIS — SITE OFFICIEL DE DÉMONSTRATION ARTISTIQUE & PORTFOLIO ✦</span>
        </aside>

        <div className="container-wide header-nav-row">
          {/* Logo link */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            aria-label="Maison Étoile Accueil"
            className="brand-logo-link"
          >
            <BrandMark variant="compact" />
          </a>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Navigation principale"
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link-item"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Reservation Action Button & Mobile Menu Toggle */}
          <div className="header-actions">
            <a
              href="#reservations"
              onClick={(e) => {
                if (onOpenReservationModal) {
                  e.preventDefault();
                  onOpenReservationModal();
                } else {
                  handleLinkClick(e, '#reservations');
                }
              }}
              className="btn-glass-primary reserve-nav-btn"
              aria-label="Réserver une table à Maison Étoile"
            >
              <Calendar size={14} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              <span className="reserve-btn-text">RÉSERVER</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile Maison Étoile"
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        <div className="mobile-drawer-card">
          {/* Explicit Close Button inside Drawer */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>

          {/* Drawer Brand Header */}
          <div className="drawer-header-brand">
            <BrandMark subtitle="HAUTE GASTRONOMIE • PARIS" variant="compact" />
          </div>

          <div className="drawer-ornament-line" aria-hidden="true">
            <span className="drawer-ornament-star">✦</span>
          </div>

          {/* Mobile Navigation Links as Frosted Glass Capsules */}
          <nav className="mobile-nav-list" aria-label="Navigation mobile">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="mobile-nav-item"
                style={{ animationDelay: `${0.04 * (idx + 1)}s` }}
              >
                <div className="nav-item-left">
                  <span className="nav-item-num">{link.num}</span>
                  <div className="nav-item-text">
                    <span className="nav-item-title">{link.label}</span>
                    <span className="nav-item-desc">{link.desc}</span>
                  </div>
                </div>
                <div className="nav-item-arrow" aria-hidden="true">
                  <ChevronRight size={15} />
                </div>
              </a>
            ))}
          </nav>

          {/* CTA Reservation Button */}
          <a
            href="#reservations"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (onOpenReservationModal) {
                e.preventDefault();
                onOpenReservationModal();
              } else {
                handleLinkClick(e, '#reservations');
              }
            }}
            className="btn-glass-primary mobile-drawer-reserve-btn"
          >
            <Sparkles size={14} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            <span>RÉSERVER UNE TABLE</span>
          </a>

          {/* Drawer Footer Details */}
          <div className="drawer-footer-details">
            <div className="drawer-footer-item">
              <MapPin size={12} className="drawer-footer-icon" aria-hidden="true" />
              <span>8 Place de la Concorde, 75008 Paris</span>
            </div>
            <div className="drawer-footer-item">
              <Clock size={12} className="drawer-footer-icon" aria-hidden="true" />
              <span>Services : 12h00 - 14h30 & 19h30 - 23h30</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.35s ease;
          background: rgba(16, 24, 39, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(232, 223, 208, 0.08);
        }

        .header-scrolled {
          background: rgba(16, 24, 39, 0.94);
          border-bottom: 1px solid rgba(200, 168, 120, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
        }

        .header-top-banner {
          background: linear-gradient(90deg, #17243B 0%, #101827 50%, #17243B 100%);
          border-bottom: 1px solid rgba(200, 168, 120, 0.2);
          padding: 0.35rem 1rem;
          text-align: center;
          font-size: 0.6875rem;
          font-family: var(--font-sans);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
          transition: all 0.3s ease;
        }

        .header-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
          transition: height 0.35s ease;
        }

        .header-scrolled .header-nav-row {
          height: 68px;
        }

        .brand-logo-link {
          display: inline-flex;
          align-items: center;
          z-index: 10;
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 2.25rem;
        }

        .nav-link-item {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          color: var(--color-ivory);
          transition: color var(--transition-fast), transform var(--transition-fast);
          position: relative;
        }

        .nav-link-item:hover {
          color: var(--color-gold) !important;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0%;
          height: 1px;
          background-color: var(--color-gold);
          transition: width 0.25s ease, left 0.25s ease;
        }

        .nav-link-item:hover::after {
          width: 100%;
          left: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .reserve-nav-btn {
          height: 44px;
          min-width: 135px;
          padding: 0 1.25rem;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
        }

        .mobile-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.7);
          border: 1px solid var(--color-gold-border);
          color: var(--color-ivory);
          transition: all var(--transition-fast);
        }

        .mobile-toggle-btn:hover {
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.15);
        }

        /* Mobile Drawer Overlay */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 150;
          background: radial-gradient(circle at 50% 18%, rgba(200, 168, 120, 0.14) 0%, rgba(16, 24, 39, 0.9) 55%, rgba(10, 15, 25, 0.98) 100%);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease, backdrop-filter 0.35s ease;
        }

        .mobile-drawer-overlay.is-open {
          opacity: 1;
          pointer-events: all;
        }

        /* Frosted Glass Container Card */
        .mobile-drawer-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: auto;
          background: linear-gradient(165deg, rgba(23, 36, 59, 0.8) 0%, rgba(16, 24, 39, 0.92) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(200, 168, 120, 0.35);
          border-radius: 20px;
          padding: 2.25rem 1.35rem 1.65rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(200, 168, 120, 0.15), inset 0 1px 0 rgba(232, 223, 208, 0.2);
          transform: translateY(20px) scale(0.97);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-drawer-overlay.is-open .mobile-drawer-card {
          transform: translateY(0) scale(1);
        }

        .drawer-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
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
          cursor: pointer;
        }

        .drawer-close-btn:hover, .drawer-close-btn:focus-visible {
          color: #fff;
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.25);
          box-shadow: 0 0 15px rgba(200, 168, 120, 0.3);
          transform: scale(1.05);
        }

        .drawer-header-brand {
          display: flex;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .drawer-ornament-line {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0 auto 1.25rem;
          width: 80%;
        }

        .drawer-ornament-line::before, .drawer-ornament-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 168, 120, 0.4), transparent);
        }

        .drawer-ornament-star {
          color: var(--color-gold);
          font-size: 0.75rem;
          padding: 0 0.65rem;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
          margin-bottom: 1.25rem;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: rgba(23, 36, 59, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(200, 168, 120, 0.18);
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(232, 223, 208, 0.08);
          text-decoration: none;
          transition: all 0.22s ease;
        }

        .mobile-nav-item:hover, .mobile-nav-item:active {
          background: linear-gradient(90deg, rgba(200, 168, 120, 0.18) 0%, rgba(23, 36, 59, 0.75) 100%);
          border-color: var(--color-gold);
          transform: translateX(3px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 16px rgba(200, 168, 120, 0.22);
        }

        .nav-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-align: left;
        }

        .nav-item-num {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--color-gold);
          opacity: 0.85;
          min-width: 18px;
        }

        .nav-item-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .nav-item-title {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          letter-spacing: 0.1em;
          color: var(--color-ivory);
          font-weight: 500;
        }

        .nav-item-desc {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: var(--color-silver);
        }

        .nav-item-arrow {
          color: var(--color-gold);
          opacity: 0.6;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .mobile-nav-item:hover .nav-item-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        .mobile-drawer-reserve-btn {
          width: 100%;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5), 0 0 18px rgba(200, 168, 120, 0.25);
        }

        .drawer-footer-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(200, 168, 120, 0.15);
          font-size: 0.6875rem;
          font-family: var(--font-sans);
          color: var(--color-silver);
        }

        .drawer-footer-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .drawer-footer-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }

        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
        }

        @media (max-width: 420px) {
          .header-top-banner {
            font-size: 0.625rem;
            padding: 0.25rem 0.5rem;
          }
          .reserve-btn-text {
            display: none;
          }
          .reserve-nav-btn {
            min-width: 44px;
            width: 44px;
            padding: 0;
            border-radius: 50%;
          }
        }
      `}</style>
    </>
  );
};

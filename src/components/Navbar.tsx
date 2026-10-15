import React, { useState, useEffect } from 'react';
import { BrandMark } from './BrandMark';
import { Menu, X, Calendar } from 'lucide-react';

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
    { label: 'ACCUEIL', href: '#hero' },
    { label: 'NOTRE HISTOIRE', href: '#our-story' },
    { label: 'LE MENU', href: '#menu' },
    { label: 'EXPÉRIENCE', href: '#experience' },
    { label: 'GALERIE', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
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
      >
        {/* Explicit Close Button inside Drawer */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="drawer-close-btn"
          aria-label="Fermer le menu"
        >
          <X size={24} />
        </button>

        <div className="drawer-inner-content">
          <BrandMark subtitle="L'art de savourer l'instant" />
          
          <div className="drawer-divider" aria-hidden="true" />

          <nav className="mobile-nav-list" aria-label="Liens mobiles">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="mobile-nav-item"
                style={{ animationDelay: `${0.05 * (idx + 1)}s` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

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
            <span>RÉSERVER UNE TABLE</span>
          </a>
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
          background-color: rgba(10, 15, 25, 0.98);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.5rem 1.5rem;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-15px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .mobile-drawer-overlay.is-open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        .drawer-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.8);
          border: 1px solid var(--color-gold-border);
          color: var(--color-ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .drawer-close-btn:hover {
          color: #fff;
          border-color: var(--color-gold);
        }

        .drawer-inner-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          max-width: 340px;
          width: 100%;
          margin: auto;
        }

        .drawer-divider {
          width: 70px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          margin: 0.25rem 0;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.15rem;
          width: 100%;
        }

        .mobile-nav-item {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          letter-spacing: 0.12em;
          color: var(--color-ivory);
          padding: 0.35rem 1rem;
          display: block;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .mobile-nav-item:hover, .mobile-nav-item:active {
          color: var(--color-gold);
          transform: translateY(-2px);
        }

        .mobile-drawer-reserve-btn {
          width: 100%;
          max-width: 260px;
          height: 52px;
          margin-top: 0.75rem;
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

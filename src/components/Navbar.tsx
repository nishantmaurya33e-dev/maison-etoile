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
      setIsScrolled(window.scrollY > 40);
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.35s ease',
          backgroundColor: isScrolled
            ? 'rgba(16, 24, 39, 0.92)'
            : 'rgba(16, 24, 39, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid rgba(200, 168, 120, 0.25)'
            : '1px solid rgba(232, 223, 208, 0.08)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.45)' : 'none'
        }}
      >
        <div
          className="container-wide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '74px' : '90px',
            transition: 'height 0.35s ease'
          }}
        >
          {/* Logo link */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            aria-label="Maison Étoile Accueil"
            style={{ display: 'inline-block' }}
          >
            <BrandMark variant="compact" />
          </a>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Navigation principale"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  color: 'var(--color-ivory)',
                  transition: 'color var(--transition-fast), transform var(--transition-fast)',
                  position: 'relative'
                }}
                className="nav-link-item"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Reservation Action Button & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              style={{
                height: '44px',
                minWidth: '140px',
                padding: '0 1.5rem',
                fontSize: '0.75rem',
                letterSpacing: '0.16em'
              }}
            >
              <Calendar size={14} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              <span>RÉSERVER</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="mobile-toggle-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(23, 36, 59, 0.6)',
                border: '1px solid var(--color-gold-border)',
                color: 'var(--color-ivory)'
              }}
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          backgroundColor: 'rgba(16, 24, 39, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          padding: '2rem',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease'
        }}
      >
        <BrandMark subtitle="L'art de savourer l'instant" />
        
        <div
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '0.5rem 0'
          }}
        />

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                letterSpacing: '0.12em',
                color: 'var(--color-ivory)',
                padding: '0.4rem 1rem'
              }}
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
          className="btn-glass-primary"
          style={{ width: '80%', maxWidth: '280px', marginTop: '1rem' }}
        >
          RÉSERVER UNE TABLE
        </a>
      </div>

      <style>{`
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
        @media (max-width: 520px) {
          .reserve-nav-btn {
            display: none !important;
          }
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
      `}</style>
    </>
  );
};

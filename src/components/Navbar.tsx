import React, { useState, useEffect } from 'react';
import { BrandMark } from './BrandMark';
import { Menu, X, Calendar, ChevronRight, Sparkles, MapPin, Clock, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenReservationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // 1. If at the top of the page, ACCUEIL ('hero') is strictly active
      if (scrollY < 180) {
        setActiveSection('hero');
        return;
      }

      // 2. If near the bottom of the page, CONTACT is active
      const scrollBottom = window.innerHeight + scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 120) {
        setActiveSection('contact');
        return;
      }

      // 3. Otherwise compute section in view using getBoundingClientRect()
      const sectionIds = ['hero', 'our-story', 'menu', 'experience', 'gallery', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if section crosses the viewport reading line (140px below top)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
    { id: 'hero', label: 'ACCUEIL', href: '#hero', num: '01', desc: 'Salon & Bienvenue' },
    { id: 'our-story', label: 'NOTRE HISTOIRE', href: '#our-story', num: '02', desc: 'Tradition & Vision' },
    { id: 'menu', label: 'LE MENU', href: '#menu', num: '03', desc: 'Haute Gastronomie' },
    { id: 'experience', label: 'EXPÉRIENCE', href: '#experience', num: '04', desc: 'Grands Crus & Salons' },
    { id: 'gallery', label: 'GALERIE', href: '#gallery', num: '05', desc: 'Instants Précieux' },
    { id: 'contact', label: 'CONTACT', href: '#contact', num: '06', desc: 'Accès & Réservation' },
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
      {/* Decorative Celestial Arc with 8-Point Gold Star (Image 2 Signature Motif) */}
      <div className="celestial-arc-bg" aria-hidden="true">
        <svg
          className="celestial-arc-svg"
          viewBox="0 0 1200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle curved orbital arc */}
          <path
            d="M 50 120 Q 420 15 1150 110"
            stroke="url(#arcGoldGradient)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.55"
          />
          {/* Secondary faint orbit line */}
          <path
            d="M 120 145 Q 460 35 1100 135"
            stroke="url(#arcGoldGradient)"
            strokeWidth="0.8"
            opacity="0.3"
          />
          {/* Radiant 8-pointed star on the upper-left orbit (Image 2) */}
          <g transform="translate(240, 42)">
            <circle cx="0" cy="0" r="14" fill="rgba(200, 168, 120, 0.12)" />
            <circle cx="0" cy="0" r="6" fill="rgba(200, 168, 120, 0.25)" />
            {/* 8-point gold star path */}
            <path
              d="M 0 -18 L 3 -5 L 18 0 L 3 5 L 0 18 L -3 5 L -18 0 L -3 -5 Z"
              fill="#E0C69B"
            />
            {/* Diagonal flare rays */}
            <path
              d="M -9 -9 L 9 9 M -9 9 L 9 -9"
              stroke="#C8A878"
              strokeWidth="0.8"
              opacity="0.7"
            />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Subtle accent twinkle on right */}
          <g transform="translate(940, 72)" opacity="0.6">
            <path
              d="M 0 -8 L 1.5 -2 L 8 0 L 1.5 2 L 0 8 L -1.5 2 L -8 0 L -1.5 -2 Z"
              fill="#C8A878"
            />
          </g>
          <defs>
            <linearGradient id="arcGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8A878" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#C8A878" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#E0C69B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C8A878" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Header Wrapper */}
      <header
        role="banner"
        className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}
      >
        {/* Top Demo Notice Banner */}
        <aside
          aria-label="Avertissement de démonstration"
          className="header-top-banner"
        >
          <span>✦ MAISON ÉTOILE PARIS — SITE OFFICIEL DE DÉMONSTRATION ARTISTIQUE & PORTFOLIO ✦</span>
        </aside>

        {/* Floating Capsule Dock Bar (Image 2 Signature Navigation Dock) */}
        <div className="navbar-capsule-dock-wrapper">
          <div className="navbar-floating-dock">
            {/* Brand Logo & Name */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              aria-label="Maison Étoile Accueil"
              className="brand-dock-link"
            >
              <BrandMark variant="compact" />
            </a>

            {/* Desktop Navigation Links with Active Gold Underline */}
            <nav
              role="navigation"
              aria-label="Navigation principale"
              className="desktop-dock-nav"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`dock-nav-item ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    <span className="dock-link-underline" aria-hidden="true" />
                  </a>
                );
              })}
            </nav>

            {/* Right Action Area: Capsule RÉSERVER Button & Mobile 3-Line Menu */}
            <div className="dock-actions">
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
                className="dock-reserve-btn"
                aria-label="Réserver une table à Maison Étoile"
              >
                <Calendar size={13} className="reserve-icon" aria-hidden="true" />
                <span className="reserve-btn-text">RÉSERVER</span>
              </a>

              {/* Mobile 3-Line Hamburger Button (Matching Image 3 Icon Button) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                className="btn-icon-gold mobile-toggle-btn"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Glass Card (Matching Image 3 Specification) */}
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
          {/* Top Circular Glass Close Button (Matching Image 3 Icon Button) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-icon-gold drawer-close-btn"
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>

          {/* Drawer Brand Header */}
          <div className="drawer-header-brand">
            <BrandMark subtitle="HAUTE GASTRONOMIE • PARIS" variant="compact" />
          </div>

          {/* Gold Star Line Ornament */}
          <div className="drawer-ornament-line" aria-hidden="true">
            <span className="drawer-ornament-star">✦</span>
          </div>

          {/* Mobile Navigation List as Soft Glass Capsules with Gold Numerals */}
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

          {/* Scroll World Immersive Feature in Mobile Drawer */}
          <a
            href="./world.html"
            className="mobile-world-card-link"
            aria-label="Expérience immersive 3D Scroll World"
          >
            <div className="mobile-world-left">
              <Compass size={17} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              <div className="mobile-world-text">
                <span className="mobile-world-title">VOYAGE IMMERSIF 3D</span>
                <span className="mobile-world-sub">Scroll World • Salons & Cave</span>
              </div>
            </div>
            <div className="mobile-world-badge" aria-hidden="true">✦</div>
          </a>

          {/* CTA Reservation Button (Primary Glass Button from Image 3) */}
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
            <ChevronRight size={15} aria-hidden="true" />
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
        /* Celestial Arc Background (Image 2) */
        .celestial-arc-bg {
          position: fixed;
          top: 32px;
          left: 0;
          right: 0;
          height: 140px;
          pointer-events: none;
          z-index: 95;
          overflow: hidden;
        }

        .celestial-arc-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Top Header Container */
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.35s ease;
          pointer-events: none;
        }

        .site-header * {
          pointer-events: auto;
        }

        /* Top Notice Banner */
        .header-top-banner {
          background: linear-gradient(90deg, #17243B 0%, #101827 50%, #17243B 100%);
          border-bottom: 1px solid rgba(200, 168, 120, 0.2);
          padding: 0.32rem 1rem;
          text-align: center;
          font-size: 0.6875rem;
          font-family: var(--font-sans);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
          transition: all 0.3s ease;
        }

        .navbar-capsule-dock-wrapper {
          display: flex;
          justify-content: center;
          padding: 0.85rem 1.25rem 0;
          width: 100%;
        }

        /* Floating Capsule Dock (Spacious, elegant, perfectly balanced) */
        .navbar-floating-dock {
          width: 100%;
          max-width: 1240px;
          height: 64px;
          border-radius: 50px;
          background: rgba(16, 24, 39, 0.76);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(200, 168, 120, 0.42);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.55), 0 0 24px rgba(200, 168, 120, 0.12), inset 0 1px 0 rgba(232, 223, 208, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.75rem;
          gap: 1.5rem;
          transition: all 0.35s ease;
        }

        .header-scrolled .navbar-floating-dock {
          background: rgba(16, 24, 39, 0.94);
          border-color: rgba(200, 168, 120, 0.6);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.75), 0 0 30px rgba(200, 168, 120, 0.22);
          height: 58px;
        }

        .brand-dock-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          z-index: 10;
          flex-shrink: 0;
        }

        /* Desktop Nav List inside Dock */
        .desktop-dock-nav {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex: 1;
          min-width: 0;
        }

        .dock-nav-item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: var(--color-ivory);
          text-decoration: none;
          transition: color var(--transition-fast), transform var(--transition-fast);
          position: relative;
          padding: 0.45rem 0.25rem;
          white-space: nowrap !important;
          flex-shrink: 0;
        }

        .dock-nav-item:hover {
          color: var(--color-gold) !important;
        }

        /* Candlelight Gold Underline for Active Item (Image 2) */
        .dock-link-underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          border-radius: 2px;
          background: var(--color-gold);
          box-shadow: 0 0 8px rgba(200, 168, 120, 0.6);
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dock-nav-item:hover .dock-link-underline {
          width: 100%;
        }

        .dock-nav-item.is-active {
          color: var(--color-gold) !important;
        }

        .dock-nav-item.is-active .dock-link-underline {
          width: 100%;
        }

        /* Right Actions */
        .dock-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
        }

        /* Capsule RÉSERVER Button (Matching Image 2 & 3) */
        .dock-reserve-btn {
          height: 42px;
          min-width: 130px;
          padding: 0 1.35rem;
          border-radius: 50px;
          background: rgba(23, 36, 59, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--color-gold);
          box-shadow: 0 8px 24px rgba(200, 168, 120, 0.15), inset 0 1px 1px rgba(232, 223, 208, 0.2);
          color: var(--color-ivory);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .dock-reserve-btn:hover {
          background: rgba(200, 168, 120, 0.2);
          border-color: #E0C69B;
          color: #FFFFFF;
          box-shadow: 0 0 22px rgba(200, 168, 120, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6);
          transform: translateY(-1px);
        }

        .dock-reserve-btn:active {
          transform: translateY(1px);
        }

        /* Mobile Drawer Scroll World Feature Card */
        .mobile-world-card-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.1rem;
          background: linear-gradient(135deg, rgba(200, 168, 120, 0.18) 0%, rgba(23, 36, 59, 0.75) 100%);
          border: 1px solid rgba(200, 168, 120, 0.45);
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35), 0 0 16px rgba(200, 168, 120, 0.15);
          text-decoration: none;
          margin-bottom: 1rem;
          transition: all 0.25s ease;
        }

        .mobile-world-card-link:hover, .mobile-world-card-link:active {
          transform: translateY(-2px);
          border-color: #E0C69B;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 24px rgba(200, 168, 120, 0.35);
        }

        .mobile-world-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .mobile-world-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          text-align: left;
        }

        .mobile-world-title {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          text-transform: uppercase;
        }

        .mobile-world-sub {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          color: var(--color-gold);
        }

        .mobile-world-badge {
          color: var(--color-gold);
          font-size: 0.85rem;
          animation: badgePulse 2s ease-in-out infinite;
        }

        .reserve-icon {
          color: var(--color-gold);
        }

        /* Mobile 3-Line Toggle Button */
        .mobile-toggle-btn {
          width: 42px !important;
          height: 42px !important;
          flex-shrink: 0;
        }

        /* Mobile Drawer Overlay (Image 3) */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 150;
          background: radial-gradient(circle at 50% 18%, rgba(200, 168, 120, 0.16) 0%, rgba(16, 24, 39, 0.92) 55%, rgba(10, 15, 25, 0.98) 100%);
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
          transition: opacity 0.35s ease;
        }

        .mobile-drawer-overlay.is-open {
          opacity: 1;
          pointer-events: all;
        }

        /* Drawer Card Modal (Soft Glassmorphic 20-30% opacity, 1px gold border, shadow) */
        .mobile-drawer-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: auto;
          background: linear-gradient(165deg, rgba(23, 36, 59, 0.8) 0%, rgba(16, 24, 39, 0.92) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(200, 168, 120, 0.4);
          border-radius: 24px;
          padding: 2.25rem 1.35rem 1.65rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 8px 24px rgba(200, 168, 120, 0.18), inset 0 1px 0 rgba(232, 223, 208, 0.2);
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
          width: 38px !important;
          height: 38px !important;
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
          background: rgba(23, 36, 59, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(200, 168, 120, 0.22);
          border-radius: 14px;
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
          opacity: 0.9;
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

        /* Responsive Breakpoints & Spacing Rules */
        @media (min-width: 1240px) {
          .desktop-dock-nav {
            display: flex !important;
            gap: 2rem;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }

        @media (min-width: 1080px) and (max-width: 1239px) {
          .desktop-dock-nav {
            display: flex !important;
            gap: 1.35rem;
          }
          .dock-nav-item {
            font-size: 0.75rem;
            letter-spacing: 0.13em;
          }
          .navbar-floating-dock {
            padding: 0 1.25rem;
            gap: 1.15rem;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }

        @media (min-width: 992px) and (max-width: 1079px) {
          .desktop-dock-nav {
            display: flex !important;
            gap: 0.85rem;
          }
          .dock-nav-item {
            font-size: 0.7rem;
            letter-spacing: 0.1em;
          }
          .navbar-floating-dock {
            padding: 0 1rem;
            gap: 0.85rem;
          }
          .dock-reserve-btn {
            padding: 0 0.95rem;
            min-width: 110px;
            font-size: 0.7rem;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }

        /* Mobile & Tablet below 992px */
        @media (max-width: 991px) {
          .desktop-dock-nav {
            display: none !important;
          }
          .navbar-capsule-dock-wrapper {
            padding: 0.5rem 0.85rem 0;
          }
          .navbar-floating-dock {
            padding: 0 1.15rem;
            height: 56px;
            gap: 0.75rem;
          }
          .celestial-arc-bg {
            display: none;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-capsule-dock-wrapper {
            padding: 0.45rem 0.5rem 0;
          }
          .navbar-floating-dock {
            padding: 0 0.85rem;
            height: 52px;
          }
          .header-top-banner {
            font-size: 0.6rem;
            padding: 0.25rem 0.35rem;
            letter-spacing: 0.08em;
          }
          .reserve-btn-text {
            display: none;
          }
          .dock-reserve-btn {
            min-width: 38px;
            width: 38px;
            height: 38px;
            padding: 0;
            border-radius: 50%;
          }
          .mobile-toggle-btn {
            width: 38px !important;
            height: 38px !important;
          }
        }
      `}</style>
    </>
  );
};

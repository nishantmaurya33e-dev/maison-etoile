import React from 'react';
import { BrandMark } from '../components/BrandMark';
import { LegalDocType } from '../components/LegalModal';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

interface FooterProps {
  onOpenLegalDoc: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalDoc }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#0a0f1a',
        borderTop: '1px solid rgba(200, 168, 120, 0.25)',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Gold Circular Arc in bottom-right corner, matching Figma reference */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-120px',
          bottom: '-120px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px solid rgba(200, 168, 120, 0.35)',
          boxShadow: '0 0 50px rgba(200, 168, 120, 0.08)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-90px',
          bottom: '-90px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(200, 168, 120, 0.18)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Row: BrandMark, Nav Links, and Social Icons */}
        <div className="footer-top-row reveal-on-scroll">
          {/* Brand Wordmark */}
          <div className="footer-brand-box">
            <BrandMark subtitle="CUISINE FRANÇAISE" variant="full" />
          </div>

          {/* Center Navigation Links */}
          <nav className="footer-nav-bar" aria-label="Navigation du pied de page">
            <button type="button" onClick={() => scrollTo('hero')} className="footer-nav-item">HOME</button>
            <button type="button" onClick={() => scrollTo('our-story')} className="footer-nav-item">ABOUT</button>
            <button type="button" onClick={() => scrollTo('menu')} className="footer-nav-item">MENU</button>
            <button type="button" onClick={() => scrollTo('gallery')} className="footer-nav-item">GALLERY</button>
            <button type="button" onClick={() => scrollTo('reservations')} className="footer-nav-item">RESERVATIONS</button>
            <button type="button" onClick={() => scrollTo('contact')} className="footer-nav-item">CONTACT</button>
          </nav>

          {/* Right Follow Us */}
          <div className="footer-follow-box">
            <span className="follow-label">FOLLOW US</span>
            <div className="footer-social-icons">
              <a
                href="#instagram"
                aria-label="Instagram (Démo)"
                className="social-btn"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#facebook"
                aria-label="Facebook (Démo)"
                className="social-btn"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#x"
                aria-label="X (Démo)"
                className="social-btn"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest (Démo)"
                className="social-btn"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="footer-hairline" />

        {/* Middle Row: Demo Contact Details & Tagline */}
        <div id="contact" className="footer-middle-row reveal-on-scroll stagger-1">
          <div className="footer-contacts">
            <div className="contact-col">
              <Mail size={16} className="col-icon" aria-hidden="true" />
              <div>
                <a href="mailto:bonjour@maisonetoile.example" className="contact-value">
                  bonjour@maisonetoile.example
                </a>
                <span className="contact-desc">Courriel d'accueil (Démo)</span>
              </div>
            </div>

            <div className="contact-col">
              <Phone size={16} className="col-icon" aria-hidden="true" />
              <div>
                <span className="contact-value">+33 1 42 68 55 00</span>
                <span className="contact-desc">Ligne de réservation fictive</span>
              </div>
            </div>

            <div className="contact-col">
              <MapPin size={16} className="col-icon" aria-hidden="true" />
              <div>
                <span className="contact-value">8 Place de la Concorde, 75008 Paris</span>
                <span className="contact-desc">Adresse illustrative Paris</span>
              </div>
            </div>

            <div className="contact-col">
              <Globe size={16} className="col-icon" aria-hidden="true" />
              <div>
                <span className="contact-value">www.maisonetoile.example</span>
                <span className="contact-desc">Domaine réservé</span>
              </div>
            </div>
          </div>

          <div className="footer-motto-box">
            <span className="footer-motto-text">Classic flavors. Modern moments.</span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="footer-hairline" style={{ margin: '2rem 0' }} />

        {/* Bottom Row: Legal Links & Copyright */}
        <div className="footer-bottom-row reveal-on-scroll stagger-2">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Maison Étoile — Tous droits réservés. Projet de haute joaillerie culinaire & portfolio UI/UX.
          </div>

          <div className="footer-legal-bar">
            <button type="button" onClick={() => onOpenLegalDoc('privacy')} className="legal-btn">
              Confidentialité
            </button>
            <span className="sep">•</span>
            <button type="button" onClick={() => onOpenLegalDoc('cookies')} className="legal-btn">
              Cookies
            </button>
            <span className="sep">•</span>
            <button type="button" onClick={() => onOpenLegalDoc('terms')} className="legal-btn">
              Mentions Légales & CGU
            </button>
            <span className="sep">•</span>
            <button type="button" onClick={() => onOpenLegalDoc('reservation')} className="legal-btn">
              Conditions de Réservation
            </button>
            <span className="sep">•</span>
            <button type="button" onClick={() => onOpenLegalDoc('accessibility')} className="legal-btn">
              Accessibilité (WCAG 2.2 AA)
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .footer-nav-bar {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .footer-nav-item {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-ivory-dim);
          transition: color var(--transition-fast);
        }

        .footer-nav-item:hover {
          color: var(--color-gold);
        }

        .footer-follow-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .follow-label {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: var(--color-gold);
          text-transform: uppercase;
        }

        .footer-social-icons {
          display: flex;
          gap: 0.65rem;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(23, 36, 59, 0.45);
          border: 1px solid rgba(200, 168, 120, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-ivory-dim);
          transition: all var(--transition-fast);
        }

        .social-btn:hover {
          background: rgba(200, 168, 120, 0.15);
          border-color: var(--color-gold);
          color: #fff;
          transform: translateY(-2px);
        }

        .footer-hairline {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 168, 120, 0.35), transparent);
          margin-bottom: 2.5rem;
        }

        .footer-middle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-contacts {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .contact-col {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .col-icon {
          color: var(--color-gold);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .contact-value {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          color: var(--color-ivory);
          font-weight: 400;
        }

        .contact-desc {
          display: block;
          font-size: 0.6875rem;
          color: var(--color-silver);
          margin-top: 2px;
        }

        .footer-motto-box {
          flex-shrink: 0;
        }

        .footer-motto-text {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--color-gold);
          letter-spacing: 0.04em;
        }

        .footer-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: var(--color-silver);
        }

        .footer-legal-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .legal-btn {
          font-size: 0.75rem;
          color: var(--color-silver);
          transition: color var(--transition-fast);
        }

        .legal-btn:hover {
          color: var(--color-gold);
        }

        .sep {
          color: rgba(232, 223, 208, 0.2);
          font-size: 0.65rem;
        }

        @media (max-width: 991px) {
          .footer-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .footer-nav-bar {
            flex-wrap: wrap;
            gap: 1.25rem;
          }
          .footer-middle-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-contacts {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
};

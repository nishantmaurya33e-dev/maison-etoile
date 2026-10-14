import React, { useEffect } from 'react';
import { X, Shield, FileText, Lock, HelpCircle, Eye } from 'lucide-react';

export type LegalDocType = 'privacy' | 'cookies' | 'terms' | 'reservation' | 'accessibility';

interface LegalModalProps {
  activeDoc: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ activeDoc, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDoc) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoc, onClose]);

  if (!activeDoc) return null;

  const renderContent = () => {
    switch (activeDoc) {
      case 'privacy':
        return (
          <>
            <div className="doc-badge"><Shield size={14} /> DRAFT TEMPLATE / PROJET DE POLITIQUE</div>
            <h2>Politique de Confidentialité (Draft)</h2>
            <p className="doc-disclaimer">
              Ce document est un modèle d’information préliminaire pour le projet de portfolio Maison Étoile. Aucune donnée personnelle réelle n’est conservée ou monétisée.
            </p>
            <h3>1. Responsable de Traitement</h3>
            <p>
              [Entité d’exploitation à désigner par l’acquéreur du site]<br />
              Adresse de correspondance : bonjour@maisonetoile.example<br />
              Paris, France.
            </p>
            <h3>2. Données Collectées en Démonstration</h3>
            <p>
              Le présent prototype interactif ne collecte ni n’enregistre de manière persistante vos données. Les informations saisies dans le formulaire de réservation (nom, date, heure, régime) sont traitées exclusivement dans la mémoire locale de votre navigateur pour simuler l’expérience utilisateur.
            </p>
            <h3>3. Absence de Traceurs Tiers</h3>
            <p>
              Le site ne déploie aucun cookie publicitaire, outil d’analyse comportementale intrusif (Google Analytics, Meta Pixel) ni revente de données à des tiers.
            </p>
            <h3>4. Vos Droits (RGPD / Loi Informatique & Libertés)</h3>
            <p>
              Dans le cadre d’une mise en production réelle, les utilisateurs disposent d’un droit d’accès, de rectification, d’effacement et d’opposition conformément aux articles 15 à 21 du Règlement Général sur la Protection des Données (RGPD).
            </p>
          </>
        );

      case 'cookies':
        return (
          <>
            <div className="doc-badge"><Lock size={14} /> GESTION DES COOKIES</div>
            <h2>Politique Relative aux Cookies (Draft)</h2>
            <p className="doc-disclaimer">
              Respect absolu de la vie privée : le site Maison Étoile fonctionne sans cookies de pistage publicitaire.
            </p>
            <h3>1. Typologie des Témoins de Connexion</h3>
            <p>
              Le site n’utilise que des éléments techniques strictement nécessaires au fonctionnement de l’interface (mémorisation temporaire de la session d’affichage).
            </p>
            <h3>2. Absence de Cookies Publicitaires</h3>
            <p>
              Aucun cookie de ciblage publicitaire ni cookie tiers de réseau social n’est déposé lors de votre visite.
            </p>
          </>
        );

      case 'terms':
        return (
          <>
            <div className="doc-badge"><FileText size={14} /> CONDITIONS GÉNÉRALES</div>
            <h2>Conditions Générales d’Utilisation (Draft)</h2>
            <p className="doc-disclaimer">
              Conditions d’accès au site vitrine et prototype artistique Maison Étoile.
            </p>
            <h3>1. Objet du Site</h3>
            <p>
              Le site Maison Étoile est une démonstration artistique de design UI/UX et d’ingénierie web pour un restaurant gastronomique fictif. Les menus, tarifs et photographies sont présentés à des fins illustratives.
            </p>
            <h3>2. Propriété Intellectuelle</h3>
            <p>
              L’ensemble des chartes graphiques, animations, compositions visuelles et codes sources constituent une création originale protégée par les lois régissant la propriété intellectuelle.
            </p>
          </>
        );

      case 'reservation':
        return (
          <>
            <div className="doc-badge"><HelpCircle size={14} /> CONDITIONS DE SERVICE</div>
            <h2>Politique de Réservation & Annulation (Draft)</h2>
            <p className="doc-disclaimer">
              Règles types applicables lors de l’ouverture au public d’un établissement gastronomique.
            </p>
            <h3>1. Modalités de Confirmation</h3>
            <p>
              Pour toute table à partir de 4 personnes, une confirmation par SMS ou e-mail 24 heures avant le service est requise.
            </p>
            <h3>2. Délais d’Annulation</h3>
            <p>
              Afin de respecter le travail de nos artisans maraîchers et la brigade de cuisine, toute annulation doit être notifiée au moins 12 heures avant l’heure de la réservation.
            </p>
            <h3>3. Code Vestimentaire & Enfants</h3>
            <p>
              Tenue soignée exigée (élégance décontractée bienvenue, vestes recommandées en soirée). Les enfants sont bienvenus avec des menus adaptés préparés à la demande.
            </p>
          </>
        );

      case 'accessibility':
        return (
          <>
            <div className="doc-badge"><Eye size={14} /> DÉCLARATION D'ACCESSIBILITÉ</div>
            <h2>Déclaration d’Accessibilité Numérique (Draft)</h2>
            <p className="doc-disclaimer">
              Maison Étoile s’engage à rendre son expérience numérique accessible au plus grand nombre (Objectif WCAG 2.2 AA).
            </p>
            <h3>1. Mesures Implémentées</h3>
            <p>
              - Navigation intégrale au clavier avec indicateurs de focus visibles.<br />
              - Respect des ratios de contraste colorimétrique pour les textes sur fond sombre.<br />
              - Textes alternatifs explicatifs (alt) sur toutes les photographies culinaires.<br />
              - Prise en charge des préférences de mouvements réduits (<code>prefers-reduced-motion</code>).<br />
              - Balisage sémantique rigoureux (landmarks HTML5, rôles ARIA pour fenêtres modales).
            </p>
            <h3>2. Signalement d’une Difficulté</h3>
            <p>
              Si vous rencontrez un obstacle d’accessibilité, veuillez nous contacter à l’adresse : <code>accessibility@maisonetoile.example</code>.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="legal-modal-backdrop"
      onClick={onClose}
    >
      <div className="legal-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="legal-close-btn"
          aria-label="Fermer le document légal"
        >
          <X size={20} />
        </button>

        <div className="legal-content-body">
          {renderContent()}
        </div>
      </div>

      <style>{`
        .legal-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 25, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .legal-modal-sheet {
          background: #17243B;
          border: 1px solid var(--color-gold);
          border-radius: 12px;
          max-width: 680px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 2.75rem;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
          color: var(--color-ivory);
        }

        .legal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--color-silver);
          padding: 6px;
        }

        .legal-close-btn:hover {
          color: #FFFFFF;
        }

        .doc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .legal-content-body h2 {
          font-size: 1.85rem;
          margin-bottom: 1rem;
        }

        .legal-content-body h3 {
          font-size: 1.2rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--color-gold);
        }

        .legal-content-body p {
          font-size: 0.9375rem;
          color: var(--color-ivory-dim);
          line-height: 1.7;
          margin-bottom: 0.85rem;
        }

        .doc-disclaimer {
          background: rgba(16, 24, 39, 0.6);
          border-left: 3px solid var(--color-gold);
          padding: 0.75rem 1rem;
          font-size: 0.8125rem !important;
          color: var(--color-silver) !important;
          margin-bottom: 1.5rem !important;
        }

        @media (max-width: 600px) {
          .legal-modal-sheet {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

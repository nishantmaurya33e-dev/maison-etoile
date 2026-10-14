import React, { useState } from 'react';
import { ReservationFormData, ReservationConfirmation } from '../types';
import { Calendar, Users, Clock, AlertCircle, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

interface ReservationSectionProps {
  initialDishPreference?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ initialDishPreference }) => {
  // Form State
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    time: '20:00',
    guests: 2,
    seatingArea: 'main-dining',
    dietaryNotes: initialDishPreference ? `Intérêt particulier pour le plat : ${initialDishPreference}` : '',
    accessibilityRequests: '',
    acceptedTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);

  const timeSlots = [
    { label: 'Déjeuner — 12:00', value: '12:00' },
    { label: 'Déjeuner — 12:30', value: '12:30' },
    { label: 'Déjeuner — 13:00', value: '13:00' },
    { label: 'Dîner — 19:30', value: '19:30' },
    { label: 'Dîner — 20:00', value: '20:00' },
    { label: 'Dîner — 20:30', value: '20:30' },
    { label: 'Dîner — 21:00', value: '21:00' },
    { label: 'Dîner — 21:30', value: '21:30' }
  ];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Veuillez renseigner votre nom complet.';
    } else if (formData.fullName.length > 60) {
      errs.fullName = 'Le nom ne doit pas dépasser 60 caractères.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Veuillez saisir votre adresse e-mail.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Format d’e-mail invalide.';
    }

    if (!formData.date) {
      errs.date = 'Veuillez sélectionner une date de réservation.';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.date = 'La date ne peut pas être antérieure à aujourd’hui.';
      }
    }

    if (!formData.time) {
      errs.time = 'Veuillez choisir un horaire.';
    }

    if (formData.guests < 1 || formData.guests > 8) {
      errs.guests = 'Le nombre de couverts doit être compris entre 1 et 8.';
    }

    if (!formData.acceptedTerms) {
      errs.acceptedTerms = 'Vous devez accepter la politique de réservation (démo).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate an honest demo reservation request
    setTimeout(() => {
      setIsSubmitting(false);
      const refNum = 'ME-' + Math.floor(100000 + Math.random() * 900000);
      const seatingLabels = {
        'main-dining': 'Salle Principale Romantique',
        'window-view': 'Table Fenêtre — Vue Paris',
        'candlelight-alcove': 'Alcôve aux Chandelles',
        'private-salon': 'Salon Particulier'
      };

      setConfirmation({
        referenceNumber: refNum,
        guestName: formData.fullName,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seatingAreaName: seatingLabels[formData.seatingArea],
        timestamp: new Date().toLocaleTimeString('fr-FR')
      });
    }, 650);
  };

  const handleReset = () => {
    setConfirmation(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '20:00',
      guests: 2,
      seatingArea: 'main-dining',
      dietaryNotes: '',
      accessibilityRequests: '',
      acceptedTerms: false
    });
    setErrors({});
  };

  return (
    <section id="reservations" className="section" aria-label="Réservation d'une table">
      {/* Table Awaits Banner Header */}
      <div className="table-awaits-banner">
        <div className="banner-bg-img" aria-hidden="true" />
        <div className="banner-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="section-label reveal-on-scroll stagger-1">YOUR TABLE AWAITS</div>
          <h2 className="banner-headline reveal-on-scroll stagger-2">UN VOYAGE SENSORIEL UNIQUE</h2>
          <p className="banner-subtext reveal-on-scroll stagger-3">
            Join us for an unforgettable dining experience at Maison Étoile. Nous vous accueillons dans un cadre chaleureux et intime pour célébrer l’art de vivre à la française.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div className="reservation-wrapper reveal-on-scroll">
          {/* Demo Disclaimer Header */}
          <div className="demo-notice-bar reveal-on-scroll stagger-1" role="status">
            <Info size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <strong>SYSTÈME DE RÉSERVATION EN MODE DÉMONSTRATION</strong>
              <p>
                Ce site est un prototype d’art director & UI/UX portfolio. Aucune table n’est réellement réservée et aucune donnée personnelle n’est transmise à un serveur externe.
              </p>
            </div>
          </div>

          {!confirmation ? (
            <form onSubmit={handleSubmit} noValidate className="reservation-form">
              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="res-name" className="form-label">
                    Nom & Prénom <span className="req">*</span>
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    maxLength={60}
                    placeholder="ex. Éléonore de Montmirail"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    aria-describedby={errors.fullName ? 'res-name-err' : undefined}
                  />
                  {errors.fullName && (
                    <span id="res-name-err" className="form-error">
                      <AlertCircle size={12} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="res-email" className="form-label">
                    Adresse E-mail <span className="req">*</span>
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    required
                    maxLength={100}
                    placeholder="ex. contact@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    aria-describedby={errors.email ? 'res-email-err' : undefined}
                  />
                  {errors.email && (
                    <span id="res-email-err" className="form-error">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Date Picker */}
                <div className="form-group">
                  <label htmlFor="res-date" className="form-label">
                    Date du Service <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" aria-hidden="true" />
                    <input
                      id="res-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`form-input has-icon ${errors.date ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.date && (
                    <span className="form-error">
                      <AlertCircle size={12} /> {errors.date}
                    </span>
                  )}
                </div>

                {/* Time Slot */}
                <div className="form-group">
                  <label htmlFor="res-time" className="form-label">
                    Horaire Souhaité <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon" aria-hidden="true" />
                    <select
                      id="res-time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={`form-input has-icon ${errors.time ? 'has-error' : ''}`}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value} style={{ background: '#101827', color: '#E8DFD0' }}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <span className="form-error">
                      <AlertCircle size={12} /> {errors.time}
                    </span>
                  )}
                </div>

                {/* Number of Guests */}
                <div className="form-group">
                  <label htmlFor="res-guests" className="form-label">
                    Nombre de Couverts <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Users size={16} className="input-icon" aria-hidden="true" />
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                      className="form-input has-icon"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num} style={{ background: '#101827', color: '#E8DFD0' }}>
                          {num} {num === 1 ? 'convive (table solo)' : 'convives'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Area Preference */}
                <div className="form-group">
                  <label htmlFor="res-seating" className="form-label">
                    Ambiance / Emplacement
                  </label>
                  <select
                    id="res-seating"
                    value={formData.seatingArea}
                    onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="main-dining" style={{ background: '#101827' }}>Salle Principale Romantique</option>
                    <option value="window-view" style={{ background: '#101827' }}>Table Fenêtre avec Vue Paris</option>
                    <option value="candlelight-alcove" style={{ background: '#101827' }}>Alcôve aux Chandelles</option>
                    <option value="private-salon" style={{ background: '#101827' }}>Salon Particulier (Sur demande)</option>
                  </select>
                </div>
              </div>

              {/* Dietary / Special Requests */}
              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label htmlFor="res-dietary" className="form-label">
                  Allergies, Régimes ou Notes Particulières (Facultatif)
                </label>
                <textarea
                  id="res-dietary"
                  rows={3}
                  maxLength={250}
                  placeholder="ex. Allergie aux fruits de mer, table souhaitée pour un anniversaire de mariage..."
                  value={formData.dietaryNotes}
                  onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Consent & Policies */}
              <div className="form-checkbox-row" style={{ marginTop: '1.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="checkbox-custom"
                  />
                  <span>
                    J’ai pris connaissance des conditions de réservation et je confirme comprendre que cette demande est exécutée en environnement de démonstration portfolio.
                  </span>
                </label>
                {errors.acceptedTerms && (
                  <span className="form-error" style={{ display: 'block', marginTop: '0.5rem' }}>
                    <AlertCircle size={12} /> {errors.acceptedTerms}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="reveal-on-scroll stagger-2" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glass-primary"
                  style={{ minWidth: '240px', height: '56px' }}
                >
                  {isSubmitting ? 'TRANSMISSION EN COURS...' : 'CONFIRMER LA DEMANDE DE RÉSERVATION'}
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Simulated View */
            <div className="confirmation-card" role="region" aria-label="Confirmation de démonstration">
              <div className="confirmation-icon-circle">
                <CheckCircle2 size={36} style={{ color: 'var(--color-gold)' }} />
              </div>

              <div className="section-label">DEMANDE SIMULÉE VALIDÉE</div>
              <h3 className="confirmation-title">Merci, {confirmation.guestName}</h3>
              <p className="confirmation-subtitle">
                Votre simulation de réservation a été enregistrée avec succès dans le navigateur.
              </p>

              <div className="confirmation-details-box">
                <div className="detail-row">
                  <span className="detail-label">Numéro de dossier Démo :</span>
                  <span className="detail-val" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{confirmation.referenceNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date retenue :</span>
                  <span className="detail-val">{confirmation.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Heure du service :</span>
                  <span className="detail-val">{confirmation.time}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Couverts :</span>
                  <span className="detail-val">{confirmation.guests} convives</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Emplacement :</span>
                  <span className="detail-val">{confirmation.seatingAreaName}</span>
                </div>
              </div>

              <div className="security-notice">
                <ShieldCheck size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>
                  Conformité et sécurité : Aucune donnée de carte bancaire n’est requise. Dans une version commerciale en production, un SMS ou e-mail de confirmation avec lien d’annulation sécurisé serait transmis.
                </span>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-glass-primary"
                  style={{ minWidth: '220px' }}
                >
                  EFFECTUER UNE AUTRE DEMANDE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .table-awaits-banner {
          position: relative;
          padding: 5rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(200, 168, 120, 0.2);
          border-bottom: 1px solid rgba(200, 168, 120, 0.2);
        }

        .banner-bg-img {
          position: absolute;
          inset: 0;
          background-image: url('/images/gallery/gallery-table.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(2px) brightness(0.35);
          transform: scale(1.05);
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(23, 36, 59, 0.7) 0%, rgba(16, 24, 39, 0.95) 100%);
        }

        .banner-headline {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 1rem;
          color: var(--color-ivory);
          text-transform: uppercase;
        }

        .banner-subtext {
          max-width: 620px;
          margin: 0 auto;
          font-size: 1.05rem;
          color: var(--color-ivory-dim);
          line-height: 1.7;
        }

        .reservation-wrapper {
          max-width: 840px;
          margin: 0 auto;
          background: rgba(16, 24, 39, 0.75);
          border: 1px solid rgba(200, 168, 120, 0.35);
          border-radius: 14px;
          padding: 2.75rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .demo-notice-bar {
          background: rgba(200, 168, 120, 0.08);
          border: 1px solid rgba(200, 168, 120, 0.3);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--color-ivory);
        }

        .demo-notice-bar strong {
          color: var(--color-gold);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-ivory);
        }

        .req {
          color: var(--color-gold);
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-silver);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 6px;
          background: rgba(23, 36, 59, 0.5);
          border: 1px solid rgba(232, 223, 208, 0.2);
          color: var(--color-ivory);
          font-family: var(--font-sans);
          font-size: 0.875rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input.has-icon {
          padding-left: 2.6rem;
        }

        .form-input:focus {
          border-color: var(--color-gold);
          outline: none;
          box-shadow: 0 0 10px rgba(200, 168, 120, 0.2);
        }

        .form-input.has-error {
          border-color: #f87171;
        }

        .form-error {
          font-size: 0.75rem;
          color: #f87171;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.8125rem;
          color: var(--color-ivory-dim);
          cursor: pointer;
          line-height: 1.6;
        }

        .checkbox-custom {
          margin-top: 3px;
          accent-color: var(--color-gold);
          width: 16px;
          height: 16px;
        }

        /* Confirmation Box */
        .confirmation-card {
          text-align: center;
          padding: 1.5rem 0;
        }

        .confirmation-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(200, 168, 120, 0.12);
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .confirmation-title {
          font-size: 2.25rem;
          color: var(--color-ivory);
          margin-bottom: 0.5rem;
        }

        .confirmation-subtitle {
          font-size: 1rem;
          color: var(--color-ivory-dim);
          margin-bottom: 2rem;
        }

        .confirmation-details-box {
          background: rgba(23, 36, 59, 0.5);
          border: 1px solid rgba(200, 168, 120, 0.25);
          border-radius: 8px;
          padding: 1.5rem;
          max-width: 480px;
          margin: 0 auto 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          text-align: left;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          border-bottom: 1px dashed rgba(232, 223, 208, 0.1);
          padding-bottom: 0.5rem;
        }

        .detail-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          color: var(--color-silver);
        }

        .detail-val {
          color: var(--color-ivory);
        }

        .security-notice {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 580px;
          margin: 0 auto;
          background: rgba(16, 24, 39, 0.5);
          border-left: 3px solid var(--color-gold);
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          color: var(--color-silver);
          text-align: left;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .reservation-wrapper {
            padding: 1.5rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

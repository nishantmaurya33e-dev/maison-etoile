import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { OurStory } from './sections/OurStory';
import { MenuPreview } from './sections/MenuPreview';
import { DiningExperience } from './sections/DiningExperience';
import { Gallery } from './sections/Gallery';
import { ReservationSection } from './sections/ReservationSection';
import { Footer } from './sections/Footer';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { GoldDivider } from './components/GoldDivider';
import { useScrollReveal } from './hooks/useScrollReveal';
import { X, Volume2, VolumeX, Sparkles, Film, Calendar } from 'lucide-react';
import { getAssetUrl } from './utils/assets';

export const App: React.FC = () => {
  useScrollReveal();
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);
  const [dishPreferenceForRes, setDishPreferenceForRes] = useState<string>('');
  const [storyVideoOpen, setStoryVideoOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReserveDish = (dishName: string) => {
    setDishPreferenceForRes(dishName);
    handleScrollToSection('reservations');
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && storyVideoOpen) {
        setStoryVideoOpen(false);
        stopAmbientAudio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [storyVideoOpen]);

  // Ambient sound synthesis using Web Audio API (warm Parisian candlelight chord)
  const startAmbientAudio = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      // Crucial for mobile iOS Safari & Android Chrome: AudioContext starts suspended
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Frequencies for a warm, gentle F-major add9 atmospheric chord (F, A, C, G)
      const freqs = [174.61, 220.0, 261.63, 392.0];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlayingAudio(true);
    } catch {
      // Audio autoplay gracefully handled
    }
  };

  const stopAmbientAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          oscillatorsRef.current.forEach((o) => {
            try { o.stop(); } catch {}
          });
          audioCtxRef.current?.close();
          oscillatorsRef.current = [];
          audioCtxRef.current = null;
          setIsPlayingAudio(false);
        }, 650);
      } else {
        setIsPlayingAudio(false);
      }
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAmbientAudio();
    } else {
      startAmbientAudio();
    }
  };

  return (
    <div className="maison-etoile-app">
      {/* Main Navigation */}
      <Navbar onOpenReservationModal={() => handleScrollToSection('reservations')} />

      {/* Main Landmark */}
      <main id="main-content" role="main">
        {/* Section B: Hero */}
        <Hero
          onExploreMenu={() => handleScrollToSection('menu')}
          onReserveTable={() => handleScrollToSection('reservations')}
          onWatchStory={() => setStoryVideoOpen(true)}
        />

        {/* Section Divider 1 */}
        <div className="container">
          <GoldDivider ornament="fleur" spacing="sm" />
        </div>

        {/* Section C: Our Story */}
        <OurStory onDiscoverMore={() => handleScrollToSection('experience')} />

        {/* Section Divider 2 */}
        <div className="container">
          <GoldDivider ornament="star" spacing="sm" />
        </div>

        {/* Section D: Menu Preview */}
        <MenuPreview onReserveDish={handleReserveDish} />

        {/* Section Divider 3 */}
        <div className="container">
          <GoldDivider ornament="diamond" spacing="sm" />
        </div>

        {/* Experiential Pillars */}
        <DiningExperience />

        {/* Section Divider 4 */}
        <div className="container">
          <GoldDivider ornament="star" spacing="sm" />
        </div>

        {/* Section E: Gallery */}
        <Gallery />

        {/* Section Divider 5 */}
        <div className="container">
          <GoldDivider ornament="fleur" spacing="sm" />
        </div>

        {/* Section F: Reservation Experience */}
        <ReservationSection initialDishPreference={dishPreferenceForRes} />
      </main>

      {/* Section G: Footer */}
      <Footer onOpenLegalDoc={(doc) => setActiveLegalDoc(doc)} />

      {/* Legal Policies Modal */}
      <LegalModal
        activeDoc={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* Cinematic Story Teaser Modal */}
      {storyVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Histoire cinématographique Maison Étoile"
          className="story-video-overlay"
          onClick={() => {
            setStoryVideoOpen(false);
            stopAmbientAudio();
          }}
        >
          <div
            className="story-video-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="story-video-close"
              onClick={() => {
                setStoryVideoOpen(false);
                stopAmbientAudio();
              }}
              aria-label="Fermer la vidéo (Échap)"
            >
              <X size={20} />
            </button>

            <div className="story-video-stage">
              <div className="video-hero-image-wrap">
                <img
                  src={getAssetUrl('images/hero/hero-cinematic.jpg')}
                  alt="Présentation cinématographique Maison Étoile"
                  className="video-stage-img"
                />
                <div className="video-badge-tag">
                  <Film size={14} style={{ color: 'var(--color-gold)' }} />
                  <span>COURT-MÉTRAGE DOCUMENTAIRE</span>
                </div>
              </div>

              <div className="story-video-content-banner">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold)' }}>
                    <Sparkles size={16} />
                    <span style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
                      IMMERSION CINÉMATOGRAPHIQUE
                    </span>
                  </div>

                  {/* Ambient sound toggle button */}
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className="audio-toggle-btn"
                    aria-label={isPlayingAudio ? 'Couper l\'ambiance sonore' : 'Activer l\'ambiance sonore'}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Volume2 size={15} style={{ color: 'var(--color-gold)' }} />
                        <span className="sound-wave-bars" aria-hidden="true">
                          <span className="bar" />
                          <span className="bar" />
                          <span className="bar" />
                        </span>
                        <span>Son activé</span>
                      </>
                    ) : (
                      <>
                        <VolumeX size={15} />
                        <span>Activer l'ambiance sonore</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                  L'Âme de Maison Étoile
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-ivory-dim)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '650px' }}>
                  De l'aube au marché de Rungis jusqu'au coup de feu en cuisine sous la lueur des chandeliers parisiens, vivez 24 heures aux côtés de notre brigade. Un hommage vibrant au geste, à l'émotion et à l'art de recevoir.
                </p>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setStoryVideoOpen(false);
                      stopAmbientAudio();
                      handleScrollToSection('reservations');
                    }}
                    className="btn-glass-primary"
                    style={{ minWidth: '190px', height: '48px', fontSize: '0.75rem' }}
                  >
                    RÉSERVER L'EXPÉRIENCE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStoryVideoOpen(false);
                      stopAmbientAudio();
                      handleScrollToSection('menu');
                    }}
                    className="btn-secondary"
                    style={{ height: '48px', padding: '0 1.5rem', fontSize: '0.75rem' }}
                  >
                    EXPLORER LA CARTE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Quick Reservation Button */}
      <div className="mobile-floating-reserve-bar">
        <button
          type="button"
          onClick={() => handleScrollToSection('reservations')}
          className="btn-glass-primary mobile-fab-reserve"
          aria-label="Réserver une table rapidement"
        >
          <Calendar size={15} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
          <span>RÉSERVER UNE TABLE</span>
        </button>
      </div>

      <style>{`
        .story-video-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 25, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 250;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: subtleFadeIn 0.3s ease;
        }

        .story-video-card {
          max-width: 820px;
          width: 100%;
          background: #17243B;
          border: 1px solid var(--color-gold);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        }

        .story-video-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 20;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(16, 24, 39, 0.85);
          border: 1px solid var(--color-gold-border);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .story-video-close:hover {
          background: var(--color-gold);
          color: #101827;
        }

        .video-hero-image-wrap {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          background: #000;
        }

        .video-stage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .video-badge-tag {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 24, 39, 0.85);
          backdrop-filter: blur(10px);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(200, 168, 120, 0.35);
          font-size: 0.6875rem;
          letter-spacing: 0.14em;
          color: var(--color-ivory);
        }

        .story-video-content-banner {
          padding: 2.25rem;
          background: linear-gradient(180deg, #17243B 0%, #101827 100%);
        }

        .audio-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-pill);
          background: rgba(23, 36, 59, 0.8);
          border: 1px solid rgba(200, 168, 120, 0.35);
          color: var(--color-ivory);
          font-size: 0.75rem;
          font-family: var(--font-sans);
          transition: all var(--transition-fast);
        }

        .audio-toggle-btn:hover {
          border-color: var(--color-gold);
          background: rgba(200, 168, 120, 0.15);
        }

        .sound-wave-bars {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          height: 12px;
        }

        .sound-wave-bars .bar {
          width: 2px;
          height: 100%;
          background: var(--color-gold);
          border-radius: 1px;
          animation: wavePulse 1s ease-in-out infinite;
        }

        .sound-wave-bars .bar:nth-child(2) {
          animation-delay: 0.2s;
          height: 60%;
        }

        .sound-wave-bars .bar:nth-child(3) {
          animation-delay: 0.4s;
          height: 80%;
        }

        @keyframes wavePulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        @media (max-width: 600px) {
          .video-hero-image-wrap {
            height: 220px;
          }
          .story-video-content-banner {
            padding: 1.5rem;
          }
        }

        .mobile-floating-reserve-bar {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-floating-reserve-bar {
            display: flex;
            position: fixed;
            bottom: 18px;
            right: 18px;
            left: 18px;
            z-index: 85;
            justify-content: center;
            pointer-events: none;
          }
          .mobile-fab-reserve {
            pointer-events: auto;
            width: 100%;
            max-width: 340px;
            height: 52px;
            background: linear-gradient(135deg, rgba(23, 36, 59, 0.95) 0%, rgba(200, 168, 120, 0.28) 100%);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8), 0 0 18px rgba(200, 168, 120, 0.35);
            font-size: 0.75rem;
            letter-spacing: 0.16em;
          }
        }
      `}</style>
    </div>
  );
};

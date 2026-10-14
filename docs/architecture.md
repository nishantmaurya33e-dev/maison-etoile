# Architecture Overview — Maison Étoile

## 1. Executive Architecture Summary
Maison Étoile is engineered as a high-performance, single-page application (SPA) optimized for visual luxury, responsiveness, and zero unnecessary dependencies.

```
+-----------------------------------------------------------------------+
|                             USER CLIENT                               |
|              (Desktop 1440px / Tablet 768px / Mobile 390px)           |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    MAISON ÉTOILE FRONTEND LAYER                      |
|                                                                       |
|  [ Navbar + BrandMark ]      [ Hero + Glass Capsule Button ]           |
|  [ OurStory ]                [ MenuPreview + Filter + Modals ]        |
|  [ DiningExperience ]        [ Gallery + Keyboard Lightbox ]          |
|  [ Reservation Engine (Demo) [ Footer + Legal Suite Modal ]           |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    DESIGN SYSTEM & TOKENS LAYER                       |
|  - Variables.css: #17243B, #101827, #E8DFD0, #C8A878, #583B46, etc.   |
|  - Global.css: Glassmorphism (.btn-glass-primary), Fluid Breakpoints  |
|  - Editorial Fonts: Cormorant Garamond & Montserrat                   |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                     FUTURE BACKEND ADAPTER LAYER                      |
|  - REST / GraphQL Adapter (OpenTable, SevenRooms, or Custom Express)  |
|  - PCI-DSS Tokenized Payment (Stripe / Adyen)                         |
|  - Rate Limiting, CORS, and SameSite=Strict CSRF Protection           |
+-----------------------------------------------------------------------+
```

## 2. Directory Structure Breakdown
```
Maison-Etoile/
├── public/
│   ├── favicon.svg              # 8-point gold star brand motif
│   ├── robots.txt               # Crawler directives with staging disallow
│   └── images/
│       ├── hero/                # Cinematic hero photography
│       ├── story/               # Paris dining room interior
│       ├── dishes/              # 4 Signature dishes (Velouté, Bar, Bœuf, Tatin)
│       └── gallery/             # Sommelier, Candlelit tables, Paris dusk, Chef art
├── src/
│   ├── components/
│   │   ├── BrandMark.tsx        # Vector crest and refined serif wordmark
│   │   ├── Navbar.tsx           # Glass header with mobile drawer
│   │   └── LegalModal.tsx       # In-app draft policy reader
│   ├── sections/
│   │   ├── Hero.tsx             # Cinematic hero section with glass capsule button
│   │   ├── OurStory.tsx         # Heritage and philosophy
│   │   ├── MenuPreview.tsx      # Signature dishes with modal details
│   │   ├── DiningExperience.tsx # 3 Pillars (Fine dining, Wine, Private)
│   │   ├── Gallery.tsx          # Editorial gallery with keyboard lightbox
│   │   ├── ReservationSection.tsx # Form validation and demo confirmation
│   │   └── Footer.tsx           # Contact, hours, social, and legal triggers
│   ├── styles/
│   │   ├── variables.css        # Centralized tokens (colors, font, radii)
│   │   └── global.css           # Resets, glassmorphism, responsive utilities
│   ├── types/
│   │   └── index.ts             # Strict TypeScript models
│   ├── data/
│   │   └── restaurantData.ts    # Curated dishes and gallery data
│   ├── App.tsx                  # Root orchestration component
│   └── main.tsx                 # React entry point
├── tests/
│   └── site.test.mjs            # Automated verification test suite
├── docs/                        # Complete technical and legal documentation
├── README.md                    # Project introduction and quickstart
├── SETUP.md                     # Installation and deployment runbook
├── SECURITY.md                  # Security policies and threat model
└── .env.example                 # Sanitized environment template
```

## 3. Design Token Specifications
- **Button Dimension:** 220 × 56 px on desktop with a corner radius of `28px` (yielding 100% circular ends).
- **Glassmorphism Backdrop:** `backdrop-filter: blur(14px)` with `-webkit-backdrop-filter` vendor support and a solid background fallback for legacy engines.
- **Fluid Typography:** CSS `clamp(min, preferred, max)` scales smoothly between mobile viewport (360px) and wide desktop (1440px+).

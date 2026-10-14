# Accessibility Statement (Déclaration d'Accessibilité) — WCAG 2.2 AA

Maison Étoile strives to provide an inclusive digital environment that reflects the welcoming hospitality of our dining room.

---

## 1. Conformance Target
This website is built with the engineering objective of conforming to **WCAG 2.2 Level AA** standards.

## 2. Implemented Accessibility Features
1. **Perceivable:**
   - Text color contrast ratios meet or exceed 4.5:1 for standard body text and 3:1 for large display titles against our `#17243B` and `#101827` foundations.
   - Descriptive `alt` attributes accompany all dish and gallery imagery.
   - Information and hierarchy are communicated through semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
2. **Operable:**
   - Full keyboard navigation across all interactive components.
   - High-contrast visible focus indicators (`:focus-visible` with 2px gold outline and offset).
   - Gallery Lightbox supports `Escape` to close and arrow navigation.
   - Mobile navigation drawer traps focus and provides an accessible toggle button with `aria-expanded` and `aria-controls`.
3. **Understandable:**
   - Form inputs possess explicit `<label>` associations and actionable validation errors.
   - Language declared as French (`lang="fr-FR"`) with semantic markup.
4. **Robust:**
   - Respects user motion preferences via `@media (prefers-reduced-motion: reduce)`.
   - Responsive layouts prevent horizontal scrolling on all viewports from 360px up to 1440px+.

## 3. Feedback & Contact
If you encounter any accessibility barrier, please reach out to our digital team:
- **Email:** `accessibility@maisonetoile.example`

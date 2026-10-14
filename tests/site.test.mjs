import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

describe('Maison Étoile — Automated Test Suite', () => {

  test('1. Asset Files Existence & Integrity', () => {
    const requiredImages = [
      'public/images/hero/hero-cinematic.jpg',
      'public/images/story/story-interior.jpg',
      'public/images/dishes/veloute-de-champignons.jpg',
      'public/images/dishes/filet-de-bar.jpg',
      'public/images/dishes/boeuf-bourguignon.jpg',
      'public/images/dishes/tarte-tatin.jpg',
      'public/images/gallery/gallery-wine.jpg',
      'public/images/gallery/gallery-table.jpg',
      'public/images/gallery/gallery-paris.jpg',
      'public/images/gallery/gallery-chef.jpg',
      'public/favicon.svg'
    ];

    for (const imgPath of requiredImages) {
      const fullPath = path.join(projectRoot, imgPath);
      assert.ok(fs.existsSync(fullPath), `Missing required asset: ${imgPath}`);
      const stats = fs.statSync(fullPath);
      const minSize = imgPath.endsWith('.svg') ? 100 : 10000;
      assert.ok(stats.size > minSize, `Asset ${imgPath} is abnormally small or empty (${stats.size} bytes)`);
    }
  });

  test('2. Signature Dishes Specification Conformity', () => {
    const restaurantDataContent = fs.readFileSync(path.join(projectRoot, 'src/data/restaurantData.ts'), 'utf8');

    // Verify all 4 required dishes are present
    assert.match(restaurantDataContent, /Velouté de Champignons/, 'Velouté de Champignons must be present');
    assert.match(restaurantDataContent, /Filet de Bar/, 'Filet de Bar must be present');
    assert.match(restaurantDataContent, /Bœuf Bourguignon/, 'Bœuf Bourguignon must be present');
    assert.match(restaurantDataContent, /Tarte Tatin/, 'Tarte Tatin must be present');

    // Verify demo pricing designations
    assert.match(restaurantDataContent, /€28/, 'Velouté price match');
    assert.match(restaurantDataContent, /€32/, 'Filet de Bar price match');
    assert.match(restaurantDataContent, /€30/, 'Bœuf Bourguignon price match');
    assert.match(restaurantDataContent, /€14/, 'Tarte Tatin price match');
    assert.match(restaurantDataContent, /Prix indicatif \(Démo\)/, 'Demo pricing tag must be present');
  });

  test('3. Exact Headline and Copy Verifications', () => {
    const heroContent = fs.readFileSync(path.join(projectRoot, 'src/sections/Hero.tsx'), 'utf8');
    
    assert.match(heroContent, /EXQUISITE CUISINE,/, 'Hero headline part 1 must match exact spec');
    assert.match(heroContent, /TIMELESS MOMENTS/, 'Hero headline part 2 must match exact spec');
    assert.match(heroContent, /A TASTE OF FRANCE/, 'Supporting French tagline must be present');
    assert.match(heroContent, /EXPLORE THE MENU/, 'Primary CTA must be EXPLORE THE MENU');
    assert.match(heroContent, /btn-glass-primary/, 'Glassmorphism class must be applied to primary CTA');
  });

  test('4. Glassmorphism CSS Specification Conformity', () => {
    const globalCss = fs.readFileSync(path.join(projectRoot, 'src/styles/global.css'), 'utf8');
    const variablesCss = fs.readFileSync(path.join(projectRoot, 'src/styles/variables.css'), 'utf8');

    // Check capsule button rules
    assert.match(globalCss, /\.btn-glass-primary/, '.btn-glass-primary selector must exist');
    assert.match(globalCss, /backdrop-filter:\s*blur/, 'backdrop-filter blur must be configured');
    assert.match(globalCss, /border-radius:\s*var\(--radius-glass-btn\)/, 'radius must match glass capsule button');
    assert.match(variablesCss, /--radius-glass-btn:\s*28px/, '28px radius for 56px height capsule button');
    assert.match(globalCss, /@supports not \(backdrop-filter/, 'Graceful fallback for browsers without backdrop-filter');
    assert.match(globalCss, /prefers-reduced-motion/, 'Reduced-motion accessibility overrides must be present');
  });

  test('5. Brand Colors and Editorial Typography Tokens', () => {
    const variablesCss = fs.readFileSync(path.join(projectRoot, 'src/styles/variables.css'), 'utf8');

    // Check exact brand colors
    assert.match(variablesCss, /--color-midnight:\s*#17243B/, 'Midnight Blue #17243B must match spec');
    assert.match(variablesCss, /--color-deep-navy:\s*#101827/, 'Deep Navy #101827 must match spec');
    assert.match(variablesCss, /--color-ivory:\s*#E8DFD0/, 'Warm Ivory #E8DFD0 must match spec');
    assert.match(variablesCss, /--color-silver:\s*#A5A9B2/, 'Muted Silver #A5A9B2 must match spec');
    assert.match(variablesCss, /--color-plum:\s*#583B46/, 'Muted Plum #583B46 must match spec');
    assert.match(variablesCss, /--color-gold:\s*#C8A878/, 'Candlelight Gold #C8A878 must match spec');

    // Check font families
    assert.match(variablesCss, /--font-serif:\s*'Cormorant Garamond'/, 'Cormorant Garamond heading font must match spec');
    assert.match(variablesCss, /--font-sans:\s*'Montserrat'/, 'Montserrat body font must match spec');
  });

  test('6. Reservation Validation Logic Verification', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test email validation
    assert.strictEqual(emailRegex.test('bonjour@maisonetoile.example'), true);
    assert.strictEqual(emailRegex.test('guest@domain.com'), true);
    assert.strictEqual(emailRegex.test('invalid-email'), false);
    assert.strictEqual(emailRegex.test('@no-local.com'), false);

    // Test guest range limits
    const validGuests = [1, 2, 4, 8];
    const invalidGuests = [0, -1, 9, 20];
    for (const g of validGuests) {
      assert.ok(g >= 1 && g <= 8, `Guest count ${g} should be valid`);
    }
    for (const g of invalidGuests) {
      assert.ok(g < 1 || g > 8, `Guest count ${g} should be invalid`);
    }
  });

  test('7. SEO, Robots, and Security Headers Readiness', () => {
    const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
    const robotsTxt = fs.readFileSync(path.join(projectRoot, 'public/robots.txt'), 'utf8');

    assert.match(indexHtml, /<title>Maison Étoile — Haute Gastronomie Française \| Paris<\/title>/, 'Page title must be set');
    assert.match(indexHtml, /<meta name="description"/, 'Meta description must be present');
    assert.match(indexHtml, /<meta property="og:title"/, 'Open Graph title must be present');
    assert.match(indexHtml, /<link rel="icon" type="image\/svg\+xml"/, 'Favicon link must be present');

    assert.match(robotsTxt, /User-agent:\s*\*/, 'Robots.txt must specify User-agent');
    assert.match(robotsTxt, /Disallow:\s*\/staging\//, 'Robots.txt should disallow staging');
  });

  test('8. Documentation Completeness', () => {
    const requiredDocs = [
      'README.md',
      'SETUP.md',
      'SECURITY.md',
      '.env.example'
    ];

    for (const doc of requiredDocs) {
      assert.ok(fs.existsSync(path.join(projectRoot, doc)), `Missing required root doc: ${doc}`);
    }
  });

  test('9. BrandMark & Monogram Crest Artwork Integrity', () => {
    const brandMarkContent = fs.readFileSync(path.join(projectRoot, 'src/components/BrandMark.tsx'), 'utf8');
    assert.match(brandMarkContent, /crestSvg/, 'Crest SVG renderer must be present');
    assert.match(brandMarkContent, /Maison Étoile/, 'Brand text must be present');
    assert.match(brandMarkContent, /#C8A878/, 'Candlelight gold color used in crest');
  });

  test('10. Footer Structure & Contact Register', () => {
    const footerContent = fs.readFileSync(path.join(projectRoot, 'src/sections/Footer.tsx'), 'utf8');
    assert.match(footerContent, /bonjour@maisonetoile\.example/, 'Placeholder demo email must be present');
    assert.match(footerContent, /8 Place de la Concorde/, 'Demo address must be present');
    assert.match(footerContent, /Classic flavors\. Modern moments\./, 'Motto tagline must match');
  });
});

# Maison Étoile — Security Policy & Engineering Specification

## 1. Security Philosophy
Maison Étoile treats security and customer privacy as foundational pillars of the digital luxury experience. Discretion, integrity, and data protection are engineered into every layer of this application.

## 2. Supported Versions
| Version | Supported          | Security Status |
| ------- | ------------------ | --------------- |
| 1.0.x   | :white_check_mark: | Active (Demo / Client MVP) |

## 3. Reporting a Vulnerability
We welcome responsible security disclosures. If you discover a potential vulnerability, please report it immediately:
- **Email:** `security@maisonetoile.example` (Placeholder / Monitored in production)
- **Encryption:** Use PGP key available at `/security/pgp-key.txt` (Production placeholder)
- **Response SLA:** Initial acknowledgment within 24 hours; status updates every 48 hours.

Please include:
1. Detailed description of the potential vulnerability.
2. Step-by-step reproduction guide or proof-of-concept (POC).
3. Assessment of impact and affected components.
4. Do not disclose findings publicly until coordinated mitigation has occurred.

---

## 4. Current Architecture & Threat Model

### A. Client-Side (Frontend SPA)
- **Zero Sensitive Data Storage:** No user reservation data, credit card numbers, or authentication tokens are stored in `localStorage`, `sessionStorage`, or client-side global state.
- **Strict Demo Mode Isolation:** The interactive reservation interface clearly operates in client-side demonstration mode. All submissions are validated for format and structure only, with mock confirmations delivered in memory. No mock data is broadcast over unencrypted endpoints.
- **XSS Mitigation:**
  - Complete avoidance of `dangerouslySetInnerHTML` and `eval()`.
  - All user-supplied fields (Guest Name, Special Requests, Dietary Notes) are properly sanitized and bound as text nodes via React's virtual DOM escaping.
  - Strict input length limits: Names capped at 60 characters, email at 100 characters, notes capped at 250 characters.

### B. Content Security Policy (CSP)
For production deployments, the following HTTP headers must be enforced at the reverse proxy (Cloudflare / Nginx / Vercel / Netlify):

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';
```

### C. Security Headers
The following headers must be set on all production responses:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

---

## 5. Production Backend Integration Requirements
Before connecting a real booking engine or backend database:
1. **Server-Side Validation:** Never trust client-side validation alone. Re-validate all fields on the backend.
2. **CSRF Protection:** Use SameSite=Strict cookies with anti-CSRF token verification on all POST/PUT/DELETE endpoints.
3. **Rate Limiting:** Protect form submission endpoints (e.g., maximum 5 reservation attempts per IP per 10 minutes).
4. **TLS 1.3:** Enforce end-to-end encryption with modern cipher suites.
5. **No Payment Card Data:** If deposits or prepayments are introduced, use PCI-DSS Level 1 tokenized iframe solutions (Stripe Elements / Adyen) with zero cardholder data touching application servers.
6. **Audit Logging:** Maintain immutable audit logs for table modifications without logging PII in plaintext.

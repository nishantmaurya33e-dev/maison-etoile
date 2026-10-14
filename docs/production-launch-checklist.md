# Production Launch & Compliance Checklist

## 1. Domain & DNS Configuration
- [ ] Connect custom production domain (`maisonetoile.paris` or `maisonetoile.fr`).
- [ ] Ensure DNS CAA records specify permitted certificate authorities (e.g., Let's Encrypt, DigiCert).
- [ ] Verify DNSSEC is enabled at registrar level.

## 2. Infrastructure & Headers
- [ ] Enforce HTTPS with TLS 1.3 only; verify HSTS header (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).
- [ ] Configure `Content-Security-Policy` header in accordance with `SECURITY.md`.
- [ ] Verify `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff`.
- [ ] Configure custom 404 and 500 error pages adhering to luxury brand aesthetic.

## 3. Booking Engine Integration
- [ ] Transition from client-side demo mode to certified reservation API (OpenTable, SevenRooms, or custom GraphQL microservice).
- [ ] Implement server-side phone number validation and automated SMS confirmation.
- [ ] Configure transactional email provider with SPF, DKIM, and DMARC alignment.

## 4. Legal & Regulatory Finalization
- [ ] Replace placeholder company name and SIRET / RCS registration numbers in `docs/privacy-policy-draft.md` and `docs/terms-of-use-draft.md`.
- [ ] Appoint official Data Protection Officer (DPO) and file registry with the French CNIL if required.
- [ ] Finalize restaurant cancellation penalty disclosures with merchant acquirer.

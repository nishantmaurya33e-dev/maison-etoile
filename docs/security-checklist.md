# Production Security Checklist — Maison Étoile

This checklist establishes mandatory criteria to be reviewed and verified prior to connecting real customer data, live payments, or public production domains.

## Pre-Launch Verification Matrix

| Category | Security Control | Current Demo Status | Production Requirement |
|---|---|---|---|
| **Frontend** | Input Sanitization (XSS) | ✅ Implemented via React DOM escaping | Maintain strict character limits |
| **Frontend** | Sensitive Data Storage | ✅ Verified (No PII in LocalStorage) | Enforce no persistent client secrets |
| **Frontend** | Content Security Policy | 📋 Header drafted in SECURITY.md | Deploy with reverse proxy |
| **Frontend** | Clickjacking Defense | 📋 Header `X-Frame-Options: DENY` | Enforce on web server |
| **Backend** | Server-side Validation | ⚠️ Not Applicable (Demo Client) | Re-validate all fields on server |
| **Backend** | Endpoint Rate Limiting | ⚠️ Not Applicable (Demo Client) | Max 5 submissions / 10m per IP |
| **Backend** | CSRF Protection | ⚠️ Not Applicable (Demo Client) | Enforce SameSite=Strict cookies + tokens |
| **Transport** | TLS 1.3 / HTTPS | ⚠️ Local HTTP development | Enforce HSTS with A+ SSL score |
| **Payments** | Cardholder Data Isolation | ✅ No card fields implemented | PCI-DSS Level 1 tokenized provider |
| **Privacy** | GDPR Compliance | 📋 Draft documents created | Qualified legal review required |

## Environment Variable Audit
- No frontend build secrets are embedded in the bundle.
- `.env.example` provides placeholders for all operational flags.
- Any upcoming booking service API keys must strictly reside on the backend.

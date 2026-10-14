# Security & Incident Response Runbook

## 1. Objective & Scope
This runbook provides actionable procedures for detecting, triaging, mitigating, and documenting security incidents affecting the Maison Étoile web application and future booking infrastructure.

## 2. Severity Classification Matrix
- **SEV-1 (Critical):** Data breach involving personal dining records, active site defacement, denial of service impacting reservations. (Response SLA: < 15 minutes)
- **SEV-2 (High):** Suspected unauthorized API access attempts, persistent XSS vulnerability report, compromised staging credentials. (Response SLA: < 2 hours)
- **SEV-3 (Moderate):** Minor configuration drift, non-exploitable advisory in development dependencies. (Response SLA: < 24 hours)

## 3. Incident Lifecycle Phases

```
+---------------+     +---------------+     +---------------+     +---------------+
| 1. DETECTION  | --> | 2. ISOLATION  | --> | 3. MITIGATION | --> | 4. DISCLOSURE |
| & TRIAGE      |     | & CONTAINMENT |     | & ERADICATION |     | & POST-MORTEM |
+---------------+     +---------------+     +---------------+     +---------------+
```

### Phase 1: Detection & Triage
- Alert notifications triggered via Cloudflare WAF or reverse proxy rate limit threshold alarms.
- On-call engineer gathers request IDs, affected URLs, and IP ranges.

### Phase 2: Isolation & Containment
- Place the affected endpoint into maintenance mode or enable Cloudflare "Under Attack" mode.
- Invalidate compromised session tokens or rotate database connection secrets.

### Phase 3: Mitigation & Eradication
- Deploy emergency patch to main repository.
- Verify through automated test suite (`npm test`) and staging validation.

### Phase 4: Regulatory Disclosure & Post-Mortem
- If personal data was compromised, notify the French CNIL within 72 hours under GDPR Article 33.
- Notify impacted individuals without undue delay under GDPR Article 34.
- Conduct a root-cause retrospective and document remediations.

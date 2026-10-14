# Maison Étoile — Setup, Environment & Deployment Guide

## 1. Local Development Environment

### Prerequisites
- **Node.js**: v18.x or v20.x LTS (Recommended)
- **NPM**: v9.x or v10.x
- **Modern Browser**: Chrome, Edge, Safari, or Firefox with backdrop-filter support.

### Step-by-Step Installation

```bash
# 1. Clone repository
git clone <repository-url> maison-etoile
cd maison-etoile

# 2. Create environment configuration
copy .env.example .env

# 3. Install packages
npm install

# 4. Start Vite local dev server
npm run dev
# The site is accessible at: http://localhost:5173
```

---

## 2. Production Build

To build the optimized static assets:
```bash
npm run build
```
This performs:
1. `tsc`: TypeScript type-checking without emitting files.
2. `vite build`: Tree-shaking, CSS minification, asset hash generation into `dist/`.

To test the build locally before publishing:
```bash
npm run preview
```

---

## 3. Deployment Targets

### A. Vercel
1. Connect repository to Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Set environment variables from `.env.example`.

### B. Netlify
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=()"
```

### C. Nginx / Docker
Sample Nginx server block:
```nginx
server {
    listen 443 ssl http2;
    server_name maisonetoile.example;

    ssl_certificate /etc/letsencrypt/live/maisonetoile.example/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/maisonetoile.example/privkey.pem;

    root /var/www/maison-etoile/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

# BEM FILKOM UNIDA - Website Resmi

Website resmi Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda dengan Kabinet Neogenesis.

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7.1-F7B84B?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-6.30-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix_UI-1.x-000000?style=for-the-badge&logo=radix-ui&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-5.1-404D59?style=for-the-badge&logo=express&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-20+-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0-00D4AA?style=for-the-badge&logo=nodemailer&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-2.8-4A90E2?style=for-the-badge&logo=cors&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-3.6-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-8.x-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-3.2-FFD700?style=for-the-badge&logo=vitest&logoColor=black) ![PostCSS](https://img.shields.io/badge/PostCSS-8.5-DC3C00?style=for-the-badge&logo=postcss&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Fitur Utama
- **Visual Effects**: Plexus/particles dengan tsParticles, cursor glow, animasi reveal dengan Framer Motion, glass morphism.
- **Responsive Design**: Adaptif untuk semua layar, mobile-first, touch-friendly dengan Embla Carousel.
- **UI/UX**: Desain clean minimalis, animasi smooth, hover effects, dark/light themes (Next Themes), aksesibilitas, toast notifications (Sonner).
- **Teknis**: SSR dengan Vite, TypeScript, Tailwind CSS, React Router, form validation (Zod + React Hook Form), email (@emailjs/browser + Nodemailer), data fetching (React Query), icons (Lucide React).

## Tech Stack
### Frontend
- React 18: UI Framework
- TypeScript 5.9: Type Safety
- Vite 7.1: Build Tool
- Tailwind CSS 3.4 + Animate: Styling
- Framer Motion 12.23: Animasi
- React Router DOM 6.30: Routing
- Radix UI 1.x: Komponen UI (Dialog, Tabs, Toast, Tooltip, dll.)
- tsParticles 2.12: Particles Effects
- React Query 5.84: Data Fetching
- React Hook Form 7.62 + Zod 3.25: Forms & Validation
- Sonner 1.7: Toasts
- Embla Carousel 8.6: Sliders
- Lucide React 0.539: Icons
- Next Themes 0.4: Themes
- React Intersection Observer 9.16: Visibility Detection
- Vaul 1.1: Drawers
- CMDK 1.1: Command Menus
- Class Variance Authority + clsx + Tailwind Merge: Utility Classes

### Backend
- Express.js 5.1: Web Framework
- Node.js 20+: Runtime
- Nodemailer 7.0: Email Server
- @emailjs/browser 4.4: Email Client
- CORS 2.8: Cross-Origin
- dotenv 17.2: Env Vars

### Tools
- Prettier 3.6: Formatting
- ESLint 8.x: Linting
- Vitest 3.2: Testing
- PostCSS 8.5 + Autoprefixer: CSS Processing
- SWC: Compiler
- TypeScript Compiler (tsc): Type Check
- serverless-http 3.2: Serverless Support
- date-fns 4.1: Date Utils
- react-day-picker 9.8: Date Picker

## Struktur Proyek
```
bem-filkom-unida-website/
├── client/          # Frontend (jika terpisah, tapi sebenarnya monorepo dengan Vite)
│   ├── components/  # Komponen reusable (Radix, UI, Effects)
│   ├── pages/       # Halaman
│   ├── hooks/       # Custom hooks (Query, Intersection)
│   ├── lib/         # Utilities (Utils, Validation)
│   └── global.css   # Styles global (Tailwind)
├── server/          # Backend (Vite build)
│   ├── routes/      # API routes (Express)
│   └── lib/         # Utilities server (Email, Env)
├── public/          # Assets statis
├── shared/          # Kode bersama (jika ada)
├── vite.config.ts  # Vite config utama
├── vite.config.server.ts # Server config
└── dist/            # Build output (spa/ untuk client, server/ untuk backend)
```

## Instalasi & Setup
### Persyaratan
- Node.js 20+
- pnpm 10.14 (recommended)

### Langkah
1. Clone repo:
   ```bash
   git clone <repository-url>
   cd bem-filkom-unida-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # Atau npm install
   ```

3. Setup `.env` di root:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=admin@bemfilkom.com
   PORT=3000
   NODE_ENV=development
   # Tambah jika perlu: VITE_API_URL, EMAILJS_SERVICE_ID, dll.
   ```

4. Jalankan dev server:
   ```bash
   pnpm dev
   # Atau npm run dev
   ```

5. Build production:
   ```bash
   pnpm build
   pnpm start
   ```

## Halaman & Fitur
- **Homepage**: Hero dengan foto kabinet, particles background, timeline program (Embla), info beasiswa, visi-misi.
- **About**: Kata pengantar, profil ketua (dengan tabs Radix), sejarah BEM.
- **Divisions**: Info divisi dengan cards animasi, profil (accordion/drawer Vaul).
- **Gallery**: Galeri foto kegiatan (carousel Embla), dokumentasi, integrasi media sosial.
- **Contact**: Form kontak dengan validasi (React Hook Form + Zod), email integration, date picker jika perlu.

## Customization
### Warna & Themes
Ubah di `global.css` atau Tailwind config:
```css
:root {
  --primary: 190 58% 58%;    /* Cyan */
  --secondary: 200 62% 42%;  /* Teal */
  --accent: 28 75% 62%;      /* Orange */
  --background: 200 48% 24%; /* Dark Blue */
}
```
Gunakan Next Themes untuk switch dark/light.

### Particles Effect (tsParticles)
Di komponen effects (misal Index.tsx):
```tsx
<Particles
  id="tsparticles"
  options={{
    particles: {
      number: { value: 60 },
      links: { distance: 100 },
      move: { speed: 0.3 },
      color: { value: ['#6BC8E2', '#4BB4D2', '#E6944E'] }
    }
  }}
/>
```

## Scripts
```bash
pnpm dev          # Dev server (Vite)
pnpm build        # Build client + server
pnpm build:client # Build frontend only
pnpm build:server # Build backend only
pnpm start        # Production server (node dist/server/node-build.mjs)
pnpm test         # Run tests (Vitest)
pnpm format.fix   # Format code (Prettier)
pnpm typecheck    # Type check (tsc)
```

## Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Deployment
### Netlify
- Build: `pnpm build`
- Publish: `dist/spa`
- Set env vars di dashboard.

### Vercel
- Framework: Vite
- Build: `pnpm build`
- Output: `dist/spa`
- Serverless: Gunakan serverless-http untuk API.

### Manual/Serverless
- Build: `pnpm build`
- Upload `dist/`
- `pnpm install --prod`
- Start: `pnpm start`
- Dukung serverless dengan serverless-http.

## Troubleshooting
- **Email gagal**: Gunakan App Password Gmail, cek `.env` dan EmailJS keys.
- **Build error**: Hapus `node_modules` dan `dist`, `pnpm install`.
- **Particles hilang**: Cek console, import tsParticles benar, pastikan canvas visible.
- **Performance lambat**: Kurangi particles number, gunakan React Query caching, reduced motion.
- **Type errors**: Jalankan `pnpm typecheck`, update @types.

## Contributing
1. Fork repo.
2. Buat branch: `git checkout -b feature/nama`.
3. Commit: `git commit -m 'Deskripsi'`.
4. Push: `git push origin feature/nama`.
5. Buat PR.

## License
MIT License - lihat [LICENSE](LICENSE).

## Tim Development
- Frontend: React, TypeScript, Tailwind, Radix, Framer.
- Backend: Express 5, Node, Nodemailer, EmailJS.
- UI/UX: Glass morphism, themes, animations.
- Tools: Vite, pnpm, Vitest.

## Support
- Email: bem.filkom@unida.ac.id
- GitHub Issues: [Issues](https://github.com/aliimndev/bem-filkom-unida/issues)

---

**BEM FILKOM UNIDA** - Menumbuhkan Generasi Baru, Mewujudkan Inovasi Nyata.

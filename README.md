# BEM FILKOM UNIDA - Official Website

Official website of the Executive Board of Students, Faculty of Computer Science, Universitas Djuanda (Kabinet Neogenesis).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
bemfilkom-app/
├── src/
│   ├── app/          # Next.js App Router pages & layouts
│   ├── components/   # Reusable UI components
│   │   ├── effects/  # Animation components
│   │   ├── home/     # Home page specific components
│   │   ├── layout/   # Layout components (Header, Footer)
│   │   └── ui/       # Base UI components
│   ├── data/         # Static data files
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utilities & helper functions
├── public/           # Static assets (images, music)
└── ...config files
```

## Getting Started

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Run development server:**
   ```bash
   bun dev
   ```

3. **Build for production:**
   ```bash
   bun run build
   ```

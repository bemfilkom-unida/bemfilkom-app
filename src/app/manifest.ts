import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BEM FILKOM UNIDA',
    short_name: 'BEM FILKOM',
    description: 'Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#1c749f',
    theme_color: '#6BC8E2',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo/icon-bem.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/logo/icon-bem.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}

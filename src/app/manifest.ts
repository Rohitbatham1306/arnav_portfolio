import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arnav Roy - Portfolio & Services',
    short_name: 'Arnav Roy',
    description: 'Professional portfolio and services. Web development, design, and digital solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/md-red-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

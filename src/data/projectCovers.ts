export function toProjectSlug(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

// Capturas reales servidas desde `public/assets/projects/` en WebP (1200x750 + variante -600).
export const projectCovers: Record<string, string> = {
  'certihash': '/assets/projects/certihash.webp',
  'control-apps': '/assets/projects/control-apps.webp',
  'entre-lineas': '/assets/projects/entre-lineas.webp',
  'expenses-tracker': '/assets/projects/expenses-tracker.webp',
  'home-server': '/assets/projects/home-server.webp',
  'huellitas-felices': '/assets/projects/huellitas-felices.webp',
  'kinetiq-pro': '/assets/projects/kinetiq-pro.webp',
  'matchanalyzer': '/assets/projects/matchanalyzer.webp',
  'neon-designs-carteles-de-neon-led': '/assets/projects/neon-designs-carteles-de-neon-led.webp',
  'pdf-adjuntos': '/assets/projects/pdf-adjuntos.webp',
  'portfolio-tecnico-jonathan-correa': '/assets/projects/portfolio-tecnico-jonathan-correa.webp',
  'showroom-isabella-tienda-de-ropa-online': '/assets/projects/showroom-isabella-tienda-de-ropa-online.webp',
  'tecnofusion': '/assets/projects/tecnofusion.webp',
  'trading-bot': '/assets/projects/trading-bot.webp',
  'tutor-mate': '/assets/projects/tutor-mate.webp',
}

import type { Locale, Project } from './types'

export const projectGroupDefinitions = [
  { id: 'productos', es: 'Productos SaaS', en: 'SaaS products' },
  { id: 'sistemas', es: 'Sistemas y plataformas', en: 'Systems & platforms' },
  { id: 'web', es: 'Web y comercio', en: 'Web & commerce' },
  { id: 'herramientas', es: 'Herramientas e IA', en: 'Tools & AI' },
  { id: 'infraestructura', es: 'Infraestructura y APIs', en: 'Infrastructure & APIs' },
] as const

export type ProjectGroupId = (typeof projectGroupDefinitions)[number]['id']

export const projectGroupByTitle: Readonly<Record<string, ProjectGroupId>> = {
  'MatchAnalyzer': 'productos',
  'PayAlert SaaS - Gestión de Flujo de Caja': 'productos',
  'KINETIQ PRO': 'productos',
  'Expenses Tracker': 'productos',
  'CertiHash': 'herramientas',
  'AudioText - Transcriptor y Traductor de Audio': 'herramientas',
  'Tutor-Mate': 'herramientas',
  'VoxNote AI (móvil)': 'herramientas',
  'Spin Predictor': 'herramientas',
  'Trading Bot': 'herramientas',
  'PDF Adjuntos': 'herramientas',
  'Traductor de PDF': 'herramientas',
  'Home Server': 'infraestructura',
  'API de Logística - Integración Envia.com': 'infraestructura',
  'API Projects - Tecnofuision IT': 'infraestructura',
  'Control Apps': 'infraestructura',
  'Tecnofusion': 'web',
  'Showroom Isabella — Tienda de Ropa Online': 'web',
  'Portfolio Tecnico - Jonathan Correa': 'web',
  'Neon Designs - Carteles de Neón LED': 'web',
  'Entre Líneas': 'web',
  'Huellitas Felices': 'sistemas',
  'Sentinel Compliance Engine - Corvux AML Dashboard': 'sistemas',
  'Dashboard de Operaciones de Seguridad': 'sistemas',
  'Gestión de pólizas': 'sistemas',
  'Forgotten Objects System': 'sistemas',
  'AESFRON - Plataforma Educativa': 'sistemas',
  'GestorCOC v2.0': 'sistemas',
  'Plataforma de Analítica Operacional PSA': 'sistemas',
  'Operational Analytics Platform — PSA': 'sistemas',
  'Sistema de Reconocimiento de Matrículas': 'herramientas',
  'Automatización de Reportes de Inteligencia': 'infraestructura',
}

export function groupProjects(projects: readonly Project[], locale: Locale) {
  return projectGroupDefinitions.map((group) => ({
    id: group.id,
    title: group[locale],
    projects: projects
      .filter((project) => (projectGroupByTitle[project.title.trim()] ?? 'herramientas') === group.id)
      .sort((a, b) => Number(b.status === 'Producción') - Number(a.status === 'Producción')),
  })).filter((group) => group.projects.length > 0)
}

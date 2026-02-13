import type { UiCopy } from './types'

export const uiEs: UiCopy = {
  navigation: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'logros', label: 'Logros' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'formacion', label: 'Formacion' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'articulos', label: 'Articulos' },
    { id: 'contacto', label: 'Contacto' },
  ],
  hero: {
    availabilityLabel: 'Disponibilidad',
    mailCta: 'Hablemos por correo',
    linkedinCta: 'LinkedIn',
    githubCta: 'GitHub',
    cvCta: 'CV actualizado',
  },
  sections: {
    skills: {
      eyebrow: 'Stack principal',
      title: 'Tecnologias con las que construyo impacto',
      description:
        'Experiencia comprobada en desarrollo full stack, ingenieria de datos y analitica avanzada para la operacion aeroportuaria.',
    },
    projects: {
      eyebrow: 'Casos reales',
      title: 'Proyectos que demuestran como resuelvo problemas complejos',
      description:
        'Cada iniciativa combina ingenieria de datos, desarrollo full stack y automatizacion para acelerar la toma de decisiones.',
      integrationTitle: 'Integracion con Firebase pendiente',
      integrationDescription:
        'Estos proyectos se definen de forma estatica por ahora. Cuando conectes Firebase Storage, podras cargar el contenido dinamicamente desde {bucket}.',
      codeCta: 'Ver codigo',
      liveCta: 'Ver demo',
      readmeCta: 'Ver README',
      viewMoreCta: 'Ver detalles',
      closeModalLabel: 'Cerrar detalle del proyecto',
      statusLabel: 'Estado',
      loadingLabel: 'Cargando proyectos...',
    },
    achievements: {
      eyebrow: 'Impacto medible',
      title: 'Logros tecnicos dentro de la PSA',
      description:
        'Resultados obtenidos combinando automatizacion, modelos predictivos y despliegues de dashboards confiables.',
    },
    experience: {
      eyebrow: 'Trayectoria profesional',
      title: 'Experiencia relevante',
      description: 'Mas de 9 anos desarrollando soluciones criticas para la Policia de Seguridad Aeroportuaria.',
    },
    education: {
      eyebrow: 'Formacion continua',
      title: 'Estudios y certificaciones',
      description: 'Actualiza estos campos con tus programas y certificaciones mas relevantes.',
      educationHeading: 'Educacion',
      certificationsHeading: 'Certificaciones',
    },
    timeline: {
      eyebrow: 'Historia',
      title: 'Hitos profesionales',
      description: 'Explora la cronologia de roles, formacion y certificaciones clave.',
      badges: {
        work: 'Experiencia',
        education: 'Educacion',
        certification: 'Certificacion',
      },
    },
    articles: {
      eyebrow: 'Divulgacion tecnica',
      title: 'Articulos y mini blogs',
      description: 'Casos reales y lecciones aprendidas listos para documentar buenas practicas.',
      upcomingLabel: 'Proximamente',
      readMoreLabel: 'Leer articulo',
    },
    contact: {
      eyebrow: 'Hablemos',
      title: 'Contacto',
      description: 'Completa tus datos reales para que reclutadores y colaboradores te encuentren rapido.',
      directHeading: 'Datos directos',
      emailLabel: 'Email',
      phoneLabel: 'Telefono',
      whatsappLabel: 'WhatsApp',
      locationLabel: 'Ubicacion',
      networksHeading: 'Redes',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      cvLabel: 'CV',
    },
  },
  footer: {
    note: 'Portafolio estatico disenado para resaltar impacto tecnico y trayectoria.',
  },
}

export default uiEs

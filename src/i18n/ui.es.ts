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
  chatAgent: {
    openLabel: 'Abrir asistente',
    closeLabel: 'Cerrar asistente',
    title: 'Asistente IA',
    subtitle: 'Te guio por este portfolio y respondo consultas.',
    clearLabel: 'Reiniciar chat',
    introMessage:
      'Hola, soy tu asistente. Puedo ayudarte a recorrer la pagina, explicar experiencia, proyectos y datos de contacto.',
    placeholder: 'Escribe tu consulta...',
    sendLabel: 'Enviar',
    loadingLabel: 'Pensando...',
    missingKeyMessage:
      'Falta configurar el agente. Agrega `GEMINI_API_KEY`, `OPEN_ROUTER_API_KEY` o `GROQ_API_KEY` en tu entorno para activar respuestas IA.',
    errorMessage:
      'No pude responder en este momento. Intenta de nuevo en unos segundos.',
    quickPrompts: [
      'Mostrame los proyectos mas relevantes',
      'Como puedo contactarte rapido?',
      'Que experiencia tenes en Python y Data Engineering?',
    ],
  },
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
        'Experiencia comprobada en desarrollo full stack con Python, React y Next.js, automatizacion de procesos e integracion de IA generativa para la operacion aeroportuaria.',
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
      description:
        'Mas de 9 años desarrollando soluciones criticas como Ingeniero de Software Full Stack y Senior Python Developer en la Policia de Seguridad Aeroportuaria.',
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

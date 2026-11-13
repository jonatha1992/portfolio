import type { UiCopy } from './types'

export const uiEs: UiCopy = {
  navigation: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'logros', label: 'Logros' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'formacion', label: 'Formación' },
    { id: 'timeline', label: 'Cronología' },
    { id: 'articulos', label: 'Artículos' },
    { id: 'contacto', label: 'Contacto' },
  ],
  chatAgent: {
    openLabel: 'Asistente virtual',
    closeLabel: 'Cerrar asistente',
    title: 'Asistente del portfolio',
    subtitle: 'Consultas sobre experiencia, proyectos y contacto.',
    clearLabel: 'Reiniciar conversación',
    introMessage:
      'Hola, soy el asistente del portfolio de Jonathan. Puedo responder dudas sobre su experiencia, stack tecnológico, proyectos y formas de contacto.',
    placeholder: 'Escribe tu consulta...',
    sendLabel: 'Enviar',
    loadingLabel: 'Consultando...',
    missingKeyMessage:
      'El asistente requiere configuración de API key en las variables de entorno (GEMINI_API_KEY, OPEN_ROUTER_API_KEY o GROQ_API_KEY).',
    errorMessage:
      'No fue posible obtener respuesta en este momento. Por favor, reintenta en unos instantes.',
    quickPrompts: [
      '¿Cuáles son los proyectos más destacados?',
      '¿Cómo contactar a Jonathan directamente?',
      '¿Qué experiencia tiene en Python y Data Engineering?',
    ],
  },
  hero: {
    availabilityLabel: 'Estado',
    mailCta: 'Contactar por email',
    linkedinCta: 'LinkedIn',
    githubCta: 'GitHub',
    cvCta: 'Descargar CV',
  },
  sections: {
    skills: {
      eyebrow: 'Stack técnico',
      title: 'Tecnologías y herramientas',
      description:
        'Desarrollo full stack con Python, React y Next.js, pipelines de datos, automatización de procesos e integración de modelos de IA.',
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Proyectos destacados',
      description:
        'Sistemas en producción, herramientas operacionales y arquitecturas de software desarrolladas recientemente.',
      integrationTitle: 'Carga dinámica de proyectos',
      integrationDescription:
        'Los proyectos se consultan dinámicamente desde Cloud Firestore.',
      codeCta: 'Código',
      liveCta: 'Demo',
      readmeCta: 'README',
      closeModalLabel: 'Cerrar detalle',
      statusLabel: 'Estado',
      loadingLabel: 'Cargando proyectos...',
    },
    achievements: {
      eyebrow: 'Impacto',
      title: 'Logros e impacto operacional',
      description:
        'Resultados obtenidos en automatización de procesos, modelos predictivos y disponibilización de datos para la toma de decisiones.',
    },
    experience: {
      eyebrow: 'Trayectoria',
      title: 'Experiencia profesional',
      description:
        'Más de 9 años desarrollando sistemas de misión crítica como Ingeniero de Software y Data Engineer en la Policía de Seguridad Aeroportuaria.',
    },
    education: {
      eyebrow: 'Formación',
      title: 'Educación y certificaciones',
      description: 'Carrera de grado en sistemas informáticos y certificaciones profesionales en analítica de datos.',
      educationHeading: 'Educación',
      certificationsHeading: 'Certificaciones',
    },
    timeline: {
      eyebrow: 'Hitos',
      title: 'Cronología profesional',
      description: 'Evolución de roles, formación académica y certificaciones clave.',
      badges: {
        work: 'Experiencia',
        education: 'Educación',
        certification: 'Certificación',
      },
    },
    articles: {
      eyebrow: 'Publicaciones',
      title: 'Artículos técnicos',
      description: 'Notas técnicas sobre pipelines de datos, visión por computadora y buenas prácticas de ingeniería.',
      upcomingLabel: 'Próximamente',
      readMoreLabel: 'Leer artículo',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Canales de contacto',
      description: 'Vías directas de comunicación para oportunidades laborales, colaboraciones técnicas y consultas.',
      directHeading: 'Datos de contacto',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      whatsappLabel: 'WhatsApp',
      locationLabel: 'Ubicación',
      networksHeading: 'Enlaces',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      cvLabel: 'CV',
    },
  },
  footer: {
    note: 'Portfolio técnico desarrollado con React, TypeScript y Tailwind CSS.',
  },
}

export default uiEs

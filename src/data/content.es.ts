import type { ProfileContent } from './types'

export const profileContentEs: ProfileContent = {
  personal: {
    name: 'Jonathan Correa',
    headline: 'Ingeniero de Software Full Stack',
    roles: ['Ingeniero de Software Full Stack', 'Senior Python Developer', 'Data Engineer'],
    availability: 'Disponible para nuevas oportunidades laborales',
    summary:
      'Ingeniero de Software Full Stack, Senior Python Developer y Data Engineer orientado a automatizar procesos críticos, diseñar pipelines resilientes y construir productos digitales end-to-end. Desde 2015 formo parte del personal IT de la Policía de Seguridad Aeroportuaria, liderando iniciativas con Python, Django, Flask, React y Next.js, e integrando IA generativa para acelerar análisis, documentación técnica y toma de decisiones.',
    location: 'Buenos Aires, Argentina',
    photo: '/assets/profile/jonathan-correa.jpg',
  },
  skills: [
    {
      label: 'Lenguajes',
      items: ['Python', 'C#', 'JavaScript / TypeScript', 'SQL', 'R'],
    },
    {
      label: 'Frameworks y librerías',
      items: ['React', 'Next.js', 'FastAPI', 'Flask', 'Django', '.NET', 'Pandas', 'NumPy', 'TensorFlow'],
    },
    {
      label: 'Cloud y DevOps',
      items: ['Firebase', 'Docker', 'GitHub Actions', 'Azure DevOps'],
    },
    {
      label: 'Data y BI',
      items: ['Power BI', 'Metabase', 'Airflow', 'dbt', 'ETL/ELT', 'Modelado Dimensional', 'Jupyter Notebook'],
    },
    {
      label: 'Computer Vision y ML',
      items: ['OpenCV', 'Scikit-learn', 'MLOps', 'Modelos Predictivos'],
    },
    {
      label: 'Automatización e IA generativa',
      items: ['Automatización de Procesos', 'Prompt Engineering', 'OpenAI API', 'Asistentes IA'],
    },
    {
      label: 'Herramientas',
      items: ['Git', 'Jira', 'Confluence', 'Notion', 'Figma'],
    },
  ],
  projects: [
    {
      title: 'Plataforma de Analítica Operacional PSA',
      role: 'Arquitecto de Datos y Full Stack',
      period: '2023 · PSA',
      summary:
        'Portal unificado para visualizar indicadores críticos de seguridad aeroportuaria, integrando fuentes heterogéneas y ETL diarios automatizados.',
      highlights: [
        'Pipelines de ingesta y normalización con Python y Airflow.',
        'Dashboards interactivos embebidos con Power BI y React para analistas y mandos medios.',
        'Control de acceso granular y auditoría alineada a normativas de seguridad.',
      ],
      stack: ['React', 'FastAPI', 'PostgreSQL', 'Power BI', 'Docker', 'Tailwind CSS'],
      media: {
        type: 'image',
        src: '/assets/projects/analitica-operacional-psa.svg',
        alt: 'Panel de analítica operacional con tarjetas de indicadores, gráfico de barras y línea de tendencia.',
      },
    },
    {
      title: 'Sistema de Reconocimiento de Matrículas',
      role: 'Líder Técnico Visión AI',
      period: '2021 · PSA',
      summary:
        'Solución de visión por computadora para lectura automática de matrículas en zonas restringidas con alertas en tiempo real.',
      highlights: [
        'Entrenamiento de modelos CNN con TensorFlow y dataset propio anonimizado.',
        'Optimización de inferencia para ejecución en edge con NVIDIA Jetson.',
        'Integración con APIs internas para tickets y alertas en el SOC.',
      ],
      stack: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'Azure DevOps'],
      media: {
        type: 'image',
        src: '/assets/projects/reconocimiento-matriculas.svg',
        alt: 'Matrícula estilizada de un vehículo con marco de detección, puntos de referencia y línea de escaneo.',
      },
    },
    {
      title: 'Automatización de Reportes de Inteligencia',
      role: 'Data Engineer',
      period: '2019 · PSA',
      summary:
        'Automatización integral de reportes diarios y semanales con scripts orquestados y dashboards dinámicos.',
      highlights: [
        'Generación de reportes PDF y envíos segmentados por unidad operativa.',
        'Modelos predictivos de demanda con scikit-learn para anticipar recursos.',
        'Reducción del tiempo de elaboración de horas a minutos.',
      ],
      stack: ['Python', 'Pandas', 'scikit-learn', 'Power BI', 'SQL Server'],
      media: {
        type: 'image',
        src: '/assets/projects/automatizacion-reportes.svg',
        alt: 'Flujo de datos conectado a un proceso automatizado y hojas de reporte con dispersión y recta de regresión.',
      },
    },
  ],
  achievements: [
    {
      title: 'Automatización estratégica en PSA',
      description:
        'Automatizaciones que liberaron cientos de horas anuales, reduciendo errores manuales y asegurando trazabilidad end-to-end sobre pipelines críticos.',
      tech: ['Python', 'Airflow', 'Power BI', 'Jupyter'],
      impact: 'Procesos críticos 100% trazables y respuesta operacional más rápida.',
    },
    {
      title: 'Modelos predictivos para asignación de recursos',
      description:
        'Modelos que anticipan el flujo operativo aeroportuario, habilitando decisiones tácticas basadas en datos.',
      tech: ['scikit-learn', 'Pandas', 'Power BI'],
    },
    {
      title: 'Dashboards ejecutivos en tiempo real',
      description:
        'Dashboards que consolidan métricas de inteligencia, logística y operaciones para la cadena de mando.',
      tech: ['React', 'Power BI', 'Firebase'],
    },
    {
      title: 'Arquitectura de datos escalable',
      description:
        'Estandarización de modelos de datos y pipelines ELT con dbt y Python, reduciendo un 40% el tiempo de onboarding de indicadores.',
      tech: ['Python', 'dbt', 'SQL Server', 'Airflow'],
    },
  ],
  experience: [
    {
      company: 'Policía de Seguridad Aeroportuaria',
      role: 'Ingeniero de Software Full Stack | Sr. Python Developer & Data Engineer',
      period: '2015 — Actualidad',
      responsibilities: [
        'Lidero proyectos de automatización de procesos, analítica avanzada y desarrollo full stack orientados a seguridad aeroportuaria.',
        'Orquesto pipelines de datos y APIs en Python (Django, Flask, FastAPI), integrando fuentes heterogéneas y frontends con React y Next.js.',
        'Implemento MLOps, computer vision, dashboards ejecutivos y flujos asistidos por IA generativa con monitoreo continuo y métricas de impacto.',
      ],
      stack: ['Python', 'Django', 'Flask', 'FastAPI', 'React', 'Next.js', 'C#', 'Power BI', 'Airflow', 'TensorFlow', 'OpenAI API'],
    },
  ],
  education: [
    {
      institution: 'Universidad Abierta Interamericana (UAI)',
      program: 'Ingeniería en Sistemas Informáticos (4.º año) · Título intermedio obtenido: Analista Programador',
      period: '2019 — Actualidad',
    },
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Data Analyst Associate',
      issuer: 'Microsoft',
      year: 2021,
    },
    {
      name: 'Especialización en Ciencia de Datos Aplicada',
      issuer: 'Universidad Nacional de Córdoba',
      year: 2022,
    },
  ],
  contact: {
    email: 'jonathancorrea291292@hotmail.com',
    phone: '+54 9 11 5991-0666',
    location: 'Buenos Aires, Argentina',
    availabilityNote: 'Respondo rápido por LinkedIn y correo electrónico.',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/jonathan-gabriel-correa-9a2091218/',
    github: 'https://github.com/jonatha1992',
    cv: '#',
  },
  articles: [
    {
      title: 'Automatizando ETL de inteligencia operativa con Python y Airflow',
      url: '#',
      description: 'Lecciones técnicas para orquestar pipelines de datos críticos con foco en seguridad y auditoría.',
      tags: ['Python', 'Airflow', 'Seguridad'],
    },
    {
      title: 'Computer Vision aplicada a seguridad aeroportuaria',
      url: '#',
      description: 'Cómo prototipar, entrenar y desplegar modelos de visión por computadora en entornos restringidos.',
      tags: ['Computer Vision', 'TensorFlow'],
    },
  ],
  timeline: [
    {
      type: 'work',
      title: 'Ingeniero de Software Full Stack & Data Engineer',
      organization: 'Policía de Seguridad Aeroportuaria',
      from: '2015',
      description:
        'Responsable de automatización de procesos, pipelines de datos, soluciones full stack e integraciones de IA generativa en despliegues TI críticos.',
      tech: ['Python', 'Django', 'React', 'Next.js', 'Power BI', 'OpenAI API'],
    },
    {
      type: 'education',
      title: 'Ingeniería en Sistemas Informáticos (4.º año)',
      organization: 'Universidad Abierta Interamericana (UAI)',
      from: '2019',
      description:
        'Cursando cuarto año en la UAI con el título intermedio de Analista Programador ya obtenido, profundizando en arquitectura de software y sistemas distribuidos.',
      tech: ['Python', 'Sistemas Distribuidos', 'Arquitectura de Software'],
    },
    {
      type: 'certification',
      title: 'Microsoft Certified: Data Analyst Associate',
      organization: 'Microsoft',
      from: '2021',
      description: 'Certificación que avala modelado de datos y dashboards orientados a decisiones accionables.',
      tech: ['Power BI', 'DAX', 'Modelado de Datos'],
    },
  ],
  externalSources: {
    projectsFromFirebase: {
      description:
        'Los proyectos se cargan dinámicamente desde Cloud Firestore por REST, sin depender de Cloud Functions.',
      bucketPath: 'firestore.googleapis.com/v1/projects/tecnofuision-it/databases/(default)/documents/projects',
      enabled: true,
    },
  },
}

export default profileContentEs

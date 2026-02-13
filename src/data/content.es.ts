import type { ProfileContent } from './types'

export const profileContentEs: ProfileContent = {
  personal: {
    name: 'Jonathan Correa',
    headline: 'Ingeniero de Software Full Stack',
    roles: ['Ingeniero de Software Full Stack', 'Senior Python Developer', 'Data Engineer'],
    availability: 'Disponible para nuevas oportunidades laborales',
    summary:
      'Ingeniero de Software Full Stack, Senior Python Developer y Data Engineer orientado a automatizar procesos criticos, disenar pipelines resilientes y construir productos digitales end-to-end. Desde 2015 formo parte del personal IT de la Policia de Seguridad Aeroportuaria, liderando iniciativas con Python, Django, Flask, React y Next.js, e integrando IA generativa para acelerar analisis, documentacion tecnica y toma de decisiones.',
    location: 'Buenos Aires, Argentina',
    photo: '/assets/profile/jonathan-correa.jpg',
  },
  skills: [
    {
      label: 'Lenguajes',
      items: ['Python', 'C#', 'JavaScript / TypeScript', 'SQL', 'R'],
    },
    {
      label: 'Frameworks y librerias',
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
      label: 'Automatizacion e IA generativa',
      items: ['Automatizacion de Procesos', 'Prompt Engineering', 'OpenAI API', 'Asistentes IA'],
    },
    {
      label: 'Herramientas',
      items: ['Git', 'Jira', 'Confluence', 'Notion', 'Figma'],
    },
  ],
  projects: [
    {
      title: 'Plataforma de Analitica Operacional PSA',
      role: 'Arquitecto de Datos y Full Stack',
      period: '2023 · PSA',
      summary:
        'Portal unificado para visualizar indicadores criticos de seguridad aeroportuaria integrando fuentes heterogeneas y ETL diarios automatizados.',
      highlights: [
        'Pipelines de ingesta y normalizacion con Python y Airflow.',
        'Dashboards interactivos embebidos con Power BI y React para analistas y mandos medios.',
        'Control de acceso granular y auditoria alineada a normativas de seguridad.',
      ],
      stack: ['React', 'FastAPI', 'PostgreSQL', 'Power BI', 'Docker', 'Tailwind CSS'],
    },
    {
      title: 'Sistema de Reconocimiento de Matriculas',
      role: 'Lider Tecnico Vision AI',
      period: '2021 · PSA',
      summary:
        'Solucion de vision por computadora para lectura automatica de matriculas en zonas restringidas con alertas en tiempo real.',
      highlights: [
        'Entrenamiento de modelos CNN con TensorFlow y dataset propio anonimizado.',
        'Optimización de inferencia para ejecucion en edge con NVIDIA Jetson.',
        'Integracion con APIs internas para tickets y alertas en el SOC.',
      ],
      stack: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'Azure DevOps'],
    },
    {
      title: 'Automatizacion de Reportes de Inteligencia',
      role: 'Data Engineer',
      period: '2019 · PSA',
      summary:
        'Automatizacion integral de reportes diarios y semanales con scripts orquestados y dashboards dinamicos.',
      highlights: [
        'Generacion de reportes PDF y envios segmentados por unidad operativa.',
        'Modelos predictivos de demanda con scikit-learn para anticipar recursos.',
        'Reduccion del tiempo de elaboracion de horas a minutos.',
      ],
      stack: ['Python', 'Pandas', 'scikit-learn', 'Power BI', 'SQL Server'],
    },
  ],
  achievements: [
    {
      title: 'Automatizacion estrategica en PSA',
      description:
        'Automatizaciones que liberaron cientos de horas anuales, reduciendo errores manuales y asegurando trazabilidad end-to-end sobre pipelines criticos.',
      tech: ['Python', 'Airflow', 'Power BI', 'Jupyter'],
      impact: 'Procesos criticos 100% trazables y respuesta operacional mas rapida.',
    },
    {
      title: 'Modelos predictivos para asignacion de recursos',
      description:
        'Modelos que anticipan el flujo operativo aeroportuario, habilitando decisiones tacticas basadas en datos.',
      tech: ['scikit-learn', 'Pandas', 'Power BI'],
    },
    {
      title: 'Dashboards ejecutivos en tiempo real',
      description:
        'Dashboards que consolidan metricas de inteligencia, logistica y operaciones para la cadena de mando.',
      tech: ['React', 'Power BI', 'Firebase'],
    },
    {
      title: 'Arquitectura de datos escalable',
      description:
        'Estandarizacion de modelos de datos y pipelines ELT con dbt y Python, reduciendo un 40% el onboarding de indicadores.',
      tech: ['Python', 'dbt', 'SQL Server', 'Airflow'],
    },
  ],
  experience: [
    {
      company: 'Policia de Seguridad Aeroportuaria',
      role: 'Ingeniero de Software Full Stack | Sr. Python Developer & Data Engineer',
      period: '2015 — Actualidad',
      responsibilities: [
        'Lidero proyectos de automatizacion de procesos, analitica avanzada y desarrollo full stack orientados a seguridad aeroportuaria.',
        'Orquesto pipelines de datos y APIs en Python (Django, Flask, FastAPI), integrando fuentes heterogeneas y frontends con React y Next.js.',
        'Implemento MLOps, computer vision, dashboards ejecutivos y flujos asistidos por IA generativa con monitoreo continuo y metricas de impacto.',
      ],
      stack: ['Python', 'Django', 'Flask', 'FastAPI', 'React', 'Next.js', 'C#', 'Power BI', 'Airflow', 'TensorFlow', 'OpenAI API'],
    },
  ],
  education: [
    {
      institution: 'Universidad Abierta Interamericana (UAI)',
      program: 'Ingenieria en Sistemas Informaticos (4.º año) · Titulo intermedio obtenido: Analista Programador',
      period: '2019 — Actualidad',
    }
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Data Analyst Associate',
      issuer: 'Microsoft',
      year: 2021,
    },
    {
      name: 'Especializacion en Ciencia de Datos aplicada',
      issuer: 'Universidad Nacional de Cordoba',
      year: 2022,
    },
  ],
  contact: {
    email: 'jonathancorrea291292@hotmail.com',
    phone: '+54 9 11 5991-0666',
    location: 'Buenos Aires, Argentina',
    availabilityNote: 'Respondo rapido por LinkedIn y correo electronico.',
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
      description: 'Lecciones tecnicas para orquestar pipelines de datos criticos con foco en seguridad y auditoria.',
      tags: ['Python', 'Airflow', 'Seguridad'],
    },
    {
      title: 'Computer Vision aplicada a seguridad aeroportuaria',
      url: '#',
      description: 'Como prototipar, entrenar y desplegar modelos de vision por computadora en entornos restringidos.',
      tags: ['Computer Vision', 'TensorFlow'],
    },
  ],
  timeline: [
    {
      type: 'work',
      title: 'Ingeniero de Software Full Stack & Data Engineer',
      organization: 'Policia de Seguridad Aeroportuaria',
      from: '2015',
      description:
        'Responsable de automatizacion de procesos, inteligencia de datos, soluciones full stack e integraciones de IA generativa en despliegues TI criticos.',
      tech: ['Python', 'Django', 'React', 'Next.js', 'Power BI', 'OpenAI API'],
    },
    {
      type: 'education',
      title: 'Ingenieria en Sistemas Informaticos (4.º año)',
      organization: 'Universidad Abierta Interamericana (UAI)',
      from: '2019',
      description:
        'Cursando cuarto año en la UAI con el titulo intermedio de Analista Programador ya obtenido, profundizando en arquitectura de software y sistemas distribuidos.',
      tech: ['Python', 'Sistemas Distribuidos', 'Arquitectura de Software'],
    },
    {
      type: 'certification',
      title: 'Microsoft Certified: Data Analyst Associate',
      organization: 'Microsoft',
      from: '2021',
      description: 'Certificacion que avala modelado de datos y dashboards orientados a decisiones accionables.',
      tech: ['Power BI', 'DAX', 'Modelado de Datos'],
    },
  ],
  externalSources: {
    projectsFromFirebase: {
      description:
        'Los proyectos se cargan dinámicamente desde Firebase Cloud Functions con soporte multi-idioma.',
      bucketPath: 'https://us-central1-tecnofuision-it.cloudfunctions.net/getProjects',
      enabled: true,
    },
  },
}

export default profileContentEs

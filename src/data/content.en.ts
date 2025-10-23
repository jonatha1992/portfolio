import type { ProfileContent } from './types'

export const profileContentEn: ProfileContent = {
  personal: {
    name: 'Jonathan Correa',
    headline: 'Software Analyst',
    roles: ['Data Engineer', 'Senior Python Developer'],
    availability: 'Open to freelance work and international collaborations',
    summary:
      'Senior Python Developer and Data Engineer focused on automating critical processes, building resilient data pipelines, and shipping end-to-end digital products. Since 2015 I have served as part of the Airport Security Police IT personnel, leading initiatives with Python, Django, Flask, and collaborative notebooks to deliver secure, measurable solutions.',
    location: 'Buenos Aires, Argentina',
    photo: '/assets/profile/jonathan-correa.jpg',
  },
  skills: [
    {
      label: 'Languages',
      items: ['Python', 'C#', 'JavaScript / TypeScript', 'SQL', 'R'],
    },
    {
      label: 'Frameworks & Libraries',
      items: ['React', 'FastAPI', 'Flask', 'Django', '.NET', 'Pandas', 'NumPy', 'TensorFlow'],
    },
    {
      label: 'Cloud & DevOps',
      items: ['Firebase', 'Docker', 'GitHub Actions', 'Azure DevOps'],
    },
    {
      label: 'Data & BI',
      items: ['Power BI', 'Metabase', 'Airflow', 'dbt', 'ETL/ELT', 'Dimensional Modeling', 'Jupyter Notebook'],
    },
    {
      label: 'Computer Vision & ML',
      items: ['OpenCV', 'Scikit-learn', 'MLOps', 'Predictive Models'],
    },
    {
      label: 'Tooling',
      items: ['Git', 'Jira', 'Confluence', 'Notion', 'Figma'],
    },
  ],
  projects: [
    {
      title: 'PSA Operational Analytics Platform',
      role: 'Data Architect & Full Stack Engineer',
      period: '2023 · PSA',
      summary:
        'Unified portal that centralizes mission-critical airport security indicators by integrating heterogeneous sources and automated daily ETL jobs.',
      highlights: [
        'Data ingestion and normalization pipelines with Python and Airflow.',
        'Interactive dashboards embedded with Power BI and React for analysts and decision-makers.',
        'Granular access control and audit trail aligned with security policies.',
      ],
      stack: ['React', 'FastAPI', 'PostgreSQL', 'Power BI', 'Docker', 'Tailwind CSS'],
    },
    {
      title: 'License Plate Recognition System',
      role: 'Vision AI Technical Lead',
      period: '2021 · PSA',
      summary:
        'Computer vision solution that reads vehicle license plates in restricted zones and triggers real-time alerts.',
      highlights: [
        'CNN models trained with TensorFlow and an anonymized, in-house dataset.',
        'Inference optimized for edge execution on NVIDIA Jetson.',
        'Integration with internal APIs to automate ticket creation and SOC alerts.',
      ],
      stack: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'Azure DevOps'],
    },
    {
      title: 'Intelligence Reporting Automation',
      role: 'Data Engineer',
      period: '2019 · PSA',
      summary:
        'End-to-end automation for daily and weekly intelligence reports with orchestrated scripts and dynamic dashboards.',
      highlights: [
        'PDF generation and segmented delivery per operational unit.',
        'Predictive demand models with scikit-learn to anticipate resource allocation.',
        'Reduced report preparation time from hours to minutes.',
      ],
      stack: ['Python', 'Pandas', 'scikit-learn', 'Power BI', 'SQL Server'],
    },
  ],
  achievements: [
    {
      title: 'Strategic automation at PSA',
      description:
        'Automation initiatives that freed hundreds of hours per year, reduced manual errors, and ensured end-to-end traceability across critical pipelines.',
      tech: ['Python', 'Airflow', 'Power BI', 'Jupyter'],
      impact: 'Critical processes became fully traceable and response times improved significantly.',
    },
    {
      title: 'Predictive models for resource allocation',
      description:
        'Forecasting models that anticipate airport operational demand, enabling data-driven tactical decisions.',
      tech: ['scikit-learn', 'Pandas', 'Power BI'],
    },
    {
      title: 'Executive dashboards in real time',
      description:
        'Dashboards that consolidate intelligence, logistics, and operations metrics for the command chain.',
      tech: ['React', 'Power BI', 'Firebase'],
    },
    {
      title: 'Scalable data architecture',
      description:
        'Standardized data models and ELT pipelines with dbt and Python, cutting indicator onboarding times by 40%.',
      tech: ['Python', 'dbt', 'SQL Server', 'Airflow'],
    },
  ],
  experience: [
    {
      company: 'Airport Security Police',
      role: 'Sr. Python Developer & Data Engineer',
      period: '2015 — Present',
      responsibilities: [
        'Lead automation, advanced analytics, and full stack projects focused on airport security.',
        'Orchestrate data pipelines and Python APIs (Django, Flask, FastAPI) integrating heterogeneous sources.',
        'Implement MLOps, computer vision, and executive dashboards with continuous monitoring and impact metrics.',
      ],
      stack: ['Python', 'Django', 'Flask', 'C#', 'React', 'Power BI', 'Airflow', 'TensorFlow'],
    },
  ],
  education: [
    {
      institution: 'Universidad Abierta Interamericana (UAI)',
      program: 'Computer Systems Engineering (4th year) · Intermediate degree obtained: Analyst Programmer',
      period: '2019 — Present',
    },
    {
      institution: 'Federal Police University Institute',
      program: 'Systems Analysis Technician',
      period: '2010 — 2013',
    },
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Data Analyst Associate',
      issuer: 'Microsoft',
      year: 2021,
    },
    {
      name: 'Applied Data Science Specialization',
      issuer: 'National University of Cordoba',
      year: 2022,
    },
  ],
  contact: {
    email: 'jonathancorrea291292@hotmail.com',
    phone: '+54 9 11 5991-0666',
    location: 'Buenos Aires, Argentina',
    availabilityNote: 'Quick responses through LinkedIn or email.',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/jonathan-gabriel-correa-9a2091218/',
    github: 'https://github.com/jonatha1992',
    cv: '#',
  },
  articles: [
    {
      title: 'Automating intelligence ETL with Python and Airflow',
      url: '#',
      description: 'Technical lessons on orchestrating critical data pipelines with a security-first mindset.',
      tags: ['Python', 'Airflow', 'Security'],
    },
    {
      title: 'Computer vision for airport security',
      url: '#',
      description: 'How to prototype, train, and deploy computer vision models in restricted environments.',
      tags: ['Computer Vision', 'TensorFlow'],
    },
  ],
  timeline: [
    {
      type: 'work',
      title: 'Analyst Programmer & Data Engineer',
      organization: 'Airport Security Police',
      from: '2015',
      description:
        'Lead automation, data intelligence, and mission-critical IT deployments as the senior Python reference.',
      tech: ['Python', 'Django', 'React', 'Power BI'],
    },
    {
      type: 'education',
      title: 'Computer Systems Engineering (4th year)',
      organization: 'Universidad Abierta Interamericana (UAI)',
      from: '2019',
      description:
        'Currently in fourth year at UAI, already holding the intermediate Analyst Programmer degree while deepening in software architecture and distributed systems.',
      tech: ['Python', 'Distributed Systems', 'Software Architecture'],
    },
    {
      type: 'certification',
      title: 'Microsoft Certified: Data Analyst Associate',
      organization: 'Microsoft',
      from: '2021',
      description:
        'Credential validating my ability to model data, design dashboards, and drive actionable insights.',
      tech: ['Power BI', 'DAX', 'Data Modeling'],
    },
  ],
  externalSources: {
    projectsFromFirebase: {
      description:
        'Soon you will be able to sync featured projects from Firebase API once multi-language support is added to the backend.',
      bucketPath: 'https://tecnofuision-it.web.app/api/projects',
      enabled: false,
    },
  },
}

export default profileContentEn


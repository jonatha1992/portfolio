import type { UiCopy } from './types'

export const uiEn: UiCopy = {
  navigation: [
    { id: 'inicio', label: 'Home' },
    { id: 'habilidades', label: 'Skills' },
    { id: 'proyectos', label: 'Projects' },
    { id: 'logros', label: 'Impact' },
    { id: 'experiencia', label: 'Experience' },
    { id: 'formacion', label: 'Education' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'articulos', label: 'Articles' },
    { id: 'contacto', label: 'Contact' },
  ],
  hero: {
    availabilityLabel: 'Availability',
    mailCta: 'Email me',
    linkedinCta: 'LinkedIn',
    githubCta: 'GitHub',
    cvCta: 'Latest resume',
  },
  sections: {
    skills: {
      eyebrow: 'Core stack',
      title: 'Technologies I rely on to deliver impact',
      description:
        'Proven experience across full stack development, data engineering, and advanced analytics for airport operations.',
    },
    projects: {
      eyebrow: 'Real cases',
      title: 'Projects that show how I solve complex problems',
      description:
        'Each initiative blends data engineering, full stack development, and automation to accelerate decision-making.',
      integrationTitle: 'Firebase integration pending',
      integrationDescription:
        'Projects are static for now. Once Firebase Storage is connected, you can fetch them dynamically from {bucket}.',
      codeCta: 'View code',
      liveCta: 'View demo',
      readmeCta: 'View README',
      closeModalLabel: 'Close project details',
      statusLabel: 'Status',
      loadingLabel: 'Loading projects...',
    },
    achievements: {
      eyebrow: 'Measured impact',
      title: 'Technical achievements within PSA',
      description:
        'Outcomes delivered by combining automation, predictive models, and reliable executive dashboards.',
    },
    experience: {
      eyebrow: 'Professional path',
      title: 'Relevant experience',
      description: 'More than nine years delivering mission critical solutions for the Airport Security Police.',
    },
    education: {
      eyebrow: 'Continuous learning',
      title: 'Education and certifications',
      description: 'Keep these fields updated with the programs and certifications that matter the most.',
      educationHeading: 'Education',
      certificationsHeading: 'Certifications',
    },
    timeline: {
      eyebrow: 'Story',
      title: 'Professional milestones',
      description: 'Explore the chronology of roles, studies, and key certifications.',
      badges: {
        work: 'Experience',
        education: 'Education',
        certification: 'Certification',
      },
    },
    articles: {
      eyebrow: 'Technical writing',
      title: 'Articles and short blogs',
      description: 'Real-world cases and lessons learned ready to share best practices.',
      upcomingLabel: 'Coming soon',
      readMoreLabel: 'Read article',
    },
    contact: {
      eyebrow: 'Let us talk',
      title: 'Contact',
      description: 'Include your real details so recruiters and collaborators can reach out quickly.',
      directHeading: 'Direct details',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      whatsappLabel: 'WhatsApp',
      locationLabel: 'Location',
      networksHeading: 'Networks',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      cvLabel: 'Resume',
    },
  },
  footer: {
    note: 'Static portfolio crafted to highlight technical impact and career journey.',
  },
}

export default uiEn

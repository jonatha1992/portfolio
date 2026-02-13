export type SkillCategory = {
  label: string
  items: string[]
}

export type Project = {
  title: string
  role: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
  codeUrl?: string
  liveUrl?: string
  readmeUrl?: string
  status?: string
  hasReadme?: boolean
  media?: {
    type: 'image' | 'video'
    src: string
    alt: string
  }
}

export type FirebaseTimestamp = {
  _seconds: number
  _nanoseconds: number
}

// Firebase API Project structure
export type FirebaseProject = {
  id: string
  title: string
  description?: string
  image?: string
  previewLink?: string
  githubLink?: string
  technologies?: string[]
  status?: string
  isDeployed?: boolean
  readmeUrl?: string
  readmeFileName?: string
  hasReadme?: boolean
  createdAt?: FirebaseTimestamp
  updatedAt?: FirebaseTimestamp
}

export type FirebaseProjectsResponse = {
  success: boolean
  count: number
  limit?: number
  includeReadme?: boolean
  projects: FirebaseProject[]
}

export type Achievement = {
  title: string
  description: string
  tech: string[]
  impact?: string
}

export type TimelineItem = {
  type: 'work' | 'education' | 'certification'
  title: string
  organization: string
  from: string
  to?: string
  location?: string
  description: string
  tech?: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  responsibilities: string[]
  stack: string[]
}

export type Education = {
  institution: string
  program: string
  period: string
}

export type Certification = {
  name: string
  issuer: string
  year: number
}

export type Article = {
  title: string
  url: string
  description: string
  tags?: string[]
}

export type ProfileContent = {
  personal: {
    name: string
    headline: string
    roles?: string[]
    availability: string
    summary: string
    location: string
    photo?: string
  }
  skills: SkillCategory[]
  projects: Project[]
  achievements: Achievement[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  contact: {
    email: string
    phone: string
    location: string
    availabilityNote: string
  }
  socials: {
    linkedin?: string
    github?: string
    cv?: string
  }
  articles: Article[]
  timeline: TimelineItem[]
  externalSources: {
    projectsFromFirebase: {
      description: string
      bucketPath: string
      enabled: boolean
    }
  }
}

export type Locale = 'es' | 'en'

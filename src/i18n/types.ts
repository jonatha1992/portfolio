import type { Locale } from '../data/types'
import type { TimelineItem } from '../data/types'

export type NavCopy = { id: string; label: string }

export type SectionCopy = {
  eyebrow: string
  title: string
  description: string
}

export type TimelineLabels = Record<TimelineItem['type'], string>

export type UiCopy = {
  navigation: NavCopy[]
  hero: {
    availabilityLabel: string
    mailCta: string
    linkedinCta: string
    githubCta: string
    cvCta: string
  }
  sections: {
    skills: SectionCopy
    projects: SectionCopy & {
      integrationTitle: string
      integrationDescription: string
      codeCta: string
      liveCta: string
      readmeCta: string
      closeModalLabel: string
      statusLabel: string
      loadingLabel: string
    }
    achievements: SectionCopy
    experience: SectionCopy
    education: SectionCopy & {
      educationHeading: string
      certificationsHeading: string
    }
    timeline: SectionCopy & { badges: TimelineLabels }
    articles: SectionCopy & { upcomingLabel: string; readMoreLabel: string }
    contact: SectionCopy & {
      directHeading: string
      emailLabel: string
      phoneLabel: string
      whatsappLabel: string
      locationLabel: string
      networksHeading: string
      linkedinLabel: string
      githubLabel: string
      cvLabel: string
    }
  }
  footer: {
    note: string
  }
}

export type UiDictionary = Record<Locale, UiCopy>

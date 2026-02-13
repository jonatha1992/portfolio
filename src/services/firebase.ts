import type {
  FirebaseProjectsResponse,
  FirebaseProject,
  FirebaseTimestamp,
  Project,
  Locale,
} from '../data/types'

const FIREBASE_API_URL = 'https://us-central1-tecnofuision-it.cloudfunctions.net/getProjects'

/**
 * Fetches projects from Firebase API
 * @param locale - The language locale (es or en)
 */
export async function fetchFirebaseProjects(locale?: Locale): Promise<FirebaseProject[]> {
  try {
    // Build URL with locale parameter if provided
    const url = locale ? `${FIREBASE_API_URL}?locale=${locale}` : FIREBASE_API_URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`)
    }

    const data: FirebaseProjectsResponse = await response.json()

    if (!data.success) {
      throw new Error('API returned success: false')
    }

    return data.projects
  } catch (error) {
    console.error('Error fetching Firebase projects:', error)
    return []
  }
}

function isValidHttpUrl(value?: string): value is string {
  if (!value) {
    return false
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return false
  }

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function toDate(timestamp?: FirebaseTimestamp): Date | null {
  if (!timestamp) {
    return null
  }

  if (typeof timestamp._seconds !== 'number' || Number.isNaN(timestamp._seconds)) {
    return null
  }

  return new Date(timestamp._seconds * 1000)
}

function getProjectRole(locale: Locale): string {
  return locale === 'es' ? 'Proyecto' : 'Project'
}

/**
 * Transforms a Firebase project into the Portfolio Project format
 */
export function transformFirebaseProject(firebaseProject: FirebaseProject, locale: Locale = 'es'): Project {
  const createdDate = toDate(firebaseProject.createdAt)
  const year = createdDate ? `${createdDate.getFullYear()}` : locale === 'es' ? 'Sin fecha' : 'No date'
  const validPreviewUrl = isValidHttpUrl(firebaseProject.previewLink) ? firebaseProject.previewLink.trim() : undefined
  const validGithubUrl = isValidHttpUrl(firebaseProject.githubLink) ? firebaseProject.githubLink.trim() : undefined
  const validReadmeUrl = isValidHttpUrl(firebaseProject.readmeUrl) ? firebaseProject.readmeUrl.trim() : undefined

  return {
    title: firebaseProject.title,
    role: getProjectRole(locale),
    period: year,
    summary: firebaseProject.description ?? '',
    highlights: [],
    stack: firebaseProject.technologies ?? [],
    codeUrl: validGithubUrl,
    liveUrl: validPreviewUrl,
    readmeUrl: validReadmeUrl,
    status: firebaseProject.status?.trim() || undefined,
    hasReadme: firebaseProject.hasReadme ?? Boolean(validReadmeUrl),
    media: firebaseProject.image
      ? {
          type: 'image',
          src: firebaseProject.image,
          alt: firebaseProject.title,
        }
      : undefined,
  }
}

/**
 * Fetches and transforms Firebase projects into Portfolio format
 * @param locale - The language locale (es or en)
 */
export async function getPortfolioProjectsFromFirebase(locale?: Locale): Promise<Project[]> {
  const firebaseProjects = await fetchFirebaseProjects(locale)

  if (!firebaseProjects.length) {
    return []
  }

  return firebaseProjects.map((project) => transformFirebaseProject(project, locale ?? 'es'))
}

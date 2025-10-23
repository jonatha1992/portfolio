import type { FirebaseProjectsResponse, FirebaseProject, Project, Locale } from '../data/types'

const FIREBASE_API_URL = 'https://tecnofuision-it.web.app/api/projects'

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

/**
 * Transforms a Firebase project into the Portfolio Project format
 */
export function transformFirebaseProject(firebaseProject: FirebaseProject): Project {
  // Convert Firebase timestamp to a readable date
  const createdDate = new Date(firebaseProject.createdAt._seconds * 1000)
  const year = createdDate.getFullYear()

  return {
    title: firebaseProject.title,
    role: 'Developer', // Default role - you can customize this
    period: `${year}`,
    summary: firebaseProject.description,
    highlights: [], // Firebase projects don't have highlights
    stack: [], // Firebase projects don't have stack info
    codeUrl: firebaseProject.githubLink,
    liveUrl: firebaseProject.previewLink,
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
  return firebaseProjects.map(transformFirebaseProject)
}

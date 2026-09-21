import { projectCovers } from '../data/projectCovers'
import type {
  FirebaseProject,
  FirebaseTimestamp,
  Project,
  Locale,
} from '../data/types'

// Leemos Firestore directamente por REST. La Cloud Function que habia en el medio
// exigia plan Blaze; las reglas ya permiten `allow read: if true` sobre /projects,
// asi que el endpoint publico alcanza y el sitio deja de depender de Functions.
const FIRESTORE_PROJECT_ID = 'tecnofuision-it'
const FIRESTORE_COLLECTION = 'projects'
const FIRESTORE_PAGE_SIZE = 100

// La API key web de Firebase es un identificador publico, no un secreto: viaja en el
// bundle de cualquier app Firebase y el acceso real lo gobiernan las security rules.
const DEFAULT_FIREBASE_API_KEY = 'AIzaSyDnQCFR5CCA7JXcT3RBkZlcpaKPwqoj-yw'

function getFirebaseApiKey(): string {
  const value = (import.meta.env as Record<string, string | undefined>).VITE_FIREBASE_API_KEY
  const trimmed = value?.trim()
  return trimmed?.length ? trimmed : DEFAULT_FIREBASE_API_KEY
}

type FirestoreValue = {
  stringValue?: string
  booleanValue?: boolean
  integerValue?: string
  timestampValue?: string
  nullValue?: null
  arrayValue?: { values?: FirestoreValue[] }
}

type FirestoreDocument = {
  name: string
  fields?: Record<string, FirestoreValue>
}

function readString(value?: FirestoreValue): string | undefined {
  const raw = value?.stringValue
  const trimmed = raw?.trim()
  return trimmed?.length ? trimmed : undefined
}

function readBoolean(value?: FirestoreValue): boolean | undefined {
  return typeof value?.booleanValue === 'boolean' ? value.booleanValue : undefined
}

function readStringArray(value?: FirestoreValue): string[] | undefined {
  // Algunos documentos guardan las tecnologias como CSV en vez de array.
  const csv = readString(value)
  if (csv) {
    return csv.split(',').map((item) => item.trim()).filter(Boolean)
  }

  const values = value?.arrayValue?.values
  if (!values) {
    return undefined
  }

  return values.map((item) => readString(item)).filter((item): item is string => Boolean(item))
}

function readTimestamp(value?: FirestoreValue): FirebaseTimestamp | undefined {
  if (!value?.timestampValue) {
    return undefined
  }

  const millis = Date.parse(value.timestampValue)
  if (Number.isNaN(millis)) {
    return undefined
  }

  return {
    _seconds: Math.floor(millis / 1000),
    _nanoseconds: (millis % 1000) * 1e6,
  }
}

function toFirebaseProject(document: FirestoreDocument): FirebaseProject | null {
  const fields = document.fields ?? {}
  const title = readString(fields.title)

  // El consumidor lee `title` sin guarda, asi que un documento sin titulo se descarta.
  if (!title) {
    return null
  }

  const readmeUrl = readString(fields.readmeUrl)

  return {
    id: document.name.split('/').pop() ?? '',
    title,
    description: readString(fields.description),
    image: readString(fields.image),
    previewLink: readString(fields.previewLink),
    githubLink: readString(fields.githubLink),
    technologies: readStringArray(fields.technologies),
    status: readString(fields.status),
    isDeployed: readBoolean(fields.isDeployed),
    readmeUrl,
    readmeFileName: readString(fields.readmeFileName),
    hasReadme: readBoolean(fields.hasReadme) ?? Boolean(readmeUrl),
    createdAt: readTimestamp(fields.createdAt),
    updatedAt: readTimestamp(fields.updatedAt),
  }
}

/**
 * Fetches projects straight from Cloud Firestore (REST), newest first.
 * Firestore stores a single locale, so the caller's locale only affects the transform.
 */
export async function fetchFirebaseProjects(): Promise<FirebaseProject[]> {
  const url =
    `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}` +
    `/databases/(default)/documents/${FIRESTORE_COLLECTION}` +
    `?pageSize=${FIRESTORE_PAGE_SIZE}&key=${getFirebaseApiKey()}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`)
    }

    const data: { documents?: FirestoreDocument[] } = await response.json()
    const projects = (data.documents ?? [])
      .map(toFirebaseProject)
      .filter((project): project is FirebaseProject => project !== null)

    projects.sort((a, b) => (b.createdAt?._seconds ?? 0) - (a.createdAt?._seconds ?? 0))

    return projects
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
 * Slug estable a partir del titulo, usado como clave de `projectCovers`.
 */
export function toProjectSlug(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

/**
 * Preferimos la portada local: las URLs de Firebase Storage quedaron inaccesibles
 * (HTTP 402, cuenta de facturacion cerrada) y dejaban la tarjeta sin imagen.
 */
function resolveProjectImage(title: string, remoteImage?: string): string | undefined {
  return projectCovers[toProjectSlug(title)] ?? (remoteImage?.trim() || undefined)
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

  const resolvedImage = resolveProjectImage(firebaseProject.title, firebaseProject.image)

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
    media: resolvedImage
      ? {
          type: 'image',
          src: resolvedImage,
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
  const firebaseProjects = await fetchFirebaseProjects()

  if (!firebaseProjects.length) {
    return []
  }

  return firebaseProjects.map((project) => transformFirebaseProject(project, locale ?? 'es'))
}

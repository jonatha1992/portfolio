
import { useState, useEffect } from 'react'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent, Project, Locale } from '../data/types'
import type { UiCopy } from '../i18n'
import { FiGithub, FiExternalLink, FiFileText, FiX } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getTechIcon } from '../icons/techIcons'
import { getPortfolioProjectsFromFirebase } from '../services/firebase'

type ProjectsSectionProps = {
  projects: ProfileContent['projects']
  externalInfo: ProfileContent['externalSources']['projectsFromFirebase']
  copy: UiCopy['sections']['projects']
  locale: Locale
}

function looksLikeHtmlDocument(content: string): boolean {
  return /<(?:!doctype|html|head|body)\b/i.test(content)
}

function toRawGitHubUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname !== 'github.com') {
      return url
    }

    const segments = parsedUrl.pathname.split('/').filter(Boolean)

    if (segments.length >= 5 && segments[2] === 'blob') {
      const [owner, repo, , branch, ...filePath] = segments

      if (!owner || !repo || !branch || !filePath.length) {
        return url
      }

      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath.join('/')}`
    }
  } catch {
    return url
  }

  return url
}

function getReadmeFetchCandidates(url: string): string[] {
  const trimmedUrl = url.trim()
  const candidates = new Set<string>()

  if (!trimmedUrl) {
    return []
  }

  candidates.add(toRawGitHubUrl(trimmedUrl))
  candidates.add(trimmedUrl)

  try {
    const parsedUrl = new URL(trimmedUrl)

    if (parsedUrl.hostname === 'github.com') {
      const segments = parsedUrl.pathname.split('/').filter(Boolean)

      if (segments.length >= 2 && segments.length < 5) {
        const owner = segments[0]
        const repo = segments[1]

        candidates.add(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`)
        candidates.add(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`)
      }
    }
  } catch {
    return Array.from(candidates)
  }

  return Array.from(candidates)
}

function resolveMarkdownResourceUrl(rawUrl: string | undefined, baseUrl: string): string | undefined {
  if (!rawUrl) {
    return undefined
  }

  try {
    return new URL(rawUrl, baseUrl).toString()
  } catch {
    return rawUrl
  }
}

const ProjectsSection = ({ projects, externalInfo, copy, locale }: ProjectsSectionProps) => {
  const [firebaseProjects, setFirebaseProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [readmeProject, setReadmeProject] = useState<Project | null>(null)
  const [readmeContent, setReadmeContent] = useState('')
  const [readmeSourceUrl, setReadmeSourceUrl] = useState('')
  const [isReadmeLoading, setIsReadmeLoading] = useState(false)
  const [readmeError, setReadmeError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch from Firebase if enabled
    if (externalInfo.enabled) {
      setIsLoading(true)
      getPortfolioProjectsFromFirebase(locale)
        .then((fetchedProjects) => {
          setFirebaseProjects(fetchedProjects)
        })
        .catch((error) => {
          console.error('Failed to fetch Firebase projects:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [externalInfo.enabled, locale])

  useEffect(() => {
    if (!selectedProject && !readmeProject) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (readmeProject) {
          setReadmeProject(null)
          setReadmeContent('')
          setReadmeSourceUrl('')
          setReadmeError(null)
          setIsReadmeLoading(false)
          return
        }

        setSelectedProject(null)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProject, readmeProject])

  useEffect(() => {
    if (!readmeProject?.readmeUrl) {
      return
    }

    const abortController = new AbortController()
    const fetchReadme = async () => {
      const candidateUrls = getReadmeFetchCandidates(readmeProject.readmeUrl ?? '')

      if (!candidateUrls.length) {
        setReadmeError(locale === 'es' ? 'No se encontro una URL valida para el README.' : 'No valid README URL was found.')
        setReadmeContent('')
        setIsReadmeLoading(false)
        return
      }

      setIsReadmeLoading(true)
      setReadmeError(null)
      setReadmeContent('')

      let lastError: string | null = null

      for (const candidateUrl of candidateUrls) {
        try {
          const response = await fetch(candidateUrl, {
            signal: abortController.signal,
            headers: {
              Accept: 'text/markdown,text/plain;q=0.9,*/*;q=0.5',
            },
          })

          if (!response.ok) {
            lastError = `HTTP ${response.status}`
            continue
          }

          const markdown = await response.text()

          if (!markdown.trim()) {
            lastError = locale === 'es' ? 'El README esta vacio.' : 'The README is empty.'
            continue
          }

          if (looksLikeHtmlDocument(markdown)) {
            lastError = locale === 'es' ? 'La URL devolvio HTML en vez de Markdown.' : 'The URL returned HTML instead of Markdown.'
            continue
          }

          setReadmeSourceUrl(candidateUrl)
          setReadmeContent(markdown)
          setReadmeError(null)
          setIsReadmeLoading(false)
          return
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return
          }

          lastError = error instanceof Error ? error.message : null
        }
      }

      setReadmeContent('')
      setReadmeError(
        locale === 'es'
          ? `No se pudo cargar el README en este momento.${lastError ? ` (${lastError})` : ''}`
          : `Could not load the README right now.${lastError ? ` (${lastError})` : ''}`,
      )
      setIsReadmeLoading(false)
    }

    void fetchReadme()

    return () => {
      abortController.abort()
    }
  }, [locale, readmeProject])

  // Use Firebase projects if enabled and loaded, otherwise use static projects
  const displayProjects = externalInfo.enabled && firebaseProjects.length > 0 ? firebaseProjects : projects
  const [integrationBefore, integrationAfter = ''] = copy.integrationDescription.split('{bucket}')

  const getSummaryExcerpt = (summary: string) => {
    const normalizedSummary = summary.trim()

    if (!normalizedSummary) {
      return locale === 'es' ? 'Sin descripción disponible.' : 'No description available.'
    }

    return normalizedSummary
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const closeReadmeModal = () => {
    setReadmeProject(null)
    setReadmeContent('')
    setReadmeSourceUrl('')
    setReadmeError(null)
    setIsReadmeLoading(false)
  }

  const cardActionLinkClassName =
    'inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary'

  const renderStatusBadge = (status?: string) => {
    if (!status) {
      return null
    }

    return (
      <span
        className="inline-flex items-center rounded-md border border-neutral-200/80 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300"
        aria-label={`${copy.statusLabel}: ${status}`}
      >
        {status}
      </span>
    )
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const openReadmeModal = (project: Project) => {
    if (!project.readmeUrl) {
      return
    }

    setReadmeContent('')
    setReadmeSourceUrl('')
    setReadmeError(null)
    setIsReadmeLoading(true)
    setReadmeProject(project)
  }

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>, project: Project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProjectModal(project)
    }
  }

  const renderProject = (project: Project) => (
    <article
      key={project.title}
      className="group flex h-full w-full min-w-0 cursor-pointer flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-neutral-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-slate-800 dark:bg-surface dark:hover:border-slate-700"
      onClick={() => openProjectModal(project)}
      onKeyDown={(event) => handleCardKeyDown(event, project)}
      role="button"
      tabIndex={0}
      aria-label={project.title}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 wrap-break-word font-display text-base font-semibold leading-snug text-slate-900 dark:text-white">
          {project.title}
        </h3>
        {renderStatusBadge(project.status)}
      </div>
      {project.role && !['proyecto', 'project'].includes(project.role.trim().toLowerCase()) && (
        <p className="-mt-2 text-xs text-slate-500 dark:text-slate-400">{project.role}</p>
      )}
      <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{getSummaryExcerpt(project.summary)}</p>
      {project.stack.length > 0 && (
        <p className="mt-auto text-xs text-slate-500 dark:text-slate-400" aria-label="Project technologies">
          {project.stack.slice(0, 4).join(' · ')}
          {project.stack.length > 4 && <span className="text-slate-400 dark:text-slate-500"> +{project.stack.length - 4}</span>}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-neutral-100 pt-3 text-sm font-medium dark:border-slate-800">
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className={cardActionLinkClassName}
            onClick={(event) => event.stopPropagation()}
          >
            <FiGithub className="h-4 w-4" />
            {copy.codeCta}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={cardActionLinkClassName}
            onClick={(event) => event.stopPropagation()}
          >
            <FiExternalLink className="h-4 w-4" />
            {copy.liveCta}
          </a>
        )}
        {project.readmeUrl && (
          <button
            type="button"
            className={cardActionLinkClassName}
            onClick={(event) => {
              event.stopPropagation()
              openReadmeModal(project)
            }}
          >
            <FiFileText className="h-4 w-4" />
            {copy.readmeCta}
          </button>
        )}
      </div>
    </article>
  )

  return (
    <section id="proyectos" className="w-full space-y-3">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      {isLoading ? (
        <div className="grid gap-4">
          <div className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-300">{copy.loadingLabel}</span>
          </div>
        </div>
      ) : (
      <div className="grid w-full gap-3.5 md:grid-cols-2 lg:grid-cols-3">{displayProjects.map(renderProject)}</div>
      )}
      {!externalInfo.enabled && (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/80 p-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-surface/70 dark:text-slate-200">
          <p className="font-semibold text-slate-800 dark:text-slate-100">{copy.integrationTitle}</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            {integrationBefore}
            <code className="text-xs text-primary-dark dark:text-primary-light">{externalInfo.bucketPath}</code>
            {integrationAfter}
          </p>
        </div>
      )}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={closeProjectModal}
        >
          <div className="mx-auto flex min-h-full w-full items-start justify-center py-4 sm:items-center">
            <article
              className="w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-4 shadow-2xl dark:border-slate-600 dark:bg-surface sm:p-5"
              onClick={(event) => event.stopPropagation()}
            >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.status && <Pill label={`${copy.statusLabel}: ${selectedProject.status}`} />}
                </div>
                <h3 id="project-modal-title" className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{selectedProject.role}</p>
              </div>
              <button
                type="button"
                onClick={closeProjectModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-slate-600 transition hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:text-slate-200 dark:hover:text-white"
                aria-label={copy.closeModalLabel}
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {selectedProject.summary.trim() || (locale === 'es' ? 'Sin descripción disponible.' : 'No description available.')}
            </p>
            {selectedProject.highlights.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {selectedProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
            {selectedProject.stack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <Pill key={tech} label={tech} icon={getTechIcon(tech)} />
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              {selectedProject.codeUrl && (
                <a
                  href={selectedProject.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light dark:text-primary-light dark:hover:text-white"
                >
                  <FiGithub className="h-4 w-4" />
                  {copy.codeCta}
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light dark:text-primary-light dark:hover:text-white"
                >
                  <FiExternalLink className="h-4 w-4" />
                  {copy.liveCta}
                </a>
              )}
              {selectedProject.readmeUrl && (
                <button
                  type="button"
                  onClick={() => openReadmeModal(selectedProject)}
                  className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light dark:text-primary-light dark:hover:text-white"
                >
                  <FiFileText className="h-4 w-4" />
                  {copy.readmeCta}
                </button>
              )}
            </div>
            </article>
          </div>
        </div>
      )}
      {readmeProject && (
        <div
          className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="readme-modal-title"
          onClick={closeReadmeModal}
        >
          <div className="mx-auto flex min-h-full w-full items-start justify-center py-4 sm:items-center">
            <article
              className="w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-slate-600 dark:bg-surface"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-slate-700 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{copy.readmeCta}</p>
                  <h3
                    id="readme-modal-title"
                    className="truncate font-display text-lg font-semibold text-slate-900 dark:text-white"
                    title={readmeProject.title}
                  >
                    {readmeProject.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {readmeProject.readmeUrl && (
                    <a
                      href={readmeProject.readmeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden text-xs font-semibold text-primary-dark underline decoration-primary/40 underline-offset-4 transition hover:text-primary-light dark:text-primary-light dark:hover:text-white sm:inline"
                    >
                      {locale === 'es' ? 'Abrir original' : 'Open original'}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={closeReadmeModal}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-slate-600 transition hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:text-slate-200 dark:hover:text-white"
                    aria-label={copy.closeModalLabel}
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              </header>
              <div className="max-h-[75vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
                {isReadmeLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <span className="ml-3 text-sm text-slate-600 dark:text-slate-300">
                      {locale === 'es' ? 'Cargando README...' : 'Loading README...'}
                    </span>
                  </div>
                ) : readmeError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
                    <p>{readmeError}</p>
                    {readmeProject.readmeUrl && (
                      <a
                        href={readmeProject.readmeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        {locale === 'es' ? 'Abrir README en nueva pestana' : 'Open README in a new tab'}
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none wrap-break-word prose-headings:font-display prose-a:text-primary-dark prose-a:underline prose-a:decoration-primary/40 prose-a:underline-offset-4 prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-slate-100 dark:prose-invert dark:prose-a:text-primary-light">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children, ...props }) => {
                          const resolvedHref = resolveMarkdownResourceUrl(href, readmeSourceUrl)
                          const isHashLink = resolvedHref?.startsWith('#')

                          if (!resolvedHref) {
                            return <span>{children}</span>
                          }

                          return (
                            <a
                              {...props}
                              href={resolvedHref}
                              target={isHashLink ? undefined : '_blank'}
                              rel={isHashLink ? undefined : 'noreferrer'}
                            >
                              {children}
                            </a>
                          )
                        },
                        img: ({ src, alt, ...props }) => {
                          const resolvedSrc = resolveMarkdownResourceUrl(src, readmeSourceUrl)

                          if (!resolvedSrc) {
                            return null
                          }

                          return <img {...props} src={resolvedSrc} alt={alt ?? ''} loading="lazy" className="rounded-xl" />
                        },
                      }}
                    >
                      {readmeContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjectsSection

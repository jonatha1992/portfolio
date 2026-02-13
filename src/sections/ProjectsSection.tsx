
import { useState, useEffect } from 'react'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import ImageWithLoader from '../components/common/ImageWithLoader'
import type { ProfileContent, Project, Locale } from '../data/types'
import type { UiCopy } from '../i18n'
import { FiGithub, FiExternalLink, FiFileText, FiX } from 'react-icons/fi'
import { getTechIcon } from '../icons/techIcons'
import { getPortfolioProjectsFromFirebase } from '../services/firebase'

type ProjectsSectionProps = {
  projects: ProfileContent['projects']
  externalInfo: ProfileContent['externalSources']['projectsFromFirebase']
  copy: UiCopy['sections']['projects']
  locale: Locale
}

const ProjectsSection = ({ projects, externalInfo, copy, locale }: ProjectsSectionProps) => {
  const [firebaseProjects, setFirebaseProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
    if (!selectedProject) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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
  }, [selectedProject])

  // Use Firebase projects if enabled and loaded, otherwise use static projects
  const displayProjects = externalInfo.enabled && firebaseProjects.length > 0 ? firebaseProjects : projects
  const [integrationBefore, integrationAfter = ''] = copy.integrationDescription.split('{bucket}')

  const getSummaryExcerpt = (summary: string) => {
    const normalizedSummary = summary.trim()

    if (!normalizedSummary) {
      return locale === 'es' ? 'Sin descripcion disponible.' : 'No description available.'
    }

    const maxLength = 110

    if (normalizedSummary.length <= maxLength) {
      return normalizedSummary
    }

    return `${normalizedSummary.slice(0, maxLength).trimEnd()}...`
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const getVisibleCardTech = (stack: string[]) => stack.slice(0, 4)
  const cardActionLinkClassName =
    'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300/90 px-2 py-2 text-center text-primary-dark transition hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:text-primary-light dark:hover:border-primary-light dark:hover:text-white'

  const getStatusBadgeClasses = (status: string) => {
    const normalizedStatus = status.trim().toLowerCase()

    if (normalizedStatus.includes('produ')) {
      return 'bg-emerald-600/90'
    }

    if (normalizedStatus.includes('desar')) {
      return 'bg-amber-500/90 text-slate-950'
    }

    return 'bg-primary/90'
  }

  const renderStatusBadge = (status?: string) => {
    if (!status) {
      return null
    }

    return (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-sm ${getStatusBadgeClasses(status)}`}
        aria-label={`${copy.statusLabel}: ${status}`}
      >
        {status}
      </span>
    )
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
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
      className="group grid h-full w-full min-w-0 cursor-pointer gap-3 overflow-hidden rounded-2xl border border-neutral-300 bg-white p-4 text-center shadow-soft transition hover:-translate-y-1 hover:border-primary-light hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:border-slate-700 dark:bg-surface"
      onClick={() => openProjectModal(project)}
      onKeyDown={(event) => handleCardKeyDown(event, project)}
      role="button"
      tabIndex={0}
      aria-label={project.title}
    >
      {/* Project Image */}
      {project.media && (
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-slate-600">
          <ImageWithLoader
            src={project.media.src}
            alt={project.media.alt}
            containerClassName="h-40 w-full"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            spinnerDelayMs={0}
            minimumLoadingMs={480}
            loaderClassName="bg-slate-950/30 dark:bg-slate-900/65"
          />
          <div className="absolute left-1/2 top-2 -translate-x-1/2">{renderStatusBadge(project.status)}</div>
        </div>
      )}
      {!project.media && project.status && <div className="flex justify-center">{renderStatusBadge(project.status)}</div>}

      <div className="min-w-0">
        <h3 className="break-words font-display text-lg font-semibold leading-tight text-slate-900 dark:text-white sm:text-xl">
          {project.title}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">{project.role}</p>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{getSummaryExcerpt(project.summary)}</p>
      {project.highlights.length > 0 && (
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex justify-center gap-2 text-left">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
      {project.stack.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5" aria-label="Project technologies">
          {getVisibleCardTech(project.stack).map((tech, index) => (
            <span
              key={`${project.title}-${tech}-${index}`}
              title={tech}
              aria-label={tech}
              className="inline-flex h-7 max-w-[9rem] items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-1.5 text-[11px] text-slate-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200"
            >
              {getTechIcon(tech)}
              <span className="truncate">{tech}</span>
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="inline-flex h-7 items-center rounded-lg border border-neutral-200 bg-neutral-100 px-2 text-[11px] font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="min-w-0 grid gap-2 text-xs font-semibold [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
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
            <a
              href={project.readmeUrl}
              target="_blank"
              rel="noreferrer"
              className={cardActionLinkClassName}
              onClick={(event) => event.stopPropagation()}
            >
              <FiFileText className="h-4 w-4" />
              {copy.readmeCta}
            </a>
          )}
        </div>
      </div>
    </article>
  )

  return (
    <section id="proyectos" className="w-full space-y-4">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<CommandLineIcon className="h-6 w-6" />}
      />
      {isLoading ? (
        <div className="grid gap-4">
          <div className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-300">{copy.loadingLabel}</span>
          </div>
        </div>
      ) : (
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">{displayProjects.map(renderProject)}</div>
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
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={closeProjectModal}
        >
          <div className="mx-auto flex min-h-full w-full items-start justify-center py-4 sm:items-center">
            <article
              className="w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-5 shadow-2xl dark:border-slate-600 dark:bg-surface sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.status && <Pill label={`${copy.statusLabel}: ${selectedProject.status}`} />}
                </div>
                <h3 id="project-modal-title" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
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
            {selectedProject.media && (
              <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-slate-600">
                <ImageWithLoader
                  src={selectedProject.media.src}
                  alt={selectedProject.media.alt}
                  containerClassName="h-56 w-full sm:h-64"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  spinnerDelayMs={0}
                  minimumLoadingMs={480}
                  loaderClassName="bg-slate-950/30 dark:bg-slate-900/65"
                />
              </div>
            )}
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {selectedProject.summary.trim() || (locale === 'es' ? 'Sin descripcion disponible.' : 'No description available.')}
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
                <a
                  href={selectedProject.readmeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light dark:text-primary-light dark:hover:text-white"
                >
                  <FiFileText className="h-4 w-4" />
                  {copy.readmeCta}
                </a>
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

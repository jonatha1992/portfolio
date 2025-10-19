
import { CommandLineIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent, Project } from '../data/types'
import type { UiCopy } from '../i18n'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

type ProjectsSectionProps = {
  projects: ProfileContent['projects']
  externalInfo: ProfileContent['externalSources']['projectsFromFirebase']
  copy: UiCopy['sections']['projects']
}

const ProjectsSection = ({ projects, externalInfo, copy }: ProjectsSectionProps) => {
  const [integrationBefore, integrationAfter = ''] = copy.integrationDescription.split('{bucket}')

  const renderProject = (project: Project) => (
    <article
      key={project.title}
      className="group grid gap-6 rounded-3xl border border-neutral-300 bg-white p-8 shadow-soft transition hover:-translate-y-1.5 hover:border-primary-light hover:shadow-glow dark:border-slate-700 dark:bg-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{project.role}</p>
        </div>
        <Pill label={project.period} variant="primary" />
      </div>
      <p className="text-base text-slate-600 dark:text-slate-300">{project.summary}</p>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Pill key={tech} label={tech} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light"
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
            className="inline-flex items-center gap-2 text-primary-dark transition hover:text-primary-light"
          >
            <FiExternalLink className="h-4 w-4" />
            {copy.liveCta}
          </a>
        )}
      </div>
    </article>
  )

  return (
    <section id="proyectos" className="space-y-8">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<CommandLineIcon className="h-6 w-6" />}
      />
      <div className="grid gap-8">{projects.map(renderProject)}</div>
      {!externalInfo.enabled && (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/80 p-5 text-sm text-slate-700 dark:border-slate-600 dark:bg-surface/70 dark:text-slate-200">
          <p className="font-semibold text-slate-800 dark:text-slate-100">{copy.integrationTitle}</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            {integrationBefore}
            <code className="text-xs text-primary-dark dark:text-primary-light">{externalInfo.bucketPath}</code>
            {integrationAfter}
          </p>
        </div>
      )}
    </section>
  )
}

export default ProjectsSection

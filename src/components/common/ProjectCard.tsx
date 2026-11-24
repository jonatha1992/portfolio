import { FiArrowUpRight, FiGithub, FiFileText } from 'react-icons/fi'
import type { Project } from '../../data/types'
import type { UiCopy } from '../../i18n'

type ProjectCardProps = {
  project: Project
  copy: UiCopy['sections']['projects']
  onOpen: (project: Project) => void
  onReadme: (project: Project) => void
}

export default function ProjectCard({ project, copy, onOpen, onReadme }: ProjectCardProps) {
  const coverSrcSet = project.media?.src.endsWith('.webp')
    ? `${project.media.src.replace(/\.webp$/, '-600.webp')} 600w, ${project.media.src} 1200w`
    : undefined

  return (
    <article className="project-card" data-reveal>
      {project.media && (
        <img
          className="project-cover"
          src={project.media.src}
          srcSet={coverSrcSet}
          sizes={coverSrcSet ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px' : undefined}
          alt={project.media.alt}
          width={coverSrcSet ? 1200 : 720}
          height={coverSrcSet ? 750 : 450}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="project-card-body">
        <p className="project-status">{project.status || '—'}</p>
        <h4><button className="project-title" onClick={() => onOpen(project)} aria-label={project.title}>
          {project.title.split(/ [-—] /)[0]}<FiArrowUpRight aria-hidden />
        </button></h4>
        <p className="project-summary">{project.summary}</p>
        <p className="project-stack">
          {project.stack.slice(0, 4).join(' · ')}
          {project.stack.length > 4 && ` +${project.stack.length - 4}`}
        </p>
        <div className="project-actions">
          {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noreferrer"><FiGithub aria-hidden />{copy.codeCta}</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><FiArrowUpRight aria-hidden />{copy.liveCta}</a>}
          {project.readmeUrl && <button onClick={() => onReadme(project)}><FiFileText aria-hidden />{copy.readmeCta}</button>}
        </div>
      </div>
    </article>
  )
}

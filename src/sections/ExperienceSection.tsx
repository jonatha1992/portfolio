import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type ExperienceSectionProps = {
  experience: ProfileContent['experience']
  copy: UiCopy['sections']['experience']
}

const ExperienceSection = ({ experience, copy }: ExperienceSectionProps) => {
  return (
    <section id="experiencia" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="space-y-4">
        {experience.map((job) => (
          <article
            key={job.company}
            className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-slate-800 dark:bg-surface"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{job.company}</p>
              </div>
              <Pill label={job.period} variant="primary" />
            </div>
            <ul className="mt-3.5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {job.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <Pill key={tech} label={tech} icon={getTechIcon(tech)} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection

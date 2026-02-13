import { BriefcaseIcon } from '@heroicons/react/24/outline'
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
        icon={<BriefcaseIcon className="h-6 w-6" />}
      />
      <div className="space-y-4">
        {experience.map((job) => (
          <article
            key={job.company}
            className="rounded-3xl border border-neutral-300 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-surface"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">{job.company}</p>
              </div>
              <Pill label={job.period} variant="primary" />
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              {job.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
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

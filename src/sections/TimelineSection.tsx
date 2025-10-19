import { ClockIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent, TimelineItem } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type TimelineSectionProps = {
  timeline: ProfileContent['timeline']
  copy: UiCopy['sections']['timeline']
}

const badgeStyles: Record<TimelineItem['type'], string> = {
  work: 'bg-primary text-white',
  education: 'bg-emerald-500/90 text-white',
  certification: 'bg-amber-500/90 text-white',
}

const TimelineSection = ({ timeline, copy }: TimelineSectionProps) => {
  if (!timeline.length) {
    return null
  }

  return (
    <section id="timeline" className="space-y-8">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<ClockIcon className="h-6 w-6" />}
      />
      <div className="relative border-l-2 border-neutral-300 pl-8 dark:border-slate-700">
        {timeline.map((item, index) => {
          const badgeLabel = copy.badges[item.type]
          return (
            <article key={`${item.title}-${index}`} className="relative mb-10 last:mb-0">
              <div className="absolute -left-[39px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-dark text-xs font-semibold text-white shadow ring-4 ring-primary-light/30 dark:border-surface">
                {index + 1}
              </div>
              <div className="space-y-2 rounded-2xl border border-neutral-300 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-surface">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyles[item.type]}`}>
                  {badgeLabel}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-primary">{item.organization}</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {item.from}
                  {'to' in item && item.to ? ` — ${item.to}` : ''}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                {item.tech && (
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <Pill key={tech} label={tech} icon={getTechIcon(tech)} />
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
        <div className="absolute -left-[9px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary-light/40 via-transparent to-primary/10" />
      </div>
    </section>
  )
}

export default TimelineSection

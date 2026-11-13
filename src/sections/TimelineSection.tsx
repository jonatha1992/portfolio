import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type TimelineSectionProps = {
  timeline: ProfileContent['timeline']
  copy: UiCopy['sections']['timeline']
}

const TimelineSection = ({ timeline, copy }: TimelineSectionProps) => {
  if (!timeline.length) {
    return null
  }

  return (
    <section id="timeline" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="relative border-l border-neutral-200 pl-6 dark:border-slate-800">
        {timeline.map((item, index) => {
          const badgeLabel = copy.badges[item.type]
          return (
            <article key={`${item.title}-${index}`} className="relative mb-6 last:mb-0">
              <div className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-white text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {index + 1}
              </div>
              <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4.5 dark:border-slate-800 dark:bg-surface">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {badgeLabel}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {item.from}
                    {'to' in item && item.to ? ` — ${item.to}` : ''}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                {item.tech && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tech.map((tech) => (
                      <Pill key={tech} label={tech} icon={getTechIcon(tech)} />
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TimelineSection

import { TrophyIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type AchievementsSectionProps = {
  achievements: ProfileContent['achievements']
  copy: UiCopy['sections']['achievements']
}

const AchievementsSection = ({ achievements, copy }: AchievementsSectionProps) => {
  return (
    <section id="logros" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<TrophyIcon className="h-6 w-6" />}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <article
            key={achievement.title}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-300 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-primary-light hover:shadow-glow dark:border-slate-700 dark:bg-surface"
          >
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                {achievement.title}
              </h3>
              {achievement.impact && (
                <p className="mt-2 text-sm font-medium text-primary-dark">{achievement.impact}</p>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{achievement.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {achievement.tech.map((tech) => (
                <Pill key={tech} label={tech} variant="primary" icon={getTechIcon(tech)} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AchievementsSection

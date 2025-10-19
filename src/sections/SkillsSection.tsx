import { CpuChipIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type SkillsSectionProps = {
  skills: ProfileContent['skills']
  copy: UiCopy['sections']['skills']
}

const SkillsSection = ({ skills, copy }: SkillsSectionProps) => {
  return (
    <section id="habilidades" className="space-y-8">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<CpuChipIcon className="h-6 w-6" />}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((category) => (
          <article
            key={category.label}
            className="group rounded-2xl border border-neutral-300 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary-light hover:shadow-glow dark:border-slate-700 dark:bg-surface"
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Pill key={item} label={item} icon={getTechIcon(item)} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection

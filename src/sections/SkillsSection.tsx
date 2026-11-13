import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'

type SkillsSectionProps = {
  skills: ProfileContent['skills']
  copy: UiCopy['sections']['skills']
}

const SkillsSection = ({ skills, copy }: SkillsSectionProps) => {
  return (
    <section id="habilidades" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((category) => (
          <article
            key={category.label}
            className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-slate-800 dark:bg-surface"
          >
            <h3 className="mb-3 font-display text-base font-semibold text-slate-900 dark:text-white">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Pill key={item} label={item} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection

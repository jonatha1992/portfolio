import { AcademicCapIcon } from '@heroicons/react/24/outline'
import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'

type EducationSectionProps = {
  education: ProfileContent['education']
  certifications: ProfileContent['certifications']
  copy: UiCopy['sections']['education']
}

const EducationSection = ({ education, certifications, copy }: EducationSectionProps) => {
  return (
    <section id="formacion" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<AcademicCapIcon className="h-6 w-6" />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-neutral-300 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-surface">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {copy.educationHeading}
          </h3>
          <ul className="mt-3 space-y-3">
            {education.map((item) => (
              <li key={`${item.institution}-${item.program}`} className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.program}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.institution}</p>
                <Pill label={item.period} variant="primary" />
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-neutral-300 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-surface">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {copy.certificationsHeading}
          </h3>
          <ul className="mt-3 space-y-3">
            {certifications.map((item) => (
              <li key={`${item.name}-${item.issuer}`} className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.issuer}</p>
                <Pill label={item.year.toString()} />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default EducationSection

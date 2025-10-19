import type { ReactNode } from 'react'

type SectionHeaderProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  icon?: ReactNode
}

const SectionHeader = ({ id, eyebrow, title, description, align = 'left', icon }: SectionHeaderProps) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div id={id} className={`flex flex-col gap-2 ${alignment}`}>
      {icon && (
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-light/40 bg-primary-light/10 text-primary-dark dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          {icon}
        </div>
      )}
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {description && <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">{description}</p>}
    </div>
  )
}

export default SectionHeader

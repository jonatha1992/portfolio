import type { ReactNode } from 'react'

type PillVariant = 'primary' | 'neutral'

type PillProps = {
  label: string
  variant?: PillVariant
  icon?: ReactNode
}

const baseClasses =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.04em]'

const variants: Record<PillVariant, string> = {
  primary:
    'border-primary-light/40 bg-primary-light/15 text-primary-dark transition hover:border-primary-light hover:bg-primary-light/25 dark:border-primary/50 dark:bg-primary/20 dark:text-primary-light',
  neutral:
    'border-neutral-300 bg-white text-slate-600 transition hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:bg-surface/70 dark:text-slate-200',
}

const Pill = ({ label, variant = 'neutral', icon }: PillProps) => {
  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {icon && <span className="flex items-center text-base">{icon}</span>}
      {label}
    </span>
  )
}

export default Pill

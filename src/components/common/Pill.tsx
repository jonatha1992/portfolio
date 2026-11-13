import type { ReactNode } from 'react'

type PillVariant = 'primary' | 'neutral'

type PillProps = {
  label: string
  variant?: PillVariant
  icon?: ReactNode
}

const baseClasses =
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-normal normal-case transition-colors'

const variants: Record<PillVariant, string> = {
  primary:
    'border-neutral-200 bg-neutral-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
  neutral:
    'border-neutral-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
}

const Pill = ({ label, variant = 'neutral', icon }: PillProps) => {
  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {icon && <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">{icon}</span>}
      {label}
    </span>
  )
}

export default Pill

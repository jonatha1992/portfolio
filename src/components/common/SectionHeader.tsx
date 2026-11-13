type SectionHeaderProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

const SectionHeader = ({ id, eyebrow, title, description, align = 'left' }: SectionHeaderProps) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div id={id} className={`flex flex-col gap-1 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{eyebrow}</span>
      )}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">{description}</p>}
    </div>
  )
}

export default SectionHeader

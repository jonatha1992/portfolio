
import { useLocale } from '../../context/LocaleContext'

type LanguageToggleProps = {
  className?: string
}

const LanguageToggle = ({ className = '' }: LanguageToggleProps) => {
  const { locale, toggleLocale } = useLocale()
  const isSpanish = locale === 'es'

  const baseClasses =
    'flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-xs font-medium text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900 focus:outline-hidden dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`${baseClasses} ${className}`.trim()}
      aria-label={isSpanish ? 'Cambiar a inglés' : 'Switch to Spanish'}
    >
      <span>{isSpanish ? 'ES' : 'EN'}</span>
    </button>
  )
}

export default LanguageToggle

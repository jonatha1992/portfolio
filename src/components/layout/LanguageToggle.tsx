
import { useLocale } from '../../context/LocaleContext'

type LanguageToggleProps = {
  className?: string
}

const LanguageToggle = ({ className = '' }: LanguageToggleProps) => {
  const { locale, toggleLocale } = useLocale()
  const isSpanish = locale === 'es'

  const baseClasses =
    'flex h-9 w-9 items-center justify-center rounded-full border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light/50'
  const stateClasses = isSpanish
    ? 'border-primary bg-primary text-white dark:border-primary/80 dark:bg-primary/80'
    : 'border-neutral-300 bg-white text-slate-600 hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:bg-surface/80 dark:text-slate-200 dark:hover:text-primary-light'

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`${baseClasses} ${stateClasses} ${className}`.trim()}
      aria-label={isSpanish ? 'Cambiar a inglés' : 'Switch to Spanish'}
    >
      <span className="text-xs font-semibold">{isSpanish ? 'ES' : 'EN'}</span>
    </button>
  )
}

export default LanguageToggle

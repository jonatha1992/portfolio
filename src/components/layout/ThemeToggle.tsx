
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks/useTheme'

type ThemeToggleProps = {
  className?: string
}

export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const baseClasses =
    'flex h-9 w-9 items-center justify-center rounded-full border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light/50'
  const stateClasses = isDark
    ? 'border-primary bg-primary text-white dark:border-primary/80 dark:bg-primary/80'
    : 'border-neutral-300 bg-white text-slate-600 hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:bg-surface/80 dark:text-slate-200 dark:hover:text-primary-light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${baseClasses} ${stateClasses} ${className}`.trim()}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  )
}

export default ThemeToggle

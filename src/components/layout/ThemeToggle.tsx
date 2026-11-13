
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks/useTheme'

type ThemeToggleProps = {
  className?: string
}

export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const baseClasses =
    'flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900 focus:outline-hidden dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${baseClasses} ${className}`.trim()}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />} 
    </button>
  )
}

export default ThemeToggle

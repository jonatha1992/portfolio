
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export type NavItem = { id: string; label: string }

type SiteHeaderProps = {
  navItems: NavItem[]
  name: string
  headline: string
}

const SiteHeader = ({ navItems, name, headline }: SiteHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleNavigate = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-300 bg-white/95 backdrop-blur-lg shadow-sm dark:border-slate-700 dark:bg-surface/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 via-white to-primary/10 font-display text-sm font-semibold text-primary-dark shadow-sm">
            {name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="font-display text-base font-semibold text-neutral-900 dark:text-white">{name}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-300">{headline}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative text-sm font-semibold text-slate-600 transition hover:text-primary-light after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary-light after:transition-transform hover:after:scale-x-100 dark:text-slate-300 dark:hover:text-primary-light"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Abrir navegación"
            onClick={toggleMenu}
            className="rounded-full border border-neutral-300 p-2 text-slate-600 transition hover:border-primary-light hover:text-primary-light dark:border-slate-600 dark:text-slate-200"
          >
            {isOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pb-3 md:hidden">
          <div className="flex flex-col gap-3 rounded-xl border border-neutral-300 bg-white p-3 shadow-soft dark:border-slate-600 dark:bg-surface">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavigate}
                className="text-sm font-medium text-slate-600 transition hover:text-primary-light dark:text-slate-200"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-end gap-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default SiteHeader

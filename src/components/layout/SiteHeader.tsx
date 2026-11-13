
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
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 font-display text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{headline}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-3.5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
            className="rounded-lg border border-neutral-200 p-1.5 text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {isOpen ? <XMarkIcon className="h-4 w-4" /> : <Bars3Icon className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pb-3 md:hidden">
          <div className="flex flex-col gap-2.5 rounded-xl border border-neutral-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-surface">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavigate}
                className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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

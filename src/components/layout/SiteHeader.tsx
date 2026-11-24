import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export type NavItem = { id: string; label: string }
type SiteHeaderProps = { navItems: NavItem[]; name: string; headline: string }

export default function SiteHeader({ navItems, name }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const primaryItems = navItems.filter((item) => ['proyectos', 'habilidades', 'experiencia', 'contacto'].includes(item.id))
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#inicio" aria-label={name}>Correa.</a>
        <nav className="desktop-nav" aria-label="Principal">
          {primaryItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
        </nav>
        <div className="header-controls">
          <LanguageToggle /><ThemeToggle />
          <button className="menu-toggle" aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'} aria-expanded={isOpen} aria-controls="mobile-nav" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>
      </div>
      {isOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Secciones">
        {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setIsOpen(false)}>{item.label}</a>)}
      </nav>}
    </header>
  )
}

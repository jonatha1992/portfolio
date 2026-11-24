import type { ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SiteFooter from './SiteFooter'
import SiteHeader, { type NavItem } from './SiteHeader'

type SiteLayoutProps = {
  children: ReactNode
  navItems: NavItem[]
  name: string
  headline: string
  socials: {
    linkedin?: string
    github?: string
    cv?: string
  }
  footerNote: string
  footerLinkLabels: {
    linkedin: string
    github: string
    cv: string
  }
}

const SiteLayout = ({ children, navItems, name, headline, socials, footerNote, footerLinkLabels }: SiteLayoutProps) => {
  const revealRef = useScrollReveal<HTMLElement>(children)
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader navItems={navItems} name={name} headline={headline} />
      <main id="contenido" ref={revealRef} className="page-content">{children}</main>
      <SiteFooter name={name} socials={socials} note={footerNote} linkLabels={footerLinkLabels} />
    </div>
  )
}

export default SiteLayout

import type { ReactNode } from 'react'
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
  return (
    <div className="min-h-screen bg-neutral-100 text-slate-900 dark:bg-background dark:text-slate-100">
      <SiteHeader navItems={navItems} name={name} headline={headline} />
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">{children}</main>
      <SiteFooter name={name} socials={socials} note={footerNote} linkLabels={footerLinkLabels} />
    </div>
  )
}

export default SiteLayout

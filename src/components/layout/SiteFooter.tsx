import type { ReactElement } from 'react'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

type SiteFooterProps = {
  name: string
  socials: {
    linkedin?: string
    github?: string
    cv?: string
  }
  note: string
  linkLabels: {
    linkedin: string
    github: string
    cv: string
  }
}

const linkKeys = ['linkedin', 'github', 'cv'] as const

const iconMap: Record<(typeof linkKeys)[number], ReactElement> = {
  linkedin: <SiLinkedin className="h-4 w-4" />,
  github: <SiGithub className="h-4 w-4" />,
  cv: <ArrowDownTrayIcon className="h-4 w-4" />,
}

const SiteFooter = ({ name, socials, note, linkLabels }: SiteFooterProps) => (
  <footer className="border-t border-neutral-300 bg-white/80 py-10 backdrop-blur dark:border-slate-700/60 dark:bg-surface/80">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-300">{note}</p>
      </div>
      <div className="flex gap-4">
        {linkKeys.map((key) => {
          const href = socials[key]
          if (!href || href === '#') return null
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-primary-dark dark:text-slate-200 dark:hover:text-primary-light"
            >
              {iconMap[key]}
              {linkLabels[key]}
            </a>
          )
        })}
      </div>
    </div>
  </footer>
)

export default SiteFooter

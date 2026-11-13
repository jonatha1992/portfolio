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
  <footer className="border-t border-neutral-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{note}</p>
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {iconMap[key]}
              {linkLabels[key]}
            </a>
          )
        })}
      </div>
    </div>
    <p className="mt-5 text-center text-xs text-slate-400 dark:text-slate-500">
      Hecho por <a href="https://tecnofusion.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">tecnofusion.dev</a>
    </p>
  </footer>
)

export default SiteFooter

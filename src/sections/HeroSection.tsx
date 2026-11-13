import { EnvelopeIcon, MapPinIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si'
import ImageWithLoader from '../components/common/ImageWithLoader'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'

type HeroSectionProps = {
  personal: ProfileContent['personal']
  contact: ProfileContent['contact']
  socials: ProfileContent['socials']
  copy: UiCopy['hero']
}

const HeroSection = ({ personal, contact, socials, copy }: HeroSectionProps) => {
  return (
    <section id="inicio" className="py-6 md:py-10">
      <div className="grid gap-8 md:grid-cols-[1.3fr_minmax(0,0.7fr)] md:items-center">
        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              {personal.name}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200">
              {personal.headline}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{personal.location}</span>
            </p>
          </div>

          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {personal.summary}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <EnvelopeIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <SiWhatsapp className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <a
                href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500 dark:text-slate-400">{personal.availability}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark focus:outline-hidden"
            >
              <EnvelopeIcon className="h-4 w-4" />
              {copy.mailCta}
            </a>
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-slate-900 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white focus:outline-hidden"
              >
                <SiLinkedin className="h-4 w-4" />
                {copy.linkedinCta}
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-slate-900 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white focus:outline-hidden"
              >
                <SiGithub className="h-4 w-4" />
                {copy.githubCta}
              </a>
            )}
            {socials.cv && socials.cv !== '#' && (
              <a
                href={socials.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-slate-900 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white focus:outline-hidden"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                {copy.cvCta}
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-2xl border border-neutral-200 shadow-xs dark:border-slate-700 md:h-56 md:w-56">
          <ImageWithLoader
            src={personal.photo}
            alt={`Retrato de ${personal.name}`}
            className="h-full w-full object-cover object-center"
            containerClassName="h-full w-full"
            loading="eager"
            fallback={
              <div className="flex h-full flex-col items-center justify-center bg-neutral-100 text-center text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <span className="font-display text-lg font-semibold">{personal.name}</span>
                <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">{personal.headline}</span>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

import { EnvelopeIcon, MapPinIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si'
import Pill from '../components/common/Pill'
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
  const roles = personal.roles?.length
    ? personal.roles
    : personal.headline.split(' · ').map((role) => role.trim())

  return (
    <section
      id="inicio"
      className="relative overflow-hidden rounded-3xl border border-neutral-300 bg-white px-5 py-8 shadow-soft dark:border-slate-700 dark:bg-surface md:px-8 md:py-10"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-light/15 via-white to-accent/10 opacity-80 dark:from-primary/15 dark:via-transparent dark:to-primary/10" />
      <div className="grid gap-8 md:grid-cols-[1.3fr_minmax(0,0.7fr)] md:items-center">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/40 bg-primary-light/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-dark dark:border-primary/40 dark:bg-primary/15 dark:text-primary-light">
              <MapPinIcon className="h-4 w-4" />
              {personal.location}
            </span>
            {roles.map((role) => (
              <Pill key={role} label={role} />
            ))}
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
              {personal.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">{personal.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-primary-dark dark:text-primary-light" />
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-slate-700 hover:text-primary-light dark:text-slate-100"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <SiWhatsapp className="h-4 w-4 text-primary-dark dark:text-primary-light" />
              <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} className="font-medium text-slate-700 hover:text-primary-light dark:text-slate-100">
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900 dark:text-white">{copy.availabilityLabel}:</span>
              <span>{personal.availability}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-light"
            >
              <EnvelopeIcon className="h-4 w-4" />
              {copy.mailCta}
            </a>
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-200"
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-200"
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
                className="col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-200"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                {copy.cvCta}
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl border border-primary/30 shadow-2xl shadow-primary/20 dark:border-primary/50 md:h-56 md:w-56">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 via-transparent to-primary/20" />
          <ImageWithLoader
            src={personal.photo}
            alt={`Retrato de ${personal.name}`}
            className="h-full w-full object-cover object-center"
            containerClassName="h-full w-full"
            loading="lazy"
            fallback={
              <div className="flex h-full flex-col items-center justify-center bg-slate-900/80 text-center text-sm text-white backdrop-blur-sm">
                <span className="font-display text-xl font-semibold">{personal.name}</span>
                <span className="mt-1 text-xs font-medium text-primary-light">{personal.headline}</span>
                <span className="mt-3 text-xs text-slate-200">
                  Anade tu fotografia en public/assets/profile
                </span>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

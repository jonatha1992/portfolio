import {
  EnvelopeIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si'
import SectionHeader from '../components/common/SectionHeader'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'

type ContactSectionProps = {
  contact: ProfileContent['contact']
  socials: ProfileContent['socials']
  copy: UiCopy['sections']['contact']
}

const ContactSection = ({ contact, socials, copy }: ContactSectionProps) => {
  const whatsappHref = `https://wa.me/${contact.phone.replace(/\D/g, '')}`

  return (
    <section id="contacto" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-slate-800 dark:bg-surface">
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            {copy.directHeading}
          </h3>
          <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <EnvelopeIcon className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {copy.emailLabel}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-0.5 block text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <SiWhatsapp className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {`${copy.phoneLabel} / ${copy.whatsappLabel}`}
                </span>
                <a
                  href={whatsappHref}
                  className="mt-0.5 block text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {copy.locationLabel}
                </span>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">{contact.location}</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-slate-800 dark:bg-surface">
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            {copy.networksHeading}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{contact.availabilityNote}</p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-white transition hover:bg-primary-dark"
              >
                <SiLinkedin className="h-4 w-4" />
                {copy.linkedinLabel}
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-slate-900 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white"
              >
                <SiGithub className="h-4 w-4" />
                {copy.githubLabel}
              </a>
            )}
            {socials.cv && socials.cv !== '#' && (
              <a
                href={socials.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-slate-900 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                {copy.cvLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

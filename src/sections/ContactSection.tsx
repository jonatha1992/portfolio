import {
  ChatBubbleLeftRightIcon,
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
    <section id="contacto" className="space-y-8">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<ChatBubbleLeftRightIcon className="h-6 w-6" />}
      />
      <div className="grid gap-6 md:grid-cols-[1fr,1fr]">
        <div className="space-y-4 rounded-3xl border border-neutral-300 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-surface">
          <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
            {copy.directHeading}
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-light/15 text-primary-dark dark:bg-primary/15 dark:text-primary-light">
                <EnvelopeIcon className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark dark:text-primary-light">
                  {copy.emailLabel}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block text-base font-medium text-slate-700 hover:text-primary-light dark:text-slate-100"
                >
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-light/15 text-primary-dark dark:bg-primary/15 dark:text-primary-light">
                <SiWhatsapp className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark dark:text-primary-light">
                  {`${copy.phoneLabel} / ${copy.whatsappLabel}`}
                </span>
                <a
                  href={whatsappHref}
                  className="mt-1 block text-base font-medium text-slate-700 hover:text-primary-light dark:text-slate-100"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-light/15 text-primary-dark dark:bg-primary/15 dark:text-primary-light">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark dark:text-primary-light">
                  {copy.locationLabel}
                </span>
                <p className="mt-1 text-base font-medium text-slate-700 dark:text-slate-100">{contact.location}</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4 rounded-3xl border border-neutral-300 bg-gradient-to-br from-primary-light/15 via-white to-primary-light/5 p-6 shadow-soft dark:border-slate-700 dark:from-primary/20 dark:via-surface dark:to-primary/10">
          <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
            {copy.networksHeading}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{contact.availabilityNote}</p>
          <div className="flex flex-wrap gap-3">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-light"
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
                className="inline-flex items-center gap-2 rounded-full border border-primary-light px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-primary-light hover:text-white"
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
                className="inline-flex items-center gap-2 rounded-full border border-primary-light px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-primary-light hover:text-white"
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

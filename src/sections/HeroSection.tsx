import { ArrowDownTrayIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { useLocale } from '../context/LocaleContext'

type HeroSectionProps = {
  personal: ProfileContent['personal']
  contact: ProfileContent['contact']
  socials: ProfileContent['socials']
  copy: UiCopy['hero']
}

export default function HeroSection({ personal, contact, socials, copy }: HeroSectionProps) {
  const { locale } = useLocale()
  return (
    <section id="inicio" className="hero">
      <h1 className="hero-enter">{personal.name}</h1>
      <div className="hero-intro hero-enter">
        <p className="hero-role">{personal.headline}</p>
        <a className="button button-primary" href="#proyectos">{locale === 'es' ? 'Explorar proyectos' : 'Explore projects'}<ArrowUpRightIcon aria-hidden /></a>
      </div>
      <div className="hero-details hero-enter">
        <div className="hero-portrait">
          <img src={personal.photo} alt={personal.name} width="112" height="140" fetchPriority="high" />
          <p>{personal.location}</p>
        </div>
        <p className="hero-summary">{personal.summary}</p>
        <div className="hero-contact">
          <a href={`mailto:${contact.email}`}>{copy.mailCta}<ArrowUpRightIcon aria-hidden /></a>
          {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer">{copy.linkedinCta}<ArrowUpRightIcon aria-hidden /></a>}
          {socials.github && <a href={socials.github} target="_blank" rel="noreferrer">{copy.githubCta}<ArrowUpRightIcon aria-hidden /></a>}
          <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a>
          {socials.cv && socials.cv !== '#' && <a href={socials.cv} target="_blank" rel="noreferrer">{copy.cvCta}<ArrowDownTrayIcon aria-hidden /></a>}
          <p>{personal.availability}</p>
        </div>
      </div>
    </section>
  )
}

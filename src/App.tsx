import SiteLayout from './components/layout/SiteLayout'
import ArticlesSection from './sections/ArticlesSection'
import ContactSection from './sections/ContactSection'
import EducationSection from './sections/EducationSection'
import ExperienceSection from './sections/ExperienceSection'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import TimelineSection from './sections/TimelineSection'
import AchievementsSection from './sections/AchievementsSection'
import { useLocale } from './context/LocaleContext'

function App() {
  const { content, ui } = useLocale()
  const {
    personal,
    contact,
    socials,
    skills,
    projects,
    achievements,
    experience,
    education,
    certifications,
    articles,
    timeline,
    externalSources,
  } = content

  return (
    <SiteLayout
      navItems={ui.navigation}
      name={personal.name}
      headline={personal.headline}
      socials={socials}
      footerNote={ui.footer.note}
      footerLinkLabels={{
        linkedin: ui.sections.contact.linkedinLabel,
        github: ui.sections.contact.githubLabel,
        cv: ui.sections.contact.cvLabel,
      }}
    >
      <HeroSection personal={personal} contact={contact} socials={socials} copy={ui.hero} />
      <SkillsSection skills={skills} copy={ui.sections.skills} />
      <ProjectsSection
        projects={projects}
        externalInfo={externalSources.projectsFromFirebase}
        copy={ui.sections.projects}
      />
      <AchievementsSection achievements={achievements} copy={ui.sections.achievements} />
      <ExperienceSection experience={experience} copy={ui.sections.experience} />
      <EducationSection
        education={education}
        certifications={certifications}
        copy={ui.sections.education}
      />
      <TimelineSection timeline={timeline} copy={ui.sections.timeline} />
      <ArticlesSection articles={articles} copy={ui.sections.articles} />
      <ContactSection contact={contact} socials={socials} copy={ui.sections.contact} />
    </SiteLayout>
  )
}

export default App

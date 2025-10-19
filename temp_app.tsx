import type { NavItem } from './components/layout/SiteHeader'
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
import { profileContent } from './data/content'

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'logros', label: 'Logros' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'formacion', label: 'Formación' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'articulos', label: 'Artículos' },
  { id: 'contacto', label: 'Contacto' },
]

function App() {
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
  } = profileContent

  return (
    <SiteLayout navItems={navItems} name={personal.name} headline={personal.headline} socials={socials}>
      <HeroSection personal={personal} contact={contact} socials={socials} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} externalInfo={externalSources.projectsFromFirebase} />
      <AchievementsSection achievements={achievements} />
      <ExperienceSection experience={experience} />
      <EducationSection education={education} certifications={certifications} />
      <TimelineSection timeline={timeline} />
      <ArticlesSection articles={articles} />
      <ContactSection contact={contact} socials={socials} />
    </SiteLayout>
  )
}

export default App


# Portfolio — Jonathan Correa

## Stack
- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (`@tailwindcss/typography`)
- Datos de proyectos en vivo desde Firestore REST (`tecnofuision-it/projects`, solo lectura; fallback local en `src/data/content.*.ts`)
- Tests unitarios con Node Test Runner (`node --experimental-strip-types --test`)

## Estructura
- `src/App.tsx`: composición de secciones y estado de idioma (`LocaleContext`)
- `src/sections/`: `HeroSection`, `ProjectsSection`, `SkillsSection`, `AchievementsSection`, `ExperienceSection`, `EducationSection`, `TimelineSection`, `ArticlesSection`, `ContactSection`
- `src/components/layout/`: `SiteLayout`, `SiteHeader`, `SiteFooter`, `ThemeToggle`, `LanguageToggle`
- `src/components/common/`: `ProjectCard`, `SectionHeader`, `Pill`
- `src/data/`: contenido bilingüe (`content.es.ts`, `content.en.ts`), portadas (`projectCovers.ts`), agrupación por tipo de trabajo (`projectGroups.ts`) y tipos (`types.ts`)
- `src/hooks/`: `useTheme`, `useScrollReveal`
- `src/services/firebase.ts`: lectura REST de Firestore y normalización a `Project`
- `tests/projectGroups.test.mjs`: pruebas de clasificación y orden de grupos

## Comandos
- Desarrollo: `npm run dev`
- Tests: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview local: `npx vite preview --port 4174`

## Decisiones de diseño
- **Identidad editorial cálida**: fondo `#f2efe9`, superficies `#dfdcd2`, tinta `#1c1c1c`, acento `#8fa68e`, tipografía `Bricolage Grotesque`, modo claro por defecto con soporte de modo oscuro.
- **Catálogo agrupado por trabajo**: los proyectos se agrupan en `src/data/projectGroups.ts` en 5 categorías (Productos SaaS, Sistemas y plataformas, Web y comercio, Herramientas e IA, Infraestructura y APIs) con índice rápido y proyectos en `Producción` priorizados dentro de cada grupo, sin modificar Firestore.
- **Animaciones contenidas**: entrada del hero y revelado único al hacer scroll vía `IntersectionObserver` (`useScrollReveal`), feedback táctil en botones (`scale(0.97)`), hover condicionado a `@media (hover: hover) and (pointer: fine)` y respeto estricto a `prefers-reduced-motion`.


import type { ReactElement } from 'react'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiDotnet,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiFirebase,
  SiDocker,
  SiGithubactions,
  SiMetabase,
  SiApacheairflow,
  SiDbt,
  SiJupyter,
  SiOpencv,
  SiScikitlearn,
  SiGit,
  SiJira,
  SiConfluence,
  SiNotion,
  SiFigma,
  SiPostgresql,
  SiTailwindcss,
  SiR,
  SiVite,
  SiMui,
  SiChartdotjs,
  SiLeaflet,
  SiJsonwebtokens,
  SiSqlite,
  SiOracle,
  SiBootstrap,
  SiCelery,
  SiRedis,
  SiVuedotjs,
  SiNodedotjs,
  SiNpm,
  SiNextdotjs,
  SiSupabase,
  SiRailway,
  SiMercadopago,
  SiGooglecloud,
  SiFfmpeg,
} from 'react-icons/si'
import {
  FaCode,
  FaChartLine,
  FaCloud,
  FaDatabase,
  FaBrain,
  FaCodeBranch,
  FaServer,
} from 'react-icons/fa6'

const baseIconProps = { size: 14 }
const SKILL_ICONS_BASE_URL = 'https://skillicons.dev/icons'

export const techIcons: Record<string, ReactElement> = {
  Python: <SiPython {...baseIconProps} />,
  'Python 3': <SiPython {...baseIconProps} />,
  'C#': <FaCode size={12} />,
  'JavaScript / TypeScript': <SiTypescript {...baseIconProps} />,
  JavaScript: <SiJavascript {...baseIconProps} />,
  TypeScript: <SiTypescript {...baseIconProps} />,
  R: <SiR {...baseIconProps} />,
  React: <SiReact {...baseIconProps} />,
  'react-icons': <SiReact {...baseIconProps} />,
  FastAPI: <SiFastapi {...baseIconProps} />,
  Fast_API: <SiFastapi {...baseIconProps} />,
  Uvicorn: <FaServer size={12} />,
  UV: <FaCodeBranch size={12} />,
  Flask: <SiFlask {...baseIconProps} />,
  Django: <SiDjango {...baseIconProps} />,
  'Django REST Framework': <SiDjango {...baseIconProps} />,
  '.NET': <SiDotnet {...baseIconProps} />,
  Pandas: <SiPandas {...baseIconProps} />,
  NumPy: <SiNumpy {...baseIconProps} />,
  TensorFlow: <SiTensorflow {...baseIconProps} />,
  Firebase: <SiFirebase {...baseIconProps} />,
  'Firebase (Auth': <SiFirebase {...baseIconProps} />,
  'Firebase Cloud Functions': <SiGooglecloud {...baseIconProps} />,
  'Firebase Firestore': <SiFirebase {...baseIconProps} />,
  'Firebase Hosting': <SiFirebase {...baseIconProps} />,
  Firestore: <SiFirebase {...baseIconProps} />,
  'Storage)': <SiFirebase {...baseIconProps} />,
  Docker: <SiDocker {...baseIconProps} />,
  'GitHub Actions': <SiGithubactions {...baseIconProps} />,
  'Azure DevOps': <FaCloud size={12} />,
  'Power BI': <FaChartLine size={12} />,
  Metabase: <SiMetabase {...baseIconProps} />,
  Airflow: <SiApacheairflow {...baseIconProps} />,
  'Apache Airflow': <SiApacheairflow {...baseIconProps} />,
  dbt: <SiDbt {...baseIconProps} />,
  'ETL/ELT': <FaCodeBranch size={12} />,
  'Modelado Dimensional': <FaDatabase size={12} />,
  'Dimensional Modeling': <FaDatabase size={12} />,
  'Jupyter Notebook': <SiJupyter {...baseIconProps} />,
  OpenCV: <SiOpencv {...baseIconProps} />,
  'Scikit-learn': <SiScikitlearn {...baseIconProps} />,
  JWT: <SiJsonwebtokens {...baseIconProps} />,
  MLOps: <FaBrain size={12} />,
  'Modelos Predictivos': <FaBrain size={12} />,
  'Predictive Models': <FaBrain size={12} />,
  Git: <SiGit {...baseIconProps} />,
  Jira: <SiJira {...baseIconProps} />,
  Confluence: <SiConfluence {...baseIconProps} />,
  Notion: <SiNotion {...baseIconProps} />,
  Figma: <SiFigma {...baseIconProps} />,
  PostgreSQL: <SiPostgresql {...baseIconProps} />,
  SQLite: <SiSqlite {...baseIconProps} />,
  'Oracle Database': <SiOracle {...baseIconProps} />,
  'SQL Server': <FaServer size={12} />,
  'Tailwind CSS': <SiTailwindcss {...baseIconProps} />,
  TailwindCSS: <SiTailwindcss {...baseIconProps} />,
  Vite: <SiVite {...baseIconProps} />,
  'Material-UI': <SiMui {...baseIconProps} />,
  'Chart.js': <SiChartdotjs {...baseIconProps} />,
  Leaflet: <SiLeaflet {...baseIconProps} />,
  Bootstrap: <SiBootstrap {...baseIconProps} />,
  Celery: <SiCelery {...baseIconProps} />,
  Redis: <SiRedis {...baseIconProps} />,
  'Vue 3': <SiVuedotjs {...baseIconProps} />,
  'Vue.js 3': <SiVuedotjs {...baseIconProps} />,
  Vue: <SiVuedotjs {...baseIconProps} />,
  'Node.js': <SiNodedotjs {...baseIconProps} />,
  npm: <SiNpm {...baseIconProps} />,
  'Next.js': <SiNextdotjs {...baseIconProps} />,
  Supabase: <SiSupabase {...baseIconProps} />,
  Railway: <SiRailway {...baseIconProps} />,
  MercadoPago: <SiMercadopago {...baseIconProps} />,
  FFmpeg: <SiFfmpeg {...baseIconProps} />,
  'Argos Translate': <FaCodeBranch size={12} />,
  PyMuPDF: <FaCode size={12} />,
  'Google Speech Recognition': <FaBrain size={12} />,
  PyDub: <FaCode size={12} />,
  Tkinter: <FaCode size={12} />,
  SQL: <FaDatabase size={12} />,
  'Sistemas Distribuidos': <FaCloud size={12} />,
  'Arquitectura de Software': <FaCodeBranch size={12} />,
  DAX: <FaChartLine size={12} />,
  'Modelado de Datos': <FaDatabase size={12} />,
  'Data Modeling': <FaDatabase size={12} />,
}

const fallbackTechIcon = <FaCode size={12} />

const normalizeTechKey = (key: string) =>
  key
    .toLowerCase()
    .trim()
    .replace(/[().]/g, ' ')
    .replace(/[_/]/g, ' ')
    .replace(/\s+/g, ' ')

const techAliases: Record<string, string> = {
  'python3': 'Python 3',
  'python 3': 'Python 3',
  'vue js 3': 'Vue.js 3',
  'vuejs 3': 'Vue.js 3',
  'vue js': 'Vue.js 3',
  vuejs: 'Vue.js 3',
  'tailwind css': 'Tailwind CSS',
  tailwindcss: 'TailwindCSS',
  'fast api': 'FastAPI',
  fastapi: 'FastAPI',
  fast_api: 'FastAPI',
  'django rest framework': 'Django REST Framework',
  'material ui': 'Material-UI',
  'chart js': 'Chart.js',
  'node js': 'Node.js',
  'react icons': 'react-icons',
}

const normalizedTechIcons: Record<string, ReactElement> = Object.entries(techIcons).reduce((acc, [key, icon]) => {
  acc[normalizeTechKey(key)] = icon
  return acc
}, {} as Record<string, ReactElement>)

const skillIconIds: Record<string, string> = {
  Python: 'py',
  'Python 3': 'py',
  'C#': 'cs',
  JavaScript: 'js',
  'JavaScript / TypeScript': 'ts',
  TypeScript: 'ts',
  React: 'react',
  FastAPI: 'fastapi',
  Fast_API: 'fastapi',
  Flask: 'flask',
  Django: 'django',
  'Django REST Framework': 'django',
  '.NET': 'dotnet',
  Firebase: 'firebase',
  Docker: 'docker',
  'GitHub Actions': 'githubactions',
  'Azure DevOps': 'azure',
  Git: 'git',
  Notion: 'notion',
  Figma: 'figma',
  PostgreSQL: 'postgres',
  SQLite: 'sqlite',
  'Tailwind CSS': 'tailwind',
  TailwindCSS: 'tailwind',
  Vite: 'vite',
  'Material-UI': 'materialui',
  Bootstrap: 'bootstrap',
  Redis: 'redis',
  OpenCV: 'opencv',
  'Scikit-learn': 'sklearn',
  TensorFlow: 'tensorflow',
  'Vue 3': 'vue',
  'Vue.js 3': 'vue',
  Vue: 'vue',
  'Node.js': 'nodejs',
  npm: 'npm',
  'Next.js': 'nextjs',
  Supabase: 'supabase',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Angular: 'angular',
  Pinia: 'pinia',
  R: 'r',
  Markdown: 'md',
  GitHub: 'github',
}

const normalizedSkillIconIds: Record<string, string> = Object.entries(skillIconIds).reduce((acc, [key, value]) => {
  acc[normalizeTechKey(key)] = value
  return acc
}, {} as Record<string, string>)

const buildSkillIconUrl = (iconId: string, theme: 'light' | 'dark') =>
  `${SKILL_ICONS_BASE_URL}?i=${iconId}&theme=${theme}`

const renderSkillIcon = (iconId: string): ReactElement => (
  <span className="relative inline-flex h-3.5 w-3.5 shrink-0">
    <img
      src={buildSkillIconUrl(iconId, 'light')}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className="h-3.5 w-3.5 rounded-sm object-contain dark:hidden"
    />
    <img
      src={buildSkillIconUrl(iconId, 'dark')}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className="hidden h-3.5 w-3.5 rounded-sm object-contain dark:block"
    />
  </span>
)

export const getTechIcon = (key: string): ReactElement => {
  const directSkillIconId = skillIconIds[key]

  if (directSkillIconId) {
    return renderSkillIcon(directSkillIconId)
  }

  const normalizedKey = normalizeTechKey(key)
  const aliasedKey = techAliases[normalizedKey]
  const aliasedSkillIconId = aliasedKey ? skillIconIds[aliasedKey] : undefined

  if (aliasedSkillIconId) {
    return renderSkillIcon(aliasedSkillIconId)
  }

  const normalizedSkillIconId = normalizedSkillIconIds[normalizedKey]

  if (normalizedSkillIconId) {
    return renderSkillIcon(normalizedSkillIconId)
  }

  const directIcon = techIcons[key]

  if (directIcon) {
    return directIcon
  }

  if (aliasedKey && techIcons[aliasedKey]) {
    return techIcons[aliasedKey]
  }

  return normalizedTechIcons[normalizedKey] ?? fallbackTechIcon
}

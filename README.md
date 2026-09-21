# Portfolio Técnico - Jonathan Correa

Aplicación SPA pública, bilingüe (ES/EN) y autoactualizable que en menos de un minuto le permite a un evaluador entender el perfil, ver proyectos reales con su código y su README, y abrir un canal de contacto directo — sin que el dueño del portfolio tenga que hacer un redeploy cada vez que publica un proyecto nuevo.

URL productiva: <https://portfolio-correa-jonathan.web.app>

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 |
| Lenguaje | TypeScript ~5.9 |
| Bundler | Vite 7 |
| Estilos | Tailwind CSS 3 |
| Markdown | react-markdown + remark-gfm |
| Hosting | Firebase Hosting |
| Catálogo dinámico | Firestore REST (colección `projects`, lectura pública) |
| Asistente IA | Gemini · OpenRouter · Groq · OpenAI (llamada directa desde el cliente) |

## Requisitos

- Node.js >= 20 (el CI usa Node 20)
- npm >= 9

## Puesta en marcha

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción (tsc -b + vite build)
npm run build

# Previsualizar el build
npm run preview

# Lint
npm run lint
```

## Arquitectura

```text
Navegador
  |
  |-- SPA React 19 + TypeScript (Vite 7, Tailwind 3)
  |     |-- LocaleContext ---> content.es.ts / content.en.ts   (contenido estático)
  |     |-- useTheme      ---> localStorage                    (preferencia de tema)
  |     |-- ProjectsSection -> services/firebase.ts            (catálogo dinámico)
  |     |-- PortfolioAgentChat -> services/portfolioAgent.ts   (chat IA)
  |
  |-- Firestore REST  (proyecto tecnofuision-it, colección `projects`, lectura pública)
  |-- raw.githubusercontent.com  (Markdown de READMEs de cada proyecto)
  |-- API de IA       (Gemini | OpenRouter | Groq | OpenAI, llamada directa desde el cliente)
  |
  Firebase Hosting (proyecto portfolio-correa-jonathan) <- GitHub Actions on push a main
```

No hay servidor propio. Todas las integraciones son llamadas del cliente contra APIs públicas o protegidas por security rules. Si Firestore o la API de IA fallan, el sitio sigue funcionando: la sección de proyectos muestra el catálogo estático y el chat informa que el asistente no está disponible.

## Configuración del asistente IA

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Proveedor preferido (gemini | openrouter | groq | openai)
VITE_AI_PROVIDER=gemini

# Gemini (default)
GEMINI_API_KEY=tu_api_key
# VITE_GEMINI_API_KEY=tu_api_key

# OpenRouter
OPEN_ROUTER_API_KEY=tu_api_key
# VITE_OPEN_ROUTER_API_KEY=tu_api_key

# Groq
GROQ_API_KEY=tu_api_key
# VITE_GROQ_API_KEY=tu_api_key

# OpenAI
OPENAI_API_KEY=tu_api_key
# VITE_OPENAI_API_KEY=tu_api_key

# Key legacy (aplica solo al proveedor preferido)
# VITE_AI_API_KEY=tu_api_key
```

**Reglas de fallback:** si el proveedor preferido falla, se reintenta con el resto en el orden `gemini → openrouter → groq → openai`, salteando los que no tengan key. Si no hay ninguna key configurada, el chat muestra un mensaje explicativo y no intenta la llamada.

**Overrides opcionales por proveedor:**

| Variable | Ejemplo |
|---|---|
| `VITE_<PROVEEDOR>_MODEL` | `VITE_GEMINI_MODEL=gemini-2.5-flash` |
| `VITE_<PROVEEDOR>_API_URL` | `VITE_OPEN_ROUTER_API_URL=...` |
| `VITE_AI_MODEL` / `VITE_AI_API_URL` | Valor compartido para todos |

**⚠ Seguridad:** las llamadas salen directamente del navegador, así que **las API keys quedan expuestas en el bundle de producción** y son legibles por cualquier visitante. La contención son los límites de gasto configurados en cada proveedor. Se recomienda usar keys con cuota baja, preferir proveedores con tier gratuito (Gemini, Groq) y rotarlas periódicamente. El plan a futuro es mover la llamada a un proxy propio (Cloud Function o Worker) con rate limiting.

Ver [PRD-003 — Asistente IA](docs/prd/PRD-003-asistente-ia.md) para detalles completos.

## Proyectos dinámicos

El catálogo de proyectos se lee en tiempo de ejecución desde Firestore REST (colección `projects` del proyecto `tecnofuision-it`). La API key web de Firebase es un identificador público; el acceso real lo gobiernan las security rules.

**Resolución de portada (en orden):**

1. `projectCovers[slug(title)]` — SVG local en `public/assets/projects/`.
2. El campo `image` remoto del documento Firestore, si existe.
3. Sin imagen: la tarjeta renderiza un ícono de terminal como fallback.

**Fallback estático:** si Firestore devuelve cero proyectos o falla, la sección muestra el catálogo estático definido en `content.es.ts` / `content.en.ts`.

**Cómo agregar una portada local:**

1. Generar el SVG.
2. Dejarlo en `public/assets/projects/<slug>.svg`.
3. Registrar el par `slug → ruta` en `src/data/projectCovers.ts`.

El slug se deriva del título: normalización NFD, se quitan diacríticos, minúsculas, todo lo que no sea `[a-z0-9]` pasa a `-`, y se corta a 48 caracteres (`toProjectSlug` en `services/firebase.ts`).

Ver [PRD-002 — Proyectos dinámicos](docs/prd/PRD-002-proyectos-dinamicos.md) para el mapeo completo de campos y el visor de README.

## Estructura del proyecto

```text
src/
|-- App.tsx                Orquesta secciones y navegación
|-- main.tsx               Punto de entrada de React
|-- index.css              Estilos globales
|-- assets/                Assets del proyecto (imágenes, etc.)
|-- components/
|   |-- chat/              Asistente IA (PortfolioAgentChat)
|   |-- common/            Elementos reutilizables (SectionHeader, Pill, etc.)
|   |-- layout/            Layout general, header, footer y toggles (tema/idioma)
|-- context/
|   |-- LocaleContext.tsx   Proveedor que centraliza idioma + contenido
|-- data/
|   |-- content.es.ts      Contenido principal en español
|   |-- content.en.ts      Contenido principal en inglés
|   |-- content.ts         Helper para obtener el locale activo
|   |-- projectCovers.ts   Mapa de slug → ruta de portada local
|   |-- types.ts           Tipos compartidos para el contenido
|-- hooks/
|   |-- useTheme.ts        Controla modo claro/oscuro persistente
|-- icons/
|   |-- techIcons.tsx      Mapeo de tecnologías → iconos de react-icons
|-- i18n/                  Copys de UI (navegación, labels, CTA)
|   |-- ui.es.ts           Copys en español
|   |-- ui.en.ts           Copys en inglés
|   |-- index.ts           Selector de locale
|   |-- types.ts           Tipo UiCopy
|-- sections/              Cada bloque de contenido (Hero, Skills, Projects, ...)
|-- services/
|   |-- firebase.ts        Lectura Firestore REST, transformación de documentos
|   |-- portfolioAgent.ts  Lógica del asistente IA (proveedores, fallback, prompt)
public/
|-- assets/
|   |-- profile/           Foto del perfil (jonathan-correa.jpg)
|   |-- projects/          Portadas locales SVG de proyectos
```

## Personalización

- **Contenido del perfil:** edita `src/data/content.es.ts` (español) y `src/data/content.en.ts` (inglés). Los tipos en `src/data/types.ts` fuerzan la misma estructura en ambos idiomas — si falta una clave en uno de los dos, `npm run build` falla.
- **Copys de interfaz:** edita `src/i18n/ui.es.ts` y `src/i18n/ui.en.ts`. Controlan navegación, títulos de sección, CTAs, labels y textos del asistente.
- **Foto de perfil:** reemplaza `public/assets/profile/jonathan-correa.jpg`.
- **Contacto:** actualiza email, teléfono, LinkedIn, GitHub y enlace al CV en el contenido del idioma correspondiente.

## Despliegue

**Automático (CI/CD):** cada push a la rama `main` ejecuta un workflow de GitHub Actions que construye el proyecto y despliega a Firebase Hosting (canal `live`). El workflow también soporta `workflow_dispatch` para disparos manuales.

**Manual:**

```bash
npm run build
firebase deploy --only hosting
```

Documentación operativa:

- [README_DEPLOY.md](README_DEPLOY.md) — comandos de deploy manual y checklist.
- [.github/GITHUB_ACTIONS_SETUP.md](.github/GITHUB_ACTIONS_SETUP.md) — alta del workflow.
- [CONFIGURAR_GITHUB_SECRET.md](CONFIGURAR_GITHUB_SECRET.md) — carga de secretos.
- [GOOGLE_SEARCH_CONSOLE_SETUP.md](GOOGLE_SEARCH_CONSOLE_SETUP.md) — verificación en Search Console.

## Documentación

| Documento | Descripción |
|---|---|
| [docs/prd/README.md](docs/prd/README.md) | Índice del set de PRD |
| [PRD-000 — Visión de sistema](docs/prd/PRD-000-sistema.md) | Producto completo, usuarios, arquitectura, métricas |
| [PRD-001 — Contenido bilingüe](docs/prd/PRD-001-contenido-bilingue.md) | ES/EN, modo claro/oscuro, modelo de contenido |
| [PRD-002 — Proyectos dinámicos](docs/prd/PRD-002-proyectos-dinamicos.md) | Firestore REST, portadas locales, visor de README |
| [PRD-003 — Asistente IA](docs/prd/PRD-003-asistente-ia.md) | Chat multi-proveedor con fallback |
| [PRD-004 — SEO, hosting y CI/CD](docs/prd/PRD-004-seo-deploy.md) | Meta tags, Firebase Hosting, GitHub Actions |
| [README_DEPLOY.md](README_DEPLOY.md) | Comandos de deploy manual y checklist |
| [CONFIGURAR_GITHUB_SECRET.md](CONFIGURAR_GITHUB_SECRET.md) | Carga de secretos de GitHub Actions |
| [GOOGLE_SEARCH_CONSOLE_SETUP.md](GOOGLE_SEARCH_CONSOLE_SETUP.md) | Verificación en Google Search Console |
| [.github/GITHUB_ACTIONS_SETUP.md](.github/GITHUB_ACTIONS_SETUP.md) | Alta y configuración del workflow |

## Deuda conocida

1. **API keys de IA en el bundle del cliente (P1)** — las llamadas a los proveedores salen directamente del navegador, por lo que las keys son legibles por cualquier visitante. Mitigación vigente: keys con cuota baja y rotación. Plan: mover la llamada a un proxy propio (Cloud Function o Worker) con rate limiting. ([PRD-003 §7](docs/prd/PRD-003-asistente-ia.md))
2. **Copys de UI hardcodeados por idioma (P2)** — los mensajes de carga y error del visor de README en `src/sections/ProjectsSection.tsx`, y el label de rol en `src/services/firebase.ts`, se arman con ternarios `locale === 'es'` en vez de salir de `src/i18n/ui.*.ts`. ([PRD-001 §7](docs/prd/PRD-001-contenido-bilingue.md))
3. **Los proyectos de Firestore pierden `highlights` (P2)** — el documento no tiene ese campo, así que el transform lo deja en `[]` y las tarjetas dinámicas quedan menos ricas que las estáticas. ([PRD-002 §9](docs/prd/PRD-002-proyectos-dinamicos.md))

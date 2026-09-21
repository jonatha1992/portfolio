# PRD-000 — Portfolio Técnico: visión de sistema

| Campo | Valor |
|---|---|
| Producto | Portfolio Técnico de Jonathan Correa |
| Owner | Jonathan Correa |
| Estado | En producción |
| URL productiva | https://portfolio-correa-jonathan.web.app |
| Repositorio | https://github.com/jonatha1992/portfolio |
| Última revisión | 2026-09-21 |

## 1. Problema

Un CV en PDF no demuestra capacidad técnica: no se navega, no se actualiza sin reenviarlo y no
responde preguntas. Un reclutador dedica menos de un minuto a la primera evaluación de un
candidato, y en ese minuto necesita responder tres cosas: qué stack domina, qué construyó y cómo
contactarlo.

## 2. Objetivo

Una SPA pública, bilingüe y autoactualizable que en menos de un minuto le permita a un evaluador
entender el perfil, ver proyectos reales con su código y su README, y abrir un canal de contacto
directo — sin que el dueño del portfolio tenga que hacer un redeploy cada vez que publica un
proyecto nuevo.

## 3. Usuarios

| Perfil | Necesidad | Recorrido esperado |
|---|---|---|
| Reclutador técnico | Validar stack y seniority rápido | Hero → Skills → Proyectos → Contacto |
| Hiring manager / CTO | Profundidad técnica real | Proyectos → README embebido → GitHub |
| Reclutador no técnico | Traducción del perfil a lenguaje de negocio | Asistente IA → Contacto |
| Par / colega | Referencia de trabajo y publicaciones | Experiencia → Timeline → Artículos |
| Dueño del portfolio | Publicar sin redeploy | Alta en Firestore → aparece en el sitio |

## 4. Alcance

**Dentro:** sitio estático de una sola página con secciones ancladas, contenido bilingüe ES/EN,
modo claro/oscuro persistente, catálogo de proyectos alimentado desde Firestore, visor de README
en modal, asistente IA conversacional, SEO estático y despliegue automático.

**Fuera:** panel de administración propio (la carga de proyectos se hace desde el backoffice de
TecnoFusion), autenticación de visitantes, backend propio, blog con CMS, analítica de producto.

## 5. Arquitectura

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

No hay servidor propio. Todas las integraciones son llamadas del cliente contra APIs públicas o
protegidas por security rules.

## 6. Requisitos funcionales

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El sitio se sirve como SPA de una página con secciones ancladas: `#inicio`, `#habilidades`, `#proyectos`, `#logros`, `#experiencia`, `#formacion`, `#timeline`, `#articulos`, `#contacto` | P0 | Implementado |
| RF-02 | El visitante alterna entre español e inglés y la elección persiste entre visitas | P0 | Implementado — ver [PRD-001](PRD-001-contenido-bilingue.md) |
| RF-03 | El visitante alterna entre modo claro y oscuro y la elección persiste | P1 | Implementado — ver [PRD-001](PRD-001-contenido-bilingue.md) |
| RF-04 | El catálogo de proyectos se lee en tiempo de ejecución desde Firestore, sin redeploy | P0 | Implementado — ver [PRD-002](PRD-002-proyectos-dinamicos.md) |
| RF-05 | El visitante lee el README de un proyecto sin salir del sitio | P1 | Implementado — ver [PRD-002](PRD-002-proyectos-dinamicos.md) |
| RF-06 | El visitante consulta el perfil por chat en lenguaje natural | P1 | Implementado — ver [PRD-003](PRD-003-asistente-ia.md) |
| RF-07 | El sitio expone metadatos para buscadores y redes sociales | P1 | Implementado — ver [PRD-004](PRD-004-seo-deploy.md) |
| RF-08 | Cada push a `main` publica automáticamente en producción | P0 | Implementado — ver [PRD-004](PRD-004-seo-deploy.md) |
| RF-09 | El contacto es accionable: email, teléfono, LinkedIn, GitHub y CV | P0 | Implementado |

## 7. Requisitos no funcionales

| ID | Requisito | Objetivo | Estado |
|---|---|---|---|
| RNF-01 | Responsive desde 320 px hasta escritorio, sin scroll horizontal | — | Implementado |
| RNF-02 | El sitio renderiza contenido útil aunque Firestore o la API de IA fallen | Degradación elegante | Implementado |
| RNF-03 | Build de producción sin errores de tipos (`tsc -b`) ni de lint | 0 errores | Implementado |
| RNF-04 | Assets versionados con caché de 1 año; HTML sin caché larga | `max-age=31536000` | Implementado |
| RNF-05 | Navegación por teclado y `aria-label` en controles y tarjetas | WCAG 2.1 AA | Parcial |
| RNF-06 | Sin secretos de servidor en el bundle | — | Deuda — ver [PRD-003](PRD-003-asistente-ia.md) §6 |

## 8. Criterios de aceptación del sistema

- **CA-01** — Con la red de Firestore caída, la sección Proyectos muestra el catálogo estático de
  `content.*.ts` en vez de quedar vacía.
- **CA-02** — Sin ninguna API key de IA configurada, el sitio carga completo y el chat informa que
  el asistente no está disponible; no rompe el render.
- **CA-03** — Cambiar el idioma actualiza contenido, copys de UI y las respuestas del asistente sin
  recargar la página.
- **CA-04** — `npm run build` termina en verde y `dist/` se publica en Firebase Hosting desde el
  workflow, sin pasos manuales.

## 9. Métricas de éxito

| Métrica | Objetivo |
|---|---|
| Tiempo hasta primer contenido útil (LCP) | < 2.5 s en 4G |
| Proyectos publicados sin redeploy | 100 % |
| Sesiones que abren al menos un proyecto | > 40 % |
| Errores de consola en producción | 0 |

## 10. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| API keys de IA expuestas en el bundle del cliente | Consumo de cuota por terceros | Cuotas bajas y rotación; mover a un proxy propio ([PRD-003](PRD-003-asistente-ia.md) §7) |
| Firebase Storage del proyecto origen quedó inaccesible (HTTP 402) | Tarjetas sin imagen | Portadas locales en `public/assets/projects/` ([PRD-002](PRD-002-proyectos-dinamicos.md) §4) |
| Firestore con lectura pública (`allow read: if true`) | Exposición de datos de la colección | La colección solo guarda datos públicos de proyectos |
| Contenido personal duplicado en dos archivos ES/EN | Desincronización de idiomas | Tipo `ProfileContent` compartido fuerza la misma forma |

## 11. Historial

| Fecha | Cambio |
|---|---|
| 2026-09-21 | Primera versión del set de PRD |

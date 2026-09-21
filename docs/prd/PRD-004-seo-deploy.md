# PRD-004 — SEO, hosting y entrega continua

| Campo | Valor |
|---|---|
| Padre | [PRD-000](PRD-000-sistema.md) |
| Estado | Implementado |
| Código | `index.html`, `public/robots.txt`, `public/sitemap.xml`, `firebase.json`, `.github/workflows/firebase-deploy.yml` |

## 1. Problema

Un portfolio que no aparece al buscar el nombre del candidato no sirve como carta de presentación.
Y un portfolio que exige pasos manuales para publicar termina desactualizado.

## 2. Objetivo

Que el sitio sea indexable y se vea bien al compartirlo, y que publicar sea un `git push`.

## 3. Requisitos funcionales — SEO

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-01 | `index.html` declara `description`, `keywords`, `author` y `robots` | P1 | Implementado |
| RF-02 | El sitio expone Open Graph y Twitter Card con título, descripción e imagen | P1 | Implementado |
| RF-03 | El sitio declara `canonical` y `hreflang` para `es`, `en` y `x-default` | P1 | Implementado |
| RF-04 | `robots.txt` permite el rastreo completo y apunta al sitemap | P1 | Implementado |
| RF-05 | `sitemap.xml` lista la home en ambos idiomas y las secciones principales | P2 | Implementado |
| RF-06 | Todas las URLs de SEO apuntan al dominio productivo real | P0 | Implementado — resuelto 2026-09-21, ver §7 |
| RF-07 | El sitio está verificado en Google Search Console | P2 | Implementado — `public/googlef6cfba4bc36082d4.html` |

## 4. Requisitos funcionales — hosting y CI/CD

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-08 | Cada push a `main` construye y publica en Firebase Hosting, canal `live` | P0 | Implementado |
| RF-09 | El workflow se puede disparar a mano (`workflow_dispatch`) | P2 | Implementado |
| RF-10 | El build falla explícitamente si no hay ninguna API key de IA configurada | P1 | Implementado — paso *Verify AI keys* |
| RF-11 | Las rutas desconocidas reescriben a `/index.html` (SPA) | P0 | Implementado |
| RF-12 | El deploy manual sigue disponible (`npm run build && firebase deploy --only hosting`) | P2 | Implementado |

## 5. Requisitos no funcionales

| ID | Requisito | Valor | Estado |
|---|---|---|---|
| RNF-01 | Imágenes, JS y CSS con caché inmutable | `max-age=31536000` | Implementado |
| RNF-02 | Cabeceras de seguridad en todas las respuestas | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block` | Implementado |
| RNF-03 | El build de CI usa Node 20 con caché de npm e instalación reproducible (`npm ci`) | — | Implementado |
| RNF-04 | Ninguna key de IA aparece en los logs del workflow | — | Implementado — pasan por `secrets` |

## 6. Secretos de GitHub Actions

| Secreto | Obligatorio | Uso |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN` | Sí | Autenticación del deploy a Hosting |
| `VITE_GEMINI_API_KEY` o `GEMINI_API_KEY` | Al menos una del grupo IA | Chat con Gemini |
| `VITE_OPEN_ROUTER_API_KEY` u `OPEN_ROUTER_API_KEY` | ídem | Chat con OpenRouter |
| `VITE_GROQ_API_KEY` o `GROQ_API_KEY` | ídem | Chat con Groq |
| `VITE_OPENAI_API_KEY` u `OPENAI_API_KEY` | ídem | Chat con OpenAI |
| `VITE_AI_API_KEY` | ídem (legacy) | Key única para el proveedor preferido |
| `VITE_AI_PROVIDER` | No | Proveedor preferido; por defecto `gemini` |

El paso *Verify AI keys* corta el workflow con `::error::` si el grupo IA queda vacío.

## 7. Estado del dominio de SEO

**Resuelto el 2026-09-21.** Los artefactos de SEO declaraban un dominio anterior,
`https://jonathancorrea-2f2de.web.app`, mientras que el despliegue apunta al proyecto Firebase
`portfolio-correa-jonathan`. El `canonical` le indicaba a Google que la versión buena del
contenido estaba en otro host, y la tarjeta de previsualización al compartir el enlace apuntaba a
un dominio que puede no existir.

Se unificaron las 19 referencias al dominio productivo `https://portfolio-correa-jonathan.web.app`:

| Archivo | Referencias | Campos |
|---|---|---|
| `index.html` | 8 | `og:url`, `og:image`, `twitter:url`, `twitter:image`, `canonical` y los tres `hreflang` |
| `public/robots.txt` | 1 | la línea `Sitemap:` |
| `public/sitemap.xml` | 10 | todas las `<loc>` y todos los `<xhtml:link>` |

En el mismo cambio se actualizó `lastmod` en las 6 entradas del sitemap, que había quedado fijo en
`2025-12-16`.

**Defecto secundario, también resuelto.** `sitemap.xml` listaba `#sobre-mi`, un anclaje que no
existe en la aplicación. La entrada se eliminó en vez de reapuntarse: la home `/` ya cubre ese
contenido, y una URL a un ancla inexistente es una señal de soft 404. El sitemap queda con 5
entradas, todas verificadas contra las secciones reales (`#inicio`, `#habilidades`, `#proyectos`,
`#logros`, `#experiencia`, `#formacion`, `#timeline`, `#articulos`, `#contacto`).

## 8. Criterios de aceptación

- **CA-01** — Un push a `main` deja el sitio actualizado en producción sin intervención manual.
- **CA-02** — Un workflow sin ningún secreto de IA falla en *Verify AI keys*, antes del build.
- **CA-03** — `https://<dominio>/robots.txt` y `https://<dominio>/sitemap.xml` responden 200 y
  referencian ese mismo dominio.
- **CA-04** — Compartir la URL en LinkedIn muestra título, descripción e imagen correctos.

## 9. Documentos operativos relacionados

- [`README_DEPLOY.md`](../../README_DEPLOY.md) — comandos de deploy manual y checklist previa.
- [`.github/GITHUB_ACTIONS_SETUP.md`](../../.github/GITHUB_ACTIONS_SETUP.md) — alta del workflow.
- [`CONFIGURAR_GITHUB_SECRET.md`](../../CONFIGURAR_GITHUB_SECRET.md) — carga de secretos.
- [`GOOGLE_SEARCH_CONSOLE_SETUP.md`](../../GOOGLE_SEARCH_CONSOLE_SETUP.md) — verificación en Search Console.

## 10. Fuera de alcance

Prerender o SSR para mejorar la indexación del contenido dinámico, dominio propio, analítica de
visitantes.

# PRD-002 — Catálogo de proyectos dinámico

| Campo | Valor |
|---|---|
| Padre | [PRD-000](PRD-000-sistema.md) |
| Estado | Implementado con deuda |
| Código | `src/services/firebase.ts`, `src/sections/ProjectsSection.tsx`, `src/data/projectCovers.ts` |

## 1. Problema

Los proyectos son el contenido que más cambia y el que más pesa en la evaluación de un candidato.
Mantenerlos hardcodeados obliga a un commit, un build y un deploy por cada alta o corrección. El
dueño del portfolio ya administra sus proyectos en Firestore desde otro producto propio
(TecnoFusion), así que el portfolio debería leer de ahí.

## 2. Objetivo

Publicar un proyecto nuevo cargándolo en Firestore, sin tocar el repositorio del portfolio.

## 3. Fuente de datos

Lectura directa de Cloud Firestore por REST:

```text
GET https://firestore.googleapis.com/v1/projects/tecnofuision-it
      /databases/(default)/documents/projects?pageSize=100&key=<API_KEY_WEB>
```

**Por qué REST y no el SDK ni una Cloud Function.** La Cloud Function intermedia que existía antes
(`getProjects`) exigía plan Blaze. Las security rules ya permiten `allow read: if true` sobre
`/projects`, así que el endpoint REST público alcanza y el sitio deja de depender de Functions y de
facturación activa.

La API key web de Firebase es un identificador público, no un secreto: viaja en el bundle de
cualquier app Firebase y el acceso real lo gobiernan las security rules. Se puede sobrescribir con
`VITE_FIREBASE_API_KEY`; si falta, el código usa un valor por defecto.

### Mapeo de documento a tarjeta

| Campo Firestore | Campo `Project` | Nota |
|---|---|---|
| `title` | `title` | Obligatorio. Un documento sin título se descarta |
| `description` | `summary` | Vacío si falta |
| `technologies` | `stack` | Acepta array **o** CSV en un string |
| `githubLink` | `codeUrl` | Solo si es URL `http`/`https` válida |
| `previewLink` | `liveUrl` | Solo si es URL `http`/`https` válida |
| `readmeUrl` | `readmeUrl` | Solo si es URL `http`/`https` válida |
| `status` | `status` | Alimenta el badge de color de la tarjeta |
| `createdAt` | `period` | Se reduce al año; `Sin fecha` / `No date` si falta |
| `image` | `media.src` | **Fallback**: primero se busca portada local |

## 4. Portadas locales

Las URLs de Firebase Storage del proyecto origen quedaron inaccesibles (HTTP 402, cuenta de
facturación cerrada) y dejaban las tarjetas sin imagen. La resolución de portada es, en orden:

1. `projectCovers[slug(title)]` — SVG local en `public/assets/projects/`.
2. El campo `image` remoto del documento, si existe.
3. Sin imagen: la tarjeta renderiza un ícono de terminal como fallback visual.

El slug se deriva del título: normalización NFD, se quitan diacríticos, minúsculas, todo lo que no
sea `[a-z0-9]` pasa a `-`, y se corta a 48 caracteres (`toProjectSlug` en `services/firebase.ts`).
Agregar una portada nueva es: generar el SVG, dejarlo en `public/assets/projects/` y registrar el
par `slug → ruta` en `src/data/projectCovers.ts`.

## 5. Requisitos funcionales

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-01 | Los proyectos se leen de Firestore al montar la sección cuando `externalSources.projectsFromFirebase.enabled` es `true` | P0 | Implementado |
| RF-02 | Los proyectos se ordenan por `createdAt` descendente | P1 | Implementado |
| RF-03 | Si Firestore devuelve cero proyectos o falla, se muestra el catálogo estático de `content.*.ts` | P0 | Implementado |
| RF-04 | Un documento sin `title` se descarta en vez de romper el render | P0 | Implementado |
| RF-05 | Cada tarjeta muestra portada, título, rol, resumen recortado a 110 caracteres, hasta 4 tecnologías con ícono y un contador `+N` | P1 | Implementado |
| RF-06 | La tarjeta ofrece accesos a código, demo y README según los campos disponibles | P0 | Implementado |
| RF-07 | Un clic o `Enter`/`Espacio` sobre la tarjeta abre el detalle en modal | P1 | Implementado |
| RF-08 | El README del proyecto se renderiza como Markdown (GFM) dentro de un modal | P1 | Implementado |
| RF-09 | `Escape` cierra el modal activo; con dos modales abiertos, cierra primero el de README | P1 | Implementado |
| RF-10 | Con un modal abierto, el scroll del `body` queda bloqueado | P2 | Implementado |

## 6. Visor de README

Un `readmeUrl` de GitHub apunta a la página HTML, no al Markdown. El visor prueba varios candidatos
en orden hasta obtener Markdown real:

1. Conversión `github.com/.../blob/<branch>/<path>` → `raw.githubusercontent.com/...`.
2. La URL original tal cual.
3. Para una URL de repositorio sin archivo: `raw.githubusercontent.com/<owner>/<repo>/main/README.md`
   y luego la variante `master`.

Un candidato se descarta si devuelve `!response.ok`, si el cuerpo viene vacío, o si el contenido
parece un documento HTML (`<!doctype`, `<html`, `<head`, `<body`). Si se agotan los candidatos, el
modal muestra el error y un enlace para abrir el README original en una pestaña nueva.

Dentro del Markdown, los enlaces e imágenes relativos se resuelven contra la URL efectiva desde la
que se descargó el archivo, para que las imágenes del repositorio se vean. La petición se cancela
con `AbortController` si el visitante cierra el modal antes de que termine.

## 7. Requisitos no funcionales

| ID | Requisito | Estado |
|---|---|---|
| RNF-01 | Un fallo de red en Firestore o en el README nunca deja la página en blanco | Implementado |
| RNF-02 | Las imágenes de tarjeta cargan con `loading="lazy"` y spinner de transición | Implementado |
| RNF-03 | Los modales declaran `role="dialog"` y `aria-modal="true"` | Implementado |
| RNF-04 | El contenido remoto de Markdown se renderiza sin HTML crudo | Implementado — `react-markdown` sin `rehype-raw` |

## 8. Criterios de aceptación

- **CA-01** — Cargar un proyecto nuevo en Firestore lo hace visible en el sitio con solo recargar,
  sin deploy.
- **CA-02** — Con el endpoint de Firestore bloqueado, la sección muestra los proyectos estáticos.
- **CA-03** — Un `readmeUrl` que apunta a la página HTML de GitHub igual renderiza el Markdown.
- **CA-04** — Un documento con `technologies` en formato CSV produce los mismos badges que uno con
  array.

## 9. Deuda conocida

1. ~~`bucketPath` apuntaba a la Cloud Function retirada.~~ **Resuelto el 2026-09-21:**
   `externalSources.projectsFromFirebase` en `content.es.ts` y `content.en.ts` ahora declara el
   endpoint real de Firestore REST y su `description` describe la lectura directa, sin Cloud
   Functions.
2. Los proyectos que llegan de Firestore pierden `highlights`: el transform los deja en `[]` porque
   el documento no tiene ese campo. Las tarjetas dinámicas son menos ricas que las estáticas.
3. El `role` de un proyecto dinámico es siempre el literal `Proyecto` / `Project`.
4. Las portadas se registran a mano en `projectCovers.ts`; un título que cambia rompe el slug en
   silencio y la tarjeta pierde la imagen.

## 10. Fuera de alcance

Escritura desde el portfolio, caché offline de proyectos, paginación más allá de 100 documentos.

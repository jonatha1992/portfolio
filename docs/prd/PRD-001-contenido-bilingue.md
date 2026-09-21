# PRD-001 — Contenido bilingüe y preferencias de visualización

| Campo | Valor |
|---|---|
| Padre | [PRD-000](PRD-000-sistema.md) |
| Estado | Implementado |
| Código | `src/context/LocaleContext.tsx`, `src/data/`, `src/i18n/`, `src/hooks/useTheme.ts` |

## 1. Problema

El portfolio apunta a dos mercados laborales: local (español) e internacional (inglés). Traducir
con un servicio automático degrada términos técnicos y el tono del perfil. Al mismo tiempo, el
contenido cambia seguido (proyectos, certificaciones, timeline) y no puede quedar disperso dentro
de los componentes.

## 2. Objetivo

Separar contenido de presentación: los componentes no contienen texto, y agregar o corregir
información se hace editando datos tipados, nunca JSX.

## 3. Modelo de contenido

Dos capas distintas, con propósitos distintos:

| Capa | Archivos | Contiene |
|---|---|---|
| Contenido del perfil | `src/data/content.es.ts`, `content.en.ts` | Datos personales, skills, proyectos, logros, experiencia, formación, certificaciones, artículos, timeline, contacto, redes |
| Copys de interfaz | `src/i18n/ui.es.ts`, `ui.en.ts` | Navegación, títulos de sección, CTAs, labels, textos del asistente |

Ambas capas están tipadas: `ProfileContent` en `src/data/types.ts` y `UiCopy` en `src/i18n/types.ts`.
El tipo es el contrato — si un idioma pierde una clave, el build falla.

`src/data/content.ts` y `src/i18n/index.ts` son los selectores que resuelven el locale activo.

## 4. Requisitos funcionales

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El idioma inicial se resuelve por prioridad: `localStorage` → idioma del navegador → `es` | P0 | Implementado |
| RF-02 | La preferencia de idioma persiste bajo la clave `jc-portfolio-locale` | P0 | Implementado |
| RF-03 | Un toggle en el header cambia el idioma sin recargar la página | P0 | Implementado |
| RF-04 | El cambio de idioma actualiza contenido, copys de UI y el contexto del asistente IA | P0 | Implementado |
| RF-05 | El sitio ofrece modo claro y oscuro, con toggle en el header | P1 | Implementado |
| RF-06 | La preferencia de tema persiste entre visitas | P1 | Implementado |
| RF-07 | Ambos idiomas exponen exactamente la misma estructura de contenido | P0 | Implementado vía tipos |

## 5. Requisitos no funcionales

| ID | Requisito | Estado |
|---|---|---|
| RNF-01 | Ningún componente contiene texto visible hardcodeado en un idioma | Parcial — quedan literales ES/EN embebidos en `ProjectsSection.tsx` (estados de carga y error del visor de README) |
| RNF-02 | Cambiar idioma o tema no dispara un remount completo del árbol | Implementado — `useMemo` en `LocaleContext` |
| RNF-03 | El contraste cumple AA en claro y oscuro | Implementado por la paleta de `tailwind.config.js` |

## 6. Criterios de aceptación

- **CA-01** — Con `localStorage` vacío y navegador en inglés, la primera carga muestra el sitio en
  inglés.
- **CA-02** — Al alternar idioma, una pregunta al asistente IA se responde en el nuevo idioma.
- **CA-03** — Agregar una clave a `content.es.ts` sin agregarla a `content.en.ts` rompe `npm run build`.
- **CA-04** — Recargar la página conserva idioma y tema elegidos.

## 7. Deuda conocida

1. Los mensajes de carga y error del visor de README se construyen con ternarios `locale === 'es'`
   dentro de `ProjectsSection.tsx` en vez de salir de `ui.*.ts`. Mover a la capa de copys.
2. La misma técnica aparece en `services/firebase.ts` para el label de rol del proyecto
   (`'Proyecto' | 'Project'`).

## 8. Fuera de alcance

Librerías de i18n con pluralización y formato (`react-i18next`, `lingui`). El volumen actual de
texto no lo justifica; se evaluará si el portfolio suma un blog.

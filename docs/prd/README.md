# PRD — Portfolio Técnico Jonathan Correa

Índice de documentos de requisitos de producto. Cada PRD describe **qué** hace el sistema y
**por qué**, no cómo está implementado línea por línea. La implementación vive en `src/`.

| ID | Documento | Alcance |
|---|---|---|
| PRD-000 | [Visión de sistema](PRD-000-sistema.md) | Producto completo, usuarios, arquitectura, métricas |
| PRD-001 | [Contenido bilingüe y tema](PRD-001-contenido-bilingue.md) | ES/EN, modo claro/oscuro, modelo de contenido |
| PRD-002 | [Proyectos dinámicos](PRD-002-proyectos-dinamicos.md) | Firestore REST, portadas locales, visor de README |
| PRD-003 | [Asistente IA](PRD-003-asistente-ia.md) | Chat multi-proveedor con fallback |
| PRD-004 | [SEO, hosting y CI/CD](PRD-004-seo-deploy.md) | Meta tags, Firebase Hosting, GitHub Actions |

## Estado

Última revisión: 2026-09-21. Rama `main`, commit base `b53554a`.

## Convenciones

- `RF-x` requisito funcional, `RNF-x` requisito no funcional, `CA-x` criterio de aceptación.
- Prioridad: **P0** bloquea el release, **P1** importante, **P2** deseable.
- Un requisito marcado *Implementado* tiene código que lo cumple hoy.
- Un requisito marcado *Pendiente* está acordado pero no construido.
- Un requisito marcado *Deuda* está implementado de forma parcial o con una solución temporal.

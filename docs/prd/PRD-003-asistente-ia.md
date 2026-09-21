# PRD-003 — Asistente IA del portfolio

| Campo | Valor |
|---|---|
| Padre | [PRD-000](PRD-000-sistema.md) |
| Estado | Implementado con deuda de seguridad |
| Código | `src/services/portfolioAgent.ts`, `src/components/chat/PortfolioAgentChat.tsx` |

## 1. Problema

Un reclutador con una pregunta concreta — "¿tiene experiencia real en Airflow?", "¿cuánto tiempo
lleva en data engineering?" — tiene que escanear el sitio entero para encontrarla, o irse. Y un
reclutador no técnico ni siquiera sabe qué buscar.

## 2. Objetivo

Un chat que responde sobre el perfil usando **solo** datos verificados del portfolio, en el idioma
activo, y que empuja al contacto directo cuando no tiene la respuesta.

## 3. Comportamiento del agente

El system prompt fija cinco reglas:

1. Responder siempre en el idioma activo (español neutro o inglés claro).
2. Usar únicamente el snapshot del portfolio que se le adjunta.
3. Si el dato no está en el snapshot, decir que no está disponible y recomendar contacto directo.
4. Formatear contactos como enlaces Markdown: `[LinkedIn](https://...)`, `[Email](mailto:...)`,
   `[Teléfono](tel:+...)`.
5. Guiar al visitante hacia los anclajes de sección cuando sea útil.

El snapshot es un JSON con personal, skills, proyectos (sin `media`), logros, experiencia,
formación, certificaciones, timeline, artículos, contacto y redes. Se arma en cada request a partir
del `ProfileContent` del locale activo, así que el agente nunca queda desactualizado respecto del
sitio.

Parámetros de generación: `temperature` 0.35, `max_tokens` 500, historial recortado a los últimos
10 mensajes.

## 4. Proveedores y fallback

| Proveedor | Modelo por defecto | Variables de key aceptadas |
|---|---|---|
| `gemini` (default) | `gemini-2.5-flash` | `GEMINI_API_KEY`, `VITE_GEMINI_API_KEY` |
| `openrouter` | `openai/gpt-4o-mini` | `OPEN_ROUTER_API_KEY`, `VITE_OPEN_ROUTER_API_KEY` |
| `groq` | `llama-3.1-8b-instant` | `GROQ_API_KEY`, `VITE_GROQ_API_KEY` |
| `openai` | `gpt-4o-mini` | `OPENAI_API_KEY`, `VITE_OPENAI_API_KEY` |

- `VITE_AI_PROVIDER` elige el preferido; por defecto `gemini`.
- El orden de intento es: proveedor preferido primero, después el resto en el orden
  `gemini → openrouter → groq → openai`, salteando los que no tienen key.
- `VITE_AI_API_KEY` sigue funcionando como key legacy única, pero solo aplica al proveedor preferido.
- Modelo y endpoint se pueden sobrescribir por proveedor: `VITE_<PROVEEDOR>_MODEL` y
  `VITE_<PROVEEDOR>_API_URL`; `VITE_AI_MODEL` y `VITE_AI_API_URL` sirven de valor compartido.
- OpenRouter acepta además `VITE_OPEN_ROUTER_SITE_URL` y `VITE_OPEN_ROUTER_APP_NAME`, que viajan
  como headers `HTTP-Referer` y `X-Title`.

Gemini usa el formato nativo `generateContent` (`systemInstruction` + `contents`, rol `model` para
el asistente). El resto usa el formato OpenAI de `chat/completions`.

## 5. Requisitos funcionales

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El chat se abre desde un botón flotante presente en toda la página | P1 | Implementado |
| RF-02 | El asistente responde en el idioma activo del sitio | P0 | Implementado |
| RF-03 | Si el proveedor preferido falla, se reintenta con los siguientes hasta agotar los configurados | P0 | Implementado |
| RF-04 | Sin ninguna key configurada, el chat muestra un mensaje explicativo y no intenta la llamada | P0 | Implementado |
| RF-05 | Si todos los proveedores fallan, se muestra un mensaje de error recuperable e invita a reintentar | P1 | Implementado |
| RF-06 | El chat ofrece prompts sugeridos para arrancar la conversación | P2 | Implementado |
| RF-07 | El visitante puede reiniciar la conversación | P2 | Implementado |
| RF-08 | Las respuestas renderizan enlaces, negritas, viñetas y encabezados; emails, teléfonos y URLs sueltas se convierten en enlaces accionables | P1 | Implementado |

## 6. Requisitos no funcionales

| ID | Requisito | Estado |
|---|---|---|
| RNF-01 | Un fallo del chat nunca afecta el render del resto del sitio | Implementado |
| RNF-02 | El historial enviado se limita a 10 mensajes para acotar tokens | Implementado |
| RNF-03 | Las keys de IA no deben quedar expuestas en el cliente | **No cumplido** — ver §7 |
| RNF-04 | El agente no inventa datos que no estén en el snapshot | Mitigado por prompt, no garantizado |

## 7. Riesgo de seguridad abierto

Las llamadas a los proveedores salen directamente del navegador, así que **las API keys quedan
en el bundle de producción y son legibles por cualquier visitante**. Es una decisión consciente
para evitar un backend, no un descuido, y trae dos consecuencias que hay que asumir:

- Un tercero puede extraer la key y consumir la cuota.
- La única contención real son los límites de gasto configurados en cada proveedor.

Mitigación mínima vigente: usar keys con cuota baja, preferir proveedores con tier gratuito
(Gemini, Groq) y rotarlas periódicamente.

**Pendiente (P1):** mover la llamada a un proxy propio — Cloud Function, Vercel Function o Worker —
que guarde las keys del lado del servidor y exponga un único endpoint con rate limiting. Es el
cambio que cierra RNF-03.

## 8. Criterios de aceptación

- **CA-01** — Con solo `GROQ_API_KEY` configurada y `VITE_AI_PROVIDER=gemini`, el chat igual
  responde: el fallback llega a Groq.
- **CA-02** — Sin keys, abrir el chat muestra el aviso de configuración faltante y ningún error en
  consola por request fallido.
- **CA-03** — Preguntar un dato que no está en el portfolio produce una respuesta que lo admite y
  deriva al contacto.
- **CA-04** — Pedir el contacto devuelve enlaces clicables de email, teléfono y LinkedIn.

## 9. Fuera de alcance

Persistencia del historial entre sesiones, streaming de respuestas, function calling, moderación
de entrada del visitante.

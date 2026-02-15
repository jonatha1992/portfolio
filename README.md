# Portfolio Tecnico - Jonathan Correa

Aplicacion React + TypeScript enfocada en destacar tu perfil como analista programador, ingeniero de datos y desarrollador full stack. El frontend se apoya en Vite y Tailwind CSS para entregar una experiencia moderna, responsive, bilingue (ES/EN) y con modo oscuro.

## Requisitos

- Node.js >= 18
- npm >= 9 (incluido con Node)

## Scripts principales

- `npm install` - instala dependencias.
- `npm run dev` - levanta el servidor de desarrollo (`http://localhost:5173`).
- `npm run build` - genera el build de produccion en `dist/`.
- `npm run preview` - sirve el build generado para validarlo localmente.

## Configurar agente IA (chat)

Agrega un archivo `.env` en la raiz del proyecto con:

```bash
GEMINI_API_KEY=tu_api_key_gemini
OPEN_ROUTER_API_KEY=tu_api_key_openrouter
GROQ_API_KEY=tu_api_key_groq
VITE_AI_PROVIDER=gemini
# VITE_GEMINI_MODEL=gemini-2.5-flash
# VITE_OPEN_ROUTER_MODEL=openai/gpt-4o-mini
# VITE_GROQ_MODEL=llama-3.1-8b-instant
```

- Configura una o varias keys. Si el proveedor principal falla, el chat hace fallback automatico en este orden: `gemini -> openrouter -> groq`.
- `VITE_AI_PROVIDER` acepta `gemini`, `openrouter`, `groq` u `openai`. Por defecto usa `gemini`.
- Puedes seguir usando `VITE_AI_API_KEY` (modo legacy) si prefieres una sola key segun `VITE_AI_PROVIDER`.
- Models opcionales por proveedor: `VITE_GEMINI_MODEL`, `VITE_OPEN_ROUTER_MODEL`, `VITE_GROQ_MODEL`, `VITE_OPENAI_MODEL`.
- Endpoints opcionales por proveedor: `VITE_GEMINI_API_URL`, `VITE_OPEN_ROUTER_API_URL`, `VITE_GROQ_API_URL`, `VITE_OPENAI_API_URL`.
- El chat usa el contenido de `src/data/content.es.ts` y `src/data/content.en.ts` como contexto para guiar al visitante.

Nota: estas keys se usan desde el frontend (`VITE_*`, `GEMINI_*`, `OPEN_ROUTER_*`, `GROQ_*`), por lo que quedan expuestas en cliente. Para produccion, conviene mover la llamada a un backend/proxy propio.

## Estructura clave

```text
src/
|-- components/
|   |-- common/        Elementos reutilizables (SectionHeader, Pill, etc.)
|   |-- layout/        Layout general, header, footer y toggles (tema/idioma)
|-- context/
|   |-- LocaleContext.tsx  Proveedor que centraliza idioma + contenido
|-- data/
|   |-- content.es.ts  Contenido principal en espanol
|   |-- content.en.ts  Contenido principal en ingles
|   |-- content.ts     Helper para obtener el locale activo
|   |-- types.ts       Tipos compartidos para el contenido
|-- hooks/
|   |-- useTheme.ts    Controla modo claro/oscuro persistente
|-- icons/
|   |-- techIcons.tsx  Mapeo de tecnologias -> iconos de `react-icons`
|-- i18n/             Copys de UI (navegacion, labels, CTA)
|-- sections/          Cada bloque de contenido (Hero, Skills, Projects, ...)
|-- App.tsx            Orquesta secciones y navegacion
|-- main.tsx           Punto de entrada de React
public/
|-- assets/profile/    Agrega aqui tu foto (jonathan-correa.jpg)
```

## Personalizacion rapida

- Edita `src/data/content.es.ts` y `src/data/content.en.ts` para actualizar datos personales, skills, proyectos, logros, timeline y enlaces en ambos idiomas. Los textos de UI se controlan desde `src/i18n/ui.es.ts` y `src/i18n/ui.en.ts`.
- El bloque `externalSources.projectsFromFirebase` describe el bucket sugerido para sincronizar los proyectos desde Firebase Storage cuando lo conectes.
- Los articulos funcionan como mini blogs. Deja la URL en `#` hasta publicar cada nota.
- No olvides reemplazar los datos de contacto, foto y enlace al CV antes de hacer publico el sitio.

## Estilo y UX

- Paleta profesional basada en azules profundos (`primary`) y grises neutros (`neutral`) definida en `tailwind.config.js`, con contraste reforzado en bordes para modo claro/oscuro.
- Header sticky con toggles de idioma y tema; las preferencias se persisten en `localStorage`.
- Hero, skills y timeline emplean iconos contextuales (`react-icons`) para identificar rapidamente tecnologias, redes y certificaciones.
- Las tarjetas utilizan sombras suaves (`shadow-soft`) y badges (`Pill`) con iconos para resaltar stacks e impacto tecnico.

## Ideas para siguientes iteraciones

1. **Firebase Storage / Firestore**: consumir dinamicamente el JSON de proyectos para mantener el contenido sincronizado sin redeploy.
2. **Internacionalizacion avanzada**: si necesitas contenidos mas complejos, integra `react-i18next` o `lingui` para manejar pluralizacion y formatos.
3. **Blog tecnico real**: conectar la seccion de articulos con un CMS ligero (Notion API, Contentful, Hashnode) o con tu repositorio de notas en GitHub.
4. **Automatizacion de deploy**: preparar GitHub Actions o servicios como Vercel/Netlify para publicar automaticamente en cada push.
5. **Medicion**: agregar metas de conversion (boton de contacto, descargas de CV) con herramientas como Plausible o simple analytics self-hosted.

## Notas finales

- Cuando tengas tu fotografia, agregala en `public/assets/profile/jonathan-correa.jpg` para reemplazar el fallback actual.
- Ajusta cualquier copy directamente en los archivos de contenido o i18n para mantener separada la logica de presentacion.
- El proyecto se entrega listo para deploy estatico (Firebase Hosting, Vercel, Netlify o GitHub Pages).

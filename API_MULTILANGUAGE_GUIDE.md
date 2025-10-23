# Guía para Agregar Soporte Multi-Idioma a la API de Firebase

## Problema Actual

La API `https://tecnofuision-it.web.app/api/projects` actualmente devuelve SIEMPRE los proyectos en inglés, sin importar el parámetro `locale` que se le pase:

```bash
# Estos dos retornan lo mismo (inglés):
https://tecnofuision-it.web.app/api/projects?locale=es
https://tecnofuision-it.web.app/api/projects?locale=en
```

## Solución: Actualizar el Backend

Necesitas modificar tu Cloud Function o API endpoint en Firebase para:

### Opción 1: Almacenar traducciones en Firestore

Estructura de datos sugerida en Firestore:

```javascript
// Colección: projects
{
  id: "6zFhXeIswgQvY2iGNq4O",
  image: "https://...",
  previewLink: "https://...",
  githubLink: "https://...",
  createdAt: Timestamp,
  updatedAt: Timestamp,

  // Campos multi-idioma
  translations: {
    en: {
      title: "AudiText",
      description: "Introducing AudioText: your one-stop solution..."
    },
    es: {
      title: "AudiText",
      description: "Presentamos AudioText: tu solución integral..."
    }
  }
}
```

### Opción 2: Dos colecciones separadas

```javascript
// Colección: projects_en
{
  id: "...",
  title: "AudiText",
  description: "Introducing AudioText...",
  // ...
}

// Colección: projects_es
{
  id: "...",
  title: "AudiText",
  description: "Presentamos AudioText...",
  // ...
}
```

## Código de Ejemplo para Cloud Function

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.projects = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');

  // Obtener locale del query parameter (por defecto 'en')
  const locale = req.query.locale || 'en';

  // Validar locale
  if (!['es', 'en'].includes(locale)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid locale. Use "es" or "en"'
    });
  }

  try {
    // OPCIÓN 1: Con traducciones en el documento
    const snapshot = await admin.firestore()
      .collection('projects')
      .orderBy('createdAt', 'desc')
      .get();

    const projects = snapshot.docs.map(doc => {
      const data = doc.data();
      const translation = data.translations[locale] || data.translations.en;

      return {
        id: doc.id,
        title: translation.title,
        description: translation.description,
        image: data.image,
        previewLink: data.previewLink,
        githubLink: data.githubLink,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    });

    res.json({
      success: true,
      count: projects.length,
      projects: projects
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

O con colecciones separadas:

```javascript
exports.projects = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const locale = req.query.locale || 'en';

  if (!['es', 'en'].includes(locale)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid locale'
    });
  }

  try {
    // OPCIÓN 2: Colecciones separadas
    const collectionName = `projects_${locale}`;

    const snapshot = await admin.firestore()
      .collection(collectionName)
      .orderBy('createdAt', 'desc')
      .get();

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      count: projects.length,
      projects: projects
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

## Pasos para Implementar

### 1. Actualizar los datos en Firestore

Agrega las traducciones a tus proyectos existentes:

```javascript
// Script para actualizar proyectos existentes
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function addTranslations() {
  const projects = await db.collection('projects').get();

  for (const doc of projects.docs) {
    const data = doc.data();

    await doc.ref.update({
      translations: {
        en: {
          title: data.title, // título actual en inglés
          description: data.description // descripción actual en inglés
        },
        es: {
          title: data.title, // Cambiar a español manualmente
          description: "Traducción en español..." // Agregar traducción
        }
      }
    });
  }

  console.log('Translations added!');
}

addTranslations();
```

### 2. Actualizar Cloud Function

Sube el código de la función actualizada:

```bash
firebase deploy --only functions:projects
```

### 3. Probar la API

```bash
# Inglés
curl https://tecnofuision-it.web.app/api/projects?locale=en

# Español
curl https://tecnofuision-it.web.app/api/projects?locale=es
```

## Mientras Tanto...

**Hasta que implementes esto en el backend**, puedes:

1. **Desactivar Firebase** y usar proyectos estáticos (ya están en español/inglés)
2. **Dejar Firebase solo para inglés** y avisar que español está en desarrollo

Para desactivar temporalmente:

```typescript
// src/data/content.en.ts y content.es.ts
externalSources: {
  projectsFromFirebase: {
    enabled: false, // Cambiar a false
    // ...
  },
}
```

## Traducciones Sugeridas

Para tus proyectos actuales:

### AudiText (Español)
```
Título: AudiText
Descripción: Presentamos AudioText: tu solución integral para transcribir y traducir audio a texto de manera eficiente, precisa y segura. 🎧➡️📝

Impulsado por Whisper de OpenAI, AudioText funciona completamente en local, asegurando que tus datos permanezcan en tu dispositivo sin enviar nada a servidores externos. 🔒

Características destacadas:
- Transcripción multilingüe precisa: Soporta una amplia variedad de idiomas y detecta automáticamente el idioma del audio.
- Traducción integrada: Traduce simultáneamente...
```

### Expenses Tracker (Español)
```
Título: Gestor de Gastos
Descripción: Esta es una aplicación web integral diseñada para ayudar a los usuarios a gestionar sus gastos personales...
```

---

**¿Necesitas ayuda para implementar esto?** Puedo ayudarte a escribir el código de la Cloud Function completo si me dices qué opción prefieres (traducciones en el documento vs colecciones separadas).

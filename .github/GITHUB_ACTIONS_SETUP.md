# Configuración de GitHub Actions para Deploy Automático a Firebase

Esta guía te ayudará a configurar GitHub Actions para que tu portfolio se despliegue automáticamente a Firebase cada vez que hagas push a la rama `main`.

## 📋 Archivo creado

- ✅ [`.github/workflows/firebase-deploy.yml`](workflows/firebase-deploy.yml) - Workflow de GitHub Actions

## 🔑 Configurar el Service Account de Firebase

Para que GitHub Actions pueda desplegar a Firebase, necesitas crear un service account y agregarlo como secret en GitHub.

### Paso 1: Crear Service Account en Firebase

Ejecuta el siguiente comando en tu terminal:

```bash
firebase init hosting:github
```

Este comando te guiará a través de los siguientes pasos:

1. **¿Para qué repositorio de GitHub?**
   - Introduce: `jonatha1992/portfolio` (o tu usuario/repo)

2. **¿Configurar un workflow para desplegar en cada push?**
   - Responde: `Yes`

3. **¿Archivo para el deploy automático?**
   - Presiona Enter para usar el archivo que ya creamos

4. **¿Configurar workflow para PR previews?**
   - Responde como prefieras (recomendado: `Yes`)

5. **¿Sobrescribir el workflow existente?**
   - Responde: `No` (ya tenemos nuestro archivo)

### Paso 2: Método alternativo (Manual)

Si prefieres configurarlo manualmente:

#### A. Crear Service Account en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto de Firebase: `portfolio-correa-jonathan`
3. Ve a **IAM & Admin** > **Service Accounts**
4. Haz clic en **Create Service Account**
5. Nombre: `github-actions-deployer`
6. Descripción: `Service account for GitHub Actions to deploy to Firebase`
7. Haz clic en **Create and Continue**

#### B. Asignar roles

Asigna los siguientes roles:
- `Firebase Hosting Admin`
- `Cloud Functions Developer` (si usas Functions)
- `Service Account User`

#### C. Crear y descargar la clave

1. En la lista de service accounts, encuentra el que acabas de crear
2. Haz clic en los tres puntos (⋮) > **Manage keys**
3. **Add Key** > **Create new key**
4. Selecciona **JSON**
5. Haz clic en **Create** (se descargará un archivo JSON)

#### D. Agregar el secret a GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Haz clic en **New repository secret**
4. Nombre: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN`
5. Value: Pega el contenido completo del archivo JSON descargado
6. Haz clic en **Add secret**

## 🚀 Cómo funciona

Una vez configurado, el workflow se ejecutará automáticamente cuando:

1. **Hagas push a la rama `main`**
   ```bash
   git add .
   git commit -m "feat: nueva característica"
   git push origin main
   ```

2. **Ejecutes el workflow manualmente**
   - Ve a tu repositorio en GitHub
   - **Actions** > **Deploy to Firebase Hosting**
   - Haz clic en **Run workflow**

## 📊 Monitorear los despliegues

Para ver el estado de tus despliegues:

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Verás la lista de todos los workflows ejecutados
4. Haz clic en cualquiera para ver los detalles y logs

## ⚙️ Configuración del Workflow

El workflow hace lo siguiente:

```yaml
1. Checkout del código
2. Configurar Node.js 20
3. Instalar dependencias (npm ci)
4. Construir el proyecto (npm run build)
5. Desplegar a Firebase Hosting
```

### Triggers configurados:

- **Push a main**: Deploy automático
- **workflow_dispatch**: Deploy manual desde GitHub

## 🔧 Personalización

### Cambiar la rama de deploy

Si quieres desplegar desde otra rama, edita [`.github/workflows/firebase-deploy.yml`](workflows/firebase-deploy.yml):

```yaml
on:
  push:
    branches:
      - develop  # Cambia 'main' por tu rama
```

### Agregar pasos adicionales

Puedes agregar más pasos antes del deploy, por ejemplo:

```yaml
- name: Run tests
  run: npm test

- name: Run linter
  run: npm run lint
```

### Deploy a preview channels

Para crear preview channels en PRs, agrega otro workflow:

```yaml
name: Deploy PR Preview

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN }}'
          projectId: portfolio-correa-jonathan
```

## ✅ Verificar que todo funcione

1. Haz un pequeño cambio en tu código
2. Commit y push:
   ```bash
   git add .
   git commit -m "test: verificar GitHub Actions"
   git push origin main
   ```
3. Ve a la pestaña **Actions** en GitHub
4. Deberías ver un workflow en ejecución
5. Espera a que complete (debería tomar 2-3 minutos)
6. Verifica tu sitio en: https://portfolio-correa-jonathan.web.app

## 🆘 Problemas comunes

### Error: "Error: Cannot find module"
- **Solución**: Asegúrate de usar `npm ci` en lugar de `npm install`

### Error: "Permission denied"
- **Solución**: Verifica que el service account tenga los roles correctos

### Error: "Invalid credentials"
- **Solución**: Verifica que el secret en GitHub tenga el JSON completo y válido

### El workflow no se ejecuta
- **Solución**: Verifica que el archivo esté en `.github/workflows/` (nota el punto al inicio)

## 📝 Ventajas de usar GitHub Actions

✅ Deploy automático en cada push
✅ Sin necesidad de ejecutar comandos localmente
✅ Historial completo de despliegues
✅ Fácil rollback a versiones anteriores
✅ Integración con pull requests
✅ Notificaciones automáticas de fallos

## 🔗 Recursos adicionales

- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Firebase Hosting GitHub Action](https://github.com/marketplace/actions/deploy-to-firebase-hosting)
- [Workflows de ejemplo](https://github.com/FirebaseExtended/action-hosting-deploy#examples)

---

**Nota**: Una vez configurado, ¡nunca más tendrás que ejecutar `firebase deploy` manualmente! 🎉

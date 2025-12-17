# Configurar GitHub Secret para Deploy Automático

## 🔑 Opción 1: Usando Firebase CLI (Más rápido)

Ejecuta este comando en tu terminal:

```bash
firebase init hosting:github
```

Sigue las instrucciones y responde:
- **For which GitHub repository?** → `jonatha1992/portfolio`
- **Set up the workflow?** → `Y`
- **Build script?** → `npm ci && npm run build`
- **Automatic deployment?** → `Y`
- **Branch?** → `main`
- **Overwrite existing file?** → `n` (No)

Esto configurará todo automáticamente ✅

---

## 🔧 Opción 2: Crear Service Account manualmente

Si la Opción 1 no funciona, sigue estos pasos:

### Paso 1: Ir a Google Cloud Console

1. Abre: https://console.cloud.google.com/
2. Selecciona el proyecto: **portfolio-correa-jonathan**

### Paso 2: Crear Service Account

1. Ve a: **IAM & Admin** → **Service Accounts**
   - Directo: https://console.cloud.google.com/iam-admin/serviceaccounts?project=portfolio-correa-jonathan
2. Click en **"+ CREATE SERVICE ACCOUNT"**
3. Llena los campos:
   - **Service account name**: `github-actions`
   - **Service account ID**: `github-actions` (se genera automáticamente)
   - **Description**: `Service account for GitHub Actions deployments`
4. Click **"CREATE AND CONTINUE"**

### Paso 3: Asignar roles

Agrega estos roles:
1. **Firebase Hosting Admin** (obligatorio)
   - Busca: `Firebase Hosting Admin`
   - Selecciónalo
2. Click **"CONTINUE"**
3. Click **"DONE"**

### Paso 4: Crear y descargar la clave JSON

1. En la lista de service accounts, busca `github-actions@portfolio-correa-jonathan.iam.gserviceaccount.com`
2. Click en los **3 puntos** (⋮) a la derecha
3. Click **"Manage keys"**
4. Click **"Add Key"** → **"Create new key"**
5. Selecciona **JSON**
6. Click **"CREATE"**
7. **Se descargará un archivo JSON** → ¡Guárdalo bien!

### Paso 5: Agregar el secret en GitHub

1. Ve a tu repositorio: https://github.com/jonatha1992/portfolio
2. Click en **"Settings"** (arriba a la derecha)
3. En el menú izquierdo: **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**
5. Llena los campos:
   - **Name**: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN`
   - **Secret**:
     - Abre el archivo JSON descargado
     - Copia **TODO** el contenido (desde `{` hasta `}`)
     - Pégalo en el campo Secret
6. Click **"Add secret"**

---

## ✅ Verificar que funcione

Una vez agregado el secret:

### 1. Hacer un commit de prueba

```bash
git add .
git commit -m "test: verificar GitHub Actions deployment"
git push origin main
```

### 2. Ver el workflow en acción

1. Ve a: https://github.com/jonatha1992/portfolio/actions
2. Deberías ver un nuevo workflow ejecutándose
3. Click en él para ver los logs
4. Espera 2-3 minutos
5. ¡Debería completarse exitosamente! ✅

---

## 🔍 Troubleshooting

### Error: "firebaseServiceAccount not supplied"
- Verifica que el nombre del secret sea exactamente: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN`
- Asegúrate de que copiaste TODO el contenido del JSON (incluye las llaves `{}`)

### Error: "Permission denied"
- Verifica que el service account tenga el rol **Firebase Hosting Admin**

### El workflow no se ejecuta
- Asegúrate de hacer push a la rama `main`
- Verifica que el archivo `.github/workflows/firebase-deploy.yml` exista

---

## 📝 Resumen visual

```
1. Google Cloud Console
   └─ Crear Service Account "github-actions"
   └─ Asignar rol "Firebase Hosting Admin"
   └─ Descargar clave JSON

2. GitHub Repository
   └─ Settings → Secrets and variables → Actions
   └─ New repository secret
   └─ Name: FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_CORREA_JONATHAN
   └─ Secret: [contenido del JSON]

3. Git push
   └─ GitHub Actions se ejecuta automáticamente
   └─ Build + Deploy a Firebase ✅
```

---

## 🎯 Una vez configurado

Cada vez que hagas `git push origin main`:
1. ✅ GitHub Actions detecta el push
2. ✅ Instala dependencias
3. ✅ Construye el proyecto
4. ✅ Despliega a Firebase
5. ✅ Tu sitio se actualiza automáticamente

**¡Nunca más necesitarás ejecutar `firebase deploy` manualmente!** 🎉

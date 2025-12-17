# Guía Rápida de Deploy

## 🚀 Deploy Manual

Si necesitas hacer deploy manualmente:

```bash
# 1. Construir el proyecto
npm run build

# 2. Desplegar a Firebase
firebase deploy --only hosting

# O todo en uno:
npm run build && firebase deploy --only hosting
```

## 🤖 Deploy Automático con GitHub Actions

Una vez configurado GitHub Actions (ver [.github/GITHUB_ACTIONS_SETUP.md](.github/GITHUB_ACTIONS_SETUP.md)):

```bash
# Simplemente haz push a main
git add .
git commit -m "tu mensaje"
git push origin main

# ¡El deploy se hará automáticamente! ✨
```

## 📋 Checklist antes de hacer deploy

- [ ] ¿Probaste los cambios localmente? (`npm run dev`)
- [ ] ¿El build funciona sin errores? (`npm run build`)
- [ ] ¿Actualizaste el sitemap si agregaste nuevas páginas?
- [ ] ¿Los meta tags SEO están correctos?

## 🔗 URLs importantes

- **Sitio en producción**: https://portfolio-correa-jonathan.web.app
- **Firebase Console**: https://console.firebase.google.com/project/portfolio-correa-jonathan
- **GitHub Actions**: https://github.com/jonatha1992/portfolio/actions

## 📊 SEO y Google Search Console

Después del deploy, verifica:

1. Robots.txt: https://portfolio-correa-jonathan.web.app/robots.txt
2. Sitemap: https://portfolio-correa-jonathan.web.app/sitemap.xml
3. Google Search Console: https://search.google.com/search-console

Ver [GOOGLE_SEARCH_CONSOLE_SETUP.md](GOOGLE_SEARCH_CONSOLE_SETUP.md) para más detalles.

## 🛠️ Comandos útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar Firebase login
firebase login

# Ver proyectos de Firebase
firebase projects:list

# Deploy específico
firebase deploy --only hosting:production

# Ver logs de Firebase
firebase hosting:channel:list
```

## 📝 Estructura de archivos importantes

```
portfolio/
├── dist/                    # Build de producción (generado)
├── public/
│   ├── robots.txt          # SEO - permite rastreo de Google
│   └── sitemap.xml         # SEO - mapa del sitio
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml  # GitHub Actions workflow
├── firebase.json           # Configuración de Firebase
└── index.html             # Meta tags SEO
```

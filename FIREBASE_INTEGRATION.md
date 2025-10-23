# Firebase Projects Integration ✅

## Overview

This portfolio now supports **dynamic project loading** from Firebase API. Projects are automatically fetched from:
```
https://tecnofuision-it.web.app/api/projects
```

The integration includes **multi-language support** - the current locale (es/en) is automatically passed to the API as a query parameter (`?locale=es` or `?locale=en`), allowing the API to return projects in the appropriate language when available.

## 🎯 Features Implemented

✅ **Automatic Loading**: Projects load automatically when the component mounts
✅ **Image Support**: All project images are displayed from Firebase Storage
✅ **Multi-Language Support**: Automatically fetches projects in the current language (es/en)
✅ **Loading State**: Beautiful spinner while fetching projects
✅ **Fallback**: Uses static projects if Firebase is disabled or fetch fails
✅ **Error Handling**: Graceful error handling with console logging

## 📁 Files Modified/Created

### New Files
- **[src/services/firebase.ts](src/services/firebase.ts)**: Service to fetch and transform projects

### Modified Files
- **[src/data/types.ts](src/data/types.ts)**: Added `FirebaseProject` and `FirebaseProjectsResponse` types
- **[src/services/firebase.ts](src/services/firebase.ts)**: Added locale parameter support
- **[src/sections/ProjectsSection.tsx](src/sections/ProjectsSection.tsx)**: Added dynamic loading with React hooks, image display, and locale support
- **[src/App.tsx](src/App.tsx)**: Pass current locale to ProjectsSection
- **[src/data/content.en.ts](src/data/content.en.ts)**: Enabled Firebase integration (`enabled: true`)
- **[src/data/content.es.ts](src/data/content.es.ts)**: Enabled Firebase integration (`enabled: true`)

## 🚀 Quick Start

### 1. Enable/Disable Integration

Edit [src/data/content.en.ts](src/data/content.en.ts) or [src/data/content.es.ts](src/data/content.es.ts):

```typescript
externalSources: {
  projectsFromFirebase: {
    enabled: true,  // Set to false to use static projects
    // ...
  },
}
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

### 3. Change API URL (Optional)

If you need to use a different API endpoint, edit [src/services/firebase.ts](src/services/firebase.ts):

```typescript
const FIREBASE_API_URL = 'https://your-api-url.com/projects'
```

## 🧪 Testing

### Manual Testing

1. **Development Mode**: `npm run dev`
2. **Check Browser Console**: Open DevTools to see fetch logs
3. **Build for Production**: `npm run build && npm run preview`

### ✅ Test Results (2025-10-23)

| Test | Status |
|------|--------|
| API Connection | ✅ Working (200 OK) |
| Projects Count | ✅ 5 projects loaded |
| Images Display | ✅ All projects have images |
| Build Success | ✅ No errors |
| TypeScript | ✅ No type errors |

**Projects Currently Available**:
1. ✅ AudiText
2. ✅ Expenses Tracker
3. ✅ Neon Designs - Carteles de Neón LED
4. ✅ Forgotten Objects System
5. ✅ AESFRON

## 🌍 Multi-Language Support

The integration automatically detects the current language from the portfolio's locale context and passes it to the Firebase API:

- **Spanish**: `https://tecnofuision-it.web.app/api/projects?locale=es`
- **English**: `https://tecnofuision-it.web.app/api/projects?locale=en`

When the user switches languages using the language toggle, the component:
1. Detects the locale change
2. Re-fetches projects with the new locale
3. Updates the displayed projects automatically

**Note**: If your API doesn't support multi-language yet, it will simply ignore the `locale` parameter and return the default language. You can later add support on the API side without changing the frontend code.

## 📊 Firebase API Structure

The API returns projects in this format:

```typescript
{
  success: boolean
  count: number
  projects: [
    {
      id: string
      title: string
      description: string
      image: string              // Firebase Storage URL
      previewLink: string        // Live demo URL
      githubLink: string         // GitHub repository URL
      createdAt: {
        _seconds: number
        _nanoseconds: number
      }
      updatedAt: {
        _seconds: number
        _nanoseconds: number
      }
    }
  ]
}
```

## 🔄 Data Transformation

Firebase projects are automatically transformed to match the portfolio's Project type:

| Firebase Field | Portfolio Field | Notes |
|---------------|-----------------|-------|
| `title` | `title` | Project name |
| `description` | `summary` | Project description |
| `image` | `media.src` | **Image displayed at top of card** |
| `githubLink` | `codeUrl` | GitHub repository |
| `previewLink` | `liveUrl` | Live demo |
| `createdAt` | `period` | Extracted year |

## 🎨 UI Components

### Project Card with Image

Each project card now includes:
- **Hero Image** (top): 256px height, full width, hover zoom effect
- Title and role
- Period badge
- Description
- Highlights (if available)
- Stack badges (if available)
- Action buttons (GitHub + Live Demo)

### Loading State

```
┌─────────────────────────────┐
│     🔄 Loading spinner      │
│   Loading projects...       │
└─────────────────────────────┘
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

## 🎯 Future Enhancements

- [ ] Add retry logic for failed API requests
- [ ] Implement caching with localStorage
- [ ] Add manual refresh button
- [ ] Support for filtering/sorting projects
- [ ] Add project categories/tags from Firebase
- [ ] Pagination for large project lists
- [ ] Search functionality

## 📝 Notes

- Images are lazy-loaded for better performance
- Projects without images will display without the hero section
- API errors are logged to console but don't break the UI
- Fallback to static projects ensures the portfolio always works

## 🐛 Troubleshooting

### Projects not loading?

1. Check browser console for errors
2. Check `externalInfo.enabled` is `true` in content files
3. Verify the API URL in [src/services/firebase.ts](src/services/firebase.ts)
4. Test the API manually: Open `https://tecnofuision-it.web.app/api/projects` in your browser

### Images not showing?

1. Check browser console for CORS errors
2. Verify Firebase Storage permissions
3. Check image URLs are valid in API response

### Build errors?

```bash
npm run build
```

Check TypeScript errors and fix them.

---

**Created**: 2025-10-23
**Status**: ✅ Fully functional and tested
**API URL**: https://tecnofuision-it.web.app/api/projects

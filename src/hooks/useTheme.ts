import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'jc-portfolio-theme'

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  // respeta preferencia del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme)

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const custom = event as CustomEvent<ThemeMode>
      if (custom.detail) {
        setTheme(custom.detail)
      }
    }

    window.addEventListener('jc-theme-change', handleThemeChange as EventListener)

    return () => {
      window.removeEventListener('jc-theme-change', handleThemeChange as EventListener)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    window.dispatchEvent(new CustomEvent<ThemeMode>('jc-theme-change', { detail: theme }))
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}

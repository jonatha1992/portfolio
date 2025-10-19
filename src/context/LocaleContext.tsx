import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProfileContent } from '../data/content'
import type { Locale, ProfileContent } from '../data/types'
import { getUiCopy } from '../i18n'
import type { UiCopy } from '../i18n'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  content: ProfileContent
  ui: UiCopy
}

const STORAGE_KEY = 'jc-portfolio-locale'

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'es'
  }
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') {
    return stored
  }
  const browserLanguage = window.navigator.language.toLowerCase()
  return browserLanguage.startsWith('en') ? 'en' : 'es'
}

type LocaleProviderProps = {
  children: React.ReactNode
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const content = useMemo(() => getProfileContent(locale), [locale])
  const ui = useMemo(() => getUiCopy(locale), [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === 'es' ? 'en' : 'es')),
      content,
      ui,
    }),
    [locale, content, ui],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

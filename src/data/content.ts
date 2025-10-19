import { profileContentEn } from './content.en'
import { profileContentEs } from './content.es'
import type { Locale, ProfileContent } from './types'

const contentByLocale: Record<Locale, ProfileContent> = {
  es: profileContentEs,
  en: profileContentEn,
}

export const getProfileContent = (locale: Locale): ProfileContent => contentByLocale[locale]

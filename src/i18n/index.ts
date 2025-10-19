import type { Locale } from '../data/types'
import type { UiCopy, UiDictionary } from './types'
import { uiEn } from './ui.en'
import { uiEs } from './ui.es'

const uiByLocale: UiDictionary = {
  es: uiEs,
  en: uiEn,
}

export const getUiCopy = (locale: Locale): UiCopy => uiByLocale[locale]

export type { UiCopy } from './types'

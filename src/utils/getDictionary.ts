// // Third-party Imports
// import 'server-only'

// // Type Imports
// import type { Locale } from '@configs/i18n'

// const dictionaries = {
//   en: () => import('@/data/dictionaries/en.json').then(module => module.default),
//   fr: () => import('@/data/dictionaries/fr.json').then(module => module.default),
//   ar: () => import('@/data/dictionaries/ar.json').then(module => module.default)
// }

// export const getDictionary = async (locale: Locale) => dictionaries[locale]()

// Third-party Imports
import 'server-only'

// Type Imports
import type { Locale } from '@configs/i18n'

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('@/data/dictionaries/en.json').then(module => module.default),
  fr: () => import('@/data/dictionaries/fr.json').then(module => module.default),
  ar: () => import('@/data/dictionaries/ar.json').then(module => module.default)
}

dictionaries

export const getDictionary = async (locale: Locale) => {
  const dictionaryFn = dictionaries[locale] || dictionaries['en'] // Fallback to 'en'

  if (!dictionaryFn) {
    throw new Error(`No dictionary found for locale: ${locale}`)
  }

  return dictionaryFn()
}

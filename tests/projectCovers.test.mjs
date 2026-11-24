import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { projectCovers, toProjectSlug } from '../src/data/projectCovers.ts'
import { projectGroupByTitle } from '../src/data/projectGroups.ts'

const PUBLIC_DIR = path.resolve(import.meta.dirname, '..', 'public')

const EXPECTED_COVERED_TITLES = [
  'CertiHash',
  'Control Apps',
  'Entre Líneas',
  'Expenses Tracker',
  'Home Server',
  'Huellitas Felices',
  'KINETIQ PRO',
  'MatchAnalyzer',
  'Neon Designs - Carteles de Neón LED',
  'PDF Adjuntos',
  'Portfolio Tecnico - Jonathan Correa',
  'Showroom Isabella — Tienda de Ropa Online',
  'Tecnofusion',
  'Trading Bot',
  'Tutor-Mate',
]

test('todas las claves de projectCovers coinciden con toProjectSlug de un título conocido', () => {
  const knownSlugs = new Set(Object.keys(projectGroupByTitle).map(toProjectSlug))
  for (const slug of Object.keys(projectCovers)) {
    assert.ok(knownSlugs.has(slug), `Slug sin título conocido en projectGroupByTitle: ${slug}`)
  }
})

test('todos los títulos con portada esperada resuelven en projectCovers', () => {
  for (const title of EXPECTED_COVERED_TITLES) {
    const slug = toProjectSlug(title)
    assert.ok(projectCovers[slug], `Falta portada para "${title}" (slug: ${slug})`)
  }
})

test('cada portada WebP existe en public/ junto a su variante -600.webp y es liviana', () => {
  for (const [slug, coverPath] of Object.entries(projectCovers)) {
    assert.ok(coverPath.endsWith('.webp'), `La portada de ${slug} debe ser .webp: ${coverPath}`)
    const fullPath = path.join(PUBLIC_DIR, coverPath.replace(/^\//, ''))
    const smallPath = fullPath.replace(/\.webp$/, '-600.webp')
    assert.ok(fs.existsSync(fullPath), `Falta archivo de portada: ${fullPath}`)
    assert.ok(fs.existsSync(smallPath), `Falta variante 600w: ${smallPath}`)
    const fullSize = fs.statSync(fullPath).size
    const smallSize = fs.statSync(smallPath).size
    assert.ok(fullSize > 0 && fullSize < 120 * 1024, `Tamaño fuera de rango para ${coverPath}: ${fullSize}B`)
    assert.ok(smallSize > 0 && smallSize < 120 * 1024, `Tamaño fuera de rango para variante 600w de ${slug}: ${smallSize}B`)
  }
})

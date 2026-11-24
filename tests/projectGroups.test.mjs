import assert from 'node:assert/strict'
import test from 'node:test'
import { groupProjects, projectGroupByTitle, projectGroupDefinitions } from '../src/data/projectGroups.ts'

const project = (title, status) => ({ title, status, role: '', period: '', summary: '', highlights: [], stack: [] })

test('clasifica todos los títulos conocidos exactamente una vez, sin perder proyectos', () => {
  const projects = Object.keys(projectGroupByTitle).map((title) => project(title, 'Desarrollo'))
  const grouped = groupProjects(projects, 'es')
  assert.equal(grouped.flatMap((group) => group.projects).length, projects.length)
  assert.deepEqual(new Set(grouped.flatMap((group) => group.projects)), new Set(projects))
  for (const group of grouped) {
    assert.ok(group.projects.every((item) => projectGroupByTitle[item.title] === group.id))
  }
  assert.equal(grouped.length, projectGroupDefinitions.length)
})

test('producción primero, orden estable y sin modificar la entrada', () => {
  const projects = [project('Tutor-Mate', 'Desarrollo'), project('CertiHash', 'Producción'), project('PDF Adjuntos', 'Producción')]
  const original = [...projects]
  assert.deepEqual(groupProjects(projects, 'es')[0].projects.map((item) => item.title), ['CertiHash', 'PDF Adjuntos', 'Tutor-Mate'])
  assert.deepEqual(projects, original)
})

test('título con espacios, estado ausente y títulos nuevos conservan el proyecto', () => {
  const projects = [project('Forgotten Objects System ', undefined), project('Nuevo proyecto', undefined)]
  const groups = groupProjects(projects, 'en')
  assert.equal(groups[0].id, 'sistemas')
  assert.equal(groups[0].title, 'Systems & platforms')
  assert.equal(groups[1].id, 'herramientas')
  assert.equal(groups.flatMap((group) => group.projects).length, 2)
})

test('entrada vacía no genera secciones vacías', () => {
  assert.deepEqual(groupProjects([], 'es'), [])
})

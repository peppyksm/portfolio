import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Render application markup without launching or controlling a browser.
globalThis.window = { matchMedia: () => ({ matches: true }) }
globalThis.document = { hidden: true }
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: Hero } = await server.ssrLoadModule('/src/components/Hero.jsx')
  const { default: About } = await server.ssrLoadModule('/src/components/About.jsx')
  const { default: Skills } = await server.ssrLoadModule('/src/components/Skills.jsx')
  const { default: Projects } = await server.ssrLoadModule('/src/components/Projects.jsx')
  const { default: ProjectCard } = await server.ssrLoadModule('/src/components/ProjectCard.jsx')
  const { default: Details } = await server.ssrLoadModule('/src/components/ProvitDetails.jsx')
  const { projects } = await server.ssrLoadModule('/src/data/portfolio.js')
  const render = (component, props = {}) => renderToStaticMarkup(React.createElement(component, props))
  assert.match(render(Hero), /자바 백엔드 개발자입니다/)
  assert.match(render(About), /같은 맥락을 공유하는 협업/)
  const skills = render(Skills)
  for (const label of ['Java', 'Spring Framework', 'Tomcat', 'HTML', 'CSS', 'JavaScript', 'GitHub', 'Notion']) assert.ok(skills.includes(label), label)
  assert.doesNotMatch(skills, /Java 17|Tomcat 9|Spring MVC/)
  const main = render(Projects, { onOpenGallery() {}, onOpenDetails() {} })
  assert.equal((main.match(/class="reveal project-card"/g) || []).length, 1)
  assert.match(main, /role="tab" id="tab-provit" aria-controls="panel-provit" aria-selected="true" tabindex="0"/)
  assert.match(main, /role="tab" id="tab-frade" aria-controls="panel-frade" aria-selected="false" tabindex="-1"/)
  assert.match(main, /id="panel-frade" role="tabpanel" aria-labelledby="tab-frade" hidden=""/)
  assert.ok(main.includes('id="project-provit"'))
  assert.ok(!main.includes('id="project-frade"'))
  for (const project of projects) {
    const card = render(ProjectCard, { project, onOpenGallery() {}, onOpenDetails() {} })
    assert.ok(card.includes(`id="project-${project.id}"`))
    assert.ok(card.includes(`${project.round}차 프로젝트`))
    assert.ok(card.includes('구현 자세히 보기'))
  }
  const details = render(Details)
  assert.match(details, /주요 문제 및 해결 과정/)
  assert.equal((details.match(/class="issue"/g) || []).length, 2)
  for (const value of ['VARCHAR2(120 CHAR)', 'VARCHAR2(1000 CHAR)', 'VARCHAR2(250 CHAR)', '750바이트', '360바이트', '별도 Oracle 테스트 테이블', '마이그레이션 적용과 서버 재배포']) assert.ok(details.includes(value), value)
  console.log('PASS: introduction, skill labels/icons, single initial project, tab accessibility markup, both project cards, two troubleshooting narratives and Oracle definitions render successfully.')
} finally {
  await server.close()
}

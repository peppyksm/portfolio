import { useRef, useState } from 'react'
import { projects } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

export default function Projects({ onOpenGallery, onOpenDetails }) {
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const tabRefs = useRef([])

  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % projects.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + projects.length) % projects.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = projects.length - 1
    else return
    event.preventDefault()
    setSelectedId(projects[nextIndex].id)
    tabRefs.current[nextIndex]?.focus({ preventScroll: true })
  }

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow="01 / SELECTED WORK" title="Projects" subtitle="직접 맡아 구현한 기능과 설계 과정입니다." />
        <div className="project-tabs" role="tablist" aria-label="프로젝트 선택">
          {projects.map((project, index) => (
            <button
              key={project.id}
              ref={(element) => { tabRefs.current[index] = element }}
              type="button"
              role="tab"
              id={`tab-${project.id}`}
              aria-controls={`panel-${project.id}`}
              aria-selected={selectedId === project.id}
              tabIndex={selectedId === project.id ? 0 : -1}
              onClick={() => setSelectedId(project.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{project.round}차 프로젝트</span><strong>{project.id}</strong>
            </button>
          ))}
        </div>
        {projects.map((project) => (
          <div key={project.id} id={`panel-${project.id}`} role="tabpanel" aria-labelledby={`tab-${project.id}`} hidden={selectedId !== project.id} tabIndex={0}>
            {selectedId === project.id && <ProjectCard project={project} onOpenGallery={onOpenGallery} onOpenDetails={onOpenDetails} />}
          </div>
        ))}
      </div>
    </section>
  )
}

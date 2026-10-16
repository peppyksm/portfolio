import { Fragment } from 'react'
import ProjectPreview from './ProjectPreview'
import { projectGalleries } from '../data/portfolio'
import ProjectEvidence from './ProjectEvidence'
import Reveal from './Reveal'

export default function ProjectCard({ project, onOpenGallery, onOpenDetails }) {
  return (
    <Reveal as="article" className="project-card" id={`project-${project.id}`}>
      <div className="project-top">
        <div>
          <span className="project-index">{project.round}차 프로젝트 · PROJECT {String(project.round).padStart(2, '0')}</span>
          <h3>{project.id}<span>.</span></h3>
          <p>{project.period}</p>
        </div>
        <span className="role">{project.role}</span>
      </div>
      <p className="project-case"><strong>대표 사례</strong>{project.caseStudy}</p>
      <ProjectEvidence projectId={project.id} />
      <div className="project-layout">
        <ProjectPreview projectId={project.id} gallery={projectGalleries[project.id]} onOpenGallery={(imageIndex) => onOpenGallery(project.id, imageIndex)} />
        <div className="project-description">
          <div className="project-summary">
            <h4>{project.title.map((line, i) => <Fragment key={line}>{i > 0 && <br />}{line}</Fragment>)}</h4>
            <p>{project.description}</p>
          </div>
          <div className="project-implementation">
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="project-stack">{project.stack.map((line, i) => <Fragment key={line}>{i > 0 && <br />}{line}</Fragment>)}</div>
            <button className="button button-dark" type="button" onClick={() => onOpenDetails(project.id)}>구현 자세히 보기 <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </div>
      <div className="project-bottom"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div>
    </Reveal>
  )
}

import { projects } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

export default function Projects({ onOpenGallery, onOpenDetails }) {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow="04 / SELECTED WORK" title="Projects" subtitle="직접 맡아 구현한 기능과 설계 과정입니다." />
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpenGallery={onOpenGallery} onOpenDetails={onOpenDetails} />)}
      </div>
    </section>
  )
}

import { projectEvidence } from '../data/portfolio'

export default function ProjectEvidence({ projectId }) {
  return (
    <nav className="evidence-links" aria-label={`${projectId} 코드와 검증 근거`}>
      {projectEvidence[projectId].map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.title} ↗</a>
      ))}
    </nav>
  )
}

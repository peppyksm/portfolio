import { skills } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" eyebrow="02 / TOOLKIT" title="Skills" subtitle="프로젝트에서 사용한 기술과 구현 경험입니다." />
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <Reveal as="article" key={skill.title} delay={index * 65}>
              <span className="skill-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{skill.title}</h3>
              <div className="tags">{skill.tags.map((tag) => <span key={tag}><SkillIcon name={tag} />{tag}</span>)}</div>
              <p>{skill.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

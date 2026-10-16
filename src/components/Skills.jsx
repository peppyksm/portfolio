import { skills } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" eyebrow="03 / TOOLKIT" title="Skills" subtitle="백엔드를 중심으로 화면 구현과 협업까지 연결하는 기술입니다." />
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

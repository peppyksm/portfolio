import Reveal from './Reveal'

export default function SectionHeading({ id, eyebrow, title, subtitle }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}<span>.</span></h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  )
}

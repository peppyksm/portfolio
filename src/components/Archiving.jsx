import { portfolioPdf } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Archiving() {
  return (
    <section className="section archiving" id="archiving" aria-labelledby="archiving-title">
      <div className="container">
        <SectionHeading id="archiving-title" eyebrow="03 / RECORDS" title="Archiving" subtitle="코드와 프로젝트 경험을 확인할 수 있는 곳입니다." />
        <Reveal className="archive-links"><a href="https://github.com/peppyksm" target="_blank" rel="noopener noreferrer"><span className="archive-mark" aria-hidden="true">&lt;/&gt;</span><div><h3>GitHub</h3><p>github.com/peppyksm</p><small>소스 코드와 개발 기록</small></div><span className="archive-arrow" aria-hidden="true">↗</span></a><a href={portfolioPdf} download="김승민_포트폴리오.pdf"><span className="archive-mark" aria-hidden="true">PDF</span><div><h3>Portfolio</h3><p>프로젝트 포트폴리오</p><small>담당 기능과 설계 경험을 담은 PDF</small></div><span className="archive-arrow" aria-hidden="true">↓</span></a></Reveal>
      </div>
    </section>
  )
}

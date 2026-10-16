import { portfolioPdf } from '../data/portfolio'
import HeroGreeting from './HeroGreeting'

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-inner">
        <p className="eyebrow"><span className="dot"></span> JAVA BACKEND DEVELOPER</p>
        <HeroGreeting />
        <div className="hero-rule"></div>
        <p className="hero-description">화면부터 서버, 데이터까지 연결하는<br /><strong>자바 백엔드 개발자입니다.</strong></p>
        <p className="hero-supporting">사용자의 흐름을 이해하고, 예외 상황까지 살핍니다.</p>
        <div className="hero-actions"><a className="button button-dark" href="#projects">프로젝트 보기 <span aria-hidden="true">↗</span></a><a className="text-link" href={portfolioPdf} download="김승민_포트폴리오.pdf">PDF 다운로드 <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="hero-bottom"><span>SELECTED WORK · 2026</span><a href="#projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
    </section>
  )
}

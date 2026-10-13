import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="01 / INTRODUCTION" title="About me" />
        <Reveal className="about-layout">
          <div className="about-intro"><h3>화면 너머의 흐름까지<br />생각합니다.</h3><p>거래 데이터를 자산 정보로 변환하고, 취업 서류를 AI 첨삭과 면접으로 연결하는 기능을 개발했습니다.</p><p>입력 검증과 저장 경계, 중복 요청과 실패 이후의 상태까지 확인하며 서비스를 구성합니다.</p></div>
          <dl className="profile"><div><dt>이름</dt><dd>김승민 <small>Kim Seungmin</small></dd></div><div><dt>지원 직무</dt><dd>자바 백엔드 개발자</dd></div><div><dt>이메일</dt><dd><a href="mailto:peppyksm@gmail.com">peppyksm@gmail.com <span aria-hidden="true">↗</span></a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/peppyksm" target="_blank" rel="noopener noreferrer">github.com/peppyksm <span aria-hidden="true">↗</span></a></dd></div></dl>
        </Reveal>
        <Reveal className="experience"><div><span className="eyebrow">TEAM EXPERIENCE</span><h3>provit · 팀장</h3><p>2026.09.14 — 2026.10.08 · 4인 팀 프로젝트</p></div><p>프로젝트 총괄과 일정 관리를 맡았습니다.<br />취업문서 작성부터 AI 첨삭, AI 모의면접까지<br />담당 기능의 화면·API·DB 흐름을 연결했습니다.</p></Reveal>
      </div>
    </section>
  )
}

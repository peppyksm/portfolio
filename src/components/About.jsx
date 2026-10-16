import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="02 / INTRODUCTION" title="About me" />
        <Reveal className="about-layout">
          <div className="about-intro"><h3>잘 동작하는 순간부터<br />실패한 다음까지 생각합니다.</h3><p>사용자가 어떤 흐름으로 서비스를 이용하는지 먼저 이해하려고 합니다. 화면의 입력이 서버와 데이터에 어떻게 이어지는지 살피고, 각 단계의 책임과 기준을 분명히 하는 것을 중요하게 생각합니다.</p><p>오류를 만나면 현재 상태와 원인을 확인하고, 같은 문제가 반복되지 않을 방법을 고민합니다. 정상 동작뿐 아니라 중복 요청, 저장 실패, 다시 시도하는 순간까지 개발의 일부로 봅니다.</p></div>
          <dl className="profile"><div><dt>이름</dt><dd>김승민 <small>Kim Seungmin</small></dd></div><div><dt>지원 직무</dt><dd>자바 백엔드 개발자</dd></div><div><dt>이메일</dt><dd><a href="mailto:peppyksm@gmail.com">peppyksm@gmail.com <span aria-hidden="true">↗</span></a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/peppyksm" target="_blank" rel="noopener noreferrer">github.com/peppyksm <span aria-hidden="true">↗</span></a></dd></div></dl>
        </Reveal>
        <Reveal className="experience"><div><span className="eyebrow">WORKING TOGETHER</span><h3>같은 맥락을 공유하는 협업</h3><p>provit 팀장 · 프로젝트 총괄 및 일정 관리 경험</p></div><p>팀이 함께 판단할 수 있도록 진행 상황과 문제를 공유하는 일을 중요하게 생각합니다. 변경 이유와 확인할 내용을 기록하고, 서로의 작업이 연결되는 지점을 미리 맞추려 합니다.</p></Reveal>
      </div>
    </section>
  )
}

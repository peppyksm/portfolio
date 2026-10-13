// public 파일 경로는 Vite의 base 설정을 따릅니다.
export const assetUrl = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`
export const portfolioPdf = assetUrl('kim-seungmin-portfolio.pdf')
export const email = 'peppyksm@gmail.com'

export const navigation = [
  { id: 'about', label: 'About me' },
  { id: 'skills', label: 'Skills' },
  { id: 'archiving', label: 'Archiving' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const skills = [
  { title: 'Backend', tags: ['Java 17', 'Spring MVC', 'Tomcat 9'], description: 'REST API와 서비스 로직을 구현하고, 입력 검증과 트랜잭션 경계를 관리합니다.' },
  { title: 'Database', tags: ['Oracle', 'MyBatis', 'SQL'], description: 'JOIN 조회와 복합 데이터 저장, 원문 보관과 문자열 길이 계약을 다뤘습니다.' },
  { title: 'AI Integration', tags: ['OpenAI API', 'JSON Schema'], description: '서류 기반 생성 흐름, 응답 검증, 재전송과 저장 실패 처리를 구성했습니다.' },
  { title: 'Frontend & Tools', tags: ['React', 'JSP', 'Git', 'Maven'], description: '입력 화면과 API, 결과 조회를 연결하고 팀 프로젝트에서 협업했습니다.' },
]

export const gallery = [
  { src: assetUrl('document-write.png'), title: '취업문서 작성', note: '제공된 최종 화면설계 자료의 취업문서 작성 화면입니다.' },
  { src: assetUrl('document-review.png'), title: 'AI 통합 첨삭 결과 예시', note: '화면 구성용 결과 예시입니다. 실제 선택 서류의 분석 결과나 성과 지표가 아닙니다.' },
  { src: assetUrl('interview.png'), title: 'AI 모의면접 설정', note: '이력서·자기소개서·선택 포트폴리오와 난이도를 설정하는 화면입니다.' },
  { src: assetUrl('interview-result.png'), title: '면접 상세 기록', note: '제공된 테스트 면접 화면입니다. 표시된 점수는 지원자의 기술 숙련도를 의미하지 않습니다.' },
  { src: assetUrl('review-erd.png'), title: 'AI 첨삭 결과 ERD', note: '요청·원문 보관본·강점·수정 제안·일관성·근거를 연결한 데이터 구조입니다.' },
]

export const projects = [
  {
    id: 'provit', period: '2026.09.14 — 2026.10.08 · 4인 팀 프로젝트', role: '팀장 / 담당 기능 전체 개발',
    title: ['서류부터 면접까지 연결하는', 'AI 취업 준비 플랫폼'],
    description: '취업문서를 작성하고 AI 첨삭으로 보완한 뒤, 자신의 서류를 바탕으로 면접을 연습하는 서비스입니다.',
    features: ['이력서·자기소개서·포트폴리오 관리', '서류 묶음 기반 AI 통합 첨삭', '5문항 모의면접과 최종 평가·기록 저장', '중복 요청 방지와 저장 실패 시 평가 재사용'],
    stack: ['Java 17 · Spring MVC · React 19', 'Oracle 19c · MyBatis · OpenAI API'],
    contribution: '취업문서 작성부터 AI 첨삭, AI 모의면접 전체',
  },
  {
    id: 'frade', period: '모의 주식거래 + 커뮤니티 · 팀 프로젝트', role: '거래기록 / 자산 포트폴리오',
    title: ['거래 경험을 자산 정보로', '확인할 수 있도록'],
    description: '거래내역과 보유종목, 예치금을 모아 현재 투자 상태를 보여주는 기능을 개발했습니다.',
    features: ['거래기록 저장과 전체·기간별 조회 SQL', '마이페이지 최근 거래기록 25건 조회', '종목별 평가금액·손익·수익률·비중 계산', '기존 시세 스트림과 자산 차트 연결'],
    stack: ['Java 17 · Spring MVC · JSP', 'MyBatis · Oracle · Chart.js'],
    contribution: '거래기록 전체와 최근 거래기록, 자산 포트폴리오',
  },
]

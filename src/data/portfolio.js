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

export const fradeGallery = [
  { src: assetUrl('frade-mypage.png'), title: '마이페이지 · 자산 포트폴리오', note: '제공된 최종 화면 자료입니다. 자산 요약·종목별 비중·최근 거래·보유종목을 함께 보여줍니다. 금액과 수익률은 테스트 데이터이며 실제 투자 성과가 아닙니다.' },
  { src: assetUrl('frade-trading.png'), title: '트레이딩 · 종목 상세', note: '서비스 흐름을 소개하는 최종 화면 자료입니다. 시세·차트·주문 입력을 보여주며, 본인 담당 범위는 거래기록과 자산 포트폴리오입니다.' },
  { src: assetUrl('frade-community.png'), title: '커뮤니티 · 투자 의견 공유', note: '팀에서 구현한 커뮤니티의 최종 화면 자료입니다. 게시판은 다른 팀원의 담당 기능이며 서비스 전체 맥락을 소개하기 위해 포함했습니다.' },
  { src: assetUrl('frade-portfolio-table.png'), title: 'DB 설계 · 보유종목 테이블', note: '최종 발표 자료 23쪽의 T_PORTFOLIO 테이블 명세입니다. 사용자·종목별 보유수량과 매입원가를 보관합니다. 실제 계산·조회 설명은 현재 소스를 기준으로 작성했습니다.' },
  { src: assetUrl('frade-history-table.png'), title: 'DB 설계 · 거래기록 테이블', note: '최종 발표 자료 24쪽의 T_HISTORY 테이블 명세입니다. 사용자·종목·체결가격·수량·일시를 기록하는 구조로, 작성자는 김승민입니다.' },
]

export const projectGalleries = { provit: gallery, frade: fradeGallery }

export const fradeDocuments = [
  { title: '최종 발표 자료', description: '서비스 개요 · 팀 역할 · DB 설계 · 회고', href: assetUrl('frade-presentation.pdf') },
  { title: '개발 일정 · WBS', description: '기획부터 구현·통합·최종 발표까지', href: assetUrl('frade-wbs.pdf') },
  { title: '테스트 시나리오', description: '주문·자산·거래기록의 확인 항목', href: assetUrl('frade-test-scenarios.pdf') },
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
    id: 'frade', period: '2026.08.20 — 2026.09.08 · 5인 팀 프로젝트', role: '거래기록 · 자산 포트폴리오 / 결과 발표',
    title: ['모의 투자와 의견 공유를 잇는', '주식 트레이딩 플랫폼'],
    description: '실제 시세를 바탕으로 모의 투자를 경험하고 커뮤니티에서 투자 의견을 나누는 서비스입니다. 거래내역·보유종목·예치금을 연결해 자신의 투자 상태를 확인하는 마이페이지를 개발했습니다.',
    features: ['사용자별 거래기록 저장·전체·기간별 조회 SQL', '종목명 JOIN과 최근 거래 25건 조회', '예치금을 포함한 자산 구성·손익·수익률 계산', 'SSE 시세 갱신과 Chart.js 도넛 차트 연동'],
    stack: ['Java 17 · Spring MVC · JSP', 'MyBatis · Oracle · Chart.js'],
    contribution: '거래기록 · 마이페이지 자산 포트폴리오 · ERD 설계 참여 및 테이블 명세 작성 · 결과 발표',
  },
]

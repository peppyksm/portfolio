// public 파일 경로는 Vite의 base 설정을 따릅니다.
export const assetUrl = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`
export const portfolioPdf = assetUrl('kim-seungmin-portfolio.pdf')
export const email = 'peppyksm@gmail.com'

export const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About me' },
  { id: 'skills', label: 'Skills' },
  { id: 'archiving', label: 'Archiving' },
  { id: 'contact', label: 'Contact' },
]

export const skills = [
  { title: 'Backend', tags: ['Java', 'Spring Framework', 'Tomcat'], description: 'REST API와 서비스 로직을 구현하고, 입력 검증과 트랜잭션 경계를 관리합니다.' },
  { title: 'Frontend', tags: ['HTML', 'CSS', 'JavaScript', 'React', 'JSP'], description: '사용자 입력부터 API 연동과 결과 표시까지, 화면과 서버를 연결하는 흐름을 구현합니다.' },
  { title: 'Database', tags: ['Oracle', 'MyBatis', 'SQL'], description: 'JOIN 조회와 복합 데이터 저장, 원문 보관과 문자열 길이 계약을 다뤘습니다.' },
  { title: 'AI Integration', tags: ['OpenAI API', 'JSON Schema'], description: '서류 기반 생성 흐름, 응답 검증, 재전송과 저장 실패 처리를 구성했습니다.' },
  { title: 'Collaboration', tags: ['Git', 'GitHub', 'Notion'], description: '코드 변경과 작업 상황을 공유하고, 요구사항과 결정 내용을 기록하며 팀과 협업합니다.' },
  { title: 'Build Tools', tags: ['Maven'], description: '의존성과 빌드 설정을 관리하고, 프로젝트를 실행·검증할 수 있는 환경을 구성합니다.' },
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
  { src: assetUrl('frade-portfolio-table.png'), title: '당시 DB 명세 · 보유종목 (정정 있음)', note: '팀 발표 원본 23쪽입니다. 정정: PK는 (USER_NUM, STOCK_CODE), USER_BUY_COST는 총매입원가입니다. 표의 U_NUM·체결가 설명은 현행 로컬 DDL/mapper와 다릅니다. 보존 10년·백업 1년은 운영 검증값이 아닙니다.' },
  { src: assetUrl('frade-history-table.png'), title: '당시 DB 명세 · 거래기록 (정정 있음)', note: '김승민 작성 팀 발표 원본 24쪽입니다. 정정: PK TRADE_NUM, 인덱스 (USER_NUM, TRADE_DATE), 번호는 seq_t_history.NEXTVAL 기본값입니다. TR_NUM/U_NUM/TR_DATE·AUTO-INCREMENT 표기는 현행 로컬 DDL과 다릅니다. 운영 DB와 동일성은 미확인입니다.' },
]

export const projectGalleries = { provit: gallery, frade: fradeGallery }

export const fradeDocuments = [
  { title: '채용용 정정표 · 먼저 읽기', description: '당시 자료와 현재 구현의 차이 · 코드 근거', href: assetUrl('frade-corrections.html'), format: 'HTML' },
  { title: '팀 발표 원본 · 2026.09.08 · 37쪽', description: '역할 5쪽 / 담당 DB 23~24쪽 / 공통 회고 28쪽. 26쪽 제목 오류, 27쪽 내부망 시연(외부 접속 불가), 34쪽 미작성 칸은 당시 원본입니다.', href: assetUrl('frade-presentation.pdf'), format: 'PDF' },
  { title: '개발 일정 · WBS 원본', description: '2026.08.20~09.08 · 5인. 계획 담당과 실제 기여는 별도이며 주문 전체를 개인 성과로 주장하지 않습니다.', href: assetUrl('frade-wbs.pdf'), format: 'PDF' },
  { title: '테스트 시나리오 원본 · 통과 기록 아님', description: '25항: 비밀번호 해시 / 50항: Chart.js / 49·52항: 최근 25건 범위로 정정. 실행 결과 문서가 아닙니다.', href: assetUrl('frade-test-scenarios.pdf'), format: 'PDF' },
]

export const projectEvidence = {
  provit: [
    { title: '공개 소스', href: 'https://github.com/peppyksm/provit' },
    { title: '첨삭 기여 PR #53', href: 'https://github.com/wnsgk0509/provit/pull/53' },
    { title: '검증 기록과 한계', href: assetUrl('verification/index.html#provit') },
  ],
  frade: [
    { title: '공개 소스', href: 'https://github.com/chlqjarb0216-bit/frade' },
    { title: '거래 조회 SQL', href: 'https://github.com/chlqjarb0216-bit/frade/blob/a1c49b94ac635e76c5ace60801383c57e584f64e/src/main/webapp/WEB-INF/mybatis/mapper/history/history_mapper.xml' },
    { title: '검증 기록과 한계', href: assetUrl('verification/index.html#frade') },
  ],
}

export const projects = [
  {
    id: 'provit', round: 3, period: '2026.09.14 — 2026.10.08 · 4인 팀 프로젝트', role: '팀장 · 취업문서 / AI 첨삭 / 모의면접 담당',
    title: ['서류부터 면접까지 연결하는', 'AI 취업 준비 플랫폼'],
    description: '취업문서를 작성하고 AI 첨삭으로 보완한 뒤, 자신의 서류를 바탕으로 면접을 연습하는 서비스입니다.',
    features: ['이력서·자기소개서·포트폴리오 관리', '서류 묶음 기반 AI 통합 첨삭', '5문항 모의면접과 최종 평가·기록 저장', '중복 요청 방지와 저장 실패 시 평가 재사용'],
    stack: ['Java 17 · Spring MVC · React 19', 'Oracle 19c · MyBatis · OpenAI API'],
    contribution: '이력서·자소서 CRUD / PDF 등록·조회·삭제 / 통합 첨삭 / 모의면접 진행·평가·저장',
    caseStudy: '평가 생성 후 DB 저장 실패 → 기존 평가를 보관해 저장만 재시도 · 기존 대체 의존성 테스트 기록으로 확인',
  },
  {
    id: 'frade', round: 2, period: '2026.08.20 — 2026.09.08 · 5인 팀 프로젝트', role: '거래기록 · 자산 포트폴리오 / 결과 발표',
    title: ['모의 투자와 의견 공유를 잇는', '주식 트레이딩 플랫폼'],
    description: '실제 시세를 바탕으로 모의 투자를 경험하고 커뮤니티에서 투자 의견을 나누는 서비스입니다. 거래내역·보유종목·예치금을 연결해 자신의 투자 상태를 확인하는 마이페이지를 개발했습니다.',
    features: ['사용자별 거래기록 저장·전체·기간별 조회 SQL', '종목명 JOIN과 최근 거래 25건 조회', '예치금을 포함한 자산 구성·손익·수익률 계산', 'SSE 시세 갱신과 Chart.js 도넛 차트 연동'],
    stack: ['Java 17 · Spring MVC · JSP', 'MyBatis · Oracle · Chart.js'],
    contribution: '거래기록 · 마이페이지 자산 포트폴리오 · ERD 설계 참여 및 테이블 명세 작성 · 결과 발표',
    caseStudy: '최근 거래 조회 → 정렬 후 ROWNUM으로 25건 제한 · 사용자별 SQL 구현과 전체 이력의 경계 명시',
  },
]

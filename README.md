# 김승민 포트폴리오

이전 세션의 흑백 웹 포트폴리오를 React 19 + Vite 프로젝트로 옮긴 로컬 소스입니다.
기존 React/Vite 환경을 사용하며 기술 아이콘용 `react-icons`와 이미지 슬라이더용
`swiper`를 추가했습니다.

## 실행

```sh
npm run dev
npm run build
npm run preview
```

## 소스 구성

- `src/App.jsx`: 페이지 조립과 상세/갤러리 표시 상태
- `src/components/`: 소개, 기술, 기록, 프로젝트, 연락처 및 공통 UI
- `src/components/Reveal.jsx`: 첫 진입 시 한 번만 실행하는 스크롤 등장 효과
- `src/components/SkillIcon.jsx`: 기술 스택별 아이콘 매핑
- `src/data/portfolio.js`: 기술, 프로젝트, 갤러리 데이터와 PDF 경로
- `src/hooks/useSectionNavigation.js`: 스크롤 위치에 따른 메뉴 및 맨 위로 버튼 상태
- `src/index.css`: 전역 스타일
- `src/App.css`: 원본 디자인과 반응형 스타일
- `public/assets/`: 프로젝트 화면 5장과 포트폴리오 PDF

프로젝트 내용은 `src/data/portfolio.js`, 구현 상세는 `ProvitDetails.jsx`와
`FradeDetails.jsx`에서 수정합니다. PDF를 교체하려면
`public/assets/kim-seungmin-portfolio.pdf`를 같은 이름으로 교체합니다.

모바일 메뉴, 프로젝트 썸네일과 갤러리, 상세 대화상자, 이메일 복사,
PDF 다운로드를 제공합니다. 대화상자는 Escape로 닫을 수 있고,
갤러리는 좌우 화살표 키로 이동합니다. 이미지와 PDF 경로는 Vite의
`base` 설정을 따릅니다.

첫 화면과 섹션에는 짧은 등장 효과를, 버튼과 카드에는 작은 hover 효과를
적용했습니다. 반복 애니메이션은 사용하지 않으며 OS의 모션 줄이기 설정과
인쇄 시에는 움직임과 콘텐츠 숨김을 해제합니다.

프로젝트 스크린샷은 원본 색상을 유지하고, 코드 패널에는 차분한 파랑·초록·
브론즈 색상을 사용합니다. 연락처는 작은 제목과 이메일을 중심으로 한
반응형 2열 구성입니다.

프로젝트 카드는 큰 이미지/코드 패널 아래에 설명을 배치합니다. provit 화면은
양옆 화살표, 마우스 드래그, 터치 스와이프, 좌우 키, 썸네일로 전환할 수
있으며 이미지를 클릭하면 선택한 화면이 확대 갤러리로 열립니다.
이미지 영역은 세 개의 창 버튼, 상단 바와 둥근 테두리로 맥 브라우저 창처럼
표현하며, 상단 제목도 선택한 이미지에 맞춰 바뀝니다.

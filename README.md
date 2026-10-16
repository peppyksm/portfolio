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
- `public/assets/`: Provit 자료 5장, Frade 화면·DB 자료 5장, 프로젝트 PDF

프로젝트 내용은 `src/data/portfolio.js`, 구현 상세는 `ProvitDetails.jsx`와
`FradeDetails.jsx`에서 수정합니다. 문구와 PDF의 공통 사실은
`docs/portfolio-content-contract.md`에서 대조합니다.

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

프로젝트 카드는 큰 이미지 아래에 설명을 배치합니다. provit·frade 화면은
양옆 화살표, 마우스 드래그, 터치 스와이프, 좌우 키, 썸네일로 전환할 수
있으며 이미지를 클릭하면 선택한 화면이 확대 갤러리로 열립니다.
이미지 영역은 세 개의 창 버튼, 상단 바와 둥근 테두리로 맥 브라우저 창처럼
표현하며, 상단 제목도 선택한 이미지에 맞춰 바뀝니다.

Frade의 계산 코드 패널은 상세 대화상자에 있습니다. Frade 상세에는 서비스 흐름,
담당 범위, 거래 조회, 자산 계산, SSE 갱신, 협업 회고와 원본 PDF 링크를 제공합니다.
자료 출처와 실제 소스 대조 기준은 `docs/frade-content-sources.md`에 기록했습니다.

프로젝트는 `3차 프로젝트 · provit`과 `2차 프로젝트 · frade` 탭에서 선택하며,
선택한 카드만 표시합니다. 탭은 좌우 화살표·Home·End 키로도 전환할 수 있습니다.
첫 화면은 인사와 개발자 소개의 크기를 조정하고, About me는 개발 기준과 협업 태도를
중심으로 구성했습니다. 스킬은 버전 없이 표기하며 Frontend와 Collaboration을 구분합니다.

Provit 상세의 두 문제는 ‘주요 문제 및 해결 과정’으로 묶었습니다.
Oracle 길이 단위와 마이그레이션 상태의 근거는 `docs/provit-content-sources.md`를 참고합니다.
시연 영상과 임시 배포 주소는 추후 작업 범위로 남겨두었습니다.

## 2026-10-16 제출 문구 정정

첫 화면 다음에 Projects를 배치하고 카드에 대표 사례·코드/PR/검증 링크를
추가했습니다. 각 이미지 아래에는 현재 이미지의 출처·예시·정정 내용을 표시합니다.
Frade 팀 PDF/이미지 원본은 보존하며, 자료 링크 옆 안내와
`public/assets/frade-corrections.html`에 현행 구현과의 차이를 명시합니다.
`public/assets/verification/index.html`은 기존 로그의 범위·대체 의존성·미확인 버전과
실행일, Oracle skip을 구분합니다. 이번 Java/실 DB/실 AI 테스트 결과가 아닙니다.

## 개인 PDF 재생성

웹과 동일한 흑백 색상, Georgia 제목, 맑은 고딕 본문, 여백·구분선·태그·프로젝트 카드로
15쪽 PDF를 생성합니다. 소개 → 프로젝트 → About me → Skills → Contact 순서이며,
메뉴·프로젝트 카드는 PDF 내부 이동 링크, 소스·PR·이메일은 외부 링크로 작동합니다.
프로젝트 화면은 원래 색상을 유지하고 브라우저 프레임 안에 배치합니다.

```sh
python scripts/build_web_portfolio_pdf.py
```

완성본은 `output/pdf/kim-seungmin-portfolio.pdf`에 저장하고 웹 다운로드 파일
`public/assets/kim-seungmin-portfolio.pdf`에도 같은 내용을 반영합니다.
`--output`으로 결과 경로를 지정하고, `--no-sync-web`으로 웹 자산 교체를 생략할 수 있습니다.
이전 명령 `python scripts/update_portfolio_pdf.py`도 새 생성기로 연결됩니다.

필요 패키지는 `reportlab`, `pypdf`, `Pillow`입니다. Windows 글꼴 폴더의
`malgun.ttf`, `malgunbd.ttf`, `georgia.ttf`를 사용하며 `--font-dir`로 변경할 수 있습니다.
기존 개인 PDF 기준 원본과 Frade 팀 산출물은 수정하지 않습니다.

생성 후 15쪽 전체를 렌더해 겹침·잘림·글꼴을 확인하고 텍스트·내부 이동·URI 링크를
검사합니다. 웹 배포용 파일은 `npm run build`로 갱신합니다.
디자인 기준과 페이지 구성은 `docs/pdf-web-design.md`, 사실 대조 기준은
`docs/portfolio-content-contract.md`를 참고합니다. 과거 제출 정정 기록은
`docs/sol-high-changes.md`에 보존합니다.

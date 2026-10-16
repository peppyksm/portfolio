# 웹 포트폴리오와 PDF 디자인 통일

작업일: 2026-10-16. 기존 파란색 중심의 발표자료 디자인을 웹의 흑백 디자인에 맞췄다.
웹 화면 자체와 프로젝트 서비스 소스는 변경하지 않는다.

## 디자인 기준

- 웹의 `--ink: #171717`, `--muted: #707070`, `--line: #dededb`,
  `--soft: #f5f5f3`과 Projects 배경 `#1c1c1c`를 사용한다.
- 영문 제목은 웹과 동일한 Georgia, 본문은 웹의 Windows 대체 글꼴인 맑은 고딕이다.
- 인사와 개발자 소개의 비중, 넓은 여백, 얇은 구분선, 테두리 태그, 흰 프로젝트 카드를 맞춘다.
- 서비스 스크린샷은 원래 색상과 비율을 유지하고 웹과 같은 브라우저 프레임에 넣는다.
- 960×540 가로 페이지를 유지하되, About me와 Skills를 각각 분리해 15쪽으로 구성한다.
- 페이지 상단 메뉴와 프로젝트 카드는 내부 이동 링크다. 코드·PR·연락처 링크도 유지한다.

## 페이지 구성

| 쪽 | 내용 |
| --- | --- |
| 1 | 웹 첫 화면의 인사·개발자 소개 |
| 2 | 프로젝트 선택 카드 |
| 3 | Provit 개요·역할·환경·화면 |
| 4 | 취업문서와 파일 관리 |
| 5 | AI 첨삭 결과와 응답 검증 |
| 6 | 요청 재사용·트랜잭션·원문 보관 |
| 7 | 5문항 면접·정상 생성 호출 4회 |
| 8 | 평가 계약·상태 관리·저장 재시도 |
| 9 | Oracle 문자·바이트 길이 문제 |
| 10 | Frade 개요·담당 범위·환경·화면 |
| 11 | 거래기록·최근 25건 조회 SQL |
| 12 | 자산 계산·SSE 갱신·협업 |
| 13 | About me: 개발 기준·프로필·협업 태도 |
| 14 | Skills: 버전 없는 기술과 협업 도구 |
| 15 | Contact·기존 향후 개선 방향 |

## 재생성과 확인

`scripts/build_web_portfolio_pdf.py`는 기존 PDF 위에 덧씌우지 않고 텍스트와 화면 자산으로
PDF를 새로 생성한다. `scripts/update_portfolio_pdf.py`는 같은 생성기로 연결되는 이전 명령 호환용 진입점이다.

- 전달본: `output/pdf/kim-seungmin-portfolio.pdf`
- 웹 다운로드: `public/assets/kim-seungmin-portfolio.pdf` (동일 바이트)
- 페이지·링크 목록: `output/pdf/kim-seungmin-portfolio.json`
- 검수 중 임시 페이지 렌더: `tmp/pdfs/web-redesign/` (완료 후 정리)
- 최종 검수 결과: `output/pdf/kim-seungmin-portfolio.json`의 `verification`

전체 페이지를 PNG로 렌더하고, 한글·줄바꿈·열 경계·정렬을 확인한다.
문자 좌표가 페이지 밖으로 나가지 않는지와 내부 링크 대상, 코드·PR·이메일 URI를 검사한다.
서비스·Oracle·AI를 다시 테스트한 작업은 아니며, 기존 검증의 적용 범위는 PDF 본문에 유지한다.
원본 `docs/pdf/kim-seungmin-portfolio-2026-10-15.pdf`와 Frade 팀 산출물은 보존한다.

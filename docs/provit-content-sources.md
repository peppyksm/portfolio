# Provit 문제 해결 설명의 근거

2026-10-16 정정: 첨삭의 문서 ID/조건 해시와 requestId 재사용 범위, 원문 JSON/PDF
보관과 인용/결과 조회의 차이, PROCESSING 자동 복구 미구현을 웹과 PDF 9쪽에 반영했다.
영구 오류 분류는 무결성 위반·ORA-12899로 한정한다. 면접 길이 개선의 기존 DB 미반영
상태를 본문에서 강조하고, 일반 이력서 mainDuty의 운영 DDL 미확인 조건부 반례도 남겼다.
기존 테스트/Oracle skip의 범위는 `public/assets/verification/index.html`을 참고한다.

2026-10-15 포트폴리오 피드백을 반영하며 `D:/workspace/ksm/provit`의 기존 기록과
스키마를 확인했다. 이번 변경은 포트폴리오의 설명을 정리하는 작업이며,
Provit 서비스 소스나 실제 Oracle DB를 수정하지 않았다.

## 저장 실패와 상태 관리

- `docs/interview-progress-and-portfolio-lifecycle.md`의 1.3~1.6:
  서버 세션과 브라우저 초안 복원, 타이머 유지, 세션별 동기화,
  일시 저장 실패 시 평가 재사용, 영구 오류 시 반복 제출 방어,
  완료 기록의 트랜잭션 저장 및 메모리 세션의 제약.
- `docs/interview-text-length-review.md`의 저장 실패·테스트 결과:
  일시 실패 후 저장 재시도와 영구 오류 후 반복 실행 방어의 검증 기록.

기능을 나열하던 설명을 문제 → 상태 확인 → 검토 → 개선 → 검증 순으로 재구성했다.
이번 포트폴리오 수정 과정에서 서비스 테스트를 새로 실행했다는 의미는 아니다.

## Oracle 한글 저장 길이

- `docs/interview-text-length-review.md`: AL32UTF8, 기존 평가 컬럼 500 BYTE,
  완성형 한글 250자 750 BYTE로 인한 ORA-12899 재현 기록.
- `backend/src/main/resources/sql_query/schema.sql`: 질문 `VARCHAR2(120 CHAR)`,
  답변 `VARCHAR2(1000 CHAR)`, 평가 문구 `VARCHAR2(250 CHAR)` 정의.
- 같은 문서: AI와 Java 제한의 통일, 기존 데이터 사전 검사,
  별도 Oracle 테스트 테이블에서의 변경 정의 검증.
- 같은 문서에서 실제 프로젝트 테이블에는 마이그레이션을 아직 적용하지 않았음을 확인했다.
  따라서 포트폴리오에서도 기존 DB의 마이그레이션과 서버 재배포가 필요함을 명시한다.

`VARCHAR2(n CHAR)`의 CHAR는 문자 단위 길이 한정자다.
고정 길이 자료형 `CHAR(n)`이나 `n BYTE`와 구분하도록 전체 자료형을 표시했다.
UTF-16 기반 애플리케이션 길이 계산에서 일부 이모지가 2로 계산되는 제약도 유지했다.

문자/바이트 길이 의미는 [Oracle 데이터 타입 문서](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/Data-Types.html)와 대조했다.

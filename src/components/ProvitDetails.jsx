import ProjectEvidence from './ProjectEvidence'

export default function ProvitDetails() {
  return (
    <div className="detail-content"><h2 id="detail-title">provit.</h2><p className="detail-meta">2026.09.14 — 2026.10.08 · 4인 팀 · 팀장</p><p className="detail-lead">취업문서 작성부터 AI 첨삭, AI 모의면접까지 이어지는 취업 준비 플랫폼</p>
  <ProjectEvidence projectId="provit" />
  <section><h3>담당 범위</h3><p>이력서·자기소개서 CRUD, PDF 등록·조회·삭제, AI 통합 첨삭과 기록 조회, AI 모의면접의 시작·진행·평가·결과 저장을 담당했습니다. 프로젝트 총괄 및 일정 관리도 맡았습니다. 첨삭 기여는 공개 PR #53에서 확인할 수 있으며, 서비스 전체의 단독 개발을 뜻하지 않습니다.</p></section>
  <section><h3>취업문서와 파일 관리</h3><ul><li>이력서 본문과 학력·경력·자격증 목록을 한 트랜잭션으로 저장합니다.</li><li>필수값·날짜·직무 코드를 검증하고 인증된 사용자의 문서 소유권을 확인합니다.</li><li>포트폴리오 PDF의 용량·확장자·시그니처를 검증한 뒤 UUID 파일명으로 공개 경로 밖에 저장합니다.</li><li>DB 롤백 시 새 파일을 정리하고, 삭제는 DB 커밋 후 실제 파일에 반영합니다. 파일 삭제 실패는 로그로 남기며 별도 재처리는 없습니다.</li></ul></section>
  <section><h3>AI 첨삭의 실행·저장 분리</h3><p>짧은 트랜잭션에서 PROCESSING 요청과 원문 보관본을 저장하고, AI 호출 뒤 별도 트랜잭션에서 결과를 저장합니다. 외부 호출을 기다리는 동안 DB 트랜잭션을 유지하지 않는 구조입니다.</p><h4>중복 요청 처리</h4><p>동일 사용자·동일 requestId에서 선택 문서 ID와 첨삭 조건의 SHA-256 해시를 비교합니다. 조건이 같으면 기존 상태 또는 결과를 반환하고, 조건이 바뀌면 HTTP 409로 거절합니다. 문서 내용 캐시가 아니며, 같은 문서라도 새 requestId는 새 요청입니다.</p><h4>원문 보관과 기록 조회</h4><p>첨삭 시점의 서류 JSON과 PDF를 DB에 보관합니다. 기록 API는 원문에서 인용한 구절·수정안·첨삭 결과를 조회하며, 당시 전체 JSON/PDF 보관본을 열람하는 API는 아닙니다. 서버 종료 등으로 남은 PROCESSING 요청의 자동 복구는 구현하지 않았습니다.</p><h4>응답 검증</h4><p>JSON 구조, 필수 필드와 길이를 검증합니다. 이력서·자기소개서의 인용문이 실제 입력에 있는지 확인하고, 서류 간 불일치 판단에는 서로 다른 문서의 근거를 요구합니다. PDF는 문서 종류와 페이지 범위를 검증하며 의미적 정확성은 별도 품질 확인이 필요합니다.</p></section>
  <section><h3>5문항 모의면접</h3><table><thead><tr><th>시점</th><th>생성 작업</th></tr></thead><tbody><tr><td>면접 시작</td><td>1~3번 질문 일괄 생성</td></tr><tr><td>3번 답변 제출</td><td>4번 문제해결 질문</td></tr><tr><td>4번 답변 제출</td><td>5번 꼬리질문</td></tr><tr><td>5번 답변 제출</td><td>최종 평가</td></tr></tbody></table><p>정상 완료 흐름의 생성 호출은 4회입니다. 1·2번 답변에는 이미 생성된 다음 질문을 반환합니다. 선택한 공고 요약과 사용자 서류를 사용하고, 최종 평가에는 시작 시점의 서류와 PDF를 다시 전달합니다.</p><h4>평가 계약</h4><p>서류 일치성·전문성·문제해결능력·논리력·의사소통능력을 각각 0~100점으로 받습니다. 서버에서 범위를 검증하고 동일 가중치 평균을 계산해 종합 점수를 소수점 첫째 자리까지 반올림합니다. 모델이 생성한 학습 참고용 점수이며 실제 채용 역량의 측정치는 아닙니다.</p></section>
      <section className="troubleshooting" aria-labelledby="troubleshooting-title">
        <h3 id="troubleshooting-title">주요 문제 및 해결 과정</h3>
        <article className="issue" aria-labelledby="state-issue-title">
          <h4 id="state-issue-title">01. 저장에 실패해도 평가 결과를 유지하려면</h4>
          <dl className="issue-steps">
            <div><dt>문제</dt><dd>최종 평가가 생성된 뒤 DB 저장에 실패하면, 사용자는 완료 결과를 확인하지 못합니다. 이때 전체 흐름을 다시 실행하면 이미 생성한 평가까지 다시 요청하게 됩니다.</dd></div>
            <div><dt>상태 확인</dt><dd>AI 평가 생성과 DB 저장은 서로 다른 단계입니다. 마지막 답변과 생성된 평가가 서버 세션에 남아 있다면, 일시적인 저장 실패에 대해 평가를 다시 만들 필요가 없다고 판단했습니다.</dd></div>
            <div><dt>검토</dt><dd>일시 저장 오류와 현재 코드가 영구 오류로 분류하는 무결성 위반·ORA-12899를 구분했습니다. 모든 스키마 오류를 분류하는 것은 아닙니다. 재제출한 답변과 세션 상태도 함께 확인했습니다.</dd></div>
            <div><dt>개선</dt><dd>세션별 synchronized 구간에서 답변을 처리하고, 일시 저장 실패 시 기존 평가와 마지막 답변을 보관해 같은 답변의 저장만 재시도하도록 했습니다. 질문·답변 기록과 평가 결과는 하나의 트랜잭션으로 저장하며, 영구 저장 오류는 실패 상태로 전환해 반복 요청을 막습니다.</dd></div>
            <div><dt>검증</dt><dd>기존 대체 의존성 테스트 기록에서 일시 저장 실패 후 평가 재사용과 영구 오류 후 반복 방어를 확인했습니다. 이번 포트폴리오 수정에서 Java 서비스·실 DB·실 AI 호출을 새로 실행한 결과는 아닙니다.</dd></div>
          </dl>
          <p className="issue-note">새로고침 시 서버 진행 상태와 브라우저 초안을 복원하고 답변 제한 시간은 유지합니다. 다만 세션이 서버 메모리에 있어 재시작·인스턴스 변경 시 이어갈 수 없습니다. 임시 상태는 한국시간 23:55에 만료하며 00:00까지 면접을 차단합니다.</p>
        </article>
        <article className="issue" aria-labelledby="length-issue-title">
          <h4 id="length-issue-title">02. 한글 평가 문구의 저장 길이 불일치</h4>
          <p className="issue-note"><strong>현재 상태: 별도 Oracle 테이블 검증 기록 · 기존 프로젝트 DB 미반영 · 서버 재배포 필요</strong></p>
          <dl className="issue-steps">
            <div><dt>문제</dt><dd>AI가 제한 이내인 250자의 평가 문구를 반환해도, 한글로 작성된 결과가 DB에 저장되지 않는 문제가 있었습니다.</dd></div>
            <div><dt>원인 확인</dt><dd>프로젝트 DB는 AL32UTF8 문자셋이며 기존 평가 컬럼은 VARCHAR2(500 BYTE)였습니다. 일반적인 완성형 한글 한 글자는 3바이트여서, 한글 250자는 750바이트로 기존 500바이트 제한을 초과했습니다. Java 검증도 500자까지 허용해 AI의 250자 제한과 달랐습니다.</dd></div>
            <div><dt>검토</dt><dd>문자 수와 바이트 수의 차이를 확인하고, AI 출력·Java 검증·DB 정의의 길이 기준을 함께 맞췄습니다. 제한이 정해진 짧은 문구이므로 VARCHAR2를 유지하면서 CHAR 길이 단위를 명시하는 방식을 선택했습니다.</dd></div>
            <div><dt>개선</dt><dd>질문·답변·평가 문구의 제한을 각각 120자·1,000자·250자로 정리하고, 스키마와 마이그레이션에 아래 정의를 반영했습니다.</dd></div>
          </dl>
          <div className="length-table-wrap" role="region" aria-label="면접 문자열 길이 변경 정의" tabIndex={0}>
            <table className="length-table"><caption>문자 수 기준으로 정리한 DB 변경 정의</caption><thead><tr><th scope="col">항목</th><th scope="col">제한</th><th scope="col">DB 정의</th></tr></thead><tbody><tr><th scope="row">질문</th><td>120자</td><td><code>VARCHAR2(120 CHAR)</code></td></tr><tr><th scope="row">답변</th><td>1,000자</td><td><code>VARCHAR2(1000 CHAR)</code></td></tr><tr><th scope="row">평가 문구</th><td>250자</td><td><code>VARCHAR2(250 CHAR)</code></td></tr></tbody></table>
          </div>
          <p className="issue-note"><code>VARCHAR2(120 CHAR)</code>의 CHAR는 길이를 세는 단위로, 최대 120문자를 뜻합니다. 고정 길이 자료형 CHAR(120)이나 120바이트라는 의미가 아닙니다. 예를 들어 완성형 한글 120자는 AL32UTF8에서 360바이트를 사용합니다.</p>
          <dl className="issue-steps">
            <div><dt>검증</dt><dd>별도 Oracle 테스트 테이블에서 기존 500 BYTE 정의의 저장 오류를 재현하고, 변경 정의로 한글·영문·혼합문자와 경계값의 저장·조회 및 초과 입력 차단을 확인했습니다. 기존 데이터가 새 제한을 넘으면 ALTER 전에 중단하도록 마이그레이션도 검증했습니다.</dd></div>
          </dl>
          <p className="issue-note">기존 프로젝트 DB에는 마이그레이션 적용과 서버 재배포가 필요합니다. 애플리케이션 길이 검증은 Java·JavaScript의 UTF-16 단위 기준을 유지하므로 일부 이모지는 2로 계산됩니다.</p>
          <p className="issue-note">면접 필드에 한정한 개선입니다. 일반 이력서 mainDuty의 BYTE/CHAR 계약은 현재 실제 운영 DDL이 미확인인 조건부 반례로 남아 있습니다. 전 필드 수정 완료나 운영 장애 재현 완료를 뜻하지 않습니다.</p>
        </article>
      </section>
  <p className="detail-footnote">구현 근거: DocumentServiceImpl, DocumentReviewServiceImpl, InterviewServiceImpl, InterviewPersistenceService 및 프로젝트 테스트·설계 자료</p></div>
  )
}

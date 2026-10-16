import { fradeDocuments } from '../data/portfolio'
import FradeVisual from './FradeVisual'
import ProjectEvidence from './ProjectEvidence'

export default function FradeDetails() {
  return (
    <div className="detail-content">
      <h2 id="detail-title">frade.</h2>
      <p className="detail-meta">2026.08.20 — 2026.09.08 · 5인 팀 · 결과 발표</p>
      <p className="detail-lead">모의 투자의 경험을 거래기록과 자산 정보로 확인하고, 커뮤니티에서 투자 의견을 나누는 플랫폼</p>
      <ProjectEvidence projectId="frade" />

      <section>
        <h3>서비스와 담당 범위</h3>
        <p>종목을 탐색하고 실제 시세 기반의 모의 거래를 경험한 뒤, 마이페이지에서 보유 자산을 확인하는 서비스입니다. 커뮤니티는 종목 정보와 투자 의견을 나누는 공간으로 구성했습니다.</p>
        <ol className="service-flow" aria-label="Frade 서비스 이용 흐름">
          <li><span>01</span>종목 탐색</li>
          <li><span>02</span>모의 거래</li>
          <li><span>03</span>자산 확인</li>
          <li><span>04</span>의견 공유</li>
        </ol>
        <p>저는 거래기록 저장·전체 및 기간별 조회 DAO/SQL, 마이페이지 최근 25건과 자산 포트폴리오를 담당했습니다. 기간별 SQL 구현과 사용자 화면 필터 완료는 구분합니다. 기획 단계에서는 와이어프레임과 ERD 설계에 참여하고 테이블 명세서를 작성했으며, 최종 결과 발표도 맡았습니다.</p>
        <p>팀의 시세 수집·종목 차트 기능과 연결해 자산 화면을 구성했습니다. 회원 인증·커뮤니티·증권사 API 수집은 팀의 다른 담당 영역입니다.</p>
      </section>

      <section>
        <h3>거래기록: 체결 데이터를 조회 화면으로</h3>
        <p>T_HISTORY에 사용자 번호·종목 코드·체결 가격·수량을 저장하고, 사용자 번호로 조회 범위를 제한합니다. 전체 조회와 기간별 조회는 DAO·MyBatis SQL로 나누고 거래일시 내림차순으로 반환합니다.</p>
        <table>
          <thead><tr><th scope="col">조회 범위</th><th scope="col">SQL의 날짜 조건</th></tr></thead>
          <tbody>
            <tr><td>오늘</td><td>오늘 00:00 이상, 다음 날 00:00 미만</td></tr>
            <tr><td>최근 일주일</td><td>6일 전 00:00부터 오늘까지</td></tr>
            <tr><td>최근 한 달</td><td>오늘 기준 한 달 전 00:00부터 오늘까지</td></tr>
            <tr><td>마이페이지</td><td>최신순 정렬 후 최근 25건</td></tr>
          </tbody>
        </table>
        <p>마이페이지에서는 T_STOCK과 JOIN해 종목명을 함께 전달합니다. Oracle의 ROWNUM을 정렬 바깥에 적용해 최신 거래부터 25건을 가져옵니다. 기간별 조회 조건은 SQL에 구현되어 있으며, 현재 마이페이지는 최근 거래 조회를 사용합니다.</p>
        <pre><code>{`SELECT * FROM (
  SELECT s.stock_name, h.trade_price,
         h.trade_cnt, h.trade_date
  FROM t_history h
  JOIN t_stock s ON s.stock_code = h.stock_code
  WHERE h.user_num = #{userNum}
  ORDER BY h.trade_date DESC
) WHERE ROWNUM <= 25`}</code></pre>
      </section>

      <section>
        <h3>자산 포트폴리오: 조회·계산·표시 분리</h3>
        <p>T_PORTFOLIO의 보유종목, T_CASH의 예치금, 최근 거래기록을 조회한 뒤 서비스에서 자산 정보를 계산합니다. 종목별 현재가는 팀의 StockService를 통해 가져옵니다.</p>
        <ul>
          <li>PortfolioInfoDTO: 종목명·보유수량·평균 매수가·현재가·평가금액·손익·수익률·비중</li>
          <li>AssetsInfoDTO: 주식 평가금액·예치금·총자산·보유 종목 수·초기 투자금 대비 손익</li>
          <li>MyPagePortfolioDTO: 자산 요약·보유종목·최근 거래·차트용 이름과 금액 목록을 하나로 전달</li>
        </ul>
        <p>JSP는 계산된 값을 받아 요약 카드·보유종목 표·거래기록을 표시하고, Chart.js 도넛 차트는 종목별 평가금액과 예치금으로 자산 구성을 보여줍니다.</p>
      </section>

      <section>
        <h3>자산 계산 규칙과 경계값</h3>
        <table>
          <thead><tr><th scope="col">항목</th><th scope="col">계산 규칙</th></tr></thead>
          <tbody>
            <tr><td>평균 매수가</td><td>매입원가 ÷ 보유수량</td></tr>
            <tr><td>평가금액</td><td>현재가 × 보유수량</td></tr>
            <tr><td>종목 손익</td><td>평가금액 − 매입원가</td></tr>
            <tr><td>종목 수익률</td><td>손익 ÷ 매입원가 × 100</td></tr>
            <tr><td>총자산</td><td>평가금액 합계 + 예치금</td></tr>
            <tr><td>종목 비중</td><td>종목 평가금액 ÷ 총자산 × 100</td></tr>
          </tbody>
        </table>
        <p>보유수량이 0보다 큰 종목만 조회해 평균 매수가를 계산합니다. 비율 계산은 분모가 0이면 0을 반환하고 소수점 둘째 자리까지 반올림합니다. 예치금 조회 결과가 없으면 0원으로 처리하며, 차트에도 예치금을 포함해 표와 차트의 자산 기준을 맞춥니다.</p>
        <div className="calculation-example">
          <h4>계산 예시</h4>
          <p>현재가 60,000원 × 10주, 매입원가 500,000원, 예치금 400,000원이라면 평가금액은 600,000원, 손익은 +100,000원, 종목 수익률은 20%, 총자산은 1,000,000원, 종목 비중은 60%입니다.</p>
          <small>계산 규칙을 설명하기 위한 가정이며 실제 투자 결과가 아닙니다.</small>
        </div>
      </section>

      <section>
        <h3>시세가 바뀌면 자산 화면도 함께 갱신</h3>
        <p>최초 화면은 서버에서 계산한 값으로 구성하고, 이후 보유종목별로 기존 SSE 스트림의 chart-tick 이벤트를 구독합니다. 유효한 현재가가 들어오면 평가금액·손익·수익률·비중과 총자산을 다시 계산하고 도넛 차트를 함께 갱신합니다.</p>
        <ul>
          <li>이벤트 배열 구조와 현재가를 검증하고, 유한한 양수 가격만 반영합니다.</li>
          <li>연결 목록을 관리해 중복 구독을 막고, pagehide에서 스트림을 닫습니다.</li>
          <li>pageshow에서 다시 연결해 페이지로 돌아왔을 때 시세 수신을 재개합니다.</li>
        </ul>
        <FradeVisual />
      </section>

      <section>
        <h3>데이터 설계와 구현 시 확인한 기준</h3>
        <p>보유종목은 사용자·종목별 수량과 매입원가를, 거래기록은 체결 시점의 가격·수량·일시를 보관합니다. 현재 보유 상태와 과거 체결 이력을 각각 조회하고, 종목 코드를 통해 종목명과 연결합니다.</p>
        <h4>현재 구현의 범위</h4>
        <p>초기 투자금 기준은 1,000만 원으로 고정되어 있습니다. 시세 이벤트는 자산 평가를 갱신하며, 예치금과 보유수량 변경은 페이지 재조회가 필요합니다. 자산 요약의 거래 횟수도 최근 조회 목록의 건수를 사용하므로 전체 누적 거래 횟수와 구분해야 합니다.</p>
      </section>

      <section>
        <h3>협업에서 배운 점</h3>
        <p>여러 팀원이 공통 파일을 동시에 수정하면서 병합 충돌과 통합 비용이 발생했습니다. 최종 발표에서는 작업 시작 전과 반영 전에 상위 브랜치의 변경을 확인하고, 최신 공통 코드를 기준으로 작업하는 개선 방안을 정리했습니다.</p>
        <p>거래 데이터·시세·화면을 연결하면서 각 담당 영역의 데이터 형식과 계산 기준을 맞추는 일이 중요하다는 점을 배웠습니다. 자산 요약과 종목 표, 차트가 같은 데이터를 기준으로 움직이도록 조회 모델과 갱신 흐름을 구성했습니다.</p>
      </section>

      <section>
        <h3>프로젝트 자료</h3>
        <p>원본 팀 산출물은 작성 당시 상태로 보존했습니다. 먼저 채용용 정정표를 확인해 주세요. 발표 26쪽 제목은 테스트 시나리오 예시로 정정하며, 27쪽 시연은 내부망 전용으로 외부에서 접속할 수 없습니다. 34쪽 미작성 칸은 팀 원본에 남아 있습니다. 테스트 시나리오는 통과 기록이 아닙니다.</p>
        <div className="project-document-links">
          {fradeDocuments.map((document) => (
            <a key={document.href} href={document.href} target="_blank" rel="noopener noreferrer">
              <span>{document.title}<small>{document.description}</small></span>
              <span className="document-format">{document.format} ↗</span>
            </a>
          ))}
        </div>
      </section>
      <p className="detail-footnote">구현 근거: PortfolioServiceImpl.java, AssetsInfoDTO, MyPagePortfolioDTO, HistoryDAO, history_mapper.xml, portfolio_mapper.xml, user/mypage.jsp · 프로젝트 맥락: 최종 발표 자료·WBS·화면 자료</p>
    </div>
  )
}

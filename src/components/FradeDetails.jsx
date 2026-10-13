export default function FradeDetails() {
  return (
    <div className="detail-content"><h2 id="detail-title">frade.</h2><p className="detail-meta">모의 주식거래 + 커뮤니티 · 팀 프로젝트</p><p className="detail-lead">거래 데이터를 모아 사용자의 투자 상태와 자산 구성을 보여주는 서비스</p>
  <section><h3>담당 범위</h3><p>거래기록 저장·전체 조회, 마이페이지 최근 거래기록과 자산 포트폴리오를 담당했습니다.</p></section>
  <section><h3>거래기록 조회</h3><p>사용자 번호로 거래내역의 조회 범위를 제한하고 최신 거래순으로 정렬합니다. 전체·오늘·최근 일주일·최근 한 달 조회 조건을 DAO와 SQL에 구현했습니다. 확인된 마이페이지 화면은 최근 25건 조회를 사용합니다.</p><p>마이페이지용 조회에서는 거래 테이블과 종목 테이블을 JOIN해 종목명, 거래 가격·수량·일시를 함께 전달합니다.</p><pre><code>{`SELECT * FROM (
  SELECT s.stock_name, h.trade_price,
         h.trade_cnt, h.trade_date
  FROM t_history h
  JOIN t_stock s ON s.stock_code = h.stock_code
  WHERE h.user_num = #{userNum}
  ORDER BY h.trade_date DESC
) WHERE ROWNUM <= 25`}</code></pre></section>
  <section><h3>자산 계산 규칙</h3><table><thead><tr><th>항목</th><th>계산 규칙</th></tr></thead><tbody><tr><td>평가금액</td><td>현재가 × 보유수량</td></tr><tr><td>종목 손익</td><td>평가금액 - 매입원가</td></tr><tr><td>종목 수익률</td><td>손익 ÷ 매입원가 × 100</td></tr><tr><td>총자산</td><td>평가금액 합계 + 예치금</td></tr><tr><td>자산 비중</td><td>종목 평가금액 ÷ 총자산 × 100</td></tr></tbody></table></section>
  <section><h3>조회 모델과 경계값</h3><p>PortfolioInfoDTO에 종목별 계산값을 담고, MyPagePortfolioDTO에 자산 요약·보유종목·최근 거래·차트 데이터를 묶어 전달합니다.</p><p>보유수량이 0보다 큰 종목만 조회하며, 비율 계산의 분모가 0이면 0을 반환합니다. 자산 구성 차트에는 예치금을 함께 포함합니다.</p></section>
  <section><h3>시세 스트림 연결</h3><p>기존 SSE의 chart-tick을 받아 현재가·평가금액·손익·비중과 차트를 갱신합니다. 페이지를 벗어날 때 스트림을 닫아 연결을 정리합니다.</p></section>
  <p className="detail-footnote">구현 근거: PortfolioServiceImpl.java, HistoryDAO, history_mapper.xml, portfolio_mapper.xml, user/mypage.jsp</p></div>
  )
}


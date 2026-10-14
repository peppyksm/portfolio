export default function FradeVisual() {
  return (
    <div className="frade-visual">
      <div className="terminal-title"><span /><span /><span /><p>PortfolioServiceImpl.java</p></div>
      <pre><code>
        <span className="code-comment">// 거래 데이터를 자산 정보로</span>{'\n'}
        <span className="code-key">long</span>{' valuation = currentPrice * stockCount;\n'}
        <span className="code-key">long</span>{' profit = valuation - buyCost;\n'}
        <span className="code-key">long</span>{' totalAsset = valuationSum + cash;\n\n'}
        <span className="code-comment">// 예치금을 포함한 자산 비중</span>{'\n'}
        <span className="code-key">double</span>{' weight = totalAsset == '}<span className="code-number">0</span>{'\n    ? '}<span className="code-number">0</span>{' : valuation * '}<span className="code-number">100.0</span>{' / totalAsset;'}
      </code></pre>
      <div className="data-flow"><span>거래·보유종목</span><b aria-hidden="true">→</b><span>자산 계산</span><b aria-hidden="true">→</b><span>포트폴리오</span></div>
      <p className="code-caption">구현을 설명하기 위한 계산 로직 요약</p>
    </div>
  )
}

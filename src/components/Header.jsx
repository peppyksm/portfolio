import { useEffect, useState } from 'react'
import { navigation } from '../data/portfolio'

export default function Header({ activeSection, scrolled, brandRef }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event) { if (event.key === 'Escape') setMenuOpen(false) }
    function onResize() { if (window.innerWidth > 700) setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-wrap">
        <a ref={brandRef} className="brand" href="#home" aria-label="김승민 포트폴리오 처음으로" onClick={() => setMenuOpen(false)}>KSM<span>’s portfolio</span><b>.</b></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        <nav id="navigation" className={menuOpen ? 'open' : undefined} aria-label="주요 메뉴">
          {navigation.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
              {label}{id === 'contact' && <> <span aria-hidden="true">↗</span></>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

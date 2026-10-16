import { useEffect, useRef, useState } from 'react'

// 화면에 처음 들어올 때만 표시합니다. 다시 스크롤해도 반복하지 않습니다.
export default function Reveal({ as: Element = 'div', className = '', delay = 0, children, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      const frame = window.requestAnimationFrame(() => setVisible(true))
      return () => window.cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Element ref={ref} className={`reveal${visible ? ' is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>
      {children}
    </Element>
  )
}

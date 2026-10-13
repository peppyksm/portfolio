import { useEffect, useRef, useState } from 'react'

const firstLine = '안녕하세요,'
const secondLine = '김승민입니다.'
const totalLetters = firstLine.length + secondLine.length
const startDelay = 220
const letterInterval = 85
const linePause = 200

function letterDelay(index) {
  return startDelay + index * letterInterval + (index >= firstLine.length ? linePause : 0)
}

export default function HeroGreeting() {
  const headingRef = useRef(null)
  const [progress, setProgress] = useState(() => {
    const complete = document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { count: complete ? totalLetters : 0, complete }
  })

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (document.hidden || motionPreference.matches) return

    let finished = false
    const timers = []

    function finish() {
      if (finished) return
      finished = true
      timers.forEach(window.clearTimeout)
      setProgress({ count: totalLetters, complete: true })
    }

    for (let index = 0; index < totalLetters; index++) {
      timers.push(window.setTimeout(() => {
        if (finished) return
        setProgress((current) => current.complete ? current : {
          count: Math.max(current.count, index + 1),
          complete: false,
        })
      }, letterDelay(index)))
    }
    timers.push(window.setTimeout(finish, letterDelay(totalLetters - 1) + 360))

    function onScroll() {
      const hero = headingRef.current?.closest('.hero')
      if (hero && hero.getBoundingClientRect().bottom <= 0) finish()
    }
    function onVisibilityChange() {
      if (document.hidden) finish()
    }
    function onMotionChange(event) {
      if (event.matches) finish()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionPreference.addEventListener('change', onMotionChange)
    return () => {
      finished = true
      timers.forEach(window.clearTimeout)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionPreference.removeEventListener('change', onMotionChange)
    }
  }, [])

  function renderLetters(text, offset) {
    return [...text].map((letter, index) => {
      const second = offset > 0
      const letterIndex = offset + index
      const className = [
        'typing-letter',
        letterIndex < progress.count ? 'is-visible' : '',
        !progress.complete && letterIndex === progress.count - 1 ? 'has-cursor' : '',
        second && index < 3 ? 'hero-name' : '',
        letter === '.' ? 'period' : '',
      ].filter(Boolean).join(' ')

      return (
        <span key={index} className={className}>{letter}</span>
      )
    })
  }

  return (
    <h1 ref={headingRef} id="hero-title" aria-label={`${firstLine} ${secondLine}`}>
      <span className="typing-line" aria-hidden="true">{renderLetters(firstLine, 0)}</span>
      <br aria-hidden="true" />
      <span className="typing-line" aria-hidden="true">{renderLetters(secondLine, firstLine.length)}</span>
    </h1>
  )
}

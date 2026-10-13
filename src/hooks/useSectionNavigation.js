import { useEffect, useState } from 'react'
import { navigation } from '../data/portfolio'

export default function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    let frame = null
    function update() {
      const position = window.scrollY + Math.min(window.innerHeight * 0.3, 230)
      let current = 'home'
      for (const { id } of navigation) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= position) current = id
      }
      if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        current = navigation.at(-1).id
      }
      setActiveSection(current)
      setScrolled(window.scrollY > 15)
      setShowBackTop(window.scrollY > 650)
      frame = null
    }
    function scheduleUpdate() {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return { activeSection, scrolled, showBackTop }
}

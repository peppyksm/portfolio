import { useCallback, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Archiving from './components/Archiving'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDialog from './components/ProjectDialog'
import GalleryDialog from './components/GalleryDialog'
import Toast from './components/Toast'
import useSectionNavigation from './hooks/useSectionNavigation'
import './App.css'

export default function App() {
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const brandRef = useRef(null)
  const { activeSection, scrolled, showBackTop } = useSectionNavigation()
  const closeModal = useCallback(() => setModal(null), [])

  function goToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
    brandRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <a className="skip" href="#projects">본문 바로가기</a>
      <Header activeSection={activeSection} scrolled={scrolled} brandRef={brandRef} />
      <main>
        <Hero />
        <Projects
          onOpenGallery={(project, index) => setModal({ type: 'gallery', project, index })}
          onOpenDetails={(project) => setModal({ type: 'details', project })}
        />
        <About />
        <Skills />
        <Archiving />
        <Contact onNotify={(message) => setToast({ message, id: Date.now() })} />
      </main>
      <Footer />
      <button className={`back-top${showBackTop ? ' visible' : ''}`} type="button" aria-label="맨 위로 이동" onClick={goToTop}>↑</button>
      <Toast notification={toast} onDismiss={() => setToast(null)} />
      {modal?.type === 'details' && <ProjectDialog projectId={modal.project} onClose={closeModal} />}
      {modal?.type === 'gallery' && <GalleryDialog projectId={modal.project} initialIndex={modal.index} onClose={closeModal} />}
    </>
  )
}

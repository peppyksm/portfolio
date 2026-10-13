import { useEffect, useRef, useState } from 'react'
import { gallery } from '../data/portfolio'
import Modal from './Modal'

export default function GalleryDialog({ initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const imageWrapRef = useRef(null)
  const image = gallery[index]
  useEffect(() => { imageWrapRef.current?.scrollTo({ top: 0 }) }, [index])

  function move(direction) { setIndex((current) => (current + direction + gallery.length) % gallery.length) }
  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <Modal className="gallery-dialog" labelledBy="gallery-title" heading={`PROVIT / ${image.title}`} closeLabel="화면 갤러리 닫기" onClose={onClose} onKeyDown={handleKeyDown}>
      <div ref={imageWrapRef} className="gallery-image-wrap"><img className="gallery-image" src={image.src} alt={image.title} /></div>
      <div className="gallery-bottom">
        <button type="button" aria-label="이전 이미지" onClick={() => move(-1)}>←</button>
        <p className="gallery-caption" aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} · {image.title}</p>
        <button type="button" aria-label="다음 이미지" onClick={() => move(1)}>→</button>
      </div>
      <p className="gallery-note">{image.note}</p>
    </Modal>
  )
}

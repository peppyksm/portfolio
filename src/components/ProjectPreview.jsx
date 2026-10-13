import { useState } from 'react'
import { gallery } from '../data/portfolio'

export default function ProjectPreview({ onOpenGallery }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = gallery[selectedIndex]

  return (
    <div className="project-visual">
      <button className="preview-image" type="button" aria-label={`${selected.title} 크게 보기`} onClick={() => onOpenGallery(selectedIndex)}>
        <img src={selected.src} alt={`provit ${selected.title}`} width="1904" height="985" loading="lazy" />
        <span>화면 크게 보기 <span aria-hidden="true">↗</span></span>
      </button>
      <div className="image-meta"><span>{selected.title}</span><span>{String(selectedIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></div>
      <div className="project-thumbs" aria-label="provit 화면 선택">
        {gallery.map((image, index) => (
          <button key={image.src} type="button" className={index === selectedIndex ? 'active' : undefined} aria-label={`${image.title} 선택`} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
            <img src={image.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}

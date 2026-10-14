import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import 'swiper/css'
import 'swiper/css/a11y'

export default function ProjectPreview({ projectId, gallery, onOpenGallery }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const sliderRef = useRef(null)
  const selected = gallery[selectedIndex]
  const slideSpeed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320

  function move(direction) {
    if (direction < 0) sliderRef.current?.slidePrev(slideSpeed)
    else sliderRef.current?.slideNext(slideSpeed)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <div className="project-visual">
      <div className="project-browser">
        <div className="browser-toolbar" aria-hidden="true">
          <div className="browser-controls"><span /><span /><span /></div>
          <span className="browser-page-title">{projectId} / {selected.title}</span>
          <span className="browser-toolbar-spacer" />
        </div>
      <div className="project-carousel" role="region" aria-roledescription="캐러셀" aria-label={`${projectId} 프로젝트 화면`} onKeyDown={handleKeyDown}>
        <Swiper
          modules={[A11y]}
          slidesPerView={1}
          loop
          grabCursor
          simulateTouch
          focusableElements="input, select, option, textarea, video, label"
          speed={slideSpeed}
          threshold={8}
          a11y={{ slideLabelMessage: '{{index}} / {{slidesLength}}', containerRoleDescriptionMessage: '이미지 슬라이더' }}
          onSwiper={(slider) => { sliderRef.current = slider }}
          onSlideChange={(slider) => setSelectedIndex(slider.realIndex)}
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={image.src} aria-hidden={selectedIndex !== index}>
              <button className="preview-image" type="button" tabIndex={selectedIndex === index ? 0 : -1} aria-label={`${image.title} 크게 보기`} onClick={(event) => {
                if (sliderRef.current?.allowClick) {
                  event.currentTarget.focus({ preventScroll: true })
                  onOpenGallery(index)
                }
              }}>
                <img src={image.src} alt={`${projectId} ${image.title}`} loading="lazy" draggable="false" />
                <span>화면 크게 보기 <span aria-hidden="true">↗</span></span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="carousel-arrow carousel-prev" type="button" aria-label="이전 프로젝트 이미지" onClick={() => move(-1)}><TbChevronLeft aria-hidden="true" /></button>
        <button className="carousel-arrow carousel-next" type="button" aria-label="다음 프로젝트 이미지" onClick={() => move(1)}><TbChevronRight aria-hidden="true" /></button>
      </div>
      </div>
      <div className="image-meta" aria-live="polite" aria-atomic="true"><span>{selected.title}</span><span>{String(selectedIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></div>
      <div className="project-thumbs" aria-label={`${projectId} 화면 선택`}>
        {gallery.map((image, index) => (
          <button key={image.src} type="button" className={index === selectedIndex ? 'active' : undefined} aria-label={`${image.title} 선택`} aria-pressed={index === selectedIndex} onClick={() => sliderRef.current?.slideToLoop(index, slideSpeed)}>
            <img src={image.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {projectId === 'frade' && <p className="preview-source">최종 화면·DB 설계 자료 · 화면의 금액과 수익률은 테스트 데이터입니다.</p>}
    </div>
  )
}

import { useRef } from 'react'
import { TbArrowUpRight, TbCopy } from 'react-icons/tb'
import { email } from '../data/portfolio'
import Reveal from './Reveal'

export default function Contact({ onNotify }) {
  const emailRef = useRef(null)
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      onNotify('이메일 주소를 복사했습니다.')
    } catch {
      const range = document.createRange()
      range.selectNodeContents(emailRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      onNotify('이메일 주소를 선택했습니다. 복사해 주세요.')
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <Reveal className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">05 / GET IN TOUCH</p>
          <h2 id="contact-title">좋은 서비스를,<br />함께 만듭니다<span>.</span></h2>
          <p className="contact-description">자바 백엔드 개발자 김승민<br />프로젝트와 개발에 관한 이야기를 나눠요.</p>
        </div>
        <div className="contact-links">
          <p className="contact-label">EMAIL</p>
          <a className="contact-email" href={`mailto:${email}`}><span ref={emailRef} className="email-address">{email}</span><span aria-hidden="true"><TbArrowUpRight /></span></a>
          <button className="copy-email" type="button" onClick={copyEmail}><TbCopy aria-hidden="true" />이메일 복사</button>
        </div>
      </Reveal>
    </section>
  )
}

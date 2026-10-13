import { useEffect, useRef } from 'react'

export default function Modal({ className, labelledBy, heading, closeLabel, onClose, onKeyDown, children }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    // StrictMode의 첫 effect 정리에서 불필요한 close 이벤트가 발생하지 않게 합니다.
    const frame = window.requestAnimationFrame(() => {
      dialog.showModal()
      closeRef.current?.focus()
      document.body.classList.add('modal-open')
    })
    return () => {
      window.cancelAnimationFrame(frame)
      if (dialog.open) dialog.close()
      document.body.classList.remove('modal-open')
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  function closeOnBackdrop(event) {
    if (event.target !== dialogRef.current) return
    const bounds = dialogRef.current.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close()
  }

  return (
    <dialog ref={dialogRef} className={className} aria-labelledby={labelledBy} onClose={onClose} onClick={closeOnBackdrop} onKeyDown={onKeyDown}>
      <div className="dialog-header">
        <span id={labelledBy === 'gallery-title' ? labelledBy : undefined}>{heading}</span>
        <button ref={closeRef} className="dialog-close" type="button" aria-label={closeLabel} onClick={() => dialogRef.current.close()}>×</button>
      </div>
      {children}
    </dialog>
  )
}

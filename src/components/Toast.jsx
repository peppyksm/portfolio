import { useEffect, useRef } from 'react'

export default function Toast({ notification, onDismiss }) {
  const dismissRef = useRef(onDismiss)
  useEffect(() => { dismissRef.current = onDismiss }, [onDismiss])
  useEffect(() => {
    if (!notification) return
    const timer = window.setTimeout(() => dismissRef.current(), 3000)
    return () => window.clearTimeout(timer)
  }, [notification])
  return <div className={`toast${notification ? ' show' : ''}`} role="status" aria-live="polite">{notification?.message}</div>
}

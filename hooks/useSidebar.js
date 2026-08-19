'use client'

import { useState, useEffect } from 'react'

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggle = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const isVisible = isMobile ? isOpen : true

  return {
    isOpen,
    isMobile,
    isVisible,
    toggle,
    open,
    close,
    mounted,
  }
}

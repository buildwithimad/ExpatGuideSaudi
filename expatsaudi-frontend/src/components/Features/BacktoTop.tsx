'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) {
    return null
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="
        fixed
        bottom-5
        right-6
        z-50
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-primary
        text-primary-foreground
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        hover:bg-accent
        hover:text-accent-foreground
        
      "
    >
      ↑
    </button>
  )
}
import { useEffect, useRef } from 'react'
import { useGlobalContext } from '../../../components/layout/context'
import Lenis from 'lenis'
import { IUseLandingPageHooks } from './utils'

export const useLandingPageHooks = (): IUseLandingPageHooks => {
  const { rsProps } = useGlobalContext()

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      anchors: true,
      prevent: (node) =>
        ['right-section', 'modal-body', 'modal-body-new'].includes(node.id)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf) // Keep the scroll smooth
    }

    const frameId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Clean up Lenis instance
      cancelAnimationFrame(frameId) // Cancel the animation frame to avoid memory leaks
    }
  }, [])

  const createFeedback = (title: string) => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title,
      max: true
    })
  }

  const faqRef = useRef<HTMLDivElement>(null)

  const handleScrollRightSection = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return {
    createFeedback,
    handleScrollRightSection,
    faqRef
  }
}

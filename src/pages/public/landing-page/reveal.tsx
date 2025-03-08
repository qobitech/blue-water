import { motion, useAnimation, useInView } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

export const transition1 = {
  duration: 1.4,
  // ease: [0.6, 0.01, -0.05, 0.9],
  ease: [0.43, 0.13, 0.23, 0.96]
}

interface IReveal
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: any
  className?: string | undefined
  hidden?: any
  visible?: any
}

export const Reveal: FC<IReveal> = ({
  children,
  className,
  hidden,
  visible
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const mainControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView])
  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
    >
      <motion.div
        variants={{
          hidden: hidden || { opacity: 0, y: 75 },
          visible: visible || { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

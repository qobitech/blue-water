import { motion, useAnimation, useInView } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

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

export const SubReveal: FC<IReveal> = ({
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
    <motion.div
      variants={{
        hidden: hidden || { opacity: 0, y: 75 },
        visible: visible || { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}

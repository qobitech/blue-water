import { CheckCircleSVG } from '../../../components/utils/svgs'
import { BUTTON_PRIMARY } from '../../../constants/global'
import { pageurl } from '../../../constants/pageurl'
import { TypeButton } from '../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation, useInView } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

export const ListComponent = ({ points }: { points: string[] }) => {
  return (
    <ul
      className="ml-3 pl-0 mr-3 mr-lg-0 ml-lg-0 f-column-20 h-100"
      style={{ maxWidth: '400px' }}
    >
      {points.map((i, index) => (
        <li
          style={{ listStyleType: 'none' }}
          className="f-row-20 ais"
          key={index}
        >
          <div style={{ minWidth: '17px', minHeight: '15px' }}>
            <CheckCircleSVG color={BUTTON_PRIMARY} />
          </div>
          <span>{i}</span>
        </li>
      ))}
      <CTASection url={pageurl.REGISTER} />
    </ul>
  )
}

const CTASection = ({ url }: { url: string }) => {
  const navigate = useNavigate()
  return (
    <div className="w-100 f-row jcc mt-auto">
      <TypeButton
        title="CREATE AN ACCOUNT"
        className="mt-auto"
        buttonSize="large"
        mtauto="true"
        onClick={() => navigate(url)}
      />
    </div>
  )
}

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

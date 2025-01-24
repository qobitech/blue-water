import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import './style.scss'
import { RSFeedback } from './rs-feedback'

export type views = 'main page' | 'prep'

export type optionType = 'audio' | 'screen' | undefined

const SendFeedback = () => {
  const { rsProps } = useGlobalContext()

  const feedbackContent = content.filter((i) => i.slug === rsProps?.slug)?.[0]

  return (
    <div className="f-column-33 aic">
      <RSFeedback feedbackContent={feedbackContent} rsProps={rsProps} />
    </div>
  )
}

export default SendFeedback

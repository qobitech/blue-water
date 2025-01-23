import { useState } from 'react'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { HVC } from '../../utils/hvc'
import Prep from './prep'
import './style.scss'
import { useScreenAudioRecorder } from './screen-audio-record'
import { RSFeedback } from './rs-feedback'

export type views = 'main page' | 'prep'

export type optionType = 'audio' | 'screen' | undefined

const SendFeedback = () => {
  const { rsProps } = useGlobalContext()

  const [stage, setStage] = useState<views>('main page')

  const feedbackContent = content.filter((i) => i.slug === rsProps?.slug)?.[0]

  // const isSingular = feedbackContent.totalFeedback === 1

  // const onCompany = () => {}

  // const onPrompt = () => {
  //   setStage('prep')
  // }

  const screenProps = useScreenAudioRecorder()

  const onRecord = () => {
    if (rsProps?.feedbackOption === 'audio') {
      rsProps?.setAudioProps(true)
    }
    if (rsProps?.feedbackOption === 'screen') {
      screenProps.startRecording()
    }
    setStage('main page')
  }

  // useRecordSectionCTA(
  //   rsProps,
  //   () => {
  //     onPrompt()
  //     rsProps?.setFeedbackOption('audio')
  //   },
  //   () => {
  //     onPrompt()
  //     rsProps?.setFeedbackOption('screen')
  //   }
  // )

  // const onWatchDemo = () => {}

  return (
    <div>
      <HVC removeDOM view={stage === 'main page'} className="f-column-33 aic">
        <RSFeedback feedbackContent={feedbackContent} />
      </HVC>
      <HVC removeDOM view={stage === 'prep'}>
        <Prep
          onRecord={onRecord}
          purpose="interview"
          company=""
          rsProps={rsProps}
        />
      </HVC>
    </div>
  )
}

export default SendFeedback

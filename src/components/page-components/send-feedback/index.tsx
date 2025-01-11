import { useState } from 'react'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { HVC } from '../../utils/hvc'
import Prep from './prep'
import './style.scss'
import { useScreenAudioRecorder } from './screen-audio-record'
import { CardItems, OverViewHeader } from '../../utils/card-items'
import { useRecordSectionCTA } from './hooks'

export type views = 'main page' | 'prep'

export type optionType = 'audio' | 'screen' | undefined

const SendFeedback = () => {
  const { rsProps } = useGlobalContext()

  const [stage, setStage] = useState<views>('main page')

  const feedbackContent = content.filter((i) => i.slug === rsProps?.slug)?.[0]

  const isSingular = feedbackContent.totalFeedback === 1

  const onCompany = () => {}

  const onPrompt = () => {
    setStage('prep')
  }

  const screenProps = useScreenAudioRecorder()

  const [options, setOptions] = useState<optionType>()

  const onRecord = () => {
    if (options === 'audio') {
      rsProps?.setAudioProps(true)
    }
    if (options === 'screen') {
      screenProps.startRecording()
    }
    setStage('main page')
  }

  useRecordSectionCTA(
    rsProps,
    () => {
      onPrompt()
      setOptions('audio')
    },
    () => {
      onPrompt()
      setOptions('screen')
    }
  )

  return (
    <div>
      <HVC removeDOM view={stage === 'main page'} className="f-column-33">
        <div
          className="rounded-33 p-4 f-column-33 shadow-sm"
          style={{ background: feedbackContent.color }}
        >
          <div className="f-column">
            <div className="f-row-20 aic pb-1 jcsb">
              <p className="m-0 text-medium">{feedbackContent.requester}</p>
              <p className="m-0 font-11 txt-brand hw-mx py-1 px-2 rounded-10 bg-brand">
                {feedbackContent.category}
              </p>
            </div>
            <p className="text-tiny color-label m-0">
              {feedbackContent.title} at{' '}
              <span
                className="text-decoration-underline cursor-pointer"
                onClick={onCompany}
              >
                {feedbackContent.company}
              </span>
            </p>
          </div>
          <div className="question-feedback">
            <OverViewHeader title="Question" />
            <h4 className="m-0">{feedbackContent.subject}</h4>
          </div>
          <div className="context-feedback">
            <CardItems title="Purpose" value={feedbackContent.purpose} />
          </div>
          <div className="pt-3 f-row aic jcsb number-of-feedbacks">
            <p className="m-0 text-tiny color-label">
              {feedbackContent.totalFeedback.toLocaleString()} feedback
              {isSingular ? '' : 's'}
            </p>
          </div>
        </div>
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

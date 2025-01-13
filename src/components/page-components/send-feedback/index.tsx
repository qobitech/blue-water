import { useState } from 'react'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { HVC } from '../../utils/hvc'
import Prep from './prep'
import './style.scss'
import { useScreenAudioRecorder } from './screen-audio-record'
import { CardItems, OverViewHeader } from '../../utils/card-items'
import { useRecordSectionCTA } from './hooks'
import { _isMobile } from '../../utils/helper'
import { PlaySVG } from '../../utils/svgs'

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

  const onRecord = () => {
    if (rsProps?.feedbackOption === 'audio') {
      rsProps?.setAudioProps(true)
    }
    if (rsProps?.feedbackOption === 'screen') {
      screenProps.startRecording()
    }
    setStage('main page')
  }

  useRecordSectionCTA(
    rsProps,
    () => {
      onPrompt()
      rsProps?.setFeedbackOption('audio')
    },
    () => {
      onPrompt()
      rsProps?.setFeedbackOption('screen')
    }
  )

  return (
    <div>
      <HVC removeDOM view={stage === 'main page'} className="f-column-33">
        <div
          className={`rounded-33 ${
            _isMobile() ? 'p-4' : 'p-5'
          } f-column-33 shadow-sm`}
          style={{
            background: `linear-gradient(135deg, ${feedbackContent.color?.from}, ${feedbackContent.color?.to})`
          }}
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
              {isSingular ? '' : 's'} collected.
            </p>
            <div className="f-row-11 aic">
              <PlaySVG />
              <p className="m-0 text-tiny text-decoration-underline cursor-pointer">
                Watch Demo / Presentation
              </p>
            </div>
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

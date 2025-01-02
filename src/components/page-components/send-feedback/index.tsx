import { useState } from 'react'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { HVC } from '../../utils/hvc'
import { RecordSVG } from '../../utils/svgs'
import { useAudioRecorder } from './audio-record-legacy-2'
import Prep from './prep'
import './style.scss'
// import { _isMobile } from '../../utils/helper'
import { useScreenAudioRecorder } from './screen-audio-record'
import { ActionComponent, IOptionAction } from '../../utils/reusable'
import { CardItems, OverViewHeader } from '../../utils/card-items'
import CustomAudioPlayer from './custom-audio-player'
import AudioRecordSection from './audio-record-section'

type views = 'main page' | 'prep'

type optionType = 'audio' | 'screen' | undefined

const SendFeedback = () => {
  const { rsProps } = useGlobalContext()

  const [stage, setStage] = useState<views>('main page')

  const feedbackContent = content.filter((i) => i.slug === rsProps?.slug)?.[0]

  const isSingular = feedbackContent.totalFeedback === 1

  const onCompany = () => {}

  const onPrompt = () => {
    setStage('prep')
  }

  const audioProps = useAudioRecorder()

  const screenProps = useScreenAudioRecorder()

  const [options, setOptions] = useState<optionType>()

  const actions: IOptionAction[] = [
    {
      label: 'Audio Record',
      action: () => {
        onPrompt()
        setOptions('audio')
      }
    },
    {
      label: 'Screen + Audio Record',
      action: () => {
        onPrompt()
        setOptions('screen')
      }
    }
  ]

  const onRecord = () => {
    if (options === 'audio') {
      audioProps.handleStartRecording()
    }
    if (options === 'screen') {
      screenProps.startRecording()
    }
    setStage('main page')
  }

  // const onStopRecord = () => {
  //   if (options === 'audio') {
  //     audioProps.handleStopRecording()
  //   }
  //   if (options === 'screen') {
  //     screenProps.stopRecording()
  //   }
  //   setStage('main page')
  // }

  // const isRecording = !options
  //   ? false
  //   : options === 'audio'
  //   ? audioProps.recording
  //   : screenProps.recording

  return (
    <div>
      <HVC removeDOM view={stage === 'main page'} className="f-column-33">
        <div className="border-label rounded-33 p-4 f-column-33">
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
        <div className="w-100 f-column-33">
          {!!audioProps.audioURL && !audioProps.recording && (
            <CustomAudioPlayer audioProps={audioProps} />
          )}

          {!options ? (
            <ActionComponent
              title="Record Feedback"
              buttonType="bold"
              actions={actions}
              icon={<RecordSVG color="#fff" />}
              className={'hw-mx mx-auto'}
            />
          ) : (
            <AudioRecordSection audioProps={audioProps} />
          )}
        </div>
      </HVC>
      <HVC removeDOM view={stage === 'prep'}>
        <Prep onRecord={onRecord} purpose="interview" company="" />
      </HVC>
    </div>
  )
}

export default SendFeedback

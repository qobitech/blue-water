import { useState } from 'react'
import {
  CardItems,
  OverViewHeader
} from '../../../pages/dashboard/bet-channel/by-id/data'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { TypeButton } from '../../utils/button'
import { HVC } from '../../utils/hvc'
import { BinSVG, LogoNoWaveSVG, PauseSVG, StopSVG } from '../../utils/svgs'
import { useAudioRecorder } from './audio-record'
import Prep from './prep'
import './style.scss'
import { _isMobile } from '../../utils/helper'

type views = 'main page' | 'prep'

const SendFeedback = () => {
  const { rsProps } = useGlobalContext()

  const [stage, setStage] = useState<views>('main page')

  const feedbackContent = content.filter((i) => i.slug === rsProps?.slug)?.[0]

  const isSingular = feedbackContent.totalFeedback === 1

  const onCompany = () => {}

  const onPrompt = () => {
    setStage('prep')
  }

  const { recording, handleStartRecording, handleStopRecording } =
    useAudioRecorder()

  const onRecord = () => {
    handleStartRecording()
    setStage('main page')
  }

  return (
    <div>
      <HVC removeDOM view={stage === 'main page'} className="f-column-33">
        <div className="border-label rounded-33 p-4 f-column-33">
          <div className="f-column">
            <div className="f-row-20 aic pb-1 jcsb">
              <p className="m-0 text-medium">{feedbackContent.requester}</p>
              <p className="m-0 text-tiniest color-label">
                {feedbackContent.createdAt}
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
        <div className="w-100 f-column">
          {!recording ? (
            <TypeButton
              onClick={onPrompt}
              title="Give Feedback"
              icon={<LogoNoWaveSVG color="#fff" />}
              buttonSize="large"
              className={_isMobile() ? 'hw-mx mx-auto' : 'w-100'}
            />
          ) : (
            <div className={_isMobile() ? 'f-column-27' : 'f-column-13'}>
              <div className="border-label rounded-43 p-4 f-row-33 aic jcc controls-feedback">
                <div className="f-row-17 aic">
                  <p className="m-0 color-label">Recording</p>
                  <p className="m-0">00 : 00</p>
                </div>
                <div className="f-row-12 aic hw-mx cursor-pointer control-item">
                  <p className="m-0">Pause</p>
                  <PauseSVG />
                </div>
                <div
                  className="f-row-12 aic hw-mx cursor-pointer control-item"
                  onClick={handleStopRecording}
                >
                  <p className="m-0">Stop Recording</p>
                  <StopSVG />
                </div>
                <div
                  className="f-row-12 aic hw-mx cursor-pointer control-item"
                  onClick={handleStopRecording}
                >
                  {/* <p className="m-0">Delete Recording</p> */}
                  <BinSVG />
                </div>
              </div>
            </div>
          )}
          {/* {audioURL && (
        <div>
        <audio controls src={audioURL} />
        </div>
        )} */}
        </div>
      </HVC>
      <HVC removeDOM view={stage === 'prep'}>
        <Prep onRecord={onRecord} purpose="interview" company="" />
      </HVC>
    </div>
  )
}

export default SendFeedback

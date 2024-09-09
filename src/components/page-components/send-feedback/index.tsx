import { useState } from 'react'
import {
  CardItems,
  OverViewHeader
} from '../../../pages/dashboard/bet-channel/by-id/data'
import { content } from '../../../pages/public/landing-page/data'
import { useGlobalContext } from '../../layout/context'
import { TypeButton } from '../../utils/button'
import { HVC } from '../../utils/hvc'
import { SeparatorComponent } from '../../utils/reusable'
import { LogoSVG, PauseSVG, StopSVG, TrashSVG } from '../../utils/svgs'
import { useAudioRecorder } from './audio-record'
import Prep from './prep'

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
              <p className="m-0 text-tiny">{feedbackContent.requester}</p>
              <p className="m-0 text-tiniest color-label">
                {feedbackContent.createdAt}
              </p>
            </div>
            <p className="text-tiniest color-label m-0">
              {feedbackContent.title} at{' '}
              <span
                className="text-decoration-underline cursor-pointer"
                onClick={onCompany}
              >
                {feedbackContent.company}
              </span>
            </p>
          </div>
          <div>
            <OverViewHeader title="Question" />
            <h4 className="m-0">{feedbackContent.subject}</h4>
          </div>
          <div>
            <CardItems
              title="Context"
              value={`In her inquiry into how to improve quality of life for older people, the British social designer Hilary Cottam found a key determining factor was “being socially connected and not having to worry about minor things like changing light bulbs.” In 2007, Cottam’s design group spent a year doing contextual inquiry while immersed in the lives of elderly residents in a poor London suburb, then began testing their theories with the Southwark Circle, a neighborhood network that combines the functions of a concierge service, self-help group, cooperative, and social club (members pay a small fee, and may barter services as well). Creating “social circles” for seniors lessened the need for costly at-home visits by social workers—while also providing more of a sense of community. Interestingly, Cottam found the ideal social circle as you get older “should include six people from very different roles,” including family, friendly professionals, same- age peers, and young people.`}
            />
          </div>
          <div className="pt-3 f-row aic jcsb">
            <p className="m-0 text-tiny color-label">
              {feedbackContent.totalFeedback.toLocaleString()} feedback
              {isSingular ? '' : 's'}
            </p>
          </div>
        </div>
        <div>
          {!recording ? (
            <TypeButton
              onClick={onPrompt}
              title="Start Recording Feedback"
              icon={<LogoSVG color="#fff" />}
              buttonSize="large"
              className="w-100"
            />
          ) : (
            <div className="f-column-13">
              <div className="border-label rounded-43 p-4 f-row-33 aic jcc">
                <div className="f-row-17 aic">
                  <p className="m-0 color-label">Recording</p>
                  <p className="m-0">00 : 00</p>
                </div>
                <SeparatorComponent />
                <div className="f-row-12 aic hw-mx cursor-pointer">
                  <p className="m-0">Pause</p>
                  <PauseSVG />
                </div>
                <SeparatorComponent />
                <div
                  className="f-row-12 aic hw-mx cursor-pointer"
                  onClick={handleStopRecording}
                >
                  <p className="m-0">Stop Recording</p>
                  <StopSVG />
                </div>
              </div>
              <div className="f-row-9 jcc aic hw-mx cursor-pointer mx-auto">
                <TrashSVG />
                <p className="m-0 font-13 color-danger">Delete Recording</p>
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

/* eslint-disable @typescript-eslint/no-empty-interface */
import { IColorGradient } from '../../../constants/global'
import { IFeedBack } from '../../../pages/public/landing-page/data'
import { IRightSection } from '../../layout/right-section/utils'
import { IUseNotificationModal } from '../../utils/modal'
import { IUseAudioRecorderProps } from './audio-record-legacy-2'

export interface IMiniFeedbackCard {
  feedbackContent: IFeedBack
}

export interface IFeedbackSubmission {
  handleClose: () => void
  handleRecord: () => void
}

export interface IFeedbackActions {
  handleText: () => void
  handleAudio: () => void
  handleWatchDemo: () => void
  watchDemo: boolean
  color: IColorGradient
}

export interface IWatchDemo {
  feedbackContent: IFeedBack
}

export interface IRSFeedback {
  feedbackContent: IFeedBack
  rsProps: IRightSection<{}> | undefined
}

export interface IFeedbackCTA {
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
  isDone: boolean
  color: IColorGradient
}

export interface IFeedbackText {
  feedbackText: string
  setFeedbackText: (text: string) => void
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
  color: IColorGradient
}

export interface IFeedbackAudio {
  audioProps: IUseAudioRecorderProps
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
  color: IColorGradient
}

export type feedbackType = 'text' | 'audio' | undefined

export interface ISubmitFeedback {
  notificationProps: IUseNotificationModal
  handleSubmit: () => void
}

export interface ISubmitFeedbackForm {
  handleClose: () => void
  handleSubmit: () => void
}

/* eslint-disable @typescript-eslint/no-empty-interface */
import { IFeedBack } from '../../../pages/public/landing-page/data'
import { IUseNotificationModal } from '../../utils/modal'
import { IUseAudioRecorderProps } from './audio-record-legacy-2'

export interface IMiniFeedbackCard {
  feedbackContent: IFeedBack
}

export interface IFeedbackActions {
  handleText: () => void
  handleAudio: () => void
  handleWatchDemo: () => void
  watchDemo: boolean
}

export interface IWatchDemo {
  feedbackContent: IFeedBack
}

export interface IRSFeedback {
  feedbackContent: IFeedBack
}

export interface IFeedbackCTA {
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
  isDone: boolean
}

export interface IFeedbackText {
  feedbackText: string
  setFeedbackText: (text: string) => void
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
}

export interface IFeedbackAudio {
  audioProps: IUseAudioRecorderProps
  handleDoneWithFeedback: () => void
  cancelFeedback: () => void
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

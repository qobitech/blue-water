/* eslint-disable @typescript-eslint/no-empty-interface */
import { IFeedBack } from '../../../pages/public/landing-page/data'

export interface IMiniFeedbackCard {
  feedbackContent: IFeedBack
}

export interface IFeedbackActions {
  handleText: () => void
  handleAudio: () => void
  handleShare: () => void
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
}

export interface IFeedbackText {
  feedbackText: string
  setFeedbackText: (text: string) => void
}

export interface IFeedbackAudio {}

export type feedbackType = 'text' | 'audio' | undefined

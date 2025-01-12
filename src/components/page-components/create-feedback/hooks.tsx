import { useEffect } from 'react'
import { IRightSection, IRsPropsCTA } from '../../layout/right-section/utils'
import { GenerateSVG } from '../../utils/svgs'
import { createFeedbackStage } from './utils'

export const useUserDetailsCTA = (
  rsProps: IRightSection<{}> | undefined,
  onNext: () => void,
  onPrevious: () => void,
  stage: createFeedbackStage
) => {
  const cta: IRsPropsCTA[] = [
    // {
    //   title: 'Previous',
    //   buttonType: 'outlined',
    //   action: onPrevious
    // },
    {
      title: 'Generate Feedback Link',
      buttonType: 'bold',
      action: onNext,
      icon: <GenerateSVG color="#fff" />
    }
  ]
  useEffect(() => {
    if (stage === 'Email Address') rsProps?.setCTA(cta)
    return () => {
      rsProps?.setCTA([])
    }
  }, [stage])
}

export const useFeedbackDetailsCTA = (
  rsProps: IRightSection<{}> | undefined,
  onNext: () => void,
  onPrevious: () => void,
  stage: createFeedbackStage
) => {
  const cta: IRsPropsCTA[] = [
    {
      title: 'Previous',
      buttonType: 'outlined',
      action: onPrevious
    }
    // {
    //   title: 'Next',
    //   buttonType: 'bold',
    //   action: onNext
    // }
  ]
  useEffect(() => {
    if (stage === 'Feedback Details') rsProps?.setCTA(cta)
    return () => {
      rsProps?.setCTA([])
    }
  }, [stage])
}

export const useFeedbackLinkCTA = (
  rsProps: IRightSection<{}> | undefined,
  onNewFeedback: () => void,
  stage: createFeedbackStage
) => {
  const cta: IRsPropsCTA[] = [
    {
      title: 'New Feedback Link',
      buttonType: 'outlined',
      action: onNewFeedback
    }
  ]
  useEffect(() => {
    if (stage === 'Feedback Link') rsProps?.setCTA(cta)
    return () => {
      rsProps?.setCTA([])
    }
  }, [stage])
}

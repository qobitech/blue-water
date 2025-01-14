import { useEffect } from 'react'
import { IRightSection, IRsPropsCTA } from '../../layout/right-section/utils'
import { GenerateSVG } from '../../utils/svgs'
import { createFeedbackStage } from './utils'

export const useGenerateFeedbackLinkCTA = (
  rsProps: IRightSection<{}> | undefined,
  onGenerate: () => void,
  stage: createFeedbackStage,
  isFeedbackLink: boolean,
  onNewFeedback: () => void
) => {
  const cta: IRsPropsCTA[] = isFeedbackLink
    ? [
        {
          title: 'New Feedback Link',
          buttonType: 'outlined',
          action: onNewFeedback
        }
      ]
    : [
        {
          title: 'Generate Feedback Link',
          buttonType: 'black',
          buttonSize: 'large',
          action: onGenerate,
          icon: <GenerateSVG color="#fff" />
        }
      ]
  useEffect(() => {
    if (stage === 'Preview') rsProps?.setCTA(cta)
    return () => {
      rsProps?.setCTA([])
    }
  }, [stage, isFeedbackLink])
}

import { useEffect } from 'react'
import { IRightSection, IRsPropsCTA } from '../../layout/right-section/utils'
import { RecordSVG, TapeRecordSVG } from '../../utils/svgs'

export const useRecordSectionCTA = (
  rsProps: IRightSection<{}> | undefined,
  onJustRecord: () => void,
  onViewProductRecord: () => void
) => {
  const audioOptionCTA: IRsPropsCTA[] = [
    {
      title: 'Record Feedback',
      icon: <RecordSVG color="#fff" />,
      actionType: 'multiple',
      buttonType: 'bold',
      actionOptions: [
        {
          label: 'Just Record',
          action: onJustRecord
        },
        {
          label: 'Use Product while recording',
          action: onViewProductRecord,
          disabled: true
        }
      ]
    }
  ]

  useEffect(() => {
    rsProps?.setCTA(audioOptionCTA)

    return () => {
      rsProps?.setCTA([])
    }
  }, [])
}

export const usePrepSectionCTA = (
  rsProps: IRightSection<{}> | undefined,
  onStartRecord: () => void,
  timeLeft: number
) => {
  const prepCTA: IRsPropsCTA[] = [
    {
      title: 'Start Recording',
      action: timeLeft === 0 ? onStartRecord : undefined,
      buttonType: timeLeft === 0 ? 'bold' : 'disabled',
      icon: <TapeRecordSVG color="#fff" />
    }
  ]

  useEffect(() => {
    rsProps?.setCTA(prepCTA)

    return () => {
      rsProps?.setCTA([])
    }
  }, [timeLeft])
}

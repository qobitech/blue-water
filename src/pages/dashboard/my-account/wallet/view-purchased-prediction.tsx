import { useEffect } from 'react'
import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { useGetMultiPredictionByID } from '../../../../api/multi-prediction'
import { Loader2 } from '../../../../components/utils/hooks'
import { CardItems, ICardItem } from '../../bet-channel/by-id/data'

const PurchasePrediction = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const multiBetProps = useGetMultiPredictionByID()

  useEffect(() => {
    multiBetProps.mutate({ query: `/paid?_id=${rsProps?.dataById}` })
  }, [])

  const prediction = multiBetProps?.data?.data?.multiplePredictions?.[0]

  if (!prediction) {
    if (multiBetProps?.isLoading) return <Loader2 loader />
    return <>Prediction not found</>
  }

  const dataArray: ICardItem[] = [
    {
      title: 'Code',
      value: prediction?.code,
      copy: true
    },
    {
      title: 'Bookie',
      value: prediction?.bookie
    },
    {
      title: 'Odds',
      value: prediction?.odds
    },
    {
      title: 'Start Date',
      value: new Date(prediction?.startDate).toDateString()
    },
    {
      title: 'End Date',
      value: new Date(prediction?.endDate).toDateString()
    }
  ]

  return (
    <>
      <div className="grid-wrapper-40 gap-40 border rounded p-4">
        {dataArray.map((i, index) => (
          <CardItems
            title={i.title}
            value={i.value}
            key={index}
            copy={i.copy}
          />
        ))}
      </div>
    </>
  )
}

export default PurchasePrediction

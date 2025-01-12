import { useEffect } from 'react'
import { useGetMultiPredictions } from '../../../api/multi-prediction'
import { IGlobalRightSection } from '../../../components/layout/right-section/utils'
import { ViewChannelComponent } from '../channels/view'

const ViewChannel = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const multiProps = useGetMultiPredictions()

  useEffect(() => {
    multiProps.mutate({ query: `?itemId=${rsProps?.action?.id}` })
  }, [])

  const channel = multiProps.data.data.multiplePredictions?.[0]?.channel

  return <ViewChannelComponent channel={channel} />
}

export default ViewChannel

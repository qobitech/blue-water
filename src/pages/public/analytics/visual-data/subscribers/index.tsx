import { VisualDataWrapper } from '../wrapper'
import { ISubscribersData } from '..'
import SubscribersBarChart from '../subscribers-bar-chart'

const Subscribers = ({ subscribers }: { subscribers: ISubscribersData[] }) => {
  const subscribersData = subscribers?.reduce<
    Array<{ label: string; value: string }>
  >((t, i, index) => {
    t.push({
      ...i,
      value:
        index === 0
          ? i.value
          : parseInt(t[index - 1].value) + parseInt(i.value) + ''
    })
    return t
  }, [])

  return (
    <VisualDataWrapper>
      <SubscribersBarChart
        data={
          subscribersData as Array<{
            label: string
            value: string
          }>
        }
      />
    </VisualDataWrapper>
  )
}

export default Subscribers

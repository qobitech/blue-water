import { VisualDataWrapper, categories } from '../wrapper'
import VisualDataBarChart from '../bar-chart'
import { IBetPerformance } from '..'

const Performance = ({
  betPerformance
}: {
  betPerformance: IBetPerformance[]
}) => {
  const dataSet = [
    {
      seriesname: 'games won',
      data: betPerformance?.map((i) => ({ value: i.win + '' })) || [
        { win: '0' }
      ]
    },
    {
      seriesname: 'total games played',
      data: betPerformance?.map((i) => ({ value: i.played + '' })) || [
        { loss: '0' }
      ]
    }
  ]

  const chart = {
    caption: 'Performance',
    subcaption: 'Insights on game performance',
    xaxisname: 'Month',
    yaxisname: '',
    formatnumberscale: '1',
    plottooltext: '<b>$dataValue $seriesName</b> in $label',
    theme: 'fusion',
    drawcrossline: '1'
  }
  return (
    <VisualDataWrapper>
      <VisualDataBarChart
        categories={[{ category: categories }]}
        dataset={dataSet}
        chart={chart}
      />
    </VisualDataWrapper>
  )
}

export default Performance

import { VisualDataWrapper, categories } from '../wrapper'
import VisualDataBarChart from '../bar-chart'
import { IUpVotes } from '..'

const Upvotes = ({ upvotes }: { upvotes: IUpVotes[] }) => {
  const dataSet = [
    {
      seriesname: 'upvotes',
      data: upvotes?.map((i) => ({ value: i.upvotes + '' })) || [{ value: '0' }]
    }
  ]

  const chart = {
    caption: 'Up Votes',
    subcaption: 'Insights on upvotes',
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

export default Upvotes

import { VisualDataWrapper, categories } from '../wrapper'
import VisualDataBarChart from '../bar-chart'
import { ICustomerRating } from '..'

const Rating = ({ customerRating }: { customerRating: ICustomerRating[] }) => {
  const dataSet = [
    {
      seriesname: 'customer rating',
      data: customerRating?.map((i) => ({ value: i.rating + '' })) || [
        { value: '0' }
      ]
    }
  ]

  const chart = {
    caption: 'Customer Rating',
    subcaption: 'Insights on customer rating',
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

export default Rating

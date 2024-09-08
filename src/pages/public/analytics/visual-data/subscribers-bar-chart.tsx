import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const chart = {
  caption: 'Subscribers',
  yaxisname: '',
  subcaption: 'Insights on subscribers activity',
  legendposition: 'Right',
  drawanchors: '0',
  showvalues: '0',
  theme: 'fusion'
}

export interface ISubscribersBarChart {
  data: Array<{
    label: string
    value: string
  }>
}

const SubscribersBarChart: React.FC<ISubscribersBarChart> = ({ data }) => {
  const ds = { chart, data }

  return (
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    <ReactFC
      type="area2d"
      width="100%"
      height="460"
      dataFormat="JSON"
      dataSource={ds}
    />
  )
}

export default SubscribersBarChart

/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

interface IChart {
  caption: string
  subcaption: string
  xaxisname: string
  yaxisname: string
  formatnumberscale: string
  plottooltext: string
  theme: string
  drawcrossline: string
}

export interface IVisualDataBarChart {
  categories: Array<{
    category: Array<{
      label: string
    }>
  }>
  dataset: Array<{
    seriesname: string
    data: Array<{
      value: string
    }>
  }>
  chart: IChart
}

const VisualDataBarChart: React.FC<IVisualDataBarChart> = ({
  dataset,
  categories,
  chart
}) => {
  const ds = { chart, dataset, categories }

  return (
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    <ReactFC
      type="mscolumn2d"
      width="100%"
      height="460"
      dataFormat="JSON"
      dataSource={ds}
    />
  )
}

export default VisualDataBarChart

import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const chart = {
  caption: '',
  subcaption: '',
  plottooltext: '<b>$percentValue</b> of Multiple <b>$label</b>',
  showlegend: '1',
  showpercentvalues: '1',
  legendposition: 'bottom',
  usedataplotcolorforlabels: '1',
  theme: 'fusion',
  defaultcenterlabel: 'Total Performance',
  aligncaptionwithcanvas: '0',
  captionpadding: '0',
  decimals: '1',
  centerlabel: 'Multiple: $value'
}

export interface IPerformancePieChart {
  data: Array<{
    label: string
    value: string
  }>
}

const PerformancePieChart: React.FC<IPerformancePieChart> = ({ data }) => {
  const ds = { chart, data }

  return (
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    <ReactFC
      type="doughnut2d"
      width="100%"
      height="460"
      dataFormat="JSON"
      dataSource={ds}
    />
  )
}

export default PerformancePieChart

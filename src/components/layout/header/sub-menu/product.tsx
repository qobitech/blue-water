import {
  ActionItemsSVG,
  AnalysisSVG,
  AppSVG,
  CategorizationSVG,
  FeedbackMenuSVG,
  HighlightingSVG,
  InsightsSVG,
  MicSVG,
  ReportMenuSVG,
  SummarizationSVG,
  TranscriptionSVG,
  WidgetSVG
} from '../../../utils/svgs'

const productSubmenuItems = [
  {
    title: 'Text Feedback',
    icon: <FeedbackMenuSVG />
  },
  {
    title: 'Audio Feedback',
    icon: <MicSVG />
  },
  {
    title: 'Feedback Insights Generator',
    icon: <InsightsSVG />
  },
  {
    title: 'Action Items Generator',
    icon: <ActionItemsSVG />
  }
]
const featuresSubmenuItems = [
  {
    title: 'Auto Feedback Categorization',
    icon: <CategorizationSVG />
  },
  {
    title: 'Keyword Highlighting',
    icon: <HighlightingSVG />
  },
  {
    title: 'Sentiment & Thematic Analysis',
    icon: <AnalysisSVG />
  },
  {
    title: 'Audio to Text Transcription',
    icon: <TranscriptionSVG />
  },
  {
    title: 'Custom Report Builder',
    icon: <ReportMenuSVG />
  },
  {
    title: 'Insight Summarization',
    icon: <SummarizationSVG />
  }
]
const appsSubmenuItems = [
  {
    title: 'Website Widgets',
    icon: <WidgetSVG />
  },
  {
    title: 'Web Application',
    icon: <AppSVG />
  }
]

export const ProductSubMenu = ({ id }: { id?: string }) => {
  return (
    <div className="grid-wrapper-30 gap-33">
      <div className="f-column-17 sub-menu-product-product">
        <h5>Products</h5>
        <ul className="f-column-17">
          {productSubmenuItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              <div className="icon-container">{i.icon}</div>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="f-column-17 sub-menu-product-features">
        <h5>Features</h5>
        <ul className="f-column-17">
          {featuresSubmenuItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              <div className="icon-container">{i.icon}</div>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="f-column-13 sub-menu-product-features">
        <h5>Apps</h5>
        <ul className="f-column-7">
          {appsSubmenuItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              <div className="icon-container">{i.icon}</div>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

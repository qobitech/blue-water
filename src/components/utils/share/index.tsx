import { ShareBlogComponentData, ShareComponent } from './component'
import { useCopy } from '../hooks'
import { IGlobalRightSection } from '../../layout/right-section'
import { CheckSVG, CopySVG, ShareSVG } from '../svgs'

export const shareCategoryEnum = {
  BETTIPS: 'bet tips',
  PREDICTNWIN: 'predict n win',
  WINNERANNOUNCEMENT: 'winner announcement'
} as const

export type shareCategoryType =
  (typeof shareCategoryEnum)[keyof typeof shareCategoryEnum]

export interface IShareProps {
  baseurl?: string
  description: string
  title: string
  url: string
  cta?: string
  category: shareCategoryType
  grandPrize?: string
  userName?: string
  winnerPosition?: string
}

const getBetTipsContent = (description: string, base: string, cta?: string) => {
  return `${description}<br/><br/>
  ${cta || 'Click here to view channel'}: &nbsp;${base}
  <br/><br/>
  Bet Responsibly
  <br/><br/>
  Check out more predictions at: <b>https://mytipster.pro<b/>`
}

const getWinnerAnnouncementContent = (
  grandPrize?: string,
  userName?: string,
  winnerPosition?: string
) => {
  return `🎉 Congratulations to ${userName}! 
  
🏆 You just won the Predict and Win game on Mytipster.pro, taking ${winnerPosition} place and earning a prize of ${grandPrize}! 

Send us a DM to claim your prize

Stay tuned for more exciting opportunities! #mytipsterpro #PredictAndWin #Winner #Congrats`
}

const Share = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>
  const { shareProps } = globalContext
  if (!shareProps) return <></>

  const {
    cta,
    description,
    title,
    url,
    category,
    grandPrize,
    userName,
    winnerPosition
  } = shareProps

  const copyProps = useCopy()

  const base = `https://${window.location.hostname}${
    window.location.port ? ':' + window.location.port : ''
  }${url}`.replace('&', '%26')

  const getContent = () => {
    switch (category) {
      case 'bet tips':
        return getBetTipsContent(description, base, cta)
      case 'winner announcement':
        return getWinnerAnnouncementContent(
          grandPrize,
          userName,
          winnerPosition
        )
      default:
        return ''
    }
  }

  const getShareContent = () => {
    const content = getContent()
    return content
      .replace('<br/>', '\n')
      .replace('&nbsp;', ' ')
      .replace(/<[^>]+>/g, '')
  }

  const shareContent = getShareContent()

  const handleCopy = () => {
    copyProps.copy(shareContent)
    copyProps.setAction('copied')
  }

  const shareComponentProps = {
    baseUrl: base,
    title,
    shareContent
  }

  return (
    <>
      <div className="mx-auto f-column-33 py-5 p-lg-0 w-100">
        <div className="text-center">
          <p style={{ fontSize: '18px' }}>
            Share&nbsp;&nbsp;
            <ShareSVG />
          </p>
        </div>
        <div>
          <ul className="w-100 mx-0 px-0 grid-wrapper-40 gap-15">
            {ShareBlogComponentData(shareComponentProps).map((i) => {
              return (
                <ShareComponent
                  key={i.id}
                  href={i.href}
                  title={i.title}
                  dataAction={i.dataAction}
                  name={i.name}
                  icon={i.icon}
                />
              )
            })}
          </ul>
        </div>

        <div className={`mt-5 mt-md-3 mb-md-3`}>
          <div
            className="f-row-7 hw-mx mx-auto cursor-pointer aic"
            onClick={handleCopy}
          >
            {copyProps.copySuccess ? <CheckSVG /> : <CopySVG />}
            <p className="m-0 color-brand text-little">
              {copyProps.copySuccess ? 'Copied' : 'Click to Copy Share Message'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Share

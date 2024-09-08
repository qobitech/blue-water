import { ChannelMenuSVG } from '../components/utils/svgs'

export const displayAd = 'd-none'

export const AdTopBanner1296X70 = () => {
  return (
    <div className={`add_top_banner rounded ${displayAd} mt-4`}>
      <p className="m-0 text-small color-light">
        <span>
          <ChannelMenuSVG />
        </span>
        AD PLACEMENT
      </p>
      <p className="text-little m-0 mt-1">1296 X 70</p>
    </div>
  )
}

export const AdBottomBanner1296X70 = () => {
  return (
    <div className={` add_banner_card rounded ${displayAd} mb-4`}>
      <p className="m-0 text-small color-light">
        <span>
          <ChannelMenuSVG />
        </span>
        AD PLACEMENT
      </p>
      <p className="text-little m-0 mt-1">1296 X 70</p>
    </div>
  )
}

export const AdSideRightBannerI221X101 = () => {
  return (
    <div className={`text-center py-4 w-100 ${displayAd} flex-column`}>
      <p className="color-light m-0 text-small">
        <span>
          <ChannelMenuSVG />
        </span>
        AD PLACEMENT
      </p>
      <p className="text-little m-0 mt-1">221 X 123</p>
    </div>
  )
}

export const AdSideRightBannerII = () => {
  return (
    <div className={`text-center py-4 w-100 ${displayAd} flex-column`}>
      <p className="color-light m-0 text-small">
        <span>
          <ChannelMenuSVG />
        </span>
        AD PLACEMENT
      </p>
    </div>
  )
}

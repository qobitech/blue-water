import { CardItems, OverViewHeader } from '../../utils/card-items'
import { TwitterSVG } from '../../utils/svgs'
import {
  LinkedinSVG,
  TelegramSVG,
  WhatsappSVG
} from '../../utils/svgs/f-awesome'

export const Status = () => {
  return (
    <div
      className="bg-light rounded-30 m-auto p-5 f-column-33 w-100"
      style={{ flexShrink: 0 }}
    >
      <div className="f-row-43 aic w-100 sm-link-section">
        <h4>Feedback Link generated successfully</h4>
      </div>
      <CardItems
        copy
        title="Feedback Link"
        value={'https://bluewater.com/sdfdffe'}
      />
      <div className="f-column-11 share-link-section">
        <OverViewHeader title="Share link on" />
        <div className="f-row-43 aic w-100 sm-link-section">
          <TwitterSVG />
          <LinkedinSVG />
          <WhatsappSVG />
          <TelegramSVG />
        </div>
      </div>
    </div>
  )
}

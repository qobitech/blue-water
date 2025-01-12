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
      className="border-label bg-light rounded-30 m-auto p-5 f-column-33 w-100"
      style={{ flexShrink: 0 }}
    >
      <CardItems
        copy
        title="Feedback Link"
        value={'https://tevotea.com/sdfdffe'}
      />
      <div className="f-column-11">
        <OverViewHeader title="Share link on" />
        <div className="f-row-43 aic w-100">
          <TwitterSVG />
          <LinkedinSVG />
          <WhatsappSVG />
          <TelegramSVG />
        </div>
      </div>
    </div>
  )
}

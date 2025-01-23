import { IFeedBack } from '../../../pages/public/landing-page/data'

export const FeedBackCard = ({
  subject,
  requester,
  company,
  category,
  onCompany,
  color,
  totalFeedback,
  onWatchDemo,
  companyWebsite
}: IFeedBack) => {
  return (
    <div
      className="rounded px-5 py-5 f-column-33 cursor-pointer"
      style={{
        maxWidth: '650px',
        flexShrink: 0,
        background: `linear-gradient(35deg, ${color?.to}, ${color?.from})`
      }}
    >
      <div className="f-column-15 text-center">
        <div className="f-column">
          <div className="f-column-15 aic pb-1 jcsb">
            <div className="f-column aic pb-1 jcsb">
              <p className="m-0 font-12 color-label">{requester}</p>
              <p className="font-11 m-0">@</p>
              <p
                className={`font-13 color-label m-0 ${
                  companyWebsite
                    ? 'text-decoration-underline cursor-pointer'
                    : ''
                }`}
                onClick={() => {
                  if (companyWebsite) {
                    window.open(companyWebsite, '_blank')
                  }
                }}
              >
                {company}
              </p>
            </div>
            <div
              className="text-center card-category position-relative rounded-40 px-2 py-1 hw-mx mx-auto"
              style={{ border: `0.001rem solid ${color?.text}` }}
            >
              <p
                className="m-0 font-9"
                style={{ color: color?.text, letterSpacing: '1.2px' }}
              >
                {category}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-4 p-5">
          <h5 className="m-0 font-21" style={{ lineHeight: '2.1rem' }}>
            {subject}
          </h5>
        </div>
      </div>
      <div className="f-row-10 aic jcsb mt-auto">
        <div className="text-center">
          <p className="font-12 m-0 color-label">
            {totalFeedback.toLocaleString()} feedback collected
          </p>
        </div>
        <div className="f-row-4 aic hw-mx cursor-pointer" onClick={onWatchDemo}>
          <p
            className="m-0 font-11 text-little "
            style={{ color: color?.text }}
          >
            <b>Watch Demo / Presentation</b>
          </p>
          {/* <MicSVG color={color?.text} /> */}
        </div>
      </div>
    </div>
  )
}

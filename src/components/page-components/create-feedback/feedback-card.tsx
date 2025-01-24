import { EditSVG, GenerateSVG } from '../../utils/svgs'
import { IFeedBackCard } from './utils'

export const FeedBackCard = ({
  subject,
  requester,
  company,
  category,
  color,
  onGenerateLink,
  companyWebsite,
  onNewFeedback,
  isFeedbackLink,
  onClose,
  onEdit
}: IFeedBackCard) => {
  return (
    <div
      className="rounded px-5 py-5 f-column-33 w-100"
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
        <div className="pt-4 py-4 f-column-17 aic">
          <h5 className="m-0 font-21" style={{ lineHeight: '2.1rem' }}>
            {subject}
          </h5>
          {!isFeedbackLink && (
            <div
              className="f-row-7 aic hw-mx cursor-pointer"
              onClick={!isFeedbackLink ? onEdit : onClose}
            >
              {!isFeedbackLink ? <EditSVG color={color?.text} /> : null}
              <p
                className="m-0 font-11 text-little "
                style={{ color: color?.text }}
              >
                {!isFeedbackLink ? 'Edit' : 'Close'}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="f-column aic jcc mt-auto">
        <div
          className="f-row-7 aic hw-mx cursor-pointer py-3 px-4 rounded-33"
          onClick={isFeedbackLink ? onNewFeedback : onGenerateLink}
          style={{ border: `0.1px solid ${color?.text}` }}
        >
          {!isFeedbackLink && <GenerateSVG color={color?.text} />}
          <p
            className="m-0 font-12 text-little "
            style={{ color: color?.text }}
          >
            {isFeedbackLink ? 'New Feedback' : 'Generate Feedback Link'}
          </p>
        </div>
      </div>
    </div>
  )
}

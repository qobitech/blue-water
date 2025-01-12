import { FC } from 'react'
import { _isMobile } from '../../utils/helper'
import { CardItems, OverViewHeader } from '../../utils/card-items'
import { defaultDetails, IFeedbackCardProps } from './utils'
import { ColorSelection } from './color-selection'

export const FeedbackCard: FC<IFeedbackCardProps> = ({
  feedbackDetails,
  color,
  handleColor
}) => {
  const onCompany = () => {}

  const isUrl = !!feedbackDetails.companyUrl

  return (
    <div className="f-column-17">
      <ColorSelection handleColor={handleColor} selectedColor={color} />
      <div
        className={`rounded-33 ${_isMobile() ? 'p-4' : 'p-5'} f-column-33`}
        style={{
          background: `linear-gradient(135deg, ${color?.from}, ${color?.to})`
        }}
      >
        <div className="f-column">
          <div className="f-row-20 aic pb-1 feedback-card-header-section">
            <div className="f-column feedback-card-header-right-section">
              <p className="m-0 text-medium">
                {feedbackDetails.fullName || defaultDetails.fullName}
              </p>
              <p className="text-tiny color-label m-0">
                {feedbackDetails.jobTitle || defaultDetails.jobTitle} at{' '}
                <span
                  className={`${
                    isUrl ? 'text-decoration-underline cursor-pointer' : ''
                  }`}
                  onClick={onCompany}
                >
                  {feedbackDetails.company || defaultDetails.company}
                </span>
              </p>
            </div>
            <p className="m-0 font-11 txt-brand hw-mx py-1 px-2 rounded-10 bg-brand">
              {feedbackDetails.category}
            </p>
          </div>
        </div>
        <div className="question-feedback">
          <OverViewHeader title="Question" />
          <h4 className="mt-2">
            <b>{feedbackDetails.subject || defaultDetails.subject}</b>
          </h4>
        </div>
        <div className="context-feedback">
          <CardItems
            title="Purpose"
            value={feedbackDetails.purpose || defaultDetails.purpose}
          />
        </div>
      </div>
    </div>
  )
}

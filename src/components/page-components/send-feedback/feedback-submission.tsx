import { FC } from 'react'
import { IFeedbackSubmission } from './utils'
import { CheckSVG } from '../../utils/svgs'

export const FeedbackSubmission: FC<IFeedbackSubmission> = ({
  handleClose,
  handleRecord
}) => {
  return (
    <div
      className="f-column-33 aic jcc text-center w-100"
      style={{ height: '70vh' }}
    >
      <div className="f-row-12 aic jcc">
        <h4 className="m-0">Submission Complete</h4>
        <CheckSVG />
      </div>
      <div className="f-row-11 aic">
        <div
          className="f-row-11 aic hw-mx px-3 py-2 bg-light rounded cursor-pointer"
          style={{ height: '35px' }}
          onClick={handleClose}
        >
          <p className="text-tiny m-0">Close</p>
        </div>
        <div
          className="f-row-11 aic hw-mx px-3 py-2 rounded-43 cursor-pointer"
          style={{ height: '35px' }}
          onClick={handleRecord}
        >
          <p className="text-tiny m-0 color-label text-decoration-underline">
            New feedback
          </p>
        </div>
      </div>
    </div>
  )
}

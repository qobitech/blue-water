import { FC } from 'react'
import { BottomAngleSVG } from '../../utils/svgs/f-awesome'
import { IFeedbackActions } from './utils'

export const FeedbackActions: FC<IFeedbackActions> = ({
  handleAudio,
  handleText,
  handleWatchDemo,
  watchDemo,
  color
}) => {
  const actions = [
    {
      label: 'Text',
      disabled: false,
      hide: false,
      action: handleText
    },
    {
      label: 'Audio',
      disabled: false,
      hide: false,
      action: handleAudio
    }
  ]
  return (
    <div className="f-row-11 aic">
      <div className="dropdown">
        <div
          className="f-row-11 aic hw-mx px-3 py-2 rounded-43 rounded cursor-pointer dropdown-toggle"
          style={{
            height: '35px',
            background: `linear-gradient(35deg, ${color?.to}, ${color?.from})`
          }}
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <p className="text-tiny m-0" style={{ color: color.text }}>
            Give feedback
          </p>
          <BottomAngleSVG color="#bababa" />
        </div>
        <div
          className="dropdown-menu mr-4 mt-2 px-2"
          aria-labelledby="dropdownMenuButton"
        >
          {actions
            ?.filter((i) => !i.hide)
            .map((i, index) => (
              <p
                className={`dropdown-item m-0 py-2 text-tiny ${
                  i.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={i.disabled ? undefined : i.action}
                key={index}
                style={{ color: i.disabled ? '#898989' : '' }}
              >
                {i.label}
              </p>
            ))}
        </div>
      </div>
      <div
        className="f-row-11 aic hw-mx px-3 py-2 rounded-43 cursor-pointer"
        style={{ height: '35px' }}
        onClick={handleWatchDemo}
      >
        <p className="text-tiny m-0 color-label">
          {watchDemo ? 'Close' : 'Watch'} Demo
        </p>
      </div>
    </div>
  )
}

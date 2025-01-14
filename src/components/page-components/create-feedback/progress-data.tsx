import { CheckSVG } from '../../utils/svgs'
import { createFeedbackStage, IStageArray } from './utils'

export const ProgressData = ({ stage }: { stage: createFeedbackStage }) => {
  const stageArray: IStageArray[] = [
    { stage: 'Feedback Campaign', isComplete: false },
    { stage: 'Authentication', isComplete: false },
    { stage: 'Generate Feedback Link', isComplete: false }
  ]

  const pClass = (i: string) =>
    `m-0 text-tiny ${
      stage === i ? 'text-success fw-bold' : 'fw-light color-label'
    }`

  const numberStyle = { borderRadius: '50%', width: '20px', height: '20px' }

  return (
    <div className="w-100 pb-3">
      <div className="f-row-17 aic jcsb">
        {stageArray.map((i, index) => {
          const isLast = index + 1 === stageArray.length
          return (
            <div
              key={index}
              className={`f-row-17 align-items-center`}
              style={{ flexShrink: 0, flexGrow: isLast ? 0 : 1 }}
            >
              <div className="f-row-7 align-items-center hw-mx">
                {i.isComplete ? (
                  <CheckSVG width="15" height="15" color="green" />
                ) : (
                  <div
                    style={numberStyle}
                    className="border p-2 f-row align-items-center justify-content-center"
                  >
                    <p className="m-0 text-tiny font-9">{index + 1}</p>
                  </div>
                )}
                <p className={pClass(i.stage)}>{i.stage}</p>
              </div>
              {!isLast ? (
                <div
                  className="border-label-bottom f-row"
                  style={{ flexGrow: 1, flexShrink: 0 }}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

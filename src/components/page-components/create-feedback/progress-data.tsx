import { createFeedbackStage, stages } from './utils'

export const ProgressData = ({ stage }: { stage: createFeedbackStage }) => {
  const numberStyle = { borderRadius: '50%', width: '20px', height: '20px' }

  const currentIndex = stages.findIndex((i) => i === stage)

  const lineStyle = { flexGrow: 1, flexShrink: 0 }

  return (
    <div className="w-100 pb-3">
      <div className="w-100 pb-3 text-center">
        <p className="m-0 text-tiny font-11">
          {currentIndex + 1} of {stages.length}
        </p>
      </div>
      <div className="f-row-17 aic jcsb">
        {stages
          .filter((i) => i === stage)
          .map((i, index) => {
            return (
              <div
                key={index}
                className={`f-row-17 align-items-center`}
                style={lineStyle}
              >
                <div className=" f-row" style={lineStyle} />
                <div className="f-row-7 align-items-center hw-mx">
                  <div
                    style={numberStyle}
                    className="border p-2 f-row align-items-center justify-content-center"
                  >
                    <p className="m-0 text-tiny font-9">{currentIndex + 1}</p>
                  </div>
                  <p className="m-0 text-tiny text-success fw-bold">{i}</p>
                </div>
                <div className=" f-row" style={lineStyle} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

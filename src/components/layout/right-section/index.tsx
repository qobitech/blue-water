import { Children } from 'react'
import { TypeButton } from '../../utils/button'
import { Loader2, LogoAnimated } from '../../utils/hooks'
import TextPrompt from '../../utils/text-prompt'
import './index.scss'
import { LeftAngleSVG } from '../../utils/svgs/f-awesome'
import { ActionComponent } from '../../utils/reusable'
import { IRSection } from './utils'

const RightSection = <T extends {}>({
  children,
  rsProps,
  globalContext
}: IRSection<T>) => {
  const matchChild: any = Children.map(children, (child) => {
    if (child)
      return { ...child, props: { ...child.props, rsProps, globalContext } }
    return child
  })

  const isTitleString = typeof rsProps.title === 'string'

  const ctaLoad = rsProps.cta.reduce<{ status: boolean; text: string }>(
    (t, i) => {
      if (i.load) t = { status: true, text: i?.loadText || '' }
      return t
    },
    { status: false, text: '' }
  )

  const isCTASectIon = !!rsProps.cta.length || rsProps.audioProps

  return (
    <>
      {rsProps.openSection ? (
        <div className="back-drop" onClick={rsProps.closeSection} />
      ) : null}
      <div
        id="right-section"
        className={`right_container ${
          rsProps.openSection ? 'menuopen' : 'menuclose'
        } ${rsProps.max ? 'max' : ''}`}
      >
        <div className="rs-header aic">
          <div className="ctas">
            <TypeButton
              title=""
              close
              buttonType="danger"
              buttonSize="small"
              buttonShape="curve"
              onClick={rsProps.closeSection}
            />
          </div>
          {isTitleString ? <h3>{rsProps.title}</h3> : rsProps.title}
          <div className="ml-auto">
            <LogoAnimated />
          </div>
        </div>
        {rsProps.isSectionHistory ? (
          <div
            className="mt-auto py-3 cursor-pointer f-row-7 aic"
            onClick={() => {
              rsProps.removeRightSectionHistory()
            }}
          >
            <LeftAngleSVG />
            <p className="m-0 text-little">Back</p>
          </div>
        ) : null}
        {rsProps.title ? (
          <div className="rs-body position-relative">
            {matchChild}
            <div
              className="position-fixed bg-white border-label-top shadow w-100 py-4 justify-content-between align-items-center px-4"
              style={{
                bottom: 0,
                left: 0,
                display: isCTASectIon ? 'flex' : 'none',
                zIndex: 50
              }}
            >
              <div className="mx-auto f-row-17" style={{ width: '94%' }}>
                {rsProps?.cta?.map((i, index) => (
                  <>
                    {i.actionType !== 'multiple' ? (
                      <TypeButton
                        title={i.title}
                        buttonType={ctaLoad.status ? 'disabled' : i.buttonType}
                        onClick={i.action}
                        buttonSize={i.buttonSize}
                        key={index}
                        icon={i.icon}
                      />
                    ) : (
                      <ActionComponent
                        title={i.title}
                        actions={i.actionOptions}
                        buttonType={i.buttonType}
                        icon={i.icon}
                      />
                    )}
                  </>
                ))}
              </div>
              {/* <div>
                <RefreshComponent load={ctaLoad.status} text={ctaLoad.text} />
              </div> */}
            </div>
          </div>
        ) : (
          <div>
            {rsProps.data !== null && !rsProps.data ? (
              <div className="pt-3">
                <TextPrompt prompt="Something went wrong" status={false} />
              </div>
            ) : (
              <Loader2 loader />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default RightSection

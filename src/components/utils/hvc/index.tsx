import { PulseSVG } from '../svgs'

interface IHVC
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  view?: boolean
  children?: any
  removeDOM?: boolean
}

export const HVC: React.FC<IHVC> = ({
  view,
  children,
  className,
  removeDOM,
  ...props
}) => {
  if (removeDOM)
    return (
      <>
        {view ? (
          <div className={`${className}`} {...props}>
            {children}
          </div>
        ) : null}
      </>
    )

  return (
    <div className={`${view ? '' : 'd-none'} ${className}`} {...props}>
      {children}
    </div>
  )
}

interface IHVCLoad
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  view?: boolean
  children?: any
  removeDOM?: boolean
  load?: boolean
  loadTxt?: string
}
export const HVCLoad: React.FC<IHVCLoad> = ({
  view,
  children,
  className,
  removeDOM,
  load,
  loadTxt,
  ...props
}) => {
  if (load)
    return (
      <div className="f-row-10 aic hw-mx">
        <PulseSVG />
        {loadTxt ? <p className="m-0 text-little">{loadTxt}</p> : null}
      </div>
    )

  if (removeDOM)
    return (
      <>
        {view ? (
          <div className={`${className}`} {...props}>
            {children}
          </div>
        ) : null}
      </>
    )

  return (
    <div className={`${view ? '' : 'd-none'} ${className}`} {...props}>
      {children}
    </div>
  )
}

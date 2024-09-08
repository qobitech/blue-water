import TextPrompt from '../text-prompt'
import '../index.scss'
import './style.scss'
import { HVC } from '../hvc'
import { BottomAngleSVG } from '../svgs/f-awesome'
import { forwardRef } from 'react'

export interface IOptionsData {
  id: string | number
  label: string
  value: string | number
  hide?: boolean | undefined
}

interface ISelect extends React.ComponentPropsWithoutRef<'select'> {
  label?: string
  error?: string | undefined
  optionsdata?: IOptionsData[]
  initoption: { label: string; value: string | number }
  customwidth?: string | number
  load?: boolean
  disableInit?: boolean
  cta?: {
    title: string
    action: () => void
    icon: string
  }
}

const getStyleValue = (value: string | number) => {
  if (typeof value === 'string')
    return value.includes('%')
      ? value
      : value.includes('px')
      ? value
      : value + 'px'
  else return value + 'px'
}

// eslint-disable-next-line react/display-name
export const TypeSelect = forwardRef(
  (
    {
      label,
      error,
      optionsdata,
      initoption,
      customwidth,
      load,
      disableInit,
      cta,
      ...props
    }: ISelect,
    ref
  ) => {
    return (
      <div
        className="form-control-container"
        style={{ maxWidth: getStyleValue(customwidth || '') }}
      >
        <div className="f-row jcsb w-100">
          {label && (
            <div className="f-row aic jcsb w-100">
              <label
                className="input-label-component"
                htmlFor={props.id || props.name}
              >
                {label}
              </label>

              {cta?.title && (
                <p
                  className="text-little m-0 mb-2 cursor-pointer"
                  onClick={cta?.action}
                >
                  {cta?.icon && (
                    <span>
                      <i className={cta.icon} />
                      &nbsp;&nbsp;
                    </span>
                  )}
                  {cta?.title}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className="w-100 position-relative"
          style={{ maxWidth: getStyleValue(customwidth || '') }}
        >
          <div
            className="position-absolute pr-2 h-100 f-row aic"
            style={{ right: 0, zIndex: 0 }}
          >
            <BottomAngleSVG />
          </div>
          <select
            className={`select-input ${props.className} ${
              error ? 'iserror' : ''
            }`}
            ref={ref as React.LegacyRef<HTMLSelectElement> | undefined}
            {...props}
            style={{
              ...props.style,
              width: customwidth || '',
              maxWidth: customwidth || ''
            }}
          >
            <option disabled={disableInit} value={initoption.value}>
              {initoption.label}
            </option>
            {optionsdata
              ?.filter((i) => !i.hide)
              ?.map((i) => (
                <option key={i.id} value={i.value}>
                  {i.label}
                </option>
              ))}
          </select>
        </div>
        <HVC removeDOM view={!!error} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

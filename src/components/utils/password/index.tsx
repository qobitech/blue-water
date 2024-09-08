import { forwardRef, useState } from 'react'
import TextPrompt from '../text-prompt'
import '../index.scss'
import '../input/style.scss'
import { EyeSlashSVG, EyeSVG } from '../svgs/f-awesome'
import { HVC } from '../hvc'

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string | undefined
  customwidth?: string | number
}

// eslint-disable-next-line react/display-name
export const TypePassword = forwardRef(
  ({ label, error, customwidth, ...props }: IInput, ref) => {
    const [show, setShow] = useState<boolean>(false)
    return (
      <div className="form-control-container">
        <div className="f-row jcsb w-100">
          {label && (
            <label
              className="input-label-component"
              htmlFor={props.id || props.name}
            >
              {label}
            </label>
          )}
        </div>
        <div className="position-relative" style={{ width: customwidth }}>
          <div
            className="position-absolute cursor-pointer f-row jce aic h-100 mr-3"
            style={{ top: 0, right: 0, zIndex: 1 }}
            onClick={() => setShow(!show)}
          >
            {show ? <EyeSVG /> : <EyeSlashSVG />}
          </div>
          <input
            {...props}
            type={show ? 'text' : 'password'}
            className={`type-text-input ${props.className}  ${
              error ? 'iserror' : ''
            }`}
            ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
            style={{ width: customwidth || '', maxWidth: customwidth || '' }}
          />
        </div>
        <HVC removeDOM view={!!error} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

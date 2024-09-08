import TextPrompt from '../text-prompt'
import '../index.scss'
import './style.scss'
import { HVC } from '../hvc'
import { forwardRef } from 'react'

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  customwidth?: string | number
  isonlyview?: boolean
  error?: string | undefined
  hideErrorTxt?: boolean
}

export const TypeInput = forwardRef(
  (
    { label, error, isonlyview, customwidth, hideErrorTxt, ...props }: IInput,
    ref
  ) => {
    return (
      <div
        className="form-control-container"
        style={{ width: customwidth || '' }}
      >
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
        <input
          {...props}
          className={`type-text-input ${props.className} ${
            isonlyview ? 'isview' : ''
          } ${error ? 'iserror' : ''}`}
          style={{ width: customwidth || '', maxWidth: customwidth || '' }}
          ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
        />
        <HVC removeDOM view={!!error && !hideErrorTxt} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

TypeInput.displayName = 'TypeInput'

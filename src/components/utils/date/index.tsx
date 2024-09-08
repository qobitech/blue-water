import { forwardRef } from 'react'
import TextPrompt from '../text-prompt'
import '../index.scss'
import './style.scss'
import { HVC } from '../hvc'

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string | undefined
  customwidth?: string | number
  isonlyview?: boolean
  hideErrorTxt?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeDate = forwardRef(
  (
    { label, error, isonlyview, customwidth, hideErrorTxt, ...props }: IInput,
    ref
  ) => {
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
        <input
          {...props}
          className={`type-text-input-date ${error ? 'iserror' : ''} ${
            isonlyview ? 'isview' : ''
          }`}
          ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
          type="datetime-local"
          style={{ maxWidth: customwidth || '' }}
        />
        <HVC removeDOM view={!!error && !hideErrorTxt} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

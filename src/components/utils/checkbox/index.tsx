import TextPrompt from '../text-prompt'
import '../index.scss'
import './style.scss'
import { forwardRef } from 'react'

interface ICheckbox extends React.ComponentPropsWithoutRef<'input'> {
  error?: string | undefined
}

export const TypeCheckbox = forwardRef(
  ({ error, ...props }: ICheckbox, ref) => {
    return (
      <div className="form-control-container">
        <input
          {...props}
          className={`text-check-box ${props.className}`}
          ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
          type="checkbox"
        />
        {!!error && (
          <>
            <div className="separator-h-1" />
            <TextPrompt prompt={error} status={false} />
          </>
        )}
      </div>
    )
  }
)

TypeCheckbox.displayName = 'TypeCheckbox'

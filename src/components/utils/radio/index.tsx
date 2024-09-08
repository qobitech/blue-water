import '../index.scss'
import './style.scss'
import TextPrompt from '../text-prompt'
import { forwardRef } from 'react'

interface IRadio extends React.ComponentPropsWithoutRef<'input'> {
  error?: string | undefined
}

// eslint-disable-next-line react/display-name
export const TypeRadio = forwardRef(({ error, ...props }: IRadio, ref) => {
  return (
    <div className="form-control-container">
      <input
        {...props}
        className={`text-radio ${props.className}`}
        ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
        type="radio"
      />
      {!!error && (
        <>
          <div className="separator-h-1" />
          <TextPrompt prompt={error} status={false} />
        </>
      )}
    </div>
  )
})

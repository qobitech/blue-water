import TextPrompt from '../text-prompt'
import { useCopy } from '../hooks'
import { CheckSVG, CopySVG } from '../svgs'
import { _removeHTML } from '../helper'
import { forwardRef } from 'react'
import { HVC } from '../hvc'

interface ITextArea extends React.ComponentPropsWithoutRef<'textarea'> {
  label?: string
  error?: string | undefined
  moreInfo?: string
  isonlyview?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeTextArea = forwardRef(
  ({ label, error, moreInfo, isonlyview, ...props }: ITextArea, ref) => {
    const copy = useCopy()
    return (
      <div className="f-column text-left">
        {label && (
          <label
            className="input-label-component"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}
        {moreInfo && (
          <div className="f-row-10 aic mb-2">
            <div
              dangerouslySetInnerHTML={{ __html: moreInfo }}
              className="m-0 text-little"
            />
            <div
              className="icon-wrapper"
              onClick={() => {
                copy.setAction('copied')
                copy.copy(
                  _removeHTML(moreInfo)
                    .replace(/^Eg: '|'\.$/g, '')
                    .trim()
                )
              }}
            >
              {copy.copySuccess ? <CheckSVG /> : <CopySVG />}
            </div>
          </div>
        )}
        <textarea
          {...props}
          ref={ref as React.LegacyRef<HTMLTextAreaElement> | undefined}
          className={`TextArea ${error ? 'iserror' : ''} ${
            isonlyview ? 'isonlyview' : ''
          }`}
        />
        <HVC removeDOM view={!!error} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

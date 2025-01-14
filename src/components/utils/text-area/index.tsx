import TextPrompt from '../text-prompt'
import { useCopy } from '../hooks'
import { CheckSVG, CopySVG } from '../svgs'
import { _removeHTML } from '../helper'
import { forwardRef } from 'react'
import { HVC } from '../hvc'
import './style.scss'

interface ITextArea extends React.ComponentPropsWithoutRef<'textarea'> {
  label?: string
  error?: string | undefined
  moreInfo?: string
  isonlyview?: boolean
  autoresize?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeTextArea = forwardRef(
  (
    { label, error, moreInfo, isonlyview, autoresize, ...props }: ITextArea,
    ref
  ) => {
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
          className={`text-area ${
            autoresize ? 'type-text-area-auto-resize' : 'type-text-area'
          } ${error ? 'iserror' : ''} ${isonlyview ? 'isview' : ''} `}
          onInput={(e) => {
            if (autoresize) {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }
          }}
        />
        <HVC removeDOM view={!!error} className="mt-2">
          <TextPrompt prompt={error} status={false} />
        </HVC>
      </div>
    )
  }
)

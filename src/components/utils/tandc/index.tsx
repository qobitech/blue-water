import { TypeCheckbox } from '../checkbox'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import TextPrompt from '../text-prompt'
import { BUTTON_PRIMARY } from '../../../constants/global'

const TermsAndConditions = <T extends FieldValues>({
  onClickTC,
  hookForm,
  id,
  disabled,
  text
}: {
  onClickTC?: () => void
  hookForm?: UseFormReturn<T, any>
  id?: string
  disabled?: boolean
  text?: string
}) => {
  const error = hookForm?.formState.errors?.[id as Path<T>]?.message as string
  return (
    <div>
      <div className="f-row-10 ais">
        <TypeCheckbox
          {...hookForm?.register?.(id as Path<T>)}
          disabled={disabled}
        />
        <p
          className={`text-small ${disabled ? 'color-light' : ''}`}
          style={{ margin: 0, marginTop: '2px' }}
        >
          {text || (
            <>
              I agree to Mytipster&apos;s&nbsp;
              <span
                className={`${
                  disabled
                    ? 'color-light'
                    : 'cursor-pointer text-decoration-underline'
                }`}
                style={{ color: disabled ? '' : BUTTON_PRIMARY }}
                onClick={disabled ? undefined : onClickTC}
              >
                Terms of Service
              </span>
              &nbsp;and&nbsp;
              <span
                className={`${
                  disabled
                    ? 'color-light'
                    : 'cursor-pointer text-decoration-underline'
                }`}
                style={{ color: disabled ? '' : BUTTON_PRIMARY }}
                onClick={disabled ? undefined : onClickTC}
              >
                Privacy policy
              </span>
            </>
          )}
        </p>
      </div>
      {error ? (
        <div className="pt-2">
          <TextPrompt prompt={error} status={false} />
        </div>
      ) : null}
    </div>
  )
}

export default TermsAndConditions

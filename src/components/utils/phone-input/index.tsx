import InputPhone from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import TextPrompt from '../text-prompt'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import stylemodule from './index.module.scss'
import { forwardRef } from 'react'

const styleh = stylemodule as unknown as {
  typephoneinput: any
  formcontainer: any
  iserror: any
  diverror: any
}

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string | undefined
  customwidth?: string | number
  // eslint-disable-next-line no-unused-vars
  handleOnChange?: (phone: string) => void
}

// eslint-disable-next-line react/display-name
const TypePhoneInput = forwardRef(
  ({ label, error, customwidth, handleOnChange, ...props }: IInput, ref) => {
    return (
      <div
        className={styleh.typephoneinput}
        style={{ width: customwidth || '' }}
      >
        <div className={styleh.formcontainer}>
          {label && (
            <label
              className="input-label-component"
              htmlFor={props.id || props.name}
            >
              {label}
            </label>
          )}
          <InputPhone
            country={'eg'}
            enableSearch={true}
            {...props}
            value={(props.value || '') as string}
            onChange={handleOnChange}
            inputClass={`${error ? styleh.iserror : null} ${
              props.className || ''
            }`}
            inputStyle={{ ...props.style, width: customwidth }}
          />
          {!!error && (
            <div className={styleh.diverror}>
              <TextPrompt prompt={error} status={false} />
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default TypePhoneInput

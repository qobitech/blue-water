import { FC } from 'react'
import './index.scss'
import { HVC } from '../hvc'
import TextPrompt from '../text-prompt'

export interface IBCItem {
  label: string
  value: string | number
  selected: boolean
}

interface IBC {
  label?: string
  onSelect: (value: string | number) => void
  options?: IBCItem[]
  error?: string | undefined
  hideErrorTxt?: boolean
  moreOption?: {
    text: string
    action: () => void
  }
}

const BoxCheck: FC<IBC> = ({
  label,
  onSelect,
  options,
  error,
  hideErrorTxt,
  moreOption
}) => {
  return (
    <div className="form-control-container">
      {label && <label className="input-label-component">{label}</label>}
      <div className="box-check f-row-10 aic flex-wrap">
        {options?.map((i, index) => (
          <BoxCheckItem
            label={i.label}
            onSelect={onSelect}
            selected={i.selected}
            value={i.value}
            key={index}
          />
        ))}
        {moreOption?.text ? (
          <>
            &nbsp;
            <p
              className="m-0 text-little color-brand cursor-pointer"
              onClick={moreOption.action}
            >
              {moreOption.text}
            </p>
          </>
        ) : null}
      </div>
      <HVC removeDOM view={!!error && !hideErrorTxt} className="mt-2">
        <TextPrompt prompt={error} status={false} />
      </HVC>
    </div>
  )
}

interface IBCI extends IBCItem {
  onSelect: (value: string | number) => void
}

const BoxCheckItem: FC<IBCI> = ({ label, selected, value, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className={`box-check-item hw-mx f-row aic jcc ${
        selected ? 'selected' : ''
      }`}
    >
      <p className="m-0 text-tiny">{label}</p>
    </div>
  )
}

export default BoxCheck

import { useState } from 'react'
import { MinusSVG, PlusSVG } from '../../../../components/utils/svgs'
import { TypeSmallButton } from '../../../../components/utils/button'

export interface IMutateOptions {
  label: string
  value: string | number
}

interface IMutateValue {
  mutateType?: 'number' | 'text' | 'select'
  mutateMax?: number
  mutateMin?: number
  mutatePostTxt?: string
  mutateOptions?: IMutateOptions[]
  onMutateSave?: (value: any) => void
  mutateLoad?: boolean
  value?: string | number
}

export const MutateValue = ({
  mutateType,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  mutateOptions,
  onMutateSave,
  mutateLoad,
  value
}: IMutateValue) => {
  const isNumber = mutateType === 'number'

  const [localValue, setLocalValue] = useState<any>(() => value)

  const onMutate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target

    if (
      (parseInt(value) >= (mutateMin || 1) &&
        parseInt(value) <= (mutateMax || 1)) ||
      !isNumber
    ) {
      setLocalValue(value)
    }
  }

  const onMutateSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setLocalValue(value)
  }

  const onMutateCancel = () => {
    setLocalValue(value)
  }

  const onSave = () => {
    onMutateSave?.(localValue)
    setLocalValue(null)
  }

  const isTextNum = mutateType === 'text' || mutateType === 'number'
  const isSelect = mutateType === 'select'

  return (
    <div className="f-row-7 aic">
      {isTextNum ? (
        <MutateTextNumber
          isNumber={isNumber}
          setLocalValue={setLocalValue}
          mutateMax={mutateMax}
          mutateMin={mutateMin}
          mutateType={mutateType}
          value={localValue}
          onMutate={onMutate}
          mutatePostTxt={mutatePostTxt}
        />
      ) : null}
      {isSelect ? (
        <MutateSelect
          mutateOptions={mutateOptions}
          value={localValue}
          onMutateSelect={onMutateSelect}
        />
      ) : null}

      {!!localValue && localValue !== value ? (
        <div className="pl-3 f-row-13 aic">
          <TypeSmallButton title="Update" onClick={onSave} load={mutateLoad} />
          <TypeSmallButton
            title=""
            onClick={onMutateCancel}
            buttonType="danger"
            close
          />
        </div>
      ) : null}
    </div>
  )
}

interface IMutateSelect {
  mutateOptions: IMutateOptions[] | undefined
  onMutateSelect: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void
  value: string | number | undefined
}

const MutateSelect = ({
  value,
  mutateOptions,
  onMutateSelect
}: IMutateSelect) => {
  return (
    <>
      <select value={value} className="mutate-select" onChange={onMutateSelect}>
        {mutateOptions?.map((i, index) => (
          <option value={i.value} key={index}>
            {i.label}
          </option>
        ))}
      </select>
    </>
  )
}

interface IMutateTextNumber {
  isNumber: boolean
  setLocalValue: React.Dispatch<any>
  mutateMax: number | undefined
  mutateMin: number | undefined
  value: string | number | undefined
  mutateType: 'number' | 'text' | 'select' | undefined
  onMutate: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  mutatePostTxt?: string
}

const MutateTextNumber = ({
  isNumber,
  setLocalValue,
  mutateMax,
  value,
  mutateMin,
  mutateType,
  onMutate,
  mutatePostTxt
}: IMutateTextNumber) => {
  const onAdd = () => {
    setLocalValue(
      Math.min(mutateMax || 1, parseInt((value || '0') as string) + 1)
    )
  }
  const onRemove = () => {
    setLocalValue(
      Math.max(mutateMin || 1, parseInt((value || '0') as string) - 1)
    )
  }

  const color = '#9f9f9f'

  return (
    <>
      {isNumber ? (
        <div onClick={onRemove}>
          <MinusSVG color={color} />
        </div>
      ) : null}
      <input
        type={mutateType}
        className={`mutate-input ${mutateType || 'text'}`}
        value={value}
        onChange={onMutate}
        min={mutateMin}
        max={mutateMax}
      />
      {isNumber ? (
        <div onClick={onAdd}>
          <PlusSVG color={color} />
        </div>
      ) : null}
      {mutatePostTxt ? (
        <p className="text-little m-0 pl-4">
          &nbsp;&nbsp;&nbsp;{mutatePostTxt}
        </p>
      ) : null}
    </>
  )
}

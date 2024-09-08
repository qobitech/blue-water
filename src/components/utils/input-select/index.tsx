/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from 'react'
import { TypeInput } from '../input'
import { ArrowRightSVG, LeftNavSVG, RightNavSVG } from '../svgs'
import { TypeSmallButton } from '../button'
import { Loader2 } from '../hooks'
import './index.scss'

interface IOption {
  id: string | number
  label: string
}

interface IProps {
  label: string
  placeholder: string
  options?: IOption[]
  setSelectedOption?: (id: string | number) => void
  handleNavigation?: (nav: 'next' | 'previous') => void
  pagination?: number
  totalItems?: number
  filter?: (value: string) => void
  load?: boolean
  clearFilter?: () => void
  error?: string | undefined
}

const TypeInputSelect: React.FC<IProps> = ({
  label,
  placeholder,
  options,
  setSelectedOption,
  handleNavigation,
  pagination,
  totalItems,
  filter,
  load,
  clearFilter,
  error,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(() => false)
  const [filteredOptions, setFilteredOptions] = useState<IOption[] | null>(
    options || null
  )

  useEffect(() => {
    if (options) setFilteredOptions(options)
  }, [options])

  const handleSelect = (index: number) => {
    setSelectedOption?.(options?.[index]?.id || '')
  }
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputValue(value)
    if (value) {
      setFilteredOptions(
        options?.filter((i) =>
          i.label.toLowerCase().includes(value.toLowerCase())
        ) || null
      )
    } else {
      setFilteredOptions(options || null)
      clearFilter?.()
    }
  }

  const isClassName = (className: string, value: string) => {
    const cl = className.split(' ')
    return cl.includes(value)
  }

  const blurHandler = ({ target }: { target: any }) => {
    const { className } = target as HTMLElement | { className: object }
    if (typeof className === 'string') {
      if (
        className !== 'option-item' &&
        className !== 'cta' &&
        !!className &&
        !isClassName(className, 'input-type')
      ) {
        setShowOptions(false)
      }
    } else {
      setShowOptions(false)
    }
    // else if (typeof className === 'object') {
    //   if (
    //     !className?.hasOwnProperty('baseVal') &&
    //     !className?.hasOwnProperty('animVal')
    //   )
    //     setShowOptions(false)
    // }
  }

  const handleBlur = () => {
    document.addEventListener('click', blurHandler)
    // document.removeEventListener("click", blurHandler)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filter?.(inputValue)
    }
  }

  return (
    <div className="input-select">
      <div className="input-container">
        <TypeInput
          {...props}
          placeholder={showOptions ? 'Search' : placeholder}
          onChange={handleOnChange}
          onFocus={() => setShowOptions(true)}
          onClick={() => setShowOptions(true)}
          className="input-type"
          value={inputValue}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          customwidth={'100%'}
          error={error}
        />
        {pagination ? (
          <div className="cta" onClick={() => filter?.(inputValue)}>
            {load ? <Loader2 loader /> : <ArrowRightSVG />}
          </div>
        ) : null}
      </div>
      {showOptions && (
        <div className="options-container">
          <ul>
            {filteredOptions?.map((i, index) => (
              <li
                key={i.id + 'filteredOption'}
                className="option-item"
                onClick={() => handleSelect(index)}
              >
                {i.label}
              </li>
            ))}
          </ul>
          {pagination ? (
            <div className="option-nav-container">
              <p>
                Page {pagination} of {totalItems}
              </p>
              <div
                className="nav-btn left-nav"
                onClick={() => handleNavigation?.('previous')}
              >
                <LeftNavSVG />
              </div>
              <div
                className="nav-btn"
                onClick={() => handleNavigation?.('previous')}
              >
                <RightNavSVG />
              </div>
              <div className="close-select-option">
                <TypeSmallButton
                  close
                  title=""
                  onClick={() => setShowOptions(false)}
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default TypeInputSelect

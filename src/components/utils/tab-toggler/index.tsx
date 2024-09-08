import { useEffect, useState } from 'react'
import { PRIMARY_COLOR } from '../../../constants/global'

export interface ITabToggesOption {
  name: string
  id: string
  icon?: string
  view?: 'all' | 'text' | 'icon'
  hidden?: boolean
  onClick?: () => void
}

export type togglerPositionType = 'left' | 'right' | 'center'

export interface IUseTabToggler {
  category: ITabToggesOption
  handleCategory: (category: ITabToggesOption) => void
  opt: ITabToggesOption[]
  setPosition?: (position: togglerPositionType) => void
  position?: togglerPositionType
  isCategory?: (cat: ITabToggesOption) => boolean
}

export const useTabToggler = (
  opt: ITabToggesOption[],
  defaultCategory: ITabToggesOption,
  defaultPosition?: togglerPositionType,
  param?: string,
  tabOptionsObj?: { [key: string]: any }
): IUseTabToggler => {
  const [category, setCategory] = useState<ITabToggesOption>(defaultCategory)
  const [position, setPosition] = useState<togglerPositionType>(
    defaultPosition || 'left'
  )

  const handleCategory = (category: ITabToggesOption) => {
    setCategory(category)
  }

  useEffect(() => {
    if (param) {
      const category = tabOptionsObj?.[param]
      handleCategory(category)
    }
  }, [param])

  const isCategory = (cat: ITabToggesOption) => {
    if (cat.name) return cat.name === category.name
    if (cat.icon) return cat.icon === category.icon
    return false
  }

  return { category, handleCategory, opt, setPosition, position, isCategory }
}

const TabToggler = ({
  tabTogglerProps
}: {
  tabTogglerProps: IUseTabToggler
}) => {
  const { opt, category, handleCategory, position } = tabTogglerProps
  const tabPosition =
    position === 'left' ? 'start' : position === 'right' ? 'end' : position

  const filteredOpt = opt.filter((item) => !item.hidden)

  const getIsSelected = (item: ITabToggesOption) => {
    if (item.icon) return item.icon === category.icon
    if (item?.name) return item?.name === category?.name
    return false
  }

  return (
    <div
      className={`f-row aic pt-0 justify-content-${tabPosition || 'start'}`}
      style={{ width: 'max-content' }}
    >
      <div className="f-row aic" style={{ width: 'max-content' }}>
        {filteredOpt
          .filter((item) => !item.hidden)
          .map((item, index) => {
            return (
              <IconComponent
                isSelected={getIsSelected(item)}
                size={filteredOpt.length - 1}
                index={index}
                icon={item.icon || ''}
                name={item.name}
                category={category}
                key={item.id}
                handleCategory={() => {
                  handleCategory(item)
                  item?.onClick?.()
                }}
                view={item.view}
              />
            )
          })}
      </div>
    </div>
  )
}

const IconComponent = ({
  category,
  handleCategory,
  index,
  name,
  size,
  icon,
  view,
  isSelected
}: {
  icon: string
  name: string
  category: ITabToggesOption
  handleCategory: (category: ITabToggesOption) => void
  index: number
  size: number
  view?: 'all' | 'text' | 'icon'
  isSelected: boolean
}) => {
  //   const [isFocused, setIsFocused] = useState(false)

  const handleClick = () => {
    handleCategory(category)
  }

  return (
    <p
      className="m-0"
      style={{
        fontSize: '0.59rem',
        // fontWeight: 400,
        fontFamily: 'Outfit_Regular',
        padding: '0.4rem 8.5px',
        transition: '.2s ease',
        background: isSelected ? PRIMARY_COLOR : '#fff',
        color: isSelected ? '#fff' : '#5C5C5C',
        cursor: 'pointer',
        borderTopLeftRadius: index === 0 ? '0.23rem' : '',
        borderBottomLeftRadius: index === 0 ? '0.23rem' : '',
        borderTopRightRadius: index === size ? '0.23rem' : '',
        borderBottomRightRadius: index === size ? '0.23rem' : '',
        borderTop: `1px solid ${isSelected ? PRIMARY_COLOR : '#E7E7EE'}`,
        borderBottom: `1px solid ${isSelected ? PRIMARY_COLOR : '#E7E7EE'}`,
        borderRight: `1px solid ${isSelected ? PRIMARY_COLOR : '#E7E7EE'}`,
        borderLeft:
          index !== 0
            ? ''
            : `1px solid ${isSelected ? PRIMARY_COLOR : '#E7E7EE'}`
      }}
      //   onMouseEnter={() => {
      //     setIsFocused(true)
      //   }}
      //   onMouseLeave={() => setIsFocused(false)}
      onClick={handleClick}
    >
      {view !== 'icon' && name}
      {view !== 'text' && icon && (
        <span>
          <i className={`${icon} ${view === 'all' ? 'ml-2' : ''}`} />
        </span>
      )}
    </p>
  )
}

export default TabToggler

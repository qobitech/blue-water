import { FC, useEffect, useState } from 'react'
import { TypeSelect } from '../../../components/utils/select'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { ArrowLossSVG, ArrowProfitSVG } from '../../../components/utils/svgs'
import '../page.scss'
import './index.scss'

interface IValue {
  previous: number
  current: number
}

interface IStatS {
  title: string
  value: {
    monthly: IValue
    daily: IValue
    total: IValue
  }
}

const stats: IStatS[] = [
  {
    title: 'Buyers (Paid)',
    value: {
      monthly: {
        previous: 200,
        current: 130
      },
      daily: {
        previous: 200,
        current: 105
      },
      total: {
        previous: 2500,
        current: 2250
      }
    }
  },
  {
    title: 'Buyers (Free)',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Sellers (Free)',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Sellers (Paid)',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Subscribers (Paid)',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Subscribers (Free)',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Channels',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  },
  {
    title: 'Tips',
    value: {
      monthly: {
        previous: 200,
        current: 230
      },
      daily: {
        previous: 200,
        current: 230
      },
      total: {
        previous: 2500,
        current: 3250
      }
    }
  }
]

enum statsValueEnum {
  monthly = 'monthly',
  daily = 'daily',
  total = 'total'
}

type statsValueType = (typeof statsValueEnum)[keyof typeof statsValueEnum]

interface IStatsHookForm {
  stats: statsValueType
}

const statsSchema = {
  stats: yup.string()
}

const filterEnums = ['Buyers', 'Sellers', 'Subscribers', 'Channels', 'Tips']

const AdminOverview = () => {
  const [hookForm] = useFormHook<IStatsHookForm>(statsSchema)

  useEffect(() => {
    hookForm.setValue('stats', statsValueEnum.daily)
  }, [])

  const cardFilterProps = useCardFilter()

  const filteredStats = stats.filter((i) =>
    cardFilterProps.filterItems(i.title)
  )

  const getValue = (value: statsValueType, index: number) => {
    return filteredStats[index].value[value]?.current
  }

  const getStatsPercentage = (value: statsValueType, index: number) => {
    const valueObj = filteredStats[index].value[value]
    const diff = (valueObj?.current / valueObj?.previous) * 100
    return {
      percentage: (diff - 100).toFixed(2),
      isProfit: valueObj?.current > valueObj?.previous
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <div className="admin-overview">
          <div className="admin-overview-header">
            <div className="admin-overview-header-left">
              <h1 className="headertext">Welcome Admin</h1>
              <p>Get insights on all activities</p>
            </div>
            <div className="admin-overview-header-right">
              <TypeSelect
                initoption={{ label: 'Select', value: '' }}
                customwidth={'100%'}
                optionsdata={Object.values(statsValueEnum).map((i, index) => ({
                  id: index,
                  label: i,
                  value: i
                }))}
                disableInit
                {...hookForm.register('stats')}
              />
            </div>
          </div>
          <CardFilter
            filterEnums={filterEnums}
            cardFilterProps={cardFilterProps}
          />
          <div className="admin-overview-card-container">
            {filteredStats.map((i, index) => {
              const statsPercentage = getStatsPercentage(
                hookForm.watch().stats,
                index
              )
              const value = getValue(hookForm.watch().stats, index)
              return (
                <div className="admin-overview-card" key={index}>
                  <p className="admin-overview-card-title">{i.title}</p>
                  <div className="admin-overview-card-value">
                    <h3>{value?.toLocaleString()}</h3>
                    <div className="admin-overview-card-percentage">
                      <p
                        className={`${
                          statsPercentage.isProfit ? 'profit' : ''
                        }`}
                      >
                        {statsPercentage.percentage}%
                      </p>
                      {statsPercentage.isProfit ? (
                        <ArrowProfitSVG />
                      ) : (
                        <ArrowLossSVG />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ICardFilter {
  filterEnums: string[]
  cardFilterProps: IUCF
}

interface IUCF {
  selectFilter: (value: string) => void
  filterItems: (value: string) => boolean
  selectedFilters: string[] | undefined
}

export const useCardFilter = (): IUCF => {
  const [selectedFilters, setSelectedFilters] = useState<string[] | undefined>()

  const selectFilter = (value: string) => {
    const filters = selectedFilters || []
    const index = filters.indexOf(value)
    if (index === -1) {
      filters.push(value)
    } else {
      filters.splice(index, 1)
    }
    setSelectedFilters([...filters])
  }

  const filterItems = (value: string) => {
    return selectedFilters?.length === 0 || !selectedFilters
      ? true
      : !!selectedFilters?.filter((i) =>
          value.toLowerCase().includes(i.toLowerCase())
        )?.[0]
  }

  return {
    filterItems,
    selectFilter,
    selectedFilters
  }
}

export const CardFilter: FC<ICardFilter> = ({
  filterEnums,
  cardFilterProps
}) => {
  return (
    <div className="admin-overview-filter">
      {filterEnums.map((i, index) => (
        <div
          className={`admin-overview-filter-item ${
            cardFilterProps.selectedFilters?.includes(i) ? 'active' : ''
          }`}
          key={index}
          onClick={() => cardFilterProps.selectFilter(i)}
        >
          <p>{i}</p>
        </div>
      ))}
    </div>
  )
}

export default AdminOverview

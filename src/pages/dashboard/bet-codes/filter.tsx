import { useEffect, useState } from 'react'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { IPillData, PillComponent } from '../../../components/utils/hooks'
import {
  multiplePredictionStatusEnum,
  multiplePredictionStatusType
} from './data'
import { TypeButton } from '../../../components/utils/button'
import { FilterSVG } from '../../../components/utils/svgs'
import { TypeSelect } from '../../../components/utils/select'
import { useSportsQuery } from '../../../api/sports'
import { useBookiesQuery } from '../../../api/bookies'
import Skeleton from '../../../components/utils/skeleton'

const BetCodeFilter = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>
  const { global, rsProps } = globalContext

  const sportsQuery = useSportsQuery()
  const bookiesProps = useBookiesQuery()

  useEffect(() => {
    sportsQuery.mutate({})
    bookiesProps.mutate({})
  }, [])

  const sports = global.state.getSports.data.sports || []
  const bookies = global.state.getBookies.data.bookies || []

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const id = e.target.id
    let filterValues = global.state.betCodeFilter || []
    if (filterValues.map((i) => i.param).includes(id)) {
      if (value) {
        filterValues = filterValues.map((i) =>
          i.param === id ? { ...i, value } : i
        )
      } else {
        filterValues = filterValues.filter((i) => i.param !== id)
      }
    } else {
      filterValues.push({ param: id, value })
    }
    global.updateState('betCodeFilter', [...filterValues])
  }

  const getValue = (id: string) => {
    const filter = global.state.betCodeFilter.filter((i) => i.param === id)?.[0]
    return filter?.value || ''
  }

  const onClose = () => {
    rsProps?.closeSection()
  }
  const onFilter = () => {
    global.updateState('isBetCodeFilter', true)
    onClose()
  }
  const isData = sports?.length + bookies?.length > 0
  const isLoad = sportsQuery.isLoading || bookiesProps.isLoading

  if (!isData && isLoad) return <Skeleton />
  return (
    <div className="f-column-23 h-100">
      {/* status */}
      <div className="border-label rounded p-4 f-column-7 d-none">
        <label className="input-label-component">By Status</label>
        <Status />
      </div>
      {/* sports */}
      <div className="border-label rounded p-4 f-column-18">
        <TypeSelect
          label="By Sports"
          initoption={{ label: 'Select Sports', value: '' }}
          optionsdata={sports.map((i) => ({
            id: i._id,
            label: i.title,
            value: i.title
          }))}
          customwidth={'100%'}
          id="sport"
          onChange={handleSelect}
          value={getValue('sport')}
        />
      </div>
      {/* bookmakers */}
      <div className="border-label rounded p-4 f-column-18">
        <TypeSelect
          label="By Bookmakers"
          initoption={{ label: 'Select Bookmakers', value: '' }}
          optionsdata={bookies.map((i) => ({
            id: i._id,
            label: i.title,
            value: i.title
          }))}
          customwidth={'100%'}
          id="bookie"
          onChange={handleSelect}
          value={getValue('bookie')}
        />
      </div>
      <div className="cta-wrapper mt-auto pb-3">
        <TypeButton
          title="Filter"
          icon={<FilterSVG fill="white" />}
          className="w-100"
          onClick={onFilter}
        />
        <TypeButton
          title="Cancel"
          buttonType="danger"
          className="w-100"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default BetCodeFilter

const Status = () => {
  const [myPillsData, setMyPillsData] =
    useState<multiplePredictionStatusType>('Published')

  const onClickPill = (filterValue: string) => {
    const value = filterValue as multiplePredictionStatusType
    setMyPillsData(value)
  }

  const pills: IPillData[] = Object.values({
    ...multiplePredictionStatusEnum
  }).map((i) => ({
    filterValue: i,
    label: i
  }))

  return (
    <PillComponent
      filterValues={[myPillsData || '']}
      onClickPill={onClickPill}
      pills={pills}
    />
  )
}

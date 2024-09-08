// import { useEffect } from 'react'
import { ChildComponent } from './subscribed'
import { useToggler } from '../../../components/utils/hooks'
import { AllSingleTips } from '../overview/data'
// import { IUseAPI } from '../../../api'
import {
  IMultiBetTicketResponse
  // IMultiBetTicketResponses
} from '../../../interface/IBet'
import { tipsFilterValueType } from './data'
import { useGlobalContext } from '../../../components/layout/context'

const PaidBetTips = ({
  isFocus,
  handleMultiBetsQuery,
  // multiBetProps,
  filterValue
}: {
  isFocus: boolean
  handleMultiBetsQuery: (pageNum?: number) => void
  // multiBetProps: IUseAPI<IMultiBetTicketResponses>
  filterValue: tipsFilterValueType[]
}) => {
  const {
    betTipsTabProps,
    global: { state }
  } = useGlobalContext()

  if (!betTipsTabProps) return <></>

  // const statusCategory = 'Published'

  const handlePagination = (selectedItem: { selected: number }) => {
    handleMultiBetsQuery(selectedItem.selected + 1)
  }

  const currentPage = state?.getMultiPrediction?.currentPage || 1

  const pageCount = state?.getMultiPrediction?.pages || 1

  enum betTipCategoryEnum {
    MULTIPLE = 'Multiple',
    SINGLE = 'Single'
  }

  const { category: betTipCategory } = useToggler(betTipCategoryEnum.MULTIPLE)

  const isAC = betTipCategory === betTipCategoryEnum.MULTIPLE
  const isST = betTipCategory === betTipCategoryEnum.SINGLE

  const betTickets = state?.getMultiPrediction?.data?.multiplePredictions || []
  // const isData = (betTickets.length || 0) > 0

  // useEffect(() => {
  //   if (isFocus && !isData) {
  //     handleMultiBetsQuery()
  //   }
  // }, [betTipsTabProps.tab, statusCategory])

  const filterByType = (data: IMultiBetTicketResponse) => {
    switch (filterValue[0]) {
      case 'active':
        return data.active
      case 'ended':
        return !data.active
      default:
        return true
    }
  }

  return (
    <div>
      {isAC ? (
        <div className="w-100 rounded bg-white">
          <ChildComponent
            multiplePredictions={betTickets.filter(filterByType) || []}
            refresh={handleMultiBetsQuery}
            currentPage={currentPage}
            page={pageCount}
            handlePagination={handlePagination}
          />
        </div>
      ) : null}
      {isST && (
        <>
          <AllSingleTips category="" />
        </>
      )}
    </div>
  )
}

export default PaidBetTips

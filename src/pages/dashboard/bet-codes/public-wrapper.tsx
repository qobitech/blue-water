import { Children, useEffect } from 'react'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { multiTipCategoryEnum } from '../../../constants/global'
import { IMultiBetTicketResponse } from '../../../interface/IBet'
import { AllSingleTips, filterMultiBetCategory } from '../overview/data'
import { IUseBetMultiBetTicket } from '../../../api/multi-prediction'
import { SubHeader } from '../my-account/wallet/data'

const PublicBetTicketWrapper = ({
  children,
  multiBetProps,
  handleMultiBetsQuery,
  loading
}: {
  children?: any
  multiBetProps: IUseBetMultiBetTicket
  handleMultiBetsQuery: (query?: string) => void
  loading: boolean
}) => {
  const betTipsEnum = {
    MULTITIP: 'Multiple',
    SINGLETIPS: 'Single'
  }

  const betTipsCategories = useTabSection(betTipsEnum.MULTITIP, betTipsEnum)

  const multiBetCategories = useTabSection(
    multiTipCategoryEnum.ALLODDS,
    multiTipCategoryEnum
  )

  const isAC = betTipsCategories.isTab(betTipsEnum.MULTITIP)
  const isST = betTipsCategories.isTab(betTipsEnum.SINGLETIPS)

  enum statusCategoryEnum {
    PULISHED = 'Published',
    PENDING = 'Pending',
    ARCHIVED = 'Archived'
  }

  const statusCategory = statusCategoryEnum.PULISHED

  useEffect(() => {
    handleMultiBetsQuery(`?status=${statusCategory}`)
  }, [statusCategory])

  const handlePagination = (selectedItem: { selected: number }) => {
    handleMultiBetsQuery(
      `?status=${statusCategory}&page=${selectedItem.selected + 1}`
    )
  }

  const betTickets = multiBetProps.data?.data.multiplePredictions.filter((i) =>
    filterMultiBetCategory(i, multiBetCategories.tab)
  ) as IMultiBetTicketResponse[]

  const currentPage = multiBetProps.data?.currentPage

  const pageCount = multiBetProps.data?.pages

  const matchChild: any = Children.map(children, (child) => {
    if (child)
      return {
        ...child,
        props: {
          ...child.props,
          betTickets,
          currentPage: currentPage || 1,
          handlePagination,
          pageCount,
          loading
        }
      }
    return child
  })

  return (
    <div className="f-column-21">
      <TabSection
        tabProps={betTipsCategories.tabProps}
        position="start"
        tabGap="30"
      />
      {isAC && (
        <>
          <SubHeader
            title="Multiple bet predictions"
            description=""
            load={loading}
            refreshAction={() =>
              handleMultiBetsQuery(
                `?status=${statusCategory}&page=${(currentPage || 1) - 1}`
              )
            }
          />
          <TabSection
            tabProps={multiBetCategories.tabProps}
            position="center"
            tabGap="10"
            type="block"
          />
          <div>
            <div className="w-100">{matchChild}</div>
          </div>
        </>
      )}
      {isST && (
        <>
          <SubHeader title="Single bet predictions" description="" />
          <AllSingleTips category="" />
        </>
      )}
    </div>
  )
}

export default PublicBetTicketWrapper

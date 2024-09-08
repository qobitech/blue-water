import { Children, useEffect, useState } from 'react'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import {
  GETISSELLER,
  multiTipCategoryEnum,
  getUserData
} from '../../../constants/global'
import TabToggler, {
  ITabToggesOption,
  useTabToggler
} from '../../../components/utils/tab-toggler'
import { IMultiBetTicketResponses } from '../../../interface/IBet'
import { AllSingleTips, filterMultiBetCategory } from '../overview/data'
import { getMultiPredictionTableActionEnums } from './public'
import {
  multiplePredictionStatusEnum,
  multiplePredictionStatusType,
  multiplePredictionTableActionEnums
} from './data'
import { IUseAPI } from '../../../api'
import { useUpdateMultiPrediction } from '../../../api/multi-prediction'
import TextPrompt from '../../../components/utils/text-prompt'
import { HVC } from '../../../components/utils/hvc'
import { useTableAction } from '../../../components/table/table-components'
import { SubHeader } from '../my-account/wallet/data'

const BetTicketWrapper = ({
  children,
  multiBetProps,
  handleMultiBetsQuery,
  loading
}: {
  children?: any
  multiBetProps: IUseAPI<IMultiBetTicketResponses>
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

  const fetchMultiplePredictions = (status?: string, pageNumber?: number) => {
    const pgStatus = status || multiplePredictionStatusEnum.PUBLISHED
    const statusQuery = pgStatus ? `&status=${pgStatus}` : ''
    const pageNum = pageNumber || multiBetProps.data?.currentPage || 1
    handleMultiBetsQuery(`${statusQuery}&page=${pageNum}`)
  }

  const resetTableAction = () => {
    tableAction.setSelectedItems(null)
    tableAction.setAction('')
  }

  const togglerOptions: ITabToggesOption[] = [
    {
      id: '1',
      name: multiplePredictionStatusEnum.PUBLISHED,
      onClick: () => {
        fetchMultiplePredictions(multiplePredictionStatusEnum.PUBLISHED)
        resetTableAction()
      }
    },
    {
      id: '2',
      name: multiplePredictionStatusEnum.PENDING,
      onClick: () => {
        fetchMultiplePredictions(multiplePredictionStatusEnum.PENDING)
        resetTableAction()
      }
    },
    {
      id: '3',
      name: multiplePredictionStatusEnum.ARCHIVED,
      onClick: () => {
        fetchMultiplePredictions(multiplePredictionStatusEnum.ARCHIVED)
        resetTableAction()
      }
    }
  ]

  const tabTogglerProps = useTabToggler(
    togglerOptions,
    togglerOptions[0],
    'right'
  )

  const statusCategory = tabTogglerProps.category.name

  useEffect(() => {
    fetchMultiplePredictions()
  }, [])

  const handlePagination = (selectedItem: { selected: number }) => {
    fetchMultiplePredictions(undefined, selectedItem.selected + 1)
  }

  const betTickets = multiBetProps.data?.data?.multiplePredictions.filter((i) =>
    filterMultiBetCategory(i, multiBetCategories.tab)
  )

  const currentPage = multiBetProps.data?.currentPage

  const pageCount = multiBetProps.data?.pages

  const isOwner =
    GETISSELLER() &&
    betTickets?.every((i) => i.channel?.userId === getUserData().user._id)

  const tableAction = useTableAction(
    isOwner
      ? getMultiPredictionTableActionEnums(
          statusCategory as multiplePredictionStatusType
        )
      : null
  )

  const onUpdateMultiPredictionSuccess = () => {
    fetchMultiplePredictions(statusCategory)
    resetTableAction()
  }

  const updateMultiProps = useUpdateMultiPrediction(
    onUpdateMultiPredictionSuccess
  )

  // const onDeleteMultiPredictionSuccess = () => {
  //   fetchMultiplePredictions(statusCategory)
  //   resetTableAction()
  // }

  // const deleteMultiProps = useDeleteMultiPrediction(
  //   onDeleteMultiPredictionSuccess
  // )

  const updateMultiPredictions = (
    ids: string[],
    params: { [key: string]: any }
  ) => {
    updateMultiProps.mutate({
      body: { ids, params }
    })
  }

  // const deleteMultiPredictions = (ids: string[]) => {
  //   deleteMultiProps.mutate({
  //     body: { ids }
  //   })
  // }

  // check if active bets are included in archive list
  const isActiveInArchiveList = (ids: string[]) => {
    const activeBets = betTickets.filter((i) => i.active)
    return activeBets.filter((i) => ids.includes(i._id))?.length > 0
  }

  const [isActiveInArchive, setIsActiveInArchive] = useState<boolean>(false)

  const handleTableAction = () => {
    if (tableAction.selectedItems) {
      const ids = tableAction.selectedItems || []
      switch (tableAction.action) {
        case multiplePredictionTableActionEnums.ARCHIVE:
          setIsActiveInArchive(false)
          if (isActiveInArchiveList(ids)) {
            setIsActiveInArchive(true)
          } else {
            updateMultiPredictions(ids, {
              status: multiplePredictionStatusEnum.ARCHIVED
            })
          }
          break
        // case multiplePredictionTableActionEnums.DELETE:
        //   deleteMultiPredictions(ids)
        //   break
        case multiplePredictionTableActionEnums.PUBLISH:
          updateMultiPredictions(ids, {
            status: multiplePredictionStatusEnum.PUBLISHED
          })
          break
        default:
          break
      }
    }
  }

  const matchChild: any = Children.map(children, (child) => {
    if (child)
      return {
        ...child,
        props: {
          ...child.props,
          betTickets,
          handleTableAction,
          tableAction,
          currentPage: currentPage || 1,
          handlePagination,
          pageCount,
          loading
        }
      }
    return child
  })

  return (
    <div className="pt-4">
      {/* <TabSection
        tabProps={betTipsCategories.tabProps}
        position="start"
        tabGap="30"
      /> */}
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
          <div className="border-bottom">
            <TabSection
              tabProps={multiBetCategories.tabProps}
              position="center"
              tabGap="10"
              type="block"
            />
          </div>
          <div>
            <div className={`f-row aic w-100 ${isOwner ? 'py-4' : ''}`}>
              {isOwner && <TabToggler tabTogglerProps={tabTogglerProps} />}
            </div>
            <HVC
              removeDOM
              view={isActiveInArchive}
              key={isActiveInArchive ? 'true' : 'false'}
            >
              <TextPrompt
                prompt="remove the active bets from the list before archiving."
                timer={1500}
              />
            </HVC>
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

export default BetTicketWrapper

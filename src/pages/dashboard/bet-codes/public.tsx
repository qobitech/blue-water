import { useState } from 'react'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { multiTipCategoryEnum } from '../../../constants/global'
import PublicBetTickets from '../../../components/tables/public-bet-tickets'
import {
  multiplePredictionStatusEnum,
  multiplePredictionStatusType,
  multiplePredictionTableActionEnums
} from './data'
import { useUpdateMultiPrediction } from '../../../api/multi-prediction'
import { filterMultiBetCategory } from '../overview/data'
import TextPrompt from '../../../components/utils/text-prompt'
import { HVC } from '../../../components/utils/hvc'
import { useGlobalContext } from '../../../components/layout/context'
import { useTableAction } from '../../../components/table/table-components'

export const getMultiPredictionTableActionEnums = (
  status: multiplePredictionStatusType | null
): {
  [key: string]: string
} | null => {
  switch (status) {
    case multiplePredictionStatusEnum.PENDING:
      return {
        PUBLISH: 'Publish'
        // DELETE: 'Delete'
      }
    case multiplePredictionStatusEnum.PUBLISHED:
      return {
        ARCHIVE: 'Archive'
        // REFERRAL: 'Add Referral Link'
        // PPT: 'Add Pay Per Tip',
        // EMAIL: 'Share with subscribers'
      }
    case multiplePredictionStatusEnum.ARCHIVED:
      return {
        PUBLISH: 'Publish'
        // DELETE: 'Delete'
      }
    default:
      return null
  }
}

const PublicBetTips = ({
  // multiBetPublicProps,
  handleMultiBetsQuery,
  isOwner,
  status,
  category
}: {
  // multiBetPublicProps: IUseAPI<IMultiBetTicketResponses>
  handleMultiBetsQuery: (pageNum?: number) => void
  isOwner: boolean
  status: multiplePredictionStatusType | null
  category: 'all' | 'mine'
}) => {
  const {
    betTipsTabProps,
    global: { state }
  } = useGlobalContext()

  const data =
    category === 'all'
      ? state?.getPublicMultiPrediction
      : state?.getMyMultiPrediction

  if (!betTipsTabProps) return <></>
  // if (!multiBetPublicProps) return <></>

  const multiBetCategories = useTabSection(
    multiTipCategoryEnum.ALLODDS,
    multiTipCategoryEnum
  )

  const multiplePredictions = data.data?.multiplePredictions || []

  const handlePagination = (selectedItem: { selected: number }) => {
    handleMultiBetsQuery(selectedItem.selected + 1)
  }

  const betTickets = multiplePredictions.filter((i) =>
    filterMultiBetCategory(i, multiBetCategories.tab)
  )

  const currentPage = data?.currentPage
  const pageCount = data?.pages

  const tableAction = useTableAction(
    isOwner ? getMultiPredictionTableActionEnums(status) : null
  )

  const onUpdateMultiPredictionSuccess = () => {
    handleMultiBetsQuery()
  }

  const updateMultiProps = useUpdateMultiPrediction(
    onUpdateMultiPredictionSuccess
  )

  const updateMultiPredictions = (
    ids: string[],
    params: { [key: string]: any }
  ) => {
    updateMultiProps.mutate({
      body: { ids, params }
    })
  }

  // check if active bets are included in archive list
  const isActiveInArchiveList = (ids: string[]) => {
    const activeBets = betTickets.filter((i) => i.active)
    return activeBets.filter((i) => ids.includes(i._id))?.length > 0
  }

  const [isActiveInArchive, setIsActiveInArchive] = useState<boolean>(false)

  const handleTableAction = (action?: string, id?: string) => {
    if (tableAction.selectedItems || id) {
      const ids = id ? [id] : tableAction.selectedItems || []
      switch (action) {
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
        case multiplePredictionTableActionEnums.DISCOUNT:
          break
        case multiplePredictionTableActionEnums.PUBLISH:
          updateMultiPredictions(ids, {
            status: multiplePredictionStatusEnum.PUBLISHED
          })
          break
        case multiplePredictionTableActionEnums.REFERRAL:
          break
        default:
          break
      }
    }
  }

  return (
    <div className="pt-3">
      <TabSection
        tabProps={multiBetCategories.tabProps}
        position="center"
        tabGap="10"
        type="block"
      />
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
      <div className="w-100 bg-white">
        <PublicBetTickets
          betTickets={betTickets}
          handleTableAction={handleTableAction}
          tableAction={tableAction}
          currentPage={currentPage}
          handlePagination={handlePagination}
          pageCount={pageCount}
          onRefresh={handleMultiBetsQuery}
        />
      </div>
    </div>
  )
}

export default PublicBetTips

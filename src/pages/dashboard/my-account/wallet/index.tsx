import { useEffect, useState } from 'react'
import Transactions from './transactions'
import { SubHeaderFilter, getWalletStatsData } from './data'
import WalletStats from './wallet-stats'
import { useGlobalContext } from '../../../../components/layout/context'
import { GETISBUYER, getUserData } from '../../../../constants/global'
import { useTabSection } from '../../../../components/utils/reusable'
import { defaultGETDataTemplate, useAPIGET } from '../../../../api'
import { ITransactionResponse } from '../../../../interface/ITransaction'

export const LIMIT = 10

const walletTabsEnum = {
  TRANSACTIONS: 'All Transactions',
  CREDIT: 'Credit',
  DEBIT: 'Debit',
  PROCESSING: 'Processing',
  FAILED: 'Failed'
} as const

const Wallet = () => {
  const { globalStateActions, rsProps, refreshUserData } = useGlobalContext()

  if (!globalStateActions) return <>reload page</>

  const { walletProps } = globalStateActions

  if (!walletProps) return <></>

  const {
    mutate: transactionStatsMutate,
    data: transactionStatsData,
    isLoading
  } = walletProps

  const getWalletStats = () => {
    transactionStatsMutate({
      query: `?walletId=${getUserData().user.wallet}`
    })
  }

  useEffect(() => {
    getWalletStats()
  }, [])

  const walletStats = getWalletStatsData(transactionStatsData)

  const walletTabCategories = useTabSection(
    walletTabsEnum.TRANSACTIONS,
    walletTabsEnum
  )

  const serviceQuery = GETISBUYER() ? '&service=false' : ''

  const getAllTransactionQuery = (page?: number) => {
    const pg = page ? `&page=${page}` : ''
    return `?limit=${LIMIT}&senderId=${getUserData().user.wallet}&receiverId=${
      getUserData().user.wallet
    }${serviceQuery}${pg}`
  }

  const getAllCreditQuery = (page?: number) => {
    const pg = page ? `&page=${page}` : ''
    return `?limit=${LIMIT}&receiverId=${
      getUserData().user.wallet
    }${serviceQuery}&paymentStatus=Successful${pg}`
  }

  const getAllDebitQuery = (page?: number) => {
    const pg = page ? `&page=${page}` : ''
    return `?limit=${LIMIT}&senderId=${
      getUserData().user.wallet
    }${serviceQuery}&paymentStatus=Successful${pg}`
  }

  const getAllProcessingQuery = (page?: number) => {
    const pg = page ? `&page=${page}` : ''
    return `?limit=${LIMIT}&senderId=${getUserData().user.wallet}&receiverId=${
      getUserData().user.wallet
    }${serviceQuery}&paymentStatus=Processing${pg}`
  }

  const getAllFailedQuery = (page?: number) => {
    const pg = page ? `&page=${page}` : ''
    return `?limit=${LIMIT}&senderId=${getUserData().user.wallet}&receiverId=${
      getUserData().user.wallet
    }${serviceQuery}&paymentStatus=Failed${pg}`
  }

  const [transactionType, setTransactionType] = useState<string>('')

  const getTransactionProps = (tabCategory?: string) => {
    switch (tabCategory) {
      case walletTabsEnum.CREDIT:
        return {
          title: 'Credit Transactions',
          description: '',
          getQuery: getAllCreditQuery
        }
      case walletTabsEnum.DEBIT:
        return {
          title: 'Debit Trnsactions',
          description: '',
          getQuery: getAllDebitQuery
        }
      case walletTabsEnum.PROCESSING:
        return {
          title: 'Pending Trnsactions',
          description: '',
          getQuery: getAllProcessingQuery
        }
      case walletTabsEnum.FAILED:
        return {
          title: 'Failed Trnsactions',
          description: '',
          getQuery: getAllFailedQuery
        }
      default:
        return {
          title: 'All Transactions',
          description:
            'Here you can view all the monetary transactions made by your account.',
          getQuery: getAllTransactionQuery
        }
    }
  }

  const transactionProps = useAPIGET<ITransactionResponse>({
    route: 'transaction',
    defaultData: { ...defaultGETDataTemplate, data: { transactions: [] } }
  })

  const getTransactions = (page?: number) => {
    transactionProps.mutate({
      query: getTransactionProps(transactionType).getQuery(page)
    })
  }

  const handlePagination = (selectedItem: { selected: number }) => {
    getTransactions(selectedItem.selected + 1)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const optionsData = Object.values(walletTabsEnum)
    .filter((i) => i !== walletTabsEnum.TRANSACTIONS)
    .map((i, index) => ({
      id: index,
      label: i,
      value: i
    }))

  const handleFilterSelect = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setTransactionType(value)
    transactionProps.mutate({
      query: getTransactionProps(value).getQuery(
        transactionProps.data.currentPage
      )
    })
  }

  const refreshOnSuccess = () => {
    refreshUserData?.()
    getWalletStats()
    getTransactions()
  }

  return (
    <div className="bg-white rounded px-0 pt-3 f-column-40">
      <WalletStats
        getWalletStats={getWalletStats}
        isLoading={isLoading}
        refreshOnSuccess={refreshOnSuccess}
        transactionStatsData={transactionStatsData}
        walletStats={walletStats}
        rsProps={rsProps}
      />
      <div>
        <SubHeaderFilter
          description=""
          title={`Transactions ${
            transactionType ? ' (' + transactionType?.toLowerCase() + ')' : ''
          }`}
          refreshAction={() => {
            getTransactions(transactionProps.data.currentPage)
          }}
          initoption={{ label: 'All Transactions', value: '' }}
          onSelect={handleFilterSelect}
          optionsData={optionsData}
          value={transactionType}
          load={transactionProps.isLoading}
        />
        <Transactions
          transactionProps={transactionProps}
          key={walletTabCategories.tab}
          handlePagination={handlePagination}
          rsProps={rsProps}
        />
      </div>
    </div>
  )
}

export default Wallet

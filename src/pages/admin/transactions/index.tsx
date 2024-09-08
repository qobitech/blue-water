import { useEffect, useState } from 'react'
import CardTable from '../reusable/card-table'
import { paymentStatusType, showAmount } from '../../../constants/global'
import '../page.scss'
import {
  useGetTransactions,
  useUpdateTransactions
} from '../../../api/transaction'
import { isNotObject } from '../../../components/utils/helper'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { IReason } from '../../../components/page-components/reason'
import { ITableRecord } from '../../../components/table/utils'
import { useGlobalContext } from '../../../components/layout/context'
import { useTableAction } from '../../../components/table/table-components'
import {
  getRSAComponent,
  getTransaction,
  setFirstCharUpper
} from '../../dashboard/my-account/wallet/data'

const LIMIT = 10

const AdminTransactions = () => {
  const { rsProps } = useGlobalContext()

  const [mutatedItemId, setMutatatedItemId] = useState<string>('')

  const getTransactionProps = useGetTransactions()

  const handleTransactions = (page?: number) => {
    const pg = `page=${
      isNotObject(page) ||
      isNotObject(getTransactionProps.data.currentPage) ||
      1
    }`
    getTransactionProps.mutate({ query: `?limit=${LIMIT}&${pg}` })
  }

  useEffect(() => {
    handleTransactions()
  }, [])

  const onUpdateSuccess = () => {
    handleTransactions()
  }

  const updateTransactionProps = useUpdateTransactions(onUpdateSuccess)

  const onUpdateTransaction = (id: string, value: string) => {
    if (value === 'Failed') {
      rsProps?.callSection({
        action: 'view',
        component: 'reason',
        title: 'Reason for Transaction Failure',
        data: {
          buttonTitle: 'Update Transaction Status',
          onAction: (reason) => {
            updateTransactionProps.mutate({
              id,
              body: { paymentStatus: value, reason }
            })
          }
        } as IReason
      })
    } else {
      updateTransactionProps.mutate({ id, body: { paymentStatus: value } })
    }
  }

  const mutateOptions: Array<{ [key: string]: paymentStatusType }> = [
    {
      label: 'Successful',
      value: 'Successful'
    },
    {
      label: 'Processing',
      value: 'Processing'
    },
    {
      label: 'Failed',
      value: 'Failed'
    },
    {
      label: 'Reversed',
      value: 'Reversed'
    }
  ]

  const transactions = getTransactionProps?.data?.data?.transactions || []

  const tableData: ITableRecord[] = transactions
    ?.filter((i) => i.service === 'false')
    ?.map((i) => ({
      id: i._id,
      row: [
        {
          value: getTransaction(i),
          isLink: !!getRSAComponent(getTransaction(i) || ''),
          action: () => {
            if (getRSAComponent(getTransaction(i) || ''))
              rsProps?.callSection({
                action: 'view',
                component: getRSAComponent(getTransaction(i) || ''),
                title: `View ${setFirstCharUpper(
                  getTransaction(i) || ''
                )} Transaction`,
                data: i.item,
                status: i.paymentStatus === 'Successful'
              })
          }
        },
        {
          value: new Date(i?.createdAt || '').toDateString(),
          isLink: false,
          action: () => {}
        },
        {
          value: showAmount(i?.amount),
          isLink: false,
          action: () => {}
        },
        {
          value: i?.paymentStatus,
          isLink: false,
          mutateType: 'select',
          mutateOptions,
          onMutateSave: (value: any) => {
            setMutatatedItemId(i._id)
            onUpdateTransaction(i._id, value)
          },
          mutateLoad:
            mutatedItemId === i._id && updateTransactionProps.isLoading
        }
      ]
    })) as ITableRecord[]
  const getTableActionEnums = (): { [key: string]: string } | null => {
    return {
      SUSPEND: 'Suspend'
    }
  }

  const tableAction = useTableAction(getTableActionEnums())

  const handlePagination = (selectedItem: { selected: number }) => {
    handleTransactions(selectedItem.selected + 1)
  }

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-management">
            <CardTable
              admin
              tableData={tableData}
              tableHeader={['Type', 'Date', 'Amount', 'Status']}
              tag="Manage transactions"
              title="Transactions"
              isFilter
              load={getTransactionProps.isLoading}
              tableAction={tableAction}
              handlePagination={handlePagination}
              paginationProps={{
                forcePage: getTransactionProps?.data?.currentPage - 1,
                pageCount: getTransactionProps.data.pages
              }}
              onRefresh={handleTransactions}
            >
              <div className="admin-filter-section">
                <FilterSection />
              </div>
            </CardTable>
          </div>
        </div>
      </div>
    </>
  )
}

const FilterSection = () => {
  const schema = {
    status: yup.string(),
    transactionType: yup.string(),
    id: yup.string()
  }

  interface IHK {
    status: string
    transactionType: string
    id: string
  }

  const formComponents: IFormComponent[] = [
    {
      component: 'select',
      initOptions: { id: 1, label: 'Transaction Status', value: '' },
      id: 'status',
      label: ''
    },
    {
      component: 'select',
      initOptions: { id: 1, label: 'Transaction Type', value: '' },
      id: 'transactionType'
    },
    {
      component: 'input',
      id: 'id',
      placeHolder: 'Transaction ID'
    }
  ]

  const [filterHookForm] = useFormHook<IHK>(schema)
  return (
    <form className="f-column-21">
      <FormBuilder
        hookForm={filterHookForm}
        formComponent={formComponents}
        size="small"
      />
    </form>
  )
}

export default AdminTransactions

import { useEffect } from 'react'
import { IRightSection } from '../../../components/layout/right-section/utils'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { _separator } from '../../../components/utils/helper'
import { ITransaction, ITransactionItem } from '../../../interface/ITransaction'
import { paymentStatusEnum, showAmount } from '../../../constants/global'
import { TypeSmallButton } from '../../../components/utils/button'
import {
  // ResponseComponent,
  defaultPATCHDataTemplate,
  useAPIPATCH
} from '../../../api'

const transactionSchema = {
  transactionId: yup.string(),
  paymentId: yup.string(),
  amount: yup.string(),
  createdAt: yup.string(),
  transactionType: yup.string(),
  paymentStatus: yup.string(),
  paymentMethod: yup.string(),
  item: yup.string()
} as const

interface IVU {
  transactionId: string
  paymentId: string
  amount: string
  createdAt: string
  transactionType: string
  paymentStatus: string
  paymentMethod: string
  item: string
}

type keyType = keyof IVU

const ViewTransaction = ({
  rsProps,
  getTransactions
}: {
  rsProps?: IRightSection<ITransaction>
  getTransactions: (page?: number) => void
}) => {
  const data: { [key: string]: any } | null | undefined = rsProps?.data

  const update = rsProps?.isView('update', 'transaction')

  const formComponents: IFormComponent[] = Object.keys(transactionSchema).map(
    (i) => ({
      id: i,
      component: !(update && i === 'paymentStatus') ? 'input' : 'select',
      label: _separator(i),
      placeHolder: '',
      type: 'text',
      isonlyview: !(update && i === 'paymentStatus'),
      initOptions: !(update && i === 'paymentStatus')
        ? {
            id: 1,
            label: 'Select Status',
            value: ''
          }
        : {
            id: 1,
            label: 'Select Status',
            value: ''
          },
      optionData: !(update && i === 'paymentStatus')
        ? [{ id: 1, label: '', value: '' }]
        : Object.values(paymentStatusEnum).map((j, jnx) => ({
            id: jnx,
            label: j,
            value: j || ''
          }))
    })
  )

  const [hookForm] = useFormHook<IVU>(transactionSchema)

  const getTransactionItem = (item: ITransactionItem) => {
    return item
  }

  const getValue = (key: keyType, value: any): string => {
    if (key === 'item') return getTransactionItem(value).itemType
    if (key === 'amount') return showAmount(value)
    if (key === 'createdAt') return new Date(value).toDateString()
    return value
  }

  const getKey = (key: string) => {
    if (key === 'transactionId') return '_id'
    return key
  }

  useEffect(() => {
    Object.keys(transactionSchema).forEach((i) => {
      hookForm.setValue(
        i as keyType,
        getValue(i as keyType, data?.[getKey(i)]) || '...'
      )
    })
  }, [])

  const getBody = () => ({
    paymentStatus: hookForm.getValues('paymentStatus')
  })

  const {
    // response,
    mutate,
    isLoading
  } = useAPIPATCH({
    route: 'transaction',
    defaultData: {
      ...defaultPATCHDataTemplate
    },
    onSuccess: () => {
      getTransactions()
    }
  })

  const handleUpdate = (res: IVU) => {
    mutate({ body: getBody(), id: data?._id || '' })
  }

  return (
    <div>
      <div className="grid-wrapper-40 gap-30">
        <FormBuilder hookForm={hookForm} formComponent={formComponents} />
      </div>
      {update ? (
        <div className="mt-5">
          <TypeSmallButton
            title="Update"
            onClick={hookForm.handleSubmit(handleUpdate)}
            load={isLoading}
          />
          <div className="separator-h-20" />
          {/* <ResponseComponent response={response} /> */}
        </div>
      ) : null}
    </div>
  )
}

export default ViewTransaction

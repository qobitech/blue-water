import { useEffect } from 'react'
import { IUsers } from '../../../../interface/IUser'
import { defaultGETDataTemplate, useAPIGET } from '../../../../api'
import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { IWithdrawRequestTransaction } from '../../../../interface/ITransaction'
import {
  getCountry,
  GETISADMIN,
  showAmount
} from '../../../../constants/global'
import { HVC, HVCLoad } from '../../../../components/utils/hvc'
import { NoticeComponent } from '../../../../components/utils/reusable'
import { CardItems } from '../../../../components/utils/card-items'

const defaultData: IUsers = {
  ...defaultGETDataTemplate,
  data: { users: [] }
}

const WithdrawRequestTransaction = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const data = rsProps?.data as IWithdrawRequestTransaction

  const {
    data: users,
    isLoading,
    mutate
  } = useAPIGET<IUsers>({
    route: 'users',
    defaultData
  })

  useEffect(() => {
    if (GETISADMIN()) {
      mutate({ query: `?_id=${data.userId}` })
    }
  }, [data])

  const dataArray = [
    {
      label: 'Service ID',
      value: data?._id,
      copy: true
    },
    {
      label: 'Transaction ID',
      value: data?.transaction,
      copy: true
    },
    {
      label: 'Request Date',
      value: new Date(data?.createdAt).toDateString()
    },
    {
      label:
        rsProps?.paymentStatus === 'Successful' ? 'Processed Date' : 'Status',
      value:
        rsProps?.paymentStatus === 'Successful'
          ? new Date(data?.modified).toDateString()
          : rsProps?.paymentStatus
    },
    {
      label: 'Bank',
      value: data?.account_bank
    },
    {
      label: 'Account Number',
      value: data?.account_number
    },
    {
      label: 'Amount',
      value: showAmount(data?.amount)
    },
    {
      label: 'Currency',
      value: data?.currency
    }
  ]

  const user = users?.data?.users?.[0]

  const userArray = [
    {
      label: 'User ID',
      value: user?._id,
      copy: true
    },
    {
      label: 'First Name',
      value: user?.firstName
    },
    {
      label: 'Last Name',
      value: user?.lastName
    },
    {
      label: 'Email',
      value: user?.email
    },
    {
      label: 'Country',
      value: getCountry(user?.country)
    },
    {
      label: 'Country of Residence',
      value: getCountry(user?.countryOfResidence)
    },
    {
      label: 'Date of Birth',
      value: new Date(user?.dob).toDateString()
    },
    {
      label: 'Joined',
      value: new Date(user?.createdAt).toDateString()
    },
    {
      label: 'Gender',
      value: user?.gender
    },
    {
      label: 'Government-Issued ID Type',
      value: user?.governmentIDNumber?.idType
    },
    {
      label: 'Government-Issued ID Number',
      value: user?.governmentIDNumber?.id
    },
    {
      label: 'User Tier',
      value: user?.level?.[0].title
    }
  ]

  return (
    <HVCLoad removeDOM view load={isLoading} className="f-column-33">
      <HVC removeDOM view={rsProps?.paymentStatus === 'Failed'}>
        <NoticeComponent notice="Check your notifications for reason why this transaction failed" />
      </HVC>
      <div className="grid-wrapper-40 gap-40 border-label rounded p-4">
        {dataArray.map((i, index) => (
          <CardItems
            title={i.label}
            value={i?.value || ''}
            key={index}
            copy={i.copy}
          />
        ))}
      </div>
      <HVC
        removeDOM
        view={GETISADMIN()}
        className="grid-wrapper-40 gap-40 border-label rounded p-4"
      >
        {userArray?.map((i, index) => (
          <CardItems
            title={i.label}
            value={i?.value || ''}
            key={index}
            copy={i?.copy || false}
          />
        ))}
      </HVC>
    </HVCLoad>
  )
}

export default WithdrawRequestTransaction

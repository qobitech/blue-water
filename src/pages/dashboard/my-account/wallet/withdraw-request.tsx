import { useEffect, useRef, useState } from 'react'
import FormBuilder, {
  IFormComponent
} from '../../../../components/utils/form-builder'
import { useFormHook } from '../../../../components/utils/hooks'
import * as yup from 'yup'
import {
  getCountry,
  showAmount,
  getUserData
} from '../../../../constants/global'
import { TypeButton } from '../../../../components/utils/button'
import hourglass from '../../../../assets/animation/hour-glass - 1716237051398.json'
import { UseFormReturn } from 'react-hook-form'
import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { handleScrollRightSection } from '../../../../components/utils/helper'
import { useCreateWithdrawRequest } from '../../../../api/withdraw-request'
import { HVC } from '../../../../components/utils/hvc'
import { ITableRecord } from '../../../../components/table/utils'
import { CardItems } from '../../bet-channel/by-id/data'
import { NoticeComponent } from '../../../../components/utils/reusable'
import DefaultTable from '../../../../components/table/default'
import { IUseAPI } from '../../../../api'
import RequestStatus from '../../../../components/utils/request-status'

interface IFH {
  currency: string
  amount: string
  account_bank: string
  account_number: string
}

interface IPersonalDetails {
  firstName: string
  lastName: string
  phoneNumber: string
  idType: string
  id: string
}

const personalDetailschema = {
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  idType: yup.string(),
  id: yup.string()
}

type stageType = 'withdraw-request' | 'summary'

export interface IWithdrawRequest {
  refreshOnSuccess?: () => void
  withdrawalAmount: number | null
  onClose: () => void
}

const WithDrawRequest = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const { onClose, withdrawalAmount, refreshOnSuccess } =
    rsProps?.data as unknown as IWithdrawRequest

  const balance = withdrawalAmount + ''
  const processFee = '0.2'
  let maxWithdraw = parseFloat(balance) - parseFloat(processFee)
  maxWithdraw = maxWithdraw < 0 ? 0 : maxWithdraw
  const bottomSection = useRef<HTMLDivElement>(null)

  const withdrawRequestSchema = {
    currency: yup.string().required('Currency is required'),
    amount: yup
      .number()
      .typeError('Provide amount')
      .required('Amount is required')
      .max(
        maxWithdraw,
        `You're exceeding your withdrawal amount ${showAmount(maxWithdraw)}`
      ),
    account_bank: yup.string().required('Bank is required'),
    account_number: yup.string().required('Bank Account Number is required')
  }

  const [withdrawRequestHookForm] = useFormHook<IFH>(withdrawRequestSchema)
  const [personalDetailsHookForm] =
    useFormHook<IPersonalDetails>(personalDetailschema)

  const [stage, setStage] = useState<stageType>('withdraw-request')

  const onWithdrawRequest = (data: IFH) => {
    setStage('summary')
    handleScrollRightSection(bottomSection)
  }

  const onCWRSuccess = () => {
    refreshOnSuccess?.()
    handleScrollRightSection(bottomSection)
  }

  const createWithdrawRequestProps = useCreateWithdrawRequest(onCWRSuccess)

  const amountRequested = parseFloat(withdrawRequestHookForm.watch('amount'))
  const serviceFee = parseFloat(processFee)
  const total = amountRequested + serviceFee

  const withdrawTotal = showAmount(total)

  const onSubmitRequest = () => {
    const withdrawRequestData = withdrawRequestHookForm.getValues()
    createWithdrawRequestProps.mutate({
      body: {
        total,
        amountRequested,
        serviceFee,
        currency: withdrawRequestData.currency,
        account_bank: withdrawRequestData.account_bank,
        account_number: withdrawRequestData.account_number
      }
    })
  }

  useEffect(() => {
    personalDetailsHookForm.setValue('firstName', getUserData().user.firstName)
    personalDetailsHookForm.setValue('lastName', getUserData().user.lastName)
    personalDetailsHookForm.setValue(
      'phoneNumber',
      getUserData().user.phoneNumber
    )
    personalDetailsHookForm.setValue(
      'idType',
      getUserData().user.governmentIDNumber?.idType || ''
    )
    personalDetailsHookForm.setValue(
      'id',
      getUserData().user.governmentIDNumber?.id || ''
    )
  }, [])

  return (
    <div className="pt-3">
      <HVC view={stage === 'withdraw-request'}>
        <WithDrawRequestForm
          onWithdrawRequest={onWithdrawRequest}
          hookForm={withdrawRequestHookForm}
          balance={balance}
          maxWithdraw={maxWithdraw}
          processFee={processFee}
          withdrawTotal={withdrawTotal}
        />
      </HVC>
      <HVC view={stage === 'summary'}>
        <Summary
          personalDetailsHookForm={personalDetailsHookForm}
          withdrawRequestHookForm={withdrawRequestHookForm}
          onSubmitRequest={onSubmitRequest}
          onPrevious={() => setStage('withdraw-request')}
          createWithdrawRequestProps={createWithdrawRequestProps}
          withdrawTotal={withdrawTotal}
          onClose={onClose}
        />
      </HVC>
      <div ref={bottomSection} />
    </div>
  )
}

const WithDrawRequestForm = ({
  onWithdrawRequest,
  hookForm,
  maxWithdraw,
  processFee,
  balance,
  withdrawTotal
}: {
  onWithdrawRequest: (data: IFH) => void
  hookForm: UseFormReturn<IFH, any>
  maxWithdraw: number
  processFee: string
  balance: string
  withdrawTotal: string
}) => {
  const formComponent: IFormComponent[] = [
    {
      component: 'select',
      id: 'currency',
      label: 'Currency',
      initOptions: { id: 1, label: 'Select Currency', value: '' },
      optionData: [
        {
          id: 2,
          label: 'USD - Dollar',
          value: 'USD'
        },
        {
          id: 3,
          label: 'NGN - Naira',
          value: 'NGN'
        }
      ]
    },
    {
      component: 'input',
      id: 'account_bank',
      label: 'Bank Name',
      placeHolder: 'eg: United Bank for Africa'
    },
    {
      component: 'input',
      id: 'account_number',
      label: 'Account Number',
      placeHolder: 'Enter Bank Account Number'
    },
    {
      id: 'amount',
      component: 'input',
      placeHolder: 'Enter Amount to withdraw',
      label: `Amount`,
      type: 'number'
    }
  ]

  const { amount } = hookForm.watch()

  const isWithdraw = maxWithdraw > 1

  const record: ITableRecord[] = [
    {
      id: '1',
      row: [
        {
          value: 'Amount',
          isLink: false
        },
        {
          value: showAmount(amount),
          isLink: false
        }
      ]
    },
    {
      id: '2',
      row: [
        {
          value: 'Service fee',
          isLink: false
        },
        {
          value: showAmount(processFee),
          isLink: false
        }
      ]
    },
    {
      id: '3',
      row: [
        {
          value: 'Total',
          isLink: false,
          weight: 'ff-bold'
        },
        {
          value: withdrawTotal,
          isLink: false,
          weight: 'ff-bold'
        }
      ]
    }
  ]

  return (
    <>
      <HVC removeDOM view>
        <form
          className="f-column-40"
          onSubmit={hookForm.handleSubmit(onWithdrawRequest)}
        >
          <div className="f-column-30">
            <div className="grid-wrapper-45 gap-30 border-label rounded shadow-sm px-3 pt-3">
              <CardItems title="Balance" value={showAmount(balance)} />
            </div>
            <NoticeComponent notice="Transfers are limited to ( $ USD ) and ( ₦ NGN ) accounts only." />
            <div className="grid-wrapper-40 gap-30">
              <FormBuilder formComponent={formComponent} hookForm={hookForm} />
            </div>
            {isWithdraw ? (
              <DefaultTable header={[]} record={record} hideNumbering />
            ) : null}
          </div>
          <div className="text-right">
            <TypeButton
              title={`Next`}
              buttonShape="curve"
              type="submit"
              buttonType={isWithdraw ? 'bold' : 'disabled'}
              disabled={!isWithdraw}
            />
          </div>
        </form>
      </HVC>
    </>
  )
}

const Summary = ({
  withdrawRequestHookForm,
  personalDetailsHookForm,
  onSubmitRequest,
  onPrevious,
  createWithdrawRequestProps,
  withdrawTotal,
  onClose
}: {
  withdrawRequestHookForm: UseFormReturn<IFH, any>
  personalDetailsHookForm: UseFormReturn<IPersonalDetails, any>
  onSubmitRequest: () => void
  onPrevious: () => void
  createWithdrawRequestProps: IUseAPI<{
    status: string
    message: string
  }>
  withdrawTotal: string
  onClose: () => void
}) => {
  const wRData = [
    {
      label: 'Country',
      value: getCountry(getUserData().user.country)
    },
    {
      label: 'Bank',
      value: withdrawRequestHookForm.getValues('account_bank')
    },
    {
      label: 'Account Number',
      value: withdrawRequestHookForm.getValues('account_number')
    },
    {
      label: 'Amount',
      value: withdrawTotal
    }
  ]

  const pdData = [
    {
      label: 'First Name',
      value: personalDetailsHookForm.getValues('firstName')
    },
    {
      label: 'Last Name',
      value: personalDetailsHookForm.getValues('lastName')
    },
    {
      label: 'Phone Number',
      value: personalDetailsHookForm.getValues('phoneNumber')
    },
    {
      label: 'Government-Issued ID Type',
      value: personalDetailsHookForm.getValues('idType')
    },
    {
      label: 'Government-Issued ID Number',
      value: personalDetailsHookForm.getValues('id')
    }
  ]

  const name =
    personalDetailsHookForm.getValues('firstName') +
    ' ' +
    personalDetailsHookForm.getValues('lastName')

  return (
    <>
      {createWithdrawRequestProps.response.status === 'success' ? (
        <div className="f-column-60 aic">
          <RequestStatus
            description={`Your withdrawal request of ${withdrawTotal} is being processed, you will be notified once its completed.`}
            lottie={hourglass}
            title="Withdraw Request Successful"
            loop
          />
          <TypeButton title="Close" buttonType="danger" onClick={onClose} />
        </div>
      ) : (
        <div className="f-column-30">
          <div>
            <p className="text-small ff-bold">WITHDRAW REQUEST DETAILS</p>
            <div className="grid-wrapper-45 gap-20 border rounded p-3">
              {wRData.map((i, index) => (
                <CardItems title={i.label} value={i.value} key={index} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-small ff-bold">PERSONAL INFORMATION</p>
            <div className="grid-wrapper-45 gap-20 border rounded p-3">
              {pdData
                .filter((i) => i.value)
                .map((i, index) => (
                  <CardItems title={i.label} value={i.value} key={index} />
                ))}
            </div>
          </div>
          <NoticeComponent
            notice={`Ensure the account name matches "${name}" for account number - ${withdrawRequestHookForm.getValues(
              'account_number'
            )}`}
          />
          <div className="f-row-20">
            <TypeButton
              title="Previous"
              buttonType="outlined"
              onClick={onPrevious}
              buttonShape="curve"
            />
            <TypeButton
              title="Submit Withdraw Request"
              onClick={onSubmitRequest}
              buttonShape="curve"
              className="w-100"
              load={createWithdrawRequestProps.isLoading}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default WithDrawRequest

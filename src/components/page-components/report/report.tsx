import { useEffect, useState } from 'react'
import { useFormHook } from '../../utils/hooks'
import * as yup from 'yup'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { TypeButton } from '../../utils/button'
import {
  IResponse,
  defaultGETDataTemplate,
  defaultPATCHDataTemplate,
  useAPIGET,
  useAPIPOST
} from '../../../api'
import {
  ICreateReport,
  ICreateReportResponse,
  IReportResponse,
  reportStatusType
} from '../../../interface/IReport'
import {
  IReportCategories,
  IReportCategory
} from '../../../interface/IReportCategory'
import { showAmount, getUserData } from '../../../constants/global'
import { IMultiBetTicketResponse } from '../../../interface/IBet'
import { _separator, getTime } from '../../utils/helper'
import { useGetTransactions } from '../../../api/transaction'
import { useGetReports, usePatchReport } from '../../../api/reports'
import { IGlobalRightSection } from '../../layout/right-section/utils'

interface ICreateReportHK {
  comment: string
  category: string
}

const createReportSchema = {
  comment: yup.string(),
  category: yup.string().required('please select')
}

const reportFormComponents = (reportCategories?: IReportCategory[]) =>
  [
    {
      id: 'category',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: reportCategories?.map((i) => ({
        id: i._id,
        label: i.title,
        value: i._id
      })),
      label: 'Select Offence'
    },
    {
      id: 'comment',
      component: 'text-area',
      placeHolder: 'Enter comment here',
      label: 'Add comment (optional)'
    }
  ] as IFormComponent[]

export const CreateReport = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const {
    mutate,
    isLoading
    // response
  } = useAPIPOST<ICreateReportResponse>({
    defaultData: { ...defaultPATCHDataTemplate },
    route: 'report'
  })

  const { mutate: getReportCategories, data: reportCategoriesData } =
    useAPIGET<IReportCategories>({
      route: 'report-category',
      defaultData: {
        ...defaultGETDataTemplate,
        data: {
          reportCategories: []
        }
      }
    })

  useEffect(() => {
    getReportCategories({})
  }, [])

  const [hookForm] = useFormHook<ICreateReportHK>(createReportSchema)

  const handleSubmit = (data: ICreateReportHK) => {
    const reportData: ICreateReport = {
      ...data,
      itemId: rsProps?.action?.id || '',
      itemType: 'betcode'
    }
    mutate({ body: reportData })
  }

  const reportCategories = reportCategoriesData.data.reportCategories

  const getSelectedRCDescription = () => {
    const id = hookForm.watch('category')
    return reportCategories.find((rc) => rc._id === id)?.description
  }

  return (
    <div className="f-column-30">
      <FormBuilder
        formComponent={reportFormComponents(reportCategories)}
        hookForm={hookForm}
      />
      <TypeButton
        title="Submit Report"
        onClick={hookForm.handleSubmit(handleSubmit)}
        load={isLoading}
      />
      {hookForm.watch('category') ? (
        <div className="p-2 border rounded mt-3">
          <p className="m-0 text-little">{getSelectedRCDescription()}</p>
        </div>
      ) : null}
      {/* <ResponseComponent
        response={{
          ...response,
          message: response.message.toString().includes('exists')
            ? 'You have reported this code already!'
            : response.message
        }}
      /> */}
    </div>
  )
}

export const ViewReport = ({
  children,
  globalContext
}: IGlobalRightSection & {
  children?: any
}) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { prediction } = rsProps?.data as {
    prediction: IMultiBetTicketResponse
  }

  const getReports = useGetReports()

  const reports = getReports?.data?.data?.reports as unknown as Array<
    IReportResponse<IMultiBetTicketResponse>
  >

  useEffect(() => {
    getReports.mutate({ query: `?itemId=${prediction._id}` })
  }, [])

  const reportProps = usePatchReport()

  const onUpdateStatus = (status: reportStatusType, id: string) => {
    reportProps.mutate({ body: { status }, id })
  }

  const reportStatus: { [key: string]: any } = reports?.reduce(
    (totalReports, report) => {
      if (report.status === 'accepted') totalReports.accepted++
      if (report.status === 'rejected') totalReports.rejected++
      if (report.status === 'under-review') totalReports.underReview++
      if (report.status === 'un-reviewed') totalReports.unReviewed++
      return totalReports
    },
    { accepted: 0, rejected: 0, underReview: 0, unReviewed: 0 }
  ) || { accepted: 0, rejected: 0, underReview: 0, unReviewed: 0 }

  const [selected, setSelected] = useState<string>('')

  const [filteredReports, setFilteredReports] = useState<string[]>([])

  const filterReportItems = (
    report: IReportResponse<IMultiBetTicketResponse>
  ) => {
    function getReport() {
      if (report.status === 'accepted' || report.status === 'rejected')
        return report.status.toLowerCase()
      if (report.status === 'un-reviewed') return 'unreviewed'
      if (report.status === 'under-review') return 'underreview'
      return ''
    }
    if (filteredReports.length)
      return filteredReports.map((i) => i.toLowerCase()).includes(getReport())
    return true
  }

  return (
    <>
      {children}
      <div className="f-column-20">
        <div className="f-row-20 aic flex-wrap py-2">
          {Object.keys(reportStatus).map((i, index) => (
            <TypeButton
              key={index}
              title={_separator(i) + ' (' + reportStatus[i] + ')'}
              buttonSize="small"
              buttonType={filteredReports.includes(i) ? 'bold' : 'outlined'}
              onClick={() => {
                setFilteredReports((prev) => {
                  if (!prev.includes(i)) return [i, ...prev]
                  return prev.filter((p) => p !== i)
                })
              }}
            />
          ))}
        </div>
        {reports?.filter(filterReportItems)?.map((report, index) => (
          <ViewReportItem
            key={index}
            report={report}
            load={reportProps.isLoading}
            onUpdateStatus={onUpdateStatus}
            response={reportProps.response}
            setSelected={() => {
              setSelected(report._id)
            }}
            isSelected={selected === report._id}
          />
        ))}
      </div>
    </>
  )
}

interface IVRItem {
  onUpdateStatus?: (status: reportStatusType, id: string) => void
  load?: boolean
  response?: IResponse
  isSelected?: boolean
  setSelected?: () => void
  report: IReportResponse<IMultiBetTicketResponse> | null
}

export const ViewReportItem: React.FC<IVRItem> = ({
  onUpdateStatus,
  load,
  response,
  isSelected,
  setSelected,
  report
}) => {
  if (!report) return <>reload page</>
  const {
    modified: date,
    user,
    status,
    item,
    _id: id,
    comment,
    itemId
  } = report
  const category = report['report-category']
  const { userName } = user

  const getTransactionProps = useGetTransactions()

  const transaction = getTransactionProps.data?.data?.transactions?.[0] || []

  useEffect(() => {
    getTransactionProps.mutate({ query: `/query?itemId=${itemId}` })
  }, [])

  const infoProps = [
    {
      label: 'Title',
      value: category.title
    },
    {
      label: 'Description',
      value: category.description
    },
    {
      label: 'Comment',
      value: comment
    },
    {
      label: 'Status',
      value: status
    }
  ]
  const itemProps = [
    {
      label: 'Code',
      value: item?.code || '...'
    },
    {
      label: 'Odds',
      value: item?.odds || '...'
    },
    {
      label: 'Bookie',
      value: item?.bookie || '...'
    },
    {
      label: 'Start Date',
      value: item?.startDate ? new Date(item?.startDate).toDateString() : '...'
    },
    {
      label: 'Start Time',
      value: getTime(item?.startDate || '')
    },
    {
      label: 'End Date',
      value: item?.endDate ? new Date(item.endDate).toDateString() : '...'
    },
    {
      label: 'End Time',
      value: getTime(item?.endDate || '')
    }
  ]
  const transactionProps = transaction
    ? [
        {
          label: 'Payment Date',
          value: new Date(transaction.createdAt || '').toDateString()
        },
        {
          label: 'Time',
          value: getTime(transaction.createdAt || '')
        },
        { label: 'Payment Method', value: transaction.paymentMethod },
        { label: 'amount', value: showAmount(transaction.amount) }
      ]
    : [{ label: '', value: '' }]

  const [viewReportItem, setViewReportItem] = useState<boolean>(false)
  const [action, setAction] = useState<reportStatusType>('un-reviewed')
  const isRejecting = isSelected && action === 'rejected' && load
  const isAccepting = isSelected && action === 'accepted' && load
  const isSetUnderReview = isSelected && action === 'under-review' && load
  return (
    <div className="f-column border rounded p-2">
      {!viewReportItem ? (
        <>
          <div className="f-row-40 aic border-bottom pb-2 mb-3">
            <div className="f-row-10 aic">
              <div className="flag-post-user">
                <p className="m-0 text-little ff-bold">
                  {userName?.[0]?.toUpperCase()}
                </p>
              </div>
              <p className="m-0">{userName}</p>
            </div>

            <div className="f-row ml-auto text-right">
              <p className="m-0 text-little color-light">
                {new Date(date).toDateString()}
              </p>
            </div>
          </div>
          <div className="">
            {infoProps.map((info, index) => (
              <div className="f-row ais py-2" key={index}>
                <div className="d-inline-block" style={{ width: '120px' }}>
                  <p className="m-0 text-little">{info.label}:</p>
                </div>
                <p className="m-0 text-little">{info.value}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="f-column-15">
          <p>Code Details</p>
          <div className="grid-wrapper-px-250 gap-10">
            {itemProps.map((info, index) => (
              <div className="f-row ais p-2 w-100 border" key={index}>
                <div className="d-inline-block" style={{ width: '120px' }}>
                  <p className="m-0 text-little">{info.label}:</p>
                </div>
                <p className="m-0 text-little">{info.value}</p>
              </div>
            ))}
          </div>
          <p>Transaction Details</p>
          <div className="grid-wrapper-px-250 gap-10">
            {transactionProps.map((info, index) => (
              <div className="f-row ais p-2 w-100 border" key={index}>
                <div className="d-inline-block" style={{ width: '120px' }}>
                  <p className="m-0 text-little">{info.label}:</p>
                </div>
                <p className="m-0 text-little">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {getUserData().role === 'admin' ? (
        <div className="f-row-20 aic mt-3 pt-3 pb-2 border-top">
          <TypeButton
            title="In Review"
            buttonType={!isSetUnderReview && load ? 'disabled' : 'outlined'}
            buttonSize="small"
            onClick={() => {
              setAction('under-review')
              onUpdateStatus?.('under-review', id)
              setSelected?.()
            }}
            disabled={!isSetUnderReview && load}
            load={isSetUnderReview}
          />
          {status !== 'accepted' && (
            <TypeButton
              title="Accept"
              buttonSize="small"
              buttonType={!isAccepting && load ? 'disabled' : 'bold'}
              onClick={() => {
                setAction('accepted')
                onUpdateStatus?.('accepted', id)
                setSelected?.()
              }}
              load={isAccepting}
              disabled={!isAccepting && load}
            />
          )}
          {status !== 'rejected' && (
            <TypeButton
              title="Reject"
              buttonType={!isRejecting && load ? 'disabled' : 'danger'}
              buttonSize="small"
              onClick={() => {
                setAction('rejected')
                onUpdateStatus?.('rejected', id)
                setSelected?.()
              }}
              load={isRejecting}
              disabled={!isRejecting && load}
            />
          )}
          <div className="ml-auto">
            <p
              className="m-0 text-little text-decoration-underline cursor-pointer color-brand"
              onClick={() => setViewReportItem(!viewReportItem)}
            >
              {viewReportItem ? 'Hide ' : 'View '} Report Item
            </p>
          </div>
        </div>
      ) : null}
      {/* {isSelected && response ? (
        <ResponseComponent response={response} timeout={2000} spaceTop={10} />
      ) : null} */}
    </div>
  )
}

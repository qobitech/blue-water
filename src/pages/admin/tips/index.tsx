import { useEffect } from 'react'
import CardTable from '../reusable/card-table'
import { IGlobalRightSection } from '../../../components/layout/right-section/utils'
import { TypeInput } from '../../../components/utils/input'
import { TypeSelect } from '../../../components/utils/select'
import { TypeSmallButton } from '../../../components/utils/button'
import { IMultiBetTicketResponse } from '../../../interface/IBet'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { _separator, getTimeline } from '../../../components/utils/helper'
import '../page.scss'
import { useGetMultiPredictions } from '../../../api/multi-prediction'
import { ITableRecord } from '../../../components/table/utils'
import { useGlobalContext } from '../../../components/layout/context'
import { useTableAction } from '../../../components/table/table-components'

const AdminTips = () => {
  const { rsProps } = useGlobalContext()

  const multiProps = useGetMultiPredictions()

  useEffect(() => {
    multiProps.mutate({})
  }, [])

  const multiplePredictions = multiProps.data.data.multiplePredictions

  // const [selectedReportItem, setSelectedReportItem] =
  //   useState<IMultiBetTicketResponse>()

  const tableData = multiplePredictions.map((prediction) => ({
    id: prediction._id,
    row: [
      {
        value: prediction.code + ' (' + prediction.odds + 'odds)',
        isLink: false
      },
      {
        value: prediction.bookie,
        isLink: false
      },
      {
        value: getTimeline(prediction.startDate, prediction.endDate),
        isLink: false
      },
      {
        value: prediction.channel?.title,
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'channel',
            title: 'View Channel',
            data: prediction
          })
        }
      },
      {
        value:
          prediction.reviewCount +
          ` review${prediction.reviewCount > 1 ? 's' : ''}`,
        isLink: true,
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'review',
            title: 'Reviews',
            id: prediction._id
          })
        }
      },
      {
        value:
          prediction.reportCount +
          ` report${prediction.reportCount > 1 ? 's' : ''}`,
        isLink: true,
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'report',
            title: 'Report',
            data: {
              prediction
            }
          })
        }
      }
    ],
    rowActions: [
      {
        value: 'Suspend',
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'update',
            component: 'tips',
            id: '1',
            title: 'Suspend Tip'
          })
        },
        buttonType: 'danger'
      }
    ]
  })) as ITableRecord[]

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return {
      SUSPEND: 'Suspend'
    }
  }

  const tableAction = useTableAction(getTableActionEnums())

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-tips">
            <CardTable
              admin
              tableData={tableData}
              onRefresh={() => multiProps.mutate({})}
              load={multiProps.isLoading}
              tableHeader={[
                'Bet Code',
                'Bookie',
                'Timeline',
                'Channel',
                'Review',
                'Report',
                'Action'
              ]}
              tag="Manage all bet tips"
              title="Tips"
              isFilter
              cta={[
                {
                  title: 'Create Tip',
                  action: () => {
                    rsProps?.callSection({
                      action: 'create',
                      component: 'tips',
                      title: 'Create New Tip'
                    })
                  }
                }
              ]}
              tableAction={tableAction}
            >
              <div className="admin-filter-section">
                <TypeInput placeholder="enter title" />
                <TypeSelect initoption={{ label: 'Select role', value: '' }} />
                <div className="admin-filter-cta">
                  <TypeSmallButton title="FILTER" buttonType="outlined" />
                  <TypeSmallButton title="Clear" buttonType="danger" />
                </div>
              </div>
            </CardTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminTips

export const ReportDetails = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { prediction } = rsProps?.data as {
    prediction: IMultiBetTicketResponse
  }

  const reportDetailsSchema = {
    code: yup.string(),
    bookie: yup.string(),
    startDate: yup.string(),
    endDate: yup.string()
  } as const

  const formComponent: IFormComponent[] = Object.keys(reportDetailsSchema).map(
    (i) => ({
      id: i,
      label: _separator(i),
      component: 'input',
      isonlyview: true
    })
  )

  interface IRDS {
    code: string
    bookie: string
    startDate: string
    endDate: string
  }

  type irdsType = keyof IRDS

  const [hookForm] = useFormHook<IRDS>(reportDetailsSchema)

  const getValue = (key: irdsType, data: string): string => {
    if (key === 'startDate' || key === 'endDate')
      return new Date(data).toDateString()
    return data
  }

  useEffect(() => {
    const data: { [key: string]: any } | null | undefined = prediction
    Object.keys(reportDetailsSchema).forEach((i) => {
      hookForm.setValue(
        i as irdsType,
        getValue(i as irdsType, data?.[i] as string)
      )
    })
  }, [])

  return (
    <div className="border rounded mb-4">
      <div className="text-center border-bottom mb-3 py-2">
        <p className="m-0">Item Details</p>
      </div>
      <div className="grid-wrapper-px-200 gap-20 p-2">
        <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      </div>
    </div>
  )
}

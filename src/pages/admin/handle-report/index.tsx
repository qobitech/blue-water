import { useEffect, useState } from 'react'
import { CardHeader } from '../reusable/card-table'
import { TypeInput } from '../../../components/utils/input'
import { TypeSmallButton } from '../../../components/utils/button'
import { ViewReportItem } from '../../../components/page-components/report/report'
import {
  IReportResponse,
  IReportResponses,
  reportStatusType
} from '../../../interface/IReport'
import { useGetReports, useUpdateReport } from '../../../api/reports'
import { IMultiBetTicketResponse } from '../../../interface/IBet'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import DefaultTable from '../../../components/table/default'
import moment from 'moment'
import PaginationComponent from '../../../components/utils/pagination'
import { ArrowLeftSVG } from '../../../components/utils/svgs'
import './index.scss'
import '../page.scss'
import { HVC } from '../../../components/utils/hvc'
import { ITableRecord } from '../../../components/table/utils'

const tabs = {
  UNREVIEWED: 'UN-REVIEWED',
  UNDERREVIEW: 'UNDER-REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
} as const

const HandleReport = () => {
  const [formValue, setFormValue] = useState<string>('')
  const [report, setReport] =
    useState<IReportResponse<IMultiBetTicketResponse> | null>(null)

  const { tabProps, tab } = useTabSection(tabs.UNREVIEWED, tabs)

  const getReportProps = useGetReports()

  const onGetReportByIDSuccess = (data: IReportResponses) => {
    const r = data?.data
      ?.reports?.[0] as unknown as IReportResponse<IMultiBetTicketResponse>
    setReport(r)
  }

  const getReportByIDProps = useGetReports(onGetReportByIDSuccess)

  const getAllReports = (pgNum?: number) => {
    const pg = pgNum || getReportProps.data.currentPage || 1
    getReportProps.mutate({ query: `?status=${tab}&page=${pg}&limit=10` })
  }

  const getReportByID = () => {
    getReportByIDProps.mutate({ query: `?_id=${formValue}` })
  }

  useEffect(() => {
    getAllReports()
  }, [tab])

  const onReportUpdateSuccess = () => {
    getAllReports()
    getReportByID()
  }

  const updateReportProps = useUpdateReport(onReportUpdateSuccess)

  const onUpdateStatus = (status: reportStatusType, id: string) => {
    updateReportProps.mutate({ id, body: { status } })
  }

  const onGetReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formValue) {
      getReportByID()
    }
  }

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setFormValue(value)
  }

  const reports =
    getReportProps?.data?.data?.reports ||
    ([] as unknown as Array<IReportResponse<IMultiBetTicketResponse>>)

  const tableRecord: ITableRecord[] = reports.map((reportItem, index) => ({
    id: index + '',
    row: [
      {
        value: reportItem?.['report-category']?.title,
        isLink: false
      },
      {
        value: moment(reportItem?.modified)?.fromNow(),
        isLink: false
      }
    ],
    rowActions: [
      {
        value: 'Report Details',
        isLink: false,
        buttonType: 'outlined',
        action: () => {
          setReport(
            reportItem as unknown as IReportResponse<IMultiBetTicketResponse>
          )
        }
      }
    ]
  }))

  const handlePagination = (selectedItem: { selected: number }) => {
    getAllReports(selectedItem.selected + 1)
  }

  const onBackClick = () => {
    setReport(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <div className="admin-management">
          <CardHeader
            tag=""
            title="Review Report"
            load={getReportProps.isLoading}
          />
          <form className="pt-4 f-row-10 aic jcs" onSubmit={onGetReport}>
            <div style={{ width: '500px' }}>
              <TypeInput
                placeholder="Enter report id"
                customwidth={700}
                onChange={onChangeInput}
                value={formValue}
              />
            </div>
            <TypeSmallButton
              title="Search"
              load={getReportByIDProps.isLoading}
              type="submit"
            />
          </form>
          <HVC view={!report}>
            <div className="pt-4 f-column gap-10">
              <TabSection
                tabProps={tabProps}
                position="start"
                type="block"
                tabGap="10"
              />
              <div className="border rounded over-flow-auto">
                <DefaultTable
                  header={['Report', 'Modified', 'Action']}
                  record={tableRecord}
                  currentPage={getReportProps.data.currentPage}
                  hideNumbering
                />
              </div>
              <PaginationComponent
                currentPage={getReportProps.data.currentPage}
                pages={getReportProps.data.pages}
                handlePagination={handlePagination}
              />
            </div>
          </HVC>
          <HVC view={!!report}>
            <div
              className="cursor-pointer f-row-10 aic mx-wh-fit mt-4"
              onClick={onBackClick}
            >
              <ArrowLeftSVG />
              <p className="m-0 text-little">Back</p>
            </div>
            <div className="py-5">
              <ViewReportItem
                report={report}
                load={updateReportProps.isLoading}
                onUpdateStatus={onUpdateStatus}
                response={updateReportProps.response}
              />
            </div>
          </HVC>
        </div>
      </div>
    </div>
  )
}

export default HandleReport

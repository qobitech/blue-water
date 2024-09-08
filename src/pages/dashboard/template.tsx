import { FC } from 'react'
import {
  INoticeActionProps,
  NoticeComponent,
  PageContainer
} from '../../components/utils/reusable'
import BreadCrumb, { ICrumb } from '../../components/utils/bread-crumb'
import DashboardWrapper from '../../components/layout/dashboard-wrapper'

export interface ITemplate {
  crumbs: ICrumb[]
  children?: any
  title: string
  nobg?: boolean
  icon?: JSX.Element
  hint?: string
  actionProps?: INoticeActionProps
}

const Template: FC<ITemplate> = ({
  children,
  title,
  crumbs,
  nobg,
  icon,
  hint,
  actionProps
}) => {
  return (
    <PageContainer>
      <div className="bread-crumb-section">
        <BreadCrumb crumbs={crumbs} />
      </div>
      <DashboardWrapper>
        <div style={{ minHeight: '86vh' }}>
          <div
            className={`f-column-33 ${
              nobg ? '' : 'bg-white px-2 pb-2 pt-4 px-lg-4 pb-lg-4 pt-lg-4'
            }  rounded`}
          >
            {title ? (
              <div className="f-row-20 aic">
                <h5 className="header-body-text color-brand m-0">{title}</h5>
                {icon}
              </div>
            ) : null}
            {hint ? (
              <NoticeComponent notice={hint} actionProps={actionProps} />
            ) : null}
            {children}
          </div>
        </div>
      </DashboardWrapper>
    </PageContainer>
    // </PageWrapper>
  )
}

export default Template

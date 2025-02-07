import './style.scss'

const DashboardWrapper = ({ children }: { children?: any }) => {
  return (
    <div className="main-wrapper w-100">
      <div className={`main-content-wrapper `}>{children}</div>
    </div>
  )
}

export default DashboardWrapper

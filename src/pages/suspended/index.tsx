import { TypeButton } from '../../components/utils/button'
import { useLogout } from '../../api/logout'

const SuspendedPage = () => {
  const { logout, logoutLoad } = useLogout()
  return (
    <div className="container mx-auto pt-4" style={{ maxWidth: '600px' }}>
      <div
        className="f-column-30 aic jcc"
        // style={{ height: '30vh' }}
      ></div>
      <div className="f-column-40 text-center">
        <h1 className="m-0">You have been suspended</h1>
        <h2 className="m-0" style={{ fontSize: '18px' }}>
          This means you no longer have access to the platform due to reports of
          guideline violations.
        </h2>
        <p className="m-0">Please be patient while we review your case.</p>
        <div className="f-row jcc">
          <TypeButton
            title="Back to Home"
            buttonShape="curve"
            onClick={logout}
            load={logoutLoad}
          />
        </div>
      </div>
    </div>
  )
}

export default SuspendedPage

import { TypeButton } from '../../components/utils/button'
import Lottie from 'react-lottie'
import suspended from '../../assets/animation/suspended.json'
import { useLogout } from '../../api/logout'

const SuspendedPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: suspended,
    backgroundColor: 'transparent',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const { logout, logoutLoad } = useLogout()
  return (
    <div className="container mx-auto pt-4" style={{ maxWidth: '600px' }}>
      <div
        className="f-column-30 aic jcc"
        // style={{ height: '30vh' }}
      >
        <div
          style={{ maxWidth: '370px', width: '90%', height: '45vh' }}
          className="mx-auto text-center f-column aic jcc"
        >
          <Lottie options={defaultOptions} />
        </div>
      </div>
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

import Lottie from 'react-lottie'
import successLottie from '../../../assets/animation/success.json'

export interface IRequestStatus {
  title: string
  description: string
  lottie: any
  loop?: boolean
  success?: boolean
}

const RequestStatus = ({
  title,
  description,
  lottie,
  loop,
  success
}: IRequestStatus) => {
  const defaultOptions = {
    loop,
    autoplay: true,
    animationData: success ? successLottie : lottie,
    backgroundColor: 'transparent',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div className="f-column-30 aic jcc" style={{ height: '50vh' }}>
      <div
        style={{ maxWidth: '300px', width: '90%', height: 'auto' }}
        className="mx-auto text-center f-row aic jcc"
      >
        <Lottie options={defaultOptions} />
      </div>
      <div className="f-column-10 aic">
        <h4 className="m-0">{title}</h4>
        {description ? (
          <p className="text-little color-label">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

export default RequestStatus

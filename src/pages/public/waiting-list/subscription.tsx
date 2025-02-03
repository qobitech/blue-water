import { useState } from 'react'
import { roleType } from '../../../constants/global'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import {
  ICreateWaitingList,
  waitingListFeaturesEnum
} from '../../../interface/IWaitingList'
import * as yup from 'yup'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { useCreateWaitingList } from '../../../api/waiting-list'
import RequestStatus from '../../../components/utils/request-status'
import { ICPM } from '.'
import { _isMobile } from '../../../components/utils/helper'
import { MailSVG } from '../../../components/utils/svgs'

const optionsData: Array<{ id: number; label: string; value: roleType }> = [
  {
    id: 1,
    label: 'I want bet tips',
    value: 'buyer'
  },
  {
    id: 2,
    label: 'I provide bet tips',
    value: 'seller'
  }
]

const fc: IFormComponent[] = [
  {
    id: 'email',
    component: 'input',
    label: 'Email Address',
    placeHolder: 'Enter email address'
  },
  {
    id: 'role',
    component: 'select',
    initOptions: { label: 'Click to select', value: '', id: 1 },
    optionData: optionsData,
    label: 'Select one'
  }
]

const schema = {
  email: yup.string().required('Email is required'),
  role: yup.string().required('Role is required')
}

const MonthlySubWaitingList: React.FC<ICPM> = ({ isVisible, setIsVisible }) => {
  const [hookForm] = useFormHook<ICreateWaitingList>(schema)

  const [success, setSuccess] = useState<boolean>(false)

  const waitingListProps = useCreateWaitingList(() => {
    setSuccess(true)
  })

  const onJoin = (data: ICreateWaitingList) => {
    waitingListProps.mutate({
      body: {
        email: data.email,
        role: data.role,
        feature: waitingListFeaturesEnum.MONTHLYSUBSCRIPTION
      }
    })
  }
  const onClose = () => {
    hookForm.reset()
    setSuccess(false)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="back-drop" />
      <div style={styles.modal} className="f-column-10 py-5 shadow ">
        {!success ? (
          <div className="position-relative">
            <div className="position-absolute" style={{ right: 0 }}>
              <TypeSmallButton
                title="Close"
                close
                onClick={onClose}
                style={{ background: 'none' }}
              />
            </div>
            <div className="py-3 f-column-13">
              <div className="py-3 f-column-10">
                <h4 className="ff-bold m-0">
                  Betting Tips Straight to your Inbox!
                </h4>
                <p className="color-brand text-medium m-0">
                  Be the first to receive exclusive tips via email when we
                  launch!
                </p>
                <p className="color-label text-tiny m-0">
                  Looking for expert advice or want to share your own? Join the
                  waiting list today
                </p>
              </div>
            </div>
            <form
              style={styles.checkboxContainer}
              className="f-column-23 py-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormBuilder formComponent={fc} hookForm={hookForm} />
            </form>
            <div className="pt-4 pb-3 cta-wrapper">
              <TypeButton
                title="Join the waiting list"
                onClick={hookForm.handleSubmit(onJoin)}
                buttonShape="curve"
                buttonType="black"
                buttonSize="large"
                className="w-100"
                icon={<MailSVG color="#fff" />}
                load={waitingListProps.isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="f-column-70 text-center mt-4 pt-4">
            <RequestStatus
              description={`Thanks for joining the waiting list! We’ll notify you as soon as our monthly subscription program launches.
          `}
              success
              lottie=""
              title={'Waiting List Joined Successfully'}
              loop={false}
            />
            <div>
              <TypeButton title="Close" onClick={onClose} buttonType="danger" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const styles = {
  modal: {
    position: 'fixed' as 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: _isMobile() ? '30px' : '60px',
    zIndex: 1000,
    textAlign: 'center' as 'center',
    maxHeight: '95vh',
    // height: '100%',
    maxWidth: '700px',
    width: '100%',
    borderRadius: '15px'
  },
  text: {
    margin: '0 0 10px'
  },
  checkboxContainer: {
    textAlign: 'left' as 'left',
    margin: '10px auto',
    width: '100%',
    overflow: 'auto',
    height: '100%',
    maxHeight: '85vh'
  },
  buttonContainer: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    gap: '10px'
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px'
  }
}

export default MonthlySubWaitingList

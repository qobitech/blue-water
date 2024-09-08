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
import { TypeButton } from '../../../components/utils/button'
import { useCreateWaitingList } from '../../../api/waiting-list'
import RequestStatus from '../../../components/utils/request-status'
import { ICPM } from '.'

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

const LaunchWaitingList: React.FC<ICPM> = ({ isVisible, setIsVisible }) => {
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
        feature: waitingListFeaturesEnum.LAUNCH
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
      <div style={styles.modal} className="f-column-10 py-4 shadow">
        {!success ? (
          <>
            <div className="py-3">
              <h2>Join the waiting list</h2>
            </div>
            <form
              style={styles.checkboxContainer}
              className="f-column-23 py-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormBuilder formComponent={fc} hookForm={hookForm} />
            </form>
            {/* <ResponseComponent
              response={waitingListProps.response}
              timeout={1000}
            /> */}
            <div style={styles.buttonContainer} className="pt-4 pb-3">
              <TypeButton
                title="Join the waiting list"
                onClick={hookForm.handleSubmit(onJoin)}
                buttonShape="curve"
                load={waitingListProps.isLoading}
              />
              <TypeButton
                title="Close"
                buttonType="danger"
                buttonShape="curve"
                onClick={onClose}
              />
            </div>
          </>
        ) : (
          <div className="f-column-70 text-center mt-4 pt-4">
            <RequestStatus
              description={`Congratulations on joining the waiting list. you will be notified when we launch
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
    padding: '60px',
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

export default LaunchWaitingList

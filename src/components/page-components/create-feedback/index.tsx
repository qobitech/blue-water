import { useEffect, useState } from 'react'
import { createFeedbackStage, userProfileSchema, IUserProfile } from './utils'
import { useFormHook } from '../../utils/hooks'
import './style.scss'
import NotificationModal, { useModal } from '../../utils/modal'
import { HVC } from '../../utils/hvc'
import RegisterForm from './register-form'
import { useGlobalContext } from '../../layout/context'
import { TypeButton } from '../../utils/button'

const CreateFeedback = () => {
  const { rsProps } = useGlobalContext()
  const [stage, setStage] = useState<createFeedbackStage>('Contact Us')

  const [userProfileHookForm] = useFormHook<IUserProfile>(userProfileSchema)

  const notificationProps = useModal()

  const handleContact = () => {
    setStage('Response Status')
  }

  const handleClose = () => {
    notificationProps.handleCloseModal(() => rsProps?.closeSection())
  }

  useEffect(() => {
    notificationProps.handleOpenModal(`Contact Us - BlueWater Shores`)
  }, [])

  return (
    <div className="f-column-17 w-100">
      <NotificationModal
        useNotificationProps={notificationProps}
        size="medium"
        onClose={() => {
          rsProps?.closeSection()
        }}
      >
        <HVC view={stage === 'Contact Us'} removeDOM>
          <RegisterForm
            hookForm={userProfileHookForm}
            handleRegister={handleContact}
            btnTitle="Submit"
          />
        </HVC>
        <HVC view={stage === 'Response Status'} removeDOM>
          <div className="text-center f-column-25 aic py-5">
            <div className="text-center f-column-23 aic py-5">
              <h3>Thank you for reaching out to BlueWater Shores</h3>
              <p>We will get back to you shortly</p>
            </div>
            <TypeButton
              title="Close"
              buttonShape="square"
              buttonType="danger"
              onClick={handleClose}
            />
          </div>
        </HVC>
      </NotificationModal>
    </div>
  )
}

export default CreateFeedback

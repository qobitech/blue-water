import { FC } from 'react'
import NotificationModal from '../../utils/modal'
import { ISubmitFeedbackForm, ISubmitFeedback } from './utils'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { useFormHook } from '../../utils/hooks'
import { TypeButton } from '../../utils/button'
import TermsAndConditions from '../../utils/tandc'

export const SubmitFeedback: FC<ISubmitFeedback> = ({
  notificationProps,
  handleSubmit
}) => {
  const handleClose = () => {}
  return (
    <div>
      <NotificationModal useNotificationProps={notificationProps} size="medium">
        <SubmitFeedbackForm
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </NotificationModal>
    </div>
  )
}

const SubmitFeedbackForm: FC<ISubmitFeedbackForm> = ({
  handleClose,
  handleSubmit
}) => {
  interface IFK {
    name: string
    email: string
    tandc: boolean
  }
  const [hookForm] = useFormHook<IFK>({})

  const fc: IFormComponent[] = [
    {
      label: 'Name',
      id: 'name',
      placeHolder: 'Enter your name',
      component: 'input'
    },
    {
      label: 'Email',
      id: 'email',
      placeHolder: 'Enter your email address',
      component: 'input'
    }
  ]

  return (
    <div className="f-column-33">
      <FormBuilder formComponent={fc} hookForm={hookForm} />
      <TermsAndConditions hookForm={hookForm} id="tandc" />
      <TypeButton title="Submit" onClick={handleSubmit} />
    </div>
  )
}

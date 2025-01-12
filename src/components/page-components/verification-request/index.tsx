import { useState } from 'react'
import { countries, getUserData } from '../../../constants/global'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { useFormHook } from '../../utils/hooks'
import * as yup from 'yup'
import { useCreateVerificationRequest } from '../../../api/verification-request'
import RequestStatus from '../../utils/request-status'
import { HVC } from '../../utils/hvc'
import { IGlobalRightSection } from '../../layout/right-section/utils'

interface IVerificationRequestForm {
  firstName: string
  lastName: string
  phoneNumber: string
  countryOfResidence: string
  idType: string
  id: string
}

const formSchema = {
  firstName: yup.string(),
  lastName: yup.string(),
  phoneNumber: yup.string(),
  countryOfResidence: yup.string(),
  idType: yup.string(),
  id: yup.string()
}

const governmentIDType = [
  'international passport',
  'national ID',
  `driver's license`,
  `voter's ID card`,
  'social security'
]

const VerificationRequest = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps, refreshUserData } = globalContext
  const [success, setSuccess] = useState<boolean>(false)
  const [hookForm] = useFormHook<IVerificationRequestForm>(formSchema)

  const formComponent: IFormComponent[] = [
    {
      id: 'firstName',
      label: 'First Name',
      placeHolder: 'Enter first name',
      component: 'input',
      type: 'text'
    },
    {
      id: 'lastName',
      label: 'Last Name',
      placeHolder: 'Enter last name',
      component: 'input',
      type: 'text'
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      placeHolder: 'Enter phone number',
      component: 'phone',
      type: 'text'
    },
    {
      id: 'countryOfResidence',
      label: 'Country Of Residence',
      placeHolder: '',
      component: 'select',
      type: 'text',
      initOptions: { label: 'Select Country', value: '', id: 1 },
      optionData: countries.map((i, index) => ({
        id: index,
        label: i.name,
        value: i.code
      }))
    },
    {
      id: 'idType',
      label: 'Government ID Type',
      placeHolder: '',
      component: 'select',
      type: 'text',
      initOptions: { label: 'Select Government ID Type', value: '', id: 1 },
      optionData: governmentIDType.map((i, index) => ({
        id: index,
        label: i,
        value: i
      }))
    },
    {
      id: 'id',
      label: 'Government ID Number',
      placeHolder: hookForm?.watch('idType')
        ? 'Enter ' + hookForm?.watch('idType') + ' number'
        : 'Enter Government ID Number',
      component: 'input',
      type: 'text',
      disabled: !hookForm?.watch('idType')
    }
  ]

  const onSuccess = () => {
    setSuccess(true)
    refreshUserData?.()
    rsProps?.onRefresh?.()
  }

  const onFailed = () => {}

  const vRProps = useCreateVerificationRequest(onSuccess, onFailed)

  const handleVerificationRequest = (data: IVerificationRequestForm) => {
    vRProps.mutate({
      body: {
        userId: getUserData()?.user?._id,
        ...data
      }
    })
  }

  const onClose = () => {
    rsProps?.closeSection()
  }

  const isUnderReview =
    getUserData()?.user?.verificationRequest === 'in progress'

  return (
    <>
      <HVC view={isUnderReview}>
        <div className="text-center f-column-33 border rounded mt-4 p-4">
          <h2>Identity Verification In Progress</h2>
          <div>
            <p>
              Please be patient while we review the information you submitted.
            </p>
            <p>
              You&apos;ll receive an in-app notification when it&apos;s done.
            </p>
          </div>
        </div>
      </HVC>
      <HVC view={!isUnderReview}>
        {/* verification request form */}
        <HVC view={!success}>
          <form className="form-section mt-3 px-0">
            <div className="f-column-27">
              <FormBuilder hookForm={hookForm} formComponent={formComponent} />
            </div>
            <div className="f-row pt-5">
              <TypeButton
                title="Send Verification Request"
                onClick={hookForm.handleSubmit(handleVerificationRequest)}
                load={vRProps.isLoading}
                buttonShape="curve"
                className="w-100"
              />
            </div>
            {/* <ResponseComponent response={vRProps.response} /> */}
          </form>
        </HVC>
        {/* verification request api response status */}
        <HVC view={success} className="f-column-70 text-center mt-4 pt-4">
          <RequestStatus
            description={`Please be patient while we review the information you submitted.
          You'll receive an in-app notification when it's done.`}
            success
            lottie=""
            title={'Verification Request Sent Successfully'}
            loop={false}
          />
          <TypeSmallButton
            title="Close"
            onClick={onClose}
            buttonType="danger"
          />
        </HVC>
      </HVC>
    </>
  )
}

export default VerificationRequest

import { GETISSELLER, getCountry, getUserData } from '../../../constants/global'
import moment from 'moment'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { HVC } from '../../../components/utils/hvc'
import { TypeButton } from '../../../components/utils/button'
import { useGlobalContext } from '../../../components/layout/context'
import { CardItems } from '../../../components/utils/card-items'

const tabs = {
  USER: 'USER PROFILE',
  COMPANY: 'COMPANY PROFILE',
  ID: 'USER VERIFICATION DATA'
}

const ProfilePage = () => {
  const { rsProps } = useGlobalContext()
  const level = getUserData()?.user?.level?.[0]?.title || '...'

  const getTabs = () => {
    if (GETISSELLER()) {
      const { COMPANY, ...props } = tabs
      return props
    }
    return tabs
  }

  const { tabProps, isTab } = useTabSection(tabs.USER, getTabs())

  const userDataArray = [
    {
      label: 'Level',
      value: level
    },
    {
      label: 'User Name',
      value: getUserData().user.userName
    },
    {
      label: 'Email',
      value: getUserData().user.email
    },
    {
      label: 'Joined',
      value: getUserData().user.createdAt
        ? new Date(getUserData().user.createdAt).toDateString() +
          ' (' +
          moment(getUserData().user.createdAt).fromNow() +
          ')'
        : 'Not specified'
    },
    {
      label: 'Gender',
      value: getUserData().user.gender || ''
    },
    // {
    //   label: 'Country',
    //   value: getCountry(getUserData().user.country || '')
    // },
    {
      label: 'Role',
      value: getUserData().role
    }
    // {
    //   label: 'Membership',
    //   value: getUserData().user.membership || ''
    // }
  ]

  const idDataArray = [
    {
      label: 'Email',
      value: getUserData().user.email
    },
    {
      label: 'First name',
      value: getUserData().user.firstName || 'Not specified'
    },
    {
      label: 'Last name',
      value: getUserData().user.lastName || 'Not specified'
    },
    {
      label: 'Date of Birth',
      value: getUserData().user.dob
        ? new Date(getUserData().user.dob).toDateString()
        : 'Not specified'
    },
    {
      label: 'Gender',
      value: getUserData().user.gender || ''
    },
    {
      label: 'Country of Residence',
      value: getCountry(getUserData().user.countryOfResidence || '')
    },
    {
      label: 'Government-Issued ID Type',
      value: getUserData().user.governmentIDNumber?.idType || ''
    },
    {
      label: 'Government-Issued ID Number',
      value: getUserData().user.governmentIDNumber?.id || ''
    }
  ]

  const isUser = isTab(tabs.USER)
  const isID = isTab(tabs.ID)

  const onVerifyIdentity = () => {
    rsProps?.callSection({
      action: 'view',
      component: 'tipster-indentification',
      title: 'Verify Your Identity'
    })
  }

  const verificationRequest = getUserData()?.user?.verificationRequest

  return (
    <div className="bg-white pb-1 rounded">
      <div className={`${GETISSELLER() ? 'mb-5' : 'd-none'}`}>
        <TabSection
          tabProps={tabProps}
          position="center"
          type="block"
          tabGap="10"
        />
      </div>
      {/* {(!isAppUser && isUser) || isInApp ? ( */}
      <HVC view={isUser} removeDOM>
        <div className="grid-wrapper-40 gap-30 border rounded p-4">
          {userDataArray.map((data, index) => (
            <CardItems title={data.label} value={data.value} key={index} />
          ))}
        </div>
      </HVC>

      <HVC view={isID} removeDOM>
        {verificationRequest === 'approved' ? (
          <div className="grid-wrapper-40 gap-30 border rounded p-4">
            {idDataArray.map((data, index) => (
              <CardItems title={data.label} value={data.value} key={index} />
            ))}
          </div>
        ) : null}
        {verificationRequest === 'rejected' ? (
          <div className="text-center f-column-33">
            <h2>Identity Verification Request has been rejected</h2>
            <p>
              The information you provided is inaccurate or missing some
              important info. Please check your notification message and then
              update your verification request.
            </p>
            <div className="f-row jcc">
              <TypeButton
                title="Update Verification Request"
                onClick={onVerifyIdentity}
              />
            </div>
          </div>
        ) : null}
        {!verificationRequest || verificationRequest === 'not-reviewed' ? (
          <div className="text-center f-column-33">
            <h2>User Identity Verification</h2>
            <p>Please click the button below to verify your identity.</p>
            <div className="f-row jcc">
              <TypeButton
                title="Verify Your Identity"
                onClick={onVerifyIdentity}
              />
            </div>
          </div>
        ) : null}
        {verificationRequest === 'in progress' ? (
          <div className="text-center f-column-33">
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
        ) : null}
      </HVC>
    </div>
  )
}

export default ProfilePage

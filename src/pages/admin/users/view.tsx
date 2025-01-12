import { IGlobalRightSection } from '../../../components/layout/right-section/utils'
import { IUser } from '../../../interface/IUser'
import { getCountry, getUserRole, typeRoleId } from '../../../constants/global'
import { CardItems } from '../../../components/utils/card-items'

const ViewUser = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>no data</>

  const { rsProps } = globalContext

  const data = rsProps?.data as IUser

  const userData = [
    {
      label: 'Username',
      value: data.userName
    },
    {
      label: 'Role',
      value: getUserRole(data.role as typeRoleId)
    },
    {
      label: 'Email',
      value: data.email
    },
    {
      label: 'Joined',
      value: new Date(data.createdAt).toDateString()
    },
    {
      label: 'Country',
      value: getCountry(data.country)
    },
    {
      label: 'Gender',
      value: data.gender
    },
    {
      label: 'Status',
      value: data.status
    },
    {
      label: 'Level',
      value: data.level?.[0]?.title
    }
  ]

  return (
    <div>
      <div className="grid-wrapper-40 gap-30 border rounded p-4 mt-4">
        {userData.map((i, index) => (
          <CardItems key={index} title={i.label} value={i.value} />
        ))}
      </div>
    </div>
  )
}

export default ViewUser

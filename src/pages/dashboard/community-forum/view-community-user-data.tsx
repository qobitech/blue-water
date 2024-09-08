import { IGlobalRightSection } from '../../../components/layout/right-section'
import { CardItems, OverViewHeader } from '../bet-channel/by-id/data'
import { getCountry, getUserRole } from '../../../constants/global'
import { TypeButton } from '../../../components/utils/button'
import { useGetCommunityForumComments } from '../../../api/community-forum'
import { IGETCommunityForumPost } from '../../../interface/ICommunityForum'

const ViewCommunityUserData = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { post } = rsProps?.data as { post: IGETCommunityForumPost }

  const getCFCommentProps = useGetCommunityForumComments()

  const getCommentUser = () => {
    return getCFCommentProps?.data?.data?.communityForumComments?.filter(
      (comment) => comment._id === rsProps?.slug
    )[0]?.user
  }

  const { user, userLevel } = post || getCommentUser()

  const userRole = getUserRole(user?.role)

  const isSeller = userRole === 'seller'

  if (!user) return <>reload page user</>

  return (
    <div>
      <div className="f-column-20 border px-3 py-4 rounded mt-4">
        <div className="grid-wrapper-45 gap-20">
          <CardItems title="Username" value={user?.userName} />
          <div className="bet-chnnel-item-wrapper">
            <OverViewHeader title="Country" />
            <div className="f-row-10 aic">
              <div className="flag-post-user">
                <p className="m-0 text-little ff-bold">
                  {user?.userName?.[0]?.toUpperCase()}
                </p>
              </div>
              <p className="text-medium m-0">{getCountry(user?.country)}</p>
            </div>
          </div>
          <div className="bet-chnnel-item-wrapper">
            <OverViewHeader title="Level" />
            <div
              className={`mx-wh-fit cf-user-tier-indicator ${userLevel?.title}`}
            >
              <p className="m-0 text-tiny">{userLevel?.title}</p>
            </div>
          </div>
          <div className="bet-chnnel-item-wrapper">
            <OverViewHeader title="User role" />
            <div className={`mx-wh-fit cf-user-role-indicator ${userRole}`}>
              <p className="m-0 text-tiny">{userRole || '...'}</p>
            </div>
          </div>
        </div>
      </div>
      {isSeller ? (
        <div className="pt-4">
          <OtherProps />
        </div>
      ) : null}
    </div>
  )
}

const OtherProps = () => {
  return (
    <div className="f-row-20">
      <TypeButton title="View Predictions" buttonShape="curve" />
      <TypeButton
        title="View Channel"
        buttonShape="curve"
        buttonType="outlined"
      />
      <TypeButton
        title="View Channel Stats"
        buttonShape="curve"
        buttonType="outlined"
      />
    </div>
  )
}

export default ViewCommunityUserData

import { useEffect } from 'react'
import DefaultTable from '../../../components/table/default'
import PaginationComponent from '../../../components/utils/pagination'
import { useGetCommunityForumUser } from '../../../api/community-forum'
import {
  IGETCommunityForum,
  IGETCommunityForumUser
} from '../../../interface/ICommunityForum'
import RightSection, {
  useRightSection
} from '../../../components/layout/right-section'
import UpdateRole from './update-role'
import UpdateStatus from './update-status'
import { ITableRecord } from '../../../components/table/utils'

const CommunityForumFollowers = ({
  forum,
  communityForumUser
}: {
  forum: IGETCommunityForum
  communityForumUser: IGETCommunityForumUser
}) => {
  const getCFUsers = useGetCommunityForumUser()

  const refreshCFUsers = () => {
    getCFUsers.mutate({ query: `?communityId=${forum._id}` })
  }

  useEffect(() => {
    refreshCFUsers()
  }, [])

  const members = getCFUsers.data.data.communityForumUsers || []

  const rsProps = useRightSection<IGETCommunityForumUser>()

  const isAdmin = communityForumUser?.role === 'admin'

  const record: ITableRecord[] = members.map((member, index) => {
    const isBtnType =
      isAdmin || member.role === 'user' ? 'outlined' : 'disabled'
    return {
      id: index + '',
      row: [
        {
          value: member?.user?.userName || '...',
          isLink: false
        },
        {
          value: member?.userLevel?.title || '...',
          isLink: false
        },
        {
          value: member?.role || '...',
          isLink: false
        },
        {
          value: member?.status || '...',
          isLink: false
        }
      ],
      rowActions: [
        {
          value: 'Update role',
          isLink: false,
          buttonType: 'outlined',
          action: () => {
            rsProps.callSection({
              action: 'update',
              component: 'community-forum-user-role',
              title: 'Update User Role',
              data: member
            })
          }
        },
        {
          value: 'Update status',
          isLink: false,
          buttonType: isBtnType,
          action: () => {
            rsProps.callSection({
              action: 'update',
              component: 'community-forum-user-status',
              title: 'Update User Status',
              data: member
            })
          }
        }
      ].filter((_, index) => (isAdmin ? true : index === 1))
    }
  }) as ITableRecord[]

  const handlePagination = (selectedItem: { selected: number }) => {}

  return (
    <div>
      <RightSection rsProps={rsProps}>
        {rsProps.isView('update', 'community-forum-user-role') ? (
          <UpdateRole refreshCFUsers={refreshCFUsers} />
        ) : null}
        {rsProps.isView('update', 'community-forum-user-status') ? (
          <UpdateStatus refreshCFUsers={refreshCFUsers} />
        ) : null}
      </RightSection>
      <div className="pb-3" style={{ overflow: 'auto' }}>
        <DefaultTable
          header={['Username', 'Level', 'Role', 'Status', 'Action']}
          record={record}
          hideNumbering
        />
      </div>
      <PaginationComponent
        currentPage={getCFUsers.data.currentPage}
        pages={getCFUsers.data.pages}
        handlePagination={handlePagination}
      />
    </div>
  )
}

export default CommunityForumFollowers

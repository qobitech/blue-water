import { CardItems, OverViewHeader } from '../bet-channel/by-id/data'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { _mutateHTMLPost } from '../../../components/utils/helper'

const AboutCommunityForum = ({ forum }: { forum: IGETCommunityForum }) => {
  return (
    <div className="f-column gap-20 border-label px-3 py-4 rounded community-forum-about">
      <CardItems title="Forum" value={forum.title} />
      <div>
        <OverViewHeader title="Purpose" />
        <div
          dangerouslySetInnerHTML={{
            __html: _mutateHTMLPost(forum?.description || '')
          }}
          className="font-large"
        />
      </div>
      <div className="grid-wrapper-40 gap-20">
        <CardItems
          title="Established"
          value={new Date(forum.createdAt).toDateString()}
        />
        <CardItems title="Members" value={forum.memberCount || '0'} />
      </div>
      <div>
        <OverViewHeader title="About" />
        <div
          dangerouslySetInnerHTML={{
            __html: _mutateHTMLPost(forum?.about || '')
          }}
          className="font-large"
        />
      </div>
    </div>
  )
}

export default AboutCommunityForum

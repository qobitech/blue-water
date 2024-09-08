import CommunityForum from '.'
import { PageContainer } from '../../../components/utils/reusable'
import { BG } from '../../../constants/global'

const CommunityForumPage = () => {
  return (
    <div className={`PageWrapper ${BG}`}>
      <PageContainer>
        <div className="py-4" />
        <div className="bg-white rounded p-4 mb-4">
          <CommunityForum />
        </div>
      </PageContainer>
    </div>
  )
}

export default CommunityForumPage

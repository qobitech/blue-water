import { RulesItem } from './join-community-forum'
import { rules } from './data'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'

const CommunityForumRules = ({ forum }: { forum: IGETCommunityForum }) => {
  return (
    <div>
      <div></div>
      <div className="f-column gap-20 border-label px-3 py-4 rounded">
        {rules.map((rule, index) => (
          <RulesItem key={index} index={index + 1} rule={rule} />
        ))}
      </div>
    </div>
  )
}

export default CommunityForumRules

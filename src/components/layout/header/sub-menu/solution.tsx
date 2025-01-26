import {
  AccessibilitySVG,
  AnalysisSVG,
  BoostersSVG,
  BrandSVG,
  CreatorSVG,
  EventSVG,
  ImprovementSVG,
  InnovativeSVG,
  LaunchSVG,
  OptimizationSVG,
  ReputationSVG,
  RewardSVG,
  SpecialistSVG
} from '../../../utils/svgs'

const forSubmenuItems = [
  {
    title: 'Brands & Companies',
    icon: <BrandSVG />
  },
  {
    title: 'Creators & Experts',
    icon: <CreatorSVG />
  },
  {
    title: 'Specialists & Doers',
    icon: <SpecialistSVG />
  }
]
const useCasesSubmenuItems = [
  {
    title: 'Post-Launch Insights',
    description: 'Gather user impressions to refine your product or service',
    icon: <AnalysisSVG />
  },
  {
    title: 'Spot Improvement Areas',
    description: 'Capture raw feedback to identify key upgrades',
    icon: <ImprovementSVG />
  },
  {
    title: 'Innovative Solutions',
    description: 'Brainstorm ideas for better services or exciting launches',
    icon: <InnovativeSVG />
  },
  {
    title: 'Creative Optimization',
    description: 'Refine campaigns using direct community insights',
    icon: <OptimizationSVG />
  },
  {
    title: 'Brand Reputation Check',
    description: 'Understand public opinion on your brand’s image',
    icon: <ReputationSVG />
  },
  {
    title: 'Rebranding Feedback',
    description: 'Test your new identity’s effectiveness with real opinions',
    icon: <LaunchSVG />
  },
  {
    title: 'Accessibility Reviews',
    description: 'Get actionable input on inclusivity in physical spaces',
    icon: <AccessibilitySVG />
  },
  {
    title: 'Event Engagement',
    description: 'Measure audience response at live festivals or expos',
    icon: <EventSVG />
  },
  {
    title: 'Fun Brand Boosters',
    description: 'Use trivia to create buzz and build brand awareness',
    icon: <BoostersSVG />
  },
  {
    title: 'Reward Experiences',
    description: 'Engage and retain customers with interactive loyalty perks',
    icon: <RewardSVG />
  }
]

export const SolutionSubMenu = ({ id }: { id?: string }) => {
  return (
    <div className="f-row-33">
      <div className="flex-basis-33 f-column-17 sub-menu-product-product border-right">
        <h5>For</h5>
        <ul className="f-column-17">
          {forSubmenuItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              <div className="icon-container">{i.icon}</div>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-basis-63">
        <div className="f-column-17 sub-menu-product-features">
          <h5>Use cases</h5>
          <ul className="grid-wrapper-40 gap-17">
            {useCasesSubmenuItems.map((i, index) => (
              <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
                <div className="icon-container">{i.icon}</div>
                {i.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

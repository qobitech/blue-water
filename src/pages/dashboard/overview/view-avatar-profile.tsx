import { useState } from 'react'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { avatarType } from './avatars'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { HVC } from '../../../components/utils/hvc'
import {
  ArrowLeftSVG,
  CasualSVG,
  ConservativeSVG,
  LeftNavSVG,
  PreviewSVG,
  ProfitableSVG,
  RightNavSVG,
  RiskTakerSVG
} from '../../../components/utils/svgs'
import { useJoinCommunityForum } from '../../../api/community-forum'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { _mutateHTMLPost } from '../../../components/utils/helper'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const path2Improvement: { [key: string]: string[] } = {
  profitable: [
    `Continue placing small bets but incorporate advanced analytics to identify the most profitable opportunities.`,
    `Set aside time to review past bets, analyzing what worked and what didn’t to refine strategies.`,
    `Establish specific financial goals for each betting session to maintain focus and motivation.`
  ],
  'risk taker': [
    `While enjoying high-stakes bets, implement a strategy to set limits on losses to protect your bankroll.`,
    `Instead of always going for massive odds, occasionally try medium-risk bets to balance potential returns.`,
    `Incorporate mindfulness techniques to help manage excitement and stress, ensuring better decision-making during bets.`
  ],
  conservative: [
    `Continue studying the game but add historical data analysis to improve decision-making.`,
    `Seek mentors or experienced bettors who can provide guidance while still making independent choices.`,
    `Use patience to wait for the perfect betting opportunity, reinforcing that careful planning leads to success.`
  ],
  casual: [
    `Engage in friendly betting competitions to increase confidence without pressure.`,
    `Focus on understanding just a few basic betting concepts instead of overwhelming yourself with details.`,
    `Host betting nights with friends to enhance enjoyment and create a supportive community while keeping the fun alive.`
  ]
}

const prosCons: { [key: string]: { pros: string[]; cons: string[] } } = {
  profitable: {
    pros: [
      `Consistent wins over time`,
      `Builds a solid bankroll`,
      `Low stress, steady growth`
    ],
    cons: [`Smaller, less frequent wins`, `Requires patience and discipline`]
  },
  'risk taker': {
    pros: [
      `Potential for big, exciting wins`,
      `High adrenaline and thrill`,
      `Can make a lot in a short time`
    ],
    cons: [`High risk of losing`, `Inconsistent results`]
  },
  conservative: {
    pros: [
      `Smart, well-thought-out bets`,
      `Higher chance of winning due to strategy`,
      `Less risky and more calculated`
    ],
    cons: [`Slower pace`, `Fewer bets, less excitement`]
  },
  casual: {
    pros: [
      `Fun and social experience`,
      `No pressure, just enjoyment`,
      `Easy-going and relaxed betting`
    ],
    cons: [`Less focus on winning`, `Smaller potential payouts`]
  }
}

const avatarIcons: { [key: string]: JSX.Element } = {
  profitable: <ProfitableSVG />,
  'risk taker': <RiskTakerSVG />,
  conservative: <ConservativeSVG />,
  casual: <CasualSVG />
}

const stageEnum = {
  OVERVIEW: 'overview',
  PROSCONS: 'pros and cons',
  IMPROVEMENT: 'improvement',
  INITIATION: 'initiation'
} as const

type stageEnumType = (typeof stageEnum)[keyof typeof stageEnum]

const ViewAvatarProfile = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps, setNotification } = globalContext

  const navigate = useNavigate()

  const { forum, forums } = rsProps?.data as {
    forum: IGETCommunityForum
    forums: IGETCommunityForum[]
  }

  const [localAvatar, setLocalAvatar] = useState<avatarType>(
    () => forum.tag as avatarType
  )

  const avatarProfile = forums.filter((i) => i.tag === localAvatar)?.[0]
  const avatarPathToImprovement = path2Improvement[localAvatar]
  const avatarProsCons = prosCons[localAvatar]

  const [stage, setStage] = useState<stageEnumType>('overview')

  const joinCFProps = useJoinCommunityForum(
    () => {
      setStage('initiation')
    },
    () => {
      setStage('overview')
      setNotification?.('Something went wrong', false)
    }
  )

  const handleUserAvatarUpdate = (avatar: avatarType) => () => {
    rsProps?.addRightSectionHistory()
    rsProps?.callSection({
      action: 'create',
      component: 'community-forum-join',
      title: `Join ${avatarProfile?.title}`,
      data: {
        ...rsProps?.data,
        forum: avatarProfile
      }
    })
  }

  const handleAction = (action: stageEnumType) => () => {
    setStage(action)
  }

  const avatarObj: { [key: string]: avatarType } = {
    '1': 'profitable',
    '2': 'risk taker',
    '3': 'conservative',
    '4': 'casual'
  }

  const getAvatarIndex = (prev: avatarType) => {
    return Object.values(avatarObj).indexOf(prev) + 1
  }

  const onLoop = (value: number) => {
    const numberOfAvatars = Object.keys(avatarObj).length
    if (value > numberOfAvatars) return 1
    if (value < 1) return numberOfAvatars
    return value
  }

  const onPrev = () => {
    setLocalAvatar((prev) => avatarObj[`${onLoop(getAvatarIndex(prev) - 1)}`])
  }

  const onNext = () => {
    setLocalAvatar((prev) => avatarObj[`${onLoop(getAvatarIndex(prev) + 1)}`])
  }

  const onVisitCommunity = () => {
    rsProps?.closeSection()
    navigate(`${pageurl.COMMUNITYFORUM}?forum=${avatarProfile.slug}`)
  }

  return (
    <>
      <HVC removeDOM view={stage === 'overview'} className="h-100">
        <div className="f-column-23 mt-2 h-100">
          <div className="f-row-40 jcsb aic avatar-profile-view border-label rounded px-4">
            <div className="gap-33 aic avatar-header">
              {avatarIcons[localAvatar]}
              <h4 className="m-0 ff-bold">{avatarProfile.title}</h4>
              <HVC removeDOM view={!avatarProfile.isMember}>
                <TypeSmallButton
                  title={`Join`}
                  buttonType="outlined"
                  onClick={handleUserAvatarUpdate(localAvatar)}
                  load={joinCFProps.isLoading}
                />
              </HVC>
              <HVC
                removeDOM
                view={avatarProfile.isMember}
                className="f-row-15 aic"
              >
                <TypeSmallButton
                  title={`Member`}
                  buttonType="active"
                  disabled
                  style={{ cursor: 'default' }}
                />
                <div
                  className="hw-mx cursor-pointer link-svg"
                  onClick={onVisitCommunity}
                >
                  <PreviewSVG />
                </div>
              </HVC>
            </div>
            <div className="text-center f-row-40 jcc">
              <div className="icon-wrapper f-row aic" onClick={onPrev}>
                <LeftNavSVG />
              </div>
              <div className="icon-wrapper f-row aic" onClick={onNext}>
                <RightNavSVG />
              </div>
            </div>
          </div>
          <div className="border-label rounded p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: _mutateHTMLPost(avatarProfile.about)
              }}
              className="m-0"
              style={{ fontSize: '18px', lineHeight: '2.2rem' }}
            />
          </div>
          <div
            className="text-small color-brand ff-bold m-0"
            dangerouslySetInnerHTML={{
              __html: _mutateHTMLPost(avatarProfile.description)
            }}
          />
          <div className="f-row jcsb mt-auto pb-5 mb-5">
            <TypeButton
              title="Pros & Cons"
              buttonShape="curve"
              buttonType="outlined"
              onClick={handleAction('pros and cons')}
            />
            <TypeButton
              title="Path to improvement"
              buttonShape="curve"
              buttonType="outlined"
              onClick={handleAction('improvement')}
            />
          </div>
        </div>
      </HVC>
      <HVC
        removeDOM
        view={stage === 'pros and cons'}
        className="f-column-7 h-100"
      >
        <div>
          <h4 className="m-0">Pros & Cons</h4>
        </div>
        <div className="f-column-7">
          <div className="f-row-20 aic avatar-profile-view">
            {avatarIcons[localAvatar]}
            <p className="m-0 ff-bold color-brand">The {localAvatar}</p>
          </div>
          <div className="f-column-7 border-label rounded p-4">
            <label className="input-label-component">Pros</label>
            <ul className="f-column-23">
              {avatarProsCons.pros.map((i, index) => (
                <li key={index} className="text-small">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="f-column-7 border-label rounded p-4">
            <label className="input-label-component">Cons</label>
            <ul className="f-column-23">
              {avatarProsCons.cons.map((i, index) => (
                <li key={index} className="text-small">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="f-row jcsb mt-auto mb-4 pt-3">
          <TypeButton
            title="Path to improvement"
            buttonShape="curve"
            buttonType="outlined"
            onClick={handleAction('improvement')}
          />
          <TypeButton
            title="Main page"
            buttonShape="curve"
            buttonType="outlined"
            onClick={handleAction('overview')}
            icon={<ArrowLeftSVG />}
          />
        </div>
      </HVC>
      <HVC
        removeDOM
        view={stage === 'improvement'}
        className="f-column-7 h-100"
      >
        <div>
          <h4 className="m-0">Path To Improvement</h4>
        </div>
        <div className="f-column-7">
          <div className="f-row-20 aic avatar-profile-view">
            {avatarIcons[localAvatar]}
            <p className="m-0 ff-bold color-brand">The {localAvatar}</p>
          </div>
          <ul className="f-column-23 border-label rounded p-5">
            {avatarPathToImprovement.map((i, index) => (
              <li key={index} className="text-small">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="f-row jcsb mt-auto mb-4">
          <TypeButton
            title="Pros & Cons"
            buttonShape="curve"
            buttonType="outlined"
            onClick={handleAction('pros and cons')}
          />
          <TypeButton
            title="Main page"
            buttonShape="curve"
            buttonType="outlined"
            onClick={handleAction('overview')}
            icon={<ArrowLeftSVG />}
          />
        </div>
      </HVC>
    </>
  )
}

export default ViewAvatarProfile

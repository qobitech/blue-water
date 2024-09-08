import { getUserData } from '../../../constants/global'
import {
  CasualSVG,
  ConservativeSVG,
  ProfitableSVG,
  RiskTakerSVG
} from '../../../components/utils/svgs'
import { useGlobalContext } from '../../../components/layout/context'

export type avatarType =
  | 'profitable'
  | 'risk taker'
  | 'conservative'
  | 'casual'
  | 'undecided'

interface IAvatarData {
  img: JSX.Element
  title: string
  tag: avatarType
  color: string
  animal: string
  description: string
  tagline: string
}

const Avatars = () => {
  const { rsProps } = useGlobalContext()
  const isbuyer = getUserData().role === 'buyer'

  const viewAvatar = (avatar: avatarType) => {
    rsProps?.callSection({
      action: 'view',
      component: 'avatars',
      title: `Avatar - ${avatar}`,
      data: {
        avatar
      }
    })
  }

  const isplural = isbuyer ? 's' : ''
  const avatarsData: IAvatarData[] = [
    {
      img: <ProfitableSVG />,
      title: `The Profitable${isplural}`,
      tag: 'profitable',
      color: '#FAE18F',
      animal: 'Squirrel',
      tagline: 'Grow Your Wealth with Smart, Steady Bets',
      description: `Symbolizes careful planning and saving, as squirrels gather and store food, reflecting the strategy of making small, consistent bets for profit.`
    },
    {
      img: <RiskTakerSVG />,
      title: `The Risk Taker${isplural}`,
      tag: 'risk taker',
      color: '#EC6337',
      animal: 'Eagle',
      tagline: 'Embrace Bold Risks for Big Rewards',
      description: `Represents boldness and a keen eye for opportunities, as eagles soar high and take risks to catch their prey, mirroring the thrill of high-stakes betting.`
    },
    {
      img: <ConservativeSVG />,
      title: `The Conservative${isplural}`,
      tag: 'conservative',
      color: '#5AB3F0',
      animal: 'Owl',
      tagline: 'Bet with Patience for Lasting Success',
      description: `Conveys patience, wisdom and careful analysis, highlighting the strategic and patient approach to betting.`
    },
    {
      img: <CasualSVG />,
      title: `The Casual Player${isplural}`,
      tag: 'casual',
      color: '#DF9C5C',
      animal: 'Dolphin',
      tagline: 'Play, Connect, and Enjoy the Game!',
      description: `Symbolizes playfulness and social interaction, as dolphins are known for their fun-loving nature and camaraderie, reflecting the enjoyable and social aspects of casual gambling.`
    }
  ]
  // const header = {
  //   buyer: {
  //     title: 'Who Will You Stand Behind This Season?',
  //     description: 'Discover your winning partner as the new season unfolds!'
  //   },
  //   seller: {
  //     title: 'Who Will You Become This Season?',
  //     description: 'Shape your strategy and make your mark'
  //   }
  // }

  // const h = isbuyer ? header.buyer : header.seller
  return (
    <div
      className="position-relative avatars-landing f-column-13"
      style={{ zIndex: 5 }}
    >
      {/* <div>
        <h4>{h.title}</h4>
        <p className="color-label text-little">{h.description}</p>
      </div> */}
      <div className="f-row-43 avatars-section-landing">
        {avatarsData.map((i, index) => (
          <div className="hw-mx f-column-33" key={index}>
            <div
              className={`f-column-33 avatar-item ${i.animal} cursor-pointer text-center`}
              onClick={() => viewAvatar(i.tag)}
            >
              {i.img}
              <div className="w-100">
                <div className="mx-auto avatar-cta text-left hw-mx">
                  <p className="m-0 title text-little">{i.title}</p>
                  {/* <RightSVG /> */}
                </div>
              </div>
            </div>
            <div className="avatar-description text-center">
              <p className="description text-tiny">{i.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Avatars

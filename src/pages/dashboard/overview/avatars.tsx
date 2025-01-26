import { useEffect } from 'react'
import { useGetCommunityForum } from '../../../api/community-forum'
import Skeleton from '../../../components/utils/skeleton'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { useGlobalContext } from '../../../components/layout/context'

export type avatarType = 'profitable' | 'risk taker' | 'conservative' | 'casual'

const Avatars = () => {
  const header = {
    title: 'Introducing: The Vanguards',
    description: `Join like-minded players, shape your strategy, and make your mark.`
  }

  return (
    <div className="f-column-13">
      <div>
        <h4>{header.title}</h4>
        <p className="color-label text-little">{header.description}</p>
      </div>
      <AvatarsBody />
    </div>
  )
}

const AvatarsBody = () => {
  const { rsProps, global } = useGlobalContext()

  const getCFProps = useGetCommunityForum()

  // return avatars
  const getCommunityForums = () => {
    getCFProps.mutate({ query: `?status=active` })
  }

  const avatars = global.state.getCommunityForum.data.communityForums.filter(
    (i) => i.title !== 'Support & Feedback'
  )

  useEffect(() => {
    if (!avatars.length) getCommunityForums()
  }, [])

  const viewAvatar = (avatar: IGETCommunityForum) => {
    rsProps?.callSection({
      action: 'view',
      component: 'avatars',
      title: `Avatar`,
      data: {
        forum: avatar,
        forums: avatars
      }
    })
  }

  const avatarsData: { [key: string]: JSX.Element } = {
    profitable: <></>,
    'risk taker': <></>,
    conservative: <></>,
    casual: <></>
  }

  if (!avatars?.length && getCFProps.isLoading)
    return <Skeleton h={'232.5px'} />

  return (
    <div className="f-row-7 jcsb avatars-section bg-white rounded">
      {avatars.map((i, index) => (
        <div
          key={index}
          className={`f-column-22 avatar cursor-pointer rounded p-5 text-center jcc aic ${i.icon}`}
          onClick={() => viewAvatar(i)}
        >
          {avatarsData[i.tag]}
          <p className=" m-0 text-little">{i.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Avatars

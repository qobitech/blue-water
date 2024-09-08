import { useEffect } from 'react'
import { PageContainer } from '../../../components/utils/reusable'
import BetChannelTable from '../../../components/tables/bet-channel'
import PaginationComponent from '../../../components/utils/pagination'
import { useGetAllPublicChannels } from '../../../api/channels'
import { useParams } from 'react-router-dom'
import Skeleton from '../../../components/utils/skeleton'
import { useGlobalContext } from '../../../components/layout/context'

const Channel = () => {
  return (
    <div className="py-5" style={{ background: '#fff' }}>
      <PageContainer className="f-column-40">
        <div className="text-center pt-5 pb-4">
          <h5 className="HeaderBodyLandingText">Channels</h5>
        </div>
        <div className="w-100 rounded-50 border-top border-bottom bg-white p-0 p-lg-4">
          <ChannelBody />
        </div>
      </PageContainer>
    </div>
  )
}

const ChannelBody = () => {
  const { rsProps, global } = useGlobalContext()
  const getAllChannelProps = useGetAllPublicChannels()
  const params = useParams()

  const onRefresh = (page?: number) => {
    getAllChannelProps.mutate({ query: `?page=${page || 1}` })
  }

  const getChannelByID = () => {
    rsProps?.callSection({
      action: 'view',
      component: 'bet-channel-item',
      title: 'Channel',
      data: {
        pageTitle: params.slug,
        slug: params.slug
      }
    })
  }

  const getChannelPrediction = () => {
    rsProps?.callSection({
      action: 'view',
      component: 'predictions',
      title: params.slug + ' - Predictions',
      data: {
        pageTitle: params.slug,
        slug: params.slug
      }
    })
  }

  useEffect(() => {
    onRefresh()
    if (params.slug) {
      if (params.prediction) {
        getChannelPrediction()
      } else {
        getChannelByID()
      }
    }
  }, [])

  const allData = global.state.getPublicChannels

  const dataProps = {
    channels: allData?.data?.channels || [],
    pages: allData?.pages || 1,
    currentPage: allData?.currentPage || 1,
    load: getAllChannelProps.isLoading
  }

  const handlePagination = (selectedItem: { selected: number }) => {
    onRefresh(selectedItem.selected + 1)
  }

  if (!dataProps.channels.length && dataProps.load) return <Skeleton />

  return (
    <>
      <BetChannelTable
        betChannels={dataProps.channels}
        myChannel={false}
        onSubSuccess={onRefresh}
      />
      <PaginationComponent
        currentPage={dataProps.currentPage}
        pages={dataProps.pages}
        handlePagination={handlePagination}
      />
    </>
  )
}

export default Channel

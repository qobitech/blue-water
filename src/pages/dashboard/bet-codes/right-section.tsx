import { IGlobalRightSection } from '../../../components/layout/right-section'
import BetTicketTableRightSection from '../../../components/tables/bet-ticket-right-section'
import BetTicketWrapper from './wrapper'
import { useGetMultiPredictionByID } from '../../../api/multi-prediction'
import { IBetChannelInfo } from '../../../interface/IBet'

const BetTicketsRightSection = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps, route } = globalContext
  const data = rsProps?.data as unknown as IBetChannelInfo

  const multiBetProps = useGetMultiPredictionByID()

  const isDashboard = route !== 'public' && route !== 'auth'

  const handleMultiBetsQuery = (query?: string) => {
    const reqQuery = query ? query.replace('?', '&') : ''
    const shareQuery = isDashboard ? '' : '&shareOption=All'
    multiBetProps.mutate({
      query: `?slug=${data.slug}${reqQuery}${shareQuery}`
    })
  }

  return (
    <BetTicketWrapper
      multiBetProps={multiBetProps}
      handleMultiBetsQuery={handleMultiBetsQuery}
      loading={multiBetProps.isLoading}
    >
      <BetTicketTableRightSection />
    </BetTicketWrapper>
  )
}

export default BetTicketsRightSection

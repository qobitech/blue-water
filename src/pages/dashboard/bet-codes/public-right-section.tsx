import { IGlobalRightSection } from '../../../components/layout/right-section'
import BetTicketTableRightSection from '../../../components/tables/bet-ticket-right-section'
import { useMultiBetTicketsQuery } from '../../../api/multi-prediction'
import PublicBetTicketWrapper from './public-wrapper'
import { IBetChannelInfo } from '../../../interface/IBet'

const PublicBetTicketRightSection = ({
  globalContext
}: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps, route } = globalContext
  const data = rsProps?.data as unknown as IBetChannelInfo

  const isDashboard = route !== 'auth' && route !== 'public'

  const multiBetProps = useMultiBetTicketsQuery()

  const handleMultiBetsQuery = (query?: string) => {
    const reqQuery = query ? query.replace('?', '&') : ''
    const shareQuery = isDashboard ? '' : '&shareOption=All'
    multiBetProps.getMultiBets(`?slug=${data.slug}${reqQuery}${shareQuery}`)
  }

  return (
    <PublicBetTicketWrapper
      multiBetProps={multiBetProps}
      handleMultiBetsQuery={handleMultiBetsQuery}
      loading={multiBetProps.isLoading}
    >
      <BetTicketTableRightSection />
    </PublicBetTicketWrapper>
  )
}

export default PublicBetTicketRightSection

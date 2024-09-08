import { useEffect } from 'react'
import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { useGetCompetition } from '../../../../api/competition'
import { HVCLoad } from '../../../../components/utils/hvc'
import { CardItems } from '../../bet-channel/by-id/data'

const ViewTournament = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const id = rsProps?.dataById as unknown as string

  const getTournamentProps = useGetCompetition()

  useEffect(() => {
    getTournamentProps.mutate({ query: `?_id=${id}` })
  }, [])

  const tournament = getTournamentProps?.data?.data?.competitions?.[0] || []

  if (!id) return <>No data found</>

  const tournamentArray = [
    {
      label: 'Tournament',
      value: tournament.title,
      copy: true
    },
    {
      label: 'Description',
      value: tournament?.description,
      copy: true
    },
    {
      label: 'Start Date',
      value: new Date(tournament?.startDate).toDateString(),
      copy: true
    },
    {
      label: 'End Date',
      value: new Date(tournament?.endDate).toDateString(),
      copy: true
    },
    {
      label: 'Number of Games',
      value: tournament?.numberOfGames,
      copy: true
    }
  ]

  return (
    <HVCLoad
      view
      removeDOM
      load={getTournamentProps.isLoading}
      className="grid-wrapper-40 gap-40 border rounded p-4"
    >
      {tournamentArray.map((i, index) => (
        <CardItems title={i.label} value={i.value} key={index} />
      ))}
    </HVCLoad>
  )
}

export default ViewTournament

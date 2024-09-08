import { waitingListType } from '../../../interface/IWaitingList'
import LaunchWaitingList from './launch'
import MonthlySubWaitingList from './subscription'

export interface ICPM {
  setIsVisible: (visible: boolean) => void
  isVisible: boolean
}

const WaitingList = ({
  type,
  isVisible,
  setIsVisible
}: ICPM & { type: waitingListType }) => {
  if (type === 'launch v2')
    return (
      <LaunchWaitingList isVisible={isVisible} setIsVisible={setIsVisible} />
    )
  if (type === 'monthly subscription')
    return (
      <MonthlySubWaitingList
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    )
  return <></>
}

export default WaitingList

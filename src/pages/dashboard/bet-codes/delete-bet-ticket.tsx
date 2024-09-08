import { IBetTicket } from '../../../interface/IBet'
import { _separator } from '../../../components/utils/helper'

interface ICBG {
  data: IBetTicket
  // handleSubmit: (data: IEditPredictGameSchema) => void
  load?: boolean
}

const DeleteBetTicket: React.FC<ICBG> = ({ data }) => {
  const filterData = (i: string) => {
    return (
      i !== 'betChannelId' &&
      i !== 'betChannelSlug' &&
      i !== 'shareOption' &&
      i !== 'status' &&
      i !== 'subscription' &&
      i !== 'createdAt' &&
      i !== 'modified' &&
      i !== 'id' &&
      i !== 'userId' &&
      i !== 'betTags' &&
      i !== 'payPerTip' &&
      i !== 'discountPPT' &&
      i !== 'referralLink' &&
      i !== 'upvote'
    )
  }

  const getKey = (key: string) => {
    switch (key) {
      case 'platform':
        return 'bookie'
      case 'betCode':
        return 'bookingNumber'
      default:
        return key
    }
  }

  return (
    <div className="mx-auto w-100 bg-white px-2">
      {Object.keys(data)
        .filter(filterData)
        .sort((a, b) => {
          if (a < b) return -1
          else return 1
        })
        .map((i, index) => (
          <div
            key={index}
            className="f-row aic jcsb w-100 border-bottom pb-3 pt-2"
          >
            <p className="m-0 text-small">{_separator(getKey(i))}</p>
            <p className="m-0 text-small">{Object.values(data)[index]}</p>
          </div>
        ))}
    </div>
  )
}

export default DeleteBetTicket

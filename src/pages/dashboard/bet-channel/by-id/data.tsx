import { useState } from 'react'
import { IBetChannelResponse } from '../../../../interface/IBet'
import { CheckSVG, CopySVG } from '../../../../components/utils/svgs'
import {
  GETISSELLER,
  showAmount,
  getUserData
} from '../../../../constants/global'
import { getNumberOfTickets } from '../../../../components/utils/helper'
import { useCopy } from '../../../../components/utils/hooks'
import './style.scss'
import { HVCLoad } from '../../../../components/utils/hvc'
import { MinusSVG, PlusSVG } from '../../../../components/utils/svgs/f-awesome'

export const ChannelDetails = ({
  betChannel,
  isLoad
}: {
  betChannel?: IBetChannelResponse
  isLoad?: boolean
}) => {
  if (!betChannel) return <>reload page</>

  const isOwner =
    GETISSELLER() && getUserData()?.user?._id === betChannel?.userId

  return (
    <HVCLoad removeDOM view load={isLoad} className="f-column-33">
      <CardItems title="Channel" value={betChannel.title} />
      <div className="bet-chnnel-item-wrapper" style={{ minHeight: '80px' }}>
        <OverViewHeader title="About" />
        <p className="font-large">{betChannel?.description}</p>
      </div>
      <div className="grid-wrapper-40 gap-20">
        {isOwner && (
          <>
            <CardItems
              title="Created"
              value={new Date(betChannel?.createdAt).toDateString()}
            />
            <CardItems
              title="Modified"
              value={new Date(betChannel?.modified).toDateString()}
            />
          </>
        )}
        <CardItems
          title="Prediction"
          value={
            getNumberOfTickets(betChannel?.numberOfPredictions) +
            betChannel?.frequency
          }
        />
        <CardItems
          title="Minimum Odds (Per prediction)"
          value={'Over ' + (betChannel?.odds - 0.1) || '0'}
        />
        <CardItems
          title="Per Prediction Cost (PPC)"
          value={
            betChannel.subscription === 'free'
              ? betChannel.subscription
              : showAmount(betChannel.perPredictionCost)
          }
        />
      </div>
    </HVCLoad>
  )
}

export const OverViewHeader = ({
  title,
  moreInfo,
  onMoreInfo,
  isInfo
}: {
  title: string
  moreInfo?: boolean
  isInfo?: boolean
  onMoreInfo?: () => void
}) => {
  return (
    <p className="text-little mb-2 color-label">
      {title}{' '}
      {moreInfo ? (
        <span onClick={onMoreInfo}>{isInfo ? <MinusSVG /> : <PlusSVG />}</span>
      ) : null}
    </p>
  )
}

export const CardItemsInfo = ({
  title,
  value,
  url,
  onUrlClick,
  info
}: {
  title: string
  value: string | number
  url?: boolean
  onUrlClick?: () => void
  info?: string
}) => {
  const [isMoreInfo, setIsMoreInfo] = useState<boolean>(false)
  const onMoreInfo = () => {
    if (info) setIsMoreInfo(!isMoreInfo)
  }
  return (
    <div
      className={`pin_card ${
        isMoreInfo ? 'pin_card_medium' : 'pin_card_small'
      }`}
    >
      <OverViewHeader
        title={title}
        moreInfo={!!info}
        onMoreInfo={onMoreInfo}
        isInfo={isMoreInfo}
      />
      {!url ? (
        <p className="text-medium">{value}</p>
      ) : (
        <p
          className="text-medium cursor-pointer"
          onClick={() => {
            onUrlClick?.()
            window.open(value as string, '_blank')
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {value}
        </p>
      )}
      {isMoreInfo ? (
        <div className="mt-2 pr-3">
          <p className="text-tiny m-0">{info}</p>
        </div>
      ) : null}
    </div>
  )
}

export interface ICardItemCTA {
  title: string
  action?: () => void
  icon?: string | JSX.Element
}

export interface ICardItem {
  title: string
  value: string | number
  url?: boolean
  onUrlClick?: () => void
  copy?: boolean
}

export const CardItems = ({
  title,
  value,
  url,
  onUrlClick,
  copy
}: ICardItem) => {
  const copyProps = useCopy()
  const onCopy = () => {
    copyProps.copy(value as string)
  }
  function isValidURL(str: string) {
    try {
      // eslint-disable-next-line no-new
      new URL(str)
      return true
    } catch (e) {
      return false
    }
  }
  const valueToURL = () => {
    if (typeof value === 'string' && isValidURL(value))
      return value.replace(/www./g, 'https://')
    return `https://google.com/search?q=${value}`
  }
  return (
    <>
      <div className="bet-chnnel-item-wrapper">
        <OverViewHeader title={title} />
        <div className="item-value gap-7">
          {!url ? (
            <p className="text-medium m-0">{value}</p>
          ) : (
            <p
              className={`text-medium cursor-pointer m-0`}
              onClick={() => {
                onUrlClick?.()
                window.open(valueToURL(), '_blank')
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {value}
            </p>
          )}
          {copy ? (
            <div className="hw-max cursor-pointer" onClick={onCopy}>
              {copyProps?.copySuccess ? (
                <CheckSVG color="green" />
              ) : (
                <CopySVG />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

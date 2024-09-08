import RequestStatus from '../../../utils/request-status'
import wallet from '../../../../assets/animation/wallet.json'
import { useNavigate } from 'react-router-dom'
import {
  IPaymentDetails,
  transactionItemType
} from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import './style.scss'
import { clearTransRef, IRightSection } from '../../../layout/right-section'

export const Successful = ({
  children,
  title,
  response,
  paymentItemType
}: {
  children?: any
  title?: string
  response?: string
  paymentItemType: transactionItemType | undefined
}) => {
  return (
    <div className="f-column-73">
      <div className="f-column-60 aic">
        <RequestStatus
          description={response || ''}
          lottie={wallet}
          success={paymentItemType !== 'credit-wallet'}
          title={title || 'Payment Successful'}
          loop={false}
        />
      </div>
      {children}
    </div>
  )
}

export const Failed = ({
  rsProps
}: {
  rsProps: IRightSection<{}> | undefined
}) => {
  return (
    <div>
      <div className="f-row-10 aic">
        <h5 className="m-0 color-brand">Payment Cancelled / Failed</h5>
      </div>
      <div className="pt-3 pb-2 border-bottom">
        <p className="text-small">
          We are sorry that your payment did not go through
        </p>
      </div>
      <div className="pt-5">
        <p className="text-little color-label">TROUBLE SHOOT</p>
      </div>
      <div className="pt-2 f-column-10">
        <div className="py-3 order-bottom">
          <p className="m-0 text-medium">
            Check your internet connection, make sure it is stable
          </p>
        </div>
        <div className="py-3">
          <p className="m-0 text-medium">
            <span
              className="cursor-pointer color-brand"
              onClick={() => {
                clearTransRef()
                rsProps?.callSection({
                  action: 'view',
                  component: 'fund-wallet',
                  title: 'Fund Wallet'
                })
              }}
            >
              Retry payment
            </span>{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

interface InstructionCTA {
  title: string
  url: string
  action?: () => void
  external?: boolean
}

export interface IInstruction {
  pre?: string
  post?: string
  cta?: InstructionCTA[]
}

export const getTitle = (transactionType?: transactionItemType) => {
  switch (transactionType) {
    case 'credit-wallet':
      return 'Your wallet has been credited'
    default:
      return 'Payment Successful'
  }
}

export const getInstructions = (
  transactionType?: transactionItemType,
  paymentDetail?: IPaymentDetails,
  rsProps?: IRightSection<{}>
): IInstruction[] => {
  switch (transactionType) {
    case 'credit-wallet':
      if (rsProps?.additionalAmountNeeded) {
        return paymentDetail?.itemType === 'credit-wallet'
          ? []
          : [
              {
                cta: [
                  {
                    title: 'Continue to payment',
                    url: pageurl.NOTIFICATION,
                    external: false,
                    action: () => {
                      rsProps?.removeRightSectionHistory()
                      rsProps?.clearRightSectionHistory()
                    }
                  }
                ]
              }
            ]
      } else return []
    case 'betcode':
      return [
        {
          pre: 'Check',
          cta: [
            {
              title: 'notifications page',
              url: pageurl.NOTIFICATION,
              external: false
            }
          ],
          post: 'to view bet code'
        },
        {
          pre: 'Go to',
          cta: [
            {
              title: 'my bet page',
              url: pageurl.BETTICKETS,
              external: false
            }
          ],
          post: 'and view bet code'
        }
      ]
    default:
      return [
        { pre: '', cta: [{ title: '', url: '', external: false }], post: '' }
      ]
  }
}

export const NextSteps = ({
  rsProps,
  instructions
}: {
  rsProps?: IRightSection<{}>
  instructions: IInstruction[]
}) => {
  const noInstruction = !instructions?.length
  const isMore = instructions.length > 1
  const title = `NEXT STEP${isMore ? 'S' : ''}`
  return (
    <>
      {noInstruction ? null : (
        <div className="f-column-33 aic">
          <p className="text-tiny color-label m-0">{title}</p>
          <ul className="instructions-section f-column-20 text-center aic m-0 p-0">
            {instructions.map((instruction, index) => (
              <InstructionItem
                key={index}
                cta={instruction.cta}
                pre={instruction.pre}
                post={instruction.post}
                rsProps={rsProps}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

const InstructionItem = ({
  pre,
  post,
  cta,
  rsProps
}: IInstruction & { rsProps?: IRightSection<{}> }) => {
  const navigate = useNavigate()

  const onClick = (url: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(url, '_blank')
    } else {
      navigate(url)
      rsProps?.closeSection()
    }
  }

  return (
    <li className="text-small">
      {pre}&nbsp;&nbsp;
      <span className="text-decoration-underline color-brand cursor-pointer">
        {cta?.map((i, index) => {
          const isAction = typeof i.action === 'function'
          return (
            <span
              key={index}
              onClick={() =>
                isAction ? i.action?.() : onClick(i.url, i.external)
              }
            >
              {i.title}
            </span>
          )
        })}
      </span>
      &nbsp;&nbsp;{post}
    </li>
  )
}

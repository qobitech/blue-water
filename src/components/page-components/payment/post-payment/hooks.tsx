import { defaultGETDataTemplate, useAPIGET } from '../../../../api'
import {
  IPaymentConfirmation,
  IPaymentConfirmationData
} from '../../../../interface/IPayment'

export interface IUPC {
  data: IPaymentConfirmation | undefined
  isLoading: boolean
  verifyTransaction: (txref: string) => void
}

export const usePaymentConfirmation = (): IUPC => {
  // eslint-disable-next-line @typescript-eslint/naming-convention

  const { mutate, data, isLoading } = useAPIGET<IPaymentConfirmation>({
    route: 'pay/verify-transaction',
    defaultData: {
      ...defaultGETDataTemplate,
      data: { transaction: {} as IPaymentConfirmationData }
    },
    noMemoize: true
  })

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const verifyTransaction = (tx_ref: string) => {
    if (tx_ref) mutate({ query: `?tx_ref=${JSON.parse(tx_ref)}` })
  }

  return {
    data,
    isLoading,
    verifyTransaction
  }
}

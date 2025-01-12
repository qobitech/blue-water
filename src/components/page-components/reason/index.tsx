import { useState } from 'react'
import { TypeTextArea } from '../../utils/text-area'
import { TypeButton } from '../../utils/button'
import { IRightSection } from '../../layout/right-section/utils'

export interface IReason {
  onAction: (reason: string) => void
  buttonTitle: string
}

const Reason = ({ rsProps }: { rsProps?: IRightSection<{}> }) => {
  const { onAction, buttonTitle } = rsProps?.data as unknown as IReason
  const [reason, setReason] = useState<string>('')

  const onHandleReason = ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target
    setReason(value)
  }

  const onSubmit = () => {
    onAction?.(reason)
    rsProps?.closeSection()
  }

  return (
    <div className="f-column-33 pt-4">
      <TypeTextArea
        value={reason}
        onChange={onHandleReason}
        placeholder="Enter reason"
        label="Reason"
      />
      <TypeButton title={buttonTitle} onClick={onSubmit} buttonShape="curve" />
    </div>
  )
}

export default Reason

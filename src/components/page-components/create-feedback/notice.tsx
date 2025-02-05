import { FC } from 'react'
import { TypeButton } from '../../utils/button'
import { LogoTextSVG } from '../../utils/svgs/f-awesome'

interface INotice {
  cta: 'explore property' | 'partner with us'
  proceed: () => void
  cancel: () => void
}

export const Notice: FC<INotice> = ({ cta, proceed, cancel }) => {
  return (
    <div
      className="f-column-53 pt-5 aic text-center"
      style={{ height: '90vh' }}
    >
      <LogoTextSVG />
      <div className="text-center">
        <h3 className="header-txt-landing">
          To move forward, it&apos;s essential that we align with your
          objectives. Please click the button below to proceed.
        </h3>
      </div>
      <div className="f-column-17 aic w-100 mt-4">
        <TypeButton
          title="Proceed"
          buttonShape="square"
          buttonSize="large"
          buttonType="black"
          onClick={proceed}
          className="w-100"
        />
        <TypeButton
          title="Cancel"
          buttonShape="square"
          buttonSize="medium"
          buttonType="outlined"
          className="border-0"
          onClick={cancel}
        />
      </div>
    </div>
  )
}

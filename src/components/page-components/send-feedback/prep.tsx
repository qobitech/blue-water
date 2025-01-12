import { IRightSection } from '../../layout/right-section/utils'
// import { TypeButton } from '../../utils/button'
import { OverViewHeader } from '../../utils/card-items'
import { _isMobile } from '../../utils/helper'
import { useCountDown } from '../../utils/hooks'
// import { RecordSVG } from '../../utils/svgs'
import TermsAndConditions from '../../utils/tandc'
import { usePrepSectionCTA } from './hooks'

const Prep = ({
  onRecord,
  purpose,
  company,
  rsProps
}: {
  onRecord: () => void
  purpose: string
  company: string
  rsProps: IRightSection<{}> | undefined
}) => {
  const timeLeft = useCountDown(10)

  usePrepSectionCTA(rsProps, onRecord, timeLeft)

  return (
    <div className={_isMobile() ? 'f-column-33' : 'f-column-43'}>
      <div className="f-column">
        <ul
          className="f-column-13 m-0 p-5 mx-auto w-100 border rounded"
          // style={{ maxWidth: '600px' }}
        >
          <div>
            <p className="color-label">INSTRUCTION</p>
          </div>
          <li>Make sure there&apos;s no noise in the background.</li>
          <li>
            Remember to introduce yourself. <i>eg: My name is ...</i>
          </li>
          {/* <li>
            For authenticity, also say where you&apos;re rec from.{' '}
            <i>eg: I&apos;m calling from...</i>
          </li> */}
          <li>
            Ensure to speak clearly so that your feedback is easily understood.
          </li>
          <li>Please keep your message under 2 minutes.</li>
        </ul>
      </div>
      <div className="text-center">
        <h1 className={_isMobile() ? 'font-37 m-0' : 'font-77 m-0'}>
          {timeLeft}
        </h1>
      </div>
      <div className="f-column-33 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="f-column-33 border-label rounded-23 p-4 d-none">
          <div>
            <OverViewHeader title="Permission to Record and Store" />
            <TermsAndConditions text="I consent to my feedback being recorded and securely stored for analysis." />
          </div>
          <div>
            <OverViewHeader title="Usage of Feedback" />
            <TermsAndConditions
              text={`I agree that my feedback can be used for ${purpose}`}
            />
            <TermsAndConditions
              text={`I consent to the use of my feedback in public contexts.`}
            />
          </div>
          <div>
            <OverViewHeader title="Anonymity and Identification" />
            <TermsAndConditions text="I am comfortable being identified by my name and/or location." />
            <TermsAndConditions text="I want my feedback attributed to me" />
          </div>
          <div>
            <OverViewHeader title="Contact Permission" />
            <TermsAndConditions text="I allow the company to contact me for follow-up questions or additional information." />
          </div>
          <div>
            <OverViewHeader title="Data Retention" />
            <TermsAndConditions text="I understand that my feedback will be stored for as long as is required by the requester" />
          </div>
          <div>
            <OverViewHeader title="Data Retention" />
            <TermsAndConditions
              text={`I consent to my feedback being shared with third parties associated with ${company} for the purposes outlined.`}
            />
          </div>
        </div>
        {/* <TermsAndConditions />
        <TypeButton
          title="Record"
          buttonSize="large"
          buttonType={timeLeft === 0 ? 'black' : 'disabled'}
          disabled={timeLeft !== 0}
          icon={<RecordSVG color="#fff" />}
          className="w-100"
          onClick={onRecord}
        /> */}
      </div>
    </div>
  )
}

export default Prep

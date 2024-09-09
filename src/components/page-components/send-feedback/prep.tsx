import { OverViewHeader } from '../../../pages/dashboard/bet-channel/by-id/data'
import { TypeButton } from '../../utils/button'
import { useCountDown } from '../../utils/hooks'
import { LogoSVG } from '../../utils/svgs'
import TermsAndConditions from '../../utils/tandc'

const Prep = ({
  onRecord,
  purpose,
  company
}: {
  onRecord: () => void
  purpose: string
  company: string
}) => {
  const timeLeft = useCountDown(10)

  return (
    <div className="f-column-43">
      <div className="border-label rounded-23 p-4">
        <ul className="f-column-13 m-0 py-3">
          <li>Make sure there&apos;s no noise in the background.</li>
          <li>
            Remember to introduce yourself. <i>eg: My name is ...</i>
          </li>
          <li>
            For authenticity, also say where you&apos;re calling from.{' '}
            <i>eg: I&apos;m calling from...</i>
          </li>
          <li>
            Ensure to speak clearly so that your feedback is easily understood.
          </li>
          <li>Please keep your message under 2 minutes.</li>
        </ul>
      </div>
      <div className="text-center">
        <h1 className="font-77 m-0">{timeLeft}</h1>
      </div>
      <div className="f-column-33">
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
        <TermsAndConditions />
        <TypeButton
          title="Record"
          buttonSize="large"
          buttonType={timeLeft === 0 ? 'black' : 'disabled'}
          disabled={timeLeft !== 0}
          icon={<LogoSVG color="#fff" />}
          className="w-100"
          onClick={onRecord}
        />
      </div>
    </div>
  )
}

export default Prep

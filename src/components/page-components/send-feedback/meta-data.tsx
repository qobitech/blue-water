import { IFeedBack } from '../../../pages/public/landing-page/data'

export const MetaData = ({
  feedbackContent
}: {
  feedbackContent: IFeedBack
}) => {
  const metadata = [
    {
      label: 'Company',
      value: feedbackContent.company,
      link: feedbackContent.companyWebsite
    },
    {
      label: 'Requester',
      value: feedbackContent.requester
    },
    {
      label: 'Purpose',
      value: feedbackContent.purpose
    },
    {
      label: 'Location',
      value: feedbackContent.location
    },
    {
      label: 'Category',
      value: feedbackContent.category
    },
    {
      label: 'Email',
      value: feedbackContent.supportEmail
    }
  ]

  return (
    <div className="bg-light p-4 rounded grid-wrapper-30 gap-19">
      {metadata.map((i, index) => (
        <div key={index}>
          <p className="m-0 mb-1 font-9 color-label">{i.label}</p>
          <p className="m-0 font-11">{i.value}</p>
        </div>
      ))}
    </div>
  )
}

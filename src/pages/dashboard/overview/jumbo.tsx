export interface ISCTA {
  title: string
  action: () => void
  type: 'bold' | 'disabled' | 'outlined' | 'danger'
}

export const JumboSection = ({ campaignTitle }: { campaignTitle: string }) => {
  return (
    <>
      <div className="WelcomeBanner mt-4 aic">
        <div>
          <h5 className="header-body-text">{campaignTitle}</h5>
        </div>
      </div>
    </>
  )
}

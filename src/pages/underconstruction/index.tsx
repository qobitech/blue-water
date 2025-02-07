import { PageContainer } from '../../components/utils/reusable'
import { gallery } from '../../assets'
import './style.scss'
import { TypeButton } from '../../components/utils/button'

const UnderConstruction = () => {
  return (
    <>
      <div className={`PageWrapper`}>
        <div className="ContentWrapper pb-4">
          <PageContainer>
            <div className="w-100 f-column-33 aic container text-center">
              <h3>Under Construction</h3>
              <img
                src={gallery.underconstruction.src}
                alt={gallery.underconstruction.alt}
                style={{ height: '200px' }}
              />
              <div className="f-column-10">
                <h5>Coming Soon!</h5>
                <p>
                  We&apos;re hard at work building something special just for
                  you.
                </p>
                <p>
                  Our website is currently under construction, but we can&apos;t
                  wait to share it with you.
                </p>
                <p>
                  Stay tuned for updates and get ready to explore everything we
                  have to offer!
                </p>
                <p>Thank you for your patience!</p>
                <div>
                  <TypeButton
                    title="Get notified when we launch"
                    buttonSize="medium"
                    buttonShape="curve"
                  />
                </div>
              </div>
            </div>
          </PageContainer>
        </div>
      </div>
    </>
  )
}

export default UnderConstruction

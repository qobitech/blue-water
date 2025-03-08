import { FC } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { IJumbotron } from './utils'
import { Reveal } from './reveal'

export const JumboTron: FC<IJumbotron> = ({
  createFeedback,
  handleScrollRightSection
}) => {
  return (
    <section className="jumbotron">
      <div className="content container">
        <div className="f-column-43 text-center">
          <div className="content-text text-left px-4 f-column-33">
            <div className="f-row-17 aic">
              <p className="m-0">
                Discover Opportunities with{' '}
                <b className="header-txt-color">Bluewater Shores Realty</b>
              </p>
            </div>
            <h1 className="header-txt-landing">
              Your Trusted Partner in Real Estate Investment
            </h1>
          </div>
          <Reveal className="cta-wrapper container f-row">
            <TypeButton
              title="Partner With Us"
              buttonSize="large"
              buttonType="outlined"
              className="border-0"
              buttonShape="square"
              aria-label="Explore the Property - BlueWater Shores"
              onClick={() => createFeedback('Explore the Property')}
            />
            <TypeButton
              title="Investment Opportunity"
              buttonSize="large"
              buttonType="outlined"
              buttonShape="square"
              className="text-white"
              style={{ background: 'none' }}
              aria-label="Read FAQ - BlueWater Shores"
              onClick={handleScrollRightSection}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

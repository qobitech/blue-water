import { FC, useState } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { AccordionPageSection } from '../faq'
import { faqdata } from './data'
import { Reveal } from './reveal'
import { IFAQ } from './utils'

export const FAQ: FC<IFAQ> = ({ createFeedback }) => {
  const [openAccordion, setOpenAccordion] = useState(0)
  return (
    <section className="faq section-text">
      <div className="container f-column-40">
        <div className="container text-center">
          <h2 className="header-txt-landing">
            Frequently asked <br />
            questions
          </h2>
        </div>
        <div className="content border-0">
          <div className="AccordionSection bg-white">
            {faqdata.map((i, index) => (
              <AccordionPageSection
                answer={i.answer}
                header={i.header}
                id={i.id}
                key={i.id}
                index={index + 1}
                noborder={index === faqdata.length - 1 ? 'true' : 'false'}
                setOpenAccordion={setOpenAccordion}
                openAccordion={openAccordion}
              />
            ))}
          </div>
        </div>
        <Reveal className="cta-wrapper container p-0 jcc">
          <TypeButton
            buttonSize="large"
            buttonType="bold"
            buttonShape="square"
            title="Contact Us"
            aria-label="Contact Us - BlueWater Shores"
            onClick={() => createFeedback('Contact Us')}
          />
          <TypeButton
            buttonSize="large"
            buttonType="outlined"
            buttonShape="square"
            title="Partner with Us"
            aria-label="Partner with Us - BlueWater Shores"
            onClick={() => createFeedback('Partner with Us')}
          />
        </Reveal>
      </div>
    </section>
  )
}

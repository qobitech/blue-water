import { useState } from 'react'
import { AccordionPageSection } from '../../../public/faq'
import { TypeButton } from '../../../../components/utils/button'
import { PreviewSVG } from '../../../../components/utils/svgs'

const instructiondata = [
  {
    id: 1,
    header: 'Overview',
    answer: `This section displays a summary of the channel's overall performance: the total number of games the channel has predicted, the number of successful predictions, as reported by customers, an average rating based on customer feedback.`
  },
  {
    id: 2,
    header: 'Performance',
    answer: `This section displays a bar graph that illustrates the channel's monthly performance by showing the number of games won versus the total games played.`
  },
  {
    id: 3,
    header: 'Rating',
    answer: `This section displays a bar graph depicting the number of customer ratings received each month, giving you an idea of customer engagement and satisfaction trends over time.`
  }
]

const BetStatsInstruction = () => {
  const [openAccordion, setOpenAccordion] = useState(0)
  return (
    <div className="f-column-33">
      <div className="py-4">
        <h3 className="m-0">All you need to know about Channel Stats</h3>
      </div>
      <div className="f-column-7">
        <label className="input-label-component">Introduction</label>
        <div className="p-4 border-label rounded">
          <p className="text-small m-0">
            Channel Stats is a powerful tool designed to help you make informed
            decisions about which bet channel to get bet tips from. By providing
            clear insights into the performance and customer satisfaction of
            various bet channels, Channel Stats ensures you have the data you
            need to choose wisely and improve your betting outcomes.
          </p>
        </div>
      </div>
      <div className="f-column-7">
        <label className="input-label-component">Features</label>
        <div className="border-label rounded" style={{ overflow: 'hidden' }}>
          <div className="AccordionSection bg-white">
            {instructiondata.map((i, index) => (
              <AccordionPageSection
                answer={i.answer}
                header={i.header}
                id={i.id}
                key={i.id}
                index={index + 1}
                noborder={
                  index === instructiondata.length - 1 ? 'true' : 'false'
                }
                setOpenAccordion={setOpenAccordion}
                openAccordion={openAccordion}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="f-column-7">
        <label className="input-label-component">
          How to View Channel Stats
        </label>
        <div className="p-4 border-label rounded">
          <p className="text-small m-0">
            To access the stats, simply navigate to the table and click on the
            text labeled &quot;Stats.&quot;
          </p>
        </div>
      </div>
      <div className="f-row-20 aic">
        <TypeButton
          title="Video Tutorial"
          buttonType="outlined"
          icon={<PreviewSVG />}
          iconPosition="right"
        />
        <TypeButton title="Close" buttonType="danger" />
      </div>
    </div>
  )
}

export default BetStatsInstruction

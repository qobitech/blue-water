import { MinusSVG, PlusSVG } from '../../../components/utils/svgs'
import './style.scss'

export const PAGE_SIZE = 10

export const AccordionPageSection = ({
  id,
  header,
  answer,
  noborder,
  openAccordion,
  setOpenAccordion,
  index
}: {
  id: number
  header: string
  answer: string
  noborder: 'true' | 'false'
  setOpenAccordion: React.Dispatch<React.SetStateAction<number>>
  openAccordion: number
  index: number
}) => {
  const isId = openAccordion === id
  return (
    <div className={`accordion-row ${noborder === 'true' ? 'no-border' : ''}`}>
      <div
        className="accordion-row-header"
        onClick={() => setOpenAccordion(isId ? 0 : id)}
      >
        <div className="f-row aic">
          <h1 className="accordion-header-text">{header}</h1>
        </div>
        <div className="accordion-control">
          {isId ? <MinusSVG /> : <PlusSVG />}
        </div>
      </div>
      {isId && (
        <div className="accordion-row-body">
          <p className="m-0 ff-regular font-14" style={{ lineHeight: '24px' }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

import { TypeButton } from '../../../components/utils/button'
import { gallery } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import { GETISSELLER } from '../../../constants/global'

export interface ISCTA {
  title: string
  action: () => void
  type: 'bold' | 'disabled' | 'outlined' | 'danger'
}

export const SalesSection = ({
  campaignTitle,
  cta,
  tagline
}: {
  campaignTitle: string
  tagline: string
  cta?: ISCTA[]
}) => {
  const navigate = useNavigate()
  const onExplore = () => {
    navigate(pageurl.BETTICKETS)
  }
  const imgData = [
    gallery.laliga,
    gallery.bundesliga,
    gallery.ligue1,
    gallery.premiership,
    gallery.seriaa
  ]
  return (
    <div className="rounded py-5 px-4 shadow-sm bg-white f-column-23 border-label">
      <div className="f-column-7">
        <h2 className="header-body-text ff-bold">{campaignTitle}</h2>
        <div className="ResponsiveDivLeft">
          <p className="ff-bold color-brand text-little">{tagline}</p>
        </div>
      </div>
      <div className="f-row flex-wrap justify-content-between w-100 cta-section gap-33">
        <div className="f-row-30 aic flex-wrap img-section">
          {imgData.map((i, index) => (
            <img
              src={i.src}
              alt={i.alt}
              key={index}
              style={{ height: '20px' }}
            />
          ))}
        </div>
        <TypeButton
          title={GETISSELLER() ? 'Add Bet Code' : 'Explore Bet Tips'}
          buttonType="bold"
          buttonShape="curve"
          buttonSize="medium"
          onClick={onExplore}
        />
      </div>
    </div>
  )
}

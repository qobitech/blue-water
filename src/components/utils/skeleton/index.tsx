import './Skeleton.scss' // Import your CSS file

interface ISK {
  nobg?: boolean
  h?: string
}

const Skeleton: React.FC<ISK> = ({ nobg, h }) => {
  return (
    <div
      className={`skeleton ${nobg ? 'nobg' : ''}`}
      style={{ height: h || 'auto' }}
    >
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  )
}

export default Skeleton

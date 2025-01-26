const learnItems = [
  {
    title: 'Blog'
  },
  {
    title: 'Webinars'
  }
]
const communityItems = [
  {
    title: 'Case studies'
  },
  {
    title: 'Community hub'
  }
]
const supportItems = [
  {
    title: 'Help Center'
  },
  {
    title: 'Contact Support'
  }
]

export const ResourcesSubMenu = ({ id }: { id?: string }) => {
  return (
    <div className="grid-wrapper-30 gap-33">
      <div className="f-column-17 sub-menu-product-product">
        <h5>Learn</h5>
        <ul className="f-column-7">
          {learnItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="f-column-17 sub-menu-product-product">
        <h5>Community</h5>
        <ul className="f-column-7">
          {communityItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="f-column-17 sub-menu-product-product">
        <h5>Support</h5>
        <ul className="f-column-7">
          {supportItems.map((i, index) => (
            <li className={`f-row-12 aic ${id ? 'open' : ''}`} key={index}>
              {i.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

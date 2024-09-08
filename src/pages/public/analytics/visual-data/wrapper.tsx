export const VisualDataWrapper = ({ children }: { children?: any }) => {
  return (
    <div className="position-relative">
      <div
        className="position-absolute bg-white"
        style={{
          width: '160px',
          height: '30px',
          zIndex: 403,
          bottom: 0,
          left: 0
        }}
      />
      {children}
    </div>
  )
}

export const categories = [
  {
    label: 'Jan'
  },
  {
    label: 'Feb'
  },
  {
    label: 'Mar'
  },
  {
    label: 'Apr'
  },
  {
    label: 'May'
  },
  {
    label: 'Jun'
  },
  {
    label: 'Jul'
  },
  {
    label: 'Aug'
  },
  {
    label: 'Sept'
  },
  {
    label: 'Oct'
  },
  {
    label: 'Nov'
  },
  {
    label: 'Dec'
  }
]

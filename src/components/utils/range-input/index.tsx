import './index.scss'

interface IRangeInput extends React.ComponentPropsWithoutRef<'input'> {
  items: string[]
}

export const RangeInput: React.FC<IRangeInput> = ({ items, ...props }) => {
  return (
    <div>
      <div className="range-slider">
        <input type="range" className="range-input" {...props} />
        <div className="sliderticks">
          <div className="zero-ticks">
            <span />
            <p className="mr text-little">0</p>
          </div>
          {items.map((item, index) => (
            <div className="f-column aie" key={index}>
              <span />
              <p className="mr text-little">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

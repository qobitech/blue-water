import { TypeButton } from '../../../../components/utils/button'
import { TypeInput } from '../../../../components/utils/input'

const EarningSettings = () => {
  return (
    <form className="form-section" onSubmit={(e) => e.preventDefault()}>
      <div className="grid-wrapper-47 gap-20">
        <TypeInput
          label="Full name (as written on your government issued ID)"
          value=""
          customwidth={'100%'}
          placeholder="Enter full name"
        />
        <TypeInput
          label="Bank name"
          value=""
          customwidth={'100%'}
          placeholder="Enter bank name"
        />
        <TypeInput
          label="Account number"
          value=""
          placeholder="Enter account number"
          customwidth={'100%'}
        />
        <TypeInput
          label="Bank location"
          value=""
          placeholder="Enter bank location"
          customwidth={'100%'}
        />
      </div>
      <div className="f-row pt-4">
        <TypeButton title="Update" />
      </div>
    </form>
  )
}

export default EarningSettings

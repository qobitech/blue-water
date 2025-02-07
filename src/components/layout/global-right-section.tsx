import RightSection from '../layout/right-section'
import { useGlobalContext } from './context'
import CreateFeedback from '../page-components/create-feedback'

const GlobalRightSection = () => {
  const globalContext = useGlobalContext()

  if (!globalContext) return <></>

  const rsProps = globalContext.rsProps

  if (!rsProps) return <></>

  return (
    <>
      <RightSection rsProps={rsProps} globalContext={globalContext}>
        {rsProps.isView('create', 'feedback') ? <CreateFeedback /> : null}
      </RightSection>
    </>
  )
}

export default GlobalRightSection

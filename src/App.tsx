import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { pageurl } from './constants/pageurl'
import { Loader } from './components/utils/hooks'
import { publicPage } from './routes/roles/public'
import './assets/style/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.scss'
import { useGlobalHook } from './components/layout/state-hook'
import {
  IComponentState,
  initComponentState
} from './components/layout/global-schema'

const PublicRoute = lazy(async () => await import('./routes/public-route'))

const Page404 = lazy(async () => await import('./pages/page404'))

function App() {
  const global = useGlobalHook<IComponentState>(initComponentState)
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<Loader loader />}>
          <Routes>
            <Route
              path={pageurl.HOME}
              element={<PublicRoute global={global} />}
            >
              {publicPage.map((i, index) => {
                const Page = i.page
                return <Route path={i.url} element={<Page />} key={index} />
              })}
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App

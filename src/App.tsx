import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { isAdmin, isDashBoard, pageurl } from './constants/pageurl'
import { Loader } from './components/utils/hooks'
import { buyersSellersPages } from './routes/roles/buyers-sellers'
import { adminsPage } from './routes/roles/admin'
import { generalPage } from './routes/roles/general'
import { publicPage } from './routes/roles/public'
import { authPage } from './routes/roles/auth'
import { onboardingPage } from './routes/roles/onboarding'
import SuspendedPage from './pages/suspended'
import './assets/style/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.scss'
import { useGlobalHook } from './components/layout/state-hook'
import {
  IComponentState,
  initComponentState
} from './components/layout/global-schema'

const PublicRoute = lazy(async () => await import('./routes/public-route'))
const UserRoute = lazy(async () => await import('./routes/user-route'))
const AuthRoute = lazy(async () => await import('./routes/auth-route'))
const OnboardingRoute = lazy(
  async () => await import('./routes/onboarding-route')
)
const GeneralRoute = lazy(async () => await import('./routes/general-route'))

const Page404 = lazy(async () => await import('./pages/page404'))

function App() {
  const global = useGlobalHook<IComponentState>(initComponentState)
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<Loader loader />}>
          <Routes>
            <Route path="/auth">
              {authPage.map((i, index) => {
                const Page = i.page
                return (
                  <Route
                    path={i.url}
                    element={<AuthRoute element={Page} global={global} />}
                    key={index}
                  />
                )
              })}
            </Route>
            {onboardingPage.map((i, index) => {
              const Page = i.page
              return (
                <Route
                  path={i.url}
                  element={<OnboardingRoute element={Page} global={global} />}
                  key={index}
                />
              )
            })}
            <Route path={pageurl.HOME}>
              {publicPage.map((i, index) => {
                const Page = i.page
                return (
                  <Route
                    path={i.url}
                    element={<PublicRoute element={Page} global={global} />}
                    key={index}
                  />
                )
              })}
            </Route>
            <Route path={isDashBoard}>
              {buyersSellersPages.map((i, index) => {
                const Page = i.page
                return (
                  <Route
                    path={i.url}
                    element={<UserRoute element={Page} global={global} />}
                    key={index}
                  />
                )
              })}
            </Route>
            <Route path={isAdmin}>
              {adminsPage.map((i, index) => {
                const Page = i.page
                return (
                  <Route
                    path={i.url}
                    element={<UserRoute element={Page} global={global} />}
                    key={index}
                  />
                )
              })}
            </Route>
            {generalPage.map((i, index) => {
              const Page = i.page
              return (
                <Route
                  path={i.url}
                  element={
                    <GeneralRoute
                      element={Page}
                      noWrapper={i.noWrapper}
                      global={global}
                    />
                  }
                  key={index}
                />
              )
            })}
            <Route path={pageurl.SUSPENDED} element={<SuspendedPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App

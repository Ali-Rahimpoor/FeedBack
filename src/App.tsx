import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

const Main = lazy(() => import('./components/Main'))

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
      <Footer />
    </>
  )
}

export default App 
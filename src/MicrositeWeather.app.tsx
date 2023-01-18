import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppConstants } from './MicrositeWeather.constants'

const LandingPage = lazy(() => import(`@src/app/pages/Landing/Landing.route`))

const App = () => {
	return (
		<Suspense fallback={<span />}>
			<BrowserRouter>
				<div className={`${AppConstants.appName}-app-root`}>
					<LandingPage index={true}/>
				</div>
			</BrowserRouter>
		</Suspense>
	)
}

export default App

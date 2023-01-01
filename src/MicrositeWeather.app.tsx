import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppConstants } from './MicrositeWeather.constants'
import { IAppState } from './MicrositeWeather.interface'

const LandingPage = lazy(() => import(`@src/app/pages/Landing/Landing.route`))

const App = (props: IAppState) => {
	return (
		<Suspense fallback={<span />}>
			<BrowserRouter basename={AppConstants.publicPath}>
				<div className={`${AppConstants.appName}-app-root`}>
					<LandingPage index={true}/>
				</div>
			</BrowserRouter>
		</Suspense>
	)
}

export default App

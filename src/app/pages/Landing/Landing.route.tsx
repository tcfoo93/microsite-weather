import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppConstantRoutes } from '@src/MicrositeWeather.constants';
import { IPageProps } from '@src/MicrositeWeather.interface';
const Landing = lazy(() => import(`./Landing.page`))

function LandingPage(props: IPageProps) {
	const { index } = props;
	return (
		<Routes>
			{index &&
				<Route index element={<Navigate to={AppConstantRoutes.routes.landing} />} />
			}
			<Route path={AppConstantRoutes.routes.landing} element={<Landing/>} />
		</Routes>
	)
}

export default LandingPage
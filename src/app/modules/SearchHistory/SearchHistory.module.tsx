import { lazy } from 'react';
import { IModuleProps } from '@src/MicrositeWeather.interface';
const Listing = lazy(() => import(`./forms/Listing`))

function SearchHistoryModule(props:IModuleProps) {
	const { index } = props;
	return (
		<></>
	)
}

export default SearchHistoryModule
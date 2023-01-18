import { IGetCurrentWeatherResponse } from '@src/app/services/ApiRequest.interface';
import ApiRequest from '@src/app/services/ApiRequest.service';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import WeatherPanel from './WeatherPanel';

function CurrentWeatherPanel() {
	const [ weatherInfo, setWeatherInfo ] = useState<IGetCurrentWeatherResponse>({} as IGetCurrentWeatherResponse);
	const onPageLoad = async () => {
		const currentWeather = await ApiRequest.getCurrentWeather({city: 'Penang', country: 'MY'})
		.then(
			(res) => {
				return { 
					...res.data,
					dateTime: new Date()
				} as IGetCurrentWeatherResponse
			}
		);

		if(!currentWeather) {
			return;
		}
		
		setWeatherInfo(currentWeather);
	}
	useEffect(()=> {
		onPageLoad()
	},[])

	return (
		<>
			<WeatherPanel weatherInfo={weatherInfo} />
		</>
	)
}

export default CurrentWeatherPanel
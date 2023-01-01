import { IWeatherPanelProps } from '@src/MicrositeWeather.interface';
import moment from 'moment';

function WeatherPanel(props: IWeatherPanelProps) {
	const { weatherInfo } = props;
	return (
		<>
			{(Object.keys(weatherInfo).length > 0) && 
				<div className="row vertical weather-panel" style={{paddingLeft: '20px'}}>
					<label>{weatherInfo.name + ', ' + weatherInfo.sys.country}</label>
					<h1 className="weather-title">{weatherInfo.weather[0].main}</h1>
					<div className="row">
						<label className="flex-50">Description:</label>
						<label className="flex-50">{weatherInfo.weather[0].description}</label>
					</div>
					<div className="row">
						<label className="flex-50">Temperature:</label>
						<label className="flex-50">{weatherInfo.main.temp_min}°С ~ {weatherInfo.main.temp_max}°С</label>
					</div>
					<div className="row">
						<label className="flex-50">Humidity:</label>
						<label className="flex-50">{weatherInfo.main.humidity}%</label>
					</div>
					<div className="row">
						<label className="flex-50">Time:</label>
						<label className="flex-50">{moment(weatherInfo.dateTime).format("YYYY-MM-DD hh:mm:ss A")}</label>
					</div>
				</div>
			}
		</>
	)
}

export default WeatherPanel
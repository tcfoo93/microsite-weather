import { IWeatherPanelProps } from '@src/MicrositeWeather.interface';
import moment from 'moment';

function WeatherPanel(props: IWeatherPanelProps) {
	const { weatherInfo } = props;
	return (
		<>
			{(Object.keys(weatherInfo).length > 0) && 
				<div className="row vertical col-5" style={{paddingLeft: '20px'}}>
					<label>{weatherInfo.name + ', ' + weatherInfo.sys.country}</label>
					<h1 className="weather-title">{weatherInfo.weather[0].main}</h1>
					<div className="row">
						<label className="col-6">Description:</label>
						<label className="col-6">{weatherInfo.weather[0].description}</label>
					</div>
					<div className="row">
						<label className="col-6">Temperature:</label>
						<label className="col-6">{weatherInfo.main.temp_min}°С ~ {weatherInfo.main.temp_max}°С</label>
					</div>
					<div className="row">
						<label className="col-6">Humidity:</label>
						<label className="col-6">{weatherInfo.main.humidity}%</label>
					</div>
					<div className="row">
						<label className="col-6">Time:</label>
						<label className="col-6">{moment(weatherInfo.dateTime).format("YYYY-MM-DD hh:mm:ss A")}</label>
					</div>
				</div>
			}
		</>
	)
}

export default WeatherPanel
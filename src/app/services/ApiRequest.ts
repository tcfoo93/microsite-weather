import axios from 'axios';

export default class ApiRequest {
	getPathConfig() {
		const result = {
			get openWeatherAppId() {
				return 'f55175d33c97d663bc1d750a36b6b3f9';
			},
			get openWeatherApi() {
				return { url : 'https://openweathermap.org/data/2.5/find', method: 'GET' };
			}
		}
		return result;
	}

	async getCurrentWeather(city: string, country: string): Promise<any> {
		let searchString = city + ',' + country;
		const pathConfig = this.getPathConfig()
		const axiosParams = {
			url: pathConfig.openWeatherApi.url,
			method: pathConfig.openWeatherApi.method,
			params: {
						q: searchString,
						appid: pathConfig.openWeatherAppId
					}
		}
		const result = await axios(axiosParams);
		return Promise.resolve(result)
	}
}
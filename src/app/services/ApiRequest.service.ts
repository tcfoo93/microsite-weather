import axios from 'axios';
import { ISearchFormData } from '../modules/TodaysWeather/TodaysWeather.interfaces';
import { v4 as generateUUID } from 'uuid'
import { IGetCurrentWeatherResponse } from './ApiRequest.interface';

export default class ApiRequest {
	getPathConfig() {
		const result = {
			get openWeatherAppId() {
				return 'f55175d33c97d663bc1d750a36b6b3f9';
			},
			get openWeatherApi() {
				return { url : 'https://api.openweathermap.org/data/2.5/weather', method: 'GET' };
			},
			get searchHistoryApiUrl () {
				return 'http://localhost:3009/searchHistory'
			}
		}
		return result;
	}

	async getCurrentWeather(formData: ISearchFormData) {
		const { city, country } = formData;
		let searchString = '';
		if(city){
			searchString = city;
			if(country){
				searchString += `,${country}`
			}
		}else {
			searchString = country;
		}
		
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

	async fetchSearchHistory() {
		const axiosParams = {
			url: this.getPathConfig().searchHistoryApiUrl,
			method: 'GET',
			params: {
						_sort: "dateTime",
						_order: "desc"
					}
		}
		const result = await axios(axiosParams);
		return Promise.resolve(result)
	}

	async addSearchItem(data: IGetCurrentWeatherResponse) {
		const axiosParams = {
			url: this.getPathConfig().searchHistoryApiUrl,
			method: 'POST',
			data: {
				...data,
				id: generateUUID(),
			}
		}
		const result = await axios(axiosParams);
		return Promise.resolve(result)
	}

	async deleteSearchItem( id: string ) {
		const axiosParams = {
			url: this.getPathConfig().searchHistoryApiUrl + `/${id}`,
			method: 'DELETE'
		}
		const result = await axios(axiosParams);
		return Promise.resolve(result)
	}
}
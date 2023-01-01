import { IGetCurrentWeatherResponse } from "@src/app/services/ApiRequest.interface"

export interface ITodaysWeatherState {
	currentWeather: IGetCurrentWeatherResponse
	isError: boolean
}

export interface ISearchFormData {
	city: string
	country: string
}
import { IGetCurrentWeatherResponse } from "@src/app/services/ApiRequest.interface"

export interface IResultState {
	currentWeather: IGetCurrentWeatherResponse
	isError: boolean
}

export interface ISearchFormData {
	city: string
	country: string
}
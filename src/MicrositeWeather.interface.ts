import { IGetCurrentWeatherResponse } from "./app/services/ApiRequest.interface"

export interface IModuleProps {
	index?: boolean
}

export interface IAppProps {
	name: string
	activeRule: string
}

export interface IAppState {
	activeRule: string
}

export interface IWeatherPanelProps {
	weatherInfo: IGetCurrentWeatherResponse
}

export interface INotificationProps {
	type: string
}
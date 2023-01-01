import { ISearchFormData } from "./app/modules/TodaysWeather/TodaysWeather.interfaces";
import { IGetCurrentWeatherResponse } from "./app/services/ApiRequest.interface"

export interface IPageProps {
	index?: boolean
}
export interface IModuleProps {
	landingState: ILandingState
	setLandingState: (value: ILandingState) => void;
}

export interface ILandingState {
	searchHistoryListing: Array<IGetCurrentWeatherResponse>
	onSearchClick: boolean,
	searchFormData: ISearchFormData
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
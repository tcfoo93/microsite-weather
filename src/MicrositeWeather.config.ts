import { IAppProps } from './MicrositeWeather.interface'
import { AppConstants } from './MicrositeWeather.constants'

const config: IAppProps = {
	name: AppConstants.appName,
	activeRule: '',
}

const setConfig = (appConfigProps: IAppProps) => {
	Object.keys(config).forEach((attr: any) => {
		const key: keyof IAppProps = attr
		config[key] = appConfigProps[key] || process.env[key] || config[key]
	})

	return config
}

const getConfig = () => config

export { setConfig, getConfig } 

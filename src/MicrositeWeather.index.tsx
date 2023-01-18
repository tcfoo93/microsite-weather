import { createRoot } from 'react-dom/client'
import App from './MicrositeWeather.app'
import { IAppProps } from './MicrositeWeather.interface'
import '@assets/styles/main.scss'
import ErrorBoundary from './app/components/ErrorBoundary/ErrorBoundary'

export default function MicrositeWeather(props: IAppProps) {
	return (
		<ErrorBoundary>
			<App/>
		</ErrorBoundary>
	);
}

export async function bootstrap(props?: any) {
	if ((window as any).__POWERED_BY_QIANKUN__) {
		// eslint-disable-next-line camelcase
		console.log('__POWERED_BY_QIANKUN__')
	}
}

export async function mount(props?: any) {
	const id = `root`
	const rootNode = document.getElementById(id) as HTMLElement
	const root = createRoot(rootNode)

	root.render(<App />)
}

export async function unmount(props?: any) {
	return props;
}

export async function update(props: any) { 
	return props; 
}
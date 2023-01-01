interface IConfig {
	application: {
		bootstrap(props?: any): Promise<void>
		mount(props?: any): Promise<void>
		unmount(props?: any): Promise<void>
		update(props?: any): Promise<void>
	}
}

const config: IConfig = {
	application: {
		bootstrap: () => {
			return Promise.resolve()
		},
		mount: () => {
			return Promise.resolve()
		},
		unmount: () => {
			return Promise.resolve()
		},
		update: () => {
			return Promise.resolve()
		}
	}
}

export async function bootstrap(props?: any) {
	config.application = await import('./MicrositeWeather.index')
	await config.application.bootstrap(props)
}

export async function mount(props?: any) {
	await config.application.mount(props)
}

export async function unmount(props?: any) {
	await config.application.unmount(props)
}

export async function update(props: any) {
	await config.application.update(props)
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
	Promise.resolve()
		.then(() => {
			return bootstrap()
		})
		.then(() => {
			return mount()
		})
}
	
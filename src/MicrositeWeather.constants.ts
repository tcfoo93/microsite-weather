export const AppConstants = {
	get appName() {
		return 'microsite-weather';
	},
	get publicPath() {
		return '/weather';
	}
}

export const AppConstantRoutes = {
	routes: {
		get landing() {
			return this.today.url;
		},
		get today() {
			return {
				get url() {
					return '/today';
				}
			}
		}
	}
}

export const NotificationType = {
	get error() {
		return { value: 'error', message: 'Not Found' };
	}
}
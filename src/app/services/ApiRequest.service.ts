export default class ApiRequest {
	getPathConfig() {
		const result = {
			get backgroundVideoUrl () {
				return { url: 'https://www.w3schools.com/html/mov_bbb.mp4', method: 'GET' }
			},
			get openWeatherApiUrl() {
				return { url : 'https://openweathermap.org/data/2.5/find?callback=jQuery19107657061710445681_1672502959539&q=MY&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1672502959543', method: 'GET' }
			}
		}
		return result;
	}
}

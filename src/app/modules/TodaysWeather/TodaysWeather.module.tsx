import { NotificationType } from '@src/MicrositeWeather.constants';
import WeatherPanel from '@src/app/components/WeatherPanel/WeatherPanel';
import { IGetCurrentWeatherResponse } from '@src/app/services/ApiRequest.interface';
import ApiRequest from '@src/app/services/ApiRequest.service';
import React, { useState, ChangeEvent } from 'react';
import { IResultState, ISearchFormData } from './TodaysWeather.interfaces';
import Notification from '@src/app/components/Notification/Notification';

function TodaysWeatherModule() {
	const [state, setState] = useState<IResultState>({
		currentWeather: {} as IGetCurrentWeatherResponse,
		isError: false
	});

	const [formData, setFormData] = useState<ISearchFormData>({} as ISearchFormData);

	const onSearchClick = async () =>{
		const currentWeather = await new ApiRequest().getCurrentWeather(formData)
		.then(
			(res) => {
				return { 
					...res.data,
					dateTime: new Date()
				} as IGetCurrentWeatherResponse
			},
			()=> {
				setState({
					...state,
					isError: true
				});
				return;
			}
		);

		if(!currentWeather) {
			return;
		}
		
		setState({
			...state,
			isError: false,
			currentWeather
		})
	}

	const onResetClick = () =>{
	//reset formData
	}

	const onGenericEventChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const id = evt.currentTarget.id;
		const value = evt.currentTarget.value;
		setFormData({
			...formData,
			[id] : value
		})
	}

	return (
	<React.Fragment>
		<div className="main-container flex-30 col-12">
			<div className="content-center">
				<h3 className="header-border">Today's Weather</h3>
				<div className="row" style={{marginBottom: '20px'}}>
					<div className="field-group">
						<label>City: </label>
						<input
							id={'city'}
							name={'city'}
							type={'text'}
							value={formData.city}
							onChange={onGenericEventChange}
						/>
					</div>
					<div className="field-group">
						<label>Country: </label>
						<input
							id={'country'}
							name={'country'}
							type={'text'}
							value={formData.country}
							onChange={onGenericEventChange}
						/>
					</div>
					<div className="field-group">
						<button
							id="btn-search"
							name="btn-search"
							className="primary-button"
							onClick={onSearchClick}
						>
							Search
						</button>
						<button
							id="btn-reset"
							name="btn-reset"
							className="primary-button"
							onClick={onResetClick}
						>
							Reset
						</button>
					</div>
				</div>
				{(state.currentWeather && !state.isError) 
				? 
					<WeatherPanel weatherInfo={state.currentWeather} />
				: 
					<Notification type={NotificationType.error.value} />
				}
			</div>
		</div>
	</React.Fragment>
	);
}

export default TodaysWeatherModule
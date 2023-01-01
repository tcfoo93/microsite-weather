import { IModuleProps } from '@src/MicrositeWeather.interface';
import ApiRequest from '@src/app/services/ApiRequest.service';
import React, { useLayoutEffect, useState } from 'react';
import { ISearchHistoryState } from './SearchHistory.interfaces';
import moment from 'moment';
import deleteIcon from "@assets/icons/delete.png";
import zoomIcon from "@assets/icons/zoom.png";
import { IGetCurrentWeatherResponse } from '@src/app/services/ApiRequest.interface';
import { ISearchFormData } from '../TodaysWeather/TodaysWeather.interfaces';

function SearchHistoryModule(props: IModuleProps) {
	const { landingState, setLandingState } = props;
	const [state, setState] = useState<ISearchHistoryState>({
		loaded: false
	});

	const onPageLoad = async () => {
		await new ApiRequest().fetchSearchHistory()
		.then(
			(res) => {
				setLandingState({
					...landingState,
					searchHistoryListing: res.data
				})
				setState({
					...state,
					loaded: true
				})
			}
		);
	};

	useLayoutEffect(()=>{
		onPageLoad();
	},[])

	if (!state.loaded) {
		return null;
	}

	const onSearchClick = (searchFormData: ISearchFormData) =>{
		setLandingState({
			...landingState,
			onSearchClick: true,
			searchFormData
		})
	}
	const onDeleteClick = async (id: string) => {
		await new ApiRequest().deleteSearchItem(id)
		.then(
			() => {
				let searchHistoryListing = landingState.searchHistoryListing;
				searchHistoryListing = searchHistoryListing.filter((searchItem: IGetCurrentWeatherResponse) => searchItem.id !== id)
				setLandingState({
					...landingState,
					searchHistoryListing: searchHistoryListing ?? [] as Array<IGetCurrentWeatherResponse>
				})
			}
		);
	}	

	return (
		<React.Fragment>
			<div className="main-container flex-70">
				<div className="content-center">
					<h3 className="header-border">Search History</h3>
					{(landingState && landingState?.searchHistoryListing.length > 0) ? 
						landingState?.searchHistoryListing.map((data: IGetCurrentWeatherResponse, index: number)=>{
							return (
								<div className="row col-12 record-border" style={{paddingTop: '10px', paddingBottom: '10px'}}>
									<span style={{flex: '0.02'}}>{index + 1}.</span>
									<span style={{flex: '0.65'}}>{data.name + ', ' + data.sys.country}</span>
									<span style={{flex: '0.25'}}>{moment(data.dateTime).format("YYYY-MM-DD hh:mm:ss A")}</span>
									<div style={{flex: '0.04'}}>
										<img className="record-icon" src={zoomIcon} onClick={()=> onSearchClick({city: data.name, country: data.sys.country})}/>
									</div>
									<div style={{flex: '0.04'}}>
										<img className="record-icon" src={deleteIcon} onClick={()=> onDeleteClick(data.id)}/>
									</div>
								</div>
							)
						})
						: <div className="no-record">No Record</div>		
					}
				</div>
			</div>
		</React.Fragment>
	)
}

export default SearchHistoryModule
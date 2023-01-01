import { lazy } from 'react';
import { IModuleProps } from '@src/MicrositeWeather.interface';
import React from 'react';
const Listing = lazy(() => import(`./forms/Listing`))

function SearchHistoryModule(props:IModuleProps) {
	const { index } = props;
	return (
		<React.Fragment>
			<div className="main-container flex-70">
				<div className="content-center">
					<h3 className="header-border">Search History</h3>
					<div className="row">
						<div className="field-group">
						
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default SearchHistoryModule
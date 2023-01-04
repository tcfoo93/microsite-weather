import Landing from "../Landing.page";
import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import ApiRequest from '@src/app/services/ApiRequest.service'

jest.mock('@src/app/services/ApiRequest.service');

describe('LandingPage', () => {
    const history = createMemoryHistory();
    history.push("/");

    const renderPage = () => render(
        <Router 
            location={history.location}
            navigator={history}
        >
            <Landing/>
        </Router>
    )

    const weatherItem = {
        "coord": {
          "lon": 101.6067,
          "lat": 3.1073
        },
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 297.78,
          "feels_like": 298.62,
          "temp_min": 296.88,
          "temp_max": 298.38,
          "pressure": 1013,
          "humidity": 89
        },
        "visibility": 9000,
        "wind": {
          "speed": 0,
          "deg": 0
        },
        "clouds": {
          "all": 20
        },
        "dt": 1672619114,
        "sys": {
          "type": 1,
          "id": 9446,
          "country": "MY",
          "sunrise": 1672615127,
          "sunset": 1672658128
        },
        "timezone": 28800,
        "id": "a396a578-b7c3-418c-acb9-cb63607dabcd",
        "name": "Petaling Jaya",
        "cod": 200,
        "dateTime": "2023-01-02T00:25:14.330Z"
    }

    const searchHistoryListing = [weatherItem]
      
    const landingState = {
        searchHistoryListing,
        onSearchClick: false,
        searchFormData: {}
    }

    const mockSearchHistoryResponse = {
        data: searchHistoryListing,
        status: 200,
        statusText: 'OK'
    }

    const mockSearchWeatherResponse = {
        data: weatherItem,
        status: 200,
        statusText: 'OK'
    }

    beforeEach(() => {
        ApiRequest.fetchSearchHistory.mockResolvedValue(mockSearchHistoryResponse)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('init', () => {
        it('should render components', async () => {
           const { getByText } = renderPage()
          
            await waitFor(() => {
                expect(getByText("Today's Weather")).toBeInTheDocument()
                expect(getByText("Search History")).toBeInTheDocument()
            })
        })

        it('APIs were successfully called during click search icon', async () => {
            ApiRequest.getCurrentWeather.mockResolvedValue(mockSearchWeatherResponse);
            ApiRequest.addSearchItem.mockResolvedValue(mockSearchWeatherResponse);
            // Mock useState before rendering your component
            jest
                .spyOn(React, 'useState')
                .mockImplementationOnce(() => React.useState(landingState))
            
            renderPage()
            const searchIcon = document.getElementById('icon-search')
            await waitFor(() => {
                expect(searchIcon).toBeInTheDocument()
            });
            await act(async () => {
                fireEvent.click(searchIcon)
            });
        })
    })
})


import SearchHistoryModule from "../SearchHistory.module";
import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react'
import ApiRequest from '@src/app/services/ApiRequest.service'

jest.mock('@src/app/services/ApiRequest.service');

describe('SearchHistoryModule', () => {
    const searchHistoryListing = [{
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
      }]

    const props = {
      landingState: {
        searchHistoryListing,
        onSearchClick: false,
        searchFormData: {}
      }, 
      setLandingState: jest.fn(),
    }

    const renderPage = () => render(
      <SearchHistoryModule {...props}/>
    )

    const mockSearchHistoryResponse = {
      data: searchHistoryListing,
      status: 200,
      statusText: 'OK'
    }

    beforeEach(() => {
        ApiRequest.fetchSearchHistory.mockResolvedValue(mockSearchHistoryResponse)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('init with props', () => {
        it('should render components', async () => {
            const { getByText } = renderPage()
            await waitFor(() => {
                expect(getByText('Search History')).toBeInTheDocument()
                expect(ApiRequest.fetchSearchHistory()).resolves.toBe(mockSearchHistoryResponse)
                expect(ApiRequest.fetchSearchHistory).toHaveBeenCalled()
            })
        })

        it('API were successfully called during click delete', async () => {
            ApiRequest.deleteSearchItem.mockResolvedValue({});
            
            renderPage()
    
            const deleteIcon = document.getElementById('icon-delete')
            expect(deleteIcon).toBeInTheDocument()
            await act(async () => {
                fireEvent.click(deleteIcon)
                expect(ApiRequest.deleteSearchItem).toHaveBeenCalled()
            });
        })
    })
})
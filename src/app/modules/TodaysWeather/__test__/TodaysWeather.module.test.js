import TodaysWMeatherModule from "../TodaysWeather.module";
import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react'
import ApiRequest from '@src/app/services/ApiRequest.service'

jest.mock('@src/app/services/ApiRequest.service');

describe('TodaysWMeatherModule', () => {
    const props = {
      landingState: {
        searchHistoryListing: [],
        onSearchClick: false,
        searchFormData: {}
      }, 
      setLandingState: jest.fn(),
    }

    const renderPage = () => render(
      <TodaysWMeatherModule {...props}/>
    )

    const mockSearchWeatherResponse = {
      data: {
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
      },
      status: 200,
      statusText: 'OK'
    }

    describe('init with props', () => {
        it('should render components', async () => {
            const { getByText } = renderPage()
            await waitFor(() => {
                expect(getByText('Today\'s Weather')).toBeInTheDocument()
            })
        })

        it('APIs were successfully called during click search', async () => {
          ApiRequest.getCurrentWeather.mockResolvedValue(mockSearchWeatherResponse);
          ApiRequest.addSearchItem.mockResolvedValue(mockSearchWeatherResponse)
          
          renderPage()
         
          const city = document.getElementById('city')
          const searchBtn = document.getElementById('btn-search')
         
          expect(city).toBeInTheDocument()
          expect(searchBtn).toBeInTheDocument()
          await act(async () => {
            fireEvent.change(city, {
              target: {
                  value: 'Johor'
              }
            })
            fireEvent.click(searchBtn)
            expect(ApiRequest.getCurrentWeather()).resolves.toBe(mockSearchWeatherResponse)
            expect(ApiRequest.addSearchItem()).resolves.toBe(mockSearchWeatherResponse)
            expect(ApiRequest.getCurrentWeather).toHaveBeenCalled()
            expect(ApiRequest.addSearchItem).toHaveBeenCalled()
          });
        })

        it('getCurrentWeather api reject during click search', async () => {
          ApiRequest.getCurrentWeather.mockRejectedValue(new Error('ERROR'))

          renderPage()
         
          const searchBtn = document.getElementById('btn-search')
          expect(searchBtn).toBeInTheDocument()
          await act(async () => {
            fireEvent.click(searchBtn)
            expect(ApiRequest.getCurrentWeather).rejects.toThrowError('ERROR')
          });
        })

        it('Form will clear after reset button was clicked', async () => {
          renderPage()
         
          const city = () => document.getElementById('city')
          const country = () => document.getElementById('country')
          const resetBtn = document.getElementById('btn-reset')
         
          expect(city()).toBeInTheDocument()
          expect(country()).toBeInTheDocument()
          expect(resetBtn).toBeInTheDocument()
          await act(async () => {
            fireEvent.change(city(), {
              target: {
                  value: 'Johor'
              }
            })
            fireEvent.change(country(), {
              target: {
                  value: 'MY'
              }
            })
            expect(city().value).toBe('Johor')
            expect(country().value).toBe('MY')
            fireEvent.click(resetBtn)
          });
          expect(city().value).toBe('')
          expect(country().value).toBe('')
        })
    })
})
import WeatherPanel from "../WeatherPanel";
import React from 'react';
import { render, waitFor } from '@testing-library/react';

describe('WeatherPanel', () => {
    const props = {
        weatherInfo : {
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
    }

    const renderPage = (props) => render(
        <WeatherPanel weatherInfo={props}/>
    )

    describe('init with props', () => {
        it('should render components', async () => {
            const { getByText } = renderPage(props.weatherInfo)
            await waitFor(() => {
                const weatherPanel = document.querySelector('.weather-panel')
                expect(weatherPanel).toBeInTheDocument()
                expect(weatherPanel.childElementCount).toBe(6)

                expect(getByText("Petaling Jaya, MY")).toBeInTheDocument()
                expect(getByText("Clouds")).toBeInTheDocument()
                expect(getByText("Description:")).toBeInTheDocument()
                expect(getByText("few clouds")).toBeInTheDocument()
                expect(getByText("Temperature:")).toBeInTheDocument()
                expect(getByText("296.88°С ~ 298.38°С")).toBeInTheDocument()
                expect(getByText("Humidity:")).toBeInTheDocument()
                expect(getByText("89%")).toBeInTheDocument()
                expect(getByText("Time:")).toBeInTheDocument()
                expect(getByText("2023-01-02 08:25:14 AM")).toBeInTheDocument()
            })
        })
    })

    describe('init without props', () => {
        it('shouldn\'t render components', async () => {
            renderPage({})
            await waitFor(() => {
                expect(document.querySelector('.weather-panel')).toBeNull()
            })
        })
    })
})
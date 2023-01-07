import Notification from "../Notification";
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { NotificationType } from '@src/MicrositeWeather.constants';

describe('Notification', () => {
    const props = {
        type : NotificationType.error.value
    }

    const renderPage = () => render(
        <Notification {...props}/>
    )

    describe('init', () => {
        it('should render error notification', async () => {
            const { getByText } = renderPage()
            await waitFor(() => {
                expect(getByText("Not Found")).toBeInTheDocument()
            })
        })
    })
})
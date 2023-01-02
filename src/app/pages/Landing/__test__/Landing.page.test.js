import Landing from "../Landing.page";
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

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

    describe('init', () => {
        it('should render components', async () => {
            const { getByText } = renderPage()
            await waitFor(() => {
                expect(getByText("Today's Weather")).toBeInTheDocument()
                expect(getByText("Search History")).toBeInTheDocument()
            })
        })
    })
})


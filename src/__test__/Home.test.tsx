import React from 'react';
import { createMemoryHistory } from "history"
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Home from '../components/pages/Home';
import { Router } from 'react-router-dom';


describe('Testing Home component', () => {

    test('title testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        );

        const title: any = screen.queryByTestId("title");
        expect(title.textContent).toEqual("Get your Weather information");
    });

    test('button Disable testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const button = screen.queryByTestId("button");
        expect(button).toBeDisabled();

    });

    test('button Enable testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        const button = screen.queryByTestId("button");
        expect(button).toBeEnabled();

    });

    test('update on change testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        expect(inputField.value).toBe("Bangladesh")
    });


    test('Country details routing testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory({ initialEntries: ['/'] });

        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        );

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        expect(history.location.pathname).toBe('/');

        const button: any = screen.getByRole('button', { name: /submit/i });
        await user.click(button);
        expect(history.location.pathname).toBe('/country/Bangladesh');

    });
})



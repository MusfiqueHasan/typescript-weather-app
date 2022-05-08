import React from 'react';
import { createMemoryHistory } from "history"
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../components/pages/Home';
import { Router } from 'react-router-dom';

test('title test', () => {
    render(<Home />);
    const title = screen.queryByTestId("title");
    expect(title?.textContent).toBe("Get your  Weather information");
});

test('button Disable', () => {
    render(<Home />);
    const button = screen.queryByTestId("button");
    expect(button).toBeDisabled();

});

test('button Enable', () => {
    render(<Home />);
    const chkInput: any = screen.queryByPlaceholderText("Enter Country");
    fireEvent.change(chkInput, { target: { value: "Bangladesh" } })
    const button = screen.queryByTestId("button");
    expect(button).toBeEnabled();

});

test('update on change', () => {
    render(<Home />);
    const chkInput: any = screen.queryByPlaceholderText("Enter Country");
    fireEvent.change(chkInput, { target: { value: "Bangladesh" } })
    expect(chkInput.value).toBe("Bangladesh")
});

test('Country details routing', () => {

    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
        <Router location={history.location} navigator={history}>
            <Home />
        </Router>
    );

    const chkInput: any = screen.queryByPlaceholderText("Enter Country");
    fireEvent.change(chkInput, { target: { value: "Bangladesh" } })
    const button: any = screen.queryByTestId("button");

    expect(history.location.pathname).toBe('/');
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/Country/Bangladesh');

});



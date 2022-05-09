import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/pages/NotFound';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history"

it('Error 404 Working or not', () => {
    render(<NotFound />);
    const notFound = screen.getByRole("heading");
    expect(notFound).toBeInTheDocument();
});

test('Notfound page is rendering on *', () => {

    const history = createMemoryHistory({ initialEntries: ['*'] });
    render(
        <Router location={history.location} navigator={history}>
            <NotFound />
        </Router>
    );
    expect(history.location.pathname).toBe('*');

}); 
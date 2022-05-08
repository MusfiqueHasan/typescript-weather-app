import React from 'react';
import { MemoryRouterProps, Router } from 'react-router-dom';
import {createMemoryHistory} from "history"
import {  render, screen } from '@testing-library/react';
import CountryInfo from '../components/pages/CountryInfo';

test('renders country Info', () => {
    const history = createMemoryHistory();
      history.push("/Country/name");

   render(<Router location={history.location} navigator={history}>
           <CountryInfo/>
         </Router>);

  const details = screen.getByTestId("details");
  expect(details).toBeInTheDocument();
});





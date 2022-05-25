import React from 'react';
import CountryInfo from '../components/pages/CountryInfo';
import { InitCountryData } from '../components/pages/interfaces';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history"
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw'


const mockData: InitCountryData = {
  capital: ['Dhaka'],
  population: 164689383,
  latlng: [24, 90],
  flags: {
    svg: 'https://media.istockphoto.com/photos/dhaka-bangladesh-picture-id646044454?s=170667a'
  }
}

const server = setupServer(
  rest.get('https://restcountries.com/v3.1/name/Bangladesh',
    ({ res, req, ctx }: any) => {
      return res(ctx.json(mockData))
    }
  ))



describe('Testing CountryInfo component', () => {

  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('renders country Info', () => {
    const history = createMemoryHistory();
    history.push("/Country/name");

    render(
      <Router location={history.location} navigator={history} >
        <CountryInfo />
      </Router>
    );

    const details = screen.getByTestId("details");
    expect(details).toBeInTheDocument();
  });

  test("finding capital from country information", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history} >
        <CountryInfo />
      </Router>
    );
    const countryInfo = await screen.findByText(/dhaka/i);
    expect(countryInfo).toBeInTheDocument();

  });
})




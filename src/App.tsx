import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/pages/NotFound';

const Home = lazy(() => import('./components/pages/Home'));
const CountryInfo = lazy(() => import('./components/pages/CountryInfo'));

const App: React.FC = () => {
  return (
    <div className="App" data-testid="app">
      <Suspense fallback={<CircularProgress />}>
        {/* <BrowserRouter>
        </BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<CountryInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
